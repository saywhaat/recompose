'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _rxjs = require('rxjs');

var _setObservableConfig = require('../setObservableConfig');

var _setObservableConfig2 = _interopRequireDefault(_setObservableConfig);

var _rxjsObservableConfig = require('../rxjsObservableConfig');

var _rxjsObservableConfig2 = _interopRequireDefault(_rxjsObservableConfig);

var _componentFromStream = require('../componentFromStream');

var _componentFromStream2 = _interopRequireDefault(_componentFromStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _setObservableConfig2.default)(_rxjsObservableConfig2.default);

(0, _ava2.default)('componentFromStream creates a component from a prop stream transformation', function (t) {
  var Double = (0, _componentFromStream2.default)(function (props$) {
    return props$.map(function (_ref) {
      var n = _ref.n;
      return _react2.default.createElement(
        'div',
        null,
        n * 2
      );
    });
  });
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Double, { n: 112 }));
  var div = wrapper.find('div');
  t.is(div.text(), '224');
  wrapper.setProps({ n: 358 });
  t.is(div.text(), '716');
});

(0, _ava2.default)('componentFromStream unsubscribes from stream before unmounting', function (t) {
  var subscriptions = 0;
  var vdom$ = new _rxjs.Observable(function (observer) {
    subscriptions += 1;
    observer.next(_react2.default.createElement('div', null));
    return {
      unsubscribe: function unsubscribe() {
        subscriptions -= 1;
      }
    };
  });
  var Div = (0, _componentFromStream2.default)(function () {
    return vdom$;
  });
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null));
  t.is(subscriptions, 1);
  wrapper.unmount();
  t.is(subscriptions, 0);
});

(0, _ava2.default)('componentFromStream renders nothing until the stream emits a value', function (t) {
  var vdom$ = new _rxjs.Subject();
  var Div = (0, _componentFromStream2.default)(function () {
    return vdom$.mapTo(_react2.default.createElement('div', null));
  });
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null));
  t.is(wrapper.find('div').length, 0);
  vdom$.next();
  t.is(wrapper.find('div').length, 1);
});

(0, _ava2.default)('handler multiple observers of props stream', function (t) {
  var Div = (0, _componentFromStream2.default)(function (props$) {
    return (
      // Adds three observers to props stream
      props$.combineLatest(props$, props$, function (props1) {
        return _react2.default.createElement('div', props1);
      })
    );
  });

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, { value: 1 }));
  var div = wrapper.find('div');

  t.is(div.prop('value'), 1);
  wrapper.setProps({ value: 2 });
  t.is(div.prop('value'), 2);
});