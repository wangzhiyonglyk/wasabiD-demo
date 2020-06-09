import React,{Fragment} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
/**
* @ClassName: ${SelectBall}
* @Description: ${彩票小球组件，通过颜色变化展示选择情况}}}
* ${<SelectBall/>}
*/
function SelectBall({value,type,handleBallClick,proArr,postArr}){
	let style;
	if(type=="pro"){//判断前后区，通过当前状态是否选中显示不同颜色
		style ={background:proArr.indexOf(value)!=-1?"#ff5b1a":"#ffffff",
				color:proArr.indexOf(value)!=-1?"#ffffff":"#000000"};
	}else{
		style ={background:postArr.indexOf(value)!=-1?"#6857ca":"#ffffff",
				color:postArr.indexOf(value)!=-1?"#ffffff":"#000000"};
	}
	return(
		<Fragment>
			<button
			className = {"ball "+type+"Ball"}
			value={value}
			style={style}
			onClick={handleBallClick}
			>{value}</button>		
		</Fragment>
	)		
}
SelectBall.propTypes = {
    value:PropTypes.string,//小球值
	type:PropTypes.oneOf(['pro', 'post']).isRequired,//类型，须为前后区之一
	handleBallClick:PropTypes.func,//小球点击函数
}
SelectBall.defaultProps = {
    value:"",
	type:"",
	handleBallClick:null,
}
function mapStateToProps(state){
	return{
		proArr:state.proArr,//前区选中数组
		postArr:state.postArr,//后区选中数组
	}
}
export default connect(mapStateToProps)(SelectBall);