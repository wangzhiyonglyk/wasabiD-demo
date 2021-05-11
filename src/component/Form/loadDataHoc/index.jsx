/**
 * Created by zhiyongwang on 2020-11-07
 * 所有下拉框的基类,专门处理数据
 * todo 
 * edit 2021-04-26
 */

import React from "react"
import utils from "../../libs/func";
import api from "wasabi-api";
import propsTran from "../../libs/propsTran";
/**
 * 预处理各类下拉框的数据
 * @param {*} ComboBoxWidget 组件
 * @param {*} type 类型
 */
function loadDataHoc(ComboBoxWidget, type = "select") {
    class loadDataHocCompnent extends React.Component {
        constructor(props) {
            super(props);
            this.input = React.createRef();
            this.state = {
                url: "",//传来的url
                params: null,//参数  
                rawData: [],//原始数据,用于判断是否通过父组件强制更新数据源         
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
                let idOrValueField = (type == "treepicker") ? props.idField : props.valueField;
                tempFormatData = propsTran.processData(type, props.value, props.data, idOrValueField, props.textField);
                console.log("handler data", tempFormatData)
                newState.data = utils.clone(tempFormatData.data);
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

        setValue(value) {
            this.input.current.setValue && this.input.current.setValue(value);
        }
        getValue() {
            return this.input.current.getValue();
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
                window.wasabi_api = window.wasabi_api || api;
                window.wasabi_api.ajax(fetchmodel);
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
                reloadData: false,
                rawData: realData,//保存方便对比
                data: realData,
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
            return <ComboBoxWidget {...this.props}
                type={type}
                ref={this.input}
               data={this.state.data}
            ></ComboBoxWidget>
        }
    }
    return loadDataHocCompnent;
}
export default loadDataHoc;
