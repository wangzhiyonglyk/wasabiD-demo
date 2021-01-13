/**
 * create by wangzhiyong
 * date:2020-12-20
 */

import func from "../../../libs/func.js";

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

        return this.focusIndex;
    },
    /**
     * 获取焦点行数据
     */
    getFocusRowData(){
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
            index = this.focusIndex;
        }
        return this.state.data&&this.state.data[index||0];
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
     * 导出
     * @param {*} selected 是否只导出选择行
     * @param {*} title 导出标题
     */
    export(selected, title="grid-") {
        title = title+ func.dateformat(new Date(), "yyyy-MM-dd");
        let tableHtml = "<table border='1'> ";
        //导出表头
        tableHtml += "<thead>";
        for(let rowIndex=0;rowIndex<this.refs.realTable.children[1].children.length;rowIndex++){
            tableHtml+="<tr>"
            for (let columnIndex = 0; columnIndex <this.refs.realTable.children[1].children[rowIndex].children.length; columnIndex++) {
                let html = this.refs.realTable.children[1].children[rowIndex].children[columnIndex].outerHTML;
                if (html.indexOf("wasabi-detail-column") > -1||html.indexOf("wasabi-order-column") > -1 || html.indexOf("wasabi-check-column") > -1||html.indexOf("wasabi-noexport")>-1) {//除去序号列与选择列及不需要导出的列
                    continue;
                }
                tableHtml += html;
            }
            tableHtml+="</tr>"
        }
      
        tableHtml += "</thead><tbody>";
        //导出表体
        if (selected) {//导出选择的行

            for (let value of this.state.checkedIndex.values()) {
                tableHtml += "<tr>"
                for (let columnIndex = 0; columnIndex <  this.refs.realTable.children[2].children[value].children.length; columnIndex++) {
                    let html = this.refs.realTable.children[2].children[value].children[columnIndex].outerHTML;
                    if (html.indexOf("wasabi-detail-column") > -1||html.indexOf("wasabi-order-column") > -1 || html.indexOf("wasabi-check-column") > -1||html.indexOf("wasabi-noexport")>-1) {//除去序号列与选择列及不需要导出的列
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
                for (let columnIndex = 0; columnIndex < this.refs.realTable.children[2].children[rowIndex].children.length; columnIndex++) {
                    if (this.refs.realTable.children[2].children.length > rowIndex) {
                        let html = this.refs.realTable.children[2].children[rowIndex].children[columnIndex].outerHTML;
                        if (html.indexOf("wasabi-detail-column") > -1||html.indexOf("wasabi-order-column") > -1 || html.indexOf("wasabi-check-column") > -1||html.indexOf("wasabi-noexport")>-1) {//除去序号列与选择列及不需要导出的列
                            continue;
                        }
                        tableHtml += html;
                    }
                }
                tableHtml += "</tr>";
            }


        }
        tableHtml += "</tbody></table>";
        let html = "<html><head><meta charset='UTF-8'></head><body>" + tableHtml + "</body></html>";
        html=html.replace(/export=\"1\"/g,"style=\"mso-number-format:\'\@\';\"");
        // 创建一个Blob对象，第一个参数是文件的数据，第二个参数是文件类型属性对象
        var blob = new Blob([html], { type: "application/vnd.ms-excel" });
        var downloadA = document.createElement('a');
        downloadA.href = window.URL.createObjectURL(blob);
        downloadA.download = title + ".xls";
        downloadA.click();
        window.URL.revokeObjectURL(downloadA.href);//移除！！！！

    }
}