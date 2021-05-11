/*
 create by wangzhiyong
 date:2016-05-23
 desc:级联选择组件
 采用了es6语法
 edit 2017-08-17 TODO
 */
import React, { Component } from "react";
import func from "../../libs/func.js";
import dom from "../../libs/dom"
import loadDataHoc from "../loadDataHoc";
import validateHoc from "../validateHoc";
import FetchModel from "../../Model/FetchModel.js";
import PickerModel from "../../Model/PickerModel.js";
import Label from "../../Info/Label";
import propType from "../config/propTypes.js";
import defaultProps from "../config/defaultProps.js";
import "./picker.css"
class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerid: func.uuid(),
            show: false,//是否显示下拉框
            text: "",
            value: "",
            oldPropsValue: "",//保存初始化的值
            data: [],
            rawData: [],
            provinceActiveIndex: null,//一级激活节点下标
            cityActiveIndex: null,//二级激活节点下标
            distinctActiveIndex: null,//三级激活节点下标

            //其他属性，二级三级节点的加载属性
            secondParams: this.props.secondParams,
            secondParamsKey: this.props.secondParamsKey,
            thirdParams: this.props.thirdParams,
            thirdParamsKey: this.props.thirdParamsKey,

        }
        this.setValue=this.setValue.bind(this);
        this.getValue=this.getValue.bind(this);
        this.onClear=this.onClear.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.showPicker = this.showPicker.bind(this);
        this.hidePicker = this.hidePicker.bind(this);
        this.setPickerModel = this.setPickerModel.bind(this);
        this.activeHot = this.activeHot.bind(this);
        this.flodChildren = this.flodChildren.bind(this);
        this.activeProvince = this.activeProvince.bind(this);
        this.loadCitySuccess = this.loadCitySuccess.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if (props.data && props.data instanceof Array && func.diff(props.data, state.rawData)) {
            /**
             * 如原数据发生改变才更新数据源,因为此处有添加数据的现象
             */
            newState.rawData = (props.data);
            newState.data = func.clone(props.data)//复制一份
        }
        if (props.value != state.oldPropsValue) {//父组件强行更新了
            let text = func.processText(props.value, newState.data || state.data);
            newState = {
                value: props.value,
                oldPropsValue: props.value,
                text: text.join(","),
            }
        }
        return newState;
    }

    /**
    * 设置值
    * @param {*} value 
    */
    setValue(value) {
        let text = func.processText(value, this.state.data);
        this.setState({
            value: value,
            text: text,
       
        })
    }
    /**
     * 获取值
     * @returns 
     */
    getValue() {
        return this.state.value;
    }
    /**
     * 清除值
     */
    onClear() {
        this.setState({
            value: "",
            text: "",
        })
        this.props.onSelect && this.props.onSelect("", "", this.props.name, {});
    }
    changeHandler(event) {

    }
    /**
     * 
     * @returns 
     */
    showPicker(event) {//显示选择
        event.stopPropagation();//防止冒泡
        if (this.props.readOnly) {
            //只读不显示
            return;
        }
        else {
            this.setState({
                show: !this.state.show,
            })
        }
        document.addEventListener("click", this.hidePicker)
    }
    hidePicker(event) {
        if (!dom.isDescendant(document.getElementById(this.state.containerid), event.target)) {
            this.setState({
                show: false
            });

            try {

                document.removeEventListener("click", this.hidePicker);
                //在此处处理失去焦点事件
                this.props.onBlur && this.props.onBlur(this.state.value, this.state.text, this.props.name);
            }
            catch (e) {

            }
        }

    }
    setPickerModel(data) {//根据数据生成标准格式
        let realData = [];
        for (let index = 0; index < data.length; index++) {
            let pickerModel = new PickerModel(data[index][this.props.valueField], data[index][this.props.textField ? this.props.textField : "text"]);
            realData.push(pickerModel);
        }
        return realData;
    }
    activeHot(value, text) {
        this.setState({
            show: false,
            value: value,
            text: text,
        });

        if (this.props.onSelect != null) {

            this.props.onSelect(value, text, this.props.name);
        }
    }
    flodChildren(data) {//将节点折叠起来
        for (let index = 0; index < data.length; index++) {
            data[index].expand = false;
            if (data[index].children && data[index].children instanceof Array) {
                data[index].children = this.flodChildren(data[index].children);//遍历
            }
        }
        return data;
    }
    activeProvince(currentProvinceIndex, currentProvinceValue) {//一级节点激活
        let show = true;
        let newData = this.state.data;
        let selectValue = this.state.value;
        let selectText = this.state.text;
        if (this.state.provinceActiveIndex === currentProvinceIndex) {//当前节点为激活节点
            if ((newData[currentProvinceIndex].children instanceof Array) && newData[currentProvinceIndex].children.length > 0) {
                //有子节点则不执行选中事件
                let expand = newData[currentProvinceIndex].expand;
                newData = this.flodChildren(newData);//折叠
                newData[currentProvinceIndex].expand = !expand;//如果为展开状态则隐藏,否则展开

            }
            else {//没有则立即执行选中事件
                selectValue = newData[currentProvinceIndex].value;
                selectText = newData[currentProvinceIndex].text;
                show = false;
                if (this.props.onSelect != null) {
                    this.props.onSelect(selectValue, selectText, this.props.name, null);
                }

            }

            this.setState({
                show: show,
                value: selectValue,
                text: selectText,
                data: newData,
                provinceActiveIndex: currentProvinceIndex,
                cityActiveIndex: null,
                distinctActiveIndex: null,
            })
        }
        else {
            //当前节点不是激活节点
            if (this.props.secondUrl != null && this.state.data[currentProvinceIndex].children == null) {//存在二级节点url并且没有查询过

                let url = this.props.secondUrl;
                let params = this.state.secondParams;
                if (typeof params == "object") {//判断是否为对象
                    params[this.state.secondParamsKey] = currentProvinceValue;
                }
                else {
                    params = {};
                    if (this.state.secondParamsKey != null) {
                        params[this.state.secondParamsKey] = currentProvinceValue;
                    }

                }
                let type = this.props.httpType ? this.props.httpType : "POST";
                type = type.toUpperCase();

                let fetchmodel = new FetchModel(url, this.loadCitySuccess.bind(this, currentProvinceIndex), params, this.loadError, type);
                if (this.props.contentType) {
                    //如果传contentType值则采用传入的械
                    //否则默认

                    fetchmodel.contentType = this.props.contentType;
                    fetchmodel.data = fetchmodel.contentType == "application/json" ? fetchmodel.data ? JSON.stringify(fetchmodel.data) : "{}" : fetchmodel.data;
                }
                type == "POST" ? func.fetch.post(fetchmodel) : func.fetch.get(fetchmodel);
                console.log("picker-second", fetchmodel);

            }
            else {//没有二级节点的url
                let newData = this.state.data;

                let expand = newData[currentProvinceIndex].expand;
                newData = this.flodChildren(newData);//折叠
                newData[currentProvinceIndex].expand = !expand;

                if ((newData[currentProvinceIndex].children instanceof Array) && newData[currentProvinceIndex].children.length > 0) {
                    //有子节点则不执行选中事件
                }
                else {//没有则立即执行选中事件
                    selectValue = newData[currentProvinceIndex].value;
                    selectText = newData[currentProvinceIndex].text;
                    show = false;
                    if (this.props.onSelect != null) {
                        this.props.onSelect(selectValue, selectText, this.props.name, null);
                    }

                }
              
                this.setState({
                    show: show,
                    value: selectValue,
                    text: selectText,
                    data: newData,
                    provinceActiveIndex: currentProvinceIndex,
                    cityActiveIndex: null,
                    distinctActiveIndex: null,
                })
            }
        }


    }
    loadCitySuccess(currentProviceIndex, data) {//二级节点的数据加载成功
        let cityData = [];//当前一级节点的二级节点数据
        let realData = data;
        let newData = this.state.data;
        let selectValue = this.state.value;
        let selectText = this.state.text;
        //获取真实数据
        if (this.props.dataSource == null) {
        }
        else {
            realData = func.getSource(data, this.props.dataSource);
        }
        cityData = this.setPickerModel(realData);//生成二级节点数据模型
        if (cityData instanceof Array && cityData.length > 0) {//有数据
            newData[currentProviceIndex].children = cityData;//将查询的二级节点赋值给一级激活节点
            let expand = newData[currentProviceIndex].expand;
            newData = this.flodChildren(newData);//折叠
            newData[currentProviceIndex].expand = !expand;//当前一级节点展开


        }
        else {//没有数据,则直接执行选择事件
            selectValue = newData[currentProviceIndex].value;
            selectText = newData[currentProviceIndex].text;
            if (this.props.onSelect != null) {
                this.props.onSelect(selectValue, selectText, this.props.name, null);
            }
        }
    
        this.setState({
            value: selectValue,
            text: selectText,
            data: newData,
            provinceActiveIndex: currentProviceIndex,
            cityActiveIndex: null,
            distinctActiveIndex: null,
        })

    }
    activeCity(currentProvinceIndex, currentCityIndex, currentCityValue) {//二级节点激活
        let show = true;
        let newData = this.state.data;
        let selectValue = this.state.value;
        let selectText = this.state.text;
        if (this.state.provinceActiveIndex === currentProvinceIndex && this.state.cityActiveIndex === currentCityIndex) {
            //当前节点为激活节点
            if ((newData[this.state.provinceActiveIndex].children[currentCityIndex].children instanceof Array) && newData[this.state.provinceActiveIndex].children[currentCityIndex].children.length > 0) {
                //有子节点(三级节点)则不执行选中事件
                let expand = newData[this.state.provinceActiveIndex].children[currentCityIndex].expand;
                newData = this.flodChildren(newData);//折叠
                newData[this.state.provinceActiveIndex].expand = true;//一级节点展开
                newData[this.state.provinceActiveIndex].children[currentCityIndex].expand = !expand;//如果为展开状态则隐藏,否则展开
            }
            else {//没有则立即执行选中事件
                show = false;
                selectValue = newData[this.state.provinceActiveIndex].value + "," + newData[this.state.provinceActiveIndex].children[currentCityIndex].value;
                selectText = newData[this.state.provinceActiveIndex].text + "," + newData[this.state.provinceActiveIndex].children[currentCityIndex].text;
                if (this.props.onSelect != null) {
                    this.props.onSelect(selectValue, selectText, this.props.name, newData[this.state.provinceActiveIndex]);
                }
            }
         
            this.setState({
                show: false,
                value: selectValue,
                text: selectText,
                data: newData,
                cityActiveIndex: currentCityIndex,
                distinctActiveIndex: null,
            });


        }
        else {
            if (this.props.thirdUrl != null && (this.state.data[this.state.provinceActiveIndex].children[currentCityIndex].children == null)) {//存在三级节点url并且没有查询过
                let url = this.props.thirdUrl;
                let params = this.state.thirdParams;
                if (typeof params == "object") {//判断是否为对象
                    params[this.state.thirdParamsKey] = currentCityValue;
                }
                else {
                    params = {};
                    if (this.state.thirdParamsKey != null) {
                        params[this.state.thirdParamsKey] = currentCityValue;
                    }
                }
                let type = this.props.httpType ? this.props.httpType : "POST";
                type = type.toUpperCase();

                let fetchmodel = new FetchModel(url, this.loadDistinctSuccess.bind(this, currentCityIndex), params, this.loadError, type);
                if (this.props.contentType) {
                    //如果传contentType值则采用传入的械
                    //否则默认

                    fetchmodel.contentType = this.props.contentType;
                    fetchmodel.data = fetchmodel.contentType == "application/json" ? JSON.stringify(fetchmodel.data) : fetchmodel.data;
                }
                type == "POST" ? func.fetch.post(fetchmodel) : func.fetch.get(fetchmodel);
                console.log("picker-third", fetchmodel);

            }
            else {

                for (let index = 0; index < newData[this.state.provinceActiveIndex].children.length; index++) {
                    newData[this.state.provinceActiveIndex].children[index].expand = false;
                }
                let expand = newData[this.state.provinceActiveIndex].children[currentCityIndex].expand;
                newData = this.flodChildren(newData);//折叠

                newData[this.state.provinceActiveIndex].expand = true;//一级节点展开
                newData[this.state.provinceActiveIndex].children[currentCityIndex].expand = !expand;

                if ((newData[this.state.provinceActiveIndex].children[currentCityIndex].children instanceof Array) && newData[this.state.provinceActiveIndex].children[currentCityIndex].children.length > 0) {
                    //有子节点(三级节点)则不执行选中事件
                }
                else {//没有则立即执行选中事件
                    show = false;
                    selectValue = newData[this.state.provinceActiveIndex].value + "," + newData[this.state.provinceActiveIndex].children[currentCityIndex].value;
                    selectText = newData[this.state.provinceActiveIndex].text + "," + newData[this.state.provinceActiveIndex].children[currentCityIndex].text;
                    if (this.props.onSelect != null) {
                        this.props.onSelect(selectValue, selectText, this.props.name, newData[this.state.provinceActiveIndex]);
                    }
                }
           
                this.setState({
                    show: show,
                    value: selectValue,
                    text: selectText,
                    data: newData,
                    cityActiveIndex: currentCityIndex,
                    distinctActiveIndex: null,
                });
            }
        }

    }
    loadDistinctSuccess(currentCityIndex, data) {//三级节点查询成功
        let distinctData = [];//当前二级节点的二级节点数据
        let realData = data;
        let selectValue = this.state.value;
        let selectText = this.state.text;
        //获取真实数据
        if (this.props.dataSource == null) {
        }
        else {
            realData = func.getSource(data, this.props.dataSource);
        }
        distinctData = this.setPickerModel(realData);//生成二级节点数据模型
        let newData = this.state.data;
        if (distinctData instanceof Array && distinctData.length > 0) {//有数据
            for (let index = 0; index < newData[this.state.provinceActiveIndex].children.length; index++) {
                newData[this.state.provinceActiveIndex].children[index].expand = false;
            }
            newData[this.state.provinceActiveIndex].children[currentCityIndex].children = distinctData;//将查询的三级节点赋值给二级激活节点
            let expand = newData[this.state.provinceActiveIndex].children[currentCityIndex].expand;
            newData = this.flodChildren(newData);//折叠
            newData[this.state.provinceActiveIndex].expand = true;//一级节点展开
            newData[this.state.provinceActiveIndex].children[currentCityIndex].expand = !expand;

        }
        else {
            selectValue = newData[this.state.provinceActiveIndex].value + "," + newData[this.state.provinceActiveIndex].children[currentCityIndex].value;
            selectText = newData[this.state.provinceActiveIndex].text + "," + newData[this.state.provinceActiveIndex].children[currentCityIndex].text;
            if (this.props.onSelect != null) {
                this.props.onSelect(selectValue, selectText, this.props.name, null);
            }
        }
      
        this.setState({
            value: selectValue,
            text: selectText,
            data: newData,
            cityActiveIndex: currentCityIndex,
            distinctActiveIndex: null,

        })

    }
    activeDistinct(currentDistinctIndex) {//三级节点激活
        let show = false;
        let newData = this.state.data;
        let selectValue = this.state.value;
        let selectText = this.state.text;
        for (let index = 0; index < newData[this.state.provinceActiveIndex].children[this.state.cityActiveIndex].children.length; index++) {
            newData[this.state.provinceActiveIndex].children[this.state.cityActiveIndex].children[index].expand = false;
        }
        newData = this.flodChildren(newData);//折叠
        newData[this.state.provinceActiveIndex].expand = true; newData[this.state.provinceActiveIndex].children[this.state.cityActiveIndex].expand = true;
        newData[this.state.provinceActiveIndex].children[this.state.cityActiveIndex].children[currentDistinctIndex].expand = true;
        selectValue = newData[this.state.provinceActiveIndex].value + ","
            + newData[this.state.provinceActiveIndex].children[this.state.cityActiveIndex].value + ","
            + newData[this.state.provinceActiveIndex].children[this.state.cityActiveIndex].children[currentDistinctIndex].value;
        selectText = newData[this.state.provinceActiveIndex].text + ","
            + newData[this.state.provinceActiveIndex].children[this.state.cityActiveIndex].text + ","
            + newData[this.state.provinceActiveIndex].children[this.state.cityActiveIndex].children[currentDistinctIndex].text;

        if (this.props.onSelect != null) {
            this.props.onSelect(selectValue, selectText, this.props.name, newData[this.state.provinceActiveIndex]);
        }
   
        this.setState({
            show: show,
            value: selectValue,
            text: selectText,
            data: newData,
            distinctActiveIndex: currentDistinctIndex,
        })
    }
    renderHot() {//热门选择
        if (this.props.hotData instanceof Array) {
            let controlArray = [];
            this.props.hotData.map((item, index) => {
                controlArray.push(< li key={"hot" + item.text} className="hot-item" onClick={this.activeHot.bind(this, item.value, item.text)} title={item.text}>{item.text}</li>);
            });
            return <div>
                <div className="hot-wrap">
                    <p style={{ display: (this.props.hotTitle && this.props.hotTitle != "") ? "block" : "none" }}>{this.props.hotTitle}</p>
                    <ul>{controlArray}</ul></div>
                <div className="line" > </div >
            </div>
        }
        else {
            return null;
        }
    }
    renderProvince() {//一级节点渲染
        let provinceComponents = [];
        if (this.state.data && this.state.data instanceof Array) {

            this.state.data.map((child, index) => {
                let left = (index % 5) * -65;

                provinceComponents.push(<li key={"province" + index} className={"picker-container  " + (child.expand ? "expand" : "")}>
                    <ul className="picker-container-wrap" style={{ display: (child.expand ? "block" : "none"), left: left }}>
                        {
                            this.renderCity(index, child.children)
                        }
                    </ul>
                    <div className={"picker-container-name " + (child.expand ? "expand" : "")} onClick={this.activeProvince.bind(this, index, child.value)} title={child.text}>{child.text}</div>
                </li>
                );
            });
            return provinceComponents;
        }
        else {
            return null;
        }
    }
    renderCity(provinceIndex, cityData) {//二级节点渲染
        let cityComponents = [];
        if (cityData instanceof Array) {
            cityData.map((child, index) => {
                let left = (index % 4) * -80;
                if (index % 4 == 0) {
                    left = -14;
                }

                cityComponents.push(
                    <li key={"city" + index} className={"picker-container  " + (child.expand ? "expand" : "")}>
                        <ul className="picker-container-wrap" style={{ display: (child.expand ? "block" : "none"), left: left }}>
                            {
                                this.renderDistinct(child.children)
                            }
                        </ul>
                        <div className={"picker-container-name " + (child.expand ? "expand" : "")} onClick={this.activeCity.bind(this, provinceIndex, index, child.value)} title={child.text}>{child.text}</div>
                    </li>
                )
            });
            return cityComponents;
        } else {
            return null;
        }

    }
    renderDistinct(distinctData) {//三级节点渲染
        let distinctComponents = [];
        if (distinctData instanceof Array) {
            distinctData.map((child, index) => {
                distinctComponents.push(
                    <li key={"distinct" + index} className={"pickeritem " + (this.state.distinctActiveIndex === index ? "expand" : "")} onClick={this.activeDistinct.bind(this, index, child.value)} title={child.text}>{child.text}</li>
                )
            });
            return distinctComponents;
        } else {
            return null;
            return null;
        }

    }
    render() {
        let componentClassName = "wasabi-form-group " + (this.props.className || "");//组件的基本样式 
        let inputProps =
        {
            readOnly: this.props.readOnly,
            name: this.props.name,
            placeholder: (this.props.placeholder === "" || this.props.placeholder == null) ? this.props.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-input  ",
            title: this.props.title,

        }//文本框的属性
        let style = this.props.style ? JSON.parse(JSON.stringify(this.props.style)) : {};
        if (this.props.hide) {
            style.display = "none";
        } else {
            style.display = "flex";
        }
        return (
            <div className={componentClassName + " " + this.props.validateClass} id={this.state.containerid} style={style} >
                <Label ref="label" readOnly={this.props.readOnly || this.props.disabled} style={this.props.labelStyle} required={this.props.required}>{this.props.label}</Label>
                <div className={"wasabi-form-group-body " + (this.props.readOnly || this.props.disabled ? " readOnly" : "")} style={{ width: !this.props.label ? "100%" : null }}>
                    <div className="combobox"     >
                        <i className={"combobox-clear icon-clear"} onClick={this.onClear} style={{ display: this.props.readOnly ? "none" : (this.state.value == "" || !this.state.value) ? "none" : "inline" }}></i>
                        <i className={"comboxbox-icon icon-drop-down " + (this.state.show ? "rotate" : "")} onClick={this.showPicker.bind(this)}></i>
                        <input type="text"
                            {...inputProps}
                            value={this.state.text}
                            onBlur={this.props.onBlur} onClick={this.showPicker.bind(this)} autoComplete="off" onChange={this.changeHandler} />
                        <div className={"dropcontainter  picker "} style={{ display: this.state.show == true ? "block" : "none" }}   >
                            {this.renderHot()}
                            <ul className="wrap" >
                                <p>{this.props.placeholder}</p>
                                {
                                    this.renderProvince()
                                }
                            </ul>
                        </div>
                    </div>
                    <small className={'wasabi-help-block '} style={{ display: this.props.inValidateText ? "block" : 'none' }}>
                        <div className='text' >{this.props.inValidateText}</div>
                    </small>
                </div>
            </div>


        )
    }
}
Picker.propTypes = propType;
Picker.defaultProps = Object.assign(defaultProps, { type: "picker" });
export default validateHoc(loadDataHoc(Picker, "picker"));