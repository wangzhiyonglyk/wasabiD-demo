import  React from  "react";
import  ReactDOM from  "react-dom";
require("./sass/button.css");
import  {Page,Button,LinkButton,Toolbar,ButtonModel} from  "wasabiD";
import{ajax} from "wasabi-api";
class ButtonDemo extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        let obj1={name:"www"};
        let obj2={sex:1};
        let obj={...obj1,...obj2};
        console.log(obj);
        ajax({
            url:"http://192.168.3.191:81/mockjsdata/22/integral/index",
            success:function(result)
            {
                console.log(result);

            }
        })
    }
    render()
    {
       return <Page>
           <Button title="primary" name="primary" theme="primary"></Button>
           <Button title="success" name="success" theme="success"></Button>
           <Button title="info" name="info" theme="info"></Button>
           <Button title="warning" name="warning" theme="warning"></Button>
           <Button title="danger" name="danger" theme="danger"></Button>
           <Button title="green" name="green" theme="green"></Button>
           <Button title="default" name="default" theme="default"></Button>
           <Button title="cancel" name="cancel" theme="cancel"></Button></Page>;
    }
}
ReactDOM.render(<ButtonDemo/>, document.getElementById("root"));