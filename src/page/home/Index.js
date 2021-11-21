import react from 'react';
import SessionTimer from '../../component/SessionTimer/SessionTimer';
import TaskPage from '../../component/TaskList/TaskList';
import HomeTask from '../partial/HomeTask/HomeTask';


export default class Home extends react.Component {

	MusicPlayer = () => {
		return(
			<iframe className="w-full h-full" src="https://www.youtube.com/embed/5qap5aO4i9A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
		);
	}
	
	render() {
		return(
			<div>
				<this.MusicPlayer />
				<SessionTimer />
				<HomeTask />
			</div>
		);
	}
}