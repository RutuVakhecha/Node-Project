import React from "react";
import { Link } from "react-router-dom";

export default class Manage_users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            users: [],

        };
    }
    componentDidMount() {
        this.display();
    }
    display = async () => {
        const response = await fetch("http://localhost:4000/display");
        const data = await response.json();
        this.setState({ users: data }); //array update data values store in users state 

        console.log(data);
    }
    handleDelete = async (id) => {
        console.log(id);
        await  fetch(`http://localhost:4000/delete${id}` ,{
            method:'GET'
        });
        this.setState({ users : this.state.users.filter (user => user.UserId !== id)

        });
    }
    render() {
        return (
            <>
                <section class="manage-users">
                    <div class="container">
                        <h1>Manage Users</h1>


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
                                            <button style={{ padding: "7px", borderRadius: "10px", border: "2px solid darkblue", width: "60px" }}>
                                                <Link to={`/edit-users/${user.UserId}`}
                                                >Edit </Link>
                                            </button>
                                            <button onClick={() => this.handleDelete(user.UserId)}
                                                style={{ padding: "7px", borderRadius: "10px", border: "2px solid darkblue", width: "60px", marginLeft: "10px" }}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </section>

            </>
        )
    }
}