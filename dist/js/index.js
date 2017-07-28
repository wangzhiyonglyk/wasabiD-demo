webpackJsonp([1],{

/***/ 149:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by shine 2017/02/08.
 */
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(26);
var wasabi = __webpack_require__(57);
__webpack_require__(149);
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

},[297]);
//# sourceMappingURL=index.js.map