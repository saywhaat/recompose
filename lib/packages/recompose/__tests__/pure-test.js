'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _utils = require('./utils');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('pure implements shouldComponentUpdate() using shallowEqual()', function (t) {
  var initialTodos = ['eat', 'drink', 'sleep'];
  var Todos = (0, _.compose)((0, _.withState)('todos', 'updateTodos', initialTodos), _.pure, _utils.countRenders)('div');

  t.is(Todos.displayName, 'withState(pure(countRenders(div)))');

  var div = (0, _enzyme.mount)(_react2.default.createElement(Todos, null)).find('div');

  var _div$props = div.props(),
      updateTodos = _div$props.updateTodos;

  t.is(div.prop('todos'), initialTodos);
  t.is(div.prop('renderCount'), 1);

  // Does not re-render
  updateTodos(initialTodos);
  t.is(div.prop('todos'), initialTodos);
  t.is(div.prop('renderCount'), 1);

  updateTodos(function (todos) {
    return todos.slice(0, -1);
  });
  t.deepEqual(div.prop('todos'), ['eat', 'drink']);
  t.is(div.prop('renderCount'), 2);
});