/**
 * create by wangzhiyong
 * date:2020-12-17
 * desc 将datagrid中的渲染继续拆分
 *  简单表头，一行，与两行，两行的只是为了兼容
 *
 */
import React, { Component } from 'react';
import LinkButton from "../../../Buttons/LinkButton"
import CheckBox from "../../../Form/CheckBox"

let SingleHeader = {
    renderSingleHeader(fixed = false) {
        //渲染表头
        let headers1 = [];
        let headers2 = [];
        let headers = fixed ? this.state.fixedHeaders : this.state.headers;
        //处理表头
        headers.map((header, headerColumnIndex) => {
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
            sortOrder = sortOrder;//有固定列的时候
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

            if (typeof content === 'string'&&content) {
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

            if ((header.rowSpan && header.rowSpan > 1) || (header.colSpan && header.colSpan > 1)) {
                headers1.push(

                    //使用label作为元素name属性，是因为可能有多个列对应同一个字段
                    <th
                        key={'header-' + headerColumnIndex.toString()}
                        name={header.label}//以label为准，是因为name可能没有设置
                        {...props}
                        className={'' + sortOrder + (header.export === false ? " wasabi-noexport" : "")}
                        rowSpan={header.rowSpan}
                        colSpan={header.colSpan}
                    >
                        <div
                            className='wasabi-grid-cell nowrap'
                            name={header.label}
                        >
                            {content}
                            {saveIcon}
                        </div>
                    </th>
                );
            }
            else {
                headers2.push(

                    //使用label作为元素name属性，是因为可能有多个列对应同一个字段
                    <th
                        key={'header-' + headerColumnIndex.toString()}
                        name={header.label}//以label为准，是因为name可能没有设置
                        {...props}
                        className={'' + sortOrder + (header.export === false ? " wasabi-noexport" : "")}
                        rowSpan={header.rowSpan}
                        colSpan={header.colSpan}
                    >
                        <div
                            className='wasabi-grid-cell nowrap'
                            name={header.label}

                        >
                            {content}
                            {saveIcon}
                        </div>
                    </th>
                );
            }

        });
        if (headers && headers.length > 0) {
            //处理选择列
            if (this.props.selectAble) {
                let thCheckProps = {
                    //设置checkbox的属性
                    value: this.checkCurrentPageCheckedAll() == true ? 'yes' : null, //判断当前页是否选中
                    data: [{ value: 'yes', text: '' }],
                    onSelect: this.checkedAllHandler,
                    name: 'all'
                };
                if (headers1.length > 0) {
                    headers1.unshift(
                        <th key='headercheckbox' name='wasabi-check-column' className='wasabi-check-column'>
                            <div className='wasabi-grid-cell nowrap' rowSpan={2}  >
                                {this.props.singleSelect ? null : (
                                    <CheckBox {...thCheckProps}></CheckBox>
                                )}
                            </div>
                        </th>
                    );
                } else {
                    headers2.unshift(
                        <th key='headercheckbox' name='wasabi-check-column' className='wasabi-check-column'>
                            <div className='wasabi-grid-cell nowrap'  >
                                {this.props.singleSelect ? null : (
                                    <CheckBox  {...thCheckProps}></CheckBox>
                                )}
                            </div>
                        </th>
                    );
                }
            }
            //处理序号列
            if (this.props.rowNumber) {
                if (headers1.length > 0) {
                    headers1.unshift(<th key='headerorder' rowSpan={2} name='wasabi-order-column' className="wasabi-order-column">
                        <div className='wasabi-grid-cell '>
                            {"序号"}
                        </div>
                    </th>)
                }
                else {
                    headers2.unshift(
                        <th key='headerorder' name='wasabi-order-column' className="wasabi-order-column" >
                            <div className='wasabi-grid-cell nowrap ' >
                                {"序号"}
                            </div>
                        </th>
                    );
                }
            }
            //处理详情列
            if (this.props.detailAble) {
                if (headers1.length > 0) {
                    headers1.unshift(<th key='headerdetail' rowSpan={2} name='wasabi-detail-column' className="wasabi-detail-column">
                        <div className='wasabi-grid-cell  nowrap'>

                        </div>
                    </th>)
                }
                else {
                    headers2.unshift(
                        <th key='headerdetail' name='wasabi-detail-column' className="wasabi-detail-column" >
                            <div className='wasabi-grid-cell nowrap ' >

                            </div>
                        </th>
                    );
                }
            }
        }

        //返回数据
        if (headers1.length > 0) {
            //多行
            return <thead>
                <tr>{headers1}</tr>

                <tr>{headers2}</tr>
            </thead>

        }
        else {
            return <thead>
                <tr>{headers2}</tr>
            </thead>
        }

    }
}


export default SingleHeader;


