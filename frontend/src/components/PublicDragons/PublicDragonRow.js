import  React, {Component} from 'react';
import DragonAvater from '../Home/DragonAvater';
import { Button } from 'react-bootstrap';
import {BACKEND} from '../../config';
import { Link } from 'react-router-dom';
import BreedingOptions from './BreedingOptions';
import Modal from '../Modal/Modal';
import Popularity from './Popularity';
import {connect} from 'react-redux';
import {fetchAccountInfo} from '../../actions/accountInfo';

import './PublicDragons.css'

class PublicDragonRow extends Component{

    state = {
        displyBreedingOptions: false,
        breedOrCancelButton: 'Breed',
        showModal: false,
        message: '',
        likes: 0,
        likersModal: false,
        likersArr:[],
        isAccountLike: false,
        newBalance: undefined
    };


    componentDidMount(){
        if ( this.props.account.loggedIn){
            this.isAccountLikeDragon();
        }
        this.setState({ likes: this.props.dragon.likes })
    }


    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }


    toggleLikersModal = () => {
        this.setState({ likersModal: !this.state.likersModal })
    }


    toggleDisplayBreedingOptions = () => {
        if (this.props.account.loggedIn){
            const newButtonTag = this.state.breedOrCancelButton === 'Breed' ? 'Cancel' : 'Breed'
            this.setState({ displyBreedingOptions: !this.state.displyBreedingOptions,
                            breedOrCancelButton: newButtonTag
                         });
        }
        else{
            this.setState({ showModal: true, message: 'You muse be logged in for breeding a dragon' })
        }
    };


    buy = () => {
        const dragonId = this.props.dragon.dragonId;
        if (this.props.account.loggedIn){
            fetch(`${BACKEND.ADDRESS}/dragon/buy`, {
                method: 'POST',
                body: JSON.stringify({ dragonId }),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            .then(res => res.json())
            .then((json) => {
                if (!json.type !== 'error'){
                    this.setState({ showModal: true, message: json.message, newBalance: json.newBuyerBallance });
                    return this.props.fetchAccountInfo();
                }
            })
            .catch(error => {
                this.setState({ showModal: true, message: error.message })
            });
        }
        else{
            this.setState({ showModal: true, message: 'You muse be logged in for buying a dragon' })
        }
    }


    like = () => {
        const likes = this.state.likes;
        const dragonId = this.props.dragon.dragonId;
        if (this.props.account.loggedIn){
            fetch(`${BACKEND.ADDRESS}/dragon/update`, {
                method: 'PUT',
                body: JSON.stringify({ dragonId, likes }),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            .then(res => res.json())
            .then(json => {
                if (json.type === 'error'){
                    this.setState({ showModal: true, message: json.message })
                }
                else{
                    this.setState({ likes: json.newLikesAmount });
                    this.isAccountLikeDragon();
                }
            })
            .catch(error =>{
                alert(error.message);
            })
        }
        else{
            this.setState({ showModal: true, message: 'You muse be logged in for like/dislike dragon' })
        }
    }


    likers = () => {
        const dragonId = this.props.dragon.dragonId;

        fetch(`${BACKEND.ADDRESS}/dragon/dragon-likes?dragonId=${dragonId}` , {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            if (json.type === 'error'){
                this.setState({ showModal: true, message: json.message })
            }
            else{
                this.setState({ likersArr:json.dragonLikes, likersModal: true, message: json.message })
            }
        })
        .catch(error =>{
            alert(error.message);
        })
    }
    

    isAccountLikeDragon = () => {
        const dragonId = this.props.dragon.dragonId;

        fetch(`${BACKEND.ADDRESS}/account/like-dragon?dragonId=${dragonId}` , {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            if (json.type === 'error'){
                this.setState({ showModal: true, message: json.message })
            }
            else{
                this.setState({ isAccountLike: json.like , message: json.message })
            }
        })
        .catch(error =>{
            alert(error.message);
        })
    }


    render(){
        return(
            <div className='dragon-row'>

                <Modal show={this.state.showModal} close={this.toggleModal}>
                    <div>{this.state.message}</div>
                    {
                        this.state.newBalance !== undefined ?
                        <div>your updated balance is: {this.state.newBalance}</div> :
                        null
                    }
                    <br />
                    {this.props.account.loggedIn === true? 
                        <Link to='/account-dragons'>Account Dragons</Link> : null
                    }
                    <br />
                </Modal>
                <br />

                <div className='nickname'>{this.props.dragon.nickname}</div>
                <DragonAvater dragon = {this.props.dragon}/>

                <div>
                    <span>Sale Value: {this.props.dragon.saleValue}</span>
                    { this.props.dragon.gender === 'male' ? 
                        null : <span>{' | '}Birth Value: {this.props.dragon.birthValue}</span>
                    }
                </div>

                <Button onClick = {this.buy} disabled = {!this.props.canBuyOrBreed}>Buy</Button>{' '}

                { this.props.dragon.gender === 'male' ? 
                        null :  <Button 
                                    onClick = {this.toggleDisplayBreedingOptions}
                                    disabled = {!this.props.canBuyOrBreed}>{this.state.breedOrCancelButton}
                                </Button>
                }
                <br />

                {
                    !this.state.displyBreedingOptions ? null :
                        <div>
                            <BreedingOptions mother={this.props.dragon}/>
                        </div> 
                }
                
                {
                    !this.props.canBuyOrBreed ? <div className='error'>you cannot buy/breed your own dragon</div> : null
                }
                <br />

                <Popularity
                    like={this.like}
                    likes={this.state.likes}
                    likers={this.likers}
                    likersModal={this.state.likersModal}
                    likersModalClose={this.toggleLikersModal}
                    likersArr={this.state.likersArr}
                    isAccountLike={this.state.isAccountLike}/>
            </div>
        )
    }

}


export default connect(
    ({ account }) => ({ account }),
    { fetchAccountInfo }
)(PublicDragonRow);