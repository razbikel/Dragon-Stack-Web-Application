import React, {Component} from 'react';

import './Help.css'


class Help extends Component{

    scroll = () => {
        var elmnt = document.getElementById("notes");
        elmnt.scrollIntoView();
    }


    render(){
        return(
            <div>
                <div onClick={this.scroll} className='notes-link'>some notes</div>
                <div className='help-main'>
                    <h2>Dragon Stack - Help </h2>
                    <br />
                    <div className='help'>
                     <p><b>YOU MUST BE LOGGED IN!</b> for getting an access to 'Search', 'Account Dragons' or 'Public Dragons' pages.</p>
                     <br />
                        <h3 className='help-headline'>In DragonStack Application you can:</h3>
                        <hr />
                        <ul id='help-list'>
                            <li><p>Create an account and <b>get your own dragons</b>.</p> </li>
                            <li><p> <b>Search</b> dragons of other users and <b>Buy</b> those if your account can afford it.</p></li>
                            <li><p> You can <b>filter/sort</b> the search results according to various parameters. </p></li>
                            <li><p> Put your Account-Dragons 'public' so you can <b>Sell</b> your dragons to other users. </p></li>
                            <li><p> Allow your account female dragons to <b>give birth to dragon babies</b>, and also get <b>a new baby dragon</b> from a female dragon of other users. </p></li>
                            <li><p> <b>Like/Dislike</b> other user's dragons, and thus get an index of who are the most popular dragons in the app. </p></li>
                            <li><p>You can see who are the users who liked a particular dragon. </p></li>
                        </ul>
                    </div>
                </div>

                <div className='help-main' id='notes'>
                    <br />
                    <h3 className='notes-headline'>Some notes:</h3>
                    <ul id='help-list'>
                                <li> If you will try to access one of the top bar pages while not being logged in you will be redirected to the This page. </li>
                                <li> Your account economic balance can be seen on the top right of the bar by clicking the button with your username. </li>
                                <li> Logging Out button can be found in the same window of the account economic balance </li>
                                <li> Your account's dragons can be found in the 'Account Dragons' page, there you can make them public and set them price. </li>
                                <li> In order to sort your account's dragons, navigate to 'Search' page and check the filter of 'you own' and choose a sort parameter. </li>
                                <li> 'Public Dragons' in the top bar presents dragons which users set to public, there you can buy dragon, breed a new baby and like/dislike. </li>
                                <li> You can also view the public dragon by navigate to 'Search' page and check the filter of 'public' </li>
                            </ul>
                </div>
            </div>
        )
    }
}


export default Help;