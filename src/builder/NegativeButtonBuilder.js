import react from 'react';
import './ButtonBuilder.css';

export default class NegativeButton extends react.Component {

	onClickHandler = (event) => {
		event.preventDefault();
		this.props.callback();
	}

	render() {
		return(
			<button id="negative-button" onClick={this.onClickHandler}>{this.props.message}</button>
		)
	}
}