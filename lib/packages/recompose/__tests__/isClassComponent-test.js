'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isClassComponent = require('../isClassComponent');

var _isClassComponent2 = _interopRequireDefault(_isClassComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _ava2.default)('isClassComponent returns false for functions', function (t) {
  var Foo = function Foo() {
    return _react2.default.createElement('div', null);
  };

  t.false((0, _isClassComponent2.default)(Foo));
});

(0, _ava2.default)('isClassComponent returns true for React component classes', function (t) {
  var Foo = function (_Component) {
    _inherits(Foo, _Component);

    function Foo() {
      _classCallCheck(this, Foo);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Foo.prototype.render = function render() {
      return _react2.default.createElement('div', null);
    };

    return Foo;
  }(_react.Component);

  /* eslint-disable react/prefer-es6-class */


  var Bar = _react2.default.createClass({
    displayName: 'Bar',
    render: function render() {
      return _react2.default.createElement('div', null);
    }
  });
  /* eslint-enable react/prefer-es6-class */

  t.true((0, _isClassComponent2.default)(Foo));
  t.true((0, _isClassComponent2.default)(Bar));
});