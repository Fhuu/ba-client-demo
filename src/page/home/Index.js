import react from 'react';
import SessionTimer from '../../component/SessionTimer/SessionTimer';
import TaskPage from '../../component/TaskList/TaskList';
import TaskForm from '../../component/TaskForm/TaskForm';


export default class Home extends react.Component {

	render() {
		return(
			<div>
				<SessionTimer />
				<TaskForm />
				<div className="py-4">
					<h2 className="text-lg font-bold">Task Today</h2>
					<TaskPage />
				</div>
			</div>
		);
	}
}