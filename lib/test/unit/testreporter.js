/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2020 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestReporter = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var TestReporter = function TestReporter(browser) {
  function send(action, json, cb) {
    var r = new XMLHttpRequest();
    r.open("POST", action, true);
    r.setRequestHeader("Content-Type", "application/json");

    r.onreadystatechange = function sendTaskResultOnreadystatechange(e) {
      if (r.readyState === 4) {
        if (r.status !== 200) {
          send(action, json, cb);
        } else {
          if (cb) {
            cb();
          }
        }
      }
    };

    json.browser = browser;
    r.send(JSON.stringify(json));
  }

  function sendInfo(message) {
    send("/info", {
      message: message
    });
  }

  function sendResult(status, description, error) {
    var message = {
      status: status,
      description: description
    };

    if (typeof error !== "undefined") {
      message.error = error;
    }

    send("/submit_task_results", message);
  }

  function sendQuitRequest() {
    send("/tellMeToQuit?browser=".concat(escape(browser)), {});
  }

  this.now = function () {
    return new Date().getTime();
  };

  this.jasmineStarted = function (suiteInfo) {
    this.runnerStartTime = this.now();
    var total = suiteInfo.totalSpecsDefined;
    var seed = suiteInfo.order.seed;
    sendInfo("Started ".concat(total, " tests for ").concat(browser, " with seed ").concat(seed, "."));
  };

  this.suiteStarted = function (result) {
    if (result.failedExpectations.length > 0) {
      var failedMessages = "";

      var _iterator = _createForOfIteratorHelper(result.failedExpectations),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          failedMessages += "".concat(item.message, " ");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      sendResult("TEST-UNEXPECTED-FAIL", result.description, failedMessages);
    }
  };

  this.specStarted = function (result) {};

  this.specDone = function (result) {
    if (result.failedExpectations.length === 0) {
      sendResult("TEST-PASSED", result.description);
    } else {
      var failedMessages = "";

      var _iterator2 = _createForOfIteratorHelper(result.failedExpectations),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          failedMessages += "".concat(item.message, " ");
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      sendResult("TEST-UNEXPECTED-FAIL", result.description, failedMessages);
    }
  };

  this.suiteDone = function (result) {};

  this.jasmineDone = function () {
    setTimeout(sendQuitRequest, 500);
  };
};

exports.TestReporter = TestReporter;