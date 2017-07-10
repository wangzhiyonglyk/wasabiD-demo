/*
 * Created by shine 2017/02/08.
 */
let React = require("react");
let ReactDOM = require("react-dom");
let wasabi = require("wasabiD");
require("./sass/index.css");
let Single = wasabi.Single;
let TestToolbar = React.createClass({
    getInitialState: function () {
        return {
            controller: "Admin",
            corsUrl:"http://112.74.194.226:7499/"
        }
    },
   
    render: function () {
        return (<Single controller={this.state.controller} corsUrl={this.state.corsUrl}></Single>)
    }
});
ReactDOM.render(<TestToolbar/>, document.getElementById("root"));
