const pool = require('../../databasePool');
const DragonTraitTable = require('../dragonTrait/table');


class DragonTable{

    static storeDragon(dragon){
        return new Promise((resolve, reject) => {
            const {birthdate, nickname, generationId, isPublic, saleValue, birthValue, gender, likes} = dragon;
            pool.query(
                `INSERT INTO dragon(birthdate, nickname, "generationId", "isPublic", "saleValue", "birthValue", gender, likes)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING id`,
                [birthdate, nickname, generationId, isPublic, saleValue, birthValue, gender, likes],
                ((error, response) => {
                    if (error) {
                        return reject(error);
                    }

                    const dragonId = response.rows[0].id;

                    Promise.all(dragon.traits.map(({traitType, traitValue}) => {
                         return DragonTraitTable.storeDragonTrait({
                            dragonId, traitType, traitValue});
                        }))
                    .then(() => resolve({dragonId}))
                    .catch(error => reject(error));
                }) 
            )
        })
    }


    static getDragon({ dragonId }){
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT birthdate, nickname, "generationId", "isPublic", "saleValue", "birthValue", gender, likes
                FROM dragon
                WHERE dragon.id = $1`,
                [dragonId],
                ((error, response) => {
                    if (error){
                        return reject(error);
                    }
                    if (response.rows.length === 0){
                        return reject(new Error('no dragon!'));
                    }
                    resolve(response.rows[0]);
                })
            )
        })
    }


    static updateDragon({ dragonId, nickname, isPublic, saleValue, birthValue, likes }){
      
        const settingsMap = { nickname, isPublic, saleValue, birthValue, likes };

            const queries = Object.entries(settingsMap).filter(([settingKey, settingValue]) => {
                if (settingValue !== undefined){
                    return new Promise((resolve, reject) => {
                        pool.query(
                            `UPDATE dragon SET "${settingKey}" = $1 WHERE id = $2`,
                            [settingValue, dragonId],
                            (error, response) => {
                                if (error) {
                                    return reject(error);
                                }
            
                                resolve();
                            }
                        )
                    })
                }

            });
            return Promise.all(queries);
    };
}

module.exports = DragonTable;