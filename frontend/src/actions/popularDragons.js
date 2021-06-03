import {POPULAR_DRAGONS} from './types';
import {BACKEND} from '../config';


export const fetchPopularDragons = () => {
    return (dispatch) => {
        dispatch({type: POPULAR_DRAGONS.FETCH});
        return (
            fetch(`${BACKEND.ADDRESS}/dragon/popular-dragons`, { credentials: 'include' })
            .then(res => res.json())
            .then(json => {
                if (json.type === 'error'){
                    dispatch({
                        type: POPULAR_DRAGONS.FETCH_ERROR,
                        message: json.message
                    })
                }
                else {
                    dispatch({
                        type: POPULAR_DRAGONS.FETCH_SUCCESS,
                        dragons: json.dragons
                    })
                }
            })
            .catch(error => dispatch({
                type: POPULAR_DRAGONS.FETCH_ERROR,
                message: error.message
                }))
        )
    }
}