import React, { Component } from 'react';

export class RateStars extends Component {

	constructor(props) {
		super(props);

		const origMark = props.mark || 0;

		this.state = {
			originalMark: origMark,
			mark: origMark
		};
	}

	markStarHovered(newMark) {
		this.setState({ mark: newMark });
	}

	restoreMark() {
		this.setState({ mark: this.state.originalMark });
	}

	newRatingSelected(newMark) {
		this.setState({ originalMark: newMark });
		this.props.onRated(newMark);
    }

	render() {
		const filledStar = String.fromCharCode(9733);
		const emptyStar = String.fromCharCode(9734);

		return (
			<span className="lead" onMouseLeave={this.restoreMark.bind(this)}>
				{[1, 2, 3, 4, 5].map(n => (
					<a
						href="javascript:void(0)"
						key={n}
						onMouseEnter={this.markStarHovered.bind(this, n)}
						onClick={this.newRatingSelected.bind(this, n)}>
						{this.state.mark >= n ? filledStar : emptyStar}
					</a>
				))}
			</span>
		);
    }
}