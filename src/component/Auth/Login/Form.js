import React from 'react';
import { Link } from 'react-router-dom';

import PositiveButton from '../../../builder/PositiveButtonBuilder';

export default class LoginForm extends React.Component{

    keyHandler = (event) => {
        console.log(event);
    }

    clickHandler = async () => {
        
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        let loginRequest = await fetch('/v1/user/authn', {
            method: 'POST',
            headers : {
                'content-type' : 'application/json',
            },
            body : JSON.stringify({
                username : username,
                password : password
            })
        });

        if(loginRequest.status === 200) window.location.replace('/home');        

    }

    render() {
        return(
            <form className="flex flex-col" method="POST" action="/v1/user/auth">
                <input onKeyDownCapture={this.keyHandler} type="text" id="username" placeholder="Username"/>
                <input onKeyDownCapture={this.keyHandler} type="password" id="password" placeholder="Password"/>
                <PositiveButton message="Login" callback={this.clickHandler}/>
                <Link to="/signup">Or create an account</Link>
            </form>
        );
    }
}