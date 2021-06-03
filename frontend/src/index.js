import React from 'react';
import { Router, Redirect, Switch, Route } from 'react-router';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import history from './history';
import rootReducer from './reducers/index';
import Home from './components/Home/Home';
import AccountDragons from './components/AccountDragons/AccountDragons';
import PublicDragons from './components/PublicDragons/PublicDragons';
import {fetchAuthenticated} from './actions/account';
import TopBar from './components/TopBar/TopBar';
import Search from './components/Search/Search';
import Help from './components/Help/Help';

import './index.css';


const AuthRoute = (props) => {

    if (!store.getState().account.loggedIn){
        return <Redirect to={{pathname: '/help'}}/>
    }

    const { component, path } = props;
    return <Route to={path} component={component}/>
}


const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
    );


store.dispatch(fetchAuthenticated())
.then(() => {
    render(
        <div>
            <Provider store = {store}>
                <div>
                <TopBar />
                    <Router history={history} >
                        <Switch>
                            <Route exact path= '/' component={Home} />
                            <Help path='/help' component={Help} />
                            <AuthRoute path= '/account-dragons' component={AccountDragons}/> 
                            <AuthRoute path= '/public-dragons' component={PublicDragons}/>
                            <AuthRoute path= '/search' component={Search}/>  
                        </Switch>
                    </Router>
                </div>
            </Provider>
        </div>,
        document.getElementById("root")
    );
})











