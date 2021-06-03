import  React from 'react';
import './helper.css'


export const canBuyOrBreed = (dragonId, accountDragonsIds) => {
    return !accountDragonsIds.includes(dragonId);
};


export const clearForm = () => {
    document.getElementById("myForm").reset();
    document.getElementById("myForm2").reset(); 
    document.getElementById("myForm3").reset();
    document.getElementById("myForm4").reset();  
}


export const getCurrentSearchKey = (searchKeys) => {
    let searchKey;

    Object.entries(searchKeys).forEach(key => {
        if( key[1] === true){
            searchKey = key[0]
        }
    })

   return searchKey;
}


export const getCurrentSortKeys = (sortsState) => {
    let sortsKeys = [];
    let sorts = [];

    Object.entries(sortsState).forEach(sort => {        
        if( sort[1] === true){
            sortsKeys.push(sort[0]);
        }
    })

    if (sortsKeys.length > 0){
        sorts = sortsKeys.map(sort => {
            if (sort.includes('Up')){
                return {key : sort.slice(0, -2), value : 'ASC' }
            }
            else {
                return {key : sort.slice(0, -4), value : 'DESC' }
            }
        })
    }

    return sorts;
}


export const getCurrentCheckFilterKey = (checkFiltersState) => {
    let filterKeys = [];
    let checkFilters = [];

    Object.entries(checkFiltersState).forEach(filter => {
        if( filter[1] === true){
            filterKeys.push(filter[0]);
        }
    })

    if (filterKeys.length > 0){
        checkFilters = filterKeys.map(filter => {
            if (filter === 'isPublic'){
                return {key : filter, value : true }
            }
            if (filter === 'owner'){
                return {key : filter, value : true }
            }
            if  (filter === 'male') {
                return {key : 'gender', value : filter }
            }
            if  (filter === 'female') {
                return {key : 'gender', value : filter }
            }
        })
    }
   return checkFilters;
}


export const getCurrentRangeFilterKey = (rangeFiltersState) => {
    let rangeFilters = [];
    let rangeFilterKey;
    let min = rangeFiltersState.min === '' ? 0 : rangeFiltersState.min;
    let max = rangeFiltersState.max === '' ? Number.MAX_SAFE_INTEGER : rangeFiltersState.max;

    Object.entries(rangeFiltersState.key).forEach(filter => {
        if( filter[1] === true){
            rangeFilterKey = filter[0]
        }
    })

    if (rangeFilterKey !== undefined && min !== undefined && max !== undefined ){
        rangeFilters.push({ key: rangeFilterKey, min, max })
    }

    if (rangeFilterKey !== undefined && min !== undefined && max === undefined ){
        rangeFilters.push({ key: rangeFilterKey, min, max: Number.MAX_SAFE_INTEGER })
    }

    if (rangeFilterKey !== undefined && min === undefined && max !== undefined ){
        rangeFilters.push({ key: rangeFilterKey, min: 0, max })
    }

    return rangeFilters;
}


export const getTopBarLinks = (fetchStatuses) => {

    let active = fetchStatuses.includes('fetching') ?
         false : true;

    return(
        <div>
            <span><a href='/' className={`top-bar-link-${active}`}>Home</a></span>
            <span><a href='/search' className={`top-bar-link-${active}`}>Search</a></span>
            <span><a href='/account-dragons' className={`top-bar-link-${active}`}>Account Dragons</a></span>
            <span><a href='/public-dragons' className={`top-bar-link-${active}`}>Public Dragons</a></span>
            <span><a href='/help' className={`top-bar-link-${active}`}>Help</a></span>
        </div>
    )
}


export const defaultSort = {
    saleValueUp: false,
    saleValueDown: false,
    likesUp: false,
    likesDown: false,
    birthdateUp: false,
    birthdateDown: false,
    birthValueUp: false,
    birthValueDown: false
}

export const defaultFilter = {
    isPublic: false,
    male: false,
    female: false,
    owner: false
}

export const defaultRangeFilter = {
    key: {
        saleValue: true,
        likes: false,
        birthValue: false,
        generationId: false
    },
    min: undefined,
    max: undefined
}