import generationReducer from './generation';
import {combineReducers} from 'redux';
import dragonReducer from './dragon';
import accountReducer from './account';
import accountDragonReducer from './accountDragons';
import accountInfoReducer from './accountInfo'
import publicDragonsReducer from './publicDragons'
import searchReducer from './search';
import popularDragonsReducer from './popularDragons';

export default combineReducers({
    account: accountReducer,
    generation: generationReducer,
    dragon: dragonReducer,
    accountDragons: accountDragonReducer,
    accountInfo: accountInfoReducer,
    publicDragons: publicDragonsReducer,
    search: searchReducer,
    popularDragons: popularDragonsReducer
});