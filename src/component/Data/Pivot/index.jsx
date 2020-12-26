/**
 * create by wangzhiyong
 * date:2020-12-21
 * desc 交叉表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import func from "../../libs/func";
import diff from "../../libs/diff";

import DataGrid from "../DataGrid"
import Tree from "../Tree";
import Configuration from "./Configuration";
import mixins from "../../Mixins/mixins"
import dataHandler from "./dataHandler"
import ("./index.css")
class Pivot extends Component {
    constructor(props) {
        super(props);
        let p={ 
            fields:func.clone(this.props.fields),//所有的字段
            rows:func.clone(this.props.rows),//行维度
            columns:func.clone(this.props.columns),//列维度
            values:func.clone(this.props.values),//统计参数
            filters:func.clone(this.props.filters),//筛选条件
            data:func.clone(this.props.data),//数据
            headers:[[{label:"树结构",colSpan:2}],[{name:"id",label:"id",sortAble:true,},{name:"name",label:"名称"}]],
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
    componentDidMount(){
        this.initData();
        setTimeout(()=>{
            this.setState({
                data:[ { id:1, pId:0, name:"父节点1 - 展开", open:true},
                { id:11, pId:1, name:"父节点11 - 折叠"},
                { id:111, pId:11, name:"叶子节点111"},
                { id:112, pId:11, name:"叶子节点112"},
                { id:113, pId:11, name:"叶子节点113"},
                { id:114, pId:11, name:"叶子节点114"},
                { id:12, pId:1, name:"父节点12 - 折叠"},
                { id:121, pId:12, name:"叶子节点121"},
                { id:122, pId:12, name:"叶子节点122"},
                { id:123, pId:12, name:"叶子节点123"},
                { id:124, pId:12, name:"叶子节点124"},
                { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
                { id:2, pId:0, name:"父节点2 - 折叠"},
                { id:21, pId:2, name:"父节点21 - 展开", open:true},
                { id:211, pId:21, name:"叶子节点211"},
                { id:212, pId:21, name:"叶子节点212"},
                { id:213, pId:21, name:"叶子节点213"},
                { id:214, pId:21, name:"叶子节点214"},
                { id:22, pId:2, name:"父节点22 - 折叠"},
                { id:221, pId:22, name:"叶子节点221"},
                { id:222, pId:22, name:"叶子节点222"},
                { id:223, pId:22, name:"叶子节点223"},
                { id:224, pId:22, name:"叶子节点224"},
                { id:23, pId:2, name:"父节点23 - 折叠"},
                { id:231, pId:23, name:"叶子节点231"},
                { id:232, pId:23, name:"叶子节点232"},
                { id:233, pId:23, name:"叶子节点233"},
                { id:234, pId:23, name:"叶子节点234"},
                { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}]
              })
        },1500)
       
        
    }
    initData(){
        this.setRowsAndColumns(this.state.columns,this.state.rows,this.state.data);
    }
    render(){
        console.log(this.state.data)
        let treeTop=0;
        if(this.state.headers instanceof Array&&this.state.headers.length>0){
            if(this.state.headers[0] instanceof Array){
                treeTop=this.state.headers.length*41;
            }
            else{
                treeTop=41;
            }
        }
       return <div className="wasabi-pivot">
               <div className="wasabi-pivot-left">
                  <Configuration height={treeTop}></Configuration>
                  <div className="wasabi-pivot-rowsData" >
                  <Tree  data={this.state.data} simpleData={true} idField="id" textField="name"></Tree>
                  </div>
               </div>
               <div className="wasabi-pivot-right">
               <DataGrid pagination={this.props.pagination}  rowNumber={false}
    headers={this.state.headers} data={this.state.data}></DataGrid>
               </div>
       </div>
    }
}


Pivot.propTypes = {
    fields: PropTypes.array,//所有的字段
    rows: PropTypes.array,//行维度
    columns: PropTypes.array,//列维度
    values: PropTypes.array,//统计参数
    filters: PropTypes.array,//筛选条件
    data: PropTypes.array,//数据,
    applyHandler:PropTypes.func,//请求数据处理
}

Pivot.defaultProps = {
    fields:[],//所有的字段
    rows: [],//行维度
    columns:[],//列维度
    values: [],//统计参数
    filters:[],//筛选条件
    data:[],//数据,
    applyHandler:null,//请求数据处理
}
mixins(Pivot,[dataHandler])
export default Pivot;