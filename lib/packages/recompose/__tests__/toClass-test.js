'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _ava2.default)('toClass returns the base component if it is already a class', function (t) {
  var BaseComponent = function (_React$Component) {
    _inherits(BaseComponent, _React$Component);

    function BaseComponent() {
      _classCallCheck(this, BaseComponent);

      return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    BaseComponent.prototype.render = function render() {
      return _react2.default.createElement('div', null);
    };

    return BaseComponent;
  }(_react2.default.Component);

  var TestComponent = (0, _.toClass)(BaseComponent);
  t.is(TestComponent, BaseComponent);
});

(0, _ava2.default)('toClass copies propTypes, displayName, contextTypes and defaultProps from base component', function (t) {
  var StatelessComponent = function StatelessComponent(props) {
    return _react2.default.createElement('div', props);
  };

  StatelessComponent.displayName = 'Stateless';
  StatelessComponent.propTypes = { foo: _react.PropTypes.string };
  StatelessComponent.contextTypes = { bar: _react.PropTypes.object };
  StatelessComponent.defaultProps = { foo: 'bar', fizz: 'buzz' };

  var TestComponent = (0, _.toClass)(StatelessComponent);

  t.is(TestComponent.displayName, 'Stateless');
  t.deepEqual(TestComponent.propTypes, { foo: _react.PropTypes.string });
  t.deepEqual(TestComponent.contextTypes, { bar: _react.PropTypes.object });
  t.deepEqual(TestComponent.defaultProps, { foo: 'bar', fizz: 'buzz' });
});

(0, _ava2.default)('toClass passes defaultProps correctly', function (t) {
  var StatelessComponent = function StatelessComponent(props) {
    return _react2.default.createElement('div', props);
  };

  StatelessComponent.displayName = 'Stateless';
  StatelessComponent.propTypes = { foo: _react.PropTypes.string };
  StatelessComponent.contextTypes = { bar: _react.PropTypes.object };
  StatelessComponent.defaultProps = { foo: 'bar', fizz: 'buzz' };

  var TestComponent = (0, _.toClass)(StatelessComponent);

  var div = (0, _enzyme.mount)(_react2.default.createElement(TestComponent, null)).find('div');
  t.is(div.prop('foo'), 'bar');
  t.is(div.prop('fizz'), 'buzz');
});

(0, _ava2.default)('toClass passes context and props correctly', function (t) {
  var store = {};

  var Provider = function (_React$Component2) {
    _inherits(Provider, _React$Component2);

    function Provider() {
      _classCallCheck(this, Provider);

      return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    Provider.prototype.render = function render() {
      return this.props.children;
    };

    return Provider;
  }(_react2.default.Component);

  Provider.propTypes = {
    children: _react.PropTypes.node
  };


  Provider = (0, _.compose)((0, _.withContext)({ store: _react.PropTypes.object }, function (props) {
    return { store: props.store };
  }))(Provider);

  var StatelessComponent = function StatelessComponent(props, context) {
    return _react2.default.createElement('div', { props: props, context: context });
  };

  StatelessComponent.contextTypes = { store: _react.PropTypes.object };

  var TestComponent = (0, _.toClass)(StatelessComponent);

  var div = (0, _enzyme.mount)(_react2.default.createElement(
    Provider,
    { store: store },
    _react2.default.createElement(TestComponent, { fizz: 'fizzbuzz' })
  )).find('div');

  t.is(div.prop('props').fizz, 'fizzbuzz');
  t.is(div.prop('context').store, store);
});

(0, _ava2.default)('toClass works with strings (DOM components)', function (t) {
  var Div = (0, _.toClass)('div');
  var div = (0, _enzyme.mount)(_react2.default.createElement(
    Div,
    null,
    'Hello'
  )).find('div');
  t.is(div.text(), 'Hello');
});