/**
 * create by wangzhiyong
 * date:2021-03-30
 * 2021-11-28 完善组件，修复bug，重新调整样式，完善下划线，文字，图标，勾选，选中样式
 * desc 树型表格
 */


 import React, { Component } from 'react';

 import func from "../../libs/func";
 import DataGrid from "../DataGrid";
 import TreeView from "../Tree/TreeView";
 import "./index.css"
 import config from './config';
 class TreeGrid extends Component {
     constructor(props) {
         super(props);
         this.state = {
           
         }
        
         this.dataGridClick=this.dataGridClick.bind(this);
         
     }
     static getDerivedStateFromProps(props, state) {
         let newState = {};
         if (props.data && props.data instanceof Array && func.diff(props.data, state.rawData)) {
             newState.rawData = (props.data);
             let flatData = func.treeDataToFlatData(props.data)
             newState.data = func.clone(props.data);
             return newState;
 
         }
         return null;
 
     }
    
   
 
     /**
      * 表格的单击事件 todo
      * @param {*} rowData 
      * @param {*} rowIndex 
      */
     dataGridClick(rowData, rowIndex) {
         this.props.onClick && this.props.onClick(rowData.id);
 
     }
   
    
    
     render() {
         console.log("headers",this.props.headers,this.props.visibleData)
         let treeTopHeight = 0;
         if (this.props.headers instanceof Array && this.props.headers.length > 0) {
             if (this.props.headers[0] instanceof Array) {
                 treeTopHeight = this.props.headers.length * config.topHeight;
             }
             else {
                 treeTopHeight = config.topHeight;;
             }
         }
 
         return <div className={"wasabi-treegrid "}>
             <div className="wasabi-treegrid-left" style={{width:config.leftWidth}}>
                 <div className="wasabi-treegrid-configuration" style={{ height: treeTopHeight ,lineHeight:treeTopHeight+"px"}}>
                     {this.props.treeHeader}
                 </div>
                 <div className="wasabi-treegrid-rowsData" >
                     <TreeView {...this.props}
                    //  取消虚线
                     dotted={false}
                     ></TreeView>
                 </div>
             </div>
             <div className="wasabi-treegrid-right">
                 <DataGrid  pagination={false} rowNumber={false}
                     headers={this.props.headers} data={this.props.visibleData}
                     isPivot={true}
                    
                   ></DataGrid>
             </div>
         </div>
     }
 }

 
 export default TreeGrid;