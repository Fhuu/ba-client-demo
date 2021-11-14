import logo from './logo.svg';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import React from 'react';

import Navigation from './navigation-bar/Navigation';
import Home from './home/Index';
import Task from './task/Index';
import Auth from './auth/Index';
import User from './user/Index';

class App extends React.Component {
	render() {

		return (

			<div className="App">
				<div>
					<Router>
						<Navigation />
						<Switch>
							<Route path="/" exact>
								<Home />
							</Route>
							<Route path="/task">
								<Task />
							</Route>
							<Route path="/hello">
								<p>Hello</p>
							</Route>
							<Route path="/another">
								<p>another</p>
							</Route>
							<Route path='/login'>
								<Auth path="login" />
							</Route>
							<Route path='/signup'>
								<Auth path="signup" />
							</Route>
							<Route path='/user'> 
								<User />
							</Route>
						</Switch>
					</Router>
				</div>

			</div>
		);
	}
}

export default App;
