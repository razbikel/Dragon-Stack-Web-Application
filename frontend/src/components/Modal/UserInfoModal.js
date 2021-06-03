import React, { Component } from 'react'
import Auxiliary from './Auxiliary';

import './Modal.css'


class UserInfoModal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.show !== this.props.show){
            return true;
        }
        else
            return false;
    }


    render(){
        return (
            <Auxiliary>
                <div
                className="UserInfoModal"
                style= {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1': '0'
                }}>
                    {this.props.children}
                    <br />
                </div>
            </Auxiliary>
        )
    }
}


export default UserInfoModal;