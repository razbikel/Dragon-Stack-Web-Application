import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import { BACKEND } from '../../config';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import {fetchAccountInfo} from '../../actions/accountInfo';

import './PublicDragons.css'


class BreedingOptions extends Component{

    state = {
        showModal: false,
        message: '',
        newBalance: undefined
    }


    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }


    breedOptions = () => {
        return this.props.accountDragons.dragons.filter(accountDragon => {
            return accountDragon.gender === 'male';
        })
    };


    breed = ({ motherDragonId, fatherDragonId }) => {
        fetch(`${BACKEND.ADDRESS}/dragon/breed`,{
            method: 'POST',
            body: JSON.stringify({ motherDragonId, fatherDragonId }),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            this.setState({ showModal: true, message:json.message, newBalance: json.newFatherBalance });
            return this.props.fetchAccountInfo();
        })
        .catch(error => alert(error.message))
    }


    render(){
        return(
            <div>

                <Modal show={this.state.showModal} close={this.toggleModal}>
                    <div>{this.state.message}</div>
                    {
                        this.state.newBalance !== undefined ?
                        <div>your updated balance is: {this.state.newBalance}</div> :
                        null
                    }
                    <br />
                    {<Link to='/account-dragons'>Account Dragons</Link>}
                    <br />
                </Modal>

                <h4 className = 'breedOptions'>Pick one of your male dragon for breeding with {this.props.mother.nickname}</h4>
                {
                    this.breedOptions().length === 0 ? <div className='error'>you dont have any male dragons</div> : 
                        this.breedOptions().map(dragon => {
                            const { dragonId, generationId, nickname } = dragon;
                            return(
                                <span key={dragonId}>
                                    <Button onClick={() => this.breed({ 
                                                                    motherDragonId: this.props.mother.dragonId,
                                                                    fatherDragonId: dragonId
                                                                })}
                                    >
                                        G{generationId}.I{dragonId} {nickname}
                                    </Button>
                                    {' '}
                                </span>
                            )
                        })
                }
                <br /><br />
            </div>
        )
    }
}


export default connect(
    ({ accountDragons, accountInfo }) => ({ accountDragons, accountInfo }),
    { fetchAccountInfo }
)(BreedingOptions)