/**
 * 将组件中属性的转换的方法独立出来
 * date:2020-11-06
 * wangzhiyong
 */
import func from "./func";
import regs from "../Lang/regs.js";
let propsTran = {

    /**
     * 设置下拉组件的初始化数据，checkbox ,radio,select ,picker,treepicker
     * @param {*} value 选择的值
     * @param {*} realData 数据
     * @param {*} idOrValueField id或value对应的字段
     * @param {*} textField  文本对应的字段
     */
    setComboxValueAndText(type, value, data, idOrValueField = "value", textField = "text") {

        if(!data){
            return [];
        }
        let text = [];//选中的文本值
        let realData = func.clone(data);//复制,否则影响父节点，导致重复更新
        if (realData && realData instanceof Array && realData.length > 0) {
            for (let i = 0; i < realData.length; i++) {
                if (type == "tree" || type == "treepicker") {
                    realData[i].id =realData[i]&& realData[i][idOrValueField];
                }
                else {
                    realData[i].value = realData[i]&&realData[i][idOrValueField];
                }
                realData[i].text = realData[i]&&realData[i][textField];
                if (("," + (value || "") + ",").indexOf("," + ((type == "tree" || type == "treepicker") ? realData[i].id : realData[i].value) + ",") > -1) {
                    realData[i].checked = true;//专门用于树组件
                    text.push(  realData[i]&& realData[i].text);
                }
                //如果有子节点的时候.tree,treepicker,picker
                if (realData[i].children && realData[i].children.length > 0) {
                    let r = propsTran.setComboxValueAndText(type, value, realData[i].children, idOrValueField, textField);
                    realData[i].children = r.data;
                    if (r.text.length > 0) {
                        //专门用于树组件，父节点
                        if (!realData[i].checked) {
                            realData[i].checkValue = "half";//处理半选状态,todo
                        }
                    }
                    text = [].concat(text, r.text);

                }
            }
        }


        return { data: realData || [], text: text };
    },

    /**
     * * 设置下拉组件的文本值,用于赋值的时候
     * @param {*} value 
     * @param {*} data 
     */
    setComboxText(value, data) {
        let text = [];//选中的文本值 
        if (data && data instanceof Array && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (("," + (value || "") + ",").indexOf("," + (data[i].value || data[i].id) + ",") > -1) {
                    text.push(data[i].text);
                }
                if (data[i].children && data[i].children.length > 0) {
                    let r = propsTran.setComboxText(value, data[i].children);
                    text = [].concat(r);
                }
            }
        }
        return text;

    },
    /**
     * 全选,为treepicker设置
     * @param {*} value 
     * @param {*} data 
     */
    getComboxValueAll(data) {
        let values = [];
        let texts = [];
        if (data && data instanceof Array && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                values.push(data[i].id);
                texts.push(data[i].text);
                if (data[i].children && data[i].children.length > 0) {
                    let r = propsTran.getComboxValueAll(data[i].children);
                    values = [].concat(r.values);
                    texts = [].concat(r.texts)
                }
            }
        }
        return {
            values: values,
            texts: texts
        };

    },
    /**
   * 时间范围组件
   * @param {*} props 
   */
    setDateRangeDefaultState(props) {
        //先设置默认值的，再判断用户是否有输入值
        let newDate = new Date();
        //设置第一日期的值
        let firstDate = props.firstDate;//给的第一个值
        let firstTime = props.type == "daterange" ? "" : props.firstTime || func.dateformat(newDate, "HH:mm:ss");
        //先设置默认值
        let first_year = newDate.getFullYear();
        let first_month = newDate.getMonth() + 1;

        let first_day = "";
        let first_rangeBegin = "";
        let first_rangeEnd = "";

        //格式化第一个值
        if (firstDate && firstDate.indexOf(" ") > -1 && regs.datetime.test(firstDate)) {//有时间
            firstDate = props.firstDate.split(" ")[0];
        }
        else if (regs.date.test(firstDate)) {//正规的日期格式

        }
        else {
            firstDate = "";

        }
        if (firstDate) {//第一个日期有值，设置
            first_year = firstDate.split("-")[0] * 1;
            first_month = firstDate.split("-")[1] * 1;
            first_day = firstDate.split("-")[2] * 1;
        }


        //设置第二日期的值
        let secondDate = props.secondDate;//给的第二日期值，字符串
        let secondTime = props.type == "daterange" ? "" : props.secondTime || func.dateformat(newDate, "HH:mm:ss");
        //先设置默认值
        let second_year = first_year; //默认与第一个同年
        let second_month;
        let second_day = null;
        let second_rangeBegin = null;
        let second_rangeEnd = null;
        second_month = parseInt(first_month) + 1;//加一个月
        if (second_month > 12) {
            second_year++;
            second_month = 1;
        }

        //格式化第二个值
        if (secondDate && secondDate.indexOf(" ") > -1 && regs.datetime.test(secondDate)) {//有时间
            secondDate = props.secondDate.split(" ")[0];
        }
        else if (secondDate && regs.date.test(secondDate)) {//正规的日期格式
        }
        else {
            secondDate = "";
        }
        if (secondDate) {//第二个输入了值
            if (secondDate.split("-")[0] == first_year && secondDate.split("-")[1] * 1 == first_month) {//第二个日期与第一日期在同一个月
                first_rangeEnd = secondDate.split("-")[2] * 1 > first_day ? secondDate.split("-")[2] * 1 : first_day;
                first_rangeBegin = first_day;

            }
            else if (secondDate.split("-")[0] < first_year && secondDate.split("-")[1] * 1 < first_month) {//第二个日期小于第一日期
                console.log("日期范围格式不正确");
            }
            else {//其他情况。tooo 小于的情况没有考虑，暂时不处理
                second_year = secondDate.split("-")[0] * 1;
                second_month = secondDate.split("-")[1] * 1;
                second_rangeEnd = second_day = secondDate.split("-")[2] * 1;
                second_rangeBegin = 1;//第二个的开始就是第一天
                //第一个日期的开始就是 选中，结束是最大的
                first_rangeBegin = first_day;
                first_rangeEnd = 31;
            }
        }
        else {//第二日期没有值
            first_rangeBegin = first_rangeEnd = first_day;
        }
        return {
            oldPropsValue: (props.firstDate || "") + (props.firstTime || "") + (props.secondDate || "") + (props.secondTime || ""),//保存旧值，用于更新
            first_year: first_year,
            first_month: first_month,
            first_day: first_day,
            first_rangeBegin: first_rangeBegin,
            first_rangeEnd: first_rangeEnd,
            firstTime: firstTime,
            second_year: second_year,
            second_month: second_month,
            second_day: second_day,
            second_rangeBegin: second_rangeBegin,
            second_rangeEnd: second_rangeEnd,
            secondTime: secondTime,
        }
    },

    /**
     * 树筛选
     * @param {*} filterText 
     * @param {*} data 
     */
    treeFilter(filterText, data) {

       let  filterResult = [];
          data && data.forEach((item, index) => {
            if (item.children && item.children.length > 0) {
                let result = propsTran.treeFilter(filterText, item.children);
                if (result.length > 0) {
                    filterResult.push( {
                        ...item,
                        children: result
                    })
                }
            }
            else {
                if (item.text.indexOf(filterText) > -1) {
                    filterResult.push({...item})
                }
            }

        })
        return filterResult;
    }

}
export default propsTran;