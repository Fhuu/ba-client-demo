import react from 'react';
import ReactQuill from 'react-quill';

import Button from '../../builder/PositiveButtonBuilder';
import BackButton from '../../builder/NegativeButtonBuilder';

import { addOrUpdate, get } from '../../helper/database/database';

import { withRouter } from 'react-router-dom';

class NoteEditor extends react.Component {

	constructor(props) {
		super(props);

		this.state = {
			dataReady : false,
			title : null,
			note : null,
			id : window.location.pathname.replace('/note/', ''),
		};

		
	}

	componentDidMount() {
		
		get('Notes', this.state.id, document.getElementById('message'), (data) => {
			if(data) 
				return this.setState({
					title : data.title,
					note : data.content,
					dataReady : true
				});
			
			this.setState({
				title : '',
				note: '',
				dataReady : true
			});
		});

	}

	titleChangeHandler = () => {
		let title = document.getElementById('title').value;
		this.setState({
			title : title,
		}, () => {

			let noteObj = {
				'id' : this.state.id,
				'title' : title,
				'content' : this.state.note
			};

			addOrUpdate('Notes', noteObj ,document.getElementById('message'));

		})
	}
	
	contentChangeHandler = (text) => {
		this.setState({
			note : text
		}, () => {
			
			let noteObj = {
				'id' : this.state.id,
				'title' : this.state.title,
				'content' : text
			};

			addOrUpdate('Notes', noteObj, document.getElementById('message'));
			
		}); 
	}

	printNote = () => {
		if(!this.state.dataReady) return <p>Loading</p>;
		
		return (
			<>
				<input type="text" id="title" className="w-full bg-white p-2 text-center outline-none text-black" onChange={this.titleChangeHandler} value={this.state.title}/>
				<ReactQuill value={this.state.note} onChange={this.contentChangeHandler} />
			</>
		);

	}

	render() {

		return(
			<>
				<div className="flex justify-between items-center pb-2">
					<BackButton message="Back" callback={() => {this.props.history.goBack()}}/>
					<Button message="sync" />
				</div>
				{this.printNote()}
				<div id="message"></div>
			</>
		);
	}
}

export default withRouter(NoteEditor);