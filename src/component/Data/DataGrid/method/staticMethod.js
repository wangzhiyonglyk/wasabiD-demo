/**
 * create by wangzhiyong
 * date:2020-12-20
 */
import React from "react";
import func from "../../../libs/func.js";
import Msg from "../../../Info/Msg"
export default {
    /**
     * 清空数据
     */
    clearData: function () {//清空数据
        this.setState({
            data: [],
            params: [],
        });
    },

    /**
     *获取焦点行下标
     */
    getFocusIndex: function () { //只读函数,用于父组件获取数据

        return this.state.focusIndex;
    },
    /**
     * 获取焦点行数据
     */
    getFocusRowData() {
        this.getRowData();
    },
    /**
     * 获取指定行数据
     * @param {*} index 
     */
    getRowData: function (index) {//获取当前焦点行的数据
        if (index != null && index != undefined) {

        }
        else {
            index = this.state.focusIndexthis.state.focusIndex;
        }
        return this.state.data && this.state.data[index || 0];
    },
    /**
     * 获取勾选的数据
     */
    getChecked: function () {
        //获取选中的行数据
        var data = [];
        for (let value of this.state.checkedData.values()) {
            data.push(value);
        }
        return data;
    },
    /**
     * 设置勾选的值
     */
    setChecked: function (checkedRowData = []) {
        if (checkedRowData instanceof Array && checkedRowData.length > 0) {
            if (this.props.priKey) {
                let data = this.state.data;
                let checkedData = new Map();
                let checkedIndex = new Map();
                for (let i = 0; i < checkedRowData.length; i++) {
                    let findIndex = data.findIndex((rowData, index) => {
                        return rowData[this.props.priKey] == checkedRowData[i][this.props.priKey]
                    })
                    if (findIndex > -1) {
                        checkedIndex.set(findIndex + "", findIndex);
                        let key = this.getKey(findIndex);//获取关键字
                        checkedData.set(key+"", this.state.data[findIndex])
                    }
                }
                console.log("checked",checkedData)
                this.setState({
                    checkedData,
                    checkedIndex
                })

            }
            else {
                Msg.error("没有设置主键,无法自定义勾选");
            }
        }

    },
    /**
     * 清除勾选
     */
    clearChecked: function () {
        this.checkedAllHandler("no");
    },
    /**
     * 导出
     * @param {*} selected 是否只导出选择行
     * @param {*} title 导出标题
     */
    export(selected, title = "grid-") {
        let realTable = document.getElementById(this.state.realTableid);
        title = title + func.dateformat(new Date(), "yyyy-MM-dd");
        let tableHtml = "<table border='1'> ";
        //导出表头
        tableHtml += "<thead>";
        for (let rowIndex = 0; rowIndex < realTable.children[1].children.length; rowIndex++) {
            tableHtml += "<tr>"
            for (let columnIndex = 0; columnIndex < realTable.children[1].children[rowIndex].children.length; columnIndex++) {
                let html = realTable.children[1].children[rowIndex].children[columnIndex].outerHTML;
                if (html.indexOf("wasabi-detail-column") > -1 || html.indexOf("wasabi-order-column") > -1 || html.indexOf("wasabi-check-column") > -1 || html.indexOf("wasabi-noexport") > -1) {//除去序号列与选择列及不需要导出的列
                    continue;
                }
                tableHtml += html;
            }
            tableHtml += "</tr>"
        }

        tableHtml += "</thead><tbody>";
        //导出表体
        if (selected) {//导出选择的行

            for (let value of this.state.checkedIndex.values()) {
                tableHtml += "<tr>"
                for (let columnIndex = 0; columnIndex < realTable.children[2].children[value].children.length; columnIndex++) {
                    let html = realTable.children[2].children[value].children[columnIndex].outerHTML;
                    if (html.indexOf("wasabi-detail-column") > -1 || html.indexOf("wasabi-order-column") > -1 || html.indexOf("wasabi-check-column") > -1 || html.indexOf("wasabi-noexport") > -1) {//除去序号列与选择列及不需要导出的列
                        continue;
                    }
                    tableHtml += html;
                }
                tableHtml += "</tr>";
            }


        }
        else {//导出全部行
            for (let rowIndex = 0; rowIndex < this.state.data.length; rowIndex++) {
                tableHtml += "<tr>"
                for (let columnIndex = 0; columnIndex < realTable.children[2].children[rowIndex].children.length; columnIndex++) {
                    if (realTable.children[2].children.length > rowIndex) {
                        let html = realTable.children[2].children[rowIndex].children[columnIndex].outerHTML;
                        if (html.indexOf("wasabi-detail-column") > -1 || html.indexOf("wasabi-order-column") > -1 || html.indexOf("wasabi-check-column") > -1 || html.indexOf("wasabi-noexport") > -1) {//除去序号列与选择列及不需要导出的列
                            continue;
                        }
                        tableHtml += html;
                    }
                }
                tableHtml += "</tr>";
            }


        }
        tableHtml += "</tbody></table>";
        //将标记的数字列转为正常显示
        tableHtml = tableHtml.replace(/export=\"1\"/g, "style=\"mso-number-format:\'\@\';\"");
        // 下载的表格模板数据
        const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:x="urn:schemas-microsoft-com:office:excel" 
          xmlns="http://www.w3.org/TR/REC-html40">
          <head><meta http-equiv='Content-Type' content='application/vnd.ms-excel; charset=utf-8' />
          <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
          <x:Name>Sheet1</x:Name>
          <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
          </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
          </head><body>${tableHtml}</body></html>`;
        // // 创建一个Blob对象，第一个参数是文件的数据，第二个参数是文件类型属性对象
        let blob = new Blob([template], { type: "application/vnd.ms-excel" });
        let downloadA = document.createElement('a');
        downloadA.href = window.URL.createObjectURL(blob);
        downloadA.download = title + ".xls";
        downloadA.click();
        window.URL.revokeObjectURL(downloadA.href);//移除！！！！

    },

}