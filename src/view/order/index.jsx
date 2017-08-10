import React from "react";
import ReactDOM from "react-dom";
require("../../sass/button.css");
import { Page, DataGrid } from "wasabiD";
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
    render() {
        return <Page>
            <DataGrid headers={this.state.headers} dataSource="rows" url="http://localhost:6080/Test/GetTable"></DataGrid>
        </Page>;
    }
}
ReactDOM.render(<ButtonDemo />, document.getElementById("root"));