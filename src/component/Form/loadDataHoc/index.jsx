/**
 * Created by wangzhiyong on 2020-11-07
 * 数据处理基类
 * edit  2022-09-16 重新简化了的，去掉了之前兼容tree组件的
 */

import React from "react";
import func from "../../libs/func";
import api from "wasabi-api";
import propsTran from "../../libs/propsTran";
/**
 * 预处理各类数据
 * @param {*} Widget 组件
 * @param {*} componentType 类型
 */
const loadDataHoc = function (Widget) {
  class loadDataHocCompnent extends React.Component {
    constructor(props) {
      super(props);
      this.input = React.createRef();
      this.state = {
        url: null,
        params: null, //参数
        rawParams: null, //原始的参数
        rawData: [], //原始数据,用于判断是否通过父组件强制更新数据源
        data: [], //处理后的数据
        loadDataStatus: null, //标记如何加载数据
        idField: this.props.idField, //for tree treepicker
        valueField: this.props.valueField,
        textField: this.props.textField,
      };
      this.handlerData = this.handlerData.bind(this);
      this.getValue = this.getValue.bind(this);
      this.setValue = this.setValue.bind(this);
      this.loadData = this.loadData.bind(this);
      this.loadSuccess = this.loadSuccess.bind(this);
      this.loadError = this.loadError.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
      let newState = {};
      if (
        props.data &&
        props.data instanceof Array &&
        func.diff(props.data, state.rawData)
      ) {
        // //如果传了数据，并且发生改变
        newState = {
          loadDataStatus: "data", //通过data加载数据
        };
        newState.rawData = func.clone(props.data, false); //保留原始数据,用于后期对比
      } else if (
        (props.url && props.url !== state.url) ||
        func.diff(props.params, state.rawParams)
      ) {
        //传的请求参数发生改变
        newState = {
          loadDataStatus: "url", //通过url加载数据
          url: props.url,
          rawParams: func.clone(props.params),
          params: func.clone(props.params),
        };
      }

      return newState;
    }
    componentDidMount() {
      this.handlerData(); //处理数据
    }
    componentDidUpdate() {
      this.handlerData(); //处理数据
    }
    /**
     * 统一加工数据
     */
    handlerData() {
      if (this.state.loadDataStatus === "url") {
        this.loadData();
      } else if (this.state.loadDataStatus === "data") {
        let formatData = propsTran.preprocessForm(
          this.state.rawData,
          this.props.valueField,
          this.props.textField
        );
        this.setState({
          data: formatData,
          loadDataStatus: null, //处理完成
        });
      }
    }
    /**
     * 加载数据
     * @param {*} url
     * @param {*} params
     */
    loadData() {
      if (this.state.url) {
        let fetchmodel = {
          type: this.props.httpType || "post",
          url: this.state.url,
          success: this.loadSuccess,
          data: this.state.params,
          error: this.loadError,
        };
        fetchmodel.headers = this.props.httpHeaders;
        fetchmodel.contentType = this.props.contentType;
        let wasabi_api = window.api || api;
        wasabi_api.ajax(fetchmodel);
        console.log("combobox-fetch", fetchmodel);
      }
    }
    /**
     *
     * @param {*} message
     */
    loadError(message) {
      //查询失败
      console.log("combobox-error", message);
      Msg.error(message);
    }
    /**
     * 数据加载成功
     * @param {*} data
     */
    loadSuccess(res) {
      //数据加载成功
      if (typeof this.props.loadSuccess === "function") {
        //有正确处理的数据
        let resData = this.props.loadSuccess(res);
        res = resData && resData instanceof Array ? resData : res;
      }
      let realData = func.getSource(res, this.props.dataSource || "data");
      let formatData = propsTran.preprocessForm(
        realData,
        this.props.valueField,
        this.props.textField
      );
      this.setState({
        loadDataStatus: null,
        rawData: realData, //保存方便对比
        data: formatData,
      });
    }

    //以下方法方便给父组件，ref调用
    /**
     *
     * @param {*} value
     */
    setValue(value) {
      this.input.current &&
        this.input.current.setValue &&
        this.input.current.setValue(value);
    }
    /**
     * 获取值
     * @returns
     */
    getValue() {
      return (
        this.input.current &&
        this.input.current.getValue &&
        this.input.current.getValue()
      );
    }

    render() {
      return (
        <Widget
          {...this.props}
          ref={this.input}
          data={this.state.data}
        ></Widget>
      );
    }
  }
  
  return loadDataHocCompnent;
};
export default loadDataHoc;
