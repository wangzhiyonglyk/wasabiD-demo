/**
 * create by wangzhiyonglyk
 * date:2020-12-08
 * desc 头像组件，可上传
 * todo 要将上传组件的公共代码
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Msg from "../../Info/Msg.jsx";
import api from "wasabi-api";
import fileType from "../../libs/fileType.js";
import func from "../../libs/func/index.js";
import LinkButton from "../../Buttons/LinkButton/index.jsx";
import "./index.css";
import ValidateHoc from "../ValidateHoc/index.jsx";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.filenode = React.createRef();
    this.state = {
      uploadid: func.uuid(),
      files: [], //选择的文件名集合
      uploadTitle: 0,
      accept: fileType.getAccept("image"),
      uploadDisabled: false, //是否禁止上传
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.uploadSuccess = this.uploadSuccess.bind(this);
    this.uploadFailed = this.uploadFailed.bind(this);
    this.uploadProgress = this.uploadProgress.bind(this);

    this.clear = this.clear.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.oldPropsValue) {
      //父组件强行更新了
      return {
        value: props.value || "",
        oldPropsValue: props.value,
        files: [props.value],
      };
    }
    return null;
  }

  /**
   * 选择文件
   */
  onClick(event) {
    if (!this.props.name) {
      Msg.error("文件上传必须指定name属性");
      return;
    }
    if (!this.props.url) {
      Msg.error("您没有设置上传的服务器地址");
      return;
    }
    if (this.props.disabled || this.props.uploadDisabled) {
      return;
    } else {
      this.filenode.current.click();
    }
    this.props.onClick && this.onClick(event);
  }

  /**
   * 选择文件
   * @param {} event
   */
  onChange(event) {
    //选择文件
    this.setFile(event.target.files);
    this.props.onChange &&
      this.props.onChange(
        event.target.files,
        event.target.files,
        this.props.name
      );
  }

  getValue() {
    return this.state.value;
  }
  setValue(value) {
    this.setState({
      value: value,
      files: [value],
    });
  }

  setFile(targetFiles) {
    if (!this.props.url) {
      Msg.alert("您没有设置上传的服务器地址");
      return;
    }

    this.files = targetFiles; //保存
    let files = [];
    if (this.files.length > 0) {
      //转成数组
      for (let index = 0; index < this.files.length; index++) {
        files.push(this.files[index]);
      }
      this.setState({
        files: files,
        uploadDisabled: true,
      });
      this.uploadHandler();
    }
  }

  //验证文件上传类型是否正确
  validateType(files) {
    return fileType.filter("image", files);
  }
  //上传处理
  uploadHandler() {
    if (this.props.disabled || this.props.uploadDisabled) {
      return;
    }
    // 实例化一个表单数据对象
    let formData = new FormData();
    // 遍历文件列表，插入到表单数据中

    if (this.files && this.files.length === 1) {
      if (this.props.url) {
        if (!this.validateType(this.files)) {
          Msg.error("上传的文件类型不正确");
          this.clear(); //清除
          return;
        }

        //单文件上传时
        if (!this.props.name) {
          Msg.error("单文件上传必须指定name属性");
          this.clear(); //清除
          return;
        }
        if (
          this.props.size &&
          this.props.size * 1024 * 1024 < this.files[0].size
        ) {
          Msg.error("文件不得超过" + this.props.size + "M");
          this.clear(); //清除
          return;
        }

        formData.append(this.props.name, this.files[0]);

        //是否有其他参数
        if (typeof this.props.params === "object") {
          for (let key in this.props.params) {
            formData.append(key, this.props.params[key]); //其他参数
          }
        }

        // 模拟上传进度,因为文件太小的时候，无法模拟出来上传进度
        this.time1 = setInterval(() => {
          this.setState({
            uploadTitle: this.state.uploadTitle * 1 + 5,
          });
        }, 300);

        // 开始上传
        this.time2 = setTimeout(() => {
          api.ajax({
            url: this.props.url,
            type: "post",
            contentType: false,
            headers: this.props.httpHeaders,
            dataType: "json",
            data: formData,
            success: (result) => {
              this.uploadSuccess(result);
            },
            progress: (percent) => {
              this.uploadProgress(percent);
            },
            error: (message) => {
              this.uploadFailed(message);
            },
          });
          clearTimeout(this.time2);
          clearInterval(this.time1);
        }, 1000);
      } else {
        Msg.alert("您没有设置上传的服务器地址");
        this.clear(); //清除
      }
    } else {
      Msg.alert("请选择文件");
    }
  }
  //上传进度
  uploadProgress(percentComplete) {
    this.setState({
      uploadTitle: percentComplete + "%",
    });
  }
  //上传完成
  uploadSuccess(result) {
    this.clear();

    let data = func.getSource(result, this.props.dataSource);
    this.setState({
      uploadStaus: 1,
      value: data,
    });
    this.props.uploadSuccess &&
      this.props.uploadSuccess(value, this.state.files);
    this.props.onSelect &&
      this.props.onSelect(value, value, this.props.name, this.state.files);
  }
  //上传文件失败
  uploadFailed(message) {
    Msg.error(message);
    this.clear();
    this.setState({
      value: "",
    });
  }
  /**
   * 清空文件
   */
  clear() {
    let obj = document.getElementById(this.state.uploadid);
    if (obj) {
      obj.value = "";
      this.setState({
        uploadDisabled: false,
        uploadTitle: 0,
      });
    }
  }
  /**
   * 删除文件
   */
  removeFile() {
    this.setState({
      files: [],
      value: "",
    });
  }

  /**
   * 创建路径
   * @returns
   */
  createURL() {
    try {
      if (this.props.type === "image" || this.props.type === "avatar") {
        if (this.state.value) {
          return this.state.value;
        } else if (this.state.files.length === 1) {
          return window.URL.createObjectURL(this.state.files[0]);
        }
      }
    } catch (e) {
      return "";
    }
  }

  /**
   * 图片上传
   * @param {*} url
   * @returns
   */
  renderImg() {
    let url = this.createURL();
    if (url) {
      return (
        <React.Fragment>
          <img
            onClick={this.onClick}
            className={"wasabi-avatar-icon " + this.props.type}
            src={url}
          ></img>
          <LinkButton
            key="clear"
            iconCls={"icon-clear"}
            theme="info"
            style={{
              backgroundColor: "white",
              position: "absolute",
              right: 0,
              top: 0,
            }}
            onClick={this.removeFile.bind(this)}
          ></LinkButton>
        </React.Fragment>
      );
    } else {
      return this.props.type === "image" ? (
        <div
          onClick={this.onClick}
          className={"wasabi-avatar-icon " + this.props.type}
        ></div>
      ) : (
        <img
          onClick={this.onClick}
          className={"wasabi-avatar-icon " + this.props.type}
        ></img>
      );
    }
  }
  render() {
    return (
      <div
        className={
          "wasabi-avatar " +
          this.props.type +
          " " +
          (this.props.className ?? "") +
          (this.props.disabled ? " disabled" : "")
        }
      >
        {this.state.uploadDisabled ? (
          <React.Fragment>
            <div className="wasabi-upload-progress">
              <span>{this.state.uploadTitle}%</span>
            </div>
          </React.Fragment>
        ) : (
          this.renderImg()
        )}

        <input
          id={this.state.uploadid}
          type="file"
          name="file"
          ref={this.filenode}
          accept={this.state.accept}
          onChange={this.onChange.bind(this)}
          className="wasabi-upload-input"
        />
      </div>
    );
  }
}
// 因为组件可以独立，所以单独配置属性
Avatar.propTypes = {
  name: PropTypes.string, //名称
  value: PropTypes.string, //值
  className: PropTypes.string, //
  style: PropTypes.object, //
  type: PropTypes.oneOf(["avatar", "image"]), // 上传类型
  httpHeaders: PropTypes.object, //请求的头部信息
  params: PropTypes.object, //其他参数
  url: PropTypes.string.isRequired, //上传地址
  size: PropTypes.number, // 限制大小
  uploadSuccess: PropTypes.func, //上传成功事件
  disabled: PropTypes.bool, //是否禁止
  dataSource: PropTypes.string, //取后台哪个字段作为结果
};
Avatar.defaultProps = {
  type: "avatar",
  dataSource: "data",
};
export default ValidateHoc(Avatar);
