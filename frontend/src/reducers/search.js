import {SEARCH, SEARCH_SORT, SEARCH_FILTER_CHECK, SEARCH_FILTER_RANGE, SEARCH_CURRENT_PAGE} from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_SEARCH = { sort: {
                            saleValueUp: false,
                            saleValueDown: false,
                            likesUp: false,
                            likesDown: false,
                            birthdateUp: false,
                            birthdateDown: false,
                            birthValueUp: false,
                            birthValueDown: false
                        },
                        checkFilter: {
                            isPublic: false,
                            male: false,
                            female: false,
                            owner: false
                        }, 
                        rangeFilter:{ key: {}, min: undefined, max: undefined }, 
                        currentPage: 1,
                        dragons: undefined,
                        searchFullSize: undefined
                     }


const searchReducer = (state = DEFAULT_SEARCH, action) => {
    switch (action.type){
        case SEARCH.FETCH:
            return { ...state, status: fetchStates.fetching };

        case SEARCH.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };

        case SEARCH.FETCH_SUCCESS:
            return { 
                ...state,
                status: fetchStates.success,
                dragons: action.dragons,
                searchFullSize: action.searchFullSize
            };

        case SEARCH_SORT.FETCH_SUCCESS:
            return { 
                ...state,
                status: fetchStates.success,
                sort: action.sort
            };
        
        case SEARCH_FILTER_CHECK.FETCH_SUCCESS:
            return { 
                ...state,
                status: fetchStates.success,
                checkFilter: action.checkFilter
            };

        case SEARCH_FILTER_RANGE.FETCH_SUCCESS:
            return { 
                ...state,
                status: fetchStates.success,
                rangeFilter: action.rangeFilter
            };

        case SEARCH_CURRENT_PAGE.FETCH_SUCCESS:
            return { 
                ...state,
                status: fetchStates.success,
                currentPage: action.currentPage
            };
            
        default:
            return state;
        }
}

export default searchReducer;