import React from "react";
import ReactDOM from "react-dom";
import Button from "../component/Buttons/Button"
import LinkButton from "../component/Buttons/LinkButton"
import Toolbar from "../component/Buttons/Toolbar"
import Form  from "../component/Form/Form";
import Text from "../component/Form/Text";
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
        return <div>
            <div>测试按钮</div>
            <Button >测试</Button>
            <LinkButton iconCls="icon-add">测试图票</LinkButton>
            <Toolbar buttons={[{title:"按钮1",theme:"info"},{title:"按钮2",theme:"warning"}]}></Toolbar>
            <Form onSubmit={this.onSubmit}>
                <Text required={true} type="email" label="邮箱"></Text>
                <Text required={true} type="password" label="密码"></Text>
            </Form>
        </div>
    }
}
ReactDOM.render(<Index />, document.getElementById("root"));
