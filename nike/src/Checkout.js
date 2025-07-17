import React from "react";
import cookies from 'js-cookie';
export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shoes_id: "",
            UserId: "",
            quantity: "",
            total: "",
            order_date: "",
            name: "",
            address: "",
            email: "",
            cartItem: [],
            //   user_id: "",
        };
    }
    componentDidMount() {
        const path = window.location.pathname; // e.g., "/product-details/123"
        const id1 = path.split("/").pop(); // e.g., "123"
        console.log("ID from URL:", id1);
        this.setState({ UserId: id1 });

        const user_id = cookies.get('id'); // get user ID from cookies
        //   console.log('user id:', user_id);

        if (user_id) {
            this.setState({ user_id });  // optionally set in state
            this.display(user_id);       // only fetch cart if logged in
        } else {
            alert("User not logged in. Cart is empty.");
            window.location.href = '/login';
        }

        const shoesid = cookies.get('shoes_id');
        console.log('shoes id get from cookie', shoesid);
        this.setState({ shoes_id: shoesid });
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
                    quantity: cart.quantity,
                    total: product.price + product.price
                };
            })
        );
        this.setState({ cartItem: cartItemsWithDetails });
    };

    handleOrder = async (e) => {
        e.preventDefault();
        const { UserId, shoes_id, name, address, email, cartItem } = this.state;
        const order_date = new Date().toISOString().slice(0, 19).replace('T', ' ');


        const total = cartItem.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const quantity = cartItem.reduce((sum, item) => sum + item.quantity, 0);


        console.log('shoes_id', shoes_id);

        try {
        const response = await fetch(`http://localhost:4000/insert_order/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
             body: JSON.stringify({
                UserId,
                shoes_id,
                name,
                total,
                quantity,
                order_date,
                address,
                email
            }),
        });
            console.log('Order success', response);
            alert("Order Submitted!");
            this.setState({
                UserId: "",
                shoes_id: "",
                quantity: "",
                total: "",
                order_date: "",
                name: "",
                address: "",
                email: ""
            });
            window.location.href = '/order';
        } catch (error) {
            console.log('Error submitting order:', error);
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;  //name and value extract by event
        console.log(name, value);
        this.setState({
            [name]: value //update state with new input value

        });
    };

    render() {
        //calculate the grand total
        const grandTotal = this.state.cartItem.reduce((sum, item) => {
            return sum + (item.price * item.quantity)
        }, 0)
        return (
            <>
                <section className="checkout-section">
                    <div className="container" style={{width:"60%", textAlign:"left"}}>
                        <h2>Checkout</h2>

                        <h3>Your Order Summary:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cartItem.map((cart, index) => (
                                    <tr key={index}>
                                        <td>{cart.collection_name}</td>
                                        <td>$ {cart.price}</td>
                                        <td>{cart.quantity}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td><strong>Grand Total:</strong></td>
                                    <td><strong>${grandTotal}</strong></td>
                                </tr>
                            </tbody>
                        </table>


                        <form onSubmit={this.handleOrder}>
                            <h3>Enter your details:</h3>
                            <div class="form-group">
                                <label for="name">Full Name</label>
                                <input type="text" id="name" name="name" required value={this.name} onChange={this.handleInputChange} />
                            </div>
                            <div class="form-group">
                                <label for="address">Shipping Address</label>
                                <input type="text" id="address" name="address" required value={this.address} onChange={this.handleInputChange} />
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required value={this.email} onChange={this.handleInputChange} />
                            </div>
                            <button type="submit" class="button"  style={{ padding: "7px", borderRadius: "10px", border: "2px solid darkblue", width: "90px", marginLeft: "10px" }}>Place Order</button>
                        </form>

                    </div>
                </section>

                <footer>
                    <div class="container">
                        <p style={{color:"white"}}>&copy; 2024 Shoe Store. All Rights Reserved.</p>
                    </div>
                </footer>
            </>
        )
    }
}