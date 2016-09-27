'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserInterface = exports.TrackInterface = exports.AuthInterface = undefined;

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _track = require('./track');

var _track2 = _interopRequireDefault(_track);

var _user = require('./user');

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
//# sourceMappingURL=index.js.map
