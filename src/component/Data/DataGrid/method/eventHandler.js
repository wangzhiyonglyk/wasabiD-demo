/**
 * Created by wangzhiyong on 2016/10/25.
 * edit by wangzhiyong 2020-05-09 修复分页的问题
 * 将DataGrid拆分,基本处理事件存在这里
 */
import React, { Component } from "react";
import func from "../../../libs/func.js";
import FetchModel from "../../../Model/FetchModel.js";
import Msg from "../../../Info/Msg.jsx";
import diff from "../../../libs/diff"
export default {

    /**
     * 鼠标按下事件
     * @param {*} index 
     * @param {*} event 
     */
    onTRMouseDown: function (index, event) {//行事件，一定要用鼠标按下事件,不保存在状态值中，
        if (this.props.focusAble) {
            let node = event.target;
            while (node.nodeName.toLowerCase() != "tr" && node.nodeName.toLowerCase() != "body") {
                node = node.parentElement;
            }
            var trs = this.refs.realTable.children[2].children;
            for (var i = 0; i < trs.length; i++) {
                trs[i].className = trs[i].className.replace("selected", "");//先去掉
            }
            if (node.className.indexOf("selected") > -1) {

            }
            else {
                node.className = "selected" + (node.className ? " " + node.className : "");
            }
        }
        this.focusIndex = index;//不更新状态值，否则导致频繁的更新

    },
    /**
     * 单击事件
     * @param {*} rowIndex 
     * @param {*} rowData 
     */
    onClick: function (rowData, rowIndex, event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.props.selectChecked == true) {

            let key = this.getKey(rowIndex);//获取关键字
            if (this.state.checkedData.has(key)) {
                this.onChecked(rowIndex, "");
            }
            else {
                this.onChecked(rowIndex, key);
            }
        }
        this.props.onClick && this.props.onClick(rowData, rowIndex);//注意参数换了位置,因为早期版本就是这样子

    },
    /**
     * 双击事件
     * @param {*} rowData 
     * @param {*} rowIndex 
     */

    onDoubleClick: function (rowData, rowIndex,event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.props.onDoubleClick != null) {//如果自定义了,
            this.props.onDoubleClick(rowData, rowIndex);

        }
        else if (this.state.editAble) {//没有自定义,允许编辑表格
            if (this.state.editIndex != null && this.state.editIndex != rowIndex) {//说明上一行编辑完成
                this.remoteUpdateRow(rowIndex);
            }
            else {//没有上一行
                this.setState({
                    editIndex: rowIndex
                })
            }
        }
    },


    /**
     * 页号改变
     * @param {*} pageIndex 
     */
    paginationHandler: function (pageIndex) {//分页处理函数
        if (pageIndex == this.state.pageIndex) {//当前页,不处理
            return;
        }
        else {//跳转到指定页

            this.updateHandler(this.state.url, this.state.pageSize, pageIndex, this.state.sortName, this.state.sortOrder, null, null);
        }
    },
    /**
     * 上一页数据
     */
    prePaginationHandler: function () {

        if (this.state.pageIndex == 1) {

        }
        else {
            this.paginationHandler(this.state.pageIndex - 1);
        }

    },
    /**
     * 下一页
     */
    nextPaginationHandler: function () {

        var pageAll = (parseInt(this.state.total / this.state.pageSize));//共多少页
        var lastPageNum = (this.state.total % this.state.pageSize);
        if (lastPageNum > 0) {
            pageAll++;
        }
        if (this.state.pageIndex == pageAll) {

        }
        else {
            this.paginationHandler(this.state.pageIndex + 1);
        }
    },
    /**
     * 页号大小改变
     * @param {*} event 
     */
    pageSizeHandler: function (event) {
        console.log(event)
        this.updateHandler(this.state.url, event.target.value * 1, this.state.pageIndex, this.state.sortName, this.state.sortOrder, null);
    },

    /**
     * 排序事件
     * @param {*} sortName 
     * @param {*} sortOrder 
     */
    onSort: function (sortName, sortOrder) {  //排序事件
        this.updateHandler(this.state.url, this.state.pageSize, 1, sortName, sortOrder);

    },

    /**
     * 更新方法
     * @param {*} params 
     * @param {*} url 
     */
    reload: function (params, url = "") {//重新查询数据,
        url = url || this.state.url;//得到旧的url
        if (!url) {//没有url,不自行加载，则调用更新事件
            if (this.props.updateHandler) {//用户自定义了更新事件
                this.props.updateHandler(this.state.pageSize, this.state.pageIndex, this.state.sortName, this.state.sortOrder);
            }
        }
        else {//传了url

            if (diff(params, this.state.params)) {//参数发生改变,从第一页查起
                this.updateHandler(url, this.state.pageSize, 1, this.state.sortName, this.state.sortOrder, params);
            }
            else {//从当前页查起，刷新
                this.updateHandler(url, this.state.pageSize, this.state.pageIndex, this.state.sortName, this.state.sortOrder, params);
            }

        }
    },

    /**
     * 数据更新处理
     * @param {*} url 请求的url
     * @param {*} pageSize 分页大小
     * @param {*} pageIndex 页号
     * @param {*} sortName  排序字段
     * @param {*} sortOrder  排序方式
     * @param {*} params 参数
     */
    updateHandler: function (url, pageSize, pageIndex, sortName, sortOrder, params) {////数据处理函数,更新


        if (this.state.addData.length > 0 || this.state.deleteData.length > 0 || this.state.updatedData.length > 0) {
            Msg.confirm("有脏数据,是否继续更新列表?", this.updateHandlerConfirm.bind(this, url, pageSize, pageIndex, sortName, sortOrder, params), () => {
                return;
            })

        }
        else {
            this.updateHandlerConfirm(url, pageSize, pageIndex, sortName, sortOrder, params);
        }
    },
    /**
     * 更新确认函数
     * @param {*} url 请求的url
     * @param {*} pageSize 分页大小
     * @param {*} pageIndex 页号
     * @param {*} sortName  排序字段
     * @param {*} sortOrder  排序方式
     * @param {*} params 参数
     */
    updateHandlerConfirm: function (url, pageSize, pageIndex, sortName, sortOrder, params) {
        /*
     url与params而url可能是通过reload方法传进来的,并没有作为状态值绑定
     headers可能是后期才传了,见Page组件可知
     所以此处需要详细判断
     */
        url = url || this.state.url;
        if (url) {
            this.setState({
                loading: true,
                url: url,//更新,有可能从reload那里直接改变了url

            })
            let httpParams = {};//本次请求的参数
            if (!params && this.state.params && typeof this.state.params == "object") {//新的参数为null或者undefined，旧参数不为空
                httpParams = func.clone(this.state.params);//
                params = func.clone(this.state.params);//保存以便下一次更新
            }
            else {//新参数不为空
                httpParams = func.clone(params);//复制，否则后面参数就会多加四个默认参数
            }

            if (this.props.pagination == true) {
                if (!httpParams) {
                    httpParams = {};
                }
                httpParams.pageSize = pageSize;
                httpParams.pageIndex = pageIndex;
                httpParams.sortName = sortName;
                httpParams.sortOrder = sortOrder;
            }

            /*
             在查询失败后可能要继续调用updateHandler查询前一页数据,所以传url,以便回调,
             而pageSize,pageIndex,sortName,sortOrder,params这些参数在查询成功后再更新
             所以回传
             */

            let type = this.props.httpType ? this.props.httpType : "POST";
            type = type.toUpperCase();
            let fetchmodel = new FetchModel(url, this.loadSuccess.bind(this, url, pageSize, pageIndex, sortName, sortOrder, params), httpParams, this.loadError, type, this.props.httpHeaders);
            fetchmodel.headers = this.props.httpHeaders;
            if (this.props.contentType) {
                //如果传contentType值则采用传入的械
                //否则默认

                fetchmodel.contentType = this.props.contentType;
                fetchmodel.data = fetchmodel.contentType == "application/json" ? JSON.stringify(fetchmodel.data) : fetchmodel.data;
            }

            console.log("datagrid-开始查询:", fetchmodel);

            type == "POST" ? func.fetch.post(fetchmodel) : func.fetch.get(fetchmodel);
        }
        else {
            //没有传url,判断用户是否自定义了更新函数
            if (this.props.updateHandler != null) {

                this.props.updateHandler(pageSize, pageIndex, sortName, sortOrder);
            }
            else {
                if (this.state.rawData.length == this.state.total) {
                    //说明传的数据就是全部的
                    this.setState({
                        pageSize: pageSize,
                        pageIndex: pageIndex,
                        sortName: sortName,
                        sortOrder: sortOrder,
                        data: this.state.rawData.slice((pageIndex - 1) * pageSize, (pageIndex - 1) * pageSize + pageSize - 1)
                    })
                }
            }
        }

    },
    /**
     * 加载成功事件
     * @param {*} url 
     * @param {*} pageSize 
     * @param {*} pageIndex 
     * @param {*} sortName 
     * @param {*} sortOrder 
     * @param {*} params 
     * @param {*} result 
     */
    loadSuccess(url, pageSize, pageIndex, sortName, sortOrder, params, result) {//数据加载成功


        if (this.props.loadSuccess) {
            //如果父组件指定了数据加载后的方法，先执行，然后再处理数据
            result = this.props.loadSuccess(result);
            if (!result) {
                Msg.error("您传递的loadSuccess方法没有返回值");
                return;
            }
        }
        var dataResult;//最终数据
        var totalResult;//最终总共记录
        var footerResult;//最终统计数据
        var dataSource = this.props.dataSource;//数据源

        if (dataSource) {//需要重新指定数据源
            dataResult = func.getSource(result, dataSource);
        }
        else {
            dataResult = result;
        }
        if (this.props.pagination && this.props.totalSource) {//分页而且需要重新指定总记录数的数据源
            totalResult = func.getSource(result, this.props.totalSource);
        }
        else if (this.props.pagination) {//分页了,没有指定,使用默认的
            if (result.total) {
                totalResult = result.total;
            }
            else {
                totalResult = null;
                throw ("datagrid分页了,但返回的数据没有指定total");
            }

        }
        else {//不分页
            totalResult = dataResult.length;
        }

        if (this.props.footerSource)//需要重新指定页脚的数据源
        {
            footerResult = func.getSource(result, this.props.footerSource);
        }
        else {//没有指定，
            if (result.footer) {
                footerResult = result.footer;//默认的
            }
            else {

            }


        }
        if (!footerResult) {
            footerResult = this.state.footer;
        }
        console.log("datagrid-fetch结果", {
            "原数据": result,
            "处理后的数据": dataResult
        });
        if (totalResult > 0 && dataResult && dataResult instanceof Array && dataResult.length == 0 && totalResult > 0 && pageIndex != 1) {
            //有总记录，没有当前记录数,不是第一页，继续查询转到上一页
            this.updateHandler(url, pageSize, pageIndex - 1, sortName, sortOrder, params);
        }
        else {
            //查询成功
            if (dataResult && dataResult instanceof Array) {//是数组,
                dataResult = (this.props.pagination == true ? dataResult.slice(0, pageSize) : dataResult);
            }
            var checkedData = this.state.checkedData;//之前被选择的数据
            if (this.props.clearChecked == false) {//不清除之前的选择
                for (let dataIndex = 0; dataIndex < dataResult; dataIndex++) {
                    let currentKey = this.getKey(dataIndex, pageIndex);//得到当前的key
                    if (checkedData.has(currentKey)) {//如果被选择则修改数据源
                        checkedData.set(currentKey, dataResult[dataIndex]);
                    }
                }
            }
            this.setState({
                pageSize: pageSize,
                params: func.clone(params),//这里一定要复制,只有复制才可以比较两次参数是否发生改变没有,防止父组件状态任何改变而导致不停的查询
                pageIndex: pageIndex,
                sortName: sortName,
                sortOrder: sortOrder,
                data: dataResult,
                total: totalResult,
                footer: footerResult,
                loading: false,
                checkedData: this.props.clearChecked == true ? new Map() : checkedData,
                detailIndex: null,//重新查询要清空详情
                detailView: null,


            })

        }

    },

    /**
     * 加载失败
     * @param {*} message 
     */
    loadError: function (message) {//查询失败
        console.log("datagrid-error", message);
        Msg.error(message);
        this.setState({
            loading: false,
        })
    },
    /**
     * 获取当行的key
     * @param {*} index 
     * @param {*} pageIndex 
     */
    getKey: function (index, pageIndex) {//todo 暂时以下标
        let key = "";
        if (!pageIndex) {

            pageIndex = this.state.pageIndex;
        }
        if (index == null && index == undefined) {
            console.log(new Error("index 值传错"));
        }
        else {
            key = pageIndex.toString() + "-" + index.toString();//默认用序号作为关键字
        }
        return key;
    },

    /**
     * 勾选事件
     * @param {*} index 
     * @param {*} value 
     */
    onChecked: function (index, value) {//选中事件
        let checkedData = (this.state.checkedData);//已经选中的行
        let checkedIndex = (this.state.checkedIndex);//已经选中的行的序号，用于导出
        if (this.props.singleSelect == true) {//单选则清空
            checkedData = new Map();//单选先清空之前的选择
            checkedIndex = new Map();
        }
        let key = this.getKey(index);//获取关键字
        if (value && value != "") {
            checkedData.set(key, this.state.data[index]);
            checkedIndex.set(index + "", index);
        } else {
            checkedData.delete(key);
            checkedIndex.delete(index + "");
        }

        this.setState({
            checkedData: checkedData,
            checkedIndex: checkedIndex
        })
        if (this.props.onChecked != null) {
            var data = [];
            for (let value of checkedData.values()) {
                data.push(value);
            }
            this.props.onChecked(data);//用于返回
        }
    },

    /**
     * 判断当前页是否全部选中
     */
    checkCurrentPageCheckedAll: function () {//
        if (this.state.data instanceof Array) {

        }
        else {
            return;
        }
        let length = this.state.data.length;
        if (length == 0) {
            return false;//如果没有数据，则不判断，直接返回
        }
        var ischeckall = true;
        for (let i = 0; i < length; i++) {
            if (!this.state.checkedData.has(this.getKey(i))) {
                ischeckall = false;
                break;
            }
        }
        return ischeckall;
    },
    /**
     * 全选事件
     * @param {*} value 
     */
    checkedAllHandler: function (value) {//全选按钮的单击事件
        if (this.state.data instanceof Array) {

        }
        else {
            return;
        }
        let length = this.state.data.length;
        let checkedData = this.state.checkedData;
        let checkedIndex = this.state.checkedIndex;
        for (let i = 0; i < length; i++) {
            let key = this.getKey(i);


            if (value == "yes") {
                if (!checkedData.has(key)) {
                    checkedIndex.set(i + "", i);
                    checkedData.set(key, this.state.data[i]);//添加
                }
            }
            else {
                if (checkedData.has(key)) {
                    checkedIndex.delete(i + "");
                    checkedData.delete(key);//删除
                }
            }
        }


        this.setState({ checkedData: checkedData, checkedIndex: checkedIndex });
        if (this.props.onChecked != null) {//执行父组件的onchecked事件
            var data = [];
            for (let value of checkedData.values()) {
                data.push(value);
            }
            this.props.onChecked(data);
        }

    },

}
