'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('onlyUpdateForPropTypes only updates for props specified in propTypes', function (t) {
  var Counter = (0, _.compose)((0, _.withState)('counter', 'updateCounter', 0), (0, _.withState)('foobar', 'updateFoobar', 'foobar'), _.onlyUpdateForPropTypes, (0, _.setPropTypes)({ counter: _react.PropTypes.number }))(function (props) {
    return _react2.default.createElement('div', props);
  });

  t.is(Counter.displayName, 'withState(withState(onlyUpdateForPropTypes(Component)))');

  var div = (0, _enzyme.mount)(_react2.default.createElement(Counter, null)).find('div');

  var _div$props = div.props(),
      updateCounter = _div$props.updateCounter,
      updateFoobar = _div$props.updateFoobar;

  t.is(div.prop('counter'), 0);
  t.is(div.prop('foobar'), 'foobar');

  // Does not update
  updateFoobar('barbaz');
  t.is(div.prop('counter'), 0);
  t.is(div.prop('foobar'), 'foobar');

  updateCounter(42);
  t.is(div.prop('counter'), 42);
  t.is(div.prop('foobar'), 'barbaz');
});

_ava2.default.serial('onlyUpdateForPropTypes warns if BaseComponent does not have any propTypes', function (t) {
  var error = _sinon2.default.stub(console, 'error');
  var ShouldWarn = (0, _.onlyUpdateForPropTypes)('div');

  (0, _enzyme.shallow)(_react2.default.createElement(ShouldWarn, null));

  t.is(error.firstCall.args[0], 'A component without any `propTypes` was passed to ' + '`onlyUpdateForPropTypes()`. Check the implementation of the component ' + 'with display name "div".');

  /* eslint-disable */
  console.error.restore();
  /* eslint-enable */
});