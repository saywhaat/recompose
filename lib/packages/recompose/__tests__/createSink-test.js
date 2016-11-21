'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

(0, _ava2.default)('createSink creates a React component that fires a callback when receiving new props', function (t) {
  var spy = _sinon2.default.spy();
  var Sink = (0, _.createSink)(spy);
  var Counter = (0, _.compose)((0, _.withState)('counter', 'updateCounter', 0), (0, _.mapProps)(function (_ref) {
    var updateCounter = _ref.updateCounter,
        rest = _objectWithoutProperties(_ref, ['updateCounter']);

    return _extends({
      increment: function increment() {
        return updateCounter(function (n) {
          return n + 1;
        });
      }
    }, rest);
  }))(Sink);

  (0, _enzyme.mount)(_react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(Counter, null)
  ));

  var increment = spy.lastCall.args[0].increment;

  var getCounter = function getCounter() {
    return spy.lastCall.args[0].counter;
  };
  t.is(getCounter(), 0);
  increment();
  t.is(getCounter(), 1);
  increment();
  t.is(getCounter(), 2);
});