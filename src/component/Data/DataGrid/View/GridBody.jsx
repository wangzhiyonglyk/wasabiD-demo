import React, { Component } from 'react';

import Input from '../../../Form/Input/index.jsx';
import CheckBox from "../../../Form/CheckBox";
import TableCell from '../../Table/TableCell.jsx';
import TableRow from '../../Table/TableRow.jsx';
import TableBody from '../../Table/TableBody.jsx';
import func from "../../../libs/func"
import config from '../config.js';
class GridBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.getKey = this.getKey.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.tableCellEditHandler = this.tableCellEditHandler.bind(this);
        this.onDetail = this.onDetail.bind(this);
        this.getCellContent = this.getCellContent.bind(this);
        this.setOrderAndSelectAndDetailRow = this.setOrderAndSelectAndDetailRow.bind(this);

    }

    /**
   * 获取当行的key
   * @param {*} rowIndex 
   */
    getKey(rowIndex) {
        return this.props.getKey(rowIndex);
    }
    /**
     * 单击事件
     * @param {*} rowData 行数据
     * @param {*} rowIndex 行下标
     * @param {*} columnIndex 列下标
     */
    onClick(rowData, rowIndex, columnIndex) {
        this.props.onClick && this.props.onClick(rowData, rowIndex, columnIndex)
    }
    /**
     * 双击事件
     * @param {*} rowData 行数据
     * @param {*} rowIndex 行下标
     * @param {*} columnIndex 列下标
     */
    onDoubleClick(rowData, rowIndex, columnIndex) {
        this.props.onDoubleClick && this.props.onDoubleClick(rowData, rowIndex, columnIndex)
    }
    /**
     * 行勾选
     * @param {*} rowIndex 
     * * @param {*} value 
     */
    onChecked(rowIndex, value) {

        this.props.onChecked && this.props.onChecked(rowIndex, value);
    }
    /**
    * 单元格编辑事件
    * @param {*} rowIndex 行的序号
    * @param {*} columnIndex 真正的列序号
    * @param {*} headerRowIndex 表头的行号
    * @param {*} headerColumnIndex 表头的列号
    * @param {func} callBack 自定义的回调函数
    * @param {*} value 值
    * @param {*} text 文本值
    * @param {*} name 对字段名
    */
    tableCellEditHandler(rowIndex, callBack, value, text, name) {
        if (name) {
            this.props.tableCellEditHandler && this.props.tableCellEditHandler(rowIndex, callBack, value, text, name);
        }

    }

    /**
     * 详情展开
     * @param {*} rowData 行数据
     * @param {*} rowIndex 行号
     */
    onDetail(rowData, rowIndex) {
        this.props.onDetail && this.props.onDetail(rowData, rowIndex);
    }

    /**
     * 获取某一行单元格内容
     * @param {*} header 
     * @param {*} rowData 
     * @param {*} rowIndex 
     * @returns 
     */
    getCellContent(header, rowData, rowIndex) {
        //内容
        let content = header.content;
        if (typeof content === 'function') {
            //函数
            try {
                content = content(rowData, rowIndex);
            } catch (e) {
                console.log('生成自定列出错,原因', e.message);
                content = '';
            }
        } else {
            //为空时
            content = rowData[header.name];
        }
        return content === undefined || content === null ? "" : content;
    }
    /**
     * 设置行中的详情，序号，选择列
     * @param {*} rowData 行数据
     * @param {*}  rowIndex 行号
     * @returns 
     */
    setOrderAndSelectAndDetailRow(rowData, rowIndex) {
        let stickyLeft = 1;//偏移量,表格左边有border
        let control = [];
        let key = this.getKey(rowIndex); //获取这一行的关键值

        //详情列
        if (this.props.detailAble) {
            let iconCls = 'icon-arrow-down'; //详情列的图标
            if (this.props.detailIndex == key) {
                iconCls = 'icon-arrow-up'; //详情列-展开
            }
            control.push(<TableCell key={'bodydetail-' + rowIndex.toString()}
                className={" wasabi-detail-column "} style={{ position: "sticky", zIndex: 1, left: this.props.borderAble ? stickyLeft : stickyLeft }}>
                {<i style={{ cursor: "pointer" }} title="详情"
                    className={iconCls} onClick={this.onDetail.bind(this, rowData, rowIndex)}></i>}
            </TableCell>);
            stickyLeft += config.detailWidth;

        }
        //序号列
        if (this.props.rowNumber) {
            control.push(
                <TableCell key={'bodyorder' + rowIndex.toString()} className={"wasabi-order-column "} style={{ position: "sticky", zIndex: 1, left: this.props.borderAble ? stickyLeft : stickyLeft }}>
                    {(
                        (this.props.pageIndex - 1) * this.props.pageSize +
                        rowIndex +
                        1
                    ).toString()}
                </TableCell>
            );
            stickyLeft += config.orderWidth;

        }
        //选择列
        if (this.props.selectAble) {
            //通过选择的数据信息判断
            let props = {
                value: this.props.checkedData.has(key) == true ? key : null,
                data: [{ value: key, text: '' }],
                onSelect: this.onChecked.bind(this, rowIndex),
                name: key
            };
            let rowAllowChecked = this.props.rowAllowChecked;//是否可以选择
            if (typeof rowAllowChecked === "function") {
                rowAllowChecked = rowAllowChecked(rowData, rowIndex);
            }
            else {
                rowAllowChecked = true;//默认有
            }

            //是单选还是多选
            control.push(
                <TableCell key={'bodycheckbox' + rowIndex.toString()} className={'wasabi-select-column'} style={{ position: "sticky", zIndex: 1, left: this.props.borderAble ? stickyLeft : stickyLeft }}>
                    {rowAllowChecked ? this.props.singleSelect ? <Radio {...props}></Radio> : <CheckBox  {...props}></CheckBox> : null}
                </TableCell>
            );

        }
        return control;
    }


    /**
     * 生成单元格
     * @param {*} header 列
     * @param {*} rowData 行
     * @param {*} rowIndex 行下标
     * @param {*} columnIndex 列下标
     * @param {*} stickyLeft 固定列偏移量
     * @returns 
     */
    setCellComponent(header, rowData, rowIndex, columnIndex, stickyLeft) {
        //处理数据单元格
        let editAble = this.props.editIndex != null && this.props.editIndex === (rowIndex + "-" + columnIndex) && header.editor;

        return <TableCell
        name={header.name||header.label}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            onClick={this.onClick.bind(this, rowData, rowIndex, columnIndex)}
            onDoubleClick={this.onDoubleClick.bind(this, rowData, rowIndex, columnIndex)}
            key={'cell-' + rowIndex.toString() + '-' + columnIndex.toString()}
            className={header.export === false ? "wasabi-noexport" : ""}//为了不导出
            style={{ textAlign: header.align, position: header.sticky ? "sticky" : null, zIndex: header.sticky ? 1 : null, left: header.sticky ? this.props.borderAble ? stickyLeft : stickyLeft : null }}
        >
            {
                editAble ?
                    <Input
                        {...header.editor.options}
                        type={header.editor.type}
                        name={header.name}
                        value={rowData[header.name]}
                        onChange={this.tableCellEditHandler.bind(this, rowIndex, header.editor && header.editor.options && header.editor.options.onChange || null)}
                        onSelect={this.tableCellEditHandler.bind(this, rowIndex, header.editor && header.editor.options && header.editor.options.onSelect || null)}
                        onPaste={this.inputonPaste.bind(this, rowIndex, columnIndex)}
                        label={''}
                    ></Input> : this.getCellContent(header, rowData, rowIndex)}
        </TableCell>

    }
    shouldComponentUpdate(nextProps, nextState) {
        if (func.diff(nextProps, this.props, false)) {

            return true;
        }
        return false;
    }
    /**
     * 文本框的粘贴事件
     * @param {*} event 
     */
    inputonPaste(rowIndex, columnIndex, event) {

        this.props.onPaste && this.props.onPaste(rowIndex, columnIndex, event);
    }
    render() {
        //渲染表体
        if (!(this.props.data instanceof Array) || !(this.props.headers instanceof Array)) {
            return;//格式不正确，直接返回
        }
        let trArr = [];//行数据

        let preRowIndex = -1;//上一行下标
        this.props.data.forEach((rowData, rowIndex) => {
            let stickyLeft = 1;//偏移量,表格左边有border
            if (this.props.detailAble) { stickyLeft += config.detailWidth; }
            if (this.props.rowNumber) { stickyLeft += config.orderWidth; }
            if (this.props.selectAble) { stickyLeft += config.selectWidth; }
            if (rowData.hide) {//隐藏该行,用于treegrid
                preRowIndex++;
            } else {
                let tds = []; //当前的列集合
                let key = this.getKey(rowIndex); //获取这一行的关键值
                //生成数据列
                let columnIndex = 0;//真正的序号列
                this.props.headers.forEach((trheader, headerRowIndex) => {
                    if (trheader instanceof Array) {
                        trheader.forEach((header, headerColumnIndex) => {
                            if ((header.colSpan && header.colSpan > 1)) {
                                //跨几列的不用渲染
                            }
                            //处理数据单元格
                            tds.push(
                                this.setCellComponent(header, rowData, rowIndex, columnIndex, stickyLeft)
                            );
                            //处理固定列的left值
                            if (preRowIndex != rowIndex) {
                                //第一次跳转到本行
                                let width = header.width ? header.width : this.props.headerWidth[header.name] || config.minWidth;
                                stickyLeft += header.sticky ? width : 0;
                                preRowIndex++;
                            }
                            columnIndex++;//列下标

                        });
                    }
                    else {
                        //处理数据单元格
                        tds.push(
                            this.setCellComponent(trheader, rowData, rowIndex, columnIndex, stickyLeft)
                        );
                        //处理固定列的left值
                        if (preRowIndex != rowIndex) {
                            //第一次跳转到本行
                            let width = trheader.width ? trheader.width : this.props.headerWidth[trheader.name] || config.minWidth;
                            stickyLeft += trheader.sticky ? width : 0;
                            preRowIndex++;
                        }
                        columnIndex++;//列下标
                    }
                });
                let trClassName = "";
                if (this.props.focusIndex === rowIndex) {
                    trClassName += " selected ";
                }
                if (this.props.editIndex === rowIndex) {
                    trClassName += " edited ";
                }
                trArr.push(
                    <TableRow key={'row' + rowIndex.toString()} className={trClassName}  >
                        {this.setOrderAndSelectAndDetailRow(rowData, rowIndex)}
                        {tds}
                    </TableRow>
                );
                //展示详情面板

                if (this.props.detailIndex == key) {

                    trArr.push(this.props.detailView);
                }
            }


        });
        return <TableBody>{trArr}</TableBody>;
    }
}

export default GridBody;