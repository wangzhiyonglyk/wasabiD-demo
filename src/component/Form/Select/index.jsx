/**
 * Created by wangzhiyonglyk
 * date:2016-03-02后开始独立改造
 * edit 2021-03-11 修复bug
 * edit 2021-04-12 完善交互性
 * 下拉框
 */
import React from "react";
//libs
import func from "../../libs/func/index.js";
import propsTran from "../../libs/propsTran";

//hoc
import loadDataHoc from "../loadDataHoc";
import ValidateHoc from "../ValidateHoc";
import propTypes from "../propsConfig/propTypes.js";
import ArrowInput from "./ArrowInput";
import SelectbleList from "./SelectbleList";
import Msg from "../../Info/Msg";
import { setDropcontainterPosition } from "../propsConfig/public.js";
import "./select.css";

import ComboBox from "../ComboBox/Base.jsx";
class Select extends ComboBox {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      sortType: "", //排序方式
      //在可以自由添加的时候，清除输入，不会清除选择项
      inputText: "", //输入框的值默认传下来的文本值
      oldPropsValue: null, //保存初始化的值
    };
    this.onChange = this.onChange.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.addHandler = this.addHandler.bind(this);
    this.filter = this.filter.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onDeleteValue = this.onDeleteValue.bind(this)
    this.onSort = this.onSort.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (
      props.data &&
      props.data instanceof Array &&
      func.diff(props.data, state.rawData)
    ) {
      /**
       * 因为此组件有追加数据的功能，所以要判断数据变化
       *data就成为了状态值
       */
      newState.rawData = props.data;
      newState.data = func.clone(props.data); //复制一份
    }
    if (props.value !== state.oldPropsValue) {
      //父组件强行更新了
      let text = propsTran.processText(
        props.value,
        newState.data || state.data
      );
      text = text.join(",") || props.value// 如果找不到则以value为值
      newState = {
        value: props.value || "",
        oldPropsValue: props.value,
        text: text,
      };
    }
    return newState;
  }



  /**
  * onchage 事件
  * @param {*} event
  */
  onChange(event) {
    let filterData = this.filter(event); //筛选数据
    this.setState({
      show: true,
      inputText: event.target.value.trim(),
      data: [].concat(
        filterData.absFilter,
        filterData.dimFilter,
        filterData.undimFilter
      ),
    });
    this.props.onChange &&
      this.props.onChange(
        event.target.value.trim(),
        this.props.name,
        event
      );
  }

  /**
    * 选择事件
    * @param {*} value 值
    * @param {*} text 文本
    * @param {*} row 此行数据
    */
  onSelect(value, text, row) {
    if (value + "") {
      //选中事件
      let newValue = [],
        newText = [];

      if (this.props.multiple) {
        //多选
        if ((this.state.value ?? "").toString()) {
          // 防止输入0
          newValue =
            this.state.value !== undefined && this.state.value !== null
              ? this.state.value.toString().split(",")
              : [];
          newText = this.state.text
            ? this.state.text.toString().split(",")
            : [];

        }
        if (newValue.indexOf(value.toString()) > -1) {
          //取消选中
          newValue.splice(newValue.indexOf(value.toString()), 1);
          newText.splice(newText.indexOf(text.toString()), 1);

        } else {
          //选中
          newValue.push(value);
          newText.push(text);

        }
        this.setState({
          value: newValue.join(","),
          text: newText.join(","),

        }, () => {
          setDropcontainterPosition(this.input.current);
        });

        this.props.onSelect &&
          this.props.onSelect(
            newValue.join(","),
            newText.join(","),
            this.props.name,
            row
          );
      } else {
        newValue = value;
        newText = text;
        this.setState({
          show: false,
          value: newValue,
          text: newText,
          inputText: newText

        });
        this.props.onSelect &&
          this.props.onSelect(newValue, newText, this.props.name, row);
      }

      this.props.validate && this.props.validate(newValue); //验证

    } else {
      Msg.alert("值是空值");
    }
  }

  /**
   * 手动输入筛选或添加
   * @param {*} event 事件
   * @param {*} isAdd 是否添加
   */
  addHandler(event) {
    let formatValue = this.regValue(event);//先格式输入值
    let newValue =
      (this.state.value ?? "").toString()
        ? this.state.value.toString().split(",")
        : [];
    let newText = this.state.text ? this.state.text.toString().split(",") : [];
    ////如果允许添加，则把未匹配的，添加到数据源中
    if (this.props && this.props.attachAble && formatValue.length > 0) {
      /**
       * 注意了
       * 添加时不能把旧的选择删除了
       * 新增选择中的值与文本,
       */

      let data = this.state.data;

      for (let i = 0; i < formatValue.length; i++) {
        //先从精确匹配的数据查找
        let findIndex = data.findIndex(
          (item) => item.value == formatValue[i] || item.text == formatValue[i]
        );

        if (findIndex === -1) {
          let newItem = ({
            value: formatValue[i],
            text: formatValue[i],
          })
          newItem[this.props.valueField] = formatValue[i];
          newItem[this.props.textField] = formatValue[i]
          data.unshift(newItem)
          newValue.push(formatValue[i])
          newText.push(formatValue[i])
        }
      }

      //单选的时候，则默认是添加的第一个，或者精确匹配的第一个
      newValue = this.props.multiple ? newValue.join(",") : data[0].value;
      newText = this.props.multiple ? newText.join(",") : data[0].text;
      this.setState({
        value: newValue,
        text: newText,
        data: data, //先添加的荐放在最前面，模糊的次之，非模糊居后
      }, () => {
        setDropcontainterPosition(this.input.current);
      });

      this.props.onSelect &&
        this.props.onSelect(newValue, newText, this.props.name, [
          { text: newText, value: newValue },
        ]);
      //添加后全选
       this.input?.current?.select();
    }
  }
    
    /**
     * 筛选
     * @param {*} event
     */
    filter(event) {
      let formatValue = this.regValue(event);//先格式输入值
      if (formatValue && formatValue.length > 0) {
        let absFilter = []; //精确筛选
        let dimFilter = []; //模糊筛选
        let undimFilter = []; //没有模糊筛选成功的

        this.state.data &&
          this.state.data.forEach((item) => {
            /**
             * **************注意事项********************
             * 前后加逗号匹配，防止数字匹配失效，
             * 先匹配value值，匹配成功则不再匹配text，防止value与text中含有相似的而导致一个下拉选择匹配两次
             */
            let findIndex = formatValue.findIndex(
              (i) => i == item.value || i == item.text
            ); //精确
            let dimFind = false; //是否模糊匹配
            for (let i = 0; i < formatValue.length; i++) {
              //注意了，是从数据集中去模糊匹配输入值
              dimFind =
                item.value.toString().indexOf(formatValue[i]) > -1 ||
                item.text.toString().indexOf(formatValue[i]) > -1;
            }
            if (findIndex > -1) {
              formatValue.splice(findIndex, 1); //移除匹配的
              absFilter.push(item);
            } else if (dimFind) {
              dimFilter.push(item); //模糊匹配
            } else {
              undimFilter.push(item); //非模糊匹配项
            }
            return false;
          });
        return {
          absFilter: absFilter,
          dimFilter: dimFilter,
          undimFilter: undimFilter,
        };
      } else {
        return {
          absFilter: [],
          dimFilter: [],
          undimFilter: this.state.data,
        };
      }
    }
    /**
     * 格式化输入
     */
    regValue(event) {
      let formatValue = event.target.value.replace(/[，|]/g, ","); //除去空格，替换汉字逗号，及用|作为分隔符，为英文逗号
      // todo 后期改用正则,再次除去每一个的两端空格，但是不除去文字内部空格
      formatValue = formatValue
        ? formatValue.split(",").map((item) => {
          return item; //再次除去两端空格
        })
        : [];
      formatValue = formatValue.filter((item) => {
        return item !== undefined && item !== null && item !== ""; //除去空值的
      });
      return formatValue;
    }

    /**
     * 多选时删除指定的选择项
     * @param {*} index 
     */
    onDeleteValue(index) {
      let value = this.state.value.split(",")
      let text = this.state.text.split(",")
      value.splice(index, 1)
      text.splice(index, 1)
      this.setState({
        value: value.join(","),
        text: text.join(",")
      }, () => {
        setDropcontainterPosition(this.input.current);
      })
    }
    /** 
     * 移除某个节点
     */
    onRemove(index) {
      let data = this.state.data;
      data.splice(index, 1);
      this.setState({
        data: data,
      });
    }
    /**
     * 排序
     */
    onSort() {
      let data = this.state.data;
      let sortType = this.state.sortType;
      if (data && data.length > 0) {
        data.sort((second, first) => {
          let secondProp = second[this.props.textField] || second.text;
          let firstProp = first[this.props.textField] || first.text;
          if (secondProp > firstProp) {
            return sortType == "asc" ? 1 : -1;
          } else if (secondProp < firstProp) {
            return sortType == "asc" ? -1 : 1;
          } else {
            return 0;
          }
        });

        this.setState({
          show: true,
          data: data,
          sortType: sortType == "asc" ? "desc" : "asc",
        });
      }
    }
    render() {
      return (
        <div className={"combobox " + (this.props.multiple ? " wasabi-select-multiple " : " ")}>
          <ArrowInput
            ref={this.input}
            show={this.state.show}
            text={this.state.text}
            inputText={this.state.inputText ?? ""}
            attachAble={this.props.attachAble}
            sortAble={this.props.sortAble}
            multiple={this.props.multiple}
            name={this.props.name}
            title={this.props.title ?? ""}
            placeholder={this.props.placeholder ?? ""}
            sortType={this.state.sortType}
            readOnly={this.props.readOnly}
            onFocus={this.props.onFocus}
            onClick={this.onClick}
            onDoubleClick={this.onDoubleClick}
            onKeyUp={this.onKeyUp}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onClear={this.onClear}
            onSort={this.onSort}
            onDeleteValue={this.onDeleteValue}
          ></ArrowInput>
          <SelectbleList
            pickerid={this.state.pickerid}
            show={this.state.show}
            value={this.state.value}
            data={this.state.data}
            removeAble={this.props.removeAble}
            onSelect={this.onSelect}
            onRemove={this.onRemove}
          ></SelectbleList>
        </div>
      );
    }
  }
Select.propTypes = propTypes;
Select.defaultProps = { type: "select" };
export default ValidateHoc(loadDataHoc(Select));
