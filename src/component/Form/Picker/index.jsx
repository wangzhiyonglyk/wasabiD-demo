/*
 create by wangzhiyonglyk
 date:2016-05-23
 desc:级联选择组件
 采用了es6语法
 edit 2017-08-17
 */
import React from "react";
import func from "../../libs/func/index.js";
import loadDataHoc from "../loadDataHoc";
import ValidateHoc from "../ValidateHoc";
import PickerInput from "./PickerInput";
import propTypes from "../propsConfig/propTypes.js";
import api from "wasabi-api";
import ComboBox from "../ComboBox/Base.jsx";
import "./picker.css";
/**
 * 热门选择
 */
function HotView(props) {
  const { data, hotTitle, activeHot } = props;
  if (data && data instanceof Array && data.length > 0) {
    return (
      <div>
        <div className="hot-wrap">
          <p style={{ display: hotTitle ? "block" : "none" }}>{hotTitle}</p>
          <ul>
            {data.map((item, index) => {
              return (
                <li
                  key={"hot" + item.text}
                  className="hot-item"
                  onClick={activeHot.bind(this, item.value, item.text, item)}
                  title={item.text}
                >
                  {item.text}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="line"> </div>
      </div>
    );
  } else {
    return null;
  }
}
/**
 * 一级节点
 */
function ProvinceView(props) {

  const {
    data,
    activeProvince,
    provinceActiveIndex,
    activeCity,
    cityActiveIndex,
    distinctActiveIndex,
    activeDistinct,
  } = props;
  let provinceComponents = [];
  if (data && data instanceof Array && data.length > 0) {
    data.map((child, index) => {
  
      provinceComponents.push(
        <li
          key={"province" + index}
          className={"picker-container  " + (child.expand ? "expand" : "")}
        >
          <ul
            className="picker-container-wrap"
            style={{
              display:
                child.children && child.children.length > 0 && child.expand
                  ? "block"
                  : "none",
            
            }}
          >
            <CityView
              data={child.children}
              provinceActiveIndex={provinceActiveIndex}
              activeCity={activeCity}
              cityActiveIndex={cityActiveIndex}
              activeDistinct={activeDistinct}
              distinctActiveIndex={distinctActiveIndex}
            ></CityView>
          </ul>
          {child.children && child.children.length > 0 ? (
            <div
              className={
                "picker-container-name " +
                (child.children && child.children.length > 0 && child.expand
                  ? "expand"
                  : "")
              }
              onClick={activeProvince.bind(
                this,
                index,
                child.value ?? "",
                child
              )}
              title={child.text}
            >
              {child.text}
            </div>
          ) : (
            <div
              key={"province" + index}
              className={
                "pickeritem  " +
                (provinceActiveIndex === index ? "expand" : "")
              }
              onClick={activeProvince.bind(
                this,
                index,
                child.value ?? "",
                child
              )}
              title={child.text}
            >
              {child.text}
            </div>
          )}
        </li>
      );
    });
    return provinceComponents;
  } else {
    return null;
  }
}
/**
 * 二级节点
 */
function CityView(props) {
  const {
    data,
    provinceActiveIndex,
    activeCity,
    cityActiveIndex,
    distinctActiveIndex,
    activeDistinct,
  } = props;

  let cityComponents = [];
  if (data && data instanceof Array && data.length > 0) {
    data.map((child, index) => {
      let left = (index % 4) * -80; //todo
      if (index % 4 == 0) {
        left = -14;
      }
      cityComponents.push(
        <li
          key={"city" + index}
          className={"picker-container  " + (child.expand ? "expand" : "")}
        >
          <ul
            className="picker-container-wrap"
            style={{
              display:
                child.children && child.children.length > 0 && child.expand
                  ? "block"
                  : "none",
              left: left,
            }}
          >
            <DistinctView
              data={child.children}
              distinctActiveIndex={distinctActiveIndex}
              activeDistinct={activeDistinct}
            ></DistinctView>
          </ul>
          {child.children && child.children.length > 0 ? (
            <div
              className={
                "picker-container-name  " + (child.expand ? "expand" : "")
              }
              onClick={activeCity.bind(
                this,
                provinceActiveIndex,
                index,
                child.value ?? "",
                child
              )}
              title={child.text}
            >
              {child.text}
            </div>
          ) : (
            <div
              key={"city" + index}
              className={
                "pickeritem  " + (cityActiveIndex === index ? "expand" : "")
              }
              onClick={activeCity.bind(
                this,
                provinceActiveIndex,
                index,
                child.value ?? "",
                child
              )}
              title={child.text}
            >
              {child.text}
            </div>
          )}
        </li>
      );
    });
    return cityComponents;
  } else {
    return null;
  }
}
/**
 * 三级节点
 */
function DistinctView(props) {
  const { data, distinctActiveIndex, activeDistinct } = props;
  let distinctComponents = [];
  if (data && data instanceof Array && data.length > 0) {
    data.map((child, index) => {
      distinctComponents.push(
        <li
          key={"distinct" + index}
          className={
            "pickeritem " + (distinctActiveIndex === index ? "expand" : "")
          }
          onClick={activeDistinct.bind(this, index, child)}
          title={child.text}
        >
          {child.text}
        </li>
      );
    });
    return distinctComponents;
  } else {
    return null;
  }
}

class Picker extends ComboBox {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
  
      provinceActiveIndex: null, //一级激活节点下标
      cityActiveIndex: null, //二级激活节点下标
      distinctActiveIndex: null, //三级激活节点下标

      //其他属性，二级三级节点的加载属性
      secondParams: this.props.secondParams,
      secondParamsKey: this.props.secondParamsKey,
      thirdParams: this.props.thirdParams,
      thirdParamsKey: this.props.thirdParamsKey,
    };
   
    this.onChange = this.onChange.bind(this);
    this.activeHot = this.activeHot.bind(this);
    this.activeProvince = this.activeProvince.bind(this);
    this.activeCity = this.activeCity.bind(this);
    this.activeDistinct = this.activeDistinct.bind(this);
    this.foldChildren = this.foldChildren.bind(this);
    this.loadCitySuccess = this.loadCitySuccess.bind(this);
  }
  
  /**
   * 输入框的change事件,过滤
   * @param {*} event
   */
  onChange(event) {
   let  data=this.state.data;
    if(event.target.value.trim()){
    const {filterData,unFilterData}=  this.filter(this.state.data, event.target.value.trim());
    data=filterData.concat(unFilterData);
    }
    this.setState({
      inputText: event.target.value.trim(),
      value: event.target.value.trim(),
      text: event.target.value.trim(),
      data: data
    });
    this.props.onChange && this.props.onChange(event);
  }

  /**
   * 搜索匹配,只匹配第一层节点，其他节点通过
   * @param {*} data
   * @param {*} fitlerValue
   */
  filter(data, fitlerValue) {
    if(fitlerValue){
 const filterData=[],unFilterData=[];  
    data.forEach((item) => {
      if (
        (item.value ?? "").toString().indexOf(fitlerValue) > -1 ||
        (item.text ?? "").toString().indexOf(fitlerValue) > -1
      ) {   
        filterData.push(item);
      } else if (item.children && item.children.length>0) {
        let result = this.filter(item.children, fitlerValue);
        if (result.filterData.length > 0) { 
          filterData.push(item);
          
        }else{   
          unFilterData.push(item)
        }
      }
      else {
           unFilterData.push(item);
      }
    });
  
 return {filterData,unFilterData}
  }
    }
 
  activeHot(value, text, row) {
    this.setState({
      show: false,
      value: value,
      text: text,
      inputText: text,
   
    });

    this.props.onSelect &&
      this.props.onSelect(value, text, this.props.name, row);
  }
  foldChildren(data) {
    //将节点折叠起来
    for (let index = 0; index < data.length; index++) {
      data[index].expand = false;
      if (data[index].children && data[index].children instanceof Array) {
        data[index].children = this.foldChildren(data[index].children); //遍历
      }
    }
    return data;
  }
  activeProvince(
    currentProvinceIndex,
    currentProvinceValue,
    currentProviceData
  ) {
    //一级节点激活
    let show = true;
    let newData = this.state.data;
    let selectValue = this.state.value;
    let selectText = this.state.text;
    let inputText = this.state.inputText;
    if (this.state.provinceActiveIndex === currentProvinceIndex) {
      //当前节点为激活节点
      if (
        newData[currentProvinceIndex].children instanceof Array &&
        newData[currentProvinceIndex].children.length > 0
      ) {
        //有子节点则不执行选中事件
        let expand = newData[currentProvinceIndex].expand;
        newData = this.foldChildren(newData); //折叠子节点
        newData[currentProvinceIndex].expand = !expand; // 折叠节点
      } else {
        //没有则立即执行选中事件
        selectValue = newData[currentProvinceIndex].value;
        selectText = newData[currentProvinceIndex].text;
        inputText = selectText;
        show = false;
     
        this.props.onSelect &&
          this.props.onSelect(
            selectValue,
            selectText,
            this.props.name,
            currentProviceData
          );
      }

      this.setState({
        show: show,
        value: selectValue,
        text: selectText,
        inputText: inputText,
        data: newData,
     
        provinceActiveIndex: currentProvinceIndex,
        cityActiveIndex: null,
        distinctActiveIndex: null,
      });
    } else {
      //当前节点不是激活节点
      if (
        this.props.secondUrl &&
        this.state.data[currentProvinceIndex].children == null
      ) {
        //存在二级节点url并且没有查询过

        let url = this.props.secondUrl;
        let params = this.state.secondParams;
        if (typeof params == "object") {
          //判断是否为对象
          params[this.state.secondParamsKey] = currentProvinceValue;
        } else {
          params = {};
          if (this.state.secondParamsKey) {
            params[this.state.secondParamsKey] = currentProvinceValue;
          }
        }
        let fetchmodel = {
          url: url,
          data: params,
          success: this.loadCitySuccess.bind(
            this,
            currentProvinceIndex,
            currentProviceData
          ),
          error: this.loadError,
          type: this.props.httpType
            ? this.props.httpType.toUpperCase()
            : "POST",
          headers: this.props.httpHeaders || {},
          contentType: this.props.contentType || null,
        };
        console.log("picker-second", fetchmodel);
        let wasabi_api = window.api || api;
        wasabi_api.ajax(fetchmodel);
      } else {
        //没有二级节点的url
        let newData = this.state.data;

        let expand = newData[currentProvinceIndex].expand;
        newData = this.foldChildren(newData); //折叠
        newData[currentProvinceIndex].expand = !expand;

        if (
          newData[currentProvinceIndex].children instanceof Array &&
          newData[currentProvinceIndex].children.length > 0
        ) {
          //有子节点则不执行选中事件
        } else {
          //没有则立即执行选中事件
          selectValue = newData[currentProvinceIndex].value;
          selectText = newData[currentProvinceIndex].text;
          inputText = selectText;
          show = false;
        
          this.props.onSelect &&
            this.props.onSelect(
              selectValue,
              selectText,
              this.props.name,
              currentProviceData
            );
        }

        this.setState({
          show: show,
          value: selectValue,
          text: selectText,
          inputText: inputText,
          data: newData,
       
          provinceActiveIndex: currentProvinceIndex,
          cityActiveIndex: null,
          distinctActiveIndex: null,
        });
      }
    }
  }
  loadCitySuccess(currentProviceIndex, currentProviceData, data) {
    //二级节点的数据加载成功
  
    let cityData = data; //当前一级节点的二级节点数据
    let newData = this.state.data;
    let selectValue = this.state.value;
    let selectText = this.state.text;
    let inputText = this.state.inputText;
    //获取真实数据
    cityData = func.getSource(data, this.props.dataSource);

    if (cityData instanceof Array && cityData.length > 0) {
      //有数据
      newData[currentProviceIndex].children = cityData; //将查询的二级节点赋值给一级激活节点
      let expand = newData[currentProviceIndex].expand;
      newData = this.foldChildren(newData); //折叠
      newData[currentProviceIndex].expand = !expand; //当前一级节点展开
    } else {
      //没有数据,则直接执行选择事件
      selectValue = newData[currentProviceIndex].value;
      selectText = newData[currentProviceIndex].text;
      inputText = selectText;
    
      this.props.onSelect &&
        this.props.onSelect(
          selectValue,
          selectText,
          this.props.name,
          currentProviceData
        );
    }

    this.setState({
      value: selectValue,
      text: selectText,
      inputText: inputText,
      data: newData,
     
      provinceActiveIndex: currentProviceIndex,
      cityActiveIndex: null,
      distinctActiveIndex: null,
    });
  }
  activeCity(
    currentProvinceIndex,
    currentCityIndex,
    currentCityValue,
    currentCityData
  ) {
    //二级节点激活

    let show = true;
    let newData = this.state.data;
    let selectValue = this.state.value;
    let selectText = this.state.text;
    let inputText = this.state.inputText;
    if (
      this.state.provinceActiveIndex === currentProvinceIndex &&
      this.state.cityActiveIndex === currentCityIndex
    ) {
      //当前节点为激活节点
      if (
        newData[this.state.provinceActiveIndex].children[currentCityIndex]
          .children instanceof Array &&
        newData[this.state.provinceActiveIndex].children[currentCityIndex]
          .children.length > 0
      ) { 
        //有子节点(三级节点)则不执行选中事件
        let expand =
          newData[this.state.provinceActiveIndex].children[currentCityIndex]
            .expand;
        newData = this.foldChildren(newData); //折叠
        newData[this.state.provinceActiveIndex].expand = true; //一级节点展开
        newData[this.state.provinceActiveIndex].children[
          currentCityIndex
        ].expand = !expand; //如果为展开状态则隐藏,否则展开
      } else {
        //没有则立即执行选中事件
        show = false;
      
        selectValue =
          newData[this.state.provinceActiveIndex].value +
          "," +
          currentCityData.value;
        selectText =
          newData[this.state.provinceActiveIndex].text +
          "," +
          currentCityData.text;
        inputText = selectText;
        this.props.onSelect &&
          this.props.onSelect(selectValue, selectText, this.props.name, {
            parentNode: newData[this.state.provinceActiveIndex],
            node: currentCityData,
          });
      }

      this.setState({
        show: show,
        value: selectValue,
        text: selectText,
        inputText: inputText,
        data: newData,
      
        cityActiveIndex: currentCityIndex,
        distinctActiveIndex: null,
      });
    } else {
      if (
        this.props.thirdUrl &&
        this.state.data[this.state.provinceActiveIndex].children[
          currentCityIndex
        ].children == null
      ) {
        //存在三级节点url并且没有查询过
        let url = this.props.thirdUrl;
        let params = this.state.thirdParams;
        if (typeof params == "object") {
          //判断是否为对象
          params[this.state.thirdParamsKey] = currentCityValue;
        } else {
          params = {};
          if (this.state.thirdParamsKey) {
            params[this.state.thirdParamsKey] = currentCityValue;
          }
        }
        let fetchmodel = {
          url: url,
          data: params,
          success: this.loadDistinctSuccess.bind(
            this,
            currentCityIndex,
            currentCityData
          ),
          error: this.loadError,
          type: this.props.httpType
            ? this.props.httpType.toUpperCase()
            : "POST",
          headers: this.props.httpHeaders || {},
          contentType: this.props.contentType || null,
        };
        console.log("picker-third", fetchmodel);
        let wasabi_api = window.api || api;
        wasabi_api.ajax(fetchmodel);
      } else {
        for (
          let index = 0;
          index < newData[this.state.provinceActiveIndex].children.length;
          index++
        ) {
          newData[this.state.provinceActiveIndex].children[
            index
          ].expand = false;
        }
        let expand =
          newData[this.state.provinceActiveIndex].children[currentCityIndex]
            .expand;
        newData = this.foldChildren(newData); //折叠

        newData[this.state.provinceActiveIndex].expand = true; //一级节点展开
        newData[this.state.provinceActiveIndex].children[
          currentCityIndex
        ].expand = !expand;

        if (
          newData[this.state.provinceActiveIndex].children[currentCityIndex]
            .children instanceof Array &&
          newData[this.state.provinceActiveIndex].children[currentCityIndex]
            .children.length > 0
        ) {
          //有子节点(三级节点)则不执行选中事件
        } else {
          //没有则立即执行选中事件
          show = false;
      
          selectValue =
            newData[this.state.provinceActiveIndex].value +
            "," +
            newData[this.state.provinceActiveIndex].children[currentCityIndex]
              .value;
          selectText =
            newData[this.state.provinceActiveIndex].text +
            "," +
            newData[this.state.provinceActiveIndex].children[currentCityIndex]
              .text;
          inputText = selectText;
          this.props.onSelect &&
            this.props.onSelect(selectValue, selectText, this.props.name, {
              parentNode: newData[this.state.provinceActiveIndex],
              node: currentCityData,
            });
        }

        this.setState({
          show: show,
          value: selectValue,
          text: selectText,
          inputText: inputText,
          data: newData,
    
          cityActiveIndex: currentCityIndex,
          distinctActiveIndex: null,
        });
      }
    }
  }
  loadDistinctSuccess(currentCityIndex, currentCityData, data) {
    //三级节点查询成功
    let show = true;
    let distinctData = data; //当前二级节点的二级节点数据
    let selectValue = this.state.value;
    let selectText = this.state.text;
    let inputText = this.state.inputText;
    //获取真实数据
    if (this.props.dataSource == null) {
    } else {
      distinctData = func.getSource(data, this.props.dataSource);
    }

    let newData = this.state.data;
    if (distinctData instanceof Array && distinctData.length > 0) {
      //有数据
      for (
        let index = 0;
        index < newData[this.state.provinceActiveIndex].children.length;
        index++
      ) {
        newData[this.state.provinceActiveIndex].children[index].expand = false;
      }
      newData[this.state.provinceActiveIndex].children[
        currentCityIndex
      ].children = distinctData; //将查询的三级节点赋值给二级激活节点
      let expand =
        newData[this.state.provinceActiveIndex].children[currentCityIndex]
          .expand;
      newData = this.foldChildren(newData); //折叠
      newData[this.state.provinceActiveIndex].expand = true; //一级节点展开
      newData[this.state.provinceActiveIndex].children[
        currentCityIndex
      ].expand = !expand;
    } else {
      // 直接选中
      show = false;
   
      selectValue =
        newData[this.state.provinceActiveIndex].value +
        "," +
        newData[this.state.provinceActiveIndex].children[currentCityIndex]
          .value;
      selectText =
        newData[this.state.provinceActiveIndex].text +
        "," +
        newData[this.state.provinceActiveIndex].children[currentCityIndex].text;
      inputText = selectText;
      this.props.onSelect &&
        this.props.onSelect(selectValue, selectText, this.props.name, {
          parentNode: newData[this.state.provinceActiveIndex],
          node: currentCityData,
        });
    }

    this.setState({
      value: selectValue,
      text: selectText,
      inputText: inputText,
      data: newData,

      cityActiveIndex: currentCityIndex,
      distinctActiveIndex: null,
    });
  }
  activeDistinct(currentDistinctIndex, currentDistinctData) {
    //三级节点激活
    let show = false;
    let newData = this.state.data;
    let selectValue = this.state.value;
    let selectText = this.state.text;
    let inputText = this.state.inputText;
    for (
      let index = 0;
      index <
      newData[this.state.provinceActiveIndex].children[
        this.state.cityActiveIndex
      ].children.length;
      index++
    ) {
      newData[this.state.provinceActiveIndex].children[
        this.state.cityActiveIndex
      ].children[index].expand = false;
    }
    newData = this.foldChildren(newData); //折叠
    // 设置展开
    newData[this.state.provinceActiveIndex].expand = true;
    newData[this.state.provinceActiveIndex].children[
      this.state.cityActiveIndex
    ].expand = true;
    newData[this.state.provinceActiveIndex].children[
      this.state.cityActiveIndex
    ].children[currentDistinctIndex].expand = true;

    selectValue =
      newData[this.state.provinceActiveIndex].value +
      "," +
      newData[this.state.provinceActiveIndex].children[
        this.state.cityActiveIndex
      ].value +
      "," +
      currentDistinctData.value;
    selectText =
      newData[this.state.provinceActiveIndex].text +
      "," +
      newData[this.state.provinceActiveIndex].children[
        this.state.cityActiveIndex
      ].text +
      "," +
      currentDistinctData.text;
    inputText = selectText;
    this.props.onSelect &&
      this.props.onSelect(selectValue, selectText, this.props.name, {
        grandNode: newData[this.state.provinceActiveIndex],
        parentNode:
          newData[this.state.provinceActiveIndex].children[
            this.state.cityActiveIndex
          ],
        node: currentDistinctData,
      });
    this.setState({
      show: show,
      value: selectValue,
      text: selectText,
      inputText: inputText,
      data: newData,
      distinctActiveIndex: currentDistinctIndex,
    });
  }

 
  render() {
    const {
      data,
    
      provinceActiveIndex,
      cityActiveIndex,
      distinctActiveIndex,
    } = this.state;
    const provinceProps = {
      data: data,
      activeProvince: this.activeProvince,
      provinceActiveIndex,
      activeCity: this.activeCity,
      cityActiveIndex,
      distinctActiveIndex,
      activeDistinct: this.activeDistinct,
    };

    return (
      <div className="combobox  ">
        <PickerInput
          ref={this.input}
          {...this.props}
          show={this.state.show}
          value={this.state.inputText}
          onFocus={this.props.onFocus}
          onClick={this.onClick}
          onDoubleClick={this.onDoubleClick}
          onKeyUp={this.props.onKeyUp}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onClear={this.onClear}
        ></PickerInput>
        <div
          className={"dropcontainter  picker"}
          style={{ display: this.state.show == true ? "block" : "none" }}
          id={this.state.pickerid}
        >
          <HotView
            data={this.props.hotData}
            hotTitle={this.props.hotTitle}
            activeHot={this.activeHot}
          ></HotView>
          <ul className="wrap">
            <p>{this.props.placeholder}</p>
            <ProvinceView {...provinceProps}></ProvinceView>
          </ul>
        </div>
      </div>
    );
  }
}
Picker.propTypes = propTypes;
Picker.defaultProps = { type: "picker" };
export default ValidateHoc(loadDataHoc(Picker));
