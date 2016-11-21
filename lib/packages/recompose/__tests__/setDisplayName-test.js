'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('setDisplayName sets a static property on the base component', function (t) {
  var BaseComponent = function BaseComponent() {
    return _react2.default.createElement('div', null);
  };
  var NewComponent = (0, _.setDisplayName)('Foo')(BaseComponent);
  t.is(NewComponent.displayName, 'Foo');
});