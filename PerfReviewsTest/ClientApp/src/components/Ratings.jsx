import React, { Component } from 'react';
import { RateStars } from './RateStars';
import { UserContext } from './UserContext';

/** Ratings table */
export class Ratings extends Component {
    static contextType = UserContext;

    static RATES_API_URL = '/api/Ratings';

    constructor(props) {
        super(props);

        this.state = {
            currentUser: '',
            ratings: []
        };

        this.loadReviewsToRate = this.loadReviewsToRate.bind(this);
    }

    componentDidMount() {
        const reviewerLogin = this.context.data.userName;

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
                    <div className="col-auto mr-auto">Employee ratings</div>
                </header>

                <p className="lead">Rate employees listed below</p>

                {this.renderRatingsTable()}
            </div>
        );
    }

    renderRatingsTable() {
        return (this.state.ratings.length > 0)
            ? (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="w-75">Employee name</th>
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
            : <p className="alert alert-info">No available employees for review</p>;
    }
}