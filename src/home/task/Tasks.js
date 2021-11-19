import React from 'react';

import PositiveButton from '../../builder/PositiveButtonBuilder';
import { checkAuth } from '../../helper/Auth';
import { parseDate } from '../../helper/DateParser';
import Task from '../../builder/Task';

export default class Tasks extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			tasks : []
		}
	}

	componentDidMount() {
		this.getTasks();
	}

	getTasks = async () => {
		let user = await checkAuth();
		if (user) {
			let tasksRequest = await fetch(`/v1/task/date/${parseDate(new Date())}`, {
				method : 'GET'
			})

			let tasks = await tasksRequest.json();
			this.setState({tasks : tasks}, () => {
				console.log(this.state.tasks);
			});
		}
	}

	renderTaskList = () => {
		return(
			<div className="flex justify-center items-center">
				<ul className="flex flex-col items-start">
					{
						this.state.tasks.map(task => {
							return (<Task task={task} refreshTasks={this.getTasks}/>)
						})
					}
				</ul>
			</div>
		);
	}

	submitFormHandler = async () => {

		let user = await checkAuth();
		
		if(user) {
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
			
			if(taskRequest.status === 200 || taskRequest.status === 201) this.getTasks();
		}
	}

	taskForm = () => {
		return(
			<>
				<form className="flex flex-col justify-center">
					<input type="text" id="task-title" placeholder="Title" className="text-center" />
					<PositiveButton message="create task" callback={this.submitFormHandler}></PositiveButton>
				</form>
			</>
		);
	}

	render() {
		return(
			<>
				{this.taskForm()}
				{this.renderTaskList()}
			</>
		);
	}
}