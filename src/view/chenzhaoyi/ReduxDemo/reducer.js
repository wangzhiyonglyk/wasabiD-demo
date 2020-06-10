import * as ActionTypes from './actionTypes';

//reducer 可以接受state，但绝不能改变state
//reducer是纯函数，给定固定输入，一定有固定输出。且不会有任何副作用
export default(state,action)=>{
    const {title} = action;

    if(action.type===ActionTypes.DO_INCREMENT){
        return {...state, [title]: state[title] + 1};

    }
    if(action.type===ActionTypes.DO_DECREMENT){
        /*方式一：return {...state, [title]: state[title] - 1};*/
        /*方式二：const newState = JSON.parse(JSON.stringify(state));
        newState[title]= state[title]-1;
        return newState;*/
        return {...state, [title]: state[title] - 1};
    }
    return state;
}