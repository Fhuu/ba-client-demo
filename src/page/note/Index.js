import React from 'react';
import ReactQuill from 'react-quill';

export default class Note extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			note : ''
		};
	}

	contentChangeHandler = (text) => {
		this.setState({
			note : text
		}, () => {
			console.log(this.state.note);
		}); 
	}

	render() {
		return(
			<>
				<ReactQuill value={this.state.note} onChange={this.contentChangeHandler} theme="snow"/>
			</>
		);
	}
}