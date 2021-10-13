import React, { Component } from 'react';
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

        this.removeReview = this.removeReview.bind(this);

        this.loadReviews();
    }

    async loadReviews() {
        this.setState({ isLoading: true });

        const resp = await fetch(Reviews.API_URL);
        const reviewsInfo = await resp.json();

        this.setState({
            isLoading: false,
            reviews: reviewsInfo
        });
    }

    async removeReview(id) {
        await fetch(`${Reviews.API_URL}/${id}`, { method: 'DELETE' });
        await this.loadReviews();
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

                <p className="lead">All employees' performance reviews</p>

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
                            <th className="w-auto" role="col">Employee name</th>
                            <th className="w-25" role="col">Review date</th>
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
                                        title="Remove review"
                                        onClick={this.removeReview.bind(this, rev.id)}>
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