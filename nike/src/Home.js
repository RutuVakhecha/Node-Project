import './Home.css';
import React from "react";
import Home1 from './Home1';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    // Calling fetchProducts when the component is mounted
    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:4000/products`);
            const data = await response.json();
            this.setState({ products: data });  // Update state with the fetched data
            console.log(data);  // You can remove this later, but for now it will log the data to the console
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    render() {
        return (
            <Home1 products={this.state.products} />
        );
    }
}
