import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchCurrentPageValue, fetchCheckFilterValues, fetchRangeFilterValues } from '../../actions/search';
import { Button } from 'react-bootstrap';

import './Search.css'


class Filter extends Component{

    state = {
        filter : this.props.filter,
        rangeFilter: this.props.rangeFilter
    }


    filter = () => {
        this.setState({ firstPage: true });
        this.props.fetchCheckFilterValues({ filter: this.state.filter })
        .then(() => this.props.fetchRangeFilterValues({ rangeFilter: this.state.rangeFilter }))
        .then(() => this.props.fetchCurrentPageValue(1))
        .then(() =>  this.props.searchFunc());
    }


    updateFilterValue = (event, filterKey) => {
        let newfilterObject = { ... this.state.filter };
        newfilterObject[filterKey] = event.target.checked;
        this.setState({ filter: newfilterObject })
    }

    minFilter = (event) => {
        let newValue;
        newValue = event.target.value;
        let newRangeFilter = { ... this.state.rangeFilter};
        newRangeFilter.min = newValue
        this.setState({ rangeFilter:newRangeFilter });
    }

    maxFilter = (event) => {
        let newValue;
        newValue =  event.target.value;
        let newRangeFilter = { ... this.state.rangeFilter};
        newRangeFilter.max = newValue
        this.setState({ rangeFilter: newRangeFilter });
    }

    rangeFilterKey = (event) => {
        let rangeFilterCopy = { ... this.state.rangeFilter }
        let newKey = {}

        Object.entries(this.state.rangeFilter.key).forEach(rangeFilterKey => {
            if (rangeFilterKey[0] === event.target.value){
                newKey[rangeFilterKey[0]] = true;
            }
            else{
                newKey[rangeFilterKey[0]] = false;
            }
        });

        rangeFilterCopy.key = newKey;

        this.setState({ rangeFilter: rangeFilterCopy })

    }


    render(){
        return(
            <div className="FilterBox">
                <h3>Filter:</h3>
                
                <div>
                    <form id="myForm3">
                        public{' '}
                        <input type='checkbox' checked={this.state.filter.isPublic} onChange={(event) => this.updateFilterValue(event, 'isPublic')}/>
                        &nbsp;&nbsp;&nbsp;
                        male{' '}
                        <input type='checkbox' checked={this.state.filter.male} onChange={(event) => this.updateFilterValue(event, 'male')}/>
                        &nbsp;&nbsp;&nbsp;
                        female{' '}
                        <input type='checkbox' checked={this.state.filter.female} onChange={(event) => this.updateFilterValue(event, 'female')}/>
                        &nbsp;&nbsp;&nbsp;
                        you own{' '}
                        <input type='checkbox' checked={this.state.filter.owner} onChange={(event) => this.updateFilterValue(event, 'owner')}/>
                    </form>
                
                </div>
            
                <br />
                <br />
                
                <div className='range-filter'>
                        range filter: {' '}
                            <form id="myForm2">
                                <select name="range-filter" id="range-filter" onChange={this.rangeFilterKey}>
                                    <option value="saleValue">sale value</option>
                                    <option value="likes">likes</option>
                                    <option value="birthValue">birth value</option>
                                    <option value="generationId">generation id</option>
                                </select>
                                &nbsp;&nbsp;&nbsp;
                                    min:{' '}<input className = 'minFilter' type="search" placeholder="min"   onChange={this.minFilter}/> 
                                    max:{' '}<input className = 'minFilter' type="search" placeholder="max"   onChange={this.maxFilter}/>
                            </form> 
                </div>

                <Button className="filterButton"  disabled={this.props.isFetching()} onClick={this.filter}>Filter</Button> 
            
            </div>
        )
    }
}


export default connect(
    ({ search }) => ({ search }),
    {fetchCheckFilterValues, fetchRangeFilterValues, fetchCurrentPageValue}
)(Filter);