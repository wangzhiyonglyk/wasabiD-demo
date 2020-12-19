
/**
 * create by wangzhiyong
 * date:2020-12-17
 * desc 将datagrid中的渲染继续拆分
 *  复杂，表头适应超过两行的表头
 * 可以添加，删除，合并列
 * 为自定义表，交叉表作准备
 * 
 *
 */
import React, { Component } from 'react';
import LinkButton from '../../../Buttons/LinkButton.jsx';
import CheckBox from '../../../Form/CheckBox.jsx';

export default {
    renderComplexHeader() {

        let headerControl = [];
        //处理表头
        this.state.headers.map((trheader, headerRowIndex) => {
            if (trheader instanceof Array) {
                let trcontrol = [];
                trheader.map((header, headerColumnIndex) => {
                    {
                        //排序图标
                        let sortOrder =
                            header.sortAble == true
                                ? this.state.sortName == header.name
                                    ? this.state.sortOrder
                                    : 'both'
                                : ''; //排序样式
                        let props = {}; //设置单击事件
                        props.onClick =
                            header.sortAble == true
                                ? this.state.sortName == header.name
                                    ? this.onSort.bind(
                                        this,
                                        header.name,
                                        this.state.sortOrder == 'asc' ? 'desc' : 'asc'
                                    )
                                    : this.onSort.bind(this, header.name, 'asc')
                                : null;
                        //表格处理编辑时的保存按钮
                        let saveIcon =
                            this.state.editIndex != null && headerColumnIndex == 0 ? (
                                <LinkButton
                                    key='save'
                                    style={{ fontSize: 12, position: 'absolute' }}
                                    iconCls={'icon-submit'}
                                    name='save'
                                    tip='保存'
                                    onClick={this.remoteUpdateRow.bind(this, null)}
                                />
                            ) : null;
                        //内容
                        let content = header.headerContent;//自定义内容
                        if (typeof content === 'string') {
                            //指定的列
                            content = this.substitute(content, rowData);
                        } else if (typeof content === 'function') {
                            //函数
                            try {
                                content = content(header.name, header.label);
                            } catch (e) {
                                console.log('生成自定列出错,原因', e.message);
                                content = '';
                            }
                        } else {
                            //为空时
                            content = header.label;
                        }

                        trheader.push(
                            // 绑定右键菜单事件
                            //使用label作为元素name属性，是因为可能有多个列对应同一个字段
                            <th
                                key={'header' + "-" + headerRowIndex.toString() + "-" + headerColumnIndex.toString()}
                                name={header.label}//以label为准，是因为name可能没有设置
                                {...props}
                                className={'' + sortOrder + (header.export === false ? " wasabi-noexport" : "")}
                                style={{
                                    width: header.width ? header.width : null,
                                    textAlign: header.align
                                }}
                                rowSpan={header.rowSpan}
                                colSpan={header.colSpan}
                            >
                                <div
                                    className='wasabi-grid-cell'
                                    name={header.label}
                                    style={{ textAlign: header.align }}
                                >
                                    {content}
                                    {saveIcon}
                                </div>
                            </th>
                        );

                    }
                }
                )
                headerControl.push(trcontrol)
            }

        });


        //处理选择列
        if (this.props.selectAble) {
            let thCheckProps = {
                //设置checkbox的属性
                value: this.checkCurrentPageCheckedAll() == true ? 'yes' : null, //判断当前页是否选中
                data: [{ value: 'yes', text: '' }],
                onSelect: this.checkedAllHandler,
                name: 'all'
            };

            headerControl[0].unshift(
                <th key='headercheckbox' name='check-column' className='check-column' rowSpan={headerControl.length}>
                    <div className='wasabi-grid-cell'  >
                        {this.props.singleSelect ? null : (
                            <CheckBox forceChange={true} {...thCheckProps}></CheckBox>
                        )}
                    </div>

                </th>
            );

        }

        //处理序号
        if (this.props.rowNumber) {
            headerControl[0].unshift(<th key='headerorder' rowSpan={headerControl.length} name='order' className="wasabi-grid-order">
                <div className='wasabi-grid-cell ' >
                    序号
</div>
            </th>)
        }
        return <thead>
            {headerControl}
        </thead>

    },
}