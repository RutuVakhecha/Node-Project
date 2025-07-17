import React from "react";
import './Login.css';

export default class Login extends React.Component {
    render() {
        var globalthis=this;
      //  console.log(this.props);
        return (
            <div className="login-container">
                <form onSubmit={(event) => globalthis.props.handleSubmit(event)} method="post">
                    <label><b> Email</b></label>
                    <input type="text" name="email" placeholder="Enter your email" id="style-id"
                        value={this.props.email} onChange={this.props.handleInputChange} /><br />
                    <label><b>Password </b></label>
                    <input type="password" name="password" placeholder="Enter your password" id="style-id"
                        value={this.props.password} onChange={this.props.handleInputChange} /><br />
                    <input type="submit" name="submit" id="submit-button" value="Login" />
                    {this.props.errorMessage && <p className="error">{this.props.errorMessage}</p>}
                    <p>Don't have an account? <a href="/register">Register here</a>.</p>
                </form>
            </div>
        );
    }
}