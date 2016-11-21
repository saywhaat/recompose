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

(0, _ava2.default)('withPropsOnChange maps subset of owner props to child props', function (t) {
  var mapSpy = _sinon2.default.spy();
  var StringConcat = (0, _.compose)((0, _.withState)('strings', 'updateStrings', { a: 'a', b: 'b', c: 'c' }), (0, _.flattenProp)('strings'), (0, _.withPropsOnChange)(['a', 'b'], function (_ref) {
    var a = _ref.a,
        b = _ref.b,
        props = _objectWithoutProperties(_ref, ['a', 'b']);

    mapSpy();
    return _extends({}, props, {
      foobar: a + b
    });
  }))('div');

  t.is(StringConcat.displayName, 'withState(flattenProp(withPropsOnChange(div)))');

  var div = (0, _enzyme.mount)(_react2.default.createElement(StringConcat, null)).find('div');

  var _div$props = div.props(),
      updateStrings = _div$props.updateStrings;

  t.is(div.prop('foobar'), 'ab');
  t.is(mapSpy.callCount, 1);

  // Does not re-map for non-dependent prop updates
  updateStrings(function (strings) {
    return _extends({}, strings, { c: 'baz' });
  });
  t.is(div.prop('foobar'), 'ab');
  t.is(div.prop('c'), 'c');
  t.is(mapSpy.callCount, 1);

  updateStrings(function (strings) {
    return _extends({}, strings, { a: 'foo', b: 'bar' });
  });
  t.is(div.prop('foobar'), 'foobar');
  t.is(div.prop('c'), 'baz');
  t.is(mapSpy.callCount, 2);
});