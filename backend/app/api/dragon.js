const {Router} = require('express');
const DragonTable = require('../dragon/table');
const { authenticatedAccount } = require('./helper');
const AccoutDragonTable = require('../accountDragon/table');
const { getPublicDragons, getDragonWithTraits, getPopularDragons } = require('../dragon/helper');
const AccountTable = require('../account/table');
const Breeder = require('../dragon/breeder');
const AccountLikesTable = require('../accountLikes/table');
const Session = require('../account/session');


const router = new Router();


router.get('/new', (req, res, next) => {
    let dragon, accountId;

    authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
        accountId = account.id;
        dragon = req.app.locals.engine.generation.newDragon({ accountId });
        return DragonTable.storeDragon(dragon);
    })
    .then(({ dragonId }) => {
        dragon.dragonId = dragonId;
        return AccoutDragonTable.storeAccountDragon({ accountId, dragonId });   
    })
    .then(() => {
        res.json({ dragon });
    })
    .catch(error => {
        next(error);  
    });
});


router.put('/update', (req, res, next) => {

    const { nickname, dragonId, isPublic, saleValue, birthValue, likes } = req.body;
    const LikeSessionString = req.cookies.sessionString;
    let likeAccountId;
    let newLikesAmount = likes;

    // update does not include like operation
    if (likes === undefined) {
        DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue, birthValue, likes })
        .then(() => {
            res.json({ message: 'Dragon updated successfully!' })
        })
        .catch(error => {
            next(error)
        });
    }

    // update includes like operation, first need to be checked if like or dislike
    else {

        // get account id
        authenticatedAccount({ sessionString: LikeSessionString})
        .then(({ account, authenticated }) => {
            if (!authenticated){
                throw new Error('User must be logged in for liking a dragon')
            }

            likeAccountId = account.id

            // check if account likes this dragon in the past (like or dislike)
            return AccountLikesTable.isAccountLikedDragon({ accountId: likeAccountId, dragonId })

        })
        .then((res) => {
            const tableDragonId = res.dragonId;

            // account didnt like this dragon yet - mean this press on button is 'like'
            if (tableDragonId === undefined){
                newLikesAmount = newLikesAmount + 1;
                return AccountLikesTable.storeAccountLike({ accountId: likeAccountId, dragonId, username: Session.parse(LikeSessionString).username })
            }

            // account have already like this dragon before - means this press on button is 'dislike'
            else {
                newLikesAmount = newLikesAmount - 1;
                return AccountLikesTable.deletAccountLike({ accountId: likeAccountId, dragonId })
            }
        })
        .then(() => {
            return DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue, birthValue, likes: newLikesAmount })
        })
        .then(() => {
            res.json({ message: 'Dragon updated successfully!', newLikesAmount  })
        })
        .catch(error => {
            next(error)
        });
    }
})


router.get('/public-dragons', (req, res, next) => {

    getPublicDragons()
    .then(({dragons}) => {
        res.json({ dragons })
    })
    .catch(error => next(error));
})


router.get('/dragon-likes', (req, res, next) => {
    const dragonId = req.query.dragonId;
    
    AccountLikesTable.getDragonLikes({ dragonId })
    .then(({ dragonLikes }) => {
        res.json({ dragonLikes })
    })
    .catch(error => next(error));
})


router.get('/popular-dragons', (req, res, next) => {

    getPopularDragons()
    .then(({dragons}) => {
        res.json({ dragons })
    })
    .catch(error => next(error));
})


router.post('/buy', (req, res, next) => {
    const buyerSessionString = req.cookies.sessionString;
    let buyerId, buyerBalance, dragonSaleValue, sellerId;
    const dragonId = req.body.dragonId;
 
     // get the buyer account id and balance
    authenticatedAccount({ sessionString: buyerSessionString})
    .then(({ account, authenticated }) => {
        buyerId = account.id;
        buyerBalance = account.balance;

        if (!authenticated){
            throw new Error('User must be logged in for buying a dragon')
        }

        // get the dragon details for the saleValue
        return DragonTable.getDragon({ dragonId })
    })
    .then(dragon => {
        dragonSaleValue = dragon.saleValue;

        if (!dragon.isPublic){
            throw new Error('you cannot buy a dragon which is not public')
        }

        if (buyerBalance < dragonSaleValue){
            throw new Error('You dont have enough money to afford this dragon')
        }
        else {
            // get the dragon seller id
             return AccoutDragonTable.getDragonAccount({ dragonId })
        }
    })
   .then(({ accountId }) => {
        sellerId = accountId;

        if (sellerId === buyerId){
            throw new Error('You cannot buy your own dragons')
        }

        return Promise.all([
            // increase the sale value from the seller balance
            AccountTable.updateBalance({ accountId: sellerId, value: dragonSaleValue }),
            // decrease the sale value from the buyer balance
            AccountTable.updateBalance({ accountId: buyerId, value: dragonSaleValue * -1 }),
            // pass the dragon to the new buyer
            AccoutDragonTable.updateDragonAccount({ dragonId, accountId: buyerId }),
            // make the dragon not public for his new owner       
            DragonTable.updateDragon({ dragonId, isPublic: false })
        ])
    })
    .then((results) => {
        res.json({ 
            message: `Buying dragon was completed successfully! You can see your new dragon in:`,
            newBuyerBallance: results[1].balance
        })
    })
    .catch(error => next(error));
})


router.post('/breed', (req, res, next) => {
    const { motherDragonId, fatherDragonId } = req.body;
    let motherDragon, fatherDragon, motherDragonBirhValue, motherAccountId, fatherAccountId;

    if (motherDragonId === fatherDragonId){
        throw new Error('Cannot breed with the same dragon!');
    }

    getDragonWithTraits({ dragonId: motherDragonId})
    .then((dragon) => {
        if (!dragon.isPublic){
            throw new Error('Cannot breed a non public dragon!')
        }

        if (dragon.gender === 'male'){
            throw new Error('A male dragon cannot breed!')
        }

        motherDragon = dragon;
        motherDragonBirhValue = motherDragon.birthValue;

        return getDragonWithTraits({ dragonId: fatherDragonId});
    })
    .then((dragon) => {
        if (dragon.gender === 'female'){
            throw new Error('Cannot breed a female dragon with female dragon!')
        }

        fatherDragon = dragon;
        return authenticatedAccount({ sessionString: req.cookies.sessionString });
    })
    .then(({ account, authenticated }) => {

        if (motherDragonBirhValue > account.balance){
            throw new Error('Cannot afford breeding!')
        }

        if (!authenticated){
            throw new Error('User must be logged in for breeding')
        }

        fatherAccountId = account.id;

        return AccoutDragonTable.getDragonAccount({ dragonId: motherDragonId});
    })
    .then(({ accountId }) => {
        motherAccountId = accountId;

        if(motherAccountId === fatherAccountId){
            throw new Error('Cannot breed your own dragon!');
        }

        const babyDragon = Breeder.breedDragon({ mother: motherDragon, father: fatherDragon });
        return DragonTable.storeDragon(babyDragon);
    })
    .then(({ dragonId }) => {
         return Promise.all([
            AccoutDragonTable.storeAccountDragon({ accountId: fatherAccountId, dragonId }),
            AccountTable.updateBalance({ accountId: motherAccountId, value: motherDragonBirhValue }),
            AccountTable.updateBalance({ accountId: fatherAccountId, value: motherDragonBirhValue * -1 })
        ])
    })
    .then((results) =>{
        res.json({ 
            message: 'breeding was completed successfully, you now own a new baby dragon!',
            newFatherBalance: results[2].balance
            })
    } )
    .catch(error => next(error));
})


module.exports = router;




