'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('withProps passes additional props to base component', function (t) {
  var DoReMi = (0, _.withProps)({ so: 'do', la: 'fa' })('div');
  t.is(DoReMi.displayName, 'withProps(div)');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, null)).find('div');
  t.is(div.prop('so'), 'do');
  t.is(div.prop('la'), 'fa');
});

(0, _ava2.default)('withProps takes precedent over owner props', function (t) {
  var DoReMi = (0, _.withProps)({ so: 'do', la: 'fa' })('div');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, { la: 'ti' })).find('div');
  t.is(div.prop('so'), 'do');
  t.is(div.prop('la'), 'fa');
});

(0, _ava2.default)('withProps should accept function', function (t) {
  var DoReMi = (0, _.withProps)(function (_ref) {
    var la = _ref.la;
    return {
      so: la
    };
  })('div');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, { la: 'la' })).find('div');
  t.is(div.prop('so'), 'la');
});