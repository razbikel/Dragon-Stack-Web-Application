import React, {Component} from 'react';
import DragonAvater from './DragonAvater';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchDragon} from '../../actions/dragon';
import fetchStates from '../../reducers/fetchStates';

import './Home.css'


class Dragon extends Component{

   dragonView = () => {
        const {dragon} = this.props;
        if(dragon.status === fetchStates.error){
            return (
                    <div className='error'>
                        <br />
                        {dragon.message}
                        <div>try again in few more seconds</div>
                    </div>
            )
        }

        return <DragonAvater dragon = {dragon} />
    }

    render(){
        const dragon = this.props.dragon;

        return(
            <div>
                <Button onClick = {this.props.fetchDragon} disabled={!this.props.account.loggedIn}>New Dragon</Button>
                {
                    this.props.account.loggedIn === false ?
                    <div className='error'>you must be logged in to get a new dragon</div> : null
                }
                { this.dragonView() }
            </div>
        ) 
    }
}


export default connect(
    ({ dragon, account }) => ({ dragon, account }),
     {fetchDragon}
    )(Dragon)