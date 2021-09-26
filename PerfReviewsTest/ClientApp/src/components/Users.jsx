import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoadingIndicator } from './LoadingIndicator';

/** Users table */
export class Users extends Component {

    static API_URL = '/api/Users';

    static displayName = Users.name;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: []
        };
    }

    componentDidMount() {
        this.fetchUsersInfo();
    }

    async fetchUsersInfo() {
        this.setState({ isLoading: true });

        const resp = await fetch(Users.API_URL);
        const usersData = await resp.json();

        this.setState({
            isLoading: false,
            data: usersData
        });
    }

    async removeUser(login) {
        await fetch(`${Users.API_URL}/${login}`, { method: 'DELETE' });
        await this.fetchUsersInfo();
    }

    render() {
        return (
            <div>
                <header className="h1 row">
                    <div class="col-auto mr-auto">Users</div>
                    <div class="col-auto">
                        <Link className="btn btn-primary" to="/users/register">Register user</Link>
                    </div>
                </header>

                <p className="lead">All registered users</p>

                { this.state.isLoading ? <LoadingIndicator /> : this.renderUsersTable() }
            </div>
        );
    }

    renderUsersTable() {
        return (this.state.data.length > 0)
            ? (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="w-25" role="col">Login</th>
                            <th className="w-auto" role="col">User Name</th>
                            <th className="w-5" role="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(user => (
                            <tr key={user.login}>
                                <td>
                                    <Link to={`/users/edit/${user.login}`}>{user.login}</Link>
                                </td>
                                <td>{user.name}</td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        title="Remove user"
                                        onClick={this.removeUser.bind(this, user.login)}>
                                        &times;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            : <p className="alert alert-info">No users registered</p>
    }
}
