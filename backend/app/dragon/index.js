const TRAITS = require ('../../data/traits.json')


const DEAFULT_PROPERTIES = {
    dragonId: undefined,
    get birthdate(){
        return new Date();
    },
    nickname: 'unnamed',
    generationId: undefined,
    isPublic: false,
    saleValue: 0,
    birthValue: 0,
    likes: 0,
    get gender(){
        const randNum = Math.random();
        return randNum > 0.5 ? 'male' : 'female';
    },
    get randomTraits(){
        const traits = [];
        TRAITS.forEach(TRAIT => {
            const traitType = TRAIT.type;
            const traitValues = TRAIT.values;
            const traitValue = traitValues[
                Math.floor(Math.random() * traitValues.length)
            ];
            traits.push({traitType, traitValue});
        })
        return traits;
    }
}


class Dragon {
    constructor({dragonId, nickname, birthdate, traits, generationId, isPublic, saleValue, birthValue, gender, likes } = {}){
        this.dragonId = dragonId || DEAFULT_PROPERTIES.dragonId;
        this.birthdate = birthdate || DEAFULT_PROPERTIES.birthdate;
        this.nickname = nickname || DEAFULT_PROPERTIES.nickname;
        this.traits = traits || DEAFULT_PROPERTIES.randomTraits;
        this.generationId = generationId || DEAFULT_PROPERTIES.generationId;
        this.isPublic = isPublic || DEAFULT_PROPERTIES.isPublic;
        this.saleValue = saleValue || DEAFULT_PROPERTIES.saleValue;
        this.birthValue = birthValue || DEAFULT_PROPERTIES.birthValue;
        this.gender = gender || DEAFULT_PROPERTIES.gender;
        this.likes = likes || DEAFULT_PROPERTIES.likes;
    }
}


module.exports = Dragon;
