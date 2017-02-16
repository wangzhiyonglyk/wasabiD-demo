import  React from  "react";
import  ReactDOM from  "react-dom";
import  {Page,Button,LinkButton,Toolbar,ButtonModel} from  "wasabiD";
class ButtonDemo extends React.Component {
    constructor(props) {
        super(props);
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
           <Button title="cancel" name="cancel" theme="cancel"></Button>
       </Page>;
    }
}
ReactDOM.render(<ButtonDemo/>, document.getElementById("root"));