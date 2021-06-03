import React, { Component } from 'react'
import Auxiliary from './Auxiliary';
import { Button } from 'react-bootstrap';

import './Modal.css'


class LikesModal extends Component {

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
                className="likesModal"
                style= {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1': '0'
                }}>
                    <Button onClick={this.props.close}>Close</Button>
                    <br/>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
}


export default LikesModal;