import React, { Component } from 'react';

const UserContext = React.createContext();

/** User information */
class UserContextRoot extends Component {

    state = {
        loginData: {
            userName: null,
            isAdmin: false
        }
    };

    events = {
        onLoggedIn: this.loggedIn.bind(this),
        onLoggedOut: this.loggedOut.bind(this)
    };

    loggedIn(name, admin) {
        this.setState({
            loginData: {
                userName: name,
                isAdmin: admin
            }
        });
    }

    loggedOut() {
        this.setState({
            loginData: {
                userName: null,
                isAdmin: false
            }
        });
    }

    render() {
        const props = {
            data: this.state.loginData,
            events: this.events
        };

        return (
            <UserContext.Provider value={props}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export { UserContext, UserContextRoot };