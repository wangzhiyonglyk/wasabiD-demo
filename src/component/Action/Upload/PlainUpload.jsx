

/*/
 create by wangzy
 date:2020-11-20 改造上传组件
 desc:文件上传组件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Msg from '../../Info/Msg.jsx';
import LinkButton from "../../Buttons/LinkButton"
import fileType from "../../libs/fileType";
import api from "wasabi-api";
import func from "../../libs/func";

import('./index.css');
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadid:func.uuid(),
            files: [], //选择的文件名集合
            uploadTitle: '正在上传',
            uploadDisabled: false,//是否禁止上传
        }
     
        this.onChange = this.onChange.bind(this);
        this.importHandler = this.importHandler.bind(this);
        this.uploadSuccess = this.uploadSuccess.bind(this);
        this.uploadFailed = this.uploadFailed.bind(this);
        this.uploadProgress = this.uploadProgress.bind(this);
   
        this.clear=this.clear.bind(this);

    }
    /**
     * 选择文件
     * @param {} event 
     */
    onChange(event) {
        //选择文件
      this.setFile(event.target.files)
     
    }
    onDrop(event){
        event.preventDefault();
        event.stopPropagation();
        if(event.dataTransfer.files&&event.dataTransfer.files.length>0){
            this.setFile(event.dataTransfer.files)
        }
       
    }

    setFile(targetFiles){
        if(!this.props.uploadurl){
            Msg.info('您没有设置上传的服务器地址');
            return;
        }
        this.files =targetFiles;//保存
        let files = this.state.files;
        if (this.files.length > 0) {
            for (let index = 0; index < this.files.length; index++) {
                files.push( this.files[index].name)
            }
            this.setState({
                files: files,
                uploadDisabled:true,                
            },()=>{
               this.props.multiple!=true&&this.importHandler();//单文件上传则直接上传
            });
        }
       
    }
    /**
     * 
     * @param {*} event 
     */
    onDragOver(event){
        event.preventDefault();
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
        if(this.props.disabled||this.props.uploadDisabled){
            return;
        }
        //执行导入事件
        // 实例化一个表单数据对象
        let formData = new FormData();
        // 遍历文件列表，插入到表单数据中

        if (this.files && this.files.length > 0) {
            if (this.props.uploadurl) {
                if (!this.validateType(this.files)) {
                    Msg.error("上传的文件类型不正确");
                    this.clear();//清除
                    return;
                }
                if (this.files.length == 1) {
                    //单文件上传时，如果指定了name，则以name为基准
                    if (!this.props.name) {
                        Msg.error("单文件上传必须指定name属性");
                        this.clear();//清除
                        return;
                    }
                    if (this.props.size && this.props.size * 1024 * 1024 < this.files[0].size) {
                        Msg.error("文件不得超过" + this.props.size + "M");
                        this.clear();//清除
                        return;
                    }
                    formData.append(this.props.filename || this.files[0].name, this.files[0]);
                } else {
                    let size = 0;//文件总大小
                    for (let index = 0; index < this.files.length; index++) {
                        // 文件名称，文件对象
                        size += this.files[index].size;
                        formData.append(this.files[index].name, this.files[index]);
                    }
                    if (this.props.size && this.props.size * 1024 * 1024 < size) {
                        Msg.error("文件不得超过" + this.props.size + "M");
                        this.clear();//清除
                        return;
                    }
                }
                //是否有其他参数
                if (this.props.params) {
                    for (var s in this.props.params) {
                        formData.append(s, this.props.params[s]);//其他参数
                    }
                }
                api.ajax({
                    url:this.props.uploadurl,
                    type:"post",
                     contentType:false,
                     headers:this.props.httpHeaders,
                     dataType:"json",
                     data:formData,
                     success:(result)=>{
                         this.props.uploadSuccess(result);
                     },
                     progress:(percent)=>{
                        this.uploadProgress(percent);
                     },
                     error:(message)=>{
                       this.uploadFailed(message);
                     }

                     
                })


            } else {
                Msg.info('您没有设置上传的服务器地址');
                this.clear();//清除
            }
        } else {
            Msg.info('请选择文件');
        }
    }
    //上传进度
    uploadProgress(percentComplete) {
        if (percentComplete < 100) {
            this.setState({
                uploadTitle: '上传了' + percentComplete + '%'
            });
        } else {
            this.setState({
                uploadTitle: '处理中...'
            });
        }
    }
    //上传完成
    uploadSuccess(result) {
        this.setState({
            files:[]
        })
        this.props.uploadSuccess(result, this.state.files);
        

    }
    //上传文件失败
    uploadFailed(message) {
       
        this.clear();
        Msg.error(message);
    }
     /**
     * 清空文件
     */
    clear(){
        let obj = document.getElementById(this.state.uploadid) ;
        obj.value="";
        this.setState({
            files:[],
            uploadDisabled:false
        })
    }
    /**
     * 选择文件
     */
    onClick() {
        if(this.props.disabled||this.props.uploadDisabled){
            return;
        }
        else{
            this.refs.file.click();
        }
       
    }

    render() {
        let props = {
            accept: this.props.accept,
            multiple: this.props.multiple
        };

        return (

            <div className={"wasabi-upload " +this.props.disabled} onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>
                <div key="1" style={{display:this.state.files.length>0?"none":"block"}} >
                <i className="icon-upload wasabi-upload-icon"></i>
                <div className="wasabi-upload-text">将文件拖到此处，或<LinkButton onClick={this.onClick.bind(this)}>点击上传</LinkButton></div>
                <input id={this.state.uploadid} type="file" name="file" ref="file"  {...props} onChange={this.onChange.bind(this)} className="wasabi-upload-input" />
                
                </div>
               <div key="2" className="wasabi-uplaod-files" style={{display:this.state.files.length>0?"block":"none"}}>
              <i key="loading" className="icon-loading wasabi-upload-icon"></i>
                    {
                       
                        this.state.files&&this.state.files.length>0&&this.state.files.map((item,index)=>{
                       return  <div key={"div"+index}><LinkButton iconCls="icon-file" key={index}>{item}</LinkButton></div> 
                        })
                    }
                  
                </div>
               
            </div>
        );
    }
}

Upload.propTypes = {
    httpHeaders: PropTypes.object,//请求的头部信息
    params: PropTypes.object,//其他参数
    uploadurl: PropTypes.string, //上传地址
    accept: PropTypes.string, //上传文件类型
    multiple: PropTypes.bool, //是否允许多选
    size: PropTypes.number,//上传大小限制
    name: PropTypes.string, //名称
    uploadSuccess: PropTypes.func //上传成功事件
};
Upload.defaultProps = {
    httpHeaders: {},
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