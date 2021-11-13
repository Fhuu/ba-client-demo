import React from 'react';
import './ButtonBuilder.css';

export default class PositiveButton extends React.Component {
	
	OnClickHandle = (event) => {
		event.preventDefault();
		this.props.callback();
	}
	
	render() {
		return(
			<button onClick={this.OnClickHandle} id="confirm-button">{this.props.message}</button>
		);
	}
}