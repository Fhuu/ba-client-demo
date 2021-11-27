import React from 'react';
import ReactQuill from 'react-quill';
import { v4 } from 'uuid';
import './quill-editor.css';
import { addOrUpdate, get } from '../../helper/database/database';

export default class Note extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			dataReady : false,
			title : null,
			note : null,
		};

		
	}

	componentDidMount() {
		
		get('Notes', 'test_id_inexist_1', document.getElementById('message'), (data) => {
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
				'id' : 'test_id_inexist_1',
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
				'id' : 'test_id_inexist_1',
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
				{this.printNote()}
				<div id="message"></div>
			</>
		);
	}
}