const {Router} = require('express');
const { searchDragon } = require('../dragon/helper')
const { authenticatedAccount } = require('./helper');
const AccountDragonTable = require('../accountDragon/table')

const router = new Router();


router.get('/', (req, res) => {

    const search = JSON.parse(req.query.search);
    const sorts = JSON.parse(req.query.sorts);
    const checkFilters = JSON.parse(req.query.checkFilters);
    const rangeFilters = JSON.parse(req.query.rangeFilters);
    const offset = JSON.parse(req.query.offset);
    const isOwner = JSON.parse(req.query.isOwner);
    let accountId;
    
    authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
        accountId = account.id;
        return AccountDragonTable.getAccountDragons({ accountId: account.id });
    })
    .then(({ accountDragons }) => {
        return searchDragon(search, sorts, checkFilters, rangeFilters, accountDragons, offset, accountId, isOwner);
    })
    .then(({ dragons, searchFullSize }) => {
        res.json({ dragons, searchFullSize })
    })
    .catch(error => next(error));        
});


module.exports = router;