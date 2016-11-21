'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('lifecycle is a higher-order component version of React.createClass', function (t) {
  var enhance = (0, _.lifecycle)({
    componentWillMount: function componentWillMount() {
      this.setState({ bar: 'baz' });
    }
  });
  var Div = enhance('div');
  t.is(Div.displayName, 'lifecycle(div)');

  var div = (0, _enzyme.mount)(_react2.default.createElement(Div, { foo: 'bar' })).find('div');
  t.is(div.prop('foo'), 'bar');
  t.is(div.prop('bar'), 'baz');
});