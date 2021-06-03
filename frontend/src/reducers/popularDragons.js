import {POPULAR_DRAGONS} from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_POPULAR_DRAGONS = { dragons: [] }


const popularDragonsReducer = (state = DEFAULT_POPULAR_DRAGONS, action) => {
    switch (action.type){
        case POPULAR_DRAGONS.FETCH:
            return { ...state, status: fetchStates.fetching };
        case POPULAR_DRAGONS.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };
        case POPULAR_DRAGONS.FETCH_SUCCESS:
            return { 
                ...state,
                status: fetchStates.success,
                dragons: action.dragons
            };

        default:
            return state;
        }
}


export default popularDragonsReducer;