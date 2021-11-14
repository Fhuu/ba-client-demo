import React from 'react';

import { checkAuth } from '../helper/Auth';
import Button from '../builder/PositiveButtonBuilder';


export default class Session extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			type : 'work',
			timer : 60,
			buttontype : 'start',
		}
		this.countdown = null;
	}

	startCountdown = () => {
		this.setState({
			buttontype : 'interrupt'
		}, () => {
			this.countdown = setInterval(() => {
				this.setState({
					timer : this.state.timer - 1
				}, () => {
					if(this.state.timer === 0) {
						this.completeTask();
						clearInterval(this.countdown);
					}
				});
			}, 1000);
		});
	}

	startSession = async () => {
		await checkAuth();
		this.startCountdown();
		fetch('/v1/task', {
			method: 'POST',
			headers : {
				'content-type' : 'application/json'
			},
			body : JSON.stringify({
				title : document.getElementById('task-title').value
			})
		});

	}

	pauseSession = () => {
		clearInterval(this.countdown);
		this.setState({
			buttontype : 'start'
		});
	}

	completeTask = () => {
		fetch('/v1/task/complete', {
			method: 'GET'
		});
	}

	renderSeconds = () => {
		let seconds = this.state.timer % 60;
		if(seconds <= 9) return `0${seconds}`;
		return seconds;
	}
	
	renderMinutes = () => {
		let minutes = parseInt(this.state.timer / 60);
		if(minutes <= 9) return `0${minutes}`;
		return minutes;
	}

	button = () => {
		if(this.state.buttontype === 'start') return <Button message="Start timer" callback={this.startSession} />;
		return <Button message="Pause Timer" callback={this.pauseSession}></Button>
	}
	
	render() {
		return(
			<div className="flex flex-col">
				<span>{this.renderMinutes()} : {this.renderSeconds()}</span>
				<input type="text" placeholder="Title" id="task-title" />
				{this.button()}
			</div>
		);
	}
}
