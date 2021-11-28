import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import React from 'react';

import Navigation from './page/partial/NavigationBar/Navigation';
import Home from './page/home/Index';
import TaskPage from './component/TaskList/TaskList';
import User from './page/user/Index';
import Auth from './page/auth/Index';
import Note from './page/note/Index';
import NoteEditor from './component/Note/NoteEditor';

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
							<Route path='/note' exact>
								<Note />
							</Route>
							<Route path='/note/:noteID'>
								<NoteEditor />
							</Route>
						</Switch>
					</Router>
				</div>
			</div>
		);
	}
}

export default App;
