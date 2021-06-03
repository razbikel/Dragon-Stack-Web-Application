import  React, {Component} from 'react';
import UserInfoModal from '../Modal/UserInfoModal';
import LoginSignupModal from '../Modal/LoginSignupModal';
import history from '../../history';
import {logout} from '../../actions/account';
import {connect} from 'react-redux';
import {fetchAccountInfo} from '../../actions/accountInfo';
import AuthForm from './AuthForm';
import { getTopBarLinks } from '../helper';

import './TopBar.css'


class TopBar extends Component{

    state = {
        showUserInfo: false,
        username: undefined,
        showLoginSignup: false,
    }


    componentDidMount(){
        this.props.fetchAccountInfo()
        .then(() => {
            this.setState({ username: this.props.accountInfo.username });
        })
        .catch(err => console.error(err));
    }


    getFetchStatuses = () => {
        return [
            this.props.popularDragons.status,
            this.props.publicDragons.status,
            this.props.accountDragons.status,
            this.props.search.status
        ]
    }
    

    toggleUserInfo = () => {
        this.setState({ showUserInfo: !this.state.showUserInfo })
    }


    toggleLoginSignup = () => {
        this.setState({ showLoginSignup: !this.state.showLoginSignup })
    }


    logout = () => {
        if (this.getFetchStatuses().includes('fetching')){
            return;
        }
        else{
            this.props.logout()
            .then(() => {
                return this.props.fetchAccountInfo()
            })
            .then(() => {
                this.setState({ username: this.props.accountInfo.username, showUserInfo: false })
                history.go('/');
            })
            .catch(err => console.error(err));
        }

    }


    render(){
        let fetchStatuses = this.getFetchStatuses();

        return(
            <div className="topbar">

                { getTopBarLinks(fetchStatuses) }
                <div className='user-info'>

                    <UserInfoModal show={this.state.showUserInfo}>
                        <div className="user-info-content">
                            <div>balance: {this.props.accountInfo.balance}</div>
                            <hr />
                            <div onClick = {this.logout} className='log-out'>Logout</div> 
                        </div>
                    </UserInfoModal>

                    {
                        this.props.accountInfo.username === undefined ? 
                        <div onClick={this.toggleLoginSignup} className='info-span'> &nbsp;&nbsp; Signup | Login &nbsp;&nbsp; </div> :
                        <div onClick={this.toggleUserInfo} className='info-span'>&nbsp;&nbsp;Hello {this.props.accountInfo.username} &nbsp;&nbsp;</div>
                    }

                    <LoginSignupModal show={this.state.showLoginSignup} close={this.toggleLoginSignup}>
                            <AuthForm close={this.toggleLoginSignup} />
                    </LoginSignupModal>
                   
                </div> 
                          
            </div>
        )
    }
}

export default connect(
    ({ accountInfo, account, popularDragons, publicDragons, accountDragons, search }) => (
        { accountInfo, account, popularDragons, publicDragons, accountDragons, search }
    ),
    {logout, fetchAccountInfo }
    )(TopBar);