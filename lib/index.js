'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./core/helpers');

var _http = require('./core/http');

var _http2 = _interopRequireDefault(_http);

var _interfaces = require('./interfaces');

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
//# sourceMappingURL=index.js.map
