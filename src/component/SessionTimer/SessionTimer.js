import React from 'react';

import { checkAuth } from '../../helper/Auth';
import Button from '../../builder/PositiveButtonBuilder';
import StopButton from '../../builder/NegativeButtonBuilder';

import './SessionTimer.css';


export default class SessionTimer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			work : true,
			timer : 25 * 60,
			buttontype : 'start',
			workCycle : 25,
			restCycle : 5,
			cycleCount : 1,
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
			timer : this.state.workCycle * 60
		})
	}

	changeSessionTime = () => {
		this.setState({
			work : !this.state.work
		}, () => {
			
			if(this.state.work) {
				this.setState({timer : this.state.workCycle * 60, cycleCount : this.state.cycleCount + 1});
				return;
			}

			this.setState({timer: this.state.restCycle *  60});
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
				<StopButton message="Stop Timer" callback={this.stopSession}></StopButton>
				<Button message="Pause Timer" callback={this.pauseSession}></Button>
			</>
		);
	}
	
	render() {
		return(
			<div className="flex flex-col container">
				{this.state.buttontype !== 'start' ? this.state.work ? <span id="work-time">Time to concenctrate [{this.state.cycleCount}]</span> : <span id="pause-time">Take it easy for now [{this.state.cycleCount}]</span> : <span className="invisible">invisible</span>}
				<span className="py-8 text-white">{this.renderMinutes()} : {this.renderSeconds()}</span>
				<div className="flex justify-around items-center ">
					{this.button()}
				</div>
			</div>
		);
	}
}
