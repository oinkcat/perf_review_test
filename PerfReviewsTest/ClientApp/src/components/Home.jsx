import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { UserContext } from './UserContext';

import FetchUtils from './FetchUtils';

export class Home extends Component {
    static displayName = Home.name;
    static contextType = UserContext;

    static USER_API = '/api/Users';

    static testUserLogin = 'user';

    constructor() {
        super();

        this.state = {
            users: [],
            redirect: false,
            admin: false
        };

        this.logInAsEmployee = this.logInAsEmployee.bind(this);
        this.logInAsAdmin = this.logInAsAdmin.bind(this);

        this.loadUsers();
    }

    componentDidMount() {
        this.context.events.onLoggedOut();
    }

    async loadUsers() {
        const resp = await FetchUtils.request(Home.USER_API);

        this.setState({
            users: await resp.json()
        });
    }

    async logInAsEmployee(userName) {
        const loginSuccess = await FetchUtils.loginRequest(userName);

        if (loginSuccess) {
            this.context.events.onLoggedIn(userName, false);

            this.setState({
                redirect: true,
                admin: false
            });
        }
    }

    async logInAsAdmin() {
        const ADMIN_USER_NAME = 'admin';

        const loginSuccess = await FetchUtils.loginRequest(ADMIN_USER_NAME);

        if (loginSuccess) {
            this.context.events.onLoggedIn(ADMIN_USER_NAME, true);

            this.setState({
                redirect: true,
                admin: true
            });
        }
    }

    render () {
        return (
            <div className="container text-center">
                {this.state.redirect &&
                    <Redirect to={this.state.admin ? '/users' : '/ratings'} />}

                <h1 className="display-4">Employees Performance Review</h1>

                <div className="container mt-5">
                    <div className="row lead">
                        <div className="col text-center">
                            Select user to login
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md text-center mb-sm-3">
                            <p>
                                <strong>Admin</strong>
                            </p>
                            <p>Manage users and performance reviews</p>
                            <div className="mt-2">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={this.logInAsAdmin}>
                                    Login as admin
                                </button>
                            </div>
                        </div>
                        <div className="col-md text-center mb-sm-3">
                            <p>
                                <strong>Employee</strong>
                            </p>
                            <p>Rate your coworkers</p>
                            <div className="mt-2">
                                <div className="btn-group" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-success dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        Login as ...
                                    </button>

                                    <div className="dropdown-menu">
                                        {this.state.users.map(u => (
                                            <a key={u.login}
                                                href="javascript:void(0)"
                                                className="dropdown-item"
                                                onClick={this.logInAsEmployee.bind(this, u.login)}>
                                                {u.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
