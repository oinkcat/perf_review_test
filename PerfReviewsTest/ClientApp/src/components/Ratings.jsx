import React, { Component } from 'react';
import { RateStars } from './RateStars';
import { CommentForm } from './CommentForm';
import { UserContext } from './UserContext';

import FetchUtils from './FetchUtils';

/** Ratings table */
export class Ratings extends Component {
    static contextType = UserContext;

    static RATES_API_URL = '/api/Ratings';

    constructor(props) {
        super(props);
        
        this.state = {
            currentUser: '',
            ratings: [],
            selectedForComment: null
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
        const ratingsResp = await FetchUtils.request(getListUrl);

        this.setState({
            ratings: await ratingsResp.json()
        });
    }

    async userRated(reviewId, rating) {
        const rateUrl = `${Ratings.RATES_API_URL}/rating/${reviewId}`;
        await FetchUtils.request(rateUrl, 'PUT', `"${rating}"`, {
            'Content-Type': 'application/json'
        });
    }

    async userCommented(reviewId, commentText) {
        const commentUrl = `${Ratings.RATES_API_URL}/comment/${reviewId}`;
        await FetchUtils.request(commentUrl, 'PUT', `"${commentText}"`, {
            'Content-Type': 'application/json'
        });
    }

    openCommentForm(userRatingItem) {
        this.setState({
            selectedForComment: userRatingItem
        });
    }

    commentModalClosing(written, text) {
        if (written) {
            this.userCommented(this.state.selectedForComment.id, text);
            this.state.selectedForComment.comment = text;
        }

        this.setState({
            selectedForComment: null
        });
    }

    render() {
        return (
            <div>
                <header className="h1 row">
                    <div className="col-auto mr-auto">Employee ratings</div>
                </header>

                <p className="lead">Rate employees listed below</p>

                {this.renderRatingsTable()}

                <CommentForm
                    item={this.state.selectedForComment}
                    onClosing={this.commentModalClosing.bind(this)} />
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
                            <th className="w-auto">Comment</th>
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
                                <td>
                                    <button
                                        className="btn btn-light"
                                        onClick={this.openCommentForm.bind(this, r)}>
                                        {r.comment.length > 0 ? 'Edit' : 'Write'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            : <p className="alert alert-info">No available employees for review</p>;
    }
}