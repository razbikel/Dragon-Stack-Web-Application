import {ACCOUNT_INFO} from './types';
import {BACKEND} from '../config';


export const fetchAccountInfo = () => {
    return (
        (dispatch) => {
            dispatch({type: ACCOUNT_INFO.FETCH});
            return (
                fetch(`${BACKEND.ADDRESS}/account/info`, { credentials: 'include' })
                .then(res => res.json())
                .then( json => {
                    if (json.type === 'error'){
                        dispatch({
                            type: ACCOUNT_INFO.FETCH_ERROR,
                            message: json.message,
                        });
                    }
                    else {
                        dispatch({
                            type: ACCOUNT_INFO.FETCH_SUCCESS,
                            ...json
                        })
                    }
    
                })
                .catch(error => dispatch({
                    type: ACCOUNT_INFO.FETCH_ERROR,
                    message: error.message,
                    }))
            )
        }
    )

}