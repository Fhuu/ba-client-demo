import React from 'react';
import {ButtonBuilder as Button} from '../../builder/Button';

export default class LoginForm extends React.Component{

    render() {
        return(
            <form method="POST" action="/v1/user/auth">
                <input type="text" name="name" placeholder="Full name"/>
                <input type="text" name="email" placeholder="E-Mail"/>
                <input type="password" nameff="password" placeholder="Password"/>
                <Button>Login</Button>
            </form>
        );
    }
}