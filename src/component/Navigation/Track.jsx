//create by wangzy
//date 2016-07-27
//desc 物流跟踪信息

import React from "react";
import PropTypes from "prop-types";
import ("../sass/Navigation/Track.css");
class Track extends  React.Component {

    constructor(props){
        super(props);
        this.state = {
            model:this.props.model,
            expressName:this.props.expressName||"",
            expressId:this.props.expressId,
        }
    }
   static propTypes= {
        model:PropTypes.array,//跟踪信息
        expressName:PropTypes.string,//快递公司名称
        exrepssId:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),//快递单号


    }
    static  defaultProps= {
            model:null,
            expressName:null,
            expressId:null,

    }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         model:nextProps.model,
    //         expressName:nextProps.expressName,
    //         expressId:nextProps.expressId,
    //     })
    // }
    static getDerivedStateFromProps(nextProps, prevState)
    {
        return {
            model:nextProps.model,
            expressName:nextProps.expressName,
            expressId:nextProps.expressId,
        }
    }

    render() {
        if(this.state.model instanceof  Array)
        {
            return(
                <div className="wasabi-track">
              <div className="express" style={{display:this.state.expressName||this.state.expressId?"block":"none"}}>  <div className="expressName"  
              >{"快递公司:   "+this.state.expressName}</div><div className="expressId">{"快递单号:  "+this.state.expressId}</div></div>
                <ul >

                    {
                        this.state.model.map((child,index) =>{
                            return <li key={index}><div className="track-time">{child.time}</div><div className="track-info">{child.info}</div></li>
                        })
                    }
                </ul>
                    </div>
            )
        }
        else {
            return null;
        }
    }
}
export default  Track;