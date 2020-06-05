import React,{Component,Fragment} from "react";
import ReactDom from "react-dom";

import PageModel from "./PageModel";
import config from "@/libs/config";
import { Globalstyle } from '@/statics/iconfont/iconfont'//导入图标样式

class Index extends Component {
// 构造方法
	constructor(props){
		super(props);
		this.state={
			model:[
				{
					label:"景点名称",
					name:"name",
					type:"text",
					required:true,
				},
				{
					label:"顺序",
					name:"orderBy",
					type:"number",
					value:0,
					required:true
				},
				{
					label:"图片",
					name:"url",
					type:"text",
					required:true,
					readonly:true
				}
			]//自定义表头
		}
	}
  render(){
		return(
			<Fragment>
			<Globalstyle/>
				<PageModel
						title="酒店管理系统"
						model = {this.state.model}
						imageLabel="图片"
						appid={config.appid_hotel}
						url_get={config.url_hotel_get}
						url_upload={config.url_upload}
						url_save={config.url_hotel_save}
						url_delete={config.url_hotel_delete}
				></PageModel>
			</Fragment>
		)
	}
}
ReactDom.render(<Index/>,document.getElementById("root"))