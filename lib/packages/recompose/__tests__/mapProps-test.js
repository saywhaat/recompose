'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

(0, _ava2.default)('mapProps maps owner props to child props', function (t) {
  var StringConcat = (0, _.compose)((0, _.withState)('strings', 'updateStrings', ['do', 're', 'mi']), (0, _.mapProps)(function (_ref) {
    var strings = _ref.strings,
        rest = _objectWithoutProperties(_ref, ['strings']);

    return _extends({}, rest, {
      string: strings.join('')
    });
  }))('div');

  t.is(StringConcat.displayName, 'withState(mapProps(div))');

  var div = (0, _enzyme.mount)(_react2.default.createElement(StringConcat, null)).find('div');

  var _div$props = div.props(),
      updateStrings = _div$props.updateStrings;

  t.is(div.prop('string'), 'doremi');

  updateStrings(function (strings) {
    return [].concat(strings, ['fa']);
  });
  t.is(div.prop('string'), 'doremifa');
});