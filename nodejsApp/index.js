const mysql = require("mysql"); //inport mysql
const express = require('express'); //express means web application framework design for node js help for create api 
const app = express();
const port = 4000;

var bodyParser = require("body-parser"); // parse http request body and provide in javascript objects
const { useId } = require("react");
app.use(express.static('public'));

app.use(bodyParser.json());
//1.app-Expression apllication  2.use()-used for register middleware 3.json()-request body parse in json format

app.use(function (req, res, next)//anonymous fun tha accept three paramaters  
{
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
  next(); //next-fun used to call route handler
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nikeapp"
});
con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to the database!');
});

app.post('/register', (req, res) => {
  console.log(req.query);
  const { name, email, password, address } = req.body;

  // First, check if the email already exists in the database
  const checkEmailQuery = "SELECT * FROM users WHERE Email = ?";
  console.log(checkEmailQuery);

  // Check if email already exists
  con.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      return res.json({ error: err });
    }

    // If email already exists, send an error message
    if (result.length > 0) {
      return res.json({ message: 'Email already exists, please try again with a different email.' });
    }

    // If email does not exist, proceed with the insertion
    const sql = "INSERT INTO users (Name, Email, Password, Address) VALUES (?, ?, ?, ?)";
    console.log(sql);

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(address);

    con.query(sql, [name, email, password, address], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
});
app.post('/admin-login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admin WHERE email=?";
  con.query(sql, [email], (err, result) => {
    if (err) {
      console.log('database error: ', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (result.length === 0) {
      // If no user found, return a 400 error
      return res.status(400).json({ error: 'Admin not found' });
    }

    const admin = result[0];
    console.log('Database Pssword', admin.password);
    console.log('Entered password:', password);
    //console.log('database email',admin.email);


    if (admin.email !== email || admin.password !== password) {
      return res.status(400).json({ message: 'Invalid Email or Password !' });
    }
    // If login is successful, return success response
    console.log(admin);
    return res.json({
      success: true,
      admin_name: admin.admin_name,// Send username as part of the response
      id: admin.admin_id
    });
  })
})
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE Email = ?";
  con.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (result.length === 0) {
      // If no user found, return a 400 error
      return res.status(400).json({ error: 'User not found' });
    }
    const user = result[0]; // The user data returned by the query
    console.log('Database password:', user.Password);
    console.log('Entered password:', password);

    if (user.Password !== password || user.Email !== email) {
      return res.status(400).json({ message: 'Invalid Email or Password !' });
    }

    // If login is successful, return success response
    console.log(user);
    return res.json({
      success: true,
      username: user.Name,// Send username as part of the response
      id: user.UserId
    });

  });
});


app.get('/products', (req, res) => {
  const sql = "SELECT shoes.*, (SELECT img_path FROM images WHERE img_id = shoes.img_id LIMIT 1) AS img_path,category.category_name FROM shoes JOIN category ON category.category_id = shoes.category_id LIMIT 10";
  con.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

app.get('/category', (req, res) => {
  console.log(req.query);
  const sql = "SELECT category_id, category_name FROM category";

  con.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});
app.get('/product', (req, res) => {
  console.log(req.query);
  const { limit, offset, categories } = req.query;

  let sql = `SELECT shoes.*, 
            (SELECT img_path FROM images WHERE img_id = shoes.img_id LIMIT 1) AS img_path,
            category.category_name 
            FROM shoes 
            JOIN category ON category.category_id = shoes.category_id`;

  // If categories 
  if (categories) {
    const categoryIds = categories.split(','); // Convert categories string to an array of ids
    sql += ` WHERE shoes.category_id IN (${categoryIds.join(',')})`;
  }

  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  con.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get('/details/:id', (req, res) => {
  const id = req.params.id;
  let sql = "SELECT shoes.*, category.category_name FROM `shoes` JOIN category ON category.category_id = shoes.category_id WHERE shoes.shoes_id = ?";
  con.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/display_cart/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM  cart WHERE UserId=?";
  con.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

app.get('/images/:id', (req, res) => {
  const id = req.params.id;
  let sql = "SELECT images.img_path from images WHERE img_id=?";
  con.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/display', (req, res) => {
  console.log(req.query);
  const sql = "SELECT * FROM users";
  con.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

app.get('/display/:id', (req, res) => {
  console.log(req.query);
  const UserId = req.params.id; //request id extract
  const sql = "SELECT * FROM users Where UserId=?";
  con.query(sql, [UserId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

app.get('/display_category', (req, res) => {
  console.log(req.query);
  const sql = "SELECT * FROM category";
  con.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
});
app.get('/display_products', (req, res) => {
  console.log(req.query);
  const sql = "SELECT * FROM shoes";
  con.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});


app.get('/display_products2/:id', (req, res) => {
  console.log(req.query);
  const shoes_id = req.params.id; //request id extract
  const sql = "SELECT * FROM shoes WHERE shoes_id=?";
  con.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

app.get('/delete_product/:shoes_id', (req, res) => {
  console.log(req.query);
  const shoes_id = req.params.shoes_id; //request id extract 
  const sql = "DELETE FROM shoes WHERE shoes_id=?";
  con.query(sql, [shoes_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

app.get('/delete/:id', (req, res) => {
  console.log(req.query);
  const id = req.params.id; //request id extract 
  const sql = "DELETE FROM users WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

app.get('/delete_cart/:id', (req, res) => {
  console.log(req.query);
  const id = req.params.id; //request id extract 
  const sql = "DELETE FROM cart WHERE cart_id=?";
  con.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

app.post('/insert', (req, res) => {
  console.log(req.query);
  const { id, name, password, email } = req.body;
  let name2 = req.body.name;
  let id2 = req.body.id;
  let password2 = req.body.password;
  let email2 = req.body.email;
  const sql = "INSERT INTO users(name,password,email)VALUES(?,?,?)";
  console.log(sql);
  console.log(name);
  console.log(password);
  console.log(email);
  con.query(sql, [name, password, email], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

app.post('/insert-fav', (req, res) => {
  console.log(req.query);
  const { f_id, UserId, shoes_id, saved_at } = req.body;
  let f_id2 = req.body.f_id;
  let UserId2 = req.body.UserId;
  let shoes_id2 = req.body.shoes_id;
  let saved_at2 = req.body.saved_at;
  const sql = "INSERT INTO favourite(UserId,shoes_id,saved_at)VALUES(?,?,?)";
  console.log(sql);
  console.log(f_id);
  console.log(UserId);
  console.log(shoes_id);
  console.log(saved_at);
  con.query(sql, [UserId, shoes_id, saved_at], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
})
app.post('/insert_category', (req, res) => {
  const { category_name } = req.body;
  console.log(category_name);
  const sql = "INSERT INTO category (category_name) VALUES (?)";
  console.log(sql);
  con.query(sql, [category_name], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/insert_order', (req, res) => {
  console.log(req.query);
  const { UserId, shoes_id, quantity, total, order_date, name, address, email } = req.body;
  let UserId2 = req.body.UserId;
  let shoes_id2 = req.body.shoes_id;
  let quantity2 = req.body.quantity;
  let total2 = req.body.total;
  let order_date2 = req.body.order_date;
  let name2 = req.body.name;
  let address2 = req.body.address;
  let email2 = req.body.email;

    const sql = "INSERT INTO orders (UserId,shoes_id,quantity,total,order_date,name,address,email) VALUES (?,?,?,?,?,?,?,?)";
  console.log('user id:',UserId);
  console.log('shoes id',shoes_id);
  console.log('quantity',quantity);
  console.log('total',total);
  console.log('order_date',order_date);
  console.log('name',name);
  console.log('address',address);
  console.log('email',email);
  console.log(sql);
  con.query(sql, [UserId, shoes_id, quantity, total, order_date, name, address, email], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/insert_products', (req, res) => {
  const {
    color,
    price,
    size,
    description,
    style,
    country,
    img_id,
    collection_id,
    collection_name,
    category_id
  } = req.body;

  const sql = `
    INSERT INTO shoes 
    (color, price, size, description, Style,  Country, img_id, collection_id, collection_name, category_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    color,
    price,
    size,
    description,
    style,
    country,
    img_id,
    collection_id,
    collection_name,
    category_id
  ];

  con.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error inserting product:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json({ message: "Product inserted successfully", data });
  });
});


app.post('/update-form/:id', (req, res) => {
  console.log(req.query);
  const id = parseInt(req.params.id); //request id extract 
  console.log(id);
  const { name, password, email } = req.body;
  console.log(name);
  console.log(password);
  console.log(email);
  const sql = "UPDATE users SET name=?, password=?, email=? WHERE id=?";
  con.query(sql, [name, password, email, id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

app.post('/update-product/:id', (req, res) => {
  console.log(req.query);
  const shoes_id = parseInt(req.params.id); //request id extract 
  console.log(shoes_id);
  const { color, price, size, description, style, country, img_id, collection_id, collection_name, category_id } = req.body;

  const sql = "UPDATE shoes SET color=?, price=?, size=?, description=?, style=?, country=?, img_id=?, collection_id=?, collection_name=?, category_id=? WHERE shoes_id=?";
  con.query(sql, [color, price, size, description, style, country, img_id, collection_id, collection_name, category_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});



app.post('update/:id', (req, res) => {
  console.log(req.query);
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;
  const sql = "UPDATE users SET name=?, password=?, email=? WHERE id=?";
  con.query(sql, [id, name, password, email], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})
app.get('/select/:id', (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  console.log(id);
  const sql = "SELECT * FROM users WHERE id=?";
  con.query(sql, id, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});


app.post('/insert2', (req, res) => {
  console.log('Received data:', req.body); // Log the received data

  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = "INSERT INTO student(name, password, email) VALUES (?, ?, ?)";
  con.query(sql, [name, password, email], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/add_cart', (req, res) => {
  const { UserId, shoes_id, quantity, total, added_at } = req.body;
  console.log('added at', added_at);
  console.log('total', total);
  const sql = "INSERT INTO cart (UserId, shoes_id, quantity, total, added_at) VALUES (?,?,?,?,?)";
  con.query(sql, [UserId, shoes_id, quantity, total, added_at], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get('/delete_category/:category_id', (req, res) => {
  console.log(req.query);

  const category_id = req.params.category_id;
  console.log(category_id);
  const sql = "DELETE * FROM category WHERE category_id=?"
  con.query(sql, [category_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);

  })
});

