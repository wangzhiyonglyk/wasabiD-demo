import React, { Component } from 'react';

import GridHeader from "./GridHeader";
import GridBody from "./GridBody"
import GridColGroup from "./GridColGroup"
import Pagination from '../../Pagination';
import GridLoading from './GridLoading'
import GridTool from "./GridTool"
import func from "../../../libs/func"
import Table from "../../Table/Table"
class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            containerid: func.uuid(),//表格容器
            fixtableid:func.uuid(),
            realtableid:func.uuid(),
           
            divideid: func.uuid(),
        }
        this.onHeaderMouseDown = this.onHeaderMouseDown.bind(this);
        this.onDivideMouseMove = this.onDivideMouseMove.bind(this);
        this.onDivideMouseUp = this.onDivideMouseUp.bind(this);
    }

    /**
     * 表头鼠标按下事件
     * @param {*} headerColumnIndex 
     * @param {*} event 
     */
    onHeaderMouseDown(headerColumnIndex, event) {
        this.headerColumnIndex = headerColumnIndex;
        let container = document.getElementById(this.state.containerid);
        this.left = container.getBoundingClientRect().left;
        this.beginLeft = event.clientX;
        container.style.userSelect = "none";
        container.style.cursor = "ew-resize";
        let divide = document.getElementById(this.state.divideid);
        divide.style.display = "block";
        divide.style.left = (event.clientX - this.left) + "px";//这个位置才是相对容器的位置
        document.addEventListener("mousemove", this.onDivideMouseMove);
        document.addEventListener("mouseup", this.onDivideMouseUp);
    }
    /**
     * 分隔线的拖动事件
     * @param {*} event 
     */
    onDivideMouseMove(event) {
        if (this.headerColumnIndex != null) {
            let divide = document.getElementById(this.state.divideid);
            divide.style.left = (event.clientX - this.left) + "px";//这个位置才是相对容器的位置
            event.target.style.cursor = "ew-resize";
        }
    }
    /**
     * 分隔线的鼠标松开事件
     * @param {*} event 
     */
    onDivideMouseUp(event) {
        if (this.headerColumnIndex != null) {
            try {
                let node=document.getElementById( this.state.realtableid).children[1].children[0].children[1];
                node.style.width=(node.offsetWidth+event.clientX - this.beginLeft)+"px"
                
                // let nodes = document.getElementById(this.state.containerid).querySelectorAll("colgroup");
                // if (nodes) {
                //     for (let i = 0; i < nodes.length; i++) {
                //         let width = nodes[i].children[this.headerColumnIndex].getAttribute("width") * 1 || 0;
                //         nodes[i].children[this.headerColumnIndex].setAttribute("width", width + event.clientX - this.beginLeft);
                //     }

                // }


            }
            catch (e) {

            }

            this.headerColumnIndex = null;
            let divide = document.getElementById(this.state.divideid);
            divide.style.display = "none";
            let container = document.getElementById(this.state.containerid);
            container.style.userSelect = null;
            container.style.cursor = "pointer";
            document.removeEventListener("mousemove", this.onDivideMouseMove);
            document.removeEventListener("mouseup", this.onDivideMouseUp);
        }



    }
    /**
     *渲染列的样式
     */
    renderColGruop() {
        return <GridColGroup
        headerWidth={this.props.headerWidth}
        containerid={this.state.containerid}
        fixtableid={this.state.fixtableid}
        realtableid={this.state.realtableid}
          
            single={this.props.single}
            headers={this.props.headers}
            selectAble={this.props.selectAble}
            rowNumber={this.props.rowNumber}
            detailAble={this.props.detailAble}
            perColumnWidth={this.props.perColumnWidth} >
        </GridColGroup>
    }

    /**
    * 处理非固定表头
    */
    renderHeader() {
        return <GridHeader
            single={this.props.single}
            headers={this.props.headers}
            selectAble={this.props.selectAble}
            singleSelect={this.props.singleSelect}
            rowNumber={this.props.rowNumber}
            detailAble={this.props.detailAble}
            sortName={this.props.sortName}
            sortOrder={this.props.sortOrder}
            checkedAllHandler={this.props.checkedAllHandler}
            isCheckAll={this.props.checkCurrentPageCheckedAll && this.props.checkCurrentPageCheckedAll()}
            onHeaderMouseDown={this.onHeaderMouseDown}
            onSort={this.onSort}>
        </GridHeader>

    }

    /**
     * 处理表体
     */
    renderBody() { 
       
        if (this.props.adjustWidth) {
            return null;
        }
        let checkedData = func.clone(this.props.checkedData);//todo 此处还要改
        return <GridBody
           
            headers={this.props.headers}
            data={this.props.data}
            priKey={this.props.priKey}
            checkedData={checkedData}
            pageIndex={this.props.pageIndex}
            pageSize={this.props.pageSize}
            selectAble={this.props.selectAble}
            singleSelect={this.props.singleSelect}
            rowNumber={this.props.rowNumber}
            detailAble={this.props.detailAble}
            editIndex={this.props.editIndex}
            detailIndex={this.props.detailIndex}
            detailView={this.props.detailView}
            focusIndex={this.props.focusIndex}
            rowAllowChecked={this.props.rowAllowChecked}
            getKey={this.props.getKey}
            onClick={this.props.onClick}
            onDoubleClick={this.props.onDoubleClick}
            onChecked={this.props.onChecked}
            tableCellEditHandler={this.props.tableCellEditHandler}
            onSort={this.props.onSort}
            onDetail={this.props.onDetail}
            onPaste={this.props.onPaste}
        >

        </GridBody>
    }


    /**
     * 表尾 todo
     */
    renderFooter() {
        return null;
    }
    /**
     * 真实的表格
     */
    renderTable() {
        let colgroup = this.renderColGruop();
        let headerControl = this.renderHeader();
        return <div className='wasabi-table-container' key="wasabi-table-container" id={this.state.containerid} style={{ height: this.props.height }}  >
            {/* 固定表头在有高度的情况下有效  */}
           
            {/* 真实的表格  */}
            <Table 
                className={this.props.borderAble ? ' ' : ' table-no-bordered '}
                id={this.state.realtableid} >
                {
                    /**colgroup */
                    colgroup
                }
  {headerControl}
                {/* 表体 */}
                {this.renderBody()}
                {/* 表尾 todo */}
                {/* <tfoot>{this.renderFooter()}</tfoot> */}
            </Table>

            {/* 拖动列时的分隔线  */}
            <div className="wasabi-grid-divide" id={this.state.divideid}></div>
        </div >
    }
    /**
     * 渲染全部网格组件
     */
    render() {
        let grid = [];
        let pageTotal = this.props.data.length < this.props.total ? this.props.data.length : this.props.total;
        grid.push(this.props.editAble ? <GridTool key="tool" upload={this.props.upload} importAble={this.props.importAble} addAble={this.props.addAble} editAble={this.props.editAble} onAdd={this.props.onAdd} onSave={this.props.onSave}></GridTool> : null)
        /* 头部分页 */
        grid.push(this.props.pagination && (this.props.pagePosition == 'top' || this.props.pagePosition == 'both') ? <Pagination key="p1" reload={this.props.reload} exportAble={this.props.exportAble} export={this.props.export} onChange={this.props.paginationHandler} pageIndex={this.props.pageIndex} pageSize={this.props.pageSize} pageTotal={pageTotal} total={this.props.total}></Pagination> : null)
        {/* 真实表格容器 */ }
        grid.push(this.renderTable())
        {/* 底部分页 */ }
        grid.push(this.props.pagination && (this.props.pagePosition == 'bottom' || this.props.pagePosition == 'both') ? <Pagination key="p2" reload={this.props.reload} exportAble={this.props.exportAble} export={this.props.export} onChange={this.props.paginationHandler} pageIndex={this.props.pageIndex} pageSize={this.props.pageSize} pageTotal={pageTotal} total={this.props.total}></Pagination> : null)
        /* 加载动画 */
        grid.push(this.props.loading ? <GridLoading key="loading"></GridLoading> : null)
        return <div onDragOver={this.props.editAble ? this.props.onDragOver : null} onDrop={this.props.editAble ? this.props.onDrop : null} className={'wasabi-grid' + (this.props.className || "")}
            style={this.props.style}>{grid}</div>
    }
}

export default Grid;