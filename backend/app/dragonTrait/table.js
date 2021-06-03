const pool = require('../../databasePool');
const traitTable = require('../trait/table');

class DragonTraitTable{
    
    static storeDragonTrait({dragonId, traitType, traitValue}){
        return new Promise((resolve, reject) => {
            traitTable.getTraitId({traitType, traitValue})
            .then(({traitId}) => {
                pool.query(
                    'INSERT INTO dragonTrait("dragonId", "traitId") VALUES($1, $2)',
                    [dragonId, traitId],
                    ((error, response) => {
                        if (error){
                            reject(error);
                        }
                        resolve();
                    })
                )
            })
            .catch((error) => {
                reject(error);
            })

        });
    }
}

module.exports = DragonTraitTable;