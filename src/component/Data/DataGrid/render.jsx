import React, { Component } from 'react';

import GridHeader from "./View/GridHeader";
import GridBody from "./View/GridBody"
import GridColGroup from "./View/GridColGroup"
import func from "../../libs/func"
export default {

    /**
     *渲染列的样式
     */
    renderColGruop() {
     
       return  <GridColGroup
        single={this.state.single}
        headers={this.state.headers}
        selectAble={this.props.selectAble}
        rowNumber={this.props.rowNumber}
        detailAble={this.props.detailAble}
        perColumnWidth={this.perColumnWidth}
        >

        </GridColGroup>
    },
    /**
     * 固定列的样式
     */
    renderFixedColGruop() {
        return  <GridColGroup
        single={this.state.single}
        headers={this.state.fixedHeaders}
        selectAble={this.props.selectAble}
        rowNumber={this.props.rowNumber}
        detailAble={this.props.detailAble}
        perColumnWidth={this.perColumnWidth}
        >

        </GridColGroup>
    },
    /**
    * 处理非固定表头
    */
    renderHeader() {
        return <GridHeader
            single={this.state.single}
            headers={this.state.headers}
            selectAble={this.props.selectAble}
            singleSelect={this.props.singleSelect}
            rowNumber={this.props.rowNumber}
            detailAble={this.props.detailAble}
            sortName={this.state.sortName}
            sortOrder={this.state.sortOrder}
            checkedAllHandler={this.checkedAllHandler}
            isCheckAll={this.checkCurrentPageCheckedAll()}
            onSort={this.onSort}>
        </GridHeader>

    },
    /**
     * 处理固定列的表头
     */
    renderFixedHeader() {
        return <GridHeader
            single={this.state.single}
            headers={this.state.fixedHeaders}
            selectAble={this.props.selectAble}
            singleSelect={this.props.singleSelect}
            rowNumber={this.props.rowNumber}
            detailAble={this.props.detailAble}
            sortName={this.state.sortName}
            sortOrder={this.state.sortOrder}
            checkedAllHandler={this.checkedAllHandler}
            isCheckAll={this.checkCurrentPageCheckedAll()}
            onSort={this.onSort}>
        </GridHeader>
    },

    /**
     * 处理表体
     */
    renderBody() {
let checkedData=func.clone( this.state.checkedData);
        return <GridBody
            single={this.state.single}
            headers={this.state.headers}
            data={this.state.data}
            priKey={this.props.priKey}
            checkedData={checkedData}
            pageIndex={this.state.pageIndex}
            pageSize={this.state.pageSize}
            selectAble={this.props.selectAble}
            singleSelect={this.props.singleSelect}
            rowNumber={this.props.rowNumber}
            detailAble={this.props.detailAble}
            editIndex={this.state.editIndex}
            detailIndex={this.state.detailIndex}
            detailView={this.state.detailView}
            focusIndex={this.state.focusIndex}
            rowAllowChecked={this.props.rowAllowChecked}
            onClick={this.onClick}
            onDoubleClick={this.onDoubleClick}
            onChecked={this.onChecked}
            tableCellEditHandler={this.tableCellEditHandler}
            onSort={this.onSort}
            detailHandler={this.detailHandler}
            >
               
        </GridBody>
    },
    /**
     * 处理固定列的表体
     */
    renderFixedBody() {
        //todo 暂时不支持详情行
        return <GridBody
            single={this.state.single}
            headers={this.state.fixedHeaders}
            data={this.state.data}
            priKey={this.props.priKey}
            checkedData={this.state.checkedData}
            pageIndex={this.state.pageIndex}
            pageSize={this.state.pageSize}
            selectAble={this.props.selectAble}
            singleSelect={this.props.singleSelect}
            rowNumber={this.props.rowNumber}
            editIndex={this.state.editIndex}
            rowAllowChecked={this.props.rowAllowChecked}
            onClick={this.onClick}
            onDoubleClick={this.onDoubleClick}
            onChecked={this.onChecked}
            tableCellEditHandler={this.tableCellEditHandler}
            onSort={this.onSort}>
        </GridBody>
    },

    /**
     * 渲染总记录数
     */
    renderTotal() {
        //渲染总记录数，当前记录的下标
        if (this.props.pagination && this.state.headers && this.state.headers.length > 0) {
            //设计了header
            let beginOrderNumber = 0;
            let endOrderNumber = 0; //数据开始序号与结束序号
            let total = this.state.total ? this.state.total : this.state.data ? this.state.data.length : 0; //总记录数
            let pageTotal = parseInt(this.state.total / this.state.pageSize); //共多少页
            pageTotal =
                this.state.total % this.state.pageSize > 0 ? pageTotal + 1 : pageTotal; //求余后得到最终总页数
            if (this.state.data instanceof Array && this.state.data.length > 0) {
                //计算开始序号与结束序号
                if (this.props.pagination) {
                    //有分页,计算当前页序号
                    beginOrderNumber =
                        this.state.pageSize * (this.state.pageIndex - 1) + 1;
                    endOrderNumber =
                        this.state.pageSize * (this.state.pageIndex - 1) +
                        this.state.data.length;
                } else {
                    //无分页
                    endOrderNumber = this.state.data.length;
                }
            }
            return (
                <div key='pagination-info' className=' pagination-info'>
                    显示&nbsp;{beginOrderNumber} &nbsp;至&nbsp; {endOrderNumber}&nbsp;项&nbsp;共&nbsp; {total} &nbsp;项记录
                    <div
                        style={{ display: this.props.pagination ? 'inline-block' : 'none' }}
                    >每页&nbsp;
                        <select
                            className='pagination-select'
                            value={this.state.pageSize}
                            onChange={this.pageSizeHandler}
                        >
                            <option key="1" value={10}>10</option>
                            <option key="2" value={20}>20</option>
                            <option key="3" value={30}>30</option>
                            <option key="4" value={50}>50</option>
                            <option key="5" value={100}>100</option>
                            <option key="6" value={200}>200</option>
                            <option key="7" value={500}>500</option>
                            <option key="8" value={1000}>1000</option>
                        </select>&nbsp;条&nbsp;&nbsp;
                        {<i title="刷新" style={{ fontSize: 16, cursor: "pointer" }} className="icon-refresh" onClick={this.reload.bind(this, this.state.params, this.state.url)}></i>}
                        &nbsp;&nbsp;
                        {
                            this.props.exportAble ? <div style={{ display: "inline-block", height: 20, position: "relative", width: 30 }}> <i title="导出" style={{ cursor: "pointer", fontSize: 20, position: "absolute", top: 5 }} className="icon-excel" onClick={this.export.bind(this, false, "grid-")}></i></div> : null
                        }

                        {
                            this.props.uploadUrl ? <div style={{ display: "inline-block", height: 20, position: "relative", width: 30 }}> <i title="导入" style={{ cursor: "pointer", fontSize: 20, position: "absolute", top: 5 }} className="icon-upload" onClick={this.upload.bind(this)}></i></div> : null
                        }

                    </div>
                </div>
            );
        } else {
            return null;
        }
    },
    /**
     * 分页
     */
    renderPagination() {
        //显示分页控件
        let paginationComponent = null;
        if (this.props.pagination) {
            let pageAll = parseInt(this.state.total / this.state.pageSize); //共多少页
            if (this.state.total % this.state.pageSize > 0) {
                pageAll++; //求余后得到最终总页数
            }
            if (pageAll == 0) {
                //数据为空，直接返回
                return null;
            }

            if (pageAll > 7) {
                //大于7页，
                let pageComponent = []; //分页组件
                let firstIndex = 0; //第一个显示哪一页
                let lastIndex = 0; //最后一个显示哪一页
                let predisabledli = (
                    <li key='predis' className='paginate_button disabled'>
                        <a>...</a>
                    </li>
                ); //多余的分页标记
                let lastdisabledli = (
                    <li key='lastdis' className='paginate_button disabled'>
                        <a>...</a>
                    </li>
                ); //多余的分页标记
                if (this.state.pageIndex >= 4 && this.state.pageIndex <= pageAll - 3) {
                    //当前页号处于中间位置
                    firstIndex = this.state.pageIndex - 2;
                    lastIndex = this.state.pageIndex + 2;
                } else {
                    //非中间位置
                    if (this.state.pageIndex < 4) {
                        //靠前的位置
                        firstIndex = 2;
                        lastIndex = 6;
                        predisabledli = null; //设置为空
                    } else {
                        //靠后的位置
                        if (this.state.pageIndex > pageAll - 3) {
                            firstIndex = pageAll - 5;
                            lastIndex = pageAll - 1;
                            lastdisabledli = null; //设置为空
                        }
                    }
                }
                for (let i = firstIndex; i <= lastIndex; i++) {
                    pageComponent.push(
                        <li
                            key={'li' + i}
                            className={
                                'paginate_button ' +
                                (this.state.pageIndex * 1 == i ? 'active' : '')
                            }
                        >
                            <a onClick={this.paginationHandler.bind(this, i)}>{i}</a>
                        </li>
                    );
                }
                pageComponent.unshift(predisabledli);
                pageComponent.push(lastdisabledli);

                paginationComponent = (
                    <div key="pagination-number" className='pagination-number'>
                        <ul className='pagination'>
                            <li key={'lipre'} className='paginate_button '>
                                <a onClick={this.prePaginationHandler}>上一页</a>
                            </li>
                            <li
                                key={'lifirst'}
                                className={
                                    'paginate_button  ' +
                                    (this.state.pageIndex * 1 == 1 ? 'active' : '')
                                }
                            >
                                <a onClick={this.paginationHandler.bind(this, 1)}>{1}</a>
                            </li>
                            {pageComponent}

                            <li
                                key='lilast'
                                className={
                                    'paginate_button previous ' +
                                    (this.state.pageIndex * 1 == pageAll ? 'active' : '')
                                }
                            >
                                <a onClick={this.paginationHandler.bind(this, pageAll)}>
                                    {pageAll}
                                </a>
                            </li>
                            <li key='linext' className='paginate_button next'>
                                <a onClick={this.nextPaginationHandler}>下一页</a>
                            </li>
                        </ul>
                    </div>
                );
            } else {
                //小于7页直接显示

                let pagearr = [];

                for (let i = 0; i < pageAll; i++) {
                    let control = (
                        <li
                            key={'li' + i}
                            className={
                                'paginate_button ' +
                                (this.state.pageIndex * 1 == i * 1 + 1 ? 'active' : '')
                            }
                        >
                            <a onClick={this.paginationHandler.bind(this, i + 1)}>{i + 1}</a>
                        </li>
                    );
                    pagearr.push(control);
                }
                paginationComponent = (
                    <div key="pagination-number" className='pagination-number'>
                        <ul className='pagination'>
                            <li key={'lipre'} className='paginate_button previous'>
                                <a onClick={this.prePaginationHandler}>上一页</a>
                            </li>
                            {pagearr}
                            <li key='linext' className='paginate_button next'>
                                <a onClick={this.nextPaginationHandler}>下一页</a>
                            </li>
                        </ul>
                    </div>
                );
            }
        }
        return paginationComponent;
    },
    /**
     * 表尾
     */
    renderFooter() {
        //渲染页脚
        let tds = [];
        this.footerActualData = []; //,页脚的实际统计数据，用于返回
        if (this.state.footer instanceof Array && this.state.footer.length > 0) {
            //分页的情况下
            if (this.props.selectAble) {
                tds.push(<td key='footerselect' className='check-column'></td>);
            }
            this.state.headers.map((header, headerindex) => {
                if (!header || header.hide) {
                    return;
                }


                let footerchild = this.state.footer.filter(function (d) {
                    return d.name == header.name;
                });
                if (footerchild && footerchild.length > 0) {
                    if (
                        footerchild[0].value != null &&
                        footerchild[0].value != undefined
                    ) {
                        //如果有值
                        let obj = {};
                        obj[header.name] = footerchild[0].value;
                        this.footerActualData.push(obj);
                        tds.push(
                            <td key={headerindex + header.name}>{footerchild[0].value}</td>
                        );
                    } else {
                        //表明从本页数据统计
                        switch (footerchild[0].type) {
                            case 'sum':
                                let obj = {};
                                obj[header.name] = this.sumHandler(footerchild[0]);
                                this.footerActualData.push(obj);
                                if (obj[header.name] != null) {
                                    tds.push(
                                        <td key={header.name}>{'总计：' + obj[header.name]}</td>
                                    );
                                } else {
                                    tds.push(<td key={header.name}></td>);
                                }
                                break;
                            case 'avg':
                                let obj1 = {};
                                obj1[header.name] = this.avgHandler(footerchild[0]);
                                this.footerActualData.push(obj1);
                                if (obj[header.name] != null) {
                                    tds.push(
                                        <td key={headerindex + header.name}>
                                            {'平均值：' + obj1[header.name]}
                                        </td>
                                    );
                                } else {
                                    tds.push(<td key={headerindex + header.name}></td>);
                                }
                                break;
                            default:
                                tds.push(<td key={headerindex + header.name}></td>);
                        }
                    }
                } else {
                    tds.push(<td key={header.name + headerindex}></td>);
                }
            });

            return (
                <tr key='footertr' style={{ height: 36 }}>
                    {tds}
                </tr>
            );
        }
    },
    /**
     * 真实的表格
     */
    renderTable(height) {
        let colgroup = this.renderColGruop();
        let headerControl = this.renderHeader();
        return <div className='table-container' key="table-container"   >
            {
                //有高度的时候，才会出现固定表头
                height ? <div className="table-fixedth" id={this.state.fixedthcontainerid}>
                    <table style={{ width: this.tableWidth ? this.tableWidth : "100%" }}
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
            {height && this.state.fixedHeaders && this.state.fixedHeaders.length > 0 ?
                <div key="table-fixed-fixedth" className="table-fixed-fixedth" >
                    <table style={{ width: this.fixedTableWidth ? this.fixedTableWidth : "100%" }} className={this.props.borderAble ? ' table ' : ' table table-no-bordered '}>
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
            {this.state.fixedHeaders && this.state.fixedHeaders.length > 0 ?
                <div key="table-fixed" className="table-fixed"
                    id={this.state.fixedTableContainerid} >
                    <table style={{ width: this.fixedTableWidth ? this.fixedTableWidth : "100%" }}
                        className={this.props.borderAble ? ' wasabi-table ' : ' wasabi-table table-no-bordered '}
                        id={this.state.fixedTableid}
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
                id={this.state.realTableContainerid}
                onScroll={this.onRealTableScoll.bind(this)}
                style={{ height: height }}
            >
                <table style={{ width: this.tableWidth ? this.tableWidth : "100%" }}
                    className={this.props.borderAble ? ' wasabi-table ' : ' wasabi-table table-no-bordered '}
                    id={this.state.realTableid} >
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
    },
    /**
     * 渲染全部网格组件
     */
    renderGrid(height) {
        let grid = [];

        /* 头部分页 */
        grid.push(
            <div className='wasabi-pagination ' key="toppagination" style={{ display: this.props.pagePosition == 'top' || this.props.pagePosition == 'both' ? 'block' : 'none' }}>
                {this.renderTotal()}{this.renderPagination()}
            </div>)

        {/* 真实表格容器 */ }
        grid.push(this.renderTable(height))

        {/* 底部分页 */ }
        grid.push(<div key="bottompagination" className='wasabi-pagination ' style={{ display: this.props.pagePosition == 'bottom' || this.props.pagePosition == 'both' ? 'block' : 'none' }}>
            {this.renderTotal()}
            {this.renderPagination()}
        </div>)

        /* 加载动画 */
        grid.push(<div
            className='wasabi-grid-loading'
            key="wasabi-grid-loading-div"
            style={{ display: this.state.loading == true ? 'block' : 'none' }}
        ></div>)
        grid.push(<div
            key="wasabi-grid-loading-icon"
            className='wasabi-load-icon'
            style={{ display: this.state.loading == true ? 'block' : 'none' }}
        ></div>)
        return grid;
    }
}