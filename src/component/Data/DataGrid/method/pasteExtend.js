/**
 * Created by wangzhiyong on 2016/11/8.
 * 将复制粘贴功能独立出来
 */

import Msg from "../../../Info/Msg";
import excel from "../../../libs/excel";
import fileType from "../../../libs/fileType";
import func from "../../../libs/func";
import pageSizeList from "../../Pagination/pageSizeList.js";
export default {

    /**
   * 
   * @param {*} event 
   */
    onDragOver(event) {//在ondragover中一定要执行preventDefault()，否则ondrop事件不会被触发
        event.preventDefault();
    },
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0 && this.props.importAble) {
            try {
                if (fileType.filter("excel", event.dataTransfer.files[0])) {

                    excel.readFile(event.dataTransfer.files[0]).then((workbook) => {
                        let json = excel.workbook2json(workbook);
                        this.json2data(json);

                    })
                } else {
                    Msg.error("只接受excel文件");
                }

            }
            catch (e) {

            }

        }

    },
    /**
    * 导入
    */
    upload(event) {
        if (event.target.files && event.target.files.length > 0 && this.props.importAble) {
            excel.readFile(event.target.files[0]).then((workbook) => {
                event.target.value = "";//清空
                let json = excel.workbook2json(workbook);
                this.json2data(json);
            })
        }


    },
    //excel粘贴事件
    onPaste: async function (rowIndex, columnIndex, event, oldValue) { //excel粘贴事件  
        try {
                let text = await window.navigator.clipboard.readText();
                if (text.indexOf("\t") > -1 || text.indexOf("\n") > -1) {
                    text = text.replace(/\r\n/g, "\n").replace(/\t/g, ",");//转成标准的可操作的csv格式
                    //说明是csv数据，不包含头部
                    this.json2data(excel.csv2json(text, false), rowIndex, columnIndex);
                }
        }
        catch (e) {

        }
    },
    /**
     * 
     * @param {*} json 
     * @param {*} rowIndex 
     * @param {*} columnIndex 
     */
    json2data(json, rowIndex, columnIndex) {
        if (json && json.body) {
            //如果没有设置编辑，则设置
            let headers = func.clone(this.state.headers);
            if (headers && headers.length > 0) {
                for (let i = 0; i < headers.length; i++) {
                    headers[i].editor = headers[i].editor ? headers[i].editor : {
                        type: "text"
                    }
                }
            }
            let data = [];
            let oldData = func.clone(this.state.data);
            if (rowIndex === null || rowIndex === undefined) {//代表是文件
                for (let i = 0; i < json.body.length; i++) {
                    let rowData = {};
                    for (let j = 0; j < headers.length; j++) {
                        if (j < json.body[i].length) {
                            rowData[headers[j].name] = json.body[i][j];
                        } else {
                            rowData[headers[j].name] = "";
                        }

                    }
                    data.push(rowData);
                    this.state.addData.set(this.getKey(oldData.length + i), rowData);//追加
                }

            }
            else {//代表粘贴是文本
                let beginRowIndex = rowIndex;
                for (let i = 0; i < json.body.length; i++) {
                    let rowData = {};
                    for (let j = columnIndex || 0, k = 0; j < headers.length; j++, k++) {
                        if (k < json.body[i].length) {
                            rowData[headers[j].name] = json.body[i][k];
                        } else {
                            rowData[headers[j].name] = "";
                        }
                    }
                    if (beginRowIndex < oldData.length) {
                        //替换
                        oldData[beginRowIndex] = {
                            ...oldData[beginRowIndex],
                            ...rowData
                        }
                        this.state.updateData.set(this.getKey(beginRowIndex), {
                            ...oldData[beginRowIndex],
                            ...rowData
                        });//更新某一行
                    }
                    else {
                        data.push(rowData)
                        this.state.addData.set(this.getKey(beginRowIndex), rowData);//更新某一行
                    }
                    beginRowIndex++;
                }
            }
            let newData=[].concat(oldData, data);
            let pageSize=this.state.pageSize;
            if(this.props.pagination){//分页时，追加了数据，扩展分页大小，防止翻页出错
                if(newData.length>pageSize){
                    for(let i=0;i<pageSizeList.length;i++){
                        pageSize=pageSizeList[i];//取最大值
                        if(pageSizeList[i]>=newData.length)
                        {
                            break;
                        }
                    }
                }
            }
            this.setState({
                headers: headers,
                data: newData,
                total:newData.length,
                pageSize:pageSize,
                adjustHeight: true,
                editAble: true,//允许编辑
                editIndex: rowIndex !== null && rowIndex !== undefined ? rowIndex + "-" + columnIndex : this.state.editIndex,
                addData: this.state.addData,
                updateData: this.state.updateData,
            }, () => {
                this.focus(rowIndex || 0, columnIndex || 0);
            })

        }
    }
}
