const {REFRESH_RATE, SECONDS} = require('../config'); 
const Dragon = require('../dragon/index');

const refreshRate = REFRESH_RATE * SECONDS

class Generation{

    constructor(){
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;
        this.accountsIds = new Set();
    }


    calculateExpiration(){
        const expirationPeriod = Math.floor(Math.random() * (refreshRate/2));
        const msUntilExpiration = Math.random() < 0.5 ?
        refreshRate - expirationPeriod :
        refreshRate + expirationPeriod;
        return new Date(Date.now() + msUntilExpiration);
    }


    newDragon({ accountId }){
        if (Date.now() > this.expiration){
            throw new Error(`this generation expired on ${this.expiration}`)
        }

        if (this.accountsIds.has(accountId)){
            throw new Error(`You already own a dragon from this generation!`)
        }

        this.accountsIds.add(accountId);
        return new Dragon({generationId: this.generationId});
    }

}


module.exports = Generation;