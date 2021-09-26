import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

/** Review editing form */
export class ReviewInfo extends Component {

    static USERS_API_URL = '/api/Users';
    static REVIEWS_API_URL = '/api/Reviews';

    constructor(props) {
        super(props);

        this.state = {
            isEditing: props.match.params.id != null,
            users: [],
            reviewInfo: {
                id: props.match.params.id || 0,
                timestamp: null,
                targetUser: '',
                reviewers: []
            },
            redirect: false
        };

        this.dataSubmit = this.dataSubmit.bind(this);
        this.targetUserChanged = this.targetUserChanged.bind(this);
        this.participantsChanged = this.participantsChanged.bind(this);

        this.loadData();
    }

    async loadData() {
        // Users list
        const resp = await fetch(ReviewInfo.USERS_API_URL);
        const info = (await resp.json()).map(u => ({ login: u.login, name: u.name }));
        this.setState({ users: info });

        // Editing review info
        if (this.state.isEditing) {
            const reviewId = this.state.reviewInfo.id;
            const reviewResp = await fetch(`${ReviewInfo.REVIEWS_API_URL}/${reviewId}`);
            const loadedReviewInfo = await reviewResp.json();

            this.setState({
                reviewInfo: {
                    id: loadedReviewInfo.id,
                    timestamp: loadedReviewInfo.timestamp,
                    targetUser: loadedReviewInfo.targetUserLogin,
                    reviewers: loadedReviewInfo.reviewerLogins
                }
            });
        }
    }

    targetUserChanged(e) {
        let changedReviewInfo = this.state.reviewInfo;
        changedReviewInfo.targetUser = e.target.value;
        this.setState({ reviewInfo: changedReviewInfo });
    }

    participantsChanged(e) {
        const changedReviewInfo = this.state.reviewInfo;
        const selectedValues = Array.from(e.target.selectedOptions).map(o => o.value);
        changedReviewInfo.reviewers = selectedValues;

        this.setState({ reviewInfo: changedReviewInfo });
    }

    async dataSubmit(e) {
        e.preventDefault();

        const info = this.state.reviewInfo;
        const dataToSubmit = {
            id: info.id,
            timestamp: info.timestamp,
            targetUserLogin: info.targetUser,
            reviewerLogins: info.reviewers
        };

        const reviewApiUrl = this.state.isEditing
            ? `${ReviewInfo.REVIEWS_API_URL}/${info.id}`
            : ReviewInfo.REVIEWS_API_URL;

        await fetch(reviewApiUrl, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSubmit),
            method: this.state.isEditing ? 'PUT' : 'POST',
        });

        this.setState({ redirect: true });
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderReviewForm()}
                {this.state.redirect && <Redirect to="/reviews" />}
            </div>
        );
    }

    renderHeader() {
        return this.state.isEditing
            ? (
                <header>
                    <h1>Editing</h1>
                    <p className="lead">Editing review participants</p>
                </header>
            )
            : (
                <header>
                    <h1>New review</h1>
                    <p className="lead">Creating new performance review</p>
                </header>
            );
    }

    renderReviewForm() {
        return (
            <form onSubmit={this.dataSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2">User for review</label>
                    <div className="col-sm-5">
                        <select
                            className="form-control"
                            value={this.state.reviewInfo.targetUser}
                            required
                            disabled={this.state.isEditing}
                            onChange={this.targetUserChanged}>
                            <option />
                            {this.state.users.map(u => (
                                <option key={u.login} value={u.login}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2">Participants</label>
                    <div className="col-sm-5">
                        <select
                            className="form-control"
                            multiple required
                            value={this.state.reviewInfo.reviewers}
                            onChange={this.participantsChanged}>
                            {this.renderFilteredParticipants()}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="offset-sm-2 col-5">
                        <button className="btn btn-primary">Save info</button>
                        &nbsp;
                        <Link className="btn btn-light" to="/reviews">Cancel</Link>
                    </div>
                </div>
            </form>
        )
    }

    renderFilteredParticipants() {
        const targetLogin = this.state.reviewInfo.targetUser;
        const availableParticipants = this.state.users.filter(u => u.login !== targetLogin);

        return availableParticipants.map(u => (
            <option key={u.login} value={u.login}>
                {u.name}
            </option>
        ));
    }
}