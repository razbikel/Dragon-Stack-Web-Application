const Dragon = require('../dragon/index');
const base64 = require('base-64');


class Breeder{

    static breedDragon({ mother, father }){
        const motherTraits = mother.traits;
        const fatherTraits = father.traits;

        const babyTraits = [];
        const babyGenerationId = mother.generationId >= father.generationId ? mother.generationId : father.generationId;

        motherTraits.forEach( ({ traitType, traitValue }) => {
            const motherTraitValue = traitValue;

            const fatherTraitValue = fatherTraits.find((trait) => {
                return traitType === trait.traitType
            }).traitValue

            babyTraits.push({
                traitType,
                traitValue: Breeder.pickTrait({ motherTrait: motherTraitValue, fatherTrait: fatherTraitValue })
            })
        });

        return new Dragon({ nickname: 'unnamed baby', traits: babyTraits, generationId: babyGenerationId })
    }


    // Two incoming trait values: motherTrait and fatherTrait
    // the mother trait and father trait string values are encoded
    // both traits have their characters summed
    // get a range by adding both character sums
    // generate a random number in that range
    // if the number is less than the mother's character sum, pick mother
    // else pick father
    static pickTrait({ motherTrait, fatherTrait }){

        if (motherTrait === fatherTrait){
            return motherTrait;
        }

        const motherTraitCharSum = Breeder.charSum(base64.encode(motherTrait));
        const fatherTraitCharSum = Breeder.charSum(base64.encode(fatherTrait));

        const randNum = Math.floor(Math.random() * (motherTraitCharSum + fatherTraitCharSum));

        return randNum < motherTraitCharSum ? motherTrait : fatherTrait;
    }


    static charSum(string){
        return string.split('').reduce((sum, char) => {
            return sum += char.charCodeAt(0)
        }, 0);
    }

}


module.exports = Breeder;