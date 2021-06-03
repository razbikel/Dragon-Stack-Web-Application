import {SEARCH, SEARCH_SORT, SEARCH_FILTER_CHECK, SEARCH_FILTER_RANGE, SEARCH_CURRENT_PAGE} from './types';
import {BACKEND} from '../config';


export const fetchSearchedDragons = (search, sorts, checkFilters, rangeFilters, offset, isOwner) => {
    return (dispatch) => {
        dispatch({type: SEARCH.FETCH});
        return (
            fetch(`${BACKEND.ADDRESS}/search?search=${JSON.stringify(search)}&sorts=${JSON.stringify(sorts)}&checkFilters=${JSON.stringify(checkFilters)}&rangeFilters=${JSON.stringify(rangeFilters)}&offset=${offset}&isOwner=${isOwner}` , {
                method: 'GET',
                credentials: 'include'
            })
            .then(res => res.json())
            .then(json => {
                if (json.type === 'error'){
                    dispatch({
                        type: SEARCH.FETCH_ERROR,
                        message: json.message
                    })
                }
                else {
                    dispatch({
                        type: SEARCH.FETCH_SUCCESS,
                        dragons: json.dragons,
                        searchFullSize: json.searchFullSize
                    })
                }
            })
            .catch(error => dispatch({
                type: SEARCH.FETCH_ERROR,
                message: error.message
                }))
        )
    }
}


export const fetchSortValues = ({ sort }) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            resolve (
                dispatch({
                    type: SEARCH_SORT.FETCH_SUCCESS,
                    sort: sort
                })
            )
        })
    }
}


export const fetchCheckFilterValues = ({ filter }) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            resolve (
                dispatch({
                    type: SEARCH_FILTER_CHECK.FETCH_SUCCESS,
                    checkFilter: filter
                })
            )
        })
    }
}


export const fetchRangeFilterValues = ({ rangeFilter }) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            resolve (
                dispatch({
                    type: SEARCH_FILTER_RANGE.FETCH_SUCCESS,
                    rangeFilter
                })
            )
        })
    }
}


export const fetchCurrentPageValue = ( currentPage ) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            resolve (
                dispatch({
                    type: SEARCH_CURRENT_PAGE.FETCH_SUCCESS,
                    currentPage
                })
            )
        })
    }
}