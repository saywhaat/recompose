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

(0, _ava2.default)('withContext + getContext adds to and grabs from context', function (t) {
  // Mini React Redux clone
  var store = {
    getState: function getState() {
      return {
        todos: ['eat', 'drink', 'sleep'],
        counter: 12
      };
    }
  };

  var BaseProvider = function (_Component) {
    _inherits(BaseProvider, _Component);

    function BaseProvider() {
      _classCallCheck(this, BaseProvider);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    BaseProvider.prototype.render = function render() {
      return this.props.children;
    };

    return BaseProvider;
  }(_react.Component);

  BaseProvider.propTypes = {
    children: _react.PropTypes.node
  };


  var Provider = (0, _.compose)((0, _.withContext)({ store: _react.PropTypes.object }, function (props) {
    return { store: props.store };
  }))(BaseProvider);

  t.is(Provider.displayName, 'withContext(BaseProvider)');

  var connect = function connect(selector) {
    return (0, _.compose)((0, _.getContext)({ store: _react.PropTypes.object }), (0, _.mapProps)(function (props) {
      return selector(props.store.getState());
    }));
  };

  var TodoList = connect(function (_ref) {
    var todos = _ref.todos;
    return { todos: todos };
  })('div');

  t.is(TodoList.displayName, 'getContext(mapProps(div))');

  var div = (0, _enzyme.mount)(_react2.default.createElement(
    Provider,
    { store: store },
    _react2.default.createElement(TodoList, null)
  )).find('div');

  t.deepEqual(div.prop('todos'), ['eat', 'drink', 'sleep']);
});