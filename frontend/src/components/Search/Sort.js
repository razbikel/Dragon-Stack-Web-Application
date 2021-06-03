import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchSortValues, fetchCurrentPageValue } from '../../actions/search';
import { Button } from 'react-bootstrap';

import './Search.css'


class Sort extends Component{

    state = {
        sort : this.props.sort
    }

    
    updateSortValue = (event, sortKey) => {
        let newSortObject = { ... this.state.sort };
        newSortObject[sortKey] = event.target.checked;
        this.setState({ sort: newSortObject })
    }


    sort = () => {
        this.setState({ firstPage: true });
        this.props.fetchSortValues({ sort: this.state.sort })
        .then(() => this.props.fetchCurrentPageValue(1))
        .then(() =>  this.props.searchFunc())
    }


    render(){
        return (
            <div className="sort">
                <h3>Sort:</h3>
                
                <form id="myForm4">
                    <div>
                        sale value ASC{' '}
                        <input type='checkbox' checked={this.state.sort.saleValueUp} onChange={(event) => this.updateSortValue(event, 'saleValueUp')}/>
                        &nbsp;&nbsp;&nbsp;
                        sale value DESC{' '}
                        <input type='checkbox' checked={this.state.sort.saleValueDown} onChange={(event) => this.updateSortValue(event, 'saleValueDown')}/>
                    </div>

                    <div>
                        likes ASC{' '}
                        <input type='checkbox' checked={this.state.sort.likesUp} onChange={(event) => this.updateSortValue(event, 'likesUp')}/>
                        &nbsp;&nbsp;&nbsp;
                        likes DESC{' '}
                        <input type='checkbox' checked={this.state.sort.likesDown} onChange={(event) => this.updateSortValue(event, 'likesDown')}/>
                    </div>

                    <div>
                        birthdate ASC{' '}
                        <input type='checkbox' checked={this.state.sort.birthdateUp} onChange={(event) => this.updateSortValue(event, 'birthdateUp')}/>
                        &nbsp;&nbsp;&nbsp;
                        birthdate DESC{' '}
                        <input type='checkbox' checked={this.state.sort.birthdateDown} onChange={(event) => this.updateSortValue(event, 'birthdateDown')}/>
                    </div>

                    <div>
                        birth value ASC{' '}
                        <input type='checkbox' checked={this.state.sort.birthValueUp} onChange={(event) => this.updateSortValue(event, 'birthValueUp')}/>
                        &nbsp;&nbsp;&nbsp;
                        birth value DESC{' '}
                        <input type='checkbox' checked={this.state.sort.birthValueDown} onChange={(event) => this.updateSortValue(event, 'birthValueDown')}/>
                    </div>
                </form>
                <hr />

                <Button className="sortButton" disabled={this.props.isFetching()} onClick={this.sort}>Sort</Button>                    
            </div>
        )
    }
}

export default connect(
    ({ search }) => ({ search }),
    {fetchSortValues, fetchCurrentPageValue}
) (Sort);