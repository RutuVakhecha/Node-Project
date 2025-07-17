import React from "react";
import Admin_login from "./Admin_login";
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });
export default class Admin_login1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            admin_name: "",
            errorMessage: '',
        }
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };
    handleSubmit = async (e) => {
        e.preventDefault()
        const {email,password} = this.state;

        try{
            const response = await fetch(`http://localhost:4000/admin-login`, {
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
                cookies.set("adminname", data.admin_name);
                cookies.set("id",data.id);

                window.location.href = "/dashboard"; // Redirect to home
            }
        }catch (error) {
            console.error("Error during login:", error);
            this.setState({
                errorMessage: "Something Went Wrong!"
            });
        }
    }
    render() {
        return (
            <Admin_login
                username={this.state.username}
                email={this.state.email}
                password={this.state.password}
                errorMessage={this.state.errorMessage}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}