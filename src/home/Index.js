import react from 'react';
import Session from './session/Session';
import Tasks from './task/Tasks';
import './index.css';

export default class Home extends react.Component {

	render() {
		return(
			<div>
				<Session />
				<Tasks />
			</div>
		);
	}
}