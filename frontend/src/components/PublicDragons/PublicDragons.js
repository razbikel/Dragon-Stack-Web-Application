import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchPublicDragons } from '../../actions/publicDragons';
import {fetchAccountDragons} from '../../actions/accountDragons';
import PublicDragonRow from './PublicDragonRow'
import {canBuyOrBreed} from '../helper';

import './PublicDragons.css'


class PublicDragons extends Component{

    state = {
        dragons: undefined
    }


    componentDidMount(){
        this.props.fetchPublicDragons()
        .then(() => {
            this.setState({ dragons: this.props.publicDragons.dragons })
        })
        .catch(error => console.error(error));

        this.props.fetchAccountDragons();
    }


    render(){
        const accountDragonsIds = this.props.accountDragons.dragons.map(accountDragon => {
            return accountDragon.dragonId
        })

        return (
            <div>
                <h2>Public Dragons</h2>
                <br />
                <div className="table">
                { this.state.dragons === undefined ? <div>Loading...</div> :   
                    <ul id="horizontal-list">
                        {  this.props.publicDragons.dragons.map(dragon => {
                            return <li key={dragon.dragonId}><PublicDragonRow dragon={dragon} canBuyOrBreed = {canBuyOrBreed(dragon.dragonId, accountDragonsIds)} /></li>
                        })}
                    </ul>
                }
                </div>
            </div>
        )
    }

};


export default connect(
    ({ publicDragons, accountDragons }) => ({ publicDragons, accountDragons }),
    { fetchPublicDragons, fetchAccountDragons}
)(PublicDragons)