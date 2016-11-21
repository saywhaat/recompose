'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('componentFromProp creates a component that takes a component as a prop and renders it with the rest of the props', function (t) {
  var Container = (0, _.componentFromProp)('component');
  t.is(Container.displayName, 'componentFromProp(component)');

  var Component = function Component(_ref) {
    var pass = _ref.pass;
    return _react2.default.createElement(
      'div',
      null,
      'Pass: ',
      pass
    );
  };

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Container, { component: Component, pass: 'through' }));
  var div = wrapper.find('div');
  t.is(div.text(), 'Pass: through');
});