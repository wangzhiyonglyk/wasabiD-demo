/*/
 create by wangzhiyonglyk
 date:2020-11-20 改造上传组件
 desc:文件上传组件
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Msg from "../../Info/Msg.jsx";
import LinkButton from "../../Buttons/LinkButton/index.jsx";
import fileType from "../../libs/fileType.js";
import api from "wasabi-api";
import func from "../../libs/func/index.js";
import "./index.css";
import Button from "../../Buttons/Button/index.jsx";
import ValidateHoc from "../ValidateHoc/index.jsx";
class Upload extends Component {
  constructor(props) {
    super(props);
    this.fileinput = React.createRef();
    this.state = {
      uploadid: func.uuid(),
      defaultImgid: func.uuid(), //默认图片的id
      uploadImgid: func.uuid(), //单图片上传预览的id
      files: [], //选择的文件名集合
      value: [], // 最终的结果
      uploadDisabled: false,
      uploadStaus: {}, //-1 为没有上传或失败，0 为上传中，1为成功，
      uploadTitle: {}, // 上传进度
    };

    this.onChange = this.onChange.bind(this);
    this.uploadPreHandler = this.uploadPreHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.uploadSuccess = this.uploadSuccess.bind(this);
    this.uploadFailed = this.uploadFailed.bind(this);
    this.uploadProgress = this.uploadProgress.bind(this);
    this.clear = this.clear.bind(this);

    this.setFile = this.setFile.bind(this);
  }

  getValue() {
    return this.state.value;
  }
  setValue(value) {
    if (Array.isArray(value)) {
      this.setState({
        value: value,
        files: value,
      });
    } else {
      console.log("请使用数组");
    }
  }

  /**
   * 选择文件
   */
  onClick() {
    if (!this.props.name) {
      Msg.error("文件上传必须指定name属性");
      return;
    }
    if (!this.props.url) {
      Msg.error("您没有设置上传的服务器地址");
      return;
    }
    if (this.props.disabled || this.state.uploadDisabled) {
      return;
    }

    this.fileinput.current.click();
  }

  /**
   * 选择文件
   * @param {} event
   */
  onChange(event) {
    //选择文件
    this.setFile(event.target.files);
    this.props.onChange && this.props.onChange(event.target.files);
  }

  /**
   * 设置上传时文件参数
   * @param {array} targetFiles 文件
   * @returns
   */
  setFile(targetFiles = []) {
    if (!this.props.url) {
      Msg.alert("您没有设置上传的服务器地址");
      return;
    }
    if (targetFiles.length > 0 && this.validateType(targetFiles)) {
      let files = [];
      for (let i = 0; i < targetFiles.length; i++) {
        files.push(targetFiles[i]);
      }
      this.setState(
        {
          files: files,
          uploadDisabled: this.props.autoUpload ? true : false, // 设置上传状态
          uploadTitle: {}, //清空状态
          uploadStaus: {}, //清空状态
          value: files.map((item) => {
            return {
              name: item.name,
            };
          }),
        },
        () => {
          this.props.autoUpload && this.uploadPreHandler(); //
        }
      );
    } else {
      if (targetFiles.length > 0) {
        Msg.error("上传的文件类型不正确");
        this.clear(); //清除
      }
      return;
    }
  }
  /**
   *
   * @param {*} event
   */
  onDragOver(event) {
    //在ondragover中一定要执行preventDefault()，否则ondrop事件不会被触发
    event.preventDefault();
  }
  onDrop(event) {
    if (this.props.disabled || this.state.uploadDisabled) {
      return;
    }

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      this.setFile(event.dataTransfer.files);
    }
  }
  //验证文件上传类型是否正确
  validateType(files) {
    // 文件上传不处理
    let accept = this.props.accept;
    if (accept) {
      return fileType.filter(accept, files);
    } else {
      return true;
    }
  }
  //验证是否为图片
  validateImageType(files) {
    return fileType.filter("image", files);
  }
  //上传预处理
  uploadPreHandler() {
    if (this.props.disabled) {
      return;
    }
    if (this.props.url && this.props.name) {
      // 进行有效性验证
      if (this.state.files && this.state.files.length > 0) {
        if (!this.validateType(this.state.files)) {
          Msg.error("上传的文件类型不正确");
          this.clear(); //清除
          return;
        }
        let size = 0; //文件总大小
        for (let index = 0; index < this.state.files.length; index++) {
          // 文件名称，文件对象
          size += this.state.files[index].size;
        }
        if (this.props.size && this.props.size * 1024 * 1024 < size) {
          Msg.error("文件不得超过" + this.props.size + "M");
          this.clear(); //清除
          return;
        }
        this.uploadHandler(0); // 从第一个开始导入
      } else {
        Msg.alert("请选择文件");
        this.clear(); //清除
      }
    } else {
      this.clear();
      Msg.error("url或者name 配置出错了");
    }
  }
  //上传处理
  uploadHandler(index) {
    let percentComplete = 0;
    this.time1 = setInterval(() => {
      percentComplete += 10;
      this.state.uploadTitle[index + ""] = percentComplete;

      this.setState({
        uploadTitle: this.state.uploadTitle,
      });
    }, 300);
    this.time2 = setTimeout(() => {
      let file = this.state.files[index];
      // 实例化一个表单数据对象
      let formData = new FormData();
      //是否有其他参数
      if (this.props.params) {
        for (let key in this.props.params) {
          formData.append(key, this.props.params[key]); //其他参数
        }
      }
      formData.append(this.props.name, file);

      let wasabi_api = window.api || api;
      wasabi_api.ajax({
        url: this.props.url,
        type: "post",
        contentType: false,
        headers: this.props.httpHeaders || {},
        dataType: "json",
        data: formData,
        success: (result) => {
          this.uploadSuccess(index, result);
          if (index + 1 < this.state.files.length) {
            // 执行下一个上传
            this.uploadHandler(index + 1);
          }
        },
        progress: (percent) => {
          this.uploadProgress(index, percent);
        },
        error: (message) => {
          this.uploadFailed(index, message);
          if (index + 1 < this.state.files.length) {
            // 执行下一个上传
            this.uploadHandler(index + 1);
          }
        },
      });
      clearInterval(this.time1);
      clearTimeout(this.time2);
    }, 1000);
  }
  //上传进度
  uploadProgress(index, percentComplete) {
    this.state.uploadStaus[index + ""] = 0;
    this.state.uploadTitle[index + ""] = percentComplete;
    this.setState({
      uploadStaus: this.state.uploadStaus,
      uploadTitle: this.state.uploadTitle,
    });
  }
  //上传完成
  uploadSuccess(index, result) {
    this.state.uploadStaus[index + ""] = -1;
    this.setState({
      uploadStaus: this.state.uploadStaus,
    });
    let data = func.getSource(result, this.props.dataSource);
    this.props.uploadSuccess &&
      this.props.uploadSuccess(data, this.state.files[index]);
    if (index === this.state.files.length - 1) {
      this.clear();
    }
  }
  //上传文件失败
  uploadFailed(index, message) {
    this.state.uploadStaus[index + ""] = -1;
    this.setState({
      uploadStaus: this.state.uploadStaus,
    });
    if (index === this.state.files.length - 1) {
      this.clear();
      Msg.error(message);
    }
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
      });
    }
  }
  /**
   * 删除某个文件
   * @param {*} index
   */
  removeFile(index, name, title, event) {
    event.stopPropagation();
    let files = this.state.files;
    let value = this.state.value;
    value.splice(index, 1);
    files.splice(index, 1);

    this.setState({
      value: value,
      files: files,
    });
  }

  /**
   * 父组件执行上传功能
   */
  open() {
    if (this.props.disabled) {
      return;
    }
    this.uploadPreHandler();
  }

  /**
   * 得到每个的上传状态
   * @param {*} uploadStaus
   * @returns
   */
  renderUploadStatus(uploadStaus) {
    let iconCls = "icon-time";
    let theme = "warning";
    let title = "上传中";
    switch (uploadStaus) {
      case -1:
        iconCls = "icon-error";
        theme = "danger";
        title = "上传失败";
        break;
      case 1:
        iconCls = "icon-check";
        theme = "success";
        title = "上传成功";
        break;
      default:
        break;
    }
    return {
      iconCls,
      theme,
      title,
    };
  }

  //渲染预览
  renderPreview() {
    if (
      this.props.type === "cloud" &&
      this.state.files.length === 1 &&
      this.validateImageType(this.state.files)
    ) {
      /* 云上传形式，单图片上传预览直接放到上传位置 */
      return (
        <div
          key="preview2"
          onClick={this.onClick.bind(this)}
          className="wasabi-uplaod-files onlyone"
        >
          <img
            id={this.state.uploadImgid}
            style={{ width: "100%", height: "100%" }}
            src={window.URL.createObjectURL(this.state.files[0]) || ""}
          ></img>
          <LinkButton
            key="clear"
            iconCls={"icon-clear"}
            theme="danger"
            style={{
              backgroundColor: "white",
              position: "absolute",
              right: 0,
              top: 0,
            }}
            onClick={this.removeFile.bind(this, 0)}
          ></LinkButton>
        </div>
      );
    } else if (this.state.files.length > 0) {
      //其他形式则按顺序存放
      return (
        <div key="2" className={"wasabi-uplaod-files "}>
          {this.state.files.map((item, index) => {
            let status = this.renderUploadStatus(
              this.state.uploadStaus[index + ""]
            );
            return (
              <div key={"div" + index} className="file">
                {this.validateImageType([item]) ? (
                  <React.Fragment>
                    <img
                      style={{ width: 20, height: 20, marginRight: 2 }}
                      src={window.URL.createObjectURL(item)}
                    ></img>
                    <LinkButton theme="info" key={index}>
                      {item.name}
                    </LinkButton>
                  </React.Fragment>
                ) : (
                  <LinkButton
                    iconCls="icon-attachment"
                    theme="info"
                    key={index}
                  >
                    <span style={{ marginLeft: 10 }}>{item.name}</span>
                  </LinkButton>
                )}
                {status.iconCls === "icon-time" ? (
                  <div className="wasabi-upload-progress">
                    <span>{this.state.uploadTitle[index + ""] || 0}%</span>
                  </div>
                ) : (
                  <LinkButton
                    key="check"
                    iconCls={status.iconCls}
                    theme={status.theme}
                    title={status.title}
                  ></LinkButton>
                )}

                <LinkButton
                  key="clear"
                  iconCls={"icon-clear"}
                  theme="info"
                  onClick={this.removeFile.bind(this, index)}
                ></LinkButton>
              </div>
            );
          })}
        </div>
      );
    }
  }
  //渲染上传控件
  renderUpload() {
    let props = {
      accept: fileType.getAccept(this.props.accept),
      multiple: this.props.multiple,
    };
    if (this.props.type === "cloud") {
      return (
        <div
          key="1"
          className={
            "wasabi-upload-cloud " + (this.props.disabled ? "disabled" : "")
          }
          onDrop={this.onDrop.bind(this)}
          onDragOver={this.onDragOver.bind(this)}
        >
          <i
            className="icon-upload wasabi-upload-icon"
            onClick={this.onClick.bind(this)}
          ></i>
          <div className="wasabi-upload-text">
            将文件拖到此处或
            <LinkButton onClick={this.onClick.bind(this)}>点击上传</LinkButton>
          </div>
          <input
            id={this.state.uploadid}
            type="file"
            name="file"
            ref={this.fileinput}
            {...props}
            onChange={this.onChange.bind(this)}
            className="wasabi-upload-input"
          />
        </div>
      );
    } else {
      return (
        <div
          key="1"
          className={
            "wasabi-upload-file " + (this.props.disabled ? "disabled" : "")
          }
        >
          <Button
            iconCls="icon-cloud"
            disabled={this.props.disabled || this.state.uploadDisabled}
            onClick={this.onClick.bind(this)}
          >
            点击上传
          </Button>
          <input
            id={this.state.uploadid}
            type="file"
            name="file"
            ref={this.fileinput}
            {...props}
            onChange={this.onChange.bind(this)}
            className="wasabi-upload-input"
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div
        className={"wasabi-upload-container " + (this.props.className || "")}
        style={this.props.style}
      >
        {this.renderUpload()}

        {this.renderPreview()}
      </div>
    );
  }
}

Upload.propTypes = {
  type: PropTypes.oneOf(["file", "cloud"]), //上传类型
  autoUpload: PropTypes.bool, //是否自动上传
  className: PropTypes.string, //
  style: PropTypes.object, //
  httpHeaders: PropTypes.object, //请求的头部信息
  params: PropTypes.object, //其他参数
  url: PropTypes.string.isRequired, //上传地址
  accept: PropTypes.oneOf([
    "word",
    "excel",
    "ppt",
    "office",
    "txt",
    "pdf",
    "html",
    "image",
    "media",
    "zip",
    "json",
  ]), //上传文件类型
  multiple: PropTypes.bool, //是否允许多选
  size: PropTypes.number, //上传大小限制M
  name: PropTypes.string, //名称
  uploadSuccess: PropTypes.func, //上传成功事件
  disabled: PropTypes.bool, //是否禁止
};
Upload.defaultProps = {
  type: "file",
  autoUpload: true, //允许
};
export default ValidateHoc(Upload);
