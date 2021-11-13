import React from 'react';
import Button from '../builder/PositivevButtonBuilder';

export default class Session extends React.Component {
	startSession = () => {
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
	render() {
		return(
			<div className="flex flex-col">
				<input type="text" placeholder="Title" id="task-title" />
				<Button message="Start timer" callback={this.startSession} />
			</div>
		);
	}
}
