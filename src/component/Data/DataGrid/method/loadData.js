/**
 * create by wangzhiyonglyk
 * date:2021-12-28
 * desc:将分页加载数据独立出来
 *
 */

import func from "../../../libs/func/index.js";
import Msg from "../../../Info/Msg.jsx";
import api from "wasabi-api";
import config from "../config.js";
import { dataFilter, dataSort } from "./datafunc.js";
export default {
  /**
   * 处理表格可视化数据
   * @returns
   */
  handlerGridVisibleData() {
    if (this.state.urlLoadData) {
      //需要请求数据
      this.reload(); //调用
      return;
    }
    if (this.state.needVirtualHandler) {
      this.initVirtual(); //需要虚拟列表
      return;
    }
    if (this.state.visibleData?.length > 0) {
      //只是调整宽高，用于表格自适应
      this.adjustvirtual();
    }
  },
  /**
   * 分页加载数据
   * @param {*} url 请求的url
   * @param {*} pageSize 分页大小
   * @param {*} pageIndex 页号
   * @param {*} sortName  排序字段
   * @param {*} sortOrder  排序方式
   * @param {*} params 参数，从父组件额外传过来的，（props，或者reload方法）
   *@param {*} filters 头部选择的过滤条件
   */
  loadData: function (
    url,
    pageSize,
    pageIndex,
    sortName,
    sortOrder,
    params,
    filters
  ) {
    ////数据处理函数,更新
    // 在有后端接口时，如果要更新数据，则需要提示
    if (
      this.props.url &&
      (this.state.addData.size > 0 ||
        this.state.deleteData.size > 0 ||
        this.state.updateData.size > 0)
    ) {
      Msg.confirm("数据有变动还未提交,是否继续?", () => {
        this.loadDataConfirm(
          url,
          pageSize,
          pageIndex,
          sortName,
          sortOrder,
          params,
          filters
        );
      });
    } else {
      this.loadDataConfirm(
        url,
        pageSize,
        pageIndex,
        sortName,
        sortOrder,
        params,
        filters
      );
    }
  },

  /**
   * 更新确认函数
   * @param {*} url 请求的url
   * @param {*} pageSize 分页大小
   * @param {*} pageIndex 页号
   * @param {*} sortName  排序字段
   * @param {*} sortOrder  排序方式
   * @param {*} params 参数，从父组件额外传过来的，（props，或者reload方法）
   *@param {*} filters 头部选择的过滤条件
   */
  loadDataConfirm: function (
    url,
    pageSize,
    pageIndex,
    sortName,
    sortOrder,
    params,
    filters
  ) {
    /*
     url与params而url可能是通过reload方法传进来的,并没有作为状态值绑定
     headers可能是后期才传了,见Page组件可知
     所以此处需要详细判断
     */

    //给默认值,查询条件不行，因为有清空的查询条件的情况
    url = url ?? this.state.url;
    pageSize = pageSize ?? this.state.pageSize;
    pageIndex = pageIndex ?? this.state.pageIndex;
    sortName = sortName ?? this.state.sortName;
    sortOrder = sortOrder ?? this.state.sortOrder;
    filters = filters ?? this.state.filters;

    if (url) {
      this.setState({
        urlLoadData: false, // 开始查询，设置为false,防止重复更新
        loading: true, // 加载状态
        url: url, //更新,有可能从reload那里直接改变了url
      });
      let httpParams = { ...params }; //本次请求的参数
      if (filters) {
        for (let key in filters) {
          httpParams[key] = filters[key].value;
        }
      }

      if (this.props.pagination == true) {
        //追加这四个参数
        httpParams.pageSize = pageSize;
        httpParams.pageIndex = pageIndex;
        httpParams.sortName = sortName;
        httpParams.sortOrder = sortOrder;
      }

      /*
             在查询失败后可能要继续调用loadData查询前一页数据,所以传url,以便回调,
             而pageSize,pageIndex,sortName,sortOrder,params这些参数在查询成功后再更新
             所以回传
             */
      let fetchmodel = {
        url: url,
        data: httpParams,
        success: this.loadSuccess.bind(
          this,
          url,
          pageSize,
          pageIndex,
          sortName,
          sortOrder,
          params,
          filters
        ),
        error: this.loadError,
        type: this.props.httpType ? this.props.httpType.toUpperCase() : "POST",
        headers: this.props.httpHeaders || {},
        contentType: this.props.contentType || null,
      };
      console.log("datagrid-开始查询:", fetchmodel);
      let wasabi_api = window.api || api;
      wasabi_api.ajax(fetchmodel);
    } else if (typeof this.props.onUpdate === "function") {
      // 父组件有更新事件,父组件自行更新
      this.props.onUpdate(pageSize, pageIndex, sortName, sortOrder, httpParams);
    } else {
      let data = this.state.rawData;

      if (filters !== this.state.filters) {
        // 有过滤
        data = dataFilter(data, filters);
      }
      if (
        this.state.sortName !== sortName ||
        this.state.sortOrder !== sortOrder
      ) {
        // 说明是本地重新排序
        data = dataSort(this.state.rawData, sortName, sortOrder);
      }
      // 可见数据
      let visibleData;
      // 如果有分页则重新切割
      if (this.props.pagination) {
        visibleData = data.slice(
          (pageIndex - 1) * pageSize,
          pageIndex * pageSize
        );
      } else {
        // 不分页，如果有虚拟列表则设置
        visibleData = data.length < config.minDataTotal ? data : [];
      }
      this.setState({
        loading: false,
        data: data,
        visibleData: visibleData,
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortName,
        sortOrder,
        filters: filters,
        //分页或小于配置值则不设置，其他则重新设置虚拟列表
        needVirtualHandler: this.props.pagination
          ? null
          : data?.length < config.minDataTotal
          ? null
          : true,
      });
    }
  },
  /**
   * 加载成功事件
   * @param {*} url
   * @param {*} pageSize
   * @param {*} pageIndex
   * @param {*} sortName
   * @param {*} sortOrder
   * @param {*} params
   * @param {*} result
   */
  loadSuccess(url, pageSize, pageIndex, sortName, sortOrder, params, result) {
    //数据加载成功

    let dataResult; //最终数据
    let totalResult; //最终总共记录
    let footerResult; //最终统计数据

    //找到数据源
    if (typeof this.props.loadSuccess === "function") {
      //如果父组件指定了数据加载后的方法，先执行，然后再处理数据
      let resultData = this.props.loadSuccess(result);
      //有正确的返回值
      dataResult = Array.isArray(resultData) ? resultData : result;
    } else if (this.props.dataSource) {
      //需要重新指定数据源
      dataResult = func.getSource(result, this.props.dataSource || "data");
    }
    //找到总记录数
    if (this.props.pagination && this.props.totalSource) {
      //分页而且需要重新指定总记录数的数据源
      totalResult = func.getSource(result, this.props.totalSource || "total");
    } else if (this.props.pagination) {
      //分页了,没有指定,使用默认的
      if (result.total) {
        totalResult = result.total;
      } else {
        totalResult = dataResult.length;
        throw "datagrid分页了,但返回的数据没有指定total";
      }
    } else {
      //不分页
      totalResult = dataResult.length;
    }

    if (this.props.footerSource) {
      //需要重新指定页脚的数据源
      footerResult = func.getSource(
        result,
        this.props.footerSource || "footer"
      );
    } else {
      //没有指定，
      if (result.footer) {
        footerResult = result.footer; //默认的
      } else {
      }
    }
    this.setState({
      url: url,
      pageSize: pageSize,
      params: params,
      pageIndex: pageIndex,
      sortName: sortName,
      sortOrder: sortOrder,
      data: dataResult,
      // 从后台取的数据，不判断数据是否超过了一页，不分页时，判断是否
      visibieData: this.props.pagination
        ? dataResult
        : dataResult?.length < config.minDataTotal
        ? dataResult
        : [], // 需要设置虚拟列表时，则设置为空
      total: totalResult,
      footer: footerResult,
      loading: false,
      detailIndex: null, //重新查询要清空详情
      detailView: null,
      //分页或小于配置值则不设置，其他则重新设置虚拟列表
      needVirtualHandler: this.props.pagination
        ? null
        : dataResult?.length < config.minDataTotal
        ? null
        : true,
      // 取消全选
      checkedData: new Map(),
      isCheckedAll: isCheckedAll,
    });
  },

  /**
   * 加载失败
   * @param {*} message
   */
  loadError: function (message) {
    //查询失败
    console.log("datagrid-error", message);
    Msg.error(message);
    this.setState({
      loading: false,
    });
  },
};
