import React from "react";
import './Admin.css';
import { Link } from "react-router-dom";
export default class Manage_products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            shoes_id:""
        };
    }

    componentDidMount() {
        this.display();
    }
    display = async () => {
        const response = await fetch("http://localhost:4000/display_products");
        const data = await response.json();
        this.setState({ products: data }); //array update data values store in users state 

        console.log(data);
    }
    handleDelete = async(shoes_id) =>{
      console.log(shoes_id);
     await fetch(`http://localhost:4000/delete_product/${shoes_id}`, {
        method: 'GET',
    });
    this.setState({
        products : this.state.products.filter(product => product.shoes_id !== shoes_id)
    });
    }
    render() {
        return (
            <>
                <header>
                    <div class="container">
                        <h1>Manage Products - Shoe Store</h1>
                    </div>
                </header>

                <section class="admin-section">
                    <div class="container3">
                        <h2>Product List</h2>
                            <Link to="/add_products">Add New Product</Link>
                        <table>

                            <thead>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Action</th>
                                {this.state.products.map((product, index) => (
                                    <tr key={product.shoes_id}>

                                        <td>{product.collection_name}</td>

                                        <td>{product.price}</td>

                                        <td>
                                            <button  style={{padding:"7px", borderRadius:"10px",border:"2px solid darkblue",width:"60px"}}>
                                           <Link to={`/edit_products/${product.shoes_id}`}
                                           >Edit </Link>
                                            </button>
                                            <button onClick={()=>this.handleDelete(product.shoes_id)} 
                                                style={{padding:"7px", borderRadius:"10px",border:"2px solid darkblue",width:"60px",marginLeft:"10px"}}>Delete</button>
                                           
                                        </td>
                                    </tr>

                                ))}
                            </thead>





                        </table>
                    </div>
                </section>

                <footer>
                    <div class="container">
                        <p style={{ color: "white" }}>&copy; 2025 Shoe Store. All Rights Reserved.</p>
                    </div>
                </footer>
            </>
        )


    }
}
