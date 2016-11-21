'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('renameProp renames a single prop', function (t) {
  var StringConcat = (0, _.compose)((0, _.withProps)({ so: 123, la: 456 }), (0, _.renameProp)('so', 'do'))('div');

  t.is(StringConcat.displayName, 'withProps(renameProp(div))');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(StringConcat, null)).find('div');
  t.deepEqual(div.props(), { do: 123, la: 456 });
});