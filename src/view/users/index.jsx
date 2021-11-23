import React from "react";
import ReactDOM from "react-dom";
import { Single,Msg } from "../../component"
import model from "./model";
import api from "wasabi-api"
class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    addHandler(row) {
        api.ajax({
            url:"http://localhost:7001/users/add",
            type:"post",
            data:row,
            success:(res)=>{
                if(res.statusCode==200){
                  this.refs.single.reload();
                }
            }
            ,
            error:(message)=>{
                  Msg.error(message)
            }
        })
         
    }
    onUpdate(row) {
        console.log(row)
      api.ajax({
          url:"http://localhost:7001/users/update",
          type:"post",
          data:row,
          success:(res)=>{
              if(res.statusCode==200){
                this.refs.single.reload();
              }
          }
          ,
          error:(message)=>{
                Msg.error(message)
          }
      })
       
    }
    onDetail(row) {
        this.refs.single.reload();
    }
    deleteHandler(row) {
    
        api.ajax({
            url:"http://localhost:7001/users/delete",
            type:"post",
            data:row,
            success:(res)=>{
                if(res.statusCode==200){
                  this.refs.single.reload();
                }
            }
            ,
            error:(message)=>{
                  Msg.error(message)
            }
        })
    }
    render() {
        return <Single title="用户管理" model={model}
                ref="single"
            pageHandler={"http://localhost:7001/users/page"}
            deleteHandler={this.deleteHandler.bind(this)}
            onUpdate={this.onUpdate.bind(this)}
            onDetail={this.onDetail.bind(this)}
            addHandler={this.addHandler.bind(this)}
        ></Single>
    }
}

ReactDOM.render(
    <UserPage />, document.getElementById("root"));
