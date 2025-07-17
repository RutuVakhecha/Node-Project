import React from "react";
import './Admin.css';
import cookies from 'js-cookie';
import { Link } from "react-router-dom"; // Import Link from React Router

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminname: '', // State to hold the username
        };
    }
    componentDidMount ()
    {
        const adminname = cookies.get('adminname');
        if (adminname) {
            this.setState({ adminname });
        }
    }
    handleLogout = () => {
            cookies.remove("adminname");
            this.setState({ adminname: '' });
           window.location.href = "/admin-login"; // Redirect to home

        }
render()
{
    const {adminname} = this.state;
    if(!cookies.get("adminname"))
        {
            window.location.href = "/admin-login"; // Redirect to home
        }
    return (

        
      <>
            <header>
                <div className="container1">
                    <h1>Admin Dashboard - Shoe Store</h1>
                </div>
            </header>
        
            <section className="admin-section">
                <div className="container1">
                    <h2 style={{color:"black"}}>Welcome, {adminname} !</h2>
                    <ul>
                        <li><Link to="/manage-products">Manage Products</Link></li>      
                        <li><Link to="/manage-users">Manage Users</Link></li>
                         <li><Link to="/manage-categories">Manage Product Categories</Link></li>
                        <button  onClick={this.handleLogout} id="logout-btn">Logout</button>
                    </ul>
                </div>
            </section>
        
            <footer>
                <div className="container1">
                    <p style={{color:"white"}}>&copy; 2024 Shoe Store. All Rights Reserved.</p>
                </div>
            </footer>
       </>
        
    )
}
}