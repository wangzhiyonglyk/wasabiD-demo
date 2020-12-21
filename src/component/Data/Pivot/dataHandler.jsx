/**
 * create by wangzhiyong
 * date:2020-12-21
 * desc 交叉表中，对数据加工，生成渲染的数据模型
 */
import func from "../../libs/func"
import Columns from "./Configuration/Columns";
export default {

    /**
     * 列维度的表头数据模型与行维度的树组件数据模型
     * @param {*} columns 
     * @param {*} rows 
     * @param {*} data 
     */
    setRowsAndColumns(columns, rows, data) {
        console.log(1)
        if (data && data instanceof Array) {
            for (let i = 0; i < data.length; i++) {
                for (let c = 0; c < columns.length; c++) {
                    if (!columns[c].data) { columns[c].data = [] };
                    if (columns[c].data.indexOf(data[i][columns[c].name]) <= -1) {
                        columns[c].data.push(data[i][columns[c].name]);//插入
                    }

                }

                for (let r = 0; r < rows.length; r++) {
                    if (!rows[r].data) { rows[r].data = [] };
                    if (rows[r].data.indexOf(data[i][rows[r].name]) <= -1) {
                        rows[r].data.push(data[i][rows[r].name]);//插入
                    }

                }
            }

        }
        console.log(columns)
        this.setDataHeader(columns);
    },
    /**
     * 将列数据转成多行表头
     * @param {*} columns 
     */
    setDataHeader(columns) {
        let headers = [];
        for (let i = 0; i < columns.length; i++) {
            if (i == 0) {
                headers.push(this.pushHeaderTr([], columns[i]))
            } else {
                headers.push(this.pushHeaderTr(headers[i - 1], columns[i]))
            }
        }
        //设置所占的列数

        for(let i=0;i<headers.length-1;i++){
            if(headers[i].length>0){
                let colSpan=headers[headers.length-1].length/headers[i].length;
               
                for(let j=0;j<headers[i].length;j++){
                    headers[i][j].colSpan=colSpan;
                }
            }
          
        }
     console.log("eh",headers)
        return headers;
    },

    /**
     * 生成当前行的表头
     * @param {*} preTr 上一行的表头
     * @param {*} columnsData 下一行的行数据
     */
    pushHeaderTr( preTr, columnsData) {
        let tr = []
        if (preTr.length==0) {
            for (let i = 0; i < columnsData.data.length; i++) {
                tr.push({
                    name:  columnsData.data[i],
                    label: columnsData.data[i],
                    colSpan: 1,//默认设置
                })
            }
        }
        else {
            for (let i = 0; i < preTr.length; i++) {
                for (let j = 0; j < columnsData.data.length; j++) {
                    tr.push({
                        name:  preTr[i].name+ "-" + columnsData.data[j],
                        label: columnsData.data[j],
                        colSpan: 1,//默认设置
                    })
                }
            }
        }
        return tr;
    }
}