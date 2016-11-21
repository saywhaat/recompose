'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('flattenProps flattens an object prop and spreads it into the top-level props object', function (t) {
  var Counter = (0, _.flattenProp)('state')('div');
  t.is(Counter.displayName, 'flattenProp(div)');

  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(Counter, { pass: 'through', state: { counter: 1 } }));

  t.true(wrapper.equals(_react2.default.createElement('div', { pass: 'through', state: { counter: 1 }, counter: 1 })));

  wrapper.setProps({
    pass: 'through',
    state: { state: 1 }
  });
  t.true(wrapper.equals(_react2.default.createElement('div', { pass: 'through', state: 1 })));
});