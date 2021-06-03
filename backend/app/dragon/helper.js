const pool = require('../../databasePool');
const DragonTable = require('./table');
const Dragon = require('./index');
const { getSearchQuery, getSearchSortQuery, getCheckFilterQuery, getRangeFilterQuery } = require('../api/helper');


const getDragonWithTraits = ({dragonId}) => {
    return Promise.all([
        DragonTable.getDragon({ dragonId }),
        new Promise((resolve, reject) => {
            pool.query(
                `SELECT "traitType", "traitValue"
                FROM trait
                INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
                WHERE dragonTrait."dragonId" = $1`,
                [dragonId],
                ((error, response) => {
                    if (error){
                        return reject(error);
                    }
                    resolve(response.rows);
                })
            )
        })
    ])
    .then(([dragon, dragonTraits]) => {
        return new Dragon({
            nickname: dragon.nickname,
            birthdate: dragon.birthdate,
            traits: dragonTraits,
            generationId: dragon.generationId,
            dragonId: dragonId,
            isPublic: dragon.isPublic,
            saleValue: dragon.saleValue,
            birthValue: dragon.birthValue,
            gender: dragon.gender,
            likes: dragon.likes
        });
    })
    .catch(error => console.error(error));
}


const getPublicDragons = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT id from dragon WHERE "isPublic" = TRUE`,
            [],
            (error, response) => {
                if (error){
                    return reject(error);
                }

                const publicDragonIds = response.rows;

                Promise.all(publicDragonIds.map(({ id }) => {
                    return getDragonWithTraits({ dragonId: id });
                }))
                .then(dragons => {
                    resolve({dragons});
                })
                .catch(error => reject(error));
            }
        )
    })
}


const getSearchResultsSize = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `${query}`,
            [],
            (error, response) => {
                if (error){
                    return reject(error);
                }
                resolve(response.rows[0].count);
            }
        )
    })
}


// input example:
// search = { key: 'nickname', value: 'luna' }
// sorts = [ { key: 'generationId', value: 'ASC' }, { key: id, value: 'DESC' } ] ASC = order up, DESC = order down
// checkFilters = [ { key: 'isPublic', value: true }, { key: 'gender', value: 'male' } ] 
// rangeFilters = [ { key: 'saleValue', min: 10, max: 50 } ] 
// offset = 0, the number of rows to forward every time when fetching 10 rows.

// output : { dragons: [ {dragon1}, {dragon2} ... ], fullSize: x }

const searchDragon = (search, sorts, checkFilters, rangeFilters, accountDragons, offset, accountId, isOwner) => {
        
    let searchedDragons, searchFullSize;
    let numOfDragonsInPage = 10;
    let { searchQuery, isFirtCondition1 } = getSearchQuery(search, isOwner, accountId);
    let { checkFiltersQuery, isFirtCondition2, ownerFilter } = getCheckFilterQuery(checkFilters, isFirtCondition1);
    let rangeFilterQuery = getRangeFilterQuery(rangeFilters, isFirtCondition2);
    let sortQuery = getSearchSortQuery(sorts);
    let rowsFullSize = 'SELECT COUNT(id)' + searchQuery.slice(9) + checkFiltersQuery + rangeFilterQuery;
    let offsetQuery = `OFFSET ${offset * numOfDragonsInPage} rows FETCH NEXT ${numOfDragonsInPage} rows ONLY`;

    let fullQuery = offset === -1 ? searchQuery + checkFiltersQuery + rangeFilterQuery + sortQuery :
                    '('+ searchQuery + checkFiltersQuery + rangeFilterQuery + offsetQuery + ') ' + sortQuery;  
                    

    return new Promise((resolve, reject) => {
        pool.query(
            `${fullQuery}`,
            [],
            (error, response) => {
                if (error){
                    return reject(error);
                }

                const searchedDragonIds = response.rows;
                let finalDragons = searchedDragonIds;

                if (ownerFilter){
                    searchFullSize = accountDragons.length;
                }

                Promise.all(finalDragons.map(({ id }) => {
                    return getDragonWithTraits({ dragonId: id });
                }))
                .then(dragons => {
                    searchedDragons = dragons;
                    return getSearchResultsSize(rowsFullSize);
                })
                .then(count => {
                    searchFullSize = count;
                    resolve({ dragons: searchedDragons, searchFullSize })
                })
                .catch(error => reject(error));
            }
        )
    })

}


const getPopularDragons = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT id from dragon ORDER BY likes DESC LIMIT 10`,
            [],
            (error, response) => {
                if (error){
                    return reject(error);
                }

                const popularDragonIds = response.rows;

                Promise.all(popularDragonIds.map(({ id }) => {
                    return getDragonWithTraits({ dragonId: id });
                }))
                .then(dragons => {
                    resolve({dragons});
                })
                .catch(error => reject(error));

            }
        )
    })
}


module.exports = { getDragonWithTraits, getPublicDragons, searchDragon, getPopularDragons };