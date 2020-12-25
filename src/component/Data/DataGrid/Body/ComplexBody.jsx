/**
 * create by wangzhiyong
 * date:2020-12-17
 * desc 将datagrid中的渲染继续拆分
 *  复杂，表头适应超过两行的表头导致表体渲染的变化
 * 
 *
 */
import React, { Component } from 'react';
import LinkButton from '../../../Buttons/LinkButton.jsx';
import CheckBox from '../../../Form/CheckBox.jsx';
import Input from '../../../Form/Input.jsx';
import Radio from '../../../Form/Radio.jsx';
export default {
    renderComplexBody() {
        //渲染表体
        let trobj = [];
        if (
            !(this.state.data instanceof Array) ||
            !(this.state.headers instanceof Array)
        ) {
            return;
        }

        this.state.data.map((rowData, rowIndex) => {
            let detailtd = null;//详情列
            let ordertd = null;
            let checkedControl = null;//本行是否有选择框
           
            let tds = []; //当前的列集合
            let key = this.getKey(rowIndex); //获取这一行的关键值
            //详情列
            if (this.props.detailAble) {
                let iconCls = 'icon-arrow-down'; //详情列的图标
                    if (this.state.detailIndex == key) {
                        iconCls = 'icon-arrow-up'; //详情列-展开
                    }
                detailtd= <td key={'bodydetail' + rowIndex.toString()} name="wasabi-detail-column" className="wasabi-detail-column">
                <div className='wasabi-grid-cell  '>
                    <i style={{cursor:"pointer"}} className={iconCls} onClick={this.detailHandler.bind(this, rowData, rowIndex)}></i>
                </div>
            </td>
            }
            //序号列
            if (this.props.rowNumber) {
                ordertd = (
                    <td key={'bodyorder' + rowIndex.toString()} name="wasabi-order-column" className="wasabi-order-column">
                        <div className='wasabi-grid-cell  '> 
                            {(
                                (this.state.pageIndex - 1) * this.state.pageSize +
                                rowIndex +
                                1
                            ).toString()}
                        </div>
                    </td>
                );
            }
            //通过全局属性，设置这一行的选择列
            if (this.props.selectAble) {
                let props = {
                    value: this.state.checkedData.has(key) == true ? key : null,
                    data: [{ value: key, text: '' }],
                    onSelect: this.onChecked.bind(this, rowIndex),
                    name: key
                };
                //是选择还是多选
                if (this.props.singleSelect == true) {
                    checkedControl = (
                        <td
                            key={'bodycheckbox' + rowIndex.toString()}
                            name="wasabi-check-column"
                            className='wasabi-check-column'
                        >
                            <div className='wasabi-grid-cell'>

                                <Radio forceChange={true} {...props}></Radio>
                            </div>
                        </td>
                    );
                } else {
                    checkedControl = (
                        <td
                            key={'bodycheckbox' + rowIndex.toString()}
                            name="wasabi-check-column"
                            className='wasabi-check-column'
                        >
                            <div className='wasabi-grid-cell'>
                                <CheckBox forceChange={true} {...props}></CheckBox>
                            </div>
                        </td>
                    );
                }
            }


            //生成数据列
            let columnIndex = 0;//真正的序号列
          
            this.state.headers.map((trheader, headerRowIndex) => {
                if (trheader instanceof Array) {

                    trheader.map((header, headerColumnIndex) => {
                        if ((header.colSpan && header.colSpan > 1)) {
                            //跨几列的不用渲染
                            return;
                        }

                        if (header.checked && checkedControl) {
                            // 本行设置了是否可选择的属性并且有选择框       
                            let rowchecked = header.checked;//是否可以选择
                            if (typeof rowchecked === "function") {
                                rowchecked = rowchecked(rowData, rowIndex);
                            }
                            else {
                                rowchecked = true;//默认有
                            }
                            if (!rowchecked) {
                                //本行没有选择框，先要事先处理好
                                checkedControl = <td
                                    key={'bodycheckbox' + rowIndex.toString()}

                                    className='wasabi-check-column'
                                >
                                    <div className='wasabi-grid-cell'>


                                    </div>
                                </td>
                            }

                            return;//选择列，不处理内容了

                        }

                        //内容
                        let content = header.content;

                        if (typeof content === 'string') {
                            //指定的列
                            content = this.substitute(content, rowData);
                        } else if (typeof content === 'function') {
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

                        if (
                            this.state.editIndex != null &&
                            this.state.editIndex == rowIndex &&
                            header.editor
                        ) {
                            let currentValue = rowData[header.name];
                            let currentText = rowData[header.name];
                            if (typeof header.editor.content === 'function') {
                                let valueResult = header.editor.content(rowData, rowIndex);
                                if (valueResult) {
                                    currentValue = valueResult.value;
                                    currentText = valueResult.text;
                                }
                            }
                            //处理数据单元格
                            tds.push(
                                <td
                                    onClick={this.onClick.bind(this, rowData, rowIndex)}
                                    onDoubleClick={this.onDoubleClick.bind(this, rowData, rowIndex)}
                                    key={'col-' + rowIndex.toString() + "-" + headerRowIndex + "-" + headerColumnIndex + '-' + columnIndex.toString()}
                                    export={"1"}//为了导出时处理数字化的问题
                                    className={header.export === false ? "wasabi-noexport" : ""}//为了不导出
                                >
                                    <div
                                        className='wasabi-grid-cell'
                                        style={{ textAlign: header.align }}
                                    >
                                        <Input
                                            {...header.editor.options}
                                            type={header.editor.type}
                                            name={header.name}
                                            value={currentValue}
                                            text={currentText}
                                            onChange={this.rowEditHandler.bind(this, rowIndex, headerRowIndex, headerColumnIndex, columnIndex)}
                                            onSelect={this.rowEditHandler.bind(this, rowIndex, headerRowIndex, headerColumnIndex, columnIndex)}
                                            label={''}//没有描述
                                        ></Input>
                                    </div>
                                </td>
                            );
                        }
                        else {
                            tds.push(
                                <td
                                    export={"1"}//为了导出时处理数字化的问题
                                    className={header.export === false ? "wasabi-noexport" : ""}//为了不导出
                                    onClick={this.onClick.bind(this, rowData, rowIndex)}
                                    onDoubleClick={this.onDoubleClick.bind(this, rowData, rowIndex)}
                                    key={'col-' + rowIndex.toString() + "-" + headerRowIndex + "-" + headerColumnIndex + '-' + columnIndex.toString()}
                                >
                                    <div className='wasabi-grid-cell' >
                                        {content}
                                    </div>
                                </td>
                            );

                        }

                        columnIndex++;
                    });
                }



            });


            trobj.push(
                <tr
                    key={'row' + rowIndex.toString()}
                    onMouseDown={this.onTRMouseDown.bind(this, rowIndex)}
                >
                    {detailtd}
                    {ordertd}
                    {checkedControl}
                    {tds}
                </tr>
            );

            if (this.state.detailIndex == key) {
                trobj.push(this.state.detailView);
            }
        });
        return trobj;
    }
}