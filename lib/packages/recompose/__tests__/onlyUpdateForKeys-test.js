'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('onlyUpdateForKeys implements shouldComponentUpdate()', function (t) {
  var Counter = (0, _.compose)((0, _.withState)('counter', 'updateCounter', 0), (0, _.withState)('foobar', 'updateFoobar', 'foobar'), (0, _.onlyUpdateForKeys)(['counter']))('div');

  t.is(Counter.displayName, 'withState(withState(onlyUpdateForKeys(div)))');

  var div = (0, _enzyme.mount)(_react2.default.createElement(Counter, null)).find('div');

  var _div$props = div.props(),
      updateCounter = _div$props.updateCounter,
      updateFoobar = _div$props.updateFoobar;

  t.is(div.prop('counter'), 0);
  t.is(div.prop('foobar'), 'foobar');

  // Does not update
  updateFoobar('barbaz');
  t.is(div.prop('counter'), 0);
  t.is(div.prop('foobar'), 'foobar');

  updateCounter(42);
  t.is(div.prop('counter'), 42);
  t.is(div.prop('foobar'), 'barbaz');
});