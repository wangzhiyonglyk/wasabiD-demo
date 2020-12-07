/**
 * 手机模拟器
 */

import React from "react";
import PropTypes from 'prop-types';
import func from "../../libs/func";
import Layout from "../../Layout/Layout";
import Left from "../../Layout/Left";
import Center from "../../Layout/Center";
import Msg from "../../Info/Msg";
import Simulator from "../Simulator";
import LinkButton from "../../Buttons/LinkButton"
import PlainUpload from "../Upload/PlainUpload"
import "./index.css"
import Container from "../../Layout/Container";
class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containerid: func.uuid(),
            wordNum: 0,
            frameid: func.uuid(),
            activeIndex: null,
            title: "消息队列Kafka、RocketMQ、RabbitMQ的优劣势比较",
            content: [

                {
                    type: "txt",
                    content: "在高并发业务场景下，典型的阿里双11秒杀等业务，消息队列中间件在流量削峰、解耦上有不可替代的作用。",
                }, {
                    type: "image",
                    content: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2914710188,1187059819&fm=26&gp=0.jpg"
                }

            ],
        }
        this.add = this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.editSection = this.editSection.bind(this)
        this.imgUploadSuccess=this.imgUploadSuccess.bind(this)

    }
    getTypeIcon(type) {
        switch (type) {
            case "title":
                return "icon-file";
            case "txt":
                return "icon-txt";
            case "image":
                return "icon-image";
            default:
                return "icon-txt";
        }
    }
    add(type) {
        let content = this.state.content;

        switch (type) {
            case "title":
                content.push({
                    type: "title",
                    content: "",
                })
                break;
            case "txt":
                content.push({
                    type: "txt",
                    content: ""
                })
                break;
            case "image":
                content.push({
                    type: "image",
                    content: ""
                })
                break;
            default:
                content.push({
                    type: "txt",
                    content: ""
                })
                break;

        }
        this.setState({
            content: content,
            activeIndex: content.length - 1
        }, () => {
            let contentNode = document.getElementsByClassName("wasabi-article-content");
            contentNode[0].children[contentNode[0].children.length - 1].children[0].focus();
        })


    }
    delete(index){
       
        Msg.confirm("确定删除此段吗？",()=>{
            let content=this.state.content;
             content.splice(index,1);
           
            this.setState({
                content:content,
                wordNum:this.getwordNum(content)
            })
        })
    }
    titleChangeHandler(event) {
        this.setState({
            title: event.target.textContent.trim()
        })
    }
    /**
     * 编辑段落
     * @param {*} index 
     */
    editSection(index) {
        this.setState({
            activeIndex: index
        }, () => {
            let contentNode = document.getElementsByClassName("wasabi-article-content");
            contentNode[0].children[index].children[0].focus();
        })
    }
    contentTxtChange(index, event) {

        this.state.content[index].content = event.target.textContent;
        setTimeout(() => {
            this.setState({
                content: this.state.content,
                wordNum: this.getwordNum(this.state.content)
            })
        }, 100);


    }
    imgUploadSuccess(res){
        let content=this.state.content;     
        if(res.data){
            content[this.state.activeIndex].content=res.data;
        }
        else{
            content[this.state.activeIndex].content=res;       
        }
        this.setState({
            content:content
        })
    }
    getwordNum(content) {
        let wordNum = 0;
        for (let i = 0; i < content.length; i++) {
            let sub = content[i];
            switch (sub.type) {
                case "title":
                case "txt":
                    wordNum += sub.content.length;
                    break;
            }
           
        }
        return wordNum;
    }
    componentDidUpdate() {

    }

    render() {

        return <Layout className="wasabi-article" >
            <Left width={300} className="wasabi-article-catalog" >

                <div className="tool">
                    <LinkButton iconCls="icon-txt" onClick={this.add.bind(this, "txt")} style={{ fontSize: 28, marginLeft: 30 }} theme="info" title="正文" ></LinkButton>
                    <LinkButton iconCls="icon-file" onClick={this.add.bind(this, "title")} style={{ fontSize: 28, marginLeft: 30 }} theme="info" title="子标题"></LinkButton>
                    <LinkButton iconCls="icon-image" onClick={this.add.bind(this, "image")} style={{ fontSize: 34, marginLeft: 30 }} theme="info" title="图片" ></LinkButton>

                </div>
                <ul className="list">
                    {
                        this.state.content && this.state.content.map((item, index) => {
                            return <li key={index} className={this.state.activeIndex == index ? "active" : ""} onClick={this.editSection.bind(this, index)}>

                                {/* {
                                  item.type=="image"?null:  <LinkButton theme="info" iconCls={this.getTypeIcon(item.type)} style={{ fontSize: 28 }}></LinkButton>

                                } */}
                                {
                                    <span className="wasabi-article-ellipsis">{item.type=="image"?<img style={{width:40,height:40}} src={item.content}></img>:item.content}</span>

                                }
                                {
                                    <LinkButton iconCls="icon-remove" title="删除" theme="info" onClick={this.delete.bind(this,index)} style={{ marginTop: 2 }}></LinkButton>
                                }
                            </li>;
                        })
                    }


                </ul>

            </Left>
            <Center>
                <Simulator style={{ marginLeft: 0 }}>
                    <Container className={"wasabi-article-center"}>
                        <div contentEditable={true} className="wasabi-article-title" dangerouslySetInnerHTML={{ __html: this.state.title }} onChange={this.titleChangeHandler}></div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img className="wasabi-article-headericon" src={this.props.headerIcon ? this.props.headerIcon : require("./icon.jpg")}></img>
                            <div style={{ marginLeft: 10, textAlign: "left" }}>
                                <div><span className="wasabi-article-author">{this.props.author ? this.props.author : "匿名"}</span></div>
                                <div>
                                    <span>{func.dateformat(new Date())}</span><span>&nbsp;&nbsp;{"字数：" + (func.dealNumToEnglishFormat(this.state.wordNum))}</span>
                                </div>
                            </div>
                        </div>
                        <ul className="wasabi-article-content">
                            {
                                this.state.content && this.state.content.map((item, index) => {
                                    let control = null;
                                    switch (item.type) {
                                        case "title":
                                            control = <div  key={"title"+index} className="title" contentEditable={true} dangerouslySetInnerHTML={{ __html: item.content }} onBlur={this.contentTxtChange.bind(this, index)}></div>;
                                            break;
                                        case "txt":
                                            control = <div key={"txt"+index} className="txt" contentEditable={true} dangerouslySetInnerHTML={{ __html: item.content }} onBlur={this.contentTxtChange.bind(this, index)}></div>
                                            break;
                                        case "image":
                                            control = item.content ? <img key={"img"+index} className="img" src={item.content}></img> :
                                                <PlainUpload
                                                key={"upload"+index}
                                                    httpHeaders={this.props.httpHeaders}
                                                    params={this.props.params}
                                                    name={this.props.uploadFileName}
                                                    accept={"image"}
                                                    uploadurl={this.props.uploadurl}
                                                    uploadSuccess={this.imgUploadSuccess}
                                                     type="image"></PlainUpload>
                                            break;

                                    }
                                    return <li key={index} >
                                        {control}
                                    </li>

                                })
                            }

                        </ul>


                    </Container>
                </Simulator>
            </Center>

        </Layout>
    }
}
Article.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    mobile: PropTypes.bool,
    title: PropTypes.string,//标题
    author: PropTypes.string,//作者
    headerIcon: PropTypes.string,//头像
    content: PropTypes.array,//内容
    httpHeaders: PropTypes.object,//请求的头部信息
    params: PropTypes.object,//其他参数
    uploadurl: PropTypes.string.isRequired, //上传地址
    uploadFileName: PropTypes.string,//上传图片时文件参数名称

}
Article.defaultProps = {
    className: "",
    style: {},
    mobile: true,
    title: "",
    author: "",
    headerIcon: "",
    content: [],
    httpHeaders: {},
    params: {},
    uploadurl: "",
    uploadFileName: ""

}
export default Article;