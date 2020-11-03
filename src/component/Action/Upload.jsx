/*/
 create by wangzy
 date:2016-05-17
 edit:2020-03-13
 desc:文件上传组件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal.jsx';
import Button from '../Buttons/Button.jsx';
import Message from '../Unit/Message.jsx';
import fileType from "../libs/fileType";
import('../Sass/Action/Import.css');
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filenames: '', //选择的文件名集合
      uploadTitle: '上传',
      uploadDisabled: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onChange = this.onChange.bind(this);
    this.importHandler = this.importHandler.bind(this);
    this.uploadCanceled = this.uploadCanceled.bind(this);
    this.uploadComplete = this.uploadComplete.bind(this);
    this.uploadFailed = this.uploadFailed.bind(this);
    this.uploadProgress = this.uploadProgress.bind(this);
    this.uploadend = this.uploadend.bind(this);

  }

  componentWillReceiveProps(nextProps) {

  }
  close() {
    //关闭
    this.refs.modal.close();
  }
  open() {
    //打开
    this.refs.modal.open();
  }
  onChange(event) {
    //选择文件
    if (this.state.uploadDisabled) {
      return;
    }
    this.files = event.target.files;//拿到文件
    let filenames = '';
    if (this.files.length > 0) {
      for (let index = 0; index < this.files.length; index++) {
        if (filenames == '') {
          filenames += this.files[index].name;
        } else {
          filenames += ',' + this.files[index].name;
        }
      }
    }
    this.setState({
      filenames: filenames
    });
  }
  //验证文件上传类型是否正确
  validateType(files) {

    if (this.props.accept) {
      return fileType.filter(this.props.accept, files);
    }
    else {
      return true;
    }


  }
  //上传处理
  importHandler() {
    //执行导入事件
    // 实例化一个表单数据对象
    let formData = new FormData();
    // 遍历文件列表，插入到表单数据中

    if (this.files && this.files.length > 0) {
      if (this.props.uploadurl) {
        if (!this.validateType(this.files)) {
          Message.error("上传的文件类型不正确");
          return;
        }
        if (this.files.length == 1) {
          //单文件上传时，如果指定了name，则以name为基准
          if (!this.props.name) {
            Message.error("单文件上传必须指定name属性");
            return;
          }
          if (this.props.size && this.props.size * 1024 * 1024 < this.files[0].size) {
            Message.error("文件不得超过" + this.props.size + "M");
            return;
          }
          formData.append(this.props.name||this.files[0].name, this.files[0]);
        } else {
          let size = 0;//文件总大小
          for (let index = 0; index < this.files.length; index++) {
            // 文件名称，文件对象
            size += this.files[index].size;
            formData.append(this.files[index].name, this.files[index]);
          }
          if (this.props.size && this.props.size * 1024 * 1024 < size) {
            Message.error("文件不得超过" + this.props.size + "M");
            return;
          }
        }
        //是否有其他参数
        if (this.props.params) {
          for (var s in this.props.params) {
            formData.append(s, this.props.params[s]);//其他参数
          }
        }

        // 实例化一个AJAX对象
        let xhr = new XMLHttpRequest();
      
        if (this.props.progress) {
          xhr.upload.addEventListener('progress', this.uploadProgress.bind(this), false);
        }
        xhr.addEventListener('load', this.uploadComplete.bind(this), false);
        xhr.addEventListener('error', this.uploadFailed.bind(this), false);
        xhr.addEventListener('abort', this.uploadCanceled.bind(this), false);
        xhr.addEventListener('loadend', this.uploadend.bind(this), false);
        xhr.open('POST', this.props.uploadurl, true);
          //添加headers
          if (this.props.httpHeaders && this.props.httpHeaders instanceof Object) {
            try {
              for (let prop in this.props.httpHeaders) {
                xhr.setRequestHeader(prop, this.props.httpHeaders[prop]);
              }
            }
            catch(e){
              console.error("error",e.message);
            }
          }
        // 发送表单数据
        xhr.send(formData);
        this.setState({
          uploadTitle: '上传0%',
          uploadDisabled: true
        });
      } else {
        Message.alert('您没有设置上传路径');
      }
    } else {
      Message.info('请选择文件');
    }
  }
  //上传进度
  uploadProgress(event) {
    if (event.lengthComputable) {
      let percentComplete = Math.round((event.loaded * 100) / event.total);
      if (percentComplete < 100) {
        this.setState({
          uploadTitle: '上传' + percentComplete + '%'
        });
      } else {
        this.setState({
          uploadTitle: '处理中...'
        });
      }
    } else {
      this.uploadFailed();
    }
  }
  //上传完成
  uploadComplete(event) {
    let xhr = event.target;
    if (xhr.readyState == 4 && ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)) {
      let result = JSON.parse(xhr.responseText);

      if (result) {
        if (this.props.uploadSuccess != null) {

          this.props.uploadSuccess(result,this.state.filenames);
        }
      }
      else {//非json格式

        if (this.props.uploadSuccess != null) {
          this.props.uploadSuccess(xhr.responseText,this.state.filenames);
        }
      }

    }
    else {
      Message.error(xhr.statusText);//弹出错误;
    }


  }
  //请求完成
  uploadend(event) {
    let xhr = event.target;

    if (xhr.statusText.indexOf('404') > -1) {//判断是不是404错误
      Message.error('服务器没有响应,请检查您的上传路径');
    } else {

    }
    //重置
    this.setState({

      uploadTitle: '上传',
      uploadDisabled: false
    });
  }
  //上传文件失败
  uploadFailed(event) {
    Message.error('上传文件失败');
  }
  uploadCanceled(evt) {
    //保留这个方法
  }
  render() {
    let props = {
      accept: this.props.accept,
      multiple: this.props.multiple
    };

    return (
      <Modal ref='modal' width={460} height={340} title='请选择导入文件'>
        <div className='import-section'>
          <input
            type='text'
            name={this.props.name}
            className='import-text'
            value={this.state.filenames}
            readOnly={true}
          ></input>
          <input
            type='file'
            ref='import'
            className='import-file'
            onChange={this.onChange.bind(this)}
            {...props}
            style={{ display: this.state.uploadDisabled ? 'none' : 'inline' }}
          ></input>
          <Button
            type='button'
            disabled={this.state.uploadDisabled}
            className='import-chose'
            title='选择文件'
          ></Button>
        </div>
        <div className='import-submit'>
          <Button
            title={this.state.uploadTitle}
            disabled={this.state.uploadDisabled}
            onClick={this.importHandler}
          ></Button>
          <Button title='取消' onClick={this.close} theme='cancel'></Button>
        </div>
      </Modal>
    );
  }
}

Upload.propTypes = {
  httpHeaders:PropTypes.object,//请求的头部信息
  params: PropTypes.object,//其他参数
  uploadurl: PropTypes.string.isRequired, //上传地址
  accept: PropTypes.string, //上传文件类型
  multiple: PropTypes.bool, //是否允许多选
  size: PropTypes.number,//上传大小限制
  name: PropTypes.string, //名称
  uploadSuccess: PropTypes.func //上传成功事件
};
Upload.defaultProps = {
  httpHeaders:{},
  params: null,
  name: null,
  multiple: false,
  size: null,
  accept: null,
  uploadurl: null,
  uploadSuccess: () => {

  }
};
export default Upload;
