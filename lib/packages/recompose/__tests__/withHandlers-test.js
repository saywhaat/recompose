'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('../');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('withHandlers passes handlers to base component', function (t) {
  var submittedFormValue = void 0;
  var enhanceForm = (0, _.compose)((0, _.withState)('value', 'updateValue', ''), (0, _.withHandlers)({
    onChange: function onChange(props) {
      return function (event) {
        props.updateValue(event.target.value);
      };
    },
    onSubmit: function onSubmit(props) {
      return function () {
        submittedFormValue = props.value;
      };
    }
  }));

  var Form = enhanceForm(function (_ref) {
    var value = _ref.value,
        onChange = _ref.onChange,
        onSubmit = _ref.onSubmit;
    return _react2.default.createElement(
      'form',
      { onSubmit: onSubmit },
      _react2.default.createElement(
        'label',
        null,
        'Value',
        _react2.default.createElement('input', { type: 'text', value: value, onChange: onChange })
      ),
      _react2.default.createElement(
        'p',
        null,
        value
      )
    );
  });

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Form, null));
  var input = wrapper.find('input');
  var output = wrapper.find('p');
  var form = wrapper.find('form');

  input.simulate('change', { target: { value: 'Yay' } });
  t.is(output.text(), 'Yay');

  input.simulate('change', { target: { value: 'Yay!!' } });
  t.is(output.text(), 'Yay!!');

  form.simulate('submit');
  t.is(submittedFormValue, 'Yay!!');
});

(0, _ava2.default)('withHandlers passes immutable handlers', function (t) {
  var enhance = (0, _.withHandlers)({
    handler: function handler() {
      return function () {
        return null;
      };
    }
  });
  var Div = enhance('div');

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null));
  var div = wrapper.find('div');
  var handler = div.prop('handler');

  wrapper.setProps({ foo: 'bar' });
  t.is(div.prop('handler'), handler);
});

(0, _ava2.default)('withHandlers caches handlers properly', function (t) {
  var handlerCreationSpy = _sinon2.default.spy();
  var handlerCallSpy = _sinon2.default.spy();

  var enhance = (0, _.withHandlers)({
    handler: function handler(props) {
      handlerCreationSpy(props);
      return function (val) {
        handlerCallSpy(val);
      };
    }
  });
  var Div = enhance('div');

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, { foo: 'bar' }));
  var div = wrapper.find('div');
  var handler = div.prop('handler');

  // Don't create handler until it is called
  t.is(handlerCreationSpy.callCount, 0);
  t.is(handlerCallSpy.callCount, 0);

  handler(1);
  t.is(handlerCreationSpy.callCount, 1);
  t.deepEqual(handlerCreationSpy.args[0], [{ foo: 'bar' }]);
  t.is(handlerCallSpy.callCount, 1);
  t.deepEqual(handlerCallSpy.args[0], [1]);

  // Props haven't changed; should use cached handler
  handler(2);
  t.is(handlerCreationSpy.callCount, 1);
  t.is(handlerCallSpy.callCount, 2);
  t.deepEqual(handlerCallSpy.args[1], [2]);

  wrapper.setProps({ foo: 'baz' });
  handler(3);
  // Props did change; handler should be recreated
  t.is(handlerCreationSpy.callCount, 2);
  t.deepEqual(handlerCreationSpy.args[1], [{ foo: 'baz' }]);
  t.is(handlerCallSpy.callCount, 3);
  t.deepEqual(handlerCallSpy.args[2], [3]);
});

_ava2.default.serial('withHandlers warns if handler is not a higher-order function', function (t) {
  var error = _sinon2.default.stub(console, 'error');

  var Button = (0, _.withHandlers)({
    onClick: function onClick() {}
  })('button');

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Button, null));
  var button = wrapper.find('button');

  t.throws(function () {
    return button.simulate('click');
  }, /undefined/);

  t.is(error.firstCall.args[0], 'withHandlers(): Expected a map of higher-order functions. Refer to ' + 'the docs for more info.');

  /* eslint-disable */
  console.error.restore();
  /* eslint-enable */
});