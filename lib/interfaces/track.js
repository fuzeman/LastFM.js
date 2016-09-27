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
        value: function updateNowPlaying(track, artist, params) {
            if (!(0, _helpers.isDefined)(track)) {
                throw new Error('Invalid value provided for the "track" parameter');
            }

            if (!(0, _helpers.isDefined)(artist)) {
                throw new Error('Invalid value provided for the "artist" parameter');
            }

            // Build parameters
            params = (0, _helpers.isDefined)(params) ? params : {};
            params.track = track;
            params.artist = artist;

            // Send request
            return this.http.post('track.updateNowPlaying', {
                params: params,

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
//# sourceMappingURL=track.js.map
