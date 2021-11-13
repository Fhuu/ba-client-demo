import React from 'react';
import { checkAuth } from '../helper/Auth';

export default class Task extends React.Component {

	componentDidMount = () => {
		checkAuth();
	}

	render() {
		return(
			<div>
				<p>This is task index</p>
			</div>
		);
	}
}