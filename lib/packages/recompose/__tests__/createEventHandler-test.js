'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('createEventHandler creates an event handler and a corresponding stream', function (t) {
  var result = [];

  var _createEventHandler = (0, _.createEventHandler)(),
      stream = _createEventHandler.stream,
      handler = _createEventHandler.handler;

  var subscription = stream.subscribe({ next: function next(v) {
      return result.push(v);
    } });

  handler(1);
  handler(2);
  handler(3);

  subscription.unsubscribe();
  t.deepEqual(result, [1, 2, 3]);
});

(0, _ava2.default)('handles multiple subscribers', function (t) {
  var result1 = [];
  var result2 = [];

  var _createEventHandler2 = (0, _.createEventHandler)(),
      handler = _createEventHandler2.handler,
      stream = _createEventHandler2.stream;

  var subscription1 = stream.subscribe({ next: function next(v) {
      return result1.push(v);
    } });
  var subscription2 = stream.subscribe({ next: function next(v) {
      return result2.push(v);
    } });

  handler(1);
  handler(2);
  handler(3);

  subscription1.unsubscribe();
  subscription2.unsubscribe();

  t.deepEqual(result1, [1, 2, 3]);
  t.deepEqual(result2, [1, 2, 3]);
});