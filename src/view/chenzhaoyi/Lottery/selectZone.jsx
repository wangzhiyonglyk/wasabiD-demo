import React,{Component,Fragment} from "react";
import SelectBall from "./selectBall";
import * as Actions from './action';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
/**
* @ClassName: ${SelectZone}
* @Description: ${彩票选择区组件，传参不同分为前后区,用于展示小球和定数机选功能}}}
* ${<SelectZone/>}
*/
class SelectZone extends Component {
	constructor(props){
		super(props);
		this.state={
		}
		this.renderAutoSelectBox=this.renderAutoSelectBox.bind(this);
	}
	/**
	 * 渲染下拉框
	 * @returns {Array} 下拉框选项
	 */
	renderAutoSelectBox(){
		 let autoSelectPost=[];
		 //循环插入下拉框选项,i从最少应选择球数开始
		 for(let i=this.props.minSelect;i<=this.props.arr.length;i++){
			autoSelectPost.push(
				<option key={i} value={i}>{i}</option>
			);
		 } 
		 return autoSelectPost;
	}
  render(){

	let {type,name,arr,minSelect,ftColor,
		proSelectValue,postSelectValue,
		handleBallClick,handleChangeOnBox,handleAutoSelect,handleClearClick}=this.props;
    return(
		<Fragment>
		<div className={type+"SelectZone"}>
			<div className="Title">
				___
				<span className="SubTitle" style={{color:ftColor}}>{name}</span>
				___至少选
				<span style={{color:ftColor}}>{minSelect}</span>
				个
			  </div>
			<div className={type+"BallZone"}>
				{
					arr.map((item)=>{
						return <SelectBall
							key = {item}
							value = {item}
							type = {type}
							handleBallClick={handleBallClick.bind(this,item)}
						></SelectBall>
					})
				}				
			</div>
			<div className="autoSelectZone"> 
				<select className="autoSelectBox"
					onChange={handleChangeOnBox}
					value={type=="pro"?proSelectValue:postSelectValue}//react绑定选择框值
					>
						{this.renderAutoSelectBox()}
				</select>
				<input
						type='button'
						className='autoSelectBtn'
						id='autoSelectBtn'
						value={"机选"+name}
						onClick={handleAutoSelect}
				/>
				<input
						type='button'
						className='clearBtn'
						id='clearBtn'
						value="清"    
						onClick = {handleClearClick}              
				/>
			  </div>
		</div>
		</Fragment>
    )
	}	
}
SelectZone.propTypes = {
	type:PropTypes.oneOf(['pro', 'post']).isRequired,//类型，须为前后区之一
	name:PropTypes.string,//区名
	arr:PropTypes.array,//区内小球值数组
	minSelect:PropTypes.number,//至少选择球数
	ftColor:PropTypes.string,//区内字体颜色
}
SelectZone.defaultProps = {
	type:"",
	name:"",
	arr:[],
	minSelect:0,
	ftColor:"",
}
function mapStateToProps(state){
	return{
		proSelectValue:state.proSelectValue,//前区下拉框内选中机选个数
    	postSelectValue:state.postSelectValue,//后区下拉框内选中机选个数
	}
}
function mapDispatchToProps(dispatch,ownProps){
	return{
		handleClearClick:()=>{//清空区内选择按钮点击事件
			const action=Actions.doClear(ownProps.type); 
			dispatch(action);
		},
		handleChangeOnBox:(e)=>{//下拉框选中值改变事件
			console.log(e.target.value);
			const action=Actions.doChangeOnBox(ownProps.type,e.target.value,ownProps.arr); 
			dispatch(action);
		},
		handleAutoSelect:()=>{//机选按钮点击事件
			const action=Actions.doAutoSelect(ownProps.type,ownProps.arr); 
			dispatch(action);
		},
		handleBallClick:(item)=>{//小球点击事件
			const action=Actions.doBallClick(ownProps.type,item); 
			dispatch(action);
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectZone);