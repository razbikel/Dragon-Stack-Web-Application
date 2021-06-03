import  React, {Component} from 'react';
import DragonAvater from '../Home/DragonAvater';
import {Button} from 'react-bootstrap';
import {BACKEND} from '../../config';
import Modal from '../Modal/Modal';

import './AccountDragons.css'


class AccountDragonRow extends Component{

    state = {
        nickname: this.props.dragon.nickname,
        edit: false,
        isPublic: this.props.dragon.isPublic,
        saleValue: this.props.dragon.saleValue,
        birthValue: this.props.dragon.birthValue,
        showModal: false,
        message: ''
    }


    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }


    updateNickname = (event) => {
        this.setState({ nickname: event.target.value })
    }


    updateSaleValue = (event) => {
        this.setState({ saleValue: event.target.value })
    }


    updateIsPublic = (event) => {
        if (this.state.saleValue === 0){
            this.setState({ showModal: true, message: 'You cannot set dragon to public while his saleValue is 0!' })
        }
        else{
            this.setState({ isPublic: event.target.checked })
        }
    }


    updateBirthValue = (event) => {
        this.setState({ birthValue: event.target.value })
    }


    toggleEdit = () => {
        this.setState({ edit: !this.state.edit})
    }


    cancel = () => {
        this.setState({
            isPublic: this.props.dragon.isPublic,
            saleValue: this.props.dragon.saleValue,
            birthValue: this.props.dragon.birthValue,
            nickname: this.props.dragon.nickname
         })
         this.toggleEdit();
    }


    save = () => {
        const { nickname, isPublic, saleValue, birthValue } = this.state;
        const dragonId = this.props.dragon.dragonId;
        fetch(`${BACKEND.ADDRESS}/dragon/update`, {
            method: 'PUT',
            body: JSON.stringify({ nickname, dragonId, isPublic, saleValue, birthValue }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => {
            if (json.type === 'error'){
                this.setState({ showModal: true, message: json.message })
            }
            else{
                this.setState({ showModal: true, message: json.message })
                this.toggleEdit();
            }
        })
        .catch(error =>{
            alert(error.message);
        })
    };


    get saveButton(){
        return(
            <div>
                <span>
                <Button onClick={this.save}>Save</Button>
                </span>
                {' '}
                <span>
                <Button onClick={this.cancel}>Cancel</Button>
                </span>
            </div>
        ) 
    }
    

    get editButton(){
        return <Button onClick={this.toggleEdit}>Edit</Button>
    }


    render(){
        return (    
            <div className='dragon-row'>
                
                <Modal show={this.state.showModal} close={this.toggleModal}>
                    <div>{this.state.message}</div>
                </Modal>

                <br />
                <input 
                    type='text'
                    value={this.state.nickname}
                    onChange={this.updateNickname}
                    disabled={!this.state.edit}
                    className={`account-dragon-row-nickname-input-${this.state.edit}`} 
                    />
                <DragonAvater dragon = {this.props.dragon} />

                <div>            
                    <span>
                        Sale value: {' '}
                        <input 
                        type='number'
                        disabled={!this.state.edit}
                        value={this.state.saleValue}
                        onChange={this.updateSaleValue}
                        className={`account-dragon-row-input-${this.state.edit}`}/>
                        &nbsp;&nbsp;&nbsp;
                    </span>

                    { this.props.dragon.gender === 'male' ? null :
                        <span>
                            Birth value: {' '}
                            <input 
                            type='number'
                            disabled={!this.state.edit}
                            value={this.state.birthValue}
                            onChange={this.updateBirthValue}
                            className={`account-dragon-row-input-${this.state.edit}`}/>
                            &nbsp;&nbsp;&nbsp;
                        </span>
                    }

                    <span>
                        public: {' '}
                        <input 
                        type='checkbox'
                        disabled={!this.state.edit}
                        checked={this.state.isPublic}
                        onChange={this.updateIsPublic}/>
                        &nbsp;&nbsp;&nbsp;
                    </span>

                    { this.state.edit ? this.saveButton : this.editButton }
                </div>

            </div>
        )
    }
}


export default AccountDragonRow;