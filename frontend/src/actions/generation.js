import {GENERATION} from './types';
import {BACKEND} from '../config';


export const fetchGeneration = () => {
    return (
        (dispatch) => {
            dispatch({type: GENERATION.FETCH});
            return(
                fetch(`${BACKEND.ADDRESS}/generation`)
                .then(res => res.json())
                .then(json => {
                    if (json.type === 'error'){
                        dispatch({
                            type: GENERATION.FETCH_ERROR,
                            message: json.message
                        });
                    }
                    else {
                        dispatch({
                            type: GENERATION.FETCH_SUCCESS,
                            generation: json.generation
                        });
                    }

                })
                .catch(err => dispatch({
                    type: GENERATION.FETCH_ERROR,
                    message: err.message
                }))
            );
        }
    ) 
}