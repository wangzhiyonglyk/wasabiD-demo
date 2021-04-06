/**
 * create by wangzhiyong
 * date:2021-03-30
 * desc 树型表格
 */

/**
 * create by wangzhiyong
 * date:2020-12-21
 * desc 交叉表
 * desc
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
 import("./index.css")
 class TreeGrid extends Component {
     constructor(props) {
         super(props);
         this.state={
            rowsTreeData:[],
            realData:[]
         }
     }
     static getDerivedStateFromProps(props, state) {
     
     }
 
     componentDidMount() {
     
     }
 
     componentDidUpdate() {
      
     }
 
     
     dataGridClick(rowData, rowIndex) {
         
       
 
     }
     treeClick(_id) {
        
     }
     render() {
        let treeTop = 0;
        if (this.state.headers instanceof Array && this.state.headers.length > 0) {
            if (this.state.headers[0] instanceof Array) {
                treeTop = this.state.headers.length * 41;
            }
            else {
                treeTop = 41;
            }
        }
       
         return <div className="wasabi-treegrid">
               <div className="wasabi-treegrid-left">
                <div  className="wasabi-treegrid-configuration" style={{height:treeTop}}></div>
                <div className="wasabi-treegrid-rowsData" >
                    <Tree checkAble={this.props.checkAble} ref="tree" onClick={this.treeClick.bind(this)}  data={this.state.rowsTreeData} simpleData={true} ></Tree>
                </div>
            </div>
             <div className="wasabi-treegrid-right">
                 <DataGrid ref="grid" pagination={false} rowNumber={false}
                     headers={this.state.headers} data={this.state.realData} 
                      onClick={this.dataGridClick.bind(this)}></DataGrid>
             </div>
         </div>
     }
 }
 

 export default TreeGrid;