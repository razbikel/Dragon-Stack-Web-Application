import  React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import SearchedDragons from './SearchedDragons';
import {connect} from 'react-redux';
import Modal from '../Modal/Modal';
import { fetchSearchedDragons } from '../../actions/search';
import { getCurrentSearchKey, getCurrentSortKeys, getCurrentCheckFilterKey, getCurrentRangeFilterKey } from '../helper';


class Search extends Component{

    state = {
        dragons: undefined,
        searchKey:{
            nickname: true,
            generationId: false,
            id: false
        },
        searchValue: undefined,
        showModal: false,
        searchFullSize: undefined
    }


    componentDidMount(){
        this.search();
    }


    isFetching = () => {
        return this.props.search.status === 'fetching';
    }


    toggleShowModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }


    updateSearchKeyName = (event) => {
        this.setState({ searchKey: { nickname: event.target.checked, generationId: false, id: false } })
    }


    updateSearchKeyId = (event) => {
        this.setState({ searchKey: { nickname: false, generationId: false, id: event.target.checked } }) 
    }


    updateSearchKeyGenerationId = (event) => {
        this.setState({ searchKey: { nickname: false, generationId: event.target.checked, id: false } }) 
    }


    onSearch = (serachValue) => {
        let currentKey = getCurrentSearchKey(this.state.searchKey);

        if (currentKey !== 'nickname' && (isNaN(parseInt(serachValue)) && serachValue !== '' )){
                this.toggleShowModal();
        }
        else {
            this.setState({ searchValue: serachValue })
        }
    }


    search = () => {
        
        let search = { key: getCurrentSearchKey(this.state.searchKey), value: this.state.searchValue}
        let sorts =  getCurrentSortKeys(this.props.search.sort);
        let checkFilters = getCurrentCheckFilterKey(this.props.search.checkFilter);
        let rangeFilters =  getCurrentRangeFilterKey(this.props.search.rangeFilter);
        let offset = this.props.search.currentPage - 1;
        let isOwner = this.props.search.checkFilter.owner;

        this.props.fetchSearchedDragons(search, sorts, checkFilters, rangeFilters, offset, isOwner)
        .then(() => {
            this.setState({ dragons: this.props.search.dragons, searchFullSize: this.props.search.searchFullSize })
        })
        .catch(error =>{
            alert(error.message);
        })
    }
    

    render(){
        return(
            <div>

                <Modal show={this.state.showModal} close={this.toggleShowModal}>
                    You must enter a number for this serach
                </Modal>

                <header>

                    <form id="myForm">
                        <input type="search"  placeholder='Search Dragon...'  onChange={(e) => this.onSearch(e.target.value)}/>
                        {' '}
                        <Button onClick={this.search} disabled={this.isFetching()} >submit</Button>
                    </form>
                    <br />

                    Search Dragon by: {' '}

                    <span>
                    name{' '}
                    <input 
                        type='checkbox'
                        checked={this.state.searchKey.nickname}
                        onChange={this.updateSearchKeyName}/>
                        &nbsp;&nbsp;&nbsp;
                    </span>

                    <span>
                    id{' '}
                    <input 
                        type='checkbox'
                        checked={this.state.searchKey.id}
                        onChange={this.updateSearchKeyId}/>
                        &nbsp;&nbsp;&nbsp;
                    </span>

                    <span>
                    generation-id{' '}
                    <input 
                        type='checkbox'
                        checked={this.state.searchKey.generationId}
                        onChange={this.updateSearchKeyGenerationId}/>
                        &nbsp;&nbsp;&nbsp;
                    </span>
                    <hr />

                </header>


                <SearchedDragons 
                    dragons={this.state.dragons} 
                    searchFunc={this.search} 
                    searchFullSize={this.state.searchFullSize}
                    currentResults={this.state.dragons !== undefined ? this.state.dragons.length: 0}
                    isFetching={this.isFetching}
                />

            </div> 
        )
    };
}


export default connect(
    ({ search }) => ({ search }),
    { fetchSearchedDragons }
)(Search);