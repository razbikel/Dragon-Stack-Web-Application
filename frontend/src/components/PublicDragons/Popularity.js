import React from 'react';
import { Button } from 'react-bootstrap';
import LikesModal from '../Modal/likesModal';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';

import './PublicDragons.css'


const Popularity = (props) => {

    return(
        <div>
            {
                props.isAccountLike ? 
                <Button onClick={props.like} className='dislike-button'><img  src={dislike} alt="my image2"/>dislike</Button>:
                <Button onClick={props.like} className='like-button'><img  src={like} alt="my image" />like</Button>
            }
            
            {' '}
            <span className='likers' onClick={props.likers}>
                {props.likes} people like this dragon {' '}
            </span>

            <LikesModal show={props.likersModal} close={props.likersModalClose}>
                <div className='help'>
                    <ul className='likers-list'>
                        {props.likersArr.map(({ accountId, username }) => {
                                return  (
                                    <div>
                                        <li className='likers-item' key={accountId}>{username}</li>
                                        <hr />
                                    </div>
                                )                                
                            })
                        }
                    </ul>
                </div>
            </LikesModal>

        </div>

    )
}


export default Popularity;