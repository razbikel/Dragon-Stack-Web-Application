import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import Auxiliary from './Auxiliary';

import './Modal.css'


class Modal extends Component {

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
                className="Modal"
                style= {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1': '0'
                }}>
                    {this.props.children}
                    <br />
                    <Button onClick={this.props.close}>Close</Button>
                </div>
            </Auxiliary>
        )
    }
}


export default Modal;