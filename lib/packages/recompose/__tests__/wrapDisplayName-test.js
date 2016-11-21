'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _ava2.default)('wrapDisplayName wraps the display name of a React component with the name of an HoC, Relay-style', function (t) {
  var SomeComponent = function (_React$Component) {
    _inherits(SomeComponent, _React$Component);

    function SomeComponent() {
      _classCallCheck(this, SomeComponent);

      return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    SomeComponent.prototype.render = function render() {
      return _react2.default.createElement('div', null);
    };

    return SomeComponent;
  }(_react2.default.Component);

  t.is((0, _.wrapDisplayName)(SomeComponent, 'someHoC'), 'someHoC(SomeComponent)');
});