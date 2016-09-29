(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("whatwg-fetch"), require("crypto-js/enc-hex"), require("crypto-js/md5"), require("lodash-amd/object/merge"), require("querystring"));
	else if(typeof define === 'function' && define.amd)
		define(["whatwg-fetch", "crypto-js/enc-hex", "crypto-js/md5", "lodash-amd/object/merge", "querystring"], factory);
	else if(typeof exports === 'object')
		exports["lastfm"] = factory(require("whatwg-fetch"), require("crypto-js/enc-hex"), require("crypto-js/md5"), require("lodash-amd/object/merge"), require("querystring"));
	else
		root["lastfm"] = factory(root["whatwg-fetch"], root["crypto-js/enc-hex"], root["crypto-js/md5"], root["lodash-amd/object/merge"], root["querystring"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Client = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
	var _http = __webpack_require__(4);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _interfaces = __webpack_require__(9);
	
	var _interfaces2 = _interopRequireDefault(_interfaces);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Client = exports.Client = function () {
	    function Client(key, secret, options) {
	        _classCallCheck(this, Client);
	
	        options = (0, _helpers.isDefined)(options) ? options : {};
	
	        this.key = key || null;
	        this.secret = secret || null;
	
	        this.session = null;
	
	        if ((0, _helpers.isDefined)(options.session)) {
	            this.session = options.session;
	        } else if ((0, _helpers.isDefined)(options.sessionKey)) {
	            this.session = { key: options.sessionKey };
	        }
	
	        // Construct http client
	        this.http = new _http2.default(this);
	
	        // Construct interfaces
	        this._interfaces = this._constructInterfaces();
	    }
	
	    _createClass(Client, [{
	        key: 'getSessionKey',
	        value: function getSessionKey() {
	            if (!(0, _helpers.isDefined)(this.session) || !(0, _helpers.isDefined)(this.session.key)) {
	                return null;
	            }
	
	            return this.session.key;
	        }
	    }, {
	        key: '_constructInterfaces',
	        value: function _constructInterfaces() {
	            var _this = this;
	
	            var result = {};
	
	            Object.keys(_interfaces2.default).forEach(function (key) {
	                result[key] = new _interfaces2.default[key](_this);
	            });
	
	            return result;
	        }
	    }, {
	        key: 'auth',
	        get: function get() {
	            return this._interfaces['auth'];
	        }
	    }, {
	        key: 'track',
	        get: function get() {
	            return this._interfaces['track'];
	        }
	    }, {
	        key: 'user',
	        get: function get() {
	            return this._interfaces['user'];
	        }
	    }]);

	    return Client;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isDefined = isDefined;
	function isDefined(value) {
	    return typeof value !== 'undefined' && value !== null;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
	var _encHex = __webpack_require__(5);
	
	var _encHex2 = _interopRequireDefault(_encHex);
	
	var _md = __webpack_require__(6);
	
	var _md2 = _interopRequireDefault(_md);
	
	var _merge = __webpack_require__(7);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _querystring = __webpack_require__(8);
	
	var _querystring2 = _interopRequireDefault(_querystring);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HttpClient = function () {
	    function HttpClient(client, baseUrl) {
	        _classCallCheck(this, HttpClient);
	
	        this._client = client;
	        this._baseUrl = baseUrl || 'https://ws.audioscrobbler.com/2.0/';
	    }
	
	    _createClass(HttpClient, [{
	        key: 'get',
	        value: function get(method, options) {
	            options = (0, _merge2.default)({
	                params: {},
	
	                authenticated: false,
	                sessionKey: this._client.getSessionKey()
	            }, options || {});
	
	            options.signed = (0, _helpers.isDefined)(options.signed) ? options.signed : options.authenticated;
	
	            // Set request parameters
	            options.params['api_key'] = this._client.key;
	            options.params['format'] = 'json';
	            options.params['method'] = method;
	
	            if (options.authenticated) {
	                // Add session key
	                if (!(0, _helpers.isDefined)(options.sessionKey)) {
	                    throw new Error('Missing required "sessionKey" parameter');
	                }
	
	                options.params['sk'] = options.sessionKey;
	            }
	
	            if (options.signed) {
	                // Generate signature
	                options.params['api_sig'] = this._generateSignature(options.params);
	            }
	
	            // Send request
	            return fetch(this._baseUrl + '?' + _querystring2.default.encode(options.params)).then(function (response) {
	                // TODO check status code
	                return response.json();
	            });
	        }
	    }, {
	        key: 'post',
	        value: function post(method, options) {
	            options = (0, _merge2.default)({
	                params: {},
	
	                authenticated: false,
	                sessionKey: this._client.getSessionKey()
	            }, options || {});
	
	            options.signed = (0, _helpers.isDefined)(options.signed) ? options.signed : options.authenticated;
	
	            // Set request parameters
	            options.params['api_key'] = this._client.key;
	            options.params['format'] = 'json';
	            options.params['method'] = method;
	
	            if (options.authenticated) {
	                // Add session key
	                if (!(0, _helpers.isDefined)(options.sessionKey)) {
	                    throw new Error('Missing required "sessionKey" parameter');
	                }
	
	                options.params['sk'] = options.sessionKey;
	            }
	
	            if (options.signed) {
	                // Generate signature
	                options.params['api_sig'] = this._generateSignature(options.params);
	            }
	
	            // Send request
	            return fetch(this._baseUrl, {
	                method: 'POST',
	                body: _querystring2.default.encode(options.params)
	            }).then(function (response) {
	                // TODO check status code
	                return response.json();
	            });
	        }
	    }, {
	        key: '_generateSignature',
	        value: function _generateSignature(params) {
	            var signature = '';
	
	            // Append parameters
	            var value;
	
	            Object.keys(params).sort().forEach(function (key) {
	                if (key === 'format') {
	                    return;
	                }
	
	                // Retrieve value
	                value = params[key];
	
	                if (typeof value === 'undefined' || value === null) {
	                    value = '';
	                }
	
	                // Append parameter
	                signature += key + value;
	            });
	
	            // Append client secret
	            signature += this._client.secret;
	
	            // Generate hash
	            return (0, _md2.default)(signature).toString(_encHex2.default);
	        }
	    }]);
	
	    return HttpClient;
	}();
	
	exports.default = HttpClient;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.UserInterface = exports.TrackInterface = exports.AuthInterface = undefined;
	
	var _auth = __webpack_require__(10);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var _track = __webpack_require__(12);
	
	var _track2 = _interopRequireDefault(_track);
	
	var _user = __webpack_require__(13);
	
	var _user2 = _interopRequireDefault(_user);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.AuthInterface = _auth2.default;
	exports.TrackInterface = _track2.default;
	exports.UserInterface = _user2.default;
	exports.default = {
	    auth: _auth2.default,
	    track: _track2.default,
	    user: _user2.default
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
	var _base = __webpack_require__(11);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _querystring = __webpack_require__(8);
	
	var _querystring2 = _interopRequireDefault(_querystring);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AuthInterface = function (_Interface) {
	    _inherits(AuthInterface, _Interface);
	
	    function AuthInterface() {
	        _classCallCheck(this, AuthInterface);
	
	        return _possibleConstructorReturn(this, (AuthInterface.__proto__ || Object.getPrototypeOf(AuthInterface)).apply(this, arguments));
	    }
	
	    _createClass(AuthInterface, [{
	        key: 'getAuthorizeUrl',
	        value: function getAuthorizeUrl(options) {
	            var params = {};
	
	            options = (0, _helpers.isDefined)(options) ? options : {};
	
	            // Set parameters
	            params['api_key'] = this._client.key;
	
	            if ((0, _helpers.isDefined)(options.callbackUrl)) {
	                params['cb'] = options.callbackUrl;
	            }
	
	            if ((0, _helpers.isDefined)(options.token)) {
	                params['token'] = options.token;
	            }
	
	            // Build URL
	            return 'https://www.last.fm/api/auth/?' + _querystring2.default.encode(params);
	        }
	    }, {
	        key: 'getMobileSession',
	        value: function getMobileSession(username, password) {
	            if (!(0, _helpers.isDefined)(username)) {
	                throw new Error('Invalid value provided for the "username" parameter');
	            }
	
	            if (!(0, _helpers.isDefined)(password)) {
	                throw new Error('Invalid value provided for the "password" parameter');
	            }
	
	            return this.http.get('auth.getMobileSession', {
	                params: {
	                    username: username,
	                    password: password
	                },
	
	                signed: true
	            }).then(function (body) {
	                if ((0, _helpers.isDefined)(body) && (0, _helpers.isDefined)(body.session)) {
	                    return body.session;
	                }
	
	                return null;
	            });
	        }
	    }, {
	        key: 'getSession',
	        value: function getSession(token) {
	            if (!(0, _helpers.isDefined)(token)) {
	                throw new Error('Invalid value provided for the "token" parameter');
	            }
	
	            return this.http.get('auth.getSession', {
	                params: {
	                    token: token
	                },
	
	                signed: true
	            }).then(function (body) {
	                if ((0, _helpers.isDefined)(body) && (0, _helpers.isDefined)(body.session)) {
	                    return body.session;
	                }
	
	                return null;
	            });
	        }
	    }, {
	        key: 'getToken',
	        value: function getToken() {
	            return this.http.get('auth.getToken', {
	                signed: true
	            }).then(function (body) {
	                if ((0, _helpers.isDefined)(body) && (0, _helpers.isDefined)(body.token)) {
	                    return body.token;
	                }
	
	                return null;
	            });
	        }
	    }]);
	
	    return AuthInterface;
	}(_base2.default);
	
	exports.default = AuthInterface;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Interface = function () {
	    function Interface(client) {
	        _classCallCheck(this, Interface);
	
	        this._client = (0, _helpers.isDefined)(client) ? client : null;
	    }
	
	    _createClass(Interface, [{
	        key: 'http',
	        get: function get() {
	            if (!(0, _helpers.isDefined)(this._client)) {
	                return null;
	            }
	
	            return this._client.http;
	        }
	    }]);
	
	    return Interface;
	}();
	
	exports.default = Interface;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
	var _base = __webpack_require__(11);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TrackInterface = function (_Interface) {
	    _inherits(TrackInterface, _Interface);
	
	    function TrackInterface() {
	        _classCallCheck(this, TrackInterface);
	
	        return _possibleConstructorReturn(this, (TrackInterface.__proto__ || Object.getPrototypeOf(TrackInterface)).apply(this, arguments));
	    }
	
	    _createClass(TrackInterface, [{
	        key: 'scrobble',
	        value: function scrobble(items) {
	            var params = {};
	            var item;
	            var i;
	
	            if (!(0, _helpers.isDefined)(items) || !Array.isArray(items) || items.length < 1) {
	                throw new Error('Invalid value provided for the "items" parameter');
	            }
	
	            if (items.length > 50) {
	                throw new Error('Exceeded scrobble batch limit, only 50 scrobbles can be sent in a single batch');
	            }
	
	            // Build parameters
	            for (i = 0; i < items.length; ++i) {
	                item = items[i];
	
	                // Ensure required parameters have been defined
	                if (!(0, _helpers.isDefined)(item.track)) {
	                    throw new Error('Missing required "track" parameter in item #' + i);
	                }
	
	                if (!(0, _helpers.isDefined)(item.artist)) {
	                    throw new Error('Missing required "artist" parameter in item #' + i);
	                }
	
	                if (!(0, _helpers.isDefined)(item.timestamp)) {
	                    throw new Error('Missing required "timestamp" parameter in item #' + i);
	                }
	
	                // Add parameters for each item property
	                Object.keys(item).forEach(function (key) {
	                    if (!(0, _helpers.isDefined)(item[key])) {
	                        return;
	                    }
	
	                    params[key + '[' + i + ']'] = item[key];
	                });
	            }
	
	            // Send request
	            return this.http.post('track.scrobble', {
	                params: params,
	
	                authenticated: true
	            }).then(function (body) {
	                if ((0, _helpers.isDefined)(body) && (0, _helpers.isDefined)(body.scrobbles)) {
	                    return body.scrobbles;
	                }
	
	                return null;
	            });
	        }
	    }, {
	        key: 'updateNowPlaying',
	        value: function updateNowPlaying(item) {
	            if (!(0, _helpers.isDefined)(item)) {
	                throw new Error('Invalid value provided for the "item" parameter');
	            }
	
	            if (!(0, _helpers.isDefined)(item.track)) {
	                throw new Error('Invalid value provided for the "track" property in the "item" object');
	            }
	
	            if (!(0, _helpers.isDefined)(item.artist)) {
	                throw new Error('Invalid value provided for the "artist" property in the "item" object');
	            }
	
	            // Send request
	            return this.http.post('track.updateNowPlaying', {
	                params: item,
	
	                authenticated: true
	            }).then(function (body) {
	                if ((0, _helpers.isDefined)(body) && (0, _helpers.isDefined)(body.nowplaying)) {
	                    return body.nowplaying;
	                }
	
	                return null;
	            });
	        }
	    }, {
	        key: 'love',
	        value: function love(track, artist) {
	            if (!(0, _helpers.isDefined)(track)) {
	                throw new Error('Invalid value provided for the "track" parameter');
	            }
	
	            if (!(0, _helpers.isDefined)(artist)) {
	                throw new Error('Invalid value provided for the "artist" parameter');
	            }
	
	            throw new Error('Not Implemented');
	        }
	    }, {
	        key: 'unlove',
	        value: function unlove(track, artist) {
	            if (!(0, _helpers.isDefined)(track)) {
	                throw new Error('Invalid value provided for the "track" parameter');
	            }
	
	            if (!(0, _helpers.isDefined)(artist)) {
	                throw new Error('Invalid value provided for the "artist" parameter');
	            }
	
	            throw new Error('Not Implemented');
	        }
	    }]);
	
	    return TrackInterface;
	}(_base2.default);
	
	exports.default = TrackInterface;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _helpers = __webpack_require__(3);
	
	var _base = __webpack_require__(11);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UserInterface = function (_Interface) {
	    _inherits(UserInterface, _Interface);
	
	    function UserInterface() {
	        _classCallCheck(this, UserInterface);
	
	        return _possibleConstructorReturn(this, (UserInterface.__proto__ || Object.getPrototypeOf(UserInterface)).apply(this, arguments));
	    }
	
	    _createClass(UserInterface, [{
	        key: 'getInfo',
	        value: function getInfo(username) {
	            var authenticated = true;
	            var params = {};
	
	            if ((0, _helpers.isDefined)(username)) {
	                authenticated = false;
	                params['user'] = username;
	            }
	
	            // Send request
	            return this.http.get('user.getInfo', {
	                params: params,
	
	                authenticated: authenticated
	            }).then(function (body) {
	                if ((0, _helpers.isDefined)(body) && (0, _helpers.isDefined)(body.user)) {
	                    return body.user;
	                }
	
	                return null;
	            });
	        }
	    }]);
	
	    return UserInterface;
	}(_base2.default);
	
	exports.default = UserInterface;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=lastfm.js.map