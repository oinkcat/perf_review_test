import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoadingIndicator } from './LoadingIndicator';

import FetchUtils from './FetchUtils';

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

        const resp = await FetchUtils.request(`${Users.API_URL}/with/rating`);
        const usersData = await resp.json();

        this.setState({
            isLoading: false,
            data: usersData
        });
    }

    async removeUser(login) {
        await FetchUtils.request(`${Users.API_URL}/${login}`, 'DELETE');
        await this.fetchUsersInfo();
    }

    render() {
        return (
            <div>
                <header className="h1 row">
                    <div className="col-auto mr-auto">Employees</div>
                    <div className="col-auto">
                        <Link className="btn btn-primary" to="/users/register">Register new</Link>
                    </div>
                </header>

                <p className="lead">All registered employees</p>

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
                            <th className="w-50" role="col">Employee name</th>
                            <th className="w-auto" role="col">Current rating</th>
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
                                <td>
                                    {user.rating
                                        ? ( 
                                            <span>
                                                <strong className={this.getClassForRating(user)}>
                                                    {user.rating}
                                                </strong>
                                                &nbsp;
                                                ({user.marksCount})
                                            </span>
                                        )
                                        : '-'}
                                </td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        title="Remove employee"
                                        onClick={this.removeUser.bind(this, user.login)}>
                                        &times;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            : <p className="alert alert-info">No employees registered</p>
    }

    getClassForRating(user) {
        if (user.rating >= 4) return 'text-success';
        else if (user.rating >= 3) return 'text-warning';
        else return 'text-danger';
    }
}
