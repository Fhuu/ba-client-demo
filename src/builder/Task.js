import React from 'react';
import NegativeButton from './NegativeButtonBuilder';
import './Task.css';

export default class Task extends React.Component {

	deleteTask = async () => {
		let deleteRequest = await fetch('/v1/task', {
			method: 'DELETE',
			headers : {
				'content-type' : 'application/json'
			},
			body : JSON.stringify({
				_id : this.props.task._id
			})
		});

		if(deleteRequest.status === 200) this.props.refreshTasks();
	}

	changeCompletion = async () => {
		let completeRequest = await fetch(`/v1/task/complete/${this.props.task._id}`);

		if(completeRequest.status === 201 || completeRequest.status === 200) this.props.refreshTasks();
	}

	activateDelete = () => {
		document.getElementById(`delete-button-${this.props.task._id}`).classList.add('active');
	}

	deactiveDelete = () => {
		document.getElementById(`delete-button-${this.props.task._id}`).classList.remove('active');
	}

	render() {
		return(
			<li key={this.props.task._id} className="flex items-center w-full">
				<section id="task-container" onMouseOver={this.activateDelete} onMouseOut={this.deactiveDelete}>
					{
						this.props.task.completed ? 
						<input type="checkbox" className="mr-4" checked onChange={this.changeCompletion}/> :
						<input type="checkbox" className="mr-4" onChange={this.changeCompletion}/>
					}
					<label id="task-label">{this.props.task.title}</label>
					<div className="delete-buttons" id={`delete-button-${this.props.task._id}`}>
						<NegativeButton message="delete" callback={this.deleteTask}></NegativeButton>
					</div>
				</section>
			</li>
		);
	}
}