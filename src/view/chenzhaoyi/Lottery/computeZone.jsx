import React, {Component} from "react"; //导入React 的核心库
import {connect} from 'react-redux';
import PropTypes from "prop-types";

/**
* @ClassName: ${ComputeZone}
* @Description: ${彩票计算区组件，用于显示当前选择数及相应的组合数}}}
* ${<ComputeZone/>}
*/
class ComputeZone extends Component {
    constructor(props){
        super(props);
        this.state={
        }
        //事件绑定
        this.computeWays=this.computeWays.bind(this);
    }

    /**
     * 计算组合数
     * @returns {number} 组合数
    */
    computeWays(){
        let pr = this.props.proArr.length;
        let pos = this.props.postArr.length;
        let mpr = this.props.minPro;
        let mpos = this.props.minPost;
        let prways =0;
        let posways =0;

        //初始化计算过程量，组合公式为pr!/(mpr!*(pr-mpr)!)和pos!/(mpos!*(pos-mpos)!)
        let prw1=1,prw2=1,posw1=1,posw2=1;
        if(pr >= mpr && pos >= mpos){
            for(let i=pr-mpr+1;i<=pr;i++){//pr!/(pr-mpr)!
                prw1=prw1*i;
            }
            for(let i=1;i<=mpr;i++){//mpr!
                prw2=prw2*i;
            }
            for(let i=pos-mpos+1;i<=pos;i++){//pos!/(pos-mpos)!
                posw1*=i;
            }
            for(let i=1;i<=mpos;i++){//mpos!
                posw2*=i;
            }
            prways=prw1/prw2;//前区可选择方法数
            posways =posw1/posw2;//后区可选择方法数
            //一共可选择方法数            
        }
        return prways*posways;
    }

    render(){
        let {ftProColor,ftPostColor,
            proArr,postArr} = this.props
        return(
            <div className="computeZone Title">
                您选择了
                <span style={{color:ftProColor}}>{proArr.length}</span>
                个前区号码,
                <span style={{color:ftPostColor}}>{postArr.length}</span>
                个后区号码，共 
                <span className="EmpTitle">
                    {this.computeWays()}
                </span>
                注
            </div>
        );
    }

}
ComputeZone.propTypes = {
    minPro:PropTypes.number,//前区至少选择球数
    minPost:PropTypes.number,//后区至少选择球数
    ftProColor:PropTypes.string,//前区字体颜色
	ftPostColor:PropTypes.string,//后区字体颜色
}
ComputeZone.defaultProps = {
    minPro:0,
    minPost:0,
    ftProColor:"",
	ftPostColor:"",
}
function mapStateToProps(state){
	return{
		proArr:state.proArr,//前区选中数组
    	postArr:state.postArr,//后区选中数组
	}
}
export default connect(mapStateToProps)(ComputeZone);