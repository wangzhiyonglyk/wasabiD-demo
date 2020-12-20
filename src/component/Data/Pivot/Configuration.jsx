/**
 * create by wangzhiyong
 * date:2020-12-21
 * desc 交叉表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import func from "../../libs/func";
import diff from "../../libs/diff";
class Configuration extends Component {
    constructor(props) {
        super(props);
        let p={ 
            fields:func.clone(this.props.fields),//所有的字段
            rows:func.clone(this.props.rows),//行维度
            columns:func.clone(this.props.columns),//列维度
            values:func.clone(this.props.values),//统计参数
            filters:func.clone(this.props.filters),//筛选条件
        }
        let s={};
        for(let key in p){
            s[key]=p[key];
            s["old"+key]=p[key];//保留一份方便更新
        }
        this.state =s;
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let newState={};
        for(let key in nextProps){
            if(prevState.hasOwnProperty(["old"+key])&&diff(prevState["old"+key],nextProps[key])){
                //更新此字段
                newState["old"+key]=nextProps[key];
                newState[key]=nextProps[key];
            }
        }
        if(func.isEmptyObject(newState)){
            return null;
        }
        else{
            return newState;
        }
       
    }
    render(){

    }
}


Configuration.propTypes = {
    fields: PropTypes.array,//所有的字段
    rows: PropTypes.array,//行维度
    columns: PropTypes.array,//列维度
    values: PropTypes.array,//统计参数
    filters: PropTypes.array,//筛选条件
    applyHandler:PropTypes.func,//请求数据
}

Configuration.defaultProps = {
    fields:[],//所有的字段
    rows: [],//行维度
    columns:[],//列维度
    values: [],//统计参数
    filters:[],//筛选条件
    applyHandler:[],//请求数据
}
