import React from 'react';

import PositiveButton from '../../builder/PositiveButtonBuilder';
import { checkAuth } from '../../helper/Auth';

import './TaskForm.css';

export default class TaskForm extends React.Component {

	submitFormHandler = async () => {

		if(this.props.user) {
			let title = document.getElementById('task-title').value;
			
			let taskRequest = await fetch('/v1/task', {
				method: 'POST',
				headers : {
					'content-type' : 'application/json'
				},
				body : JSON.stringify({
					title : title
				})
			})
			
			if(taskRequest.status === 200 || taskRequest.status === 201) {
				this.props.refreshTasks();
				document.getElementById('task-title').value = '';
			}
		}
	}

	taskForm = () => {
		return(
			<>
				<form className="container items-center">
					<div></div>
					<input type="text" id="task-title" placeholder="Title" className="text-center mb-8 w-full" />
					<PositiveButton message="create task" callback={this.submitFormHandler}></PositiveButton>
				</form>
			</>
		);
	}

	render() {
		return(
			<>
				{this.taskForm()}
			</>
		);
	}
}