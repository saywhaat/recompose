'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('compose composes from right to left', function (t) {
  var double = function double(x) {
    return x * 2;
  };
  var square = function square(x) {
    return x * x;
  };
  t.is((0, _.compose)(square)(5), 25);
  t.is((0, _.compose)(square, double)(5), 100);
  t.is((0, _.compose)(double, square, double)(5), 200);
});

(0, _ava2.default)('compose can be seeded with multiple arguments', function (t) {
  var square = function square(x) {
    return x * x;
  };
  var add = function add(x, y) {
    return x + y;
  };
  t.is((0, _.compose)(square, add)(1, 2), 9);
});

(0, _ava2.default)('compose returns the identity function if given no arguments', function (t) {
  t.is((0, _.compose)()(1, 2), 1);
  t.is((0, _.compose)()(3), 3);
  t.is((0, _.compose)()(), undefined);
});

(0, _ava2.default)('compose returns the first function if given only one', function (t) {
  var fn = function fn() {};
  t.is((0, _.compose)(fn), fn);
});