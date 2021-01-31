import React from 'react';
import ReactDOM from 'react-dom';
import("./home.css")
import { Single } from "../../component"
import api from "../../libs/api"
import model from "./model"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        model:model
        }


    }
    componentDidMount() {



    }
    onClick() {
     
      
    }
   
    render() {
        return <Single model={this.state.model} title="活动管理" deleteUrl="http://localhost:7007/ideadata/delete" updateUrl="http://localhost:7007/ideadata/save" addUrl="http://localhost:7007/ideadata/save"  pageUrl={"http://localhost:7007/ideadata/page"} ></Single>;
            

    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
