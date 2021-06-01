/**
 * 拆分datagrid,表体组件
 * 2021-05-28
 */

import React from "react";
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow } from "../../Table";
import CheckBox from "../../../Form/CheckBox"
class GridHeader extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.getHeaderProps = this.getHeaderProps.bind(this);
        this.getHeaderContent = this.getHeaderContent.bind(this);
        this.setOrderAndSelectAndDetailHeader = this.setOrderAndSelectAndDetailHeader.bind(this);
        this.onSort = this.onSort.bind(this);
        this.renderSingleHeader = this.renderSingleHeader.bind(this);
        this.renderComplexHeader = this.renderComplexHeader.bind(this);
    }
    /**
    * 得到头部相关属性
    */
    getHeaderProps(header) {
        //排序样式
     
        let props = {}; //设置单击事件
        props.iconCls= header.sortAble == true ? this.props.sortName == header.name ? "icon-sort-"+this.props.sortOrder : 'icon-sort' : '';
        props.className =  (header.export === false ? " wasabi-noexport" : "");
        props.onClick = header.sortAble == true ? this.props.sortName == header.name
            ? this.onSort.bind(this, header.name, this.props.sortOrder == 'asc' ? 'desc' : 'asc')
            : this.onSort.bind(this, header.name, 'asc')
            : null;
        props.content = this.getHeaderContent(header)
        return props;
    }
    /**
     * 获取头部内容
     * @param {*} header 
     */
    getHeaderContent(header) {
        //内容
        let content = header.headerContent;//自定义内容
        if (typeof content === 'function') {
            //函数
            try {
                content = content(header.name, header.label);
            } catch (e) {
                console.log('生成自定列出错,原因', e.message);
                content = '';
            }
        } else {
            //为空时
            content = header.label || "";
        }
        return content;

    }
    /**
    * 设置表头的详情，序号，选择列
    */
    setOrderAndSelectAndDetailHeader(rowSpan = 1) {
        let control = [];
        //处理选择列
        if (this.props.selectAble) {
            let thCheckProps = {
                //设置checkbox的属性
                value: this.props.isCheckAll == true ? 'yes' : null, //判断当前页是否选中
                data: [{ value: 'yes', text: '' }],
                onSelect: this.props.checkedAllHandler,
                name: 'all'
            };
            control.unshift(
                <TableCell rowSpan={rowSpan} key='headercheckbox' position="header" className='wasabi-check-column'>
                    {this.props.singleSelect ? null : (
                        <CheckBox {...thCheckProps}></CheckBox>
                    )}
                </TableCell>
            );
        }
        //处理序号列
        if (this.props.rowNumber) {
            control.unshift(
                <TableCell rowSpan={rowSpan} key='headerorder' position="header" className="wasabi-order-column" >
                    {"序号"}
                </TableCell>
            );
        }
        //处理详情列
        if (this.props.detailAble) {
            control.unshift(<TableCell rowSpan={rowSpan} key='headerdetail' position="header" className="wasabi-detail-column"></TableCell>)
        }
        return control;
    }
    /**
     * 排序事件
     * @param {*} name 
     * @param {*} sortOrder 
     */
    onSort(name, sortOrder) {
        this.props.onSort && this.props.onSort(name, sortOrder);
    }
    /**
     * 渲染简单表头，即一行
     * @returns 
     */
    renderSingleHeader() {
        //渲染表头
        let headerControl = [];
        let headers = this.props.headers;
        //处理表头
        headers.map((header, headerColumnIndex) => {
            //相关属性
            let props = this.getHeaderProps(header);
            headerControl.push(<TableCell
                key={'header-0-' + headerColumnIndex.toString()}
                position="header"
                rowSpan={header.rowSpan}
                colSpan={header.colSpan}
                className={props.className || ""}
                onClick={props.onClick || null} >
                {props.content}
                <i className={props.iconCls} ></i>
            </TableCell>);
        });
        if (headers && headers.length > 0) {
            //设置表头的详情，序号，选择列
            let control = this.setOrderAndSelectAndDetailHeader();//
            headerControl = [].concat(control, headerControl);
        }
        //返回数据
        return <TableHead><TableRow>{headerControl}</TableRow></TableHead>
    }
    /**
     * 渲染复杂表头，即有多行
     * @returns 
     */
    renderComplexHeader() {
        let headerControl = [];
        //处理表头
        this.props.headers.map((trheader, headerRowIndex) => {
            if (trheader instanceof Array) {
                let trcontrol = [];//当前行
                trheader.map((header, headerColumnIndex) => {
                    let props = this.getHeaderProps(header);
                    trcontrol.push(<TableCell
                        key={'header-0-' + headerColumnIndex.toString()}
                        position="header"
                        rowSpan={header.rowSpan}
                        colSpan={header.colSpan}
                        className={props.className || ""}
                        onClick={props.onClick || null} >
                              {props.content}
                            <i className={props.iconCls}></i>
                      
                    </TableCell>);
                })
                headerControl.push(trcontrol)
            }
        })

        if (this.props.headers && this.props.headers.length > 0) {
            //设置表头的详情，序号，选择列
            let control = this.setOrderAndSelectAndDetailHeader(this.props.headers.length);
            headerControl[0] = [].concat(control, headerControl[0]);
        }


        return <TableHead>
            {
                headerControl && headerControl.map((tritem, rowindex) => {
                    return <TableRow key={rowindex}>{tritem}</TableRow>
                })}
        </TableHead>

    }
    render() {     
        return this.props.single ? this.renderSingleHeader() : this.renderComplexHeader();
    }
}
GridHeader.propTypes = {
    single: PropTypes.bool,//表头类型，是否为简单的表头
    headers: PropTypes.array,//表头
    selectAble: PropTypes.bool,//是否   可以选择
    singleSelect: PropTypes.bool,//是否为单选
    isCheckAll: PropTypes.bool,//是否已经全部勾选，
    rowNumber: PropTypes.bool,//显示序号列
    detailAble: PropTypes.bool,//显示详情列
    sortName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),//排序字段
    sortOrder: PropTypes.oneOf(["asc", "desc"]),//排序方式
    checkedAllHandler: PropTypes.func,//勾选事件
    onSort: PropTypes.func,//排序事件
}
export default GridHeader;