import React from "react";
import './Header.css';
import cookies from 'js-cookie';
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', // State to hold the username
            user_ID:'',
        };
    }
    componentDidMount() {
        // Retrieve the username from the cookie after the component is mounted
        const username = cookies.get('username');
        if (username) {
            this.setState({ username });
        }
        const user_id = cookies.get('id'); // get user ID from cookies
        if(user_id)
        {
            this.setState({user_ID : user_id});
        }
        console.log('user id in header:', user_id);
    }
    handleLogout = () => {
        cookies.remove("id");
        cookies.remove("username");
        this.setState({ username: '' });
    }
    render() {
        const { username } = this.state;
        const {user_ID} = this.state; 
        return (
            <html >
                <head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0" />
                </head>
                <body>

                    <div className='main-class'>
                        <img src='http://localhost:4000/images/ball.jpg' alt='nike' className='img1'></img>
                        <div className='menu'>

                            <b><a href="#find a store">Find a Store </a></b>|
                            <b><a href="#help">Help</a></b>|
                            <b><a href="/register">Join Us</a></b>|
                            <Link to={`/view-cart/:id${user_ID}`}>
                            <b><a href="/view-cart/:id">Cart</a></b>| </Link>
                            
                            {
                                username ? (
                                    <>
                                        <b><p> Welcome, {username}</p></b>|
                                        <b><button onClick={this.handleLogout} id="logout-btn">Logout</button></b>
                                    </>
                                ) : (
                                    <b><a href="/login">Login |</a></b>
                                )
                            }
                        </div><br></br><br></br>
                    </div>
                    <div className='container'>
                        <div className='nikelogo'>
                            <img src='http://localhost:4000/images/nikelogo.jpg' alt='nike' style={{ height: "32px", paddingTop: "15px" }}></img>
                        </div>
                        <div className='navbar' >

                            <b><a href="#new & featured">New & Featured</a></b>
                            <b><a href="#men">Men</a></b>
                            <b><a href="#women">Women</a></b>
                            <b><a href="#kids">Kids</a></b>
                            <b><a href="#sale">Sale</a></b>
                            <b><a href="#customize">Customize</a></b>
                            <b><a href="#SNKRS">SNKRS</a></b>
                            <div className='icon'>
                                <i class="fa fa-search" id='search-icon'></i>
                                <input type="text" placeholder='Search' className='search-input' />
                            </div>
                            <i class="fa fa-heart-o" id='heart'></i>
                            <i class="fa fa-shopping-bag" id="bag"></i>

                        </div>
                    </div>
                </body>
            </html>
        );
    }
}