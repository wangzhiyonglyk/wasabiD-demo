import {createStore} from 'redux';
import reducer from './reducer';

const defaultState ={
    proArr:[],         //前区选中数组
    postArr:[],        //后区选中数组
    proSelectValue:5,   //前区下拉框内选中机选个数
    postSelectValue:2,  //后区下拉框内选中机选个数
    displayArr:[]   //展示组合数组
}

const store = createStore(reducer,defaultState);

export default store;