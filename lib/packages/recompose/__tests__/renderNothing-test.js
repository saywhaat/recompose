'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('renderNothing returns a component that renders null', function (t) {
  var nothing = (0, _.renderNothing)('div');
  t.is(nothing(), null);
  t.is(nothing.displayName, 'Nothing');
});