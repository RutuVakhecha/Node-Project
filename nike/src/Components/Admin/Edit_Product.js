import React from "react";
import './Admin.css';
export default class Edit_products extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            id:"",
            collection_name: "",
            description: "",
            price: "",
            size: "",
            color: "",
            style: "",
            country: "",
            img_id: "",
            collection_id: "",
            category_id: "",
            products:[],

        };
    }
   handleInputChange = (e) => {
    const { name, value } = e.target;  //name and value extract by event
    console.log(name, value);
    this.setState({
        [name]: value //update state with new input value

    });
};
    componentDidMount() {
        this.display();
    }
    display = async (id) => {
        const response = await fetch(`http://localhost:4000/display_products2/${id}`);
         const data = await response.json();
        this.setState({ products: data }); //array update data values store in users state 

        console.log(data);
    }

    handleUpdate = async (id) => {
        console.log(id);
        const { color, price, size, description, style, country, img_id, collection_id, collection_name, category_id } = this.state;

        fetch(`http://localhost:4000/update-product/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        })
            .then(response => response.json())
            .then(data => {
                console.log('success', data);

            })
            .catch(error =>
                console.log('Error', error));
    }
    render()
    {
        const product = this.state.products;
        return(
           <div className="add-product">
                <h2>Edit Product Product</h2>

                          

                    <form className="add-form" onSubmit={this.handleSubmit} >
                            <div className="form-group">
                        <label for="name">Product ID</label>
                        <input type="text" id="name" name="collection_id" required className="input-field" value={product.collection_id} onChange={this.handleInputChange} ></input>
                    </div>
                    <div className="form-group">
                        <label for="name">Product Name</label>
                        <input type="text" id="name" name="collection_name" required className="input-field" value={product.collection_name} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="description">Product Description</label>
                        <textarea id="description" name="description" required value={product.description} onChange={this.handleInputChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label for="price">Price</label>
                        <input type="number" step="0.01" id="price" name="price" required className="input-field" value={product.price} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="price">Size</label>
                        <input type="number" step="0.01" id="price" name="size" required className="input-field" value={product.size} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="color">Color</label>
                        <input type="text" id="price" name="color" required className="input-field" value={product.color} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="style">Style</label>
                        <input type="text" id="price" name="style" required className="input-field" value={product.style} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="country">Country</label>
                        <input type="text" id="price" name="country" required className="input-field" value={product.country} onChange={this.handleInputChange} />
                    </div>
                     <div className="form-group">
                        <label for="price">Category ID</label>
                        <input type="number" step="0.01" id="price" name="category_id" required className="category_id" value={product.category_id} onChange={this.handleInputChange} />
                    </div>
                     <div className="form-group">
                        <label for="price">IMG ID</label>
                        <input type="number" step="0.01" id="price" name="img_id" required className="input-field" value={product.img_id} onChange={this.handleInputChange} />
                    </div>
                <button type="submit" style={{padding:"10px",fontWeight:"bold",backgroundColor:"blue",color:"white",borderRadius:"7px"}} 
                onClick={() => this.handleUpdate()} >Update</button>

                </form>
                ))}
            </div>
            
    
        )
    } 
}
