import React, { Component } from 'react';

import GridHeader from "./GridHeader";
import GridBody from "./GridBody"
import GridColGroup from "./GridColGroup"
import Pagination from '../../Pagination';
import GridLoading from './GridLoading'
import GridTool from "./GridTool"
import func from "../../../libs/func"
class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    /**
     *渲染列的样式
     */
    renderColGruop() {
        return <GridColGroup
            single={this.props.single}
            headers={this.props.headers}
            selectAble={this.props.selectAble}
            rowNumber={this.props.rowNumber}
            detailAble={this.props.detailAble}
            perColumnWidth={this.props.perColumnWidth}
        >

        </GridColGroup>
    }
    /**
     * 固定列的样式
     */
    renderFixedColGruop() {
        return <GridColGroup
            single={this.props.single}
            headers={this.props.fixedHeaders}
            selectAble={this.props.selectAble}
            rowNumber={this.props.rowNumber}
            detailAble={this.props.detailAble}
            perColumnWidth={this.props.perColumnWidth}
        >

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
            onSort={this.onSort}>
        </GridHeader>

    }
    /**
     * 处理固定列的表头
     */
    renderFixedHeader() {
        return <GridHeader
            single={this.props.single}
            headers={this.props.fixedHeaders}
            selectAble={this.props.selectAble}
            singleSelect={this.props.singleSelect}
            rowNumber={this.props.rowNumber}
            detailAble={this.props.detailAble}
            sortName={this.props.sortName}
            sortOrder={this.props.sortOrder}
            checkedAllHandler={this.props.checkedAllHandler}
            isCheckAll={this.props.checkCurrentPageCheckedAll && this.props.checkCurrentPageCheckedAll()}
            onSort={this.props.onSort}>
        </GridHeader>
    }

    /**
     * 处理表体
     */
    renderBody() {
        let checkedData = func.clone(this.props.checkedData);
        return <GridBody
            single={this.props.single}
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
     * 处理固定列的表体
     */
    renderFixedBody() {
        let checkedData = func.clone(this.props.checkedData);
        return <GridBody
            single={this.props.single}
            headers={this.props.fixedHeaders}
            data={this.props.data}
            priKey={this.props.priKey}
            checkedData={checkedData}
            pageIndex={this.props.pageIndex}
            pageSize={this.props.pageSize}
            selectAble={this.props.selectAble}
            singleSelect={this.props.singleSelect}
            rowNumber={this.props.rowNumber}
            editIndex={this.props.editIndex}
            rowAllowChecked={this.props.rowAllowChecked}
            getKey={this.props.getKey}
            onClick={this.props.onClick}
            onDoubleClick={this.props.onDoubleClick}
            onChecked={this.props.onChecked}
            tableCellEditHandler={this.props.tableCellEditHandler}
            onSort={this.props.onSort}
        
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
    renderTable(height) {
        let colgroup = this.renderColGruop();
        let headerControl = this.renderHeader();
        return <div className='wasabi-table-container' key="wasabi-table-container"   >
            {
                //有高度的时候，才会出现固定表头
                height ? <div className="table-fixedth" id={this.props.fixedthcontainerid}>
                    <table style={{ width: this.props.tableWidth ? this.props.tableWidth : "100%" }}
                        className={this.props.borderAble ? ' wasabi-table ' : ' wasabi-table table-no-bordered '}>
                        {
                            /**colgroup */
                            colgroup
                        }
                        {/* 表头 */}
                        {headerControl}
                    </table>
                </div> : null

            }
            {/* /** 有固定列，并有高度，要将固定列的表头也固定下来*/}
            {height && this.props.fixedHeaders && this.props.fixedHeaders.length > 0 ?
                <div key="table-fixed-fixedth" className="table-fixed-fixedth" >
                    <table style={{ width: this.props.fixedTableWidth ? this.props.fixedTableWidth : "100%" }} className={this.props.borderAble ? ' table ' : ' table table-no-bordered '}>
                        {
                            /**colgroup */
                            this.renderFixedColGruop()
                        }
                        {/* 表头 */}
                        {this.renderFixedHeader()}
                    </table>
                </div>
                : null}
            {/* 有固定列表 */}
            {this.props.fixedHeaders && this.props.fixedHeaders.length > 0 ?
                <div key="table-fixed" className="table-fixed"
                    id={this.props.fixedTableContainerid} >
                    <table style={{ width: this.props.fixedTableWidth ? this.props.fixedTableWidth : "100%" }}
                        className={this.props.borderAble ? ' wasabi-table ' : ' wasabi-table table-no-bordered '}
                        id={this.props.fixedTableid}
                    >
                        {
                            /**colgroup */
                            this.renderFixedColGruop()
                        }
                        {/* 表头 */}
                        {this.renderFixedHeader()}
                        {/* 表体 */}
                        <tbody>{this.renderFixedBody()}</tbody>
                        {/* 表尾  todo */}
                        {/* <tfoot>{this.renderFooter()}</tfoot> */}
                    </table>

                </div> : null
            }
            {/* 真实的表格  */}
            <div key="table-realTable"
                className={'table-realTable '}
                id={this.props.realTableContainerid}
                onScroll={this.props.onRealTableScoll}
                style={{ height: this.props.height }}
            >
                <table style={{ width: this.props.tableWidth ? this.props.tableWidth : "100%" }}
                    className={this.props.borderAble ? ' wasabi-table ' : ' wasabi-table table-no-bordered '}
                    id={this.props.realTableid} >
                    {
                        /**colgroup */
                        colgroup
                    }
                    {/* 表头 */}
                    {headerControl}
                    {/* 表体 */}
                    <tbody>{this.renderBody()}</tbody>
                    {/* 表尾 */}
                    {/* <tfoot>{this.renderFooter()}</tfoot> */}
                </table>
            </div>


        </div >
    }
    /**
     * 渲染全部网格组件
     */
    render() {
        let grid = [];
        let pageTotal = this.props.data.length < this.props.total ? this.props.data.length : this.props.total;
        grid.push(this.props.editAble?<GridTool key="tool"  upload={this.props.upload} importAble={this.props.importAble} addAble={this.props.addAble} editAble={this.props.editAble} onAdd={this.props.onAdd} onSave={this.props.onSave}></GridTool>:null)
        /* 头部分页 */
        grid.push(this.props.pagination&&( this.props.pagePosition == 'top' || this.props.pagePosition == 'both')? <Pagination key="p1"  reload={this.props.reload} exportAble={this.props.exportAble} export={this.props.export} onChange={this.props.paginationHandler} pageIndex={this.props.pageIndex} pageSize={this.props.pageSize} pageTotal={pageTotal} total={this.props.total}></Pagination> : null)
        {/* 真实表格容器 */ }
        grid.push(this.renderTable(this.props.height))
        {/* 底部分页 */ }
        grid.push(this.props.pagination&&( this.props.pagePosition == 'bottom' || this.props.pagePosition == 'both') ? <Pagination key="p2"   reload={this.props.reload} exportAble={this.props.exportAble} export={this.props.export} onChange={this.props.paginationHandler} pageIndex={this.props.pageIndex} pageSize={this.props.pageSize} pageTotal={pageTotal} total={this.props.total}></Pagination> : null)
        /* 加载动画 */
        grid.push(this.props.loading ? <GridLoading key="loading"></GridLoading> : null)
        return <div  onDragOver={this.props.editAble?this.props.onDragOver:null} onDrop={ this.props.editAble? this.props.onDrop:null} className={'wasabi-grid' + (this.props.className || "") + (this.state.fixedHeaders && this.state.fixedHeaders.length > 0 ? " fixedHeader" : "")}
            style={this.props.style}>{grid}</div>
    }
}

export default Grid;