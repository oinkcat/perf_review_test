import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import { Users } from './components/Users';
import { UserInfo } from './components/UserInfo';
import { Reviews } from './components/Reviews';
import { ReviewInfo } from './components/ReviewInfo';

import { Ratings } from './components/Ratings';

import { UserContextRoot } from './components/UserContext';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render () {
        return (
            <UserContextRoot>
                <Layout>
                    <Route exact path='/' component={Home} />

                    <Route exact path='/users' component={Users} />
                    <Route exact path='/users/register' component={UserInfo} />
                    <Route path='/users/edit/:id' component={UserInfo} />

                    <Route exact path='/reviews' component={Reviews} />
                    <Route exact path='/reviews/create' component={ReviewInfo} />
                    <Route exact path='/reviews/edit/:id' component={ReviewInfo} />

                    <Route exact path='/ratings' component={Ratings} />
                </Layout>
            </UserContextRoot>
        );
    }
}
