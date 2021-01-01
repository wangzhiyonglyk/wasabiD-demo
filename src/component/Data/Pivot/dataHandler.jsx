/**
 * create by wangzhiyong
 * date:2020-12-21
 * desc 交叉表中，对数据加工，生成渲染的数据模型
 */
import func from "../../libs/func"
import Columns from "./Configuration/Columns";
export default {

    /**
     * 生成所需要的数据模型
     * @param {*} columns 列纬度
     * @param {*} rows 行纬度
     *  @param {*} values 统计列
     * @param {*} data 数据
     */
    setData(columns = [], rows = [], values = [], data = []) {
        this.setHeaders(columns, values, data);
    },
    /**
     * 生成列纬度的表头
     * @param {*} columns 列纬度
     * @param {*} values 统计列
     * @param {*} data 数据
     */
    setHeaders(columns = [], values = [], data = []) {
        /**
        * 有多少个列纬度，就应该表头有多少行，另外一个统计指标的行，就是表头全部的行
         */
        let headers = [];//列表头
        for (let col = 0; col < columns.length + 1; col++) {
            //根据列纬度的分组，添加一行
            headers.push([])
        };
        let newData = [];//最终的表格正体中的数据
        for (let i = 0; i < data.length; i++) {
            let colnamestr = [];//用于表头列的关键字,包括前面列纬度的值总和，才是当前列的字段关键字
            for (let col = 0; col < columns.length; col++) {
                colnamestr.push(data[i][columns[col].name] || "");//保存前面加当前的，用于最终数据列取值的对应的字段name
                //处理列
                if (headers[col].filter(item => { return item.name == colnamestr.join("-") }) == 0) {
                    //没有添加此列
                    headers[col].push({
                        label: data[i][columns[col].name] || "",//列显示的名
                        name: colnamestr.join("-"),//列名，不会对应具体的数据列
                    });//添加一个列
                }
            }
            //处理数据行的列
            for (let v = 0; v < values.length; v++) {
                if (headers[columns.length].filter(item => { return item.name == (colnamestr.join("-") + "-" + values[v].name) }) == 0) {
                    headers[columns.length].push({
                        label: values[v].label + "(" + values[v].collectName + ")",//列显示的名
                        name: colnamestr.join("-") + "-" + values[v].name,//会对应具体的数据列，
                        colSpan: 1,//数据行的列，只占一列
                    });//添加一个列
                }

            }
        }
        //排序 todo 此处要改进
        for (let col = 0; col < columns.length + 1; col++) {
            //冒泡
            for (let i = 0; i < headers[col].length - 1; i++) {
                for (let j = 0; j < headers[col].length - i - 1; j++) {
                    if (headers[col][j].name > headers[col][j + 1].name) {
                        let temp = headers[col][j];
                        headers[col][j] = headers[col][j + 1];
                        headers[col][j + 1] = temp;
                    }
                }
            }
        }
        //计算所跨列数
        for (let col = 0; col < columns.length; col++) {
            for (let i = 0; i < headers[col].length; i++) {
                let colSpan = 0;
                for (let j = 0; j < headers[columns.length].length; j++) {//通过最后一行数据行来判断
                    if (headers[columns.length][j].name.indexOf(headers[col][i].name) > -1) {
                        colSpan++;
                    }
                }
                headers[col][i].colSpan = colSpan;
            }
        }
        console.log("header", headers);
    },

    /**
     * 生行纬度的树
     * @param {*} rows 
     * @param {*} data 
     */
    setRowsTree(rows = [], data = []) {
        let rowsTreeData = [];
        //生成简单的数据结构放入tree,就可以了
        for (let i = 0; i < data.length; i++) {
            let obj = {
            }
            let rowidstr="";//用于树组件
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                //
                // if(rowsTreeData.filter(item=>item.id==)


            }
        }
    }
}