import React from 'react';
import LoginForm from '../../component/Auth/Login/Form';
import SignUpForm from '../../component/Auth/Signup/Form';

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