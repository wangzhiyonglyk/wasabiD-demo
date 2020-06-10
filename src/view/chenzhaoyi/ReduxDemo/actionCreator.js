import * as ActionTypes from './actionTypes';


export const doIncrementAction=(title) =>{
        return{
            type:ActionTypes.DO_INCREMENT,
            title:title
        };   
    };
export const doDecrementAction=(title) =>{
        return{
            type:ActionTypes.DO_DECREMENT,
            title:title
        };
    };