import React from 'react';

import { checkAuth } from '../helper/Auth';
import Button from '../builder/PositiveButtonBuilder';
import StopButton from '../builder/NegativeButtonBuilder';


export default class Session extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			work : true,
			timer : 1,
			buttontype : 'start',
			workcircle : 25,
			restcircle : 5
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
						this.changeSessionTime();
					}
				});
			}, 1000);
		});
	}

	startSession = async () => {
		let user = await checkAuth();
		if (user) {
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

	}

	pauseSession = () => {
		clearInterval(this.countdown);
		this.setState({
			buttontype : 'start'
		});
	}

	stopSession = () => {
		clearInterval(this.countdown);
		this.setState({
			buttontype : 'start',
			work : true,
			timer : this.state.workcircle * 60
		})
	}

	completeTask = () => {
		fetch('/v1/task/complete', {
			method: 'GET'
		});
	}

	changeSessionTime = () => {
		this.setState({
			work : !this.state.work
		}, () => {
			
			if(this.state.work) {
				this.setState({timer : this.state.workcircle * 60});
				return;
			}

			this.setState({timer: this.state.restcircle *  60});
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
		return (
			<>
				<Button message="Pause Timer" callback={this.pauseSession}></Button>
				<StopButton message="Stop Timer" callback={this.stopSession}></StopButton>
			</>
		);
	}
	
	render() {
		return(
			<div className="flex flex-col">
				{this.state.buttontype !== 'start' ? this.state.work ? <span>Time to concenctrate</span> : <span>Take it easy for now</span> : <span className="invisible">invisible</span>}
				<span>{this.renderMinutes()} : {this.renderSeconds()}</span>
				<input type="text" placeholder="Title" id="task-title" />
				{this.button()}
			</div>
		);
	}
}
