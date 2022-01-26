/**
 * create by wangzhiyong 树型表格视图
 * date:2022-01-06 因为虚拟列表的原因，要容器与视图拆分
 * 2022-01-06 修复树表格的单击事件的bug
 */


import React, { useCallback, useImperativeHandle, useRef } from 'react';
import DataGrid from "../DataGrid";
import TreeView from "../Tree/TreeView";
import "./index.css"
import config from './config';


function TreeGrid(props) {
    const grid = useRef(null);
    let treeTopHeight = 0;
    if (props.headers instanceof Array && props.headers.length > 0) {
        if (props.headers[0] instanceof Array) {
            treeTopHeight = props.headers.length * config.topHeight;
        }
        else {
            treeTopHeight = config.topHeight;;
        }
    }
    /**
        * 表格的单击事件
        * @param {*} rowData 
        * @param {*} rowIndex 
        */
    const dataGridClick = useCallback(
        (rowData, rowIndex) => {
            props.onClick && props.onClick((rowData[props.priKey] ?? rowIndex));
        },
        []
    )
    useImperativeHandle(ref, () => ({
        /**
             * 设置焦点行
             * @param {*} id 
             */
        setFocus(id) {
            grid?.current.setFocus(id);
        }
    }))

    return <div className={"wasabi-treegrid "}>
        <div className="wasabi-treegrid-left" style={{ width: config.leftWidth }}>
            <div className="wasabi-treegrid-configuration" style={{ height: treeTopHeight, lineHeight: treeTopHeight + "px" }}>
                {props.treeHeader}
            </div>
            <div className="wasabi-treegrid-rowsData" >
                <TreeView {...props}
                    //  取消虚线
                    dotted={false}
                ></TreeView>
            </div>
        </div>
        <div className="wasabi-treegrid-right">
            <DataGrid ref={this.grid} pagination={false} rowNumber={false}
                priKey={props.idField}
                headers={props.headers} data={props.visibleData}
                onClick={dataGridClick}
            ></DataGrid>
        </div>
    </div>
}

export default TreeGrid;