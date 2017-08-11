import  React from  "react";
import  ReactDOM from  "react-dom";
require("../../sass/button.css");
import  {Page,Button,LinkButton,Toolbar,ButtonModel} from  "wasabiD";
import{ajax} from "wasabi-api";
class ButtonDemo extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
       
    }
        onClick()
    {
       console.log(this.refs.props.children[0]); 
    }
    render()
    {
       return <div>
           {
                React.Children.map(this.props.children, function (child) {
              return {child};
        })

           }
             <Button title="提交" onClick={this.onClick.bind(this)}></Button>
       </div>;
    }
}

export default ButtonDemo;