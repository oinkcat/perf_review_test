import React, { Component } from 'react';
import { RateStars } from './RateStars';

/** Ratings table */
export class Ratings extends Component {

    static USERS_API_URL = '/api/Users';
    static RATES_API_URL = '/api/Ratings';

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            currentUser: '',
            ratings: []
        };

        this.userSelected = this.userSelected.bind(this);
        this.loadReviewsToRate = this.loadReviewsToRate.bind(this);

        this.loadData();
    }

    async loadData() {
        const usersResp = await fetch(Ratings.USERS_API_URL);
        this.setState({
            users: await usersResp.json()
        });
    }

    async userSelected(e) {
        const reviewerLogin = e.target.value;
        this.setState({
            currentUser: reviewerLogin
        });

        this.loadReviewsToRate(reviewerLogin);
    }

    async loadReviewsToRate(reviewerLogin) {
        const getListUrl = `${Ratings.RATES_API_URL}/${reviewerLogin}`;
        const ratingsResp = await fetch(getListUrl);

        this.setState({
            ratings: await ratingsResp.json()
        });
    }

    async userRated(reviewId, rating) {
        const rateResp = await fetch(`${Ratings.RATES_API_URL}/${reviewId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: `"${rating}"`
        });

        console.log(rateResp.status);
    }

    render() {
        return (
            <div>
                <header className="h1 row">
                    <div className="col-auto mr-auto">User ratings</div>
                    <div className="col-3">
                        <select className="form-control" onChange={this.userSelected}>
                            <option />
                            {this.state.users.map(u => (
                                <option key={u.login} value={u.login}>{u.name}</option>)
                            )}
                        </select>
                    </div>
                </header>

                <p className="lead">Rate users listed below</p>

                {this.state.currentUser
                    ? this.renderRatingsTable()
                    : <p className="alert alert-info">Select user to view reviews</p>}
            </div>
        );
    }

    renderRatingsTable() {
        return (this.state.ratings.length > 0)
            ? (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="w-75">User name</th>
                            <th className="w-auto">Your rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ratings.map(r => (
                            <tr key={r.id}>
                                <td>{r.targetUser.name}</td>
                                <td>
                                    <RateStars
                                        mark={r.mark}
                                        onRated={this.userRated.bind(this, r.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            : <p className="alert alert-info">No available users for review</p>;
    }
}