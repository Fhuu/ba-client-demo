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
import TaskPage from './task/Index';
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
							<Route path="/home" exact>
								<Home />
							</Route>
							<Route path="/task">
								<TaskPage />
							</Route>
							<Route path={['/login', '/']} exact>
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
