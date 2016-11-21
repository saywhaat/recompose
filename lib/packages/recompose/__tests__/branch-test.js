'use strict';

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('branch tests props and applies one of two HoCs, for true and false', function (t) {
  var SayMyName = (0, _.compose)((0, _.withState)('isBad', 'updateIsBad', false), (0, _.branch)(function (props) {
    return props.isBad;
  }, (0, _.withProps)({ name: 'Heisenberg' }), (0, _.withProps)({ name: 'Walter' })))(function (_ref) {
    var isBad = _ref.isBad,
        name = _ref.name,
        updateIsBad = _ref.updateIsBad;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'isBad' },
        isBad ? 'true' : 'false'
      ),
      _react2.default.createElement(
        'div',
        { className: 'name' },
        name
      ),
      _react2.default.createElement(
        'button',
        { onClick: function onClick() {
            return updateIsBad(function (b) {
              return !b;
            });
          } },
        'Toggle'
      )
    );
  });

  t.is(SayMyName.displayName, 'withState(branch(Component))');

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(SayMyName, null));
  var getIsBad = function getIsBad() {
    return wrapper.find('.isBad').text();
  };
  var getName = function getName() {
    return wrapper.find('.name').text();
  };
  var toggle = wrapper.find('button');

  t.is(getIsBad(), 'false');
  t.is(getName(), 'Walter');

  toggle.simulate('click');

  t.is(getIsBad(), 'true');
  t.is(getName(), 'Heisenberg');
});

(0, _ava2.default)('branch defaults third argument to identity function', function (t) {
  var Left = function Left() {
    return _react2.default.createElement(
      'div',
      { className: 'left' },
      'Left'
    );
  };
  var Right = function Right() {
    return _react2.default.createElement(
      'div',
      { className: 'right' },
      'Right'
    );
  };

  var BranchedComponent = (0, _.branch)(function () {
    return false;
  }, function () {
    return function (props) {
      return _react2.default.createElement(Left, props);
    };
  })(Right);

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BranchedComponent, null));
  var right = wrapper.find('.right').text();

  t.is(right, 'Right');
});

(0, _ava2.default)('branch third argument should not cause console error', function (t) {
  var error = _sinon2.default.stub(console, 'error');
  var Component = function Component() {
    return _react2.default.createElement(
      'div',
      { className: 'right' },
      'Component'
    );
  };

  var BranchedComponent = (0, _.branch)(function () {
    return false;
  }, function (v) {
    return v;
  }, function (v) {
    return v;
  })(Component);

  (0, _enzyme.mount)(_react2.default.createElement(BranchedComponent, null));

  t.is(error.called, false);

  /* eslint-disable */
  error.restore();
  /* eslint-enable */
});