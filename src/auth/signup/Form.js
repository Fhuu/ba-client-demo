import React from 'react';
import {ButtonBuilder as Button} from '../../builder/Button';

export default class SignUpForm extends React.Component{

    render() {
        return(
            <form method="POST" action="/v1/user">
                <input type="text" name="name" placeholder="Full name"/>
                <input type="text" name="email" placeholder="E-Mail"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="password" name="confirm-password" placeholder="Confirm Password"/>
                <Button>Sign Up</Button>
            </form>
        );
    }
}