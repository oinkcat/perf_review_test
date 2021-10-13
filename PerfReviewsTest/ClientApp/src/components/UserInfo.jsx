import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

/** User information editing form */
export class UserInfo extends Component {

    static API_URL = '/api/Users';

    constructor(props) {
        super(props);

        this.state = {
            isEditing: props.match.params.id != null,
            userInfo: {
                login: '',
                name: ''
            },
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.dataSubmit = this.dataSubmit.bind(this);

        if (this.state.isEditing) {
            this.loadUserInfo();
        }
    }

    async loadUserInfo() {
        const resp = await fetch(`${UserInfo.API_URL}/${this.props.match.params.id}`);
        const userInfoFromServer = await resp.json();

        this.setState({
            userInfo: {
                login: userInfoFromServer.login,
                name: userInfoFromServer.name
            }
        });
    }

    handleChange(e) {
        let changedUserInfo = this.state.userInfo;
        changedUserInfo[e.target.name] = e.target.value;

        this.setState({
            userInfo: changedUserInfo
        });
    }

    async dataSubmit(e) {
        e.preventDefault();

        await fetch(UserInfo.API_URL, {
            body: JSON.stringify(this.state.userInfo),
            method: this.state.isEditing ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        this.setState({ redirect: true });
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderUserForm()}
                {this.state.redirect && <Redirect to="/users" />}
            </div>
        );
    }

    renderHeader() {
        return this.state.isEditing
            ? (
                <header>
                    <h1>{this.props.match.params.id}</h1>
                    <p className="lead">Employee information</p>
                </header>
            )
            : (
                <header>
                    <h1>Employee registration</h1>
                    <p className="lead">Enter all required info</p>
                </header>
            );
    }

    renderUserForm() {
        return (
            <form className="mt-3" onSubmit={this.dataSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2">Login</label>
                    <div className="col-sm-5">
                        <input type="text" required
                            className="form-control"
                            name="login"
                            maxLength={16}
                            readOnly={this.state.isEditing}
                            value={this.state.userInfo.login}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2">Name</label>
                    <div className="col-sm-5">
                        <input type="text" required
                            className="form-control"
                            name="name"
                            maxLength={64}
                            value={this.state.userInfo.name}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <hr />
                <div className="form-group row">
                    <div className="offset-sm-2 col-sm-5">
                        <button className="btn btn-primary">Save info</button>
                        &nbsp;
                        <Link className="btn btn-light" to="/users">Cancel</Link>
                    </div>
                </div>
            </form>
        );
    }
}