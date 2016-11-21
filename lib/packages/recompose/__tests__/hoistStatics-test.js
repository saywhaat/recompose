'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('copies non-React static properties from base component to new component', function (t) {
  var BaseComponent = function BaseComponent(props) {
    return _react2.default.createElement('div', props);
  };
  BaseComponent.foo = function () {};

  var EnhancedComponent = (0, _.hoistStatics)((0, _.mapProps)(function (props) {
    return { n: props.n * 5 };
  }))(BaseComponent);

  t.is(EnhancedComponent.foo, BaseComponent.foo);

  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(EnhancedComponent, { n: 3 }));
  t.is(wrapper.prop('n'), 15);
});