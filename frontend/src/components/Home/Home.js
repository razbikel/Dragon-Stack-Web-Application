import  React, {Component} from 'react';
import Generation from './Generation';
import Dragon from './Dragon';
import {connect} from 'react-redux';
import { fetchPopularDragons } from '../../actions/popularDragons';
import {fetchAccountDragons} from '../../actions/accountDragons';
import PublicDragonRow from '../PublicDragons/PublicDragonRow';
import {canBuyOrBreed} from '../helper';
import {fetchAccountInfo} from '../../actions/accountInfo';

import './Home.css'


class Home extends Component{

    state = {
        dragons: undefined
    }


    componentDidMount(){
        this.props.fetchAccountInfo()
        this.props.fetchPopularDragons()
        .then(() => {
            this.setState({ dragons: this.props.popularDragons.dragons })
        })
        .catch(error => console.error(error));

        this.props.fetchAccountDragons();
    }


    render(){
        const accountDragonsIds = this.props.accountDragons.dragons.map(accountDragon => {
            return accountDragon.dragonId
        })

        return(
            <div>
                <h2>Dragon Stack</h2>
                <Generation/>
                <Dragon/>
                <hr />
                <br />

                <h3>10 Most Popular Dragons According To Users Ranking:</h3>
                <br />

                <div className="table">
                { this.state.dragons === undefined ? <div>Loading...</div> :   
                    <ul id="horizontal-list">
                        {  this.props.popularDragons.dragons.map(dragon => {
                            return <li key={dragon.dragonId}><PublicDragonRow dragon={dragon} canBuyOrBreed = {canBuyOrBreed(dragon.dragonId, accountDragonsIds)} /></li>
                        })}
                    </ul>
                }
                </div>
            </div>
        );
    }
}


export default connect(
    ({ popularDragons, accountDragons, account }) => ({ popularDragons, accountDragons, account }),
     { fetchPopularDragons, fetchAccountDragons, fetchAccountInfo })
     (Home);







