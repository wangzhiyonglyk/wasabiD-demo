webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
	 * Created by shine 2017/02/08.
	 */
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(158);
	var wasabi = __webpack_require__(159);
	
	var Button = wasabi.Button;
	var Message = wasabi.Message;
	
	var TestToolbar = React.createClass({
	    displayName: "TestToolbar",
	
	    getInitialState: function getInitialState() {
	        return {
	            title: "新增",
	            addDisabled: false,
	            updateDisabled: false
	        };
	    },
	    ClickAlert: function ClickAlert() {
	        Message.alert("弹出信息");
	    },
	    ClickConfirm: function ClickConfirm() {
	        Message.confirm("确定要购买吗？", function () {
	            Message.info("是");
	        }, function () {
	            Message.success("否");
	        });
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(Button, { name: "alert", theme: "success", title: "\u6309\u94AEAlert", tip: "tip", size: "large", onClick: this.ClickAlert }),
	            React.createElement(Button, { name: "Confirm", theme: "success", title: "\u6309\u94AEConfirm", tip: "tip", size: "large", onClick: this.ClickConfirm })
	        );
	    }
	});
	ReactDOM.render(React.createElement(TestToolbar, null), document.getElementById("root"));

/***/ }
]);
//# sourceMappingURL=index.js.map