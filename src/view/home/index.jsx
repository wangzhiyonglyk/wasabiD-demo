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
        return <Single model={this.state.model} title="活动管理"  pageUrl={"http://localhost:7007/rest/page"} attachParams={{tableName:"ideadata"}}></Single>;
            

    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
