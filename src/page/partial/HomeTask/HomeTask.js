import React from 'react';
import TaskList from '../../../component/TaskList/TaskList';
import TaskForm from '../../../component/TaskForm/TaskForm';

import checkAuth from '../../../helper/Auth';
import { parseDate } from '../../../helper/DateParser';

export default class HomeTask extends React.Component {
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

 		this.refreshTasks();
	}

	refreshTasks = async () => {
		if(this.state.user) {
			let tasksRequest = await fetch(`/v1/task/date/${parseDate(new Date())}`, {
				method : 'GET'
			});
			
			let tasks = await tasksRequest.json();

			console.log(tasks);

			this.setState({
				tasks : tasks
			});
		}
	}

	render() {
		return(
			<div>
				<TaskForm refreshTasks={this.refreshTasks} user={this.state.user}/>
				<TaskList refreshTasks={this.refreshTasks} tasks={this.state.tasks} />
			</div>
		);
	}
}