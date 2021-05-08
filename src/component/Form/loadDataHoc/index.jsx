/**
 * Created by zhiyongwang on 2020-11-07
 * 所有下拉框的基类,专门处理数据
 * todo 
 * edit 2021-04-26
 */

import React from "react"
import utils from "../../libs/func";
import api from "wasabi-api";

/**
 * 处理函数
 */
let processFunc = {
    /*
              * 获取value,text,格式化数据，checkbox ,radio,select ,picker,treepicker
              * @param {string|number} value 选择的值
              * @param {Array} realData 数据
              * @param {string } idOrValueField id或value对应的字段
              * @param {string} textField  文本对应的字段
            * @returns 
            */
    processData(type, value, data = [], idOrValueField = "value", textField = "text") {
        if (!data) {
            return { data: [], value: value, text: "" };
        }
        let text = [];//选中的文本值
        let realData = utils.clone(data);//复制,否则影响父节点，导致重复更新
        if (realData && realData instanceof Array && realData.length > 0) {
            for (let i = 0; i < realData.length; i++) {
                if (type == "tree" || type == "treepicker") {
                    realData[i].id = realData[i] && realData[i][idOrValueField];
                }
                else {
                    realData[i].value = realData[i] && realData[i][idOrValueField];
                }
                realData[i].text = realData[i] && realData[i][textField];
                if (("," + (value || "") + ",").indexOf("," + ((type == "tree" || type == "treepicker") ? realData[i].id : realData[i].value) + ",") > -1) {
                    realData[i].checked = true;//专门用于树组件
                    text.push(realData[i] && realData[i].text);
                }
                //如果有子节点的时候.tree,treepicker,picker
                if (realData[i].children && realData[i].children.length > 0) {
                    let r = this.processTextAndData(type, value, realData[i].children, idOrValueField, textField);
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
        //返回text用于树中的半选状态，todo 后面这个函数要改成单一原则
        return { data: realData || [], text: text };
    },

    /**
 * * 设置下拉组件的文本值,用于赋值的时候
 * @param {*} value 
 * @param {*} data 
 */
    processText(value, data) {
        let text = [];//选中的文本值 
        if (data && data instanceof Array && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (("," + (value || "") + ",").indexOf("," + (data[i].value || data[i].id) + ",") > -1) {
                    text.push(data[i].text);
                }
                if (data[i].children && data[i].children.length > 0) {
                    let r = this.processText(value, data[i].children);
                    text = [].concat(r);
                }
            }
        }
        return text;

    },
}
/**
 * 预处理各类下拉框的数据
 * @param {*} ComboBoxWidget 组件
 * @param {*} type 类型
 */
function loadDataHoc(ComboBoxWidget, type = "select") {
    class loadDataHocCompnent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                rawValue: "",//原始值
                rawData: [],//原始数据,用于判断是否通过父组件强制更新数据源
                value: "",
                text: "",
                url: "",//传来的url
                params: null,//参数           
                data: [],//处理后的数据
                reloadData: false,//标记是否加载数据
                idField: this.props.idField,//for treepicker
                valueField: this.props.valueField,
                textField: this.props.textField,
            }
        }
        static getDerivedStateFromProps(props, state) {
            let newState = {};
            let tempFormatData = { data: props.data };//格式化后的数据，todo 这里的格式后期再改
            if (props.url && props.params && utils.diff(props.params, state.params)) {
                newState = {
                    reloadData: true,//标记请求数据
                    url: props.url,
                    params: utils.clone(props.params),
                }
            }
            if (props.data && props.data instanceof Array && utils.diff(props.data, state.rawData)) {
                //如果传了数据，并且发生改变
                newState.rawData = props.data;//保留原始数据,用于后期对比
                let idOrValueField = (type == "tree" || type == "treepicker") ? props.idField : props.valueField;
                tempFormatData = processFunc.processData(type, props.value, props.data, idOrValueField, props.textField);
                console.log("handler data",tempFormatData)
                newState.data = tempFormatData.data;
            }
            if (props.value != state.rawValue) {
                /**
                 * 说明父节点强行改变了传递的值,setState
                 */
                newState.value = props.value;//强行改变组件选择的值，不管状态中的值是什么
                newState.rawValue = props.value;//保留之前的值，用于下次对比
                newState.text = processFunc.processText(props.value, tempFormatData.data);//得到值
            }

            if (utils.isEmptyObject(newState)) {
                return null;
            }
            else {
                return newState;
            }
        }
        componentDidUpdate() {
            this.state.reloadData && this.reload(this.state.params, this.state.url)
        }
        componentDidMount() {
            this.state.reloadData && this.reload(this.state.params, this.state.url)
        }


        /**
         * 刷新
         * @param {*} params 
        * @param {*} url 
         */
        reload(params, url) {
            url = url || this.state.url;
            params = params || this.state.params;
            this.setState({
                reloadData: false,
                url: url,
                params: params
            })
            this.loadData(url, params);
        }

        /**
     * 加载数据
     * @param {*} url 
     * @param {*} params 
     */
        loadData(url, params) {
            if (url) {
                let fetchmodel = { type: this.props.httpType || "post", url: url, success: this.loadSuccess, data: params, error: this.loadError };
                fetchmodel.headers = this.props.httpHeaders;
                if (this.props.contentType) {
                    //如果传contentType值则采用传入的械
                    //否则默认
                    fetchmodel.contentType = this.props.contentType;
                    fetchmodel.data = fetchmodel.contentType == "application/json" ? fetchmodel.data ? JSON.stringify(fetchmodel.data) : "{}" : fetchmodel.data;
                }
                api.ajax(fetchmodel);
                console.log("combobox-fetch", fetchmodel);
            }
        }
        /**
         * 
         * @param {*} message 
         */
        loadError(message) {//查询失败
            console.log("combobox-error", message);
            Msg.error(message);
        }
        /**
         * 数据加载成功
         * @param {*} data 
         */
        loadSuccess(res) {//数据加载成功
            let realData = utils.getSource(res, this.props.dataSource || "data");
            this.setState({
                rawData: realData,//保存方便对比
                data: newData.data,
                text: newData.text.join(",")
            })
        }
        shouldComponentUpdate(nextProps, nextState) {
            if (utils.diffOrder(nextProps, this.props)) {
                return true;
            }
            if (utils.diff(nextState, this.state)) {
                return true;
            }
            return false;
        }

        render() {
            return <ComboBoxWidget {...this.props} data={this.state.data}></ComboBoxWidget>
        }
    }
    return loadDataHocCompnent;
}
export default loadDataHoc;
