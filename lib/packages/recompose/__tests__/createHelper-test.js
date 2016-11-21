'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _createHelper = require('../createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('createHelper properly sets display name', function (t) {
  var BaseComponent = { displayName: 'Base' };
  var func = function func() {
    return function (_) {
      return {};
    };
  };

  t.is((0, _createHelper2.default)(func, 'func')()(BaseComponent).displayName, 'func(Base)');

  t.is((0, _createHelper2.default)(func, 'func', false)()(BaseComponent).displayName, undefined);
});

(0, _ava2.default)('createHelper works for zero-arg helpers', function (t) {
  var BaseComponent = { displayName: 'Base' };
  var func = function func(_) {
    return {};
  };

  t.is((0, _createHelper2.default)(func, 'func', true, true)(BaseComponent).displayName, 'func(Base)');

  t.is((0, _createHelper2.default)(func, 'func', false, true)(BaseComponent).displayName, undefined);
});