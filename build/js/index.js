webpackJsonp([0],{

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by shine 2017/02/08.
 */
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(29);
var wasabi = __webpack_require__(59);

var Single = wasabi.Single;
var TestToolbar = React.createClass({
    displayName: "TestToolbar",

    getInitialState: function getInitialState() {
        return {
            controller: "Admin",
            corsUrl: "http://112.74.194.226:7499/"
        };
    },

    render: function render() {
        return React.createElement(Single, { controller: this.state.controller, corsUrl: this.state.corsUrl });
    }
});
ReactDOM.render(React.createElement(TestToolbar, null), document.getElementById("root"));

/***/ })

},[326]);
//# sourceMappingURL=index.js.map