import React from "react";
import ReactDOM from "react-dom";
import { Page, DataGrid,Input,Button, Form} from "wasabiD";
import { ajax } from "wasabi-api";
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
            <Form ref="form" onSubmit={this.onClick} model={[
                {name:"test",label:"test",require:true},
                {name:"test1",label:"test1",size:"three"},
                {name:"test2",label:"test2"},
                    {name:"test3",label:"test3"},
            ]}>
            
            </Form>
            <DataGrid headers={this.state.headers} dataSource="rows" url="http://localhost:6080/Test/GetTable"></DataGrid>
        </Page>;
    }
}
ReactDOM.render(<ButtonDemo />, document.getElementById("root"));