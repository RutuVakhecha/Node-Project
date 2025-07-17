import React from "react";
import Login from "./Login";
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

export default class Login1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            errorMessage: '',
            loggedIn: false,
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            const response = await fetch('http://localhost:4000/login', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    
                },
                body:JSON.stringify({email,password})
            });

            const data = await response.json();
            if(data.message)
            {
                this.setState({errorMessage:data.message})
            }else if(data.success){
                alert('login sucessfully');
             cookies.set('username',data.username);
             cookies.set('id',data.id);
             window.location.href = "/home"; // Redirect to home
            }
        }catch (error) {
            console.error("Error during login:", error);
            this.setState({
                errorMessage: "Something Went Wrong!"
            });
        }
    };

    render() {
        return (
            <Login
                username={this.state.username}
                email={this.state.email}
                password={this.state.password}
                errorMessage={this.state.errorMessage}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}
