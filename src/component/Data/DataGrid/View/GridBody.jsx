import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../Form/Input/index.jsx';
import CheckBox from "../../../Form/CheckBox";
import TableCell from '../../Table/TableCell.jsx';
import TableRow from '../../Table/TableRow.jsx';
import Msg from "../../../Info/Msg"
import func from "../../../libs/func"
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
        this.detailHandler = this.detailHandler.bind(this);
        this.getRowCellContent = this.getRowCellContent.bind(this);
        this.setOrderAndSelectAndDetailRow = this.setOrderAndSelectAndDetailRow.bind(this);
        this.renderSingleBody = this.renderSingleBody.bind(this);
        this.renderComplexBody = this.renderComplexBody.bind(this);

    }

    /**
   * 获取当行的key
   * @param {*} rowIndex 
   * @param {*} pageIndex 
   */
    getKey(rowIndex, pageIndex) {
        let key = "";
        if (!pageIndex) {
            pageIndex = this.props.pageIndex;
        }
        if (rowIndex == null && rowIndex == undefined) {
            console.error(new Error("index 值传错"));
            Msg.error("index 值传错");
        }
        else {
            if (this.props.priKey) {
                key = this.props.data[rowIndex][this.props.priKey];
            }
            else {
                key = pageIndex.toString() + "-" + rowIndex.toString();//默认用序号作为关键字
            }
        }
        return key+"";
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
    tableCellEditHandler(rowIndex, columnIndex, headerRowIndex, headerColumnIndex, callBack, value, text, name) {
        this.props.tableCellEditHandler && this.props.tableCellEditHandler(rowIndex, columnIndex, headerRowIndex, headerColumnIndex, callBack, value, text, name);
    }

    /**
     * 详情展开
     * @param {*} rowData 行数据
     * @param {*} rowIndex 行号
     */
    detailHandler(rowData, rowIndex) {
        this.props.detailHandler && this.props.detailHandler(rowData, rowIndex);
    }

    /**
     * 获取某一行单元格内容
     * @param {*} header 
     * @param {*} rowData 
     * @param {*} rowIndex 
     * @returns 
     */
    getRowCellContent(header, rowData, rowIndex) {
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
        return content;
    }
    /**
     * 设置行中的详情，序号，选择列
     * @param {*} rowData 行数据
     * @param {*}  rowIndex 行号
     * @returns 
     */
    setOrderAndSelectAndDetailRow(rowData, rowIndex) {
        let control = [];
        let key = this.getKey(rowIndex); //获取这一行的关键值

        //详情列
        if (this.props.detailAble) {
            let iconCls = 'icon-arrow-down'; //详情列的图标
            if (this.props.detailIndex == key) {
                iconCls = 'icon-arrow-up'; //详情列-展开
            }
            control.push(<TableCell key={'bodydetail-' + rowIndex.toString()}
                className={" wasabi-detail-column "}>
                {<i style={{ cursor: "pointer" }} title="详情"
                    className={iconCls} onClick={this.detailHandler.bind(this, rowData, rowIndex)}></i>}
            </TableCell>);

        }
        //序号列
        if (this.props.rowNumber) {
            control.push(
                <TableCell key={'bodyorder' + rowIndex.toString()} className={"wasabi-order-column "}>
                    {(
                        (this.props.pageIndex - 1) * this.props.pageSize +
                        rowIndex +
                        1
                    ).toString()}
                </TableCell>
            );

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
            if(key=='90'){
                console.log("value", props)
            }
          
            let rowAllowChecked = this.props.rowAllowChecked;//是否可以选择
            if (typeof rowAllowChecked === "function") {
                rowAllowChecked = rowAllowChecked(rowData, rowIndex);
            }
            else {
                rowAllowChecked = true;//默认有
            }

            //是单选还是多选
            control.push(
                <TableCell key={'bodycheckbox' + rowIndex.toString()} className={'wasabi-check-column'}>
                    {rowAllowChecked ? this.props.singleSelect ? <Radio {...props}></Radio> : <CheckBox  {...props}></CheckBox> : null}
                </TableCell>
            );

        }
        return control;
    }
    /**
    * 渲染简单的表体
    */
    renderSingleBody() {
        //渲染表体
        let trArr = [];
        if (
            !(this.props.data instanceof Array) ||
            !(this.props.headers instanceof Array)
        ) {
            return;
        }
        this.props.data.map((rowData, rowIndex) => {
            let tds = []; //当前的列集合
            let key = this.getKey(rowIndex); //获取这一行的关键值
            //生成数据列
            let columnIndex = 0;//真正的列序号
            let headers = this.props.headers;
            headers.map((header, headerColumnIndex) => {
                //处理数据单元格
                tds.push(
                    <TableCell
                        onClick={this.onClick.bind(this, rowData, rowIndex, columnIndex)}
                        onDoubleClick={this.onDoubleClick.bind(this, rowData, rowIndex, columnIndex)}
                        key={'col-' + rowIndex.toString() + "-" + headerColumnIndex + '-' + columnIndex.toString()}
                        className={header.export === false ? "wasabi-noexport" : ""}//为了不导出
                        style={{ textAlign: header.align }}
                    >
                        {
                            this.props.editIndex != null &&
                                this.props.editIndex == rowIndex &&
                                header.editor ?
                                <Input
                                    {...header.editor.options}
                                    type={header.editor.type}
                                    name={header.name}
                                    value={rowData[header.name]}
                                    onChange={this.tableCellEditHandler.bind(this, rowIndex, columnIndex, 0, headerColumnIndex, headerColumnIndex, header.editor && header.editor.options && header.editor.options.onChange || null)}
                                    onSelect={this.tableCellEditHandler.bind(this, rowIndex, columnIndex, 0, headerColumnIndex, headerColumnIndex, header.editor && header.editor.options && header.editor.options.onSelect || null)}
                                    label={''}
                                ></Input> : this.getRowCellContent(header, rowData, rowIndex)}
                    </TableCell>
                );
                columnIndex++;
            });
            trArr.push(
                <TableRow key={'row' + rowIndex.toString()} className={this.props.focusIndex === rowIndex ? "selected" : ""} >
                    {this.setOrderAndSelectAndDetailRow(rowData, rowIndex)}
                    {tds}
                </TableRow>
            );
            //展示详情面板

            if (this.props.detailIndex == key) {
                trArr.push(this.props.detailView);
            }
        });
        return trArr;
    }
    /**
     *渲染复杂的表体
     * @returns 
     */
    renderComplexBody() {
        //渲染表体
        if (!(this.props.data instanceof Array) || !(this.props.headers instanceof Array)) {
            return;//格式不正确，直接返回
        }
        let trArr = [];//行数据
        this.props.data.map((rowData, rowIndex) => {
            if (rowData.hide) {//隐藏该行
                return;
            }
            let tds = []; //当前的列集合
            let key = this.getKey(rowIndex); //获取这一行的关键值
            //生成数据列
            let columnIndex = 0;//真正的序号列
            this.props.headers.map((trheader, headerRowIndex) => {
                if (trheader instanceof Array) {
                    trheader.map((header, headerColumnIndex) => {
                        if ((header.colSpan && header.colSpan > 1)) {
                            //跨几列的不用渲染
                            return;
                        }
                        //处理数据单元格
                        tds.push(
                            <TableCell
                                onClick={this.onClick.bind(this, rowData, rowIndex, columnIndex)}
                                onDoubleClick={this.onDoubleClick.bind(this, rowData, rowIndex, columnIndex)}
                                key={'col-' + rowIndex.toString() + "-" + headerColumnIndex + '-' + columnIndex.toString()}
                                className={header.export === false ? "wasabi-noexport" : ""}//为了不导出
                                style={{ textAlign: header.align }}
                            >
                                {
                                    this.props.editIndex != null &&
                                        this.props.editIndex == rowIndex &&
                                        header.editor ?
                                        <Input
                                            {...header.editor.options}
                                            type={header.editor.type}
                                            name={header.name}
                                            value={rowData[header.name]}
                                            onChange={this.tableCellEditHandler.bind(this, rowIndex, columnIndex, null, headerColumnIndex, headerColumnIndex, header.editor && header.editor.options && header.editor.options.onChange || null)}
                                            onSelect={this.tableCellEditHandler.bind(this, rowIndex, columnIndex, null, headerColumnIndex, headerColumnIndex, header.editor && header.editor.options && header.editor.options.onSelect || null)}
                                            label={''}
                                        ></Input> : this.getRowCellContent(header, rowData, rowIndex)}
                            </TableCell>
                        );
                        columnIndex++;

                    });
                }
            });
            trArr.push(
                <TableRow key={'row' + rowIndex.toString()} className={this.props.focusIndex === rowIndex ? "selected" : ""}  >
                    {this.setOrderAndSelectAndDetailRow(rowData, rowIndex)}
                    {tds}
                </TableRow>
            );
            //展示详情面板

            if (this.props.detailIndex == key) {

                trArr.push(this.props.detailView);
            }

        });
        return trArr;
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (func.diffOrder(nextProps, this.props)) {
            return true;
        }

        return false;
    }
    render() {
        return this.props.single ? this.renderSingleBody() : this.renderComplexBody();
    }
}

GridBody.propTypes = {
    single: PropTypes.bool,//表头类型，是否为简单的表头
    headers: PropTypes.array,//表头
    data: PropTypes.array,//数据
    priKey:PropTypes.string,//主键
    checkedData: PropTypes.any,//勾选的数据
    pageIndex: PropTypes.number,//页号，
    pageSize: PropTypes.number,//分页大小
    selectAble: PropTypes.bool,//是否   可以选择
    singleSelect: PropTypes.bool,//是否为单选
    rowNumber: PropTypes.bool,//显示序号列
    detailAble: PropTypes.bool,//显示详情列
    focusIndex: PropTypes.number,//焦点行下标
    editIndex: PropTypes.number,//编辑的行号
    detailIndex: PropTypes.string,//详情key
    detailView: PropTypes.any,//详情视图
    rowAllowChecked: PropTypes.func,//某一行是否允许勾选
    onClick: PropTypes.func,//单元格单击
    onDoubleClick: PropTypes.func,//单元格双击
    onChecked: PropTypes.func,//勾选
    tableCellEditHandler: PropTypes.func,//单元格编辑后
    detailHandler: PropTypes.func,//详情图标单击事件

}

export default GridBody;