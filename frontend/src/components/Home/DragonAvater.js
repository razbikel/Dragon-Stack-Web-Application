import React, {Component} from 'react';
import { skinny, slender, sporty, stocky, patchy, plain, spotted, striped } from '../../assets/index';

import './Home.css'

const propertyMap = {
    backgroundColor: {
      black: '#263238',
      white: '#cfd8dc',
      green: '#a5d6a7',
      blue: '#0277bd'
    },
    build: { slender, stocky, sporty, skinny },
    pattern: { plain, striped, spotted, patchy },
    size: { small: 100, medium: 140, large: 180, enormous: 220 }
  };

  const patternTraits = [{plain}, {striped}, {spotted}, {patchy}];

  const patternValues = patternTraits.map( patternTrait => {
      return Object.keys(patternTrait)[0];
  })

  const patternRealValues = patternTraits.map( patternTrait => {
    return Object.values(patternTrait)[0];
})


class DragonAvatar extends Component{

  get DragonImage() {
    const dragonPropertyMap = {};

    let patternValue, patternRealValueIndex;

    this.props.dragon.traits.forEach(trait => {
      const { traitType, traitValue } = trait;

      if (traitType !== 'backgroundColor' && traitType !== 'build' && traitType !== 'size' ){
        patternValue = patternValues.find((patternValue) => {
            return patternValue === traitValue
        })
      }

      if (traitType == 'backgroundColor' || traitType == 'build' || traitType == 'size'){
        dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
      }
      
    });

    const { backgroundColor, build, size } = dragonPropertyMap;

    patternRealValueIndex = patternValues.findIndex(currPatternValue => {
        return patternValue === currPatternValue;
    })

    const pattern = patternRealValues[patternRealValueIndex]

    const sizing = { width: size, height: size };

    return (
      <div className='dragon-avatar-image-wrapper'>
        <div className='dragon-avatar-image-background' style={{ backgroundColor, ...sizing }}></div>
        <img src={pattern} className='dragon-avatar-image-pattern' style={{ ...sizing }} />
        <img src={build} className='dragon-avatar-image' style={{ ...sizing }} />
      </div>
    );
  }


  render(){
      const dragon = this.props.dragon;

      if (dragon.dragonId === ''){
          return (
              <div></div>
          )
      }

      return(
          <div>
              <div>ID: {dragon.dragonId}{', '} GenerationID: {dragon.generationId}</div>
              <span className={this.props.dragon.gender}>{this.props.dragon.gender}. </span>
              { dragon.traits.map((trait) => trait.traitValue).join(', ') }
              { this.DragonImage }
          </div>
      )
    }
}


export default DragonAvatar;