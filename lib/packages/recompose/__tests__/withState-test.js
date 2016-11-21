'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('withState adds a stateful value and a function for updating it', function (t) {
  var Counter = (0, _.withState)('counter', 'updateCounter', 0)('div');
  t.is(Counter.displayName, 'withState(div)');

  var div = (0, _enzyme.mount)(_react2.default.createElement(Counter, { pass: 'through' })).find('div');

  var _div$props = div.props(),
      updateCounter = _div$props.updateCounter;

  t.is(div.prop('counter'), 0);
  t.is(div.prop('pass'), 'through');

  updateCounter(function (n) {
    return n + 9;
  });
  updateCounter(function (n) {
    return n * 2;
  });
  t.is(div.prop('counter'), 18);
  t.is(div.prop('pass'), 'through');
});

(0, _ava2.default)('withState also accepts a non-function, which is passed directly to setState()', function (t) {
  var Counter = (0, _.withState)('counter', 'updateCounter', 0)('div');
  var div = (0, _enzyme.mount)(_react2.default.createElement(Counter, null)).find('div');

  var _div$props2 = div.props(),
      updateCounter = _div$props2.updateCounter;

  updateCounter(18);
  t.is(div.prop('counter'), 18);
});

(0, _ava2.default)('withState accepts setState() callback', function (t) {
  var Counter = (0, _.withState)('counter', 'updateCounter', 0)('div');
  var div = (0, _enzyme.mount)(_react2.default.createElement(Counter, null)).find('div');

  var _div$props3 = div.props(),
      updateCounter = _div$props3.updateCounter;

  var renderSpy = _sinon2.default.spy(function () {
    t.is(div.prop('counter'), 18);
  });

  t.is(div.prop('counter'), 0);
  updateCounter(18, renderSpy);
});

(0, _ava2.default)('withState also accepts initialState as function of props', function (t) {
  var Counter = (0, _.withState)('counter', 'updateCounter', function (props) {
    return props.initialCounter;
  })('div');

  var div = (0, _enzyme.mount)(_react2.default.createElement(Counter, { initialCounter: 1 })).find('div');

  var _div$props4 = div.props(),
      updateCounter = _div$props4.updateCounter;

  t.is(div.prop('counter'), 1);
  updateCounter(function (n) {
    return n * 3;
  });
  t.is(div.prop('counter'), 3);
});