import  React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import { signup, login} from '../../actions/account';
import {connect} from 'react-redux';
import fetchStates from '../../reducers/fetchStates';
import history from '../../history';

import './TopBar.css'


class AuthForm extends Component{

    state = {
        username: '',
        password: '',
        firstTry: true
    };


    updateUsername = (event) => {
        this.setState({ username: event.target.value })
    };


    updatePassword = (event) => {
        this.setState({ password: event.target.value })
    };


    login = () => {
        this.setState({ firstTry: false });
        this.props.login({
            username: this.state.username,
            password: this.state.password
        })
        .then(() => {
            if (this.props.account.loggedIn){
                this.props.close();
                history.go('/')
            }
        })
        .catch(err => console.error(err));
    };


    signup = () => {
        this.setState({ firstTry: false });
        this.props.signup({
            username: this.state.username,
            password: this.state.password
        })
        .then(() => {
            if (this.props.account.loggedIn){
                this.props.close();
                history.go('/')
            }
        })
        .catch(err => console.error(err));
    };


    Error = () => {
        if (this.props.account.status === fetchStates.error && !this.state.firstTry){
            return <div>{this.props.account.message}</div>
        }
    }
    

    render(){
        return(
            <div className='auth-form'>

                <FormGroup>
                    <FormControl 
                        type = 'text'
                        value = {this.state.username}
                        placeholder = 'username'
                        onChange = {this.updateUsername}
                        className='login_page_username_password' />
                </FormGroup>

                <FormGroup>
                    <FormControl 
                        type = 'password'
                        value = {this.state.password}
                        placeholder = 'password'
                        onChange = {this.updatePassword}
                        className='login_page_username_password'/>
                </FormGroup>

                <div className='auth-form-buttons'>
                    <Button
                        onClick = {this.login}>
                        Login
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span> or </span>
                    <Button
                        onClick = {this.signup}>
                        Signup
                    </Button>
                </div>
                <br />

                {this.Error()}
                
            </div>
        );
    }
}


export default connect(
    ({ account }) => ({account}),
    { signup, login }
    )(AuthForm);