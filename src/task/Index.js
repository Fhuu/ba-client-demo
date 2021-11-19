import React from 'react';
import { checkAuth } from '../helper/Auth';
import Task from '../builder/Task';

export default class TaskPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user : null,
			tasks : []
		}
	}

	componentDidMount = async () => {
		if(this.state.user == null) {
			this.setState({
				user : await checkAuth()
			})
		}

 		this.getMyTasks();
	}

	getMyTasks = async () => {
		if(this.state.user) {
			let tasksRequest = await fetch('/v1/task/me', {
				method : 'GET'
			});
			
			let tasks = await tasksRequest.json();

			this.setState({
				tasks : tasks
			});
		}
	}

	renderTasks = () => {
		return(
			<div className="flex justify-center items-center">
				<ul className="flex flex-col justify-center items-start">
					{
						this.state.tasks.map(task => {
							return (<Task key={task._id} task={task}></Task>)
						})
					}
				</ul>
			</div>
		);
	}

	render() {
		return(
			<div>
				{this.renderTasks()}
			</div>
		);
	}
}