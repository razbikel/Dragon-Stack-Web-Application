const pool = require('../../databasePool');


class AccountLikesTable{

    static storeAccountLike({ accountId, dragonId, username }){
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO accountLikes("accountId", "dragonId", "username") VALUES ($1, $2, $3)',
                [accountId, dragonId, username],
                (error, response) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve();
                }
            )
        })
    }


    static deletAccountLike({ accountId, dragonId }){
        return new Promise((resolve, reject) => {
            pool.query(
                'DELETE FROM accountLikes WHERE "accountId" = $1 AND "dragonId" = $2',
                [accountId, dragonId],
                (error, response) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve();
                }
            )
        })
    }


    static getAccountLikes({ accountId }){
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT "dragonId"
                FROM accountLikes
                WHERE "accountId" = $1`,
                [accountId],
                (error, response) => {
                    if (error){
                        return reject(error);
                    }

                    resolve({accountLikes: response.rows})
                }
            )
        })
    }


    static getDragonLikes({ dragonId }){
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT "accountId", "username"
                FROM accountLikes
                WHERE "dragonId" = $1`,
                [dragonId],
                (error, response) => {
                    if (error){
                        return reject(error);
                    }

                    resolve({dragonLikes: response.rows})
                }
            )
        })
    }


    static isAccountLikedDragon({ accountId, dragonId }){
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT "dragonId" FROM accountLikes  WHERE "accountId" = $1 AND "dragonId" = $2`,
                [accountId, dragonId],
                (error, response) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve({ dragonId: response.rows[0] });
                }

            )
        })
    }

}


module.exports = AccountLikesTable;