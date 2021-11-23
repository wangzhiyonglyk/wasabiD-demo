/**
 * 拆分datagrid,表头组件
 * 2021-05-28
 */
/**
 * :[[
    {name:'itemid',label:'Item ID',rowSpan:2,width:80,sortAble:true},
    {name:'productid',label:'Product ID',rowSpan:2,width:80,sortAble:true},
    {label:'Item Details',colSpan:4}
],[
    {name:'listprice',label:'List Price',width:80,align:'right',sortAble:true},
    {name:'unitcost',label:'Unit Cost',width:80,align:'right',sortAble:true},
    {name:'attr1',label:'Attribute',width:100},
    {name:'status',label:'Status',width:60}
]]
 */
import React from "react";

import { TableCell, TableHead, TableRow } from "../../Table";
import CheckBox from "../../../Form/CheckBox"
class GridHeader extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.headerColumnIndex = null;
        this.getHeaderProps = this.getHeaderProps.bind(this);
        this.getHeaderContent = this.getHeaderContent.bind(this);
        this.setOrderAndSelectAndDetailHeader = this.setOrderAndSelectAndDetailHeader.bind(this);
        this.onSort = this.onSort.bind(this);
      
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }
    /**
     * 表头的鼠标监听事件
     * @param {*} event 
     */
    onMouseMove(event) {
        console.log("test");
        try {
            let offsetX = event && event.nativeEvent && event.nativeEvent.offsetX;
            let width = event.target.getBoundingClientRect().width;
            if (width - offsetX <= 2 || offsetX <= 2) {
                event.target.style.cursor = "ew-resize";
            }
            else {
                event.target.style.cursor = "pointer";

            }
        }
        catch (e) {

        }

    }
    onMouseDown(headerColumnIndex, event) {
        if (event.target.style.cursor === "ew-resize") {
            let offsetX = event && event.nativeEvent && event.nativeEvent.offsetX;
            this.props.onHeaderMouseDown && this.props.onHeaderMouseDown(offsetX <= 2 ? headerColumnIndex - 1 : headerColumnIndex, event);
        }
    }
    /**
    * 得到头部相关属性
    */
    getHeaderProps(header) {
        //排序样式

        let props = {}; //设置单击事件
        props.iconCls = header.sortAble == true ? this.props.sortName == header.name ? "icon-sort-" + this.props.sortOrder : 'icon-sort' : '';
        props.className = (header.export === false ? " wasabi-noexport" : "");
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
                <TableCell rowSpan={rowSpan} key='headercheckbox' position="header" className='wasabi-select-column'>
                    {this.props.singleSelect ? null : (
                        <CheckBox {...thCheckProps}></CheckBox>
                    )}
                </TableCell>
            );
        }
        //处理序号列
        if (this.props.rowNumber) {
            control.unshift(
                <TableCell rowSpan={rowSpan} key='headerorder'  position="header" className="wasabi-order-column" >
                    { }
                </TableCell>
            );
        }
        //处理详情列
        if (this.props.detailAble) {
            control.unshift(<TableCell rowSpan={rowSpan} key='headerdetail'  position="header" className="wasabi-detail-column"></TableCell>)
        }
        return control;
    }
    /**
     * 设置引导列
     * @param {*} rowSpan 
     */
    setGutterHeader(rowSpan = 1) {
        return <TableCell rowSpan={rowSpan} key='headergutter'  position="header" className="wasabi-gutter-column" style={{ display: "none", width: 0 }} ></TableCell>
    }
      /**
     * 设置表头单元格
     * @param {*} header 
     * @param {*} headerRowIndex 
     * @param {*} headerColumnIndex 
     * @param {*} props 
     * @returns 
     */
       setHeaderCell(header, headerRowIndex, headerColumnIndex, props) {

        return <TableCell
            key={"header-" + headerRowIndex + "-" + headerColumnIndex.toString()}
            position="header"
            align={header.align}
            rowSpan={header.rowSpan}
            colSpan={header.colSpan}
            className={props.className || ""}
            onClick={props.onClick || null}
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown.bind(this, headerColumnIndex)}
       
            >
            {props.content}
            <i className={props.iconCls}></i>

        </TableCell>;
    }
    /**
     * 排序事件
     * @param {*} name 
     * @param {*} sortOrder 
     */
    onSort(name, sortOrder) {
        this.props.onSort && this.props.onSort(name, sortOrder);
    }


  
    render() {
        let headerControl = [];
        let maxRowSpan=1;
        let trcontrol=[];
        //处理表头
        this.props.headers.map((trheader, headerRowIndex) => {
          
            if (trheader instanceof Array) {
                let trcontrol = [];//当前行
                maxRowSpan=this.props.headers.length;//多行时
                trheader.map((header, headerColumnIndex) => {
                    let props = this.getHeaderProps(header);
                    trcontrol.push(this.setHeaderCell(header, headerRowIndex, headerColumnIndex, props));
                })
                headerControl.push(trcontrol)
            }
            else {
                let props = this.getHeaderProps(trheader);
                trcontrol.push(this.setHeaderCell(trheader, 0, headerRowIndex, props));
            }
        })
        if(headerControl.length===0){//单行
            headerControl.push(trcontrol);
        }

        if (this.props.headers && this.props.headers.length > 0) {
            //设置表头的详情，序号，选择列,空白列
         
            let control = this.setOrderAndSelectAndDetailHeader(maxRowSpan);
            headerControl[0] = [].concat(control, headerControl[0], [this.setGutterHeader(maxRowSpan)]);
        }


        return <TableHead>
            {
                headerControl && headerControl.map((tritem, rowindex) => {
                    return <TableRow key={rowindex}>{tritem}</TableRow>
                })}
        </TableHead>
    }
}

export default GridHeader;