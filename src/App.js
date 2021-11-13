import logo from './logo.svg';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import React from 'react';
import Task from './task/Index';
import Auth from './auth/Index';

class App extends React.Component {
	render() {

		return (

			<div className="App">
				<div>
					<Router>
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
							<Route path="/login">
								<Auth />
							</Route>
						</Switch>
					</Router>
				</div>

				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>

			</div>
		);
	}
}

export default App;
