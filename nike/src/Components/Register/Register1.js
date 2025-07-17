import React from "react";
import Register from './Register'; // import the Register component

export default class Register1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            errorMessage: '' // To store the error message
        };
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    // Validate fields and set error message if needed
    validateFields = () => {
        const { name, email, password, address } = this.state;

        if (!name || !email || !password || !address) {
            this.setState({ errorMessage: "All fields are required!" });
            return false;
        }
        

        this.setState({ errorMessage: '' }); // Clear error if all fields are valid
        return true;
    };
    componentDidMount() {
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        if (!this.validateFields()) {
            return; // Stop submitting if validation fails
        }

        try {
            const response = await fetch("http://localhost:4000/register", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            });

            const data = await response.json();

            if (data.message && data.message.includes('Email already exists')) {
                this.setState({ errorMessage: data.message });  // 
            } else {
                console.log('Success:', data);
                alert("sucessfully register");
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    address: '',
                    errorMessage: ''
                })
                window.location.href = '/login';
                // Handle success (Redirect, show success message, etc.)
            }
        } catch (error) {
            console.error('Error:', error);
            this.setState({ errorMessage: 'An unexpected error occurred. Please try again.' });
        }
    };

    render() {
        return (
            <Register
                name={this.state.name}
                email={this.state.email}
                password={this.state.password}
                address={this.state.address}
                errorMessage={this.state.errorMessage}  // Passing errorMessage to the Register component
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}