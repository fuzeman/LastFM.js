"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkError = exports.ApiError = exports.RequestError = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RequestError = /*#__PURE__*/function (_Error) {
  _inherits(RequestError, _Error);

  function RequestError(response, message) {
    var _this;

    _classCallCheck(this, RequestError);

    _this = _possibleConstructorReturn(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).call(this, message));
    _this.response = response;
    _this.responseCode = response.status;
    return _this;
  }

  return RequestError;
}(Error);

exports.RequestError = RequestError;

var ApiError = /*#__PURE__*/function (_RequestError) {
  _inherits(ApiError, _RequestError);

  function ApiError(response, data) {
    var _this2;

    _classCallCheck(this, ApiError);

    _this2 = _possibleConstructorReturn(this, (ApiError.__proto__ || Object.getPrototypeOf(ApiError)).call(this, response, data.message));
    _this2.code = data.error;
    return _this2;
  }

  return ApiError;
}(RequestError);

exports.ApiError = ApiError;

var NetworkError = /*#__PURE__*/function (_RequestError2) {
  _inherits(NetworkError, _RequestError2);

  function NetworkError(response) {
    _classCallCheck(this, NetworkError);

    return _possibleConstructorReturn(this, (NetworkError.__proto__ || Object.getPrototypeOf(NetworkError)).call(this, response, response.statusText || 'Unknown Error'));
  }

  return NetworkError;
}(RequestError);

exports.NetworkError = NetworkError;
//# sourceMappingURL=errors.js.map
