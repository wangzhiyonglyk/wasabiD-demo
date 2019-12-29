import React from "react";
import ReactDOM from "react-dom";
import Button from "../component/Buttons/Button"
import LinkButton from "../component/Buttons/LinkButton"
import Toolbar from "../component/Buttons/Toolbar"
import Form  from "../component/Form/Form";
import Text from "../component/Form/Text";
import Menus from "../component/Navigation/Menus";
import MenuPanel from "../component/Navigation/MenuPanel"
import Layout from "../component/Layout/Layout";
import Left from "../component/Layout/Left";
import Center from "../component/Layout/Center";
import Header from "../component/Layout/Header";

class Index extends React.Component {
    constructor(props) {
        super(props);

       
        this.state = {
            tabs: [],
            activeIndex: 0
        }
    this.onSubmit=this.onSubmit.bind(this);
    }
    componentDidMount() {
        
    }
    onSubmit(){
console.log("ddd")
    }
    render() {
        return <Layout>
<Header></Header>
    <Left width={150}> 
    <Menus theme="default   ">
                        <MenuPanel title="订单管理">
                            <a >订单查询</a>
                            <a>订单查询</a>
                            <a>订单查询</a>
                            <a>订单查询</a>
                        </MenuPanel>
                        <MenuPanel title="订单管理">
                            <a>订单查询</a>
                            <a>订单查询</a>
                            <a>订单查询</a>
                            <a>订单查询</a>
                        </MenuPanel>
                    </Menus>
                    </Left>
    <Center>
    <Button >测试</Button>
            <LinkButton title="测试" iconCls="icon-add">测试图票</LinkButton>
            <Toolbar buttons={[{title:"按钮1",theme:"info"},{title:"按钮2",theme:"warning"}]}></Toolbar>
            <Form onSubmit={this.onSubmit}>
                <Text required={true} type="email" label="邮箱"></Text>
                <Text required={true} type="password" label="密码"></Text>
            </Form>
    </Center>

</Layout>
           
    
    }
}
ReactDOM.render(<Index />, document.getElementById("root"));
