import  React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAccountDragons} from '../../actions/accountDragons';
import AccountDragonRow from './AccountDragonRow';
import {logout} from '../../actions/account';

import './AccountDragons.css'


class AccountDragons extends Component{

    state = {
        dragons: undefined
    }


    componentDidMount(){
        this.props.fetchAccountDragons()
        .then(() => {
            this.setState({ dragons: this.props.accountDragons.dragons })
        })
        .catch(error => console.error(error));
    }


    render(){
        return (
            <div>
                <h2>Account Dragons</h2>
                <br />

                <div className="table">
                { this.state.dragons === undefined ? <div>Loading...</div> :  
                    <ul id="horizontal-list">
                        {  this.props.accountDragons.dragons.map(dragon => {
                            return <li className='account'key={dragon.dragonId}> <AccountDragonRow dragon = {dragon}/></li>
                        })}
                    </ul>
                }
                </div>

            </div>
        )
    }
}


export default connect(
    ({accountDragons}) => ({accountDragons}),
    { fetchAccountDragons, logout }
    )(AccountDragons);