import React from 'react';
import LoginForm from './login/Form';
import SignUpForm from './signup/Form';

export default class Auth extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			componentToRender : null
		}
	}

	componentRender = () => {
		switch(this.props.path) {
			case 'login' :
				return <LoginForm />;
			
			case 'signup' :
				return <SignUpForm />;
		}
	}

	render() {
		return(
			<div>
				{this.componentRender()}
			</div>
		);
	}
}