webpackJsonp([2],{

/***/ 148:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(26);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _wasabiD = __webpack_require__(57);

var _wasabiApi = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(148);

var ButtonDemo = function (_React$Component) {
    _inherits(ButtonDemo, _React$Component);

    function ButtonDemo(props) {
        _classCallCheck(this, ButtonDemo);

        return _possibleConstructorReturn(this, (ButtonDemo.__proto__ || Object.getPrototypeOf(ButtonDemo)).call(this, props));
    }

    _createClass(ButtonDemo, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var obj1 = { name: "www" };
            var obj2 = { sex: 1 };
            var obj = _extends({}, obj1, obj2);
            console.log(obj);
            (0, _wasabiApi.ajax)({
                url: "http://192.168.3.191:81/mockjsdata/22/integral/index",
                success: function success(result) {
                    console.log(result);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _wasabiD.Page,
                null,
                _react2.default.createElement(_wasabiD.Button, { title: "primary", name: "primary", theme: "primary" }),
                _react2.default.createElement(_wasabiD.Button, { title: "success", name: "success", theme: "success" }),
                _react2.default.createElement(_wasabiD.Button, { title: "info", name: "info", theme: "info" }),
                _react2.default.createElement(_wasabiD.Button, { title: "warning", name: "warning", theme: "warning" }),
                _react2.default.createElement(_wasabiD.Button, { title: "danger", name: "danger", theme: "danger" }),
                _react2.default.createElement(_wasabiD.Button, { title: "green", name: "green", theme: "green" }),
                _react2.default.createElement(_wasabiD.Button, { title: "default", name: "default", theme: "default" }),
                _react2.default.createElement(_wasabiD.Button, { title: "cancel", name: "cancel", theme: "cancel" })
            );
        }
    }]);

    return ButtonDemo;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(ButtonDemo, null), document.getElementById("root"));

/***/ })

},[296]);
//# sourceMappingURL=button.js.map