﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoadingIndicator } from './LoadingIndicator';

/** Reviews table */
export class Reviews extends Component {

    static API_URL = '/api/Reviews';

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            reviews: []
        };

        this.loadReviews();
    }

    async loadReviews() {
        const resp = await fetch(Reviews.API_URL);
        const reviewsInfo = await resp.json();

        this.setState({
            isLoading: false,
            reviews: reviewsInfo
        });
    }

    render() {
        return (
            <div>
                <header className="h1 row">
                    <div className="col-auto mr-auto">Performance reviews</div>
                    <div className="col-auto">
                        <Link className="btn btn-primary" to="/reviews/create">Add review</Link>
                    </div>
                </header>

                <p className="lead">All users' performance reviews</p>

                {this.state.isLoading ? <LoadingIndicator /> : this.renderReviewsTable() }
            </div>
        );
    }

    renderReviewsTable() {
        return (this.state.reviews.length > 0)
            ? (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="w-auto" role="col">User name</th>
                            <th className="w-25" role="col">Date</th>
                            <th className="w-5" role="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reviews.map(rev => (
                            <tr key={rev.id}>
                                <td>
                                    <Link to={`/reviews/edit/${rev.id}`}>{rev.user.name}</Link>
                                </td>
                                <td>
                                    {new Date(rev.timestamp).toLocaleDateString()}
                                </td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        title="Remove review">
                                        &times;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            : <p className="alert alert-info">No reviews created</p>
    }
}