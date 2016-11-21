'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SET_COUNTER = 'SET_COUNTER';

(0, _ava2.default)('adds a stateful value and a function for updating it', function (t) {
  var initialState = { counter: 0 };

  var reducer = function reducer(state, action) {
    return action.type === SET_COUNTER ? { counter: action.payload } : state;
  };

  var Counter = (0, _.compose)((0, _.withReducer)('state', 'dispatch', reducer, initialState), (0, _.flattenProp)('state'))('div');

  t.is(Counter.displayName, 'withReducer(flattenProp(div))');

  var div = (0, _enzyme.mount)(_react2.default.createElement(Counter, null)).find('div');

  var _div$props = div.props(),
      dispatch = _div$props.dispatch;

  t.is(div.prop('counter'), 0);

  dispatch({ type: SET_COUNTER, payload: 18 });
  t.is(div.prop('counter'), 18);
});

(0, _ava2.default)('calls initialState when it is a function', function (t) {
  var initialState = function initialState(_ref) {
    var initialCount = _ref.initialCount;
    return { counter: initialCount };
  };

  var reducer = function reducer(state, action) {
    return action.type === SET_COUNTER ? { counter: action.payload } : state;
  };

  var Counter = (0, _.compose)((0, _.withReducer)('state', 'dispatch', reducer, initialState), (0, _.flattenProp)('state'))('div');

  var div = (0, _enzyme.mount)(_react2.default.createElement(Counter, { initialCount: 10 })).find('div');

  t.is(div.prop('counter'), 10);
});

(0, _ava2.default)('receives state from reducer when initialState is not provided', function (t) {
  var initialState = { counter: 0 };

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];
    return action.type === SET_COUNTER ? { counter: action.payload } : state;
  };

  var Counter = (0, _.compose)((0, _.withReducer)('state', 'dispatch', reducer), (0, _.flattenProp)('state'))('div');

  var div = (0, _enzyme.mount)(_react2.default.createElement(Counter, null)).find('div');

  t.is(div.prop('counter'), 0);
});