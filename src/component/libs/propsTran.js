/**
 * 将组件中属性的转换的方法独立出来
 * date:2020-11-06
 * wangzhiyong
 */
import func from "./func";
import regs from "../Lang/regs.js";
let tran = {
    /**
     * 将后台数据转换标准格式
     * @param {*} data 
     * @param {*} valueField 
     * @param {*} textField 
     */
    setValueAndText(data, valueField = "value", textField = "text") {
        let realData = func.clone(data);
        if (realData && realData instanceof Array) {

            for (let i = 0; i < realData.length; i++) {
                realData[i].text = realData[i][textField ? textField : "text"];
                realData[i].value = realData[i][valueField ? valueField : "value"];

            }

        }

        return realData||[];
    },
    /**
     * 将树节点转换
     * @param {*} data 
     */
    setidAndText(data, idField = "id", textField = "text", simpleData = false) {//遍历设置text，id的值
        let realData = func.clone(data);//
        if (realData instanceof Array) {
            for (let i = 0; i < realData.length; i++) {
                realData[i].text = realData[i][textField ? textField : "text"];
                realData[i].id = realData[i][idField ? idField : "id"];
                if (realData[i].children) {
                    realData[i].children = tran.setidAndText(realData[i].children);
                }
            }

        }
        if (simpleData) {//简单的json数据格式
            realData = func.toTreeData(realData);//转成树结构
        }

        return realData;
    },
    /**
     * 时间范围组件
     * @param {*} props 
     */
    setDateRangeDefaultState(props) {
        //先设置默认值的，再判断用户是否有输入值

        var newDate = new Date();
        var first_year = newDate.getFullYear();
        var first_month = newDate.getMonth() + 1;
        var first_day = "";
        let first_min = ""; let first_max = "";
        let second_min = ""; let second_max = "";
        var firstDate = props.firstDate;

        if (firstDate && firstDate.indexOf(" ") > -1 && regs.datetime.test(firstDate)) {//有时间
            firstDate = props.firstDate.split(" ")[0];
        }
        else if (regs.date.test(firstDate)) {//正规的日期格式

        }
        else {
            firstDate = "";

        }
        if (firstDate) {
            first_year = firstDate.split("-")[0] * 1;
            first_month = firstDate.split("-")[1] * 1;
            first_day = firstDate.split("-")[2] * 1;
        }
        //设置第二日期的默认值
        var second_year = first_year; var second_month; var second_day = "";
        second_month = parseInt(first_month) + 1;
        if (second_month > 12) {
            second_year++;
            second_month = 1;
        }
        else {

        }
        //第二个日期
        var secondDate = props.secondDate;
        if (secondDate && secondDate.indexOf(" ") > -1 && regs.datetime.test(secondDate)) {//有时间
            secondDate = props.secondDate.split(" ")[0];
        }
        else if (secondDate && regs.date.test(secondDate)) {//正规的日期格式

        }
        else {
            secondDate = "";


        }
        if (secondDate) {//输入了值
            if (secondDate.split("-")[0] * 1 > first_year || secondDate.split("-")[1] * 1 > first_month) {//不相等才赋值
                second_year = secondDate.split("-")[0] * 1;
                second_month = secondDate.split("-")[1] * 1;
                second_max = second_day = secondDate.split("-")[2] * 1;
                second_min = 1;
                first_min = first_day;
                first_max = 31;
            }
            else if (secondDate.split("-")[0] * 1 == first_year || secondDate.split("-")[1] * 1 == first_month) {//不相等才赋值

                first_max = secondDate.split("-")[2] * 1;
                first_min = first_day;
            }
        }
        else {//第二日期没有值
            first_min = first_max = first_day;
        }
        return {
            first_year: first_year,
            first_month: first_month,
            first_day: first_day,
            first_min: first_min,
            first_max: first_max,
            second_year: second_year,
            second_month: second_month,
            second_day: second_day,
            second_min: second_min,
            second_max: second_max,
        }
    },
    /**
     * treepicker
     * @param {*} value 
     * @param {*} data 
     */
    treePickerInitData(value, data) {
        let text = [];
        value = "," + (value || "") + ",";
        if (data && data instanceof Array && data.length > 0) {

            for (let i = 0; i < data.length; i++) {
                if (value.indexOf("," + data[i].id + ",") > -1) {
                    data[i].checked = true;
                    text.push(data[i].text || data[i][this.props.textField]);
                }
                if (data[i].children && data[i].children.length > 0) {
                    let r =tran. treePickerInitData(value, data[i].children);
                    data[i].children = r.data;
                    if (r.text.length > 0) {
                        //父节点
                        if (!data[i].checked) {
                            data[i].checkValue = "half";
                            console.log(data, "data")
                        }
                    }
                    text = [].concat(text, r.text);

                }
            }
        }

        return { data: data || [], text: text };
    }

}
export default tran;