'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('nest nests components from outer to inner', function (t) {
  var A = (0, _.setDisplayName)('A')((0, _.toClass)('div'));
  var B = (0, _.setDisplayName)('B')((0, _.toClass)('div'));
  var C = (0, _.setDisplayName)('C')((0, _.toClass)('div'));

  var Nest = (0, _.nest)(A, B, C);

  t.is(Nest.displayName, 'nest(A, B, C)');

  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    Nest,
    { pass: 'through' },
    'Child'
  ));

  t.true(wrapper.equals(_react2.default.createElement(
    A,
    { pass: 'through' },
    _react2.default.createElement(
      B,
      { pass: 'through' },
      _react2.default.createElement(
        C,
        { pass: 'through' },
        'Child'
      )
    )
  )));
});