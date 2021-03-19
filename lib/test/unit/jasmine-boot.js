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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _worker_options = require("pdfjs/display/worker_options.js");

var _is_node = require("pdfjs/shared/is_node.js");

var _fetch_stream = require("pdfjs/display/fetch_stream.js");

var _network = require("pdfjs/display/network.js");

var _api_metapdf = require("pdfjs/display/api_metapdf.js");

var _testreporter = require("./testreporter.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initializePDFJS(_x) {
  return _initializePDFJS.apply(this, arguments);
}

function _initializePDFJS() {
  _initializePDFJS = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(callback) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all(["pdfjs-test/unit/annotation_spec.js", "pdfjs-test/unit/annotation_storage_spec.js", "pdfjs-test/unit/api_spec.js", "pdfjs-test/unit/bidi_spec.js", "pdfjs-test/unit/cff_parser_spec.js", "pdfjs-test/unit/cmap_spec.js", "pdfjs-test/unit/colorspace_spec.js", "pdfjs-test/unit/core_utils_spec.js", "pdfjs-test/unit/crypto_spec.js", "pdfjs-test/unit/custom_spec.js", "pdfjs-test/unit/display_svg_spec.js", "pdfjs-test/unit/display_utils_spec.js", "pdfjs-test/unit/document_spec.js", "pdfjs-test/unit/encodings_spec.js", "pdfjs-test/unit/evaluator_spec.js", "pdfjs-test/unit/function_spec.js", "pdfjs-test/unit/fetch_stream_spec.js", "pdfjs-test/unit/message_handler_spec.js", "pdfjs-test/unit/metadata_spec.js", "pdfjs-test/unit/murmurhash3_spec.js", "pdfjs-test/unit/network_spec.js", "pdfjs-test/unit/network_utils_spec.js", "pdfjs-test/unit/parser_spec.js", "pdfjs-test/unit/pdf_find_controller_spec.js", "pdfjs-test/unit/pdf_find_utils_spec.js", "pdfjs-test/unit/pdf_history_spec.js", "pdfjs-test/unit/primitives_spec.js", "pdfjs-test/unit/scripting_spec.js", "pdfjs-test/unit/stream_spec.js", "pdfjs-test/unit/type1_parser_spec.js", "pdfjs-test/unit/ui_utils_spec.js", "pdfjs-test/unit/unicode_spec.js", "pdfjs-test/unit/util_spec.js", "pdfjs-test/unit/writer_spec.js", "pdfjs-test/unit/xml_spec.js"].map(function (moduleName) {
              return Promise.resolve("".concat(moduleName)).then(function (s) {
                return _interopRequireWildcard(require(s));
              });
            }));

          case 2:
            if (!_is_node.isNodeJS) {
              _context.next = 4;
              break;
            }

            throw new Error("The `gulp unittest` command cannot be used in Node.js environments.");

          case 4:
            if (typeof Response !== "undefined" && "body" in Response.prototype && typeof ReadableStream !== "undefined") {
              (0, _api_metapdf.setPDFNetworkStreamFactory)(function (params) {
                return new _fetch_stream.PDFFetchStream(params);
              });
            } else {
              (0, _api_metapdf.setPDFNetworkStreamFactory)(function (params) {
                return new _network.PDFNetworkStream(params);
              });
            }

            _worker_options.GlobalWorkerOptions.workerSrc = "../../build/generic/build/pdf.worker.js";
            callback();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _initializePDFJS.apply(this, arguments);
}

(function () {
  window.jasmine = jasmineRequire.core(jasmineRequire);
  jasmineRequire.html(jasmine);
  var env = jasmine.getEnv();
  var jasmineInterface = jasmineRequire["interface"](jasmine, env);
  extend(window, jasmineInterface);
  var queryString = new jasmine.QueryString({
    getWindowLocation: function getWindowLocation() {
      return window.location;
    }
  });
  var config = {
    failFast: queryString.getParam("failFast"),
    oneFailurePerSpec: queryString.getParam("oneFailurePerSpec"),
    hideDisabled: queryString.getParam("hideDisabled")
  };
  var random = queryString.getParam("random");

  if (random !== undefined && random !== "") {
    config.random = random;
  }

  var seed = queryString.getParam("seed");

  if (seed) {
    config.seed = seed;
  }

  var htmlReporter = new jasmine.HtmlReporter({
    env: env,
    navigateWithNewParam: function navigateWithNewParam(key, value) {
      return queryString.navigateWithNewParam(key, value);
    },
    addToExistingQueryString: function addToExistingQueryString(key, value) {
      return queryString.fullStringWithNewParam(key, value);
    },
    getContainer: function getContainer() {
      return document.body;
    },
    createElement: function createElement() {
      return document.createElement.apply(document, arguments);
    },
    createTextNode: function createTextNode() {
      return document.createTextNode.apply(document, arguments);
    },
    timer: new jasmine.Timer()
  });
  env.addReporter(htmlReporter);

  if (queryString.getParam("browser")) {
    var testReporter = new _testreporter.TestReporter(queryString.getParam("browser"));
    env.addReporter(testReporter);
  }

  var specFilter = new jasmine.HtmlSpecFilter({
    filterString: function filterString() {
      return queryString.getParam("spec");
    }
  });

  config.specFilter = function (spec) {
    return specFilter.matches(spec.getFullName());
  };

  env.configure(config);
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

  function extend(destination, source) {
    for (var property in source) {
      destination[property] = source[property];
    }

    return destination;
  }

  function unitTestInit() {
    initializePDFJS(function () {
      htmlReporter.initialize();
      env.execute();
    });
  }

  if (document.readyState === "interactive" || document.readyState === "complete") {
    unitTestInit();
  } else {
    document.addEventListener("DOMContentLoaded", unitTestInit, true);
  }
})();