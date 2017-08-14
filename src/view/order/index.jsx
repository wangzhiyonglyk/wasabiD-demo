import React from "react";
import ReactDOM from "react-dom";
require("../../sass/button.css");
import { Page, DataGrid,Input,Button, Form} from "wasabiD";
import { ajax } from "wasabi-api";
import Add from "./add";

class ButtonDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [
                {
                    name: "openid",
                    label: "openid"
                },
                {
                    name:"nickname",
                    label:"nickname"
                }
                ,
                {
                    name:"city",
                    label:"city"
                }
                ,
                {
                    name:"country",
                    label:"country"
                }
                ,{
                    name:"province",
                    label:"province"
                },
                {
                    name:"language",
                    label:"language"
                },
                {
                    name:"remark",
                    label:"remark"
                }

            ]
        }
    }
    componentDidMount() {

    }
    onClick()
    {
  
       console.log(this.refs.form.validate()); 
    }
    render() {
        return <Page>
            <Form ref="form"  model={[
                {name:"test",label:"test",require:true},
                {name:"test1",label:"test1",size:"three"},
                {name:"test2",label:"test2"},
            ]}>
                 <Input type="idcard" name="idcard" label="身份证" required={true}></Input>
                <Input type="number" name="money" label="金额"></Input>
                <Button title="提交" onClick={this.onClick.bind(this)}></Button>
            </Form>
            <DataGrid headers={this.state.headers} dataSource="rows" url="http://localhost:6080/Test/GetTable"></DataGrid>
        </Page>;
    }
}
ReactDOM.render(<ButtonDemo />, document.getElementById("root"));