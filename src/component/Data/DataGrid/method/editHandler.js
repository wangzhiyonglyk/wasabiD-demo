/**
 * Created by wangzhiyong on 2016/10/25.
 * 将原有的单击与双击事件
 * 将新增,修改,粘贴,鼠标右键,滚动,固定表头,固定列,等功能
 * 2019-2020中间修改语法等
 * 2020-03-15 增加contentType值
 * 作为DataGrid扩展功能
 */
import React, { Component } from "react";
import func from "../../../libs/func.js";
import FetchModel from "../../../Model/FetchModel.js";
import Msg from "../../../Info/Msg.jsx";
export default  {
  
    /**
     * 点击弹出详情
     * @param {*} rowData 
     * @param {*} rowIndex 
     */
    detailHandler: function (rowData,rowIndex,name,title,event) {//执行显示详情功能
        event.preventDefault();
        event.stopPropagation();
        console.log("dd")
        var key = this.getKey(rowIndex);//获取关键值
        if (key == this.state.detailIndex) {
            this.setState({
                detailIndex: null,
                detailView: null,
            })
        }
        else {
            if (this.props.detailHandler != null) {
                let  detail = this.props.detailHandler(rowData,rowIndex);
                if (!detail) {
                    this.setState({
                        detailIndex: null,//方便下次操作
                        detailView: null,
                    })
                }
                else {
                    let  colSpan = this.columnSum;//总列数
            
                    if (this.props.selectAble) {
                        colSpan++;
                    }
                    if (this.props.rowNumber ) {
                        colSpan++;
                    }

                    this.setState({
                        detailIndex: key,
                        detailView: <tr key={key + "detail"}>
                            <td colSpan={colSpan}><div className="wasabi-detail" >{detail}</div></td>
                        </tr>,
                    })
                }

            }
        }
    },
 
 
    /****新增，修改，删除*/
    addRow: function (rowData, editAble) {//添加一行,如果editable为true，说明添加以后处理编辑状态
        let newData = this.state.data;
        newData.unshift(rowData);
        this.state.addData.set(this.getKey(0), rowData);//添加到脏数据里
        this.focusIndex = 0;
        this.setState({
            detailIndex: null,
            detailView: null,
            data: newData,
            total: this.state.total + 1,
            addData: this.state.addData,
            editIndex: editAble ? 0 : null,
        });
    },
    deleteRow: function (rowIndex) {//删除指定行数据

        this.state.deleteData.push(this.state.data.splice(rowIndex, 1));
        let newData = this.state.data.splice(rowIndex, 1);

        this.setState({
            data: newData,
            total: this.state.total - 1,
            deleteData: this.state.deleteData
        });
    },
    editRow: function (rowIndex) {//让某一个处理编辑状态

        this.setState({
            editIndex: rowIndex
        })

    },
    updateRow: function (rowIndex, rowData) {// //只读函数,更新某一行数据
        this.state.updatedData.set(this.getKey(rowIndex), rowData);//更新某一行

        if (rowIndex >= 0 && rowIndex < this.state.data.length) {
            var newData = this.state.data;
            newData[rowIndex] = rowData;
            this.setState(
                {
                    data: newData,
                    updatedData: this.state.updatedData
                });
        }
    },
   /**
    * 
    * @param {*} rowIndex 行的序号
    * @param {*} headerRowIndex 表头的行号
    * @param {*} headerColumnIndex 表头的列号
    * @param {*} columnIndex 真正的列序号
    * @param {*} value 值
    * @param {*} text 文本值
    * @param {*} name 对字段名
    * @param {*} data 行数据
    */
    rowEditHandler: function (rowIndex, headerRowIndex,headerColumnIndex, columnIndex, value, text, name) {  //编辑时单元格内的表单onchange的监听事件
        currentHeader=headerRowIndex?this.state.headers[headerRowIndex][headerColumnIndex]:this.state.headers[headerColumnIndex];
        if (currentHeader.editor && typeof currentHeader.editor.edited === "function") {
            //得到新的一行数据
            this.state.data[rowIndex] = currentHeader.editor.edited(value, text, this.state.data[rowIndex]);//先将值保存起来，不更新状态

        }
        else if (currentHeader.editor) {
            //没有则默认以value作为值
            this.state.data[rowIndex][name] = value;//先将值保存起来，不更新状态值
        }

        if (this.state.addData.has(rowIndex)) {//说明是属于新增的
            this.state.addData.set(this.getKey(rowIndex), this.state.data[rowIndex]);
        }
        else {//属于修改的
            this.state.updatedData.set(this.getKey(rowIndex), this.state.data[rowIndex]);
        }
    },

    getAddData: function () {//获取新增数据
        var addData = [];
        for (let value of this.state.addData.values()) {
            addData.push(value);
        }
        return addData;
    },
    getUpdateData: function () {//获取被修改过的数据

        this.setState({
            editIndex: null,//
        })
      let updateData={}; 
      
      this.state.updatedData&&this.state.updatedData.forEach(function(value, key) {
           updateData[key]=value;
          })
       return updateData;
    },
    getDeleteData: function () {//获取被删除的数据
        return this.state.deleteData;
    },
    clearDirtyData: function () {//清除脏数据

        //清除脏数据
        this.setState({
            addData: new Map(),
            updatedData: new Map(),
            deleteData: [],
        })
    },
    remoteUpdateRow: function (newEditIndex) {//远程提交某一行数据
        if (this.state.updateUrl) {//定义url,保存上一行
            let type = this.props.httpType ? this.props.httpType : "POST";
            type = type.toUpperCase();
            var fetchmodel = new FetchModel(this.state.updateUrl, this.remoteUpdateRowuccess.bind(this, newEditIndex), { model: this.state.data[this.state.editIndex] }, this.ajaxError, type);
            fetchmodel.headers = this.props.httpHeaders;
            if (this.props.contentType) {
                //如果传contentType值则采用传入的械
                //否则默认

                fetchmodel.contentType = this.props.contentType;
                fetchmodel.data = fetchmodel.contentType == "application/json" ? JSON.stringify(fetchmodel.data) : fetchmodel.data;
            }
            console.log("datagrid-updateRow:", fetchmodel);
            type == "POST" ? func.fetch.post(fetchmodel) : func.fetch.get(fetchmodel);
        }
        else {//没有定义url
            if (this.state.addData.has(this.getKey(this.state.editIndex))) {//说明是属于新增的
                this.state.addData.set(this.getKey(this.state.editIndex), this.state.data[this.state.editIndex]);
            }
            else {//属于修改的
                this.state.updatedData.set(this.getKey(this.state.editIndex), this.state.data[this.state.editIndex]);
            }
            this.setState({
                editIndex: newEditIndex,
                data: this.state.data,
                addData: this.state.addData,
                updatedData: this.state.updatedData
            })
        }
    },
    remoteUpdateRowuccess: function (newEditIndex, result) {//远程提交某一行数据
        if (this.state.addData.has(this.getKey(this.state.editIndex))) {//说明是属于新增的
            this.state.addData.delete(this.getKey(this.state.editIndex));
        }
        else {//属于修改的
            this.state.updatedData.delete(this.getKey(this.state.editIndex));
        }
        if (result.success) {
            this.setState({
                editIndex: newEditIndex,
            })
        }
    },
    //错误处理事件
    ajaxError: function (message) {//错误处理事件
        Msg.error(message);
    }
    /****新增，修改，删除*/
}

