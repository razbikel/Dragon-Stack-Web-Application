const e = require('express');
const { hash } = require('../account/helper');
const Session = require('../account/session');
const AccountTable = require('../account/table');


// set the session cookie for a given username on the client
// also update the database with the session id for the relevent account,
// if there is no session exists for the username
const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionString;

        // if session already exists for this username, dont create a new one
        if (sessionId){
            sessionString = Session.sessionString({ username, id: sessionId });
            setSessionCookie({ sessionString, res });
            resolve({ message: 'session restored' });
        }
        else {
            session = new Session({ username });
            sessionString = session.toString();

            AccountTable.updateSessionId({
                sessionId: session.id,
                usernameHash: hash(username)
            })
            .then(() => {
                setSessionCookie({ sessionString, res });
                resolve({ message: 'session created' });
            })
            .catch(error => reject (error));
        }
    });
};


const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true,
    });
};

const authenticatedAccount = ({ sessionString }) => {
    return new Promise ((resolve, reject) => {
        if (!sessionString || !Session.verify(sessionString)){
            const error = new Error('Invalid session');
            error.statusCode = 400;
            return reject(error);
        }
        else {
            const { username,id } = Session.parse(sessionString);

            AccountTable.getAccount({ usernameHash: hash(username) })
            .then(({ account }) => {
                const authenticated = account.sessionId === id;
               resolve({ account, authenticated, username });
            })
            .catch(error => reject(error));
        }
    })
}


// input example:  search = { key: 'nickname', value: 'Luna' }
// output example: [`SELECT id from dragon WHERE "nickname" = 'Luna'` , true]
// input example:  search = { key: 'nickname', value: undefined }
// output example: ['SELECT id from dragon', false] 
const getSearchQuery = (search, isOwner, accountId) => {

    let searchQuery =  isOwner === false ? 'SELECT id FROM dragon ' :
    `select id from dragon INNER JOIN accountDragon ON dragon.id = accountDragon."dragonId" WHERE "accountId" = ${accountId} `;
    
    let isFirtCondition1 = isOwner === false ? false : true;

    if (search.value !== undefined && search.value !== ''){
        isFirtCondition1 = true;
        if (search.key === 'nickname' ){
            if (!isOwner){
                searchQuery += `WHERE "${search.key}" = '${search.value}' `
            }
            else{
                searchQuery += `AND "${search.key}" = '${search.value}' `
            }
        }
        else {
            if (!isOwner){
                searchQuery += `WHERE "${search.key}" = ${search.value} `
            }
            else{
                searchQuery += `AND "${search.key}" = ${search.value} `
            }
        } 
    }

    return { searchQuery, isFirtCondition1 }
}


// input example: checkFilters = [ { key: 'isPublic', value: true }, { key: 'gender', value: 'male' } ] , true 
// output example:  `WHERE "isPublic" = true AND "gender" = "male"`, true
// input example: checkFilters = [ { key: 'isPublic', value: true }, { key: 'gender', value: 'male' } ] , false
// output example: `AND "isPublic" = true AND "gender" = "male"`, true
//input example: checkFilters = [] , true/false
//output example: ``, true/false
const getCheckFilterQuery = (checkFilters, isFirtCondition1) => {

    let filtersArr = checkFilters === undefined ? [] : checkFilters;
    let isFirtCondition2 = isFirtCondition1;
    let checkFiltersQuery = '';
    let ownerFilter = false;

    if (filtersArr.length > 0){

        isFirtCondition2 = true;
        checkFiltersQuery = !isFirtCondition1 ? 'WHERE' : 'AND'; 

        filtersArr.forEach( checkFilter => {
            if (checkFilter.key === 'isPublic'){
                checkFiltersQuery += ' ' + `"${checkFilter.key}"` + ' = ' + checkFilter.value + ' AND' 
            }

            if (checkFilter.key === 'gender'){
                checkFiltersQuery += ' ' + `"${checkFilter.key}"` + ' = ' + `'${checkFilter.value}'` + ' AND' 
            }

            if(checkFilter.key === 'owner'){
                ownerFilter = true;
            }
        })

         // remove last 'AND'
         if (ownerFilter === true && filtersArr.length === 1){
            checkFiltersQuery = checkFiltersQuery.slice(0, -5);
         }
         else{
            checkFiltersQuery = checkFiltersQuery.slice(0, -3);
         }
    }
   
    return { checkFiltersQuery, isFirtCondition2, ownerFilter };
}


// input example: rangeFilters = [ { key: 'saleValue', min: 10, max: 50 } ]   
const getRangeFilterQuery = (rangeFilters, isFirtCondition2) => {


    let RangeFiltersArr = rangeFilters === undefined ? [] : rangeFilters;
    let rangeFiltersQuery = '';

    if (RangeFiltersArr.length > 0){

        rangeFiltersQuery = !isFirtCondition2 ? 'WHERE' : 'AND';

        RangeFiltersArr.forEach( rangeFilter => {
            rangeFiltersQuery += ' ' + `"${rangeFilter.key}"` + ' >= ' + rangeFilter.min + ' AND ' + `"${rangeFilter.key}"` + ' <= ' + rangeFilter.max + ' AND' 
        })

        // remove last 'AND'
        rangeFiltersQuery = rangeFiltersQuery.slice(0, -3);
    }

    return rangeFiltersQuery;
}


// input example: sorts = [ { key: generation, value: 'ASC' }, { key: id, value: 'DESC' } ] 
// output example: `ORDER BY generation ASC, id DESC`
const getSearchSortQuery = (sorts) => {

    let sortQuery = '';

    if (sorts.length > 0){
         sortQuery = 'ORDER BY';

        sorts.forEach( sort => {
            sortQuery += ' ' + `"${sort.key}"` + ' ' + sort.value + ',' 
        })

        // remove last ','
        sortQuery = sortQuery.slice(0, -1);
    }

    return sortQuery;
}


module.exports = {  setSession,
                    authenticatedAccount,
                    getSearchQuery, 
                    getCheckFilterQuery, 
                    getSearchSortQuery,
                    getRangeFilterQuery
                 };