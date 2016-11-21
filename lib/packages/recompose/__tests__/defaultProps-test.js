'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('defaultProps passes additional props to base component', function (t) {
  var DoReMi = (0, _.defaultProps)({ so: 'do', la: 'fa' })('div');
  t.is(DoReMi.displayName, 'defaultProps(div)');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, null)).find('div');
  t.true(div.equals(_react2.default.createElement('div', { so: 'do', la: 'fa' })));
});

(0, _ava2.default)('defaultProps has lower precendence than props from owner', function (t) {
  var DoReMi = (0, _.defaultProps)({ so: 'do', la: 'fa' })('div');
  t.is(DoReMi.displayName, 'defaultProps(div)');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, { la: 'ti' })).find('div');
  t.true(div.equals(_react2.default.createElement('div', { so: 'do', la: 'ti' })));
});

(0, _ava2.default)('defaultProps overrides undefined owner props', function (t) {
  var DoReMi = (0, _.defaultProps)({ so: 'do', la: 'fa' })('div');
  t.is(DoReMi.displayName, 'defaultProps(div)');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, { la: undefined })).find('div');
  t.true(div.equals(_react2.default.createElement('div', { so: 'do', la: 'fa' })));
});