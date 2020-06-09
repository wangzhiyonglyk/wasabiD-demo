import React,{Component} from "react";
import ReactDom from "react-dom";
import {Provider} from 'react-redux';
import store from "./store";

import SelectZone from "./selectZone";
import ComputeZone from "./computeZone";
import DisplayZone from "./diaplayZone";

import "./index.css";

const defaultData = [
	{	
			type:"pro",
			name:"前区",
			arr:["01","02","03","04","05","06","07","08","09",
			"10","11","12","13","14","15","16","17","18","19",
			"20","21","22","23","24","25","26","27","28","29",
			"30","31","32","33","34","35"],
			minSelect:5,
			ftColor:"#ff5b1a"
	},
	{
			type:"post",
			name:"后区",
			arr:["01","02","03","04","05","06",
			"07","08","09","10","11","12"],
			minSelect:2,
			ftColor:"#6857ca"
	}
];//默认设定值数组

class Index extends Component {
  render(){
		return(
			<Provider store={store}>
				<SelectZone 
				type={defaultData[0].type}
				name={defaultData[0].name}
				arr={defaultData[0].arr}
				minSelect={defaultData[0].minSelect}
				ftColor={defaultData[0].ftColor}
				/>
				<SelectZone 			
				type={defaultData[1].type}
				name={defaultData[1].name}
				arr={defaultData[1].arr}
				minSelect={defaultData[1].minSelect}
				ftColor={defaultData[1].ftColor}
				/>
				<ComputeZone
				minPro={defaultData[0].minSelect}
				ftProColor={defaultData[0].ftColor}
				minPost={defaultData[1].minSelect}
				ftPostColor={defaultData[1].ftColor}
				/>
				<DisplayZone
				arrPro={defaultData[0].arr}
				minPro={defaultData[0].minSelect}
				arrPost={defaultData[1].arr}
				minPost={defaultData[1].minSelect}
				/>
			</Provider>
		)
	}
}
ReactDom.render(<Index/>,document.getElementById("root"))