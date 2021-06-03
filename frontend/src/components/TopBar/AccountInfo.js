import  React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAccountInfo} from '../actions/accountInfo';


class AccountInfo extends Component{
    
    componentDidMount(){
        this.props.fetchAccountInfo();
    }


    render(){
        return(
            <div>
                <h3>Account Info</h3>
                <div>username: {this.props.accountInfo.username}</div>
                <div>balance: {this.props.accountInfo.balance}</div>
            </div>
        )
    }
    
}


export default connect(
    ({accountInfo}) => ({accountInfo}),
    {fetchAccountInfo}
)(AccountInfo);