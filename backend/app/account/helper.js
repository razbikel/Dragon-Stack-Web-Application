const SHA256 = require('crypto-js/sha256');
const {APP_SECRET} = require('../../secrets/index');


// a one way function which transform 'password' to '01011000110101010100' 
// in order to make the authentication more secure
const hash = (string) => {
    return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
};


module.exports = {hash};