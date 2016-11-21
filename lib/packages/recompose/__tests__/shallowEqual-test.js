'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Adapted from https://github.com/rackt/react-redux/blob/master/test/utils/shallowEqual.spec.js
(0, _ava2.default)('shallowEqual returns true if arguments are equal, without comparing properties', function (t) {
  var throwOnAccess = {
    get foo() {
      throw new Error('Property was accessed');
    }
  };
  t.true((0, _.shallowEqual)(throwOnAccess, throwOnAccess));
});

(0, _ava2.default)('shallowEqual returns true if arguments fields are equal', function (t) {
  t.true((0, _.shallowEqual)({ a: 1, b: 2, c: undefined }, { a: 1, b: 2, c: undefined }));

  t.true((0, _.shallowEqual)({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }));

  var o = {};
  t.true((0, _.shallowEqual)({ a: 1, b: 2, c: o }, { a: 1, b: 2, c: o }));
});

(0, _ava2.default)('shallowEqual returns false if either argument is null or undefined', function (t) {
  t.false((0, _.shallowEqual)(null, { a: 1, b: 2 }));
  t.false((0, _.shallowEqual)({ a: 1, b: 2 }, null));
});

(0, _ava2.default)('shallowEqual returns false if first argument has too many keys', function (t) {
  t.false((0, _.shallowEqual)({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }));
});

(0, _ava2.default)('shallowEqual returns false if second argument has too many keys', function (t) {
  t.false((0, _.shallowEqual)({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }));
});

(0, _ava2.default)('shallowEqual returns false if arguments have different keys', function (t) {
  t.false((0, _.shallowEqual)({ a: 1, b: 2, c: undefined }, { a: 1, bb: 2, c: undefined }));
});