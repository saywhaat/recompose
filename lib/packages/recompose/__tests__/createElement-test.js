'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createEagerElement = require('../createEagerElement');

var _createEagerElement2 = _interopRequireDefault(_createEagerElement);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _ava2.default)('createEagerElement treats class components normally', function (t) {
  var InnerDiv = function (_Component) {
    _inherits(InnerDiv, _Component);

    function InnerDiv() {
      _classCallCheck(this, InnerDiv);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    InnerDiv.prototype.render = function render() {
      return _react2.default.createElement('div', { bar: 'baz' });
    };

    return InnerDiv;
  }(_react.Component);

  var OuterDiv = function (_Component2) {
    _inherits(OuterDiv, _Component2);

    function OuterDiv() {
      _classCallCheck(this, OuterDiv);

      return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
    }

    OuterDiv.prototype.render = function render() {
      return (0, _createEagerElement2.default)('div', { foo: 'bar' }, (0, _createEagerElement2.default)(InnerDiv));
    };

    return OuterDiv;
  }(_react.Component);

  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(OuterDiv, null));

  t.true(wrapper.equals(_react2.default.createElement(
    'div',
    { foo: 'bar' },
    _react2.default.createElement(InnerDiv, null)
  )));
});

(0, _ava2.default)('createEagerElement calls stateless function components instead of creating an intermediate React element', function (t) {
  var InnerDiv = function InnerDiv() {
    return _react2.default.createElement('div', { bar: 'baz' });
  };
  var OuterDiv = function OuterDiv() {
    return (0, _createEagerElement2.default)('div', { foo: 'bar' }, (0, _createEagerElement2.default)(InnerDiv));
  };

  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(OuterDiv, null));

  // Notice the difference between this and the previous test. Functionally,
  // they're the same, but because we're using stateless function components
  // here, createEagerElement() can take advantage of referential transparency
  t.true(wrapper.equals(_react2.default.createElement(
    'div',
    { foo: 'bar' },
    _react2.default.createElement('div', { bar: 'baz' })
  )));
});

(0, _ava2.default)('createEagerElement handles keyed elements correctly', function (t) {
  var InnerDiv = function InnerDiv() {
    return _react2.default.createElement('div', { bar: 'baz' });
  };
  var Div = function Div() {
    return (0, _createEagerElement2.default)(InnerDiv, { foo: 'bar', key: 'key' });
  };

  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(Div, null));

  t.true(wrapper.equals(_react2.default.createElement(InnerDiv, { foo: 'bar', key: 'key' })));
});

(0, _ava2.default)('createEagerElement passes children correctly', function (t) {
  var Div = function Div(props) {
    return _react2.default.createElement('div', props);
  };
  var InnerDiv = function InnerDiv() {
    return _react2.default.createElement('div', { bar: 'baz' });
  };
  var OuterDiv = function OuterDiv() {
    return (0, _createEagerElement2.default)(Div, { foo: 'bar' }, (0, _createEagerElement2.default)(InnerDiv));
  };

  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(OuterDiv, null));

  t.true(wrapper.equals(_react2.default.createElement(
    'div',
    { foo: 'bar' },
    _react2.default.createElement('div', { bar: 'baz' })
  )));
});