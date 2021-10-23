import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

/** User information */
class UserContextProvider extends Component {

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

        return <Provider value={props}>
            {this.props.children}
        </Provider>;
    }
}

export { UserContextProvider, Consumer as UserContextConsumer };