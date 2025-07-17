import React from "react";
import './Register.css';

export default class Register extends React.Component {
    render() {
        const { name, email, password, address, errorMessage } = this.props;
        return (
            <div className='main'>
                <div className='form-container'>
                    <div className='main-class'>
                        <form onSubmit={this.props.handleSubmit} method="post">

                            <label><b style={{ fontSize: "20px" }}>Name</b></label>
                            <input type='text' name='name' id='forms-id-name' value={name} onChange={this.props.handleInputChange}
                                placeholder='Enter your Name' /><br></br>

                            <label><b style={{ fontSize: "20px" }}>Email</b></label>
                            <input type='email' name='email' id='forms-id-email' value={email} onChange={this.props.handleInputChange}
                                placeholder='Enter your Email' /><br></br>

                            <label><b style={{ fontSize: "20px" }}>Password</b></label>
                            <input type='password' name='password' id='forms-id-password' value={password} onChange={this.props.handleInputChange}
                                placeholder='Enter your Password' /><br></br>


                            <label><b style={{ fontSize: "20px" }}>Address</b></label>
                            <input type='text' name='address' id='forms-id-password' value={address} onChange={this.props.handleInputChange}
                                placeholder='Enter your Address' /><br></br>

                            {errorMessage && <div className="error">{errorMessage}</div>}
                            <button type='submit' className='submit-btn'>Submit</button>
                        </form><br></br>
                        <p>Already have an account? <a href="/login">Login here</a> </p>
                    </div>
                </div>
            </div>
        );
    }
}