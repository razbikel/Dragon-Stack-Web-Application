import  React, {Component} from 'react';
import PublicDragonRaw from '../PublicDragons/PublicDragonRow'; 
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchAccountDragons} from '../../actions/accountDragons';
import { fetchSortValues, fetchCheckFilterValues, fetchRangeFilterValues, fetchCurrentPageValue } from '../../actions/search';
import {canBuyOrBreed} from '../helper';
import Sort from './Sort';
import Filter from './Filter';
import history from '../../history';

import './Search.css'


class SearchedDragons extends Component{

    state = {
        sort: {
            saleValueUp: false,
            saleValueDown: false,
            likesUp: false,
            likesDown: false,
            birthdateUp: false,
            birthdateDown: false,
            birthValueUp: false,
            birthValueDown: false
        },
        filter: {
            isPublic: false,
            male: false,
            female: false,
            owner: false
        },
        rangeFilter: {
            key: {
                saleValue: true,
                likes: false,
                birthValue: false,
                generationId: false
            },
            min: undefined,
            max: undefined
        },
        firstPage: true,
        loading: false,
    }


    componentDidMount(){
        this.props.fetchAccountDragons();
    }


    toggleCurrentPage = (pageNumber) => {
        if (this.props.isFetching()){
            return;
        }
        else {
            if (pageNumber !== 1){
                this.setState({ firstPage: false, loading: true });
            }
            else{
                this.setState({ firstPage: true, loading: true });
            }
             this.props.fetchCurrentPageValue(pageNumber)
             .then(() =>  this.props.searchFunc())
        }
    }

    pagesButtons = () => {
        let numberOfButtons;
        let pageButtons = [];

        if (this.state.ownerFilter){
            return null;
        }
        else{
            if(this.props.dragons !== undefined){         
                numberOfButtons = Math.ceil(this.props.searchFullSize / 10);

                let i = 2;
                while( i <= numberOfButtons){
                    pageButtons.push(i);
                    i++;
                }

                return (
                    <div className='pages-buttons'>
                            <Button className={`first-page-${this.state.firstPage}`}  onClick={() => this.toggleCurrentPage(1)} >1</Button>
                            {pageButtons.map((number, index) => {
                                return <Button className='page-button'  onClick={() => this.toggleCurrentPage(number)} key={index}>{number}</Button>
                                })}
                            <Button className='page-button'  onClick={() => this.toggleCurrentPage(0)} key={-1}>show all</Button>
                    </div>
                )
            }

            return <div></div>
        }
    }


    clearSearch = () => {
        history.go('/search')
    }


    render(){
        const accountDragonsIds = this.props.accountDragons.dragons.map(accountDragon => {
            return accountDragon.dragonId
        })

        return(
            <div>
                <br />

                <Filter 
                    searchFunc={this.props.searchFunc}
                    isFetching={this.props.isFetching}  
                    filter={this.state.filter} 
                    rangeFilter={this.state.rangeFilter}
                />
                
                <Button 
                    className='clear-search-button'  
                    disabled={this.props.isFetching()} 
                    onClick={this.clearSearch}
                >
                    Clear Search
                </Button>

                <Sort  
                    searchFunc={this.props.searchFunc}  
                    isFetching={this.props.isFetching} 
                    sort={this.state.sort}
                 />
         
                <div className="table">

                    <h4 className='search-results-headline'>
                        Search Results: showing {this.props.currentResults} out of {this.props.searchFullSize}
                    </h4>

                    {this.pagesButtons()}

                    { this.props.dragons === undefined  || this.props.search.status === 'fetching' ?
                         <div>Loading...</div> : 
                        <ul id="horizontal-list">
                            { this.props.dragons.map(dragon => {
                                return <li key={dragon.dragonId}><PublicDragonRaw dragon={dragon} canBuyOrBreed={canBuyOrBreed(dragon.dragonId, accountDragonsIds)}/></li>
                                })
                            }
                        </ul>
                    }

                </div>

            </div>
        )
    }
}

export default connect(
    ({ search, accountDragons }) => ({ search, accountDragons }),
    {
        fetchSortValues, 
        fetchCheckFilterValues, 
        fetchRangeFilterValues, 
        fetchAccountDragons, 
        fetchCurrentPageValue
     }
    )(SearchedDragons);