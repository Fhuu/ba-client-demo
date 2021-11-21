import React from 'react';
import { checkAuth } from '../../helper/Auth';
import Task from '../../builder/Task';

import { parseDate } from '../../helper/DateParser';

export default class TaskPage extends React.Component {

	constructor(props) {
		super(props);
	}

	renderTasks = () => {
		return(
			<div className="flex justify-center items-center">
				<ul className="flex flex-col justify-center items-start w-full">
					{
						this.props.tasks.map(task => {
							return (<Task key={task._id} task={task} refreshTasks={this.props.refreshTasks}></Task>)
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