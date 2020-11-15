/**
 * 手机模拟器
 */

import React from "react";
import PropTypes from 'prop-types';
import func from "../../libs/func";
import Layout from "../../Layout/Layout";
import Left from "../../Layout/Left";
import Center from "../../Layout/Center";
import Header from "../../Layout/Header";
import Right from "../../Layout/Right";
import Simulator from "../Simulator";
import LinkButton from "../../Buttons/LinkButton"
import "./index.css"
class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containerid: func.uuid(),
            wordNum: 1234,
            frameid: func.uuid(),
            content: [ 
              
              { type:"txt",
                content:  "在高并发业务场景下，典型的阿里双11秒杀等业务，消息队列中间件在流量削峰、解耦上有不可替代的作用。",
            }
            
           ],
        }

    }
    getTypeIcon(type) {
        switch (type) {
            case "title":
                return "icon-flie";
            case "txt":
                return "icon-txt";
            case "image":
                return "icon-image";
            default:
                return "icon-txt";
        }
    }
    render() {
        return <Layout className="wasabi-article">
            <Left width={300} className="wasabi-article-catalog" >

                <div className="tool">
                    <LinkButton iconCls="icon-file" style={{ fontSize: 28, marginLeft: 30 }} theme="info" title="子标题"></LinkButton>
                    <LinkButton iconCls="icon-txt" style={{ fontSize: 28, marginLeft: 30 }} theme="info" title="正文" ></LinkButton>
                    <LinkButton iconCls="icon-image" style={{ fontSize: 34, marginLeft: 30 }} theme="info" title="图片" ></LinkButton>

                </div>
                <ul className="list">
                    {
                        this.state.content && this.state.content.map((item, index) => {
                            return <li key={index}>

                                {
                                    <LinkButton theme="info" iconCls={this.getTypeIcon(item.type)} style={{fontSize:28}}></LinkButton>
                                    
                                }
                                {
                                    <span className="wasabi-article-ellipsis">{item.content}</span>
                                   
                                }
                                {
                                     <LinkButton iconCls="icon-remove" title="删除" theme="info" style={{marginTop:2}}></LinkButton>
                                }
                            </li>;
                        })
                    }


                </ul>

            </Left>
            <Center>
                <Layout className={"wasabi-article-content"}>
                    <Header height={120}>
                        {/* <p className="wasabi-article-saveStatus">已保存</p> */}
                        <input type="text" className="wasabi-article-title" value="消息队列Kafka、RocketMQ、RabbitMQ的优劣势比较"></input>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img className="wasabi-article-headericon" src={this.props.headerIcon ? this.props.headerIcon : require("./icon.jpg")}></img>
                            <div style={{ marginLeft: 10 }}>
                                <div><span className="wasabi-article-author">{this.props.author ? this.props.author : "匿名"}</span></div>
                                <div>
                                    <span>{func.dateformat(new Date())}</span><span>&nbsp;&nbsp;{"字数：" + (func.dealNumToEnglishFormat(this.state.wordNum))}</span>
                                </div>
                            </div>
                        </div>

                    </Header>

                    <Center></Center>

                </Layout>
            </Center>
            <Right width={500}>
                <Simulator content={""} style={{ marginTop: 70 }}></Simulator>
            </Right>
        </Layout>
    }
}
Article.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,//标题
    author: PropTypes.string,//作者
    headerIcon: PropTypes.string,//头像
    content: PropTypes.array //内容
}
Article.defaultProps = {
    className: "",
    style: {},
    title: "",
    author: "",
    headerIcon: "",
    content: []
}
export default Article;