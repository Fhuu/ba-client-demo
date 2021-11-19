import React from 'react';

export default class Task extends React.Component {

	changeCompletion = async () => {
		let completeRequest = await fetch(`/v1/task/complete/${this.props.task._id}`);

		if(completeRequest.status === 201 || completeRequest.status === 200) this.props.refreshTasks();
	}

	render() {
		return(
			<li key={this.props.task._id}>
				{
					this.props.task.completed ? 
					<input type="checkbox" className="mr-4" checked onChange={this.changeCompletion}/> :
					<input type="checkbox" className="mr-4" onChange={this.changeCompletion}/>
				}
				<label>{this.props.task.title}</label>
			</li>
		);
	}
}