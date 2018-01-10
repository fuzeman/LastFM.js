'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('../core/helpers');

var _base = require('./base');

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
//# sourceMappingURL=user.js.map