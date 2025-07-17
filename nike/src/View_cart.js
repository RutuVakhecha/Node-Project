import React from "react";
import cookies from 'js-cookie';
import { Link } from "react-router-dom";


export default class View_cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shoes_id: "",
            cartItem: [],
         //   user_id: "",
        };
    }
 
     componentDidMount() {
            const path = window.location.pathname; // e.g., "/product-details/123"
            const id1 = path.split("/").pop(); // e.g., "123"
            console.log("ID from URL:", id1);
            this.setState({ shoes_id: id1 });
    
            const user_id = cookies.get('id'); // get user ID from cookies
            console.log('user id:', user_id);
    
            if (user_id) {
                this.setState({ user_id });  // optionally set in state
                this.display(user_id);       // only fetch cart if logged in
            } else {
                console.log("User not logged in. Cart is empty.");
            }
        }

    display = async (id) => {
        console.log(id);
        const response = await fetch(`http://localhost:4000/display_cart/${id}`);
        const cartData = await response.json();

        const cartItemsWithDetails = await Promise.all(
            cartData.map(async (cart) => {
                const res = await fetch(`http://localhost:4000/details/${cart.shoes_id}`);
                const productData = await res.json();
                const product = productData[0] || {};
                return {
                    ...cart,
                    price: product.price,
                    collection_name: product.collection_name,
                    total: product.price * cart.quantity
                };
            })
        );
        this.setState({ cartItem: cartItemsWithDetails });
    };

    handleDelete = async (id) => {
        console.log(id);
        await fetch(`http://localhost:4000/delete_cart/${id}`, {
            method: 'GET',
        });
        this.setState({
            cartItem: this.state.cartItem.filter(cart => cart.cart_id !== id) // specific user id not matched it return that
        });
    };


    render() {
        const { cartItem } = this.state;
                const user_id = cookies.get('id'); // get user ID from cookies

           
        return (
            <>

                <section className="cart-section">
                    <div className="container">
                        <h2>Your Cart</h2>
                        {user_id !== ':id' ? (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.cartItem.map((cart, index) => (
                                            <tr key={cart.cart_id}>
                                                <td>{cart.collection_name}</td>
                                                <td>{cart.price}</td>
                                                <td>{cart.quantity}</td>
                                                <td>{cart.total}</td>
                                                <td>
                                                    <button onClick={() => this.handleDelete(cart.cart_id)}
                                                        style={{ padding: "7px", borderRadius: "10px", border: "2px solid darkblue", width: "60px", marginLeft: "10px" }}>Remove</button>
                                                </td></tr>

                                        ))}
                                    </tbody>
                                </table>
                                
                                <Link to={`/checkout/${user_id}`}>
                                    <div className="cart-actions">
                                        <a href="/checkout" class="button">Proceed to Checkout</a>
                                    </div></Link>
                            </>
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                </section>
            </>


        )
    }
}