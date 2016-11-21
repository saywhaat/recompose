'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _rxjsObservableConfig = require('../rxjsObservableConfig');

var _rxjsObservableConfig2 = _interopRequireDefault(_rxjsObservableConfig);

var _rxjs4ObservableConfig = require('../rxjs4ObservableConfig');

var _rxjs4ObservableConfig2 = _interopRequireDefault(_rxjs4ObservableConfig);

var _mostObservableConfig = require('../mostObservableConfig');

var _mostObservableConfig2 = _interopRequireDefault(_mostObservableConfig);

var _xstreamObservableConfig = require('../xstreamObservableConfig');

var _xstreamObservableConfig2 = _interopRequireDefault(_xstreamObservableConfig);

var _baconObservableConfig = require('../baconObservableConfig');

var _baconObservableConfig2 = _interopRequireDefault(_baconObservableConfig);

var _kefirObservableConfig = require('../kefirObservableConfig');

var _kefirObservableConfig2 = _interopRequireDefault(_kefirObservableConfig);

var _setObservableConfig = require('../setObservableConfig');

var _setObservableConfig2 = _interopRequireDefault(_setObservableConfig);

var _componentFromStream = require('../componentFromStream');

var _componentFromStream2 = _interopRequireDefault(_componentFromStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testTransform = function testTransform(t, transform) {
  var Double = (0, _componentFromStream2.default)(transform);
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Double, { n: 112 }));
  var div = wrapper.find('div');
  t.is(div.text(), '224');
  wrapper.setProps({ n: 358 });
  t.is(div.text(), '716');
};

_ava2.default.skip('works with RxJS 5', function (t) {
  (0, _setObservableConfig2.default)(_rxjsObservableConfig2.default);
  testTransform(t, function (props$) {
    return props$.map(function (_ref) {
      var n = _ref.n;
      return _react2.default.createElement(
        'div',
        null,
        n * 2
      );
    });
  });
});

(0, _ava2.default)('works with RxJS 4', function (t) {
  (0, _setObservableConfig2.default)(_rxjs4ObservableConfig2.default);
  testTransform(t, function (props$) {
    return props$.map(function (_ref2) {
      var n = _ref2.n;
      return _react2.default.createElement(
        'div',
        null,
        n * 2
      );
    });
  });
});

(0, _ava2.default)('works with most', function (t) {
  (0, _setObservableConfig2.default)(_mostObservableConfig2.default);
  testTransform(t, function (props$) {
    return props$.map(function (_ref3) {
      var n = _ref3.n;
      return _react2.default.createElement(
        'div',
        null,
        n * 2
      );
    });
  });
});

(0, _ava2.default)('works with xstream', function (t) {
  (0, _setObservableConfig2.default)(_xstreamObservableConfig2.default);
  testTransform(t, function (props$) {
    return props$.map(function (_ref4) {
      var n = _ref4.n;
      return _react2.default.createElement(
        'div',
        null,
        n * 2
      );
    });
  });
});

(0, _ava2.default)('works with bacon', function (t) {
  (0, _setObservableConfig2.default)(_baconObservableConfig2.default);
  testTransform(t, function (props$) {
    return props$.map(function (_ref5) {
      var n = _ref5.n;
      return _react2.default.createElement(
        'div',
        null,
        n * 2
      );
    });
  });
});

(0, _ava2.default)('works with kefir', function (t) {
  (0, _setObservableConfig2.default)(_kefirObservableConfig2.default);
  testTransform(t, function (props$) {
    return props$.map(function (_ref6) {
      var n = _ref6.n;
      return _react2.default.createElement(
        'div',
        null,
        n * 2
      );
    });
  });
});