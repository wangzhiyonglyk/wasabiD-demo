import  React from  "react";
import  ReactDOM from  "react-dom";
import  {Page,Button,LinkButton,Toolbar,ButtonModel} from  "wasabiD";
class ButtonDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    render()
    {
       return <Page><Button title="red" name="red"></Button></Page>;
    }
}
ReactDOM.render(<ButtonDemo/>, document.getElementById("root"));