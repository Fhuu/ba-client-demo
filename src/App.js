import logo from './logo.svg';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';

import Navigation from './navigation-bar/Navigation';
import React from 'react';
import Task from './task/Index';
import Auth from './auth/Index';

class App extends React.Component {
	render() {

		return (

			<div className="App">
				<div>
					<Router>
						<Navigation />
						<Switch>
							<Route path="/task">
								<Task />
							</Route>
							<Route path="/hello">
								<p>Hello</p>
							</Route>
							<Route path="/another">
								<p>another</p>
							</Route>
							<Route path={'/login'}>
								<Auth path="login" />
							</Route>
							<Route path={'/signup'}>
								<Auth path="signup" />
							</Route>
						</Switch>
					</Router>
				</div>

			</div>
		);
	}
}

export default App;
