'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('renderComponent always renders the given component', function (t) {
  var Foobar = (0, _.compose)((0, _.withState)('flip', 'updateFlip', false), (0, _.branch)(function (props) {
    return props.flip;
  }, (0, _.renderComponent)('div'), (0, _.renderComponent)('span')))(null);

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Foobar, null));

  var _wrapper$find$props = wrapper.find('span').props(),
      updateFlip = _wrapper$find$props.updateFlip;

  t.is(wrapper.find('span').length, 1);
  t.is(wrapper.find('div').length, 0);

  updateFlip(true);
  t.is(wrapper.find('span').length, 0);
  t.is(wrapper.find('div').length, 1);
});