import React,{Component,Fragment} from "react";
import PropTypes from 'prop-types';

import DataGrid from "component/Data/DataGrid";
import Button from "component/Buttons/Button";
import LinkButton from "component/Buttons/LinkButton";
import SlidePanel from "component/Layout/SlidePanel";
import Form from "component/Form/Form";
import Input from "component/Form/Input";
import Upload from "component/Action/Upload";
import Message from "component/Unit/Message";
import api from "@/libs/api"

import "./index.css";

/**
* @ClassName: ${PageModel}
* @Description: ${单页面组件，支持增删改}
* ${<PageModel/>}
*/
class PageModel extends Component {
	constructor(props){
		super(props);
		this.state={
		};
		//事件绑定
		this.handleAddBtnClick=this.handleAddBtnClick.bind(this);
		this.handleMultiDeleteBtnClick=this.handleMultiDeleteBtnClick.bind(this);
		this.handleSubmitBtnClick=this.handleSubmitBtnClick.bind(this);
		this.handleChoseUploadBtnClick = this.handleChoseUploadBtnClick.bind(this);
		this.handleUploadSuccess=this.handleUploadSuccess.bind(this);
		this.renderHeader=this.renderHeader.bind(this);
		this.changeViewOfImage=this.changeViewOfImage.bind(this);
	}
	/**
	 * @method renderHeader
	 * @for PageModel
	 * @returns {array} 表头数组
	 * @description 渲染DataGrid表头
	*/
	renderHeader(){
		let header_custom = this.props.model;//自定义表头
		header_custom.map((item)=>{
			if(item.name=="url" && item.label==this.props.imageLabel){
				this.changeViewOfImage(item);
			}//是否有图片项，若有，展示图片
		})

		let header_default = [
		{
			label:"操作",
			name:"op",
			width:300,
			content:(rowData)=>{
				return <div>
					<LinkButton iconCls="icon-edit" title="编辑" 
								onClick={this.handleEditBtnClick.bind(this,rowData)}></LinkButton>
					<LinkButton iconCls="icon-remove" title="删除" 
								onClick={this.handleDeleteBtnClick.bind(this,rowData.id)}></LinkButton>						
				</div>
			}
		}
		];//默认删改操作表头
		return header_custom.concat(header_default);
	}
	/**
	 * @method changeViewOfImage
	 * @for PageModel
	 * @param {array}item 图片项
	 * @returns {html} img标签
	 * @description 把图片url转成图片显示
	*/
	changeViewOfImage(item){
		item.width = "200px";
		item.content = function(rowData){
			return <img className="image" src={rowData.url} ></img>
		}
	}
  	render(){
		let style = {padding:"20px"};
		const {
			title,model,appid,url_get,url_upload
		}=this.props;		
        return(
            <Fragment>
				<div>
					<div id="dd"></div>
					<div className="title">{title}</div>
					<div className="btn-group">			
						<Button
							name = "row-add"
							onClick={this.handleAddBtnClick}
						><span className="iconfont">&#xe606;</span></Button>								
						<Button
							name = "row-multi-delete"
							onClick={this.handleMultiDeleteBtnClick}
						><span className="iconfont">&#xe605;</span></Button>
						{/* <LinkButton iconCls="icon-plus" title="添加" 
							onClick={this.handleAddBtnClick}></LinkButton>
						<LinkButton iconCls="icon-bin" title="删除" 
							onClick={this.handleMultiDeleteBtnClick}></LinkButton> */}
					</div>
					<DataGrid
						ref="grid"
						style={style}//对象
						selectAble={true} // 是否显示选择，默认值 false                    
						rowNumbe={false} //是否显示行号,true
						focusAble={false} //是否显示焦点行，默认值 true
						borderAble={true} //是否显示表格边框，默认值 false
						clearChecked={true} //刷新数据后是否清除选择,true
						selectChecked={true} //选择行的时候是否同时选中,false
						headers={this.renderHeader()} //表头设置为renderHeader函数返回值
						url={url_get}//ajax地址
						params={{appid:appid}}//查询条件
					></DataGrid>
				</div>
				<SlidePanel 
					ref="slider"
					title="编辑">
					<Form ref="form" onSubmit={this.handleSubmitBtnClick}>
						{
							model.map(item=>{
								return <Input key={item} {...item}></Input>
							})
						}
						{
							<LinkButton 
								onClick={this.handleChoseUploadBtnClick}> 选择</LinkButton>
						}
					</Form>
				</SlidePanel>
				<Upload ref="upload"  
						uploadurl ={url_upload} 
						uploadSuccess={this.handleUploadSuccess} accept="image" 
						name="file" 
						params={{appid:appid}}
				></Upload>
            </Fragment>
        )
	}
	/**
	 * @method handleAddBtnClick
	 * @for PageModel
	 * @description 添加项
	*/
	handleAddBtnClick(){
		this.editid="";//清空编辑项id
		this.refs.form.clearData();//清空表单数据
		this.refs.slider.open();
	}
	/**
	 * @method handleMultiDeleteBtnClick
	 * @for PageModel
	 * @description 删除多项
	*/
	handleMultiDeleteBtnClick(){
		let data=this.refs.grid.getChecked();//获取选中项
		 let ids="";
		 for(let i=0;i<data.length;i++){
			 if(i==0)
			 {
				ids+=data[i].id;	
			 }
			 else{
				ids+=","+data[i].id;
			 }		
		 }//获取要删除id字符串，以逗号间隔	
		 console.log("delete ids is: ",ids);
		if(data&&data.length>0){
			Message.confirm("delete?",()=>{
				api.ajax({
					url:this.props.url_delete,
					type:"post",
					data:{
						appid:this.props.appid,
						id:ids
					},
					success:(res)=>{
				if(res.statusCode==200){			
					this.refs.grid.reload();//刷新数据表
				}
					}
				})		
			})	
		}
		else{
			Message.info("选择为空");
		}
	}
	/**
	 * @method handleEditBtnClick
	 * @for PageModel
	 * @param {array}rowData 选中项对象
	 * @description 编辑选中项
	*/
	handleEditBtnClick(rowData){
		this.editid=rowData.id;//设置编辑项id
		this.refs.form.setData(rowData);//将该项原数据填入表单
		this.refs.slider.open();
	}
	/**
	 * @method handleDeleteBtnClick
	 * @for PageModel
	 * @param {string}id 选中项id值
	 * @description 删除选中项
	*/
	handleDeleteBtnClick(id){
		Message.confirm("delete?",()=>{
			api.ajax({
				url:this.props.url_delete,
				type:"post",
				data:{
					appid:this.props.appid,
					id:id
				},
			success:(res)=>{
				if(res.statusCode==200){
					this.refs.grid.reload();//刷新数据表
				}
			}
			})
			console.log("delete id is: ",id);
		})
	}
	/**
	 * @method handleChoseUploadBtnClick
	 * @for PageModel
	 * @description 选择文件
	*/
	handleChoseUploadBtnClick(){
		this.refs.upload.open();
	}
	/**
	 * @method handleUploadSuccess
	 * @for PageModel
	 * @param {array}res 返回结果
	 * @description 上传成功
	*/
	handleUploadSuccess(res){

		let data=this.refs.form.getData();
		console.log(res);
		data.url=res.data;
		this.refs.form.setData(data);
		this.refs.upload.close();
	}
	/**
	 * @method handleSubmitBtnClick
	 * @for PageModel
	 * @param {array}data 提交项
	 * @description 提交操作
	*/
	handleSubmitBtnClick(data){

		data.id=this.editid;//获取当前修改项id
		data.appid=this.props.appid;
		api.ajax({
			url:this.props.url_save,
			type:"post",
			data:data,
			success:(res)=>{
		if(res.statusCode==200){
		
			this.refs.grid.reload();//刷新数据表
			this.refs.slider.close();//关闭滑动面板
		}
			}
		})
	}
}
PageModel.propTypes = {
	title:PropTypes.string,//自定义标题
	model:PropTypes.array.isRequired,//自定义表头(必填)
	imageLabel:PropTypes.string,//自定义图片项名称
	appid:PropTypes.string.isRequired,//接口id(必填)
	url_get:PropTypes.string.isRequired,//获取数据接口url(必填)
	url_upload:PropTypes.string.isRequired,//上传数据接口url(必填)
	url_save:PropTypes.string.isRequired,//存储数据接口url(必填)
	url_delete:PropTypes.string.isRequired,//删除数据接口url(必填)
}
PageModel.defaultProps = {
	title:"",
	model:[],
	imageLabel:"",
	appid:"",
	url_get:"",
	url_upload:"",
	url_save:"",
	url_delete:"",
}
export default PageModel;