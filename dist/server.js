/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var types = exports.types = {
    DEMO_GET_DATA: 'DEMO_GET_DATA'
};

var actions = exports.actions = {
    demoGetData: function demoGetData(payload) {
        return { type: types.DEMO_GET_DATA, payload: payload };
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _demo = __webpack_require__(16);

var _demo2 = _interopRequireDefault(_demo);

var _actions = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    get: function get(store) {
        return [{
            path: '/',
            component: _demo2.default,
            loadData: function loadData() {
                return store.dispatch(_actions.actions.demoGetData());
            }
        }];
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(7);

var _fs2 = _interopRequireDefault(_fs);

var _buffer = __webpack_require__(18);

var _express = __webpack_require__(8);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(9);

var _reactRouterDom = __webpack_require__(2);

var _reactRouter = __webpack_require__(10);

var _reactRedux = __webpack_require__(3);

var _store = __webpack_require__(11);

var _store2 = _interopRequireDefault(_store);

var _App = __webpack_require__(15);

var _App2 = _interopRequireDefault(_App);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var indexHtml = _fs2.default.readFileSync(_path2.default.resolve(__dirname, 'client/index.html'), 'utf8');
var app = (0, _express2.default)();
var port = 8080;

var prefetchData = function prefetchData(req) {
    var promises = [];
    // use `some` to imitate `<Switch>` behavior of selecting only
    // the first to match
    _routes2.default.get(_store2.default.get(true)).some(function (route) {
        // use `matchPath` here
        var match = (0, _reactRouterDom.matchPath)(req.url, route);
        if (match) {
            promises.push(route.loadData(match));
        }
        return match;
    });

    return Promise.all(promises);
};

var renderFullPage = function renderFullPage(html, preloadedState) {
    var state = JSON.stringify(preloadedState).replace(/</g, '\\u003c');
    var result = indexHtml.replace('@@server-state@@', state).replace('<!--server-content-->', html);
    return result;
};

function handleRender(req, res) {
    prefetchData(req).then(function (data) {
        var store = _store2.default.get(true, Object.assign.apply(Object, _toConsumableArray(data)));
        var context = {};

        // Render the component to a string
        var html = (0, _server.renderToString)(_react2.default.createElement(
            _reactRouter.StaticRouter,
            {
                location: req.url,
                context: context },
            _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(_App2.default, null)
            )
        ));

        if (context.url) {
            res.writeHead(301, {
                Location: context.url
            });
            res.end();
        } else {
            // Grab the initial state from our Redux store
            var preloadedState = store.getState();

            // Send the rendered page back to the client
            res.send(renderFullPage(html, preloadedState));
        }
    }).catch(function (err) {
        res.end(500);
    });
};

//Serve static files
app.use('/public', _express2.default.static(_path2.default.join(__dirname, 'client/public')));

// This is fired every time the server side receives a request
app.use(handleRender);
app.listen(port);
console.log('Server started, listening on http://localhost:' + port);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(12);

var _reducer = __webpack_require__(13);

var _reducer2 = _interopRequireDefault(_reducer);

var _middleware = __webpack_require__(14);

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import reducers
var store = void 0;

// Import middleware


var reducers = (0, _redux.combineReducers)({
    demo: _reducer2.default
});

var middleware = [_middleware2.default];

var createNewStore = function createNewStore(defaultState) {
    return (0, _redux.createStore)(reducers, defaultState, _redux.applyMiddleware.apply(undefined, middleware));
};

exports.default = {
    get: function get() {
        var alwaysNew = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var preloadedState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var result = void 0;
        if (alwaysNew) {
            result = createNewStore(preloadedState);
        } else {
            result = store || createNewStore(preloadedState);
        }
        return result;
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = __webpack_require__(1);

var defaultState = {
    data: 'none'
};

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    if (Object.keys(_actions.types).includes(action.type)) {
        return _extends({}, state, action.payload);
    } else {
        return state;
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = __webpack_require__(1);

exports.default = function (store) {
    return function (next) {
        return function (action) {
            if (action.type === _actions.types.DEMO_GET_DATA) {
                // must return promise form action for the router to work properly on the server
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        action.payload = { data: 'some data' };
                        next(action);
                        // this resolve is for the server, we must wrap the payload with the store section just like the reducer.
                        resolve({ demo: action.payload });
                    }, 1000);
                });
            }
            next(action);
        };
    };
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.routes = _routes2.default.get(props.store);
        return _this;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRouterDom.Switch,
                null,
                this.routes.map(function (route) {
                    return _react2.default.createElement(_reactRouterDom.Route, _extends({ key: route.path }, route));
                })
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(3);

var _actions = __webpack_require__(1);

var _subDemo = __webpack_require__(17);

var _subDemo2 = _interopRequireDefault(_subDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Demo = function (_React$Component) {
    _inherits(Demo, _React$Component);

    function Demo() {
        _classCallCheck(this, Demo);

        return _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));
    }

    _createClass(Demo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.data === 'none') {
                this.props.getData();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'demo' },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Demo 1'
                ),
                _react2.default.createElement(_subDemo2.default, null),
                _react2.default.createElement(
                    'div',
                    null,
                    'data: ',
                    this.props.data
                )
            );
        }
    }]);

    return Demo;
}(_react2.default.Component);

function mapStateToProps(state, ownProps) {
    return _extends({}, ownProps, state.demo);
}

function mapDispatchToProps(dispatch, ownProps) {
    var dispatchProps = {
        getData: function getData() {
            dispatch(_actions.actions.demoGetData());
        }
    };
    return _extends({}, ownProps, dispatchProps);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Demo);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubDemo = function (_React$Component) {
    _inherits(SubDemo, _React$Component);

    function SubDemo() {
        _classCallCheck(this, SubDemo);

        return _possibleConstructorReturn(this, (SubDemo.__proto__ || Object.getPrototypeOf(SubDemo)).apply(this, arguments));
    }

    _createClass(SubDemo, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "sub-demo" },
                _react2.default.createElement(
                    "p",
                    null,
                    "Sub Demo"
                )
            );
        }
    }]);

    return SubDemo;
}(_react2.default.Component);

exports.default = SubDemo;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTNhNGMwOTNlZDBiMDYzMmM4YWYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9kZW1vL2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvYXBwL3JvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9hcHAvc2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvYXBwL3N0b3JlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvZGVtby9yZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2RlbW8vbWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9hcHAvQXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2RlbW8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvZGVtby9zdWItZGVtby5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJidWZmZXJcIiJdLCJuYW1lcyI6WyJ0eXBlcyIsIkRFTU9fR0VUX0RBVEEiLCJhY3Rpb25zIiwiZGVtb0dldERhdGEiLCJ0eXBlIiwicGF5bG9hZCIsImdldCIsInBhdGgiLCJjb21wb25lbnQiLCJsb2FkRGF0YSIsInN0b3JlIiwiZGlzcGF0Y2giLCJpbmRleEh0bWwiLCJyZWFkRmlsZVN5bmMiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwiYXBwIiwicG9ydCIsInByZWZldGNoRGF0YSIsInJlcSIsInByb21pc2VzIiwic29tZSIsIm1hdGNoIiwidXJsIiwicm91dGUiLCJwdXNoIiwiUHJvbWlzZSIsImFsbCIsInJlbmRlckZ1bGxQYWdlIiwiaHRtbCIsInByZWxvYWRlZFN0YXRlIiwic3RhdGUiLCJKU09OIiwic3RyaW5naWZ5IiwicmVwbGFjZSIsInJlc3VsdCIsImhhbmRsZVJlbmRlciIsInJlcyIsInRoZW4iLCJPYmplY3QiLCJhc3NpZ24iLCJkYXRhIiwiY29udGV4dCIsIndyaXRlSGVhZCIsIkxvY2F0aW9uIiwiZW5kIiwiZ2V0U3RhdGUiLCJzZW5kIiwiY2F0Y2giLCJ1c2UiLCJzdGF0aWMiLCJqb2luIiwibGlzdGVuIiwiY29uc29sZSIsImxvZyIsInJlZHVjZXJzIiwiZGVtbyIsIm1pZGRsZXdhcmUiLCJjcmVhdGVOZXdTdG9yZSIsImRlZmF1bHRTdGF0ZSIsImFsd2F5c05ldyIsImFjdGlvbiIsImtleXMiLCJpbmNsdWRlcyIsInNldFRpbWVvdXQiLCJuZXh0IiwiQXBwIiwicHJvcHMiLCJyb3V0ZXMiLCJtYXAiLCJDb21wb25lbnQiLCJEZW1vIiwiZ2V0RGF0YSIsIm1hcFN0YXRlVG9Qcm9wcyIsIm93blByb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2hQcm9wcyIsIlN1YkRlbW8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7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Ozs7Ozs7O2lDQUNSO0FBQ0wsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsVUFBZjtBQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFESixhQURKO0FBS0g7Ozs7RUFQZ0MsZ0JBQU1QLFM7O2tCQUF0Qk8sTzs7Ozs7O0FDSHJCLG1DIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDEzYTRjMDkzZWQwYjA2MzJjOGFmIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBjb25zdCB0eXBlcyA9IHtcbiAgICBERU1PX0dFVF9EQVRBOiAnREVNT19HRVRfREFUQSdcbn07XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xuICAgIGRlbW9HZXREYXRhOiBwYXlsb2FkID0+ICh7IHR5cGU6IHR5cGVzLkRFTU9fR0VUX0RBVEEsIHBheWxvYWQgfSlcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvZGVtby9hY3Rpb25zLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IERlbW8gZnJvbSAnLi4vZGVtbyc7XG5pbXBvcnQge2FjdGlvbnMgYXMgZGVtb0FjdGlvbnN9IGZyb20gJy4uL2RlbW8vYWN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBnZXQ6IHN0b3JlID0+IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogJy8nLFxuICAgICAgICAgICAgY29tcG9uZW50OiBEZW1vLFxuICAgICAgICAgICAgbG9hZERhdGE6ICgpID0+IHN0b3JlLmRpc3BhdGNoKGRlbW9BY3Rpb25zLmRlbW9HZXREYXRhKCkpXG4gICAgICAgIH1cbiAgICBdXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvYXBwL3JvdXRlcy5qcyIsImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7QnVmZmVyfSBmcm9tICdidWZmZXInXG5pbXBvcnQgRXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge3JlbmRlclRvU3RyaW5nfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7bWF0Y2hQYXRofSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHtTdGF0aWNSb3V0ZXJ9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBTdG9yZSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5cbmxldCBpbmRleEh0bWwgPSBmcy5yZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2NsaWVudC9pbmRleC5odG1sJyksICd1dGY4Jyk7XG5jb25zdCBhcHAgPSBFeHByZXNzKCk7XG5jb25zdCBwb3J0ID0gODA4MDtcblxuY29uc3QgcHJlZmV0Y2hEYXRhID0gKHJlcSkgPT4ge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgLy8gdXNlIGBzb21lYCB0byBpbWl0YXRlIGA8U3dpdGNoPmAgYmVoYXZpb3Igb2Ygc2VsZWN0aW5nIG9ubHlcbiAgICAvLyB0aGUgZmlyc3QgdG8gbWF0Y2hcbiAgICByb3V0ZXMuZ2V0KFN0b3JlLmdldCh0cnVlKSkuc29tZShyb3V0ZSA9PiB7XG4gICAgICAgIC8vIHVzZSBgbWF0Y2hQYXRoYCBoZXJlXG4gICAgICAgIGNvbnN0IG1hdGNoID0gbWF0Y2hQYXRoKHJlcS51cmwsIHJvdXRlKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHJvdXRlLmxvYWREYXRhKG1hdGNoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoXG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuY29uc3QgcmVuZGVyRnVsbFBhZ2UgPSAoaHRtbCwgcHJlbG9hZGVkU3RhdGUpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IEpTT04uc3RyaW5naWZ5KHByZWxvYWRlZFN0YXRlKS5yZXBsYWNlKC88L2csICdcXFxcdTAwM2MnKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbmRleEh0bWwucmVwbGFjZSgnQEBzZXJ2ZXItc3RhdGVAQCcsIHN0YXRlKS5yZXBsYWNlKCc8IS0tc2VydmVyLWNvbnRlbnQtLT4nLCBodG1sKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuZnVuY3Rpb24gaGFuZGxlUmVuZGVyKHJlcSwgcmVzKSB7XG4gICAgcHJlZmV0Y2hEYXRhKHJlcSlcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdG9yZSA9IFN0b3JlLmdldCh0cnVlLCBPYmplY3QuYXNzaWduKC4uLmRhdGEpKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB7fTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIHRoZSBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgICAgICAgICAgIGxldCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgICAgICAgICAgICAgPFN0YXRpY1JvdXRlclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbj17cmVxLnVybH1cbiAgICAgICAgICAgICAgICAgICAgY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgICAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFwcCAvPlxuICAgICAgICAgICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICAgICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgICAgICAgICAgICAgcmVzLndyaXRlSGVhZCgzMDEsIHtcbiAgICAgICAgICAgICAgICAgICAgTG9jYXRpb246IGNvbnRleHQudXJsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gR3JhYiB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICAgICAgICAgICAgICAgIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIFNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gICAgICAgICAgICAgICAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCBlcnIgPT4ge1xuICAgICAgICAgICAgcmVzLmVuZCg1MDApO1xuICAgICAgICB9KTtcbn07XG5cbi8vU2VydmUgc3RhdGljIGZpbGVzXG5hcHAudXNlKCcvcHVibGljJywgRXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJ2NsaWVudC9wdWJsaWMnKSkpO1xuXG4vLyBUaGlzIGlzIGZpcmVkIGV2ZXJ5IHRpbWUgdGhlIHNlcnZlciBzaWRlIHJlY2VpdmVzIGEgcmVxdWVzdFxuYXBwLnVzZShoYW5kbGVSZW5kZXIpO1xuYXBwLmxpc3Rlbihwb3J0KTtcbmNvbnNvbGUubG9nKGBTZXJ2ZXIgc3RhcnRlZCwgbGlzdGVuaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fWApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvYXBwL3NlcnZlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXJcIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuXG4vLyBJbXBvcnQgcmVkdWNlcnNcbmltcG9ydCBkZW1vUmVkdWNlciBmcm9tICcuLi9kZW1vL3JlZHVjZXInO1xuXG4vLyBJbXBvcnQgbWlkZGxld2FyZVxuaW1wb3J0IGRlbW9NaWRkbGV3YXJlIGZyb20gJy4uL2RlbW8vbWlkZGxld2FyZSc7XG5cbmxldCBzdG9yZTtcblxuY29uc3QgcmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xuICAgIGRlbW86IGRlbW9SZWR1Y2VyXG59KTtcblxuY29uc3QgbWlkZGxld2FyZSA9IFtcbiAgICBkZW1vTWlkZGxld2FyZVxuXTtcblxuY29uc3QgY3JlYXRlTmV3U3RvcmUgPSAoZGVmYXVsdFN0YXRlKSA9PiB7XG4gICAgcmV0dXJuIGNyZWF0ZVN0b3JlKFxuICAgICAgICByZWR1Y2VycyxcbiAgICAgICAgZGVmYXVsdFN0YXRlLFxuICAgICAgICBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSlcbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGdldDogKGFsd2F5c05ldyA9IGZhbHNlLCBwcmVsb2FkZWRTdGF0ZSA9IHt9KSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGlmKGFsd2F5c05ldyl7XG4gICAgICAgICAgICByZXN1bHQgPSBjcmVhdGVOZXdTdG9yZShwcmVsb2FkZWRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBzdG9yZSB8fCBjcmVhdGVOZXdTdG9yZShwcmVsb2FkZWRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvYXBwL3N0b3JlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge3R5cGVzfSBmcm9tICcuL2FjdGlvbnMnO1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gICAgZGF0YTogJ25vbmUnXG59O1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikgPT4ge1xuICAgIGlmKE9iamVjdC5rZXlzKHR5cGVzKS5pbmNsdWRlcyhhY3Rpb24udHlwZSkpe1xuICAgICAgICByZXR1cm4gey4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL2RlbW8vcmVkdWNlci5qcyIsImltcG9ydCB7dHlwZXN9IGZyb20gJy4vYWN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IHN0b3JlID0+IG5leHQgPT4gYWN0aW9uID0+IHtcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gdHlwZXMuREVNT19HRVRfREFUQSl7XG4gICAgICAgIC8vIG11c3QgcmV0dXJuIHByb21pc2UgZm9ybSBhY3Rpb24gZm9yIHRoZSByb3V0ZXIgdG8gd29yayBwcm9wZXJseSBvbiB0aGUgc2VydmVyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5wYXlsb2FkID0geyBkYXRhOiAnc29tZSBkYXRhJyB9O1xuICAgICAgICAgICAgICAgIG5leHQoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHJlc29sdmUgaXMgZm9yIHRoZSBzZXJ2ZXIsIHdlIG11c3Qgd3JhcCB0aGUgcGF5bG9hZCB3aXRoIHRoZSBzdG9yZSBzZWN0aW9uIGp1c3QgbGlrZSB0aGUgcmVkdWNlci5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgZGVtbzogYWN0aW9uLnBheWxvYWQgfSk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5leHQoYWN0aW9uKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9kZW1vL21pZGRsZXdhcmUuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtTd2l0Y2gsIFJvdXRlfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXMuZ2V0KHByb3BzLnN0b3JlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U3dpdGNoPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJvdXRlcy5tYXAocm91dGUgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8Um91dGUga2V5PXtyb3V0ZS5wYXRofSB7Li4ucm91dGV9Lz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvU3dpdGNoPlxuICAgICAgICApXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL2FwcC9BcHAuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2FjdGlvbnN9IGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgU3ViRGVtbyBmcm9tICcuL3N1Yi1kZW1vJztcblxuXG5jbGFzcyBEZW1vIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZih0aGlzLnByb3BzLmRhdGEgPT09ICdub25lJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXREYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlbW9cIj5cbiAgICAgICAgICAgICAgICA8aDE+RGVtbyAxPC9oMT5cbiAgICAgICAgICAgICAgICA8U3ViRGVtbyAvPlxuICAgICAgICAgICAgICAgIDxkaXY+ZGF0YTogeyB0aGlzLnByb3BzLmRhdGEgfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpIHtcbiAgICByZXR1cm4geyAuLi5vd25Qcm9wcywgLi4uc3RhdGUuZGVtbyB9XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpIHtcbiAgICBjb25zdCBkaXNwYXRjaFByb3BzID0ge1xuICAgICAgICBnZXREYXRhKCkge1xuICAgICAgICAgICAgZGlzcGF0Y2goYWN0aW9ucy5kZW1vR2V0RGF0YSgpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHsuLi5vd25Qcm9wcywgLi4uZGlzcGF0Y2hQcm9wc307XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKERlbW8pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvZGVtby9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ViRGVtbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWItZGVtb1wiPlxuICAgICAgICAgICAgICAgIDxwPlN1YiBEZW1vPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvZGVtby9zdWItZGVtby5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJ1ZmZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJ1ZmZlclwiXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9