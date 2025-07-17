import React from "react";
export default class Manage_categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id:"",
            category_name:"",
            category: [],

        };
    }

    componentDidMount() {
        this.display();
    }
    display = async () => {
        const response = await fetch("http://localhost:4000/display_category");
        const data = await response.json();
        this.setState({ category: data }); //array update data values store in users state 

        console.log(data);
    }
    handleSubmi = async (e) =>{
e.preventDefault();
const {category_name} = this.state;
try {
      fetch(`http://localhost:4000/insert_category/`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state),
            })
                .then(data => {
                    console.log('success', data);
                    alert("category added sucessfully !");
                    this.setState({
                        category_name : ""
                    })
                    })
        } catch (error) {
            console.log('error when add category', error);
        }
        /*}else{
              alert("all fields are required!");
        }*/
    }

    handleDelete = async (category_id) =>{
 console.log(category_id);
     await fetch(`http://localhost:4000/delete_category/${category_id}`, {
        method: 'GET',
    });
    this.setState({
        category : this.state.category.filter(cate => cate.category_id !== category_id)
    });
    }

     handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        this.setState({
            [name]: value
        });
    };
    render() {
        return (
            <div class="container">
                <h2>Manage Categories</h2>

                <form onSubmit={this.handleSubmi}>
                    <div class="form-group">
                        <label for="category_name">Category Name</label>
                        <input type="text" id="category_name" name="category_name" required onChange={this.handleInputChange} />
                    </div>
                    <button type="submit" class="button"   style={{ padding: "7px", borderRadius: "10px", border: "2px solid darkblue", width: "100px", marginLeft: "10px" }}>Add Category</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.category.map((cat, index) => (


                            <tr>
                                <td>{cat.category_id}</td>
                                <td>{cat.category_name}</td>
                                <td>
                                    <button onClick={() => this.handleDelete(cat.category_id)}
                                        style={{ padding: "7px", borderRadius: "10px", border: "2px solid darkblue", width: "60px", marginLeft: "10px" }}>Delete</button>                            </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        )
    }
}