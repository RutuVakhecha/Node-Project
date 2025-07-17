import React from "react";
import './Admin.css';
import { Link } from "react-router-dom";

export default class Edit_Users extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            UserId:"",
            Name:"",
            Email:"",
            Password:"",
            Address:"",
            users:[]
        }
    }
    componentDidMount() {
        this.display();
    }
    display = async (id) => {
        const response = await fetch(`http://localhost:4000/display${id}`);
        const data = await response.json();
        this.setState({ users: data }); //array update data values store in users state 

        console.log(data);
    }
    
    render() {
        return (
            <>
                <section class="manage-users">
                    <div class="container">
                        <h1>Edit Users</h1>


                        <table class="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((user, index) => (

                                    <tr>
                                        <td>{user.UserId}</td>
                                        <td>{user.Name}</td>
                                        <td>{user.Email}</td>
                                        <td>
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </section>

                {/*   <div className='main'>
                <div className='form-container'>
                    <div className='main-class'>
                        <form onSubmit={this.props.handleSubmit} method="post">

                            <label><b style={{ fontSize: "20px" }}>Name</b></label>
                            <input type='text' name='name' id='forms-id-name'  onChange={this.props.handleInputChange}
                                placeholder='Enter your Name' /><br></br>

                            <label><b style={{ fontSize: "20px" }}>Email</b></label>
                            <input type='email' name='email' id='forms-id-email'  onChange={this.props.handleInputChange}
                                placeholder='Enter your Email' /><br></br>

                            <label><b style={{ fontSize: "20px" }}>Password</b></label>
                            <input type='password' name='password' id='forms-id-password'  onChange={this.props.handleInputChange}
                                placeholder='Enter your Password' /><br></br>


                            <label><b style={{ fontSize: "20px" }}>Address</b></label>
                            <input type='text' name='address' id='forms-id-password' onChange={this.props.handleInputChange}
                                placeholder='Enter your Address' /><br></br>

                            <button type='submit' className='submit-btn'>Submit</button>
                        </form><br></br>
                        <p>Already have an account? <a href="/login">Login here</a> </p>
                    </div>
                </div>
            </div>*/}

            </>
        )
    }
}