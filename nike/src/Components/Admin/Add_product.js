import React from "react";
import './Admin.css';
export default class Add_products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shoes_id:"",
            collection_name: "",
            description: "",
            price: "",
            size: "",
            color: "",
            category_name: "",
            style: "",
            country: "",
            img_id: "",
            collection_id: "",
            category_id: "",
            image_path: ""
        };
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        this.setState({
            [name]: value
        });
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const { collection_name, description, price, size, color, style, country, img_id, collection_id, category_id } = this.state;
        // if (collection_name && description && price && size && color && style && country) {
        try {
            fetch(`http://localhost:4000/insert_products/`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state),
            })
                .then(data => {
                    console.log('success', data);
                    alert("product added sucessfully !");
                    this.setState({
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
                    });

                })
        } catch (error) {
            console.log('error when add product', error);
        }
        /*}else{
              alert("all fields are required!");
        }*/
    }
    render() {
        return (

            <div className="add-product">
                <h2>Add New Product</h2>

                <form className="add-form" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                        <label for="name">Product ID</label>
                        <input type="text" id="name" name="collection_id" required className="input-field" value={this.collection_id} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="name">Product Name</label>
                        <input type="text" id="name" name="collection_name" required className="input-field" value={this.collection_name} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="description">Product Description</label>
                        <textarea id="description" name="description" required value={this.description} onChange={this.handleInputChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label for="price">Price</label>
                        <input type="number" step="0.01" id="price" name="price" required className="input-field" value={this.price} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="price">Size</label>
                        <input type="number" step="0.01" id="price" name="size" required className="input-field" value={this.state.size} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="color">Color</label>
                        <input type="text" id="price" name="color" required className="input-field" value={this.color} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="style">Style</label>
                        <input type="text" id="price" name="style" required className="input-field" value={this.style} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="country">Country</label>
                        <input type="text" id="price" name="country" required className="input-field" value={this.country} onChange={this.handleInputChange} />
                    </div>
                     <div className="form-group">
                        <label for="price">Category ID</label>
                        <input type="number" step="0.01" id="price" name="category_id" required className="category_id" value={this.category_id} onChange={this.handleInputChange} />
                    </div>
                     <div className="form-group">
                        <label for="price">IMG ID</label>
                        <input type="number" step="0.01" id="price" name="img_id" required className="input-field" value={this.img_id} onChange={this.handleInputChange} />
                    </div>
                    {/*   <div className="form-group">
                <label for="category">Category</label>
                <select id="category" name="category_id" required>
                    <option value="">Select Category</option>
                   
                </select>
            </div>
            <div className="form-group">
                <label for="image">Product Image</label>
                <input type="file" id="image" name="image" required  className="input-field"/>
            </div>*/}
                    <button type="submit" id="add-button">Add Product</button>
                </form>
            </div>
        )
    }
}