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
exports.getDocument = getDocument;
exports.setPDFNetworkStreamFactory = setPDFNetworkStreamFactory;
exports.build = exports.version = exports.PDFPageProxy = exports.PDFDocumentProxy = exports.PDFWorker = exports.PDFDataRangeTransport = exports.LoopbackPort = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util_metapdf = require("../shared/util_metapdf.js");

var _display_utils = require("./display_utils.js");

var _font_loader = require("./font_loader.js");

var _node_utils = require("./node_utils.js");

var _annotation_storage = require("./annotation_storage.js");

var _api_compatibility = require("./api_compatibility.js");

var _canvas_metapdf = require("./canvas_metapdf.js");

var _worker_options = require("./worker_options.js");

var _is_node = require("../shared/is_node.js");

var _message_handler = require("../shared/message_handler.js");

var _metadata = require("./metadata.js");

var _optional_content_config = require("./optional_content_config.js");

var _transport_stream = require("./transport_stream.js");

var _webgl = require("./webgl.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var DEFAULT_RANGE_CHUNK_SIZE = 65536;
var RENDERING_CANCELLED_TIMEOUT = 100;
var DefaultCanvasFactory = _is_node.isNodeJS ? _node_utils.NodeCanvasFactory : _display_utils.DOMCanvasFactory;
var DefaultCMapReaderFactory = _is_node.isNodeJS ? _node_utils.NodeCMapReaderFactory : _display_utils.DOMCMapReaderFactory;
var createPDFNetworkStream;

function setPDFNetworkStreamFactory(pdfNetworkStreamFactory) {
  createPDFNetworkStream = pdfNetworkStreamFactory;
}

function getDocument(src) {
  var task = new PDFDocumentLoadingTask();
  var source;

  if (typeof src === "string") {
    source = {
      url: src
    };
  } else if ((0, _util_metapdf.isArrayBuffer)(src)) {
    source = {
      data: src
    };
  } else if (src instanceof PDFDataRangeTransport) {
    source = {
      range: src
    };
  } else {
    if (_typeof(src) !== "object") {
      throw new Error("Invalid parameter in getDocument, " + "need either Uint8Array, string or a parameter object");
    }

    if (!src.url && !src.data && !src.range) {
      throw new Error("Invalid parameter object: need either .data, .range or .url");
    }

    source = src;
  }

  var params = Object.create(null);
  var rangeTransport = null,
      worker = null;

  for (var key in source) {
    if (key === "url" && typeof window !== "undefined") {
      params[key] = new URL(source[key], window.location).href;
      continue;
    } else if (key === "range") {
      rangeTransport = source[key];
      continue;
    } else if (key === "worker") {
      worker = source[key];
      continue;
    } else if (key === "data" && !(source[key] instanceof Uint8Array)) {
      var pdfBytes = source[key];

      if (typeof pdfBytes === "string") {
        params[key] = (0, _util_metapdf.stringToBytes)(pdfBytes);
      } else if (_typeof(pdfBytes) === "object" && pdfBytes !== null && !isNaN(pdfBytes.length)) {
        params[key] = new Uint8Array(pdfBytes);
      } else if ((0, _util_metapdf.isArrayBuffer)(pdfBytes)) {
        params[key] = new Uint8Array(pdfBytes);
      } else {
        throw new Error("Invalid PDF binary data: either typed array, " + "string or array-like object is expected in the " + "data property.");
      }

      continue;
    }

    params[key] = source[key];
  }

  params.rangeChunkSize = params.rangeChunkSize || DEFAULT_RANGE_CHUNK_SIZE;
  params.CMapReaderFactory = params.CMapReaderFactory || DefaultCMapReaderFactory;
  params.ignoreErrors = params.stopAtErrors !== true;
  params.fontExtraProperties = params.fontExtraProperties === true;
  params.pdfBug = params.pdfBug === true;

  if (!Number.isInteger(params.maxImageSize)) {
    params.maxImageSize = -1;
  }

  if (typeof params.isEvalSupported !== "boolean") {
    params.isEvalSupported = true;
  }

  if (typeof params.disableFontFace !== "boolean") {
    params.disableFontFace = _api_compatibility.apiCompatibilityParams.disableFontFace || false;
  }

  if (typeof params.ownerDocument === "undefined") {
    params.ownerDocument = globalThis.document;
  }

  if (typeof params.disableRange !== "boolean") {
    params.disableRange = false;
  }

  if (typeof params.disableStream !== "boolean") {
    params.disableStream = false;
  }

  if (typeof params.disableAutoFetch !== "boolean") {
    params.disableAutoFetch = false;
  }

  (0, _util_metapdf.setVerbosityLevel)(params.verbosity);

  if (!worker) {
    var workerParams = {
      verbosity: params.verbosity,
      port: _worker_options.GlobalWorkerOptions.workerPort
    };
    worker = workerParams.port ? PDFWorker.fromPort(workerParams) : new PDFWorker(workerParams);
    task._worker = worker;
  }

  var docId = task.docId;
  worker.promise.then(function () {
    if (task.destroyed) {
      throw new Error("Loading aborted");
    }

    var workerIdPromise = _fetchDocument(worker, params, rangeTransport, docId);

    var networkStreamPromise = new Promise(function (resolve) {
      var networkStream;

      if (rangeTransport) {
        networkStream = new _transport_stream.PDFDataTransportStream({
          length: params.length,
          initialData: params.initialData,
          progressiveDone: params.progressiveDone,
          disableRange: params.disableRange,
          disableStream: params.disableStream
        }, rangeTransport);
      } else if (!params.data) {
        networkStream = createPDFNetworkStream({
          url: params.url,
          length: params.length,
          httpHeaders: params.httpHeaders,
          withCredentials: params.withCredentials,
          rangeChunkSize: params.rangeChunkSize,
          disableRange: params.disableRange,
          disableStream: params.disableStream
        });
      }

      resolve(networkStream);
    });
    return Promise.all([workerIdPromise, networkStreamPromise]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          workerId = _ref2[0],
          networkStream = _ref2[1];

      if (task.destroyed) {
        throw new Error("Loading aborted");
      }

      var messageHandler = new _message_handler.MessageHandler(docId, workerId, worker.port);
      messageHandler.postMessageTransfers = worker.postMessageTransfers;
      var transport = new WorkerTransport(messageHandler, task, networkStream, params);
      task._transport = transport;
      messageHandler.send("Ready", null);
    });
  })["catch"](task._capability.reject);
  return task;
}

function _fetchDocument(worker, source, pdfDataRangeTransport, docId) {
  if (worker.destroyed) {
    return Promise.reject(new Error("Worker was destroyed"));
  }

  if (pdfDataRangeTransport) {
    source.length = pdfDataRangeTransport.length;
    source.initialData = pdfDataRangeTransport.initialData;
    source.progressiveDone = pdfDataRangeTransport.progressiveDone;
  }

  return worker.messageHandler.sendWithPromise("GetDocRequest", {
    docId: docId,
    apiVersion: '2.7.390',
    source: {
      data: source.data,
      url: source.url,
      password: source.password,
      disableAutoFetch: source.disableAutoFetch,
      rangeChunkSize: source.rangeChunkSize,
      length: source.length
    },
    maxImageSize: source.maxImageSize,
    disableFontFace: source.disableFontFace,
    postMessageTransfers: worker.postMessageTransfers,
    docBaseUrl: source.docBaseUrl,
    ignoreErrors: source.ignoreErrors,
    isEvalSupported: source.isEvalSupported,
    fontExtraProperties: source.fontExtraProperties
  }).then(function (workerId) {
    if (worker.destroyed) {
      throw new Error("Worker was destroyed");
    }

    return workerId;
  });
}

var PDFDocumentLoadingTask = function PDFDocumentLoadingTaskClosure() {
  var nextDocumentId = 0;

  var PDFDocumentLoadingTask = /*#__PURE__*/function () {
    function PDFDocumentLoadingTask() {
      _classCallCheck(this, PDFDocumentLoadingTask);

      this._capability = (0, _util_metapdf.createPromiseCapability)();
      this._transport = null;
      this._worker = null;
      this.docId = "d" + nextDocumentId++;
      this.destroyed = false;
      this.onPassword = null;
      this.onProgress = null;
      this.onUnsupportedFeature = null;
    }

    _createClass(PDFDocumentLoadingTask, [{
      key: "destroy",
      value: function destroy() {
        var _this = this;

        this.destroyed = true;
        var transportDestroyed = !this._transport ? Promise.resolve() : this._transport.destroy();
        return transportDestroyed.then(function () {
          _this._transport = null;

          if (_this._worker) {
            _this._worker.destroy();

            _this._worker = null;
          }
        });
      }
    }, {
      key: "promise",
      get: function get() {
        return this._capability.promise;
      }
    }]);

    return PDFDocumentLoadingTask;
  }();

  return PDFDocumentLoadingTask;
}();

var PDFDataRangeTransport = /*#__PURE__*/function () {
  function PDFDataRangeTransport(length, initialData) {
    var progressiveDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, PDFDataRangeTransport);

    this.length = length;
    this.initialData = initialData;
    this.progressiveDone = progressiveDone;
    this._rangeListeners = [];
    this._progressListeners = [];
    this._progressiveReadListeners = [];
    this._progressiveDoneListeners = [];
    this._readyCapability = (0, _util_metapdf.createPromiseCapability)();
  }

  _createClass(PDFDataRangeTransport, [{
    key: "addRangeListener",
    value: function addRangeListener(listener) {
      this._rangeListeners.push(listener);
    }
  }, {
    key: "addProgressListener",
    value: function addProgressListener(listener) {
      this._progressListeners.push(listener);
    }
  }, {
    key: "addProgressiveReadListener",
    value: function addProgressiveReadListener(listener) {
      this._progressiveReadListeners.push(listener);
    }
  }, {
    key: "addProgressiveDoneListener",
    value: function addProgressiveDoneListener(listener) {
      this._progressiveDoneListeners.push(listener);
    }
  }, {
    key: "onDataRange",
    value: function onDataRange(begin, chunk) {
      var _iterator = _createForOfIteratorHelper(this._rangeListeners),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listener = _step.value;
          listener(begin, chunk);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "onDataProgress",
    value: function onDataProgress(loaded, total) {
      var _this2 = this;

      this._readyCapability.promise.then(function () {
        var _iterator2 = _createForOfIteratorHelper(_this2._progressListeners),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var listener = _step2.value;
            listener(loaded, total);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      });
    }
  }, {
    key: "onDataProgressiveRead",
    value: function onDataProgressiveRead(chunk) {
      var _this3 = this;

      this._readyCapability.promise.then(function () {
        var _iterator3 = _createForOfIteratorHelper(_this3._progressiveReadListeners),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var listener = _step3.value;
            listener(chunk);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
    }
  }, {
    key: "onDataProgressiveDone",
    value: function onDataProgressiveDone() {
      var _this4 = this;

      this._readyCapability.promise.then(function () {
        var _iterator4 = _createForOfIteratorHelper(_this4._progressiveDoneListeners),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var listener = _step4.value;
            listener();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      });
    }
  }, {
    key: "transportReady",
    value: function transportReady() {
      this._readyCapability.resolve();
    }
  }, {
    key: "requestDataRange",
    value: function requestDataRange(begin, end) {
      (0, _util_metapdf.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
    }
  }, {
    key: "abort",
    value: function abort() {}
  }]);

  return PDFDataRangeTransport;
}();

exports.PDFDataRangeTransport = PDFDataRangeTransport;

var PDFDocumentProxy = /*#__PURE__*/function () {
  function PDFDocumentProxy(pdfInfo, transport) {
    _classCallCheck(this, PDFDocumentProxy);

    this._pdfInfo = pdfInfo;
    this._transport = transport;
  }

  _createClass(PDFDocumentProxy, [{
    key: "getPage",
    value: function getPage(pageNumber) {
      return this._transport.getPage(pageNumber);
    }
  }, {
    key: "getPageIndex",
    value: function getPageIndex(ref) {
      return this._transport.getPageIndex(ref);
    }
  }, {
    key: "getDestinations",
    value: function getDestinations() {
      return this._transport.getDestinations();
    }
  }, {
    key: "getDestination",
    value: function getDestination(id) {
      return this._transport.getDestination(id);
    }
  }, {
    key: "getPageLabels",
    value: function getPageLabels() {
      return this._transport.getPageLabels();
    }
  }, {
    key: "getPageLayout",
    value: function getPageLayout() {
      return this._transport.getPageLayout();
    }
  }, {
    key: "getPageMode",
    value: function getPageMode() {
      return this._transport.getPageMode();
    }
  }, {
    key: "getViewerPreferences",
    value: function getViewerPreferences() {
      return this._transport.getViewerPreferences();
    }
  }, {
    key: "getOpenAction",
    value: function getOpenAction() {
      return this._transport.getOpenAction();
    }
  }, {
    key: "getAttachments",
    value: function getAttachments() {
      return this._transport.getAttachments();
    }
  }, {
    key: "getJavaScript",
    value: function getJavaScript() {
      return this._transport.getJavaScript();
    }
  }, {
    key: "getOutline",
    value: function getOutline() {
      return this._transport.getOutline();
    }
  }, {
    key: "getOptionalContentConfig",
    value: function getOptionalContentConfig() {
      return this._transport.getOptionalContentConfig();
    }
  }, {
    key: "getPermissions",
    value: function getPermissions() {
      return this._transport.getPermissions();
    }
  }, {
    key: "getMetadata",
    value: function getMetadata() {
      return this._transport.getMetadata();
    }
  }, {
    key: "getMarkInfo",
    value: function getMarkInfo() {
      return this._transport.getMarkInfo();
    }
  }, {
    key: "getData",
    value: function getData() {
      return this._transport.getData();
    }
  }, {
    key: "getXrefMETAPDF",
    value: function getXrefMETAPDF(data) {
      return this._transport.getXrefMETAPDF(data);
    }
  }, {
    key: "getDownloadInfo",
    value: function getDownloadInfo() {
      return this._transport.downloadInfoCapability.promise;
    }
  }, {
    key: "getStats",
    value: function getStats() {
      return this._transport.getStats();
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      return this._transport.startCleanup();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      return this.loadingTask.destroy();
    }
  }, {
    key: "saveDocument",
    value: function saveDocument(annotationStorage) {
      return this._transport.saveDocument(annotationStorage);
    }
  }, {
    key: "getFieldObjects",
    value: function getFieldObjects() {
      return this._transport.getFieldObjects();
    }
  }, {
    key: "hasJSActions",
    value: function hasJSActions() {
      return this._transport.hasJSActions();
    }
  }, {
    key: "getCalculationOrderIds",
    value: function getCalculationOrderIds() {
      return this._transport.getCalculationOrderIds();
    }
  }, {
    key: "annotationStorage",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "annotationStorage", new _annotation_storage.AnnotationStorage());
    }
  }, {
    key: "numPages",
    get: function get() {
      return this._pdfInfo.numPages;
    }
  }, {
    key: "fingerprint",
    get: function get() {
      return this._pdfInfo.fingerprint;
    }
  }, {
    key: "loadingParams",
    get: function get() {
      return this._transport.loadingParams;
    }
  }, {
    key: "loadingTask",
    get: function get() {
      return this._transport.loadingTask;
    }
  }]);

  return PDFDocumentProxy;
}();

exports.PDFDocumentProxy = PDFDocumentProxy;

var PDFPageProxy = /*#__PURE__*/function () {
  function PDFPageProxy(pageIndex, pageInfo, transport, ownerDocument) {
    var pdfBug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, PDFPageProxy);

    this.pageIndex = pageIndex;
    this._pageIndex = pageIndex;
    this._pageInfo = pageInfo;
    this._ownerDocument = ownerDocument;
    this._transport = transport;
    this._stats = pdfBug ? new _display_utils.StatTimer() : null;
    this._pdfBug = pdfBug;
    this.commonObjs = transport.commonObjs;
    this.objs = new PDFObjects();
    this.cleanupAfterRender = false;
    this.pendingCleanup = false;
    this._intentStates = new Map();
    this.destroyed = false;
  }

  _createClass(PDFPageProxy, [{
    key: "getViewport",
    value: function getViewport() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          scale = _ref3.scale,
          _ref3$rotation = _ref3.rotation,
          rotation = _ref3$rotation === void 0 ? this.rotate : _ref3$rotation,
          _ref3$offsetX = _ref3.offsetX,
          offsetX = _ref3$offsetX === void 0 ? 0 : _ref3$offsetX,
          _ref3$offsetY = _ref3.offsetY,
          offsetY = _ref3$offsetY === void 0 ? 0 : _ref3$offsetY,
          _ref3$dontFlip = _ref3.dontFlip,
          dontFlip = _ref3$dontFlip === void 0 ? false : _ref3$dontFlip;

      return new _display_utils.PageViewport({
        viewBox: this.view,
        scale: scale,
        rotation: rotation,
        offsetX: offsetX,
        offsetY: offsetY,
        dontFlip: dontFlip
      });
    }
  }, {
    key: "getAnnotations",
    value: function getAnnotations() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$intent = _ref4.intent,
          intent = _ref4$intent === void 0 ? null : _ref4$intent;

      if (!this.annotationsPromise || this.annotationsIntent !== intent) {
        this.annotationsPromise = this._transport.getAnnotations(this._pageIndex, intent);
        this.annotationsIntent = intent;
      }

      return this.annotationsPromise;
    }
  }, {
    key: "render",
    value: function render(_ref5) {
      var _this5 = this;

      var canvasContext = _ref5.canvasContext,
          viewport = _ref5.viewport,
          _ref5$intent = _ref5.intent,
          intent = _ref5$intent === void 0 ? "display" : _ref5$intent,
          _ref5$enableWebGL = _ref5.enableWebGL,
          enableWebGL = _ref5$enableWebGL === void 0 ? false : _ref5$enableWebGL,
          _ref5$renderInteracti = _ref5.renderInteractiveForms,
          renderInteractiveForms = _ref5$renderInteracti === void 0 ? false : _ref5$renderInteracti,
          _ref5$transform = _ref5.transform,
          transform = _ref5$transform === void 0 ? null : _ref5$transform,
          _ref5$imageLayer = _ref5.imageLayer,
          imageLayer = _ref5$imageLayer === void 0 ? null : _ref5$imageLayer,
          _ref5$pageNumber = _ref5.pageNumber,
          pageNumber = _ref5$pageNumber === void 0 ? 1 : _ref5$pageNumber,
          _ref5$canvasFactory = _ref5.canvasFactory,
          canvasFactory = _ref5$canvasFactory === void 0 ? null : _ref5$canvasFactory,
          _ref5$background = _ref5.background,
          background = _ref5$background === void 0 ? null : _ref5$background,
          _ref5$annotationStora = _ref5.annotationStorage,
          annotationStorage = _ref5$annotationStora === void 0 ? null : _ref5$annotationStora,
          _ref5$optionalContent = _ref5.optionalContentConfigPromise,
          optionalContentConfigPromise = _ref5$optionalContent === void 0 ? null : _ref5$optionalContent;

      if (this._stats) {
        this._stats.time("Overall");
      }

      var renderingIntent = intent === "print" ? "print" : "display";
      this.pendingCleanup = false;

      if (!optionalContentConfigPromise) {
        optionalContentConfigPromise = this._transport.getOptionalContentConfig();
      }

      var intentState = this._intentStates.get(renderingIntent);

      if (!intentState) {
        intentState = Object.create(null);

        this._intentStates.set(renderingIntent, intentState);
      }

      if (intentState.streamReaderCancelTimeout) {
        clearTimeout(intentState.streamReaderCancelTimeout);
        intentState.streamReaderCancelTimeout = null;
      }

      var canvasFactoryInstance = canvasFactory || new DefaultCanvasFactory({
        ownerDocument: this._ownerDocument
      });
      var webGLContext = new _webgl.WebGLContext({
        enable: enableWebGL
      });

      if (!intentState.displayReadyCapability) {
        intentState.displayReadyCapability = (0, _util_metapdf.createPromiseCapability)();
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };

        if (this._stats) {
          this._stats.time("Page Request");
        }

        this._pumpOperatorList({
          pageIndex: this._pageIndex,
          intent: renderingIntent,
          renderInteractiveForms: renderInteractiveForms === true,
          annotationStorage: (annotationStorage === null || annotationStorage === void 0 ? void 0 : annotationStorage.getAll()) || null
        });
      }

      var complete = function complete(error) {
        var i = intentState.renderTasks.indexOf(internalRenderTask);

        if (i >= 0) {
          intentState.renderTasks.splice(i, 1);
        }

        if (_this5.cleanupAfterRender || renderingIntent === "print") {
          _this5.pendingCleanup = true;
        }

        _this5._tryCleanup();

        if (renderingIntent === 'print' && MP.localSession.get('printAnnotations')) {
          var vp = MP.utils.clone(viewport);

          if (vp.rotation === 0) {
            vp.scale = transform[0];
            vp.transform = [transform[0], 0, 0, transform[3], -vp.viewBox[0] * (vp.scale / 2), vp.viewBox[1] * (vp.scale / 2)];
          } else if (viewport.rotation === 90) {
            vp.scale = transform[0];
            vp.transform = [0, transform[0], -transform[3], 0, vp.viewBox[3] * (vp.scale / 2), 0];
          } else if (viewport.rotation === 180) {
            vp.scale = transform[0];
            vp.transform = [-transform[0], 0, 0, -transform[3], vp.viewBox[2] * (vp.scale / 2), vp.viewBox[3] * (vp.scale / 2)];
          } else if (viewport.rotation === 270) {
            vp.scale = transform[0];
            vp.transform = [0, -transform[0], transform[3], 0, 0, vp.viewBox[2] * (vp.scale / 2)];
          }

          canvasContext._drawScale = transform[0];
          canvasContext._scaleX = 1;
          canvasContext._scaleY = 1;
          MP.utils.drawAnnotationsOnCanvas(canvasContext, pageNumber, vp, 'print');
        }

        if (error) {
          internalRenderTask.capability.reject(error);

          _this5._abortOperatorList({
            intentState: intentState,
            reason: error
          });
        } else {
          internalRenderTask.capability.resolve();
        }

        if (_this5._stats) {
          _this5._stats.timeEnd("Rendering");

          _this5._stats.timeEnd("Overall");
        }
      };

      var internalRenderTask = new InternalRenderTask({
        callback: complete,
        params: {
          canvasContext: canvasContext,
          viewport: viewport,
          transform: transform,
          imageLayer: imageLayer,
          background: background
        },
        objs: this.objs,
        commonObjs: this.commonObjs,
        operatorList: intentState.operatorList,
        pageIndex: this._pageIndex,
        canvasFactory: canvasFactoryInstance,
        webGLContext: webGLContext,
        useRequestAnimationFrame: renderingIntent !== "print",
        pdfBug: this._pdfBug
      });

      if (!intentState.renderTasks) {
        intentState.renderTasks = [];
      }

      intentState.renderTasks.push(internalRenderTask);
      var renderTask = internalRenderTask.task;
      Promise.all([intentState.displayReadyCapability.promise, optionalContentConfigPromise]).then(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            transparency = _ref7[0],
            optionalContentConfig = _ref7[1];

        if (_this5.pendingCleanup) {
          complete();
          return;
        }

        if (_this5._stats) {
          _this5._stats.time("Rendering");
        }

        internalRenderTask.initializeGraphics({
          transparency: transparency,
          optionalContentConfig: optionalContentConfig
        });
        internalRenderTask.operatorListChanged();
      })["catch"](complete);
      return renderTask;
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList() {
      function operatorListChanged() {
        if (intentState.operatorList.lastChunk) {
          intentState.opListReadCapability.resolve(intentState.operatorList);
          var i = intentState.renderTasks.indexOf(opListTask);

          if (i >= 0) {
            intentState.renderTasks.splice(i, 1);
          }
        }
      }

      var renderingIntent = "oplist";

      var intentState = this._intentStates.get(renderingIntent);

      if (!intentState) {
        intentState = Object.create(null);

        this._intentStates.set(renderingIntent, intentState);
      }

      var opListTask;

      if (!intentState.opListReadCapability) {
        opListTask = Object.create(null);
        opListTask.operatorListChanged = operatorListChanged;
        intentState.opListReadCapability = (0, _util_metapdf.createPromiseCapability)();
        intentState.renderTasks = [];
        intentState.renderTasks.push(opListTask);
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };

        if (this._stats) {
          this._stats.time("Page Request");
        }

        this._pumpOperatorList({
          pageIndex: this._pageIndex,
          intent: renderingIntent
        });
      }

      return intentState.opListReadCapability.promise;
    }
  }, {
    key: "streamTextContent",
    value: function streamTextContent() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref8$normalizeWhites = _ref8.normalizeWhitespace,
          normalizeWhitespace = _ref8$normalizeWhites === void 0 ? false : _ref8$normalizeWhites,
          _ref8$disableCombineT = _ref8.disableCombineTextItems,
          disableCombineTextItems = _ref8$disableCombineT === void 0 ? false : _ref8$disableCombineT;

      var TEXT_CONTENT_CHUNK_SIZE = 100;
      return this._transport.messageHandler.sendWithStream("GetTextContent", {
        pageIndex: this._pageIndex,
        normalizeWhitespace: normalizeWhitespace === true,
        combineTextItems: disableCombineTextItems !== true
      }, {
        highWaterMark: TEXT_CONTENT_CHUNK_SIZE,
        size: function size(textContent) {
          return textContent.items.length;
        }
      });
    }
  }, {
    key: "getTextContent",
    value: function getTextContent() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var readableStream = this.streamTextContent(params);
      return new Promise(function (resolve, reject) {
        function pump() {
          reader.read().then(function (_ref9) {
            var _textContent$items;

            var value = _ref9.value,
                done = _ref9.done;

            if (done) {
              resolve(textContent);
              return;
            }

            Object.assign(textContent.styles, value.styles);

            (_textContent$items = textContent.items).push.apply(_textContent$items, _toConsumableArray(value.items));

            pump();
          }, reject);
        }

        var reader = readableStream.getReader();
        var textContent = {
          items: [],
          styles: Object.create(null)
        };
        pump();
      });
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      this.destroyed = true;
      this._transport.pageCache[this._pageIndex] = null;
      var waitOn = [];

      var _iterator5 = _createForOfIteratorHelper(this._intentStates),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              intent = _step5$value[0],
              intentState = _step5$value[1];

          this._abortOperatorList({
            intentState: intentState,
            reason: new Error("Page was destroyed."),
            force: true
          });

          if (intent === "oplist") {
            continue;
          }

          var _iterator6 = _createForOfIteratorHelper(intentState.renderTasks),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var internalRenderTask = _step6.value;
              waitOn.push(internalRenderTask.completed);
              internalRenderTask.cancel();
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this.objs.clear();
      this.annotationsPromise = null;
      this.pendingCleanup = false;
      return Promise.all(waitOn);
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      var resetStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.pendingCleanup = true;
      return this._tryCleanup(resetStats);
    }
  }, {
    key: "_tryCleanup",
    value: function _tryCleanup() {
      var resetStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.pendingCleanup) {
        return false;
      }

      var _iterator7 = _createForOfIteratorHelper(this._intentStates.values()),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _step7$value = _step7.value,
              renderTasks = _step7$value.renderTasks,
              operatorList = _step7$value.operatorList;

          if (renderTasks.length !== 0 || !operatorList.lastChunk) {
            return false;
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      this._intentStates.clear();

      this.objs.clear();
      this.annotationsPromise = null;

      if (resetStats && this._stats) {
        this._stats = new _display_utils.StatTimer();
      }

      this.pendingCleanup = false;
      return true;
    }
  }, {
    key: "_startRenderPage",
    value: function _startRenderPage(transparency, intent) {
      var intentState = this._intentStates.get(intent);

      if (!intentState) {
        return;
      }

      if (this._stats) {
        this._stats.timeEnd("Page Request");
      }

      if (intentState.displayReadyCapability) {
        intentState.displayReadyCapability.resolve(transparency);
      }
    }
  }, {
    key: "_renderPageChunk",
    value: function _renderPageChunk(operatorListChunk, intentState) {
      for (var i = 0, ii = operatorListChunk.length; i < ii; i++) {
        intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]);
        intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i]);
      }

      intentState.operatorList.lastChunk = operatorListChunk.lastChunk;

      for (var _i2 = 0; _i2 < intentState.renderTasks.length; _i2++) {
        intentState.renderTasks[_i2].operatorListChanged();
      }

      if (operatorListChunk.lastChunk) {
        this._tryCleanup();
      }
    }
  }, {
    key: "_pumpOperatorList",
    value: function _pumpOperatorList(args) {
      var _this6 = this;

      (0, _util_metapdf.assert)(args.intent, 'PDFPageProxy._pumpOperatorList: Expected "intent" argument.');

      var readableStream = this._transport.messageHandler.sendWithStream("GetOperatorList", args);

      var reader = readableStream.getReader();

      var intentState = this._intentStates.get(args.intent);

      intentState.streamReader = reader;

      var pump = function pump() {
        reader.read().then(function (_ref10) {
          var value = _ref10.value,
              done = _ref10.done;

          if (done) {
            intentState.streamReader = null;
            return;
          }

          if (_this6._transport.destroyed) {
            return;
          }

          _this6._renderPageChunk(value, intentState);

          pump();
        }, function (reason) {
          intentState.streamReader = null;

          if (_this6._transport.destroyed) {
            return;
          }

          if (intentState.operatorList) {
            intentState.operatorList.lastChunk = true;

            for (var i = 0; i < intentState.renderTasks.length; i++) {
              intentState.renderTasks[i].operatorListChanged();
            }

            _this6._tryCleanup();
          }

          if (intentState.displayReadyCapability) {
            intentState.displayReadyCapability.reject(reason);
          } else if (intentState.opListReadCapability) {
            intentState.opListReadCapability.reject(reason);
          } else {
            throw reason;
          }
        });
      };

      pump();
    }
  }, {
    key: "_abortOperatorList",
    value: function _abortOperatorList(_ref11) {
      var _this7 = this;

      var intentState = _ref11.intentState,
          reason = _ref11.reason,
          _ref11$force = _ref11.force,
          force = _ref11$force === void 0 ? false : _ref11$force;
      (0, _util_metapdf.assert)(reason instanceof Error || _typeof(reason) === "object" && reason !== null, 'PDFPageProxy._abortOperatorList: Expected "reason" argument.');

      if (!intentState.streamReader) {
        return;
      }

      if (!force) {
        if (intentState.renderTasks.length !== 0) {
          return;
        }

        if (reason instanceof _display_utils.RenderingCancelledException) {
          intentState.streamReaderCancelTimeout = setTimeout(function () {
            _this7._abortOperatorList({
              intentState: intentState,
              reason: reason,
              force: true
            });

            intentState.streamReaderCancelTimeout = null;
          }, RENDERING_CANCELLED_TIMEOUT);
          return;
        }
      }

      intentState.streamReader.cancel(new _util_metapdf.AbortException(reason === null || reason === void 0 ? void 0 : reason.message));
      intentState.streamReader = null;

      if (this._transport.destroyed) {
        return;
      }

      var _iterator8 = _createForOfIteratorHelper(this._intentStates),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _step8$value = _slicedToArray(_step8.value, 2),
              intent = _step8$value[0],
              curIntentState = _step8$value[1];

          if (curIntentState === intentState) {
            this._intentStates["delete"](intent);

            break;
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      this.cleanup();
    }
  }, {
    key: "pageNumber",
    get: function get() {
      return this._pageIndex + 1;
    }
  }, {
    key: "rotate",
    get: function get() {
      return this._pageInfo.rotate;
    }
  }, {
    key: "ref",
    get: function get() {
      return this._pageInfo.ref;
    }
  }, {
    key: "userUnit",
    get: function get() {
      return this._pageInfo.userUnit;
    }
  }, {
    key: "view",
    get: function get() {
      return this._pageInfo.view;
    }
  }, {
    key: "stats",
    get: function get() {
      return this._stats;
    }
  }]);

  return PDFPageProxy;
}();

exports.PDFPageProxy = PDFPageProxy;

var LoopbackPort = /*#__PURE__*/function () {
  function LoopbackPort() {
    var defer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _classCallCheck(this, LoopbackPort);

    this._listeners = [];
    this._defer = defer;
    this._deferred = Promise.resolve(undefined);
  }

  _createClass(LoopbackPort, [{
    key: "postMessage",
    value: function postMessage(obj, transfers) {
      var _this8 = this;

      function cloneValue(value) {
        if (_typeof(value) !== "object" || value === null) {
          return value;
        }

        if (cloned.has(value)) {
          return cloned.get(value);
        }

        var buffer, result;

        if ((buffer = value.buffer) && (0, _util_metapdf.isArrayBuffer)(buffer)) {
          if (transfers === null || transfers === void 0 ? void 0 : transfers.includes(buffer)) {
            result = new value.constructor(buffer, value.byteOffset, value.byteLength);
          } else {
            result = new value.constructor(value);
          }

          cloned.set(value, result);
          return result;
        }

        result = Array.isArray(value) ? [] : {};
        cloned.set(value, result);

        for (var i in value) {
          var desc = void 0,
              p = value;

          while (!(desc = Object.getOwnPropertyDescriptor(p, i))) {
            p = Object.getPrototypeOf(p);
          }

          if (typeof desc.value === "undefined") {
            continue;
          }

          if (typeof desc.value === "function") {
            if (value.hasOwnProperty && value.hasOwnProperty(i)) {
              throw new Error("LoopbackPort.postMessage - cannot clone: ".concat(value[i]));
            }

            continue;
          }

          result[i] = cloneValue(desc.value);
        }

        return result;
      }

      if (!this._defer) {
        this._listeners.forEach(function (listener) {
          listener.call(_this8, {
            data: obj
          });
        });

        return;
      }

      var cloned = new WeakMap();
      var e = {
        data: cloneValue(obj)
      };

      this._deferred.then(function () {
        _this8._listeners.forEach(function (listener) {
          listener.call(_this8, e);
        });
      });
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(name, listener) {
      this._listeners.push(listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(name, listener) {
      var i = this._listeners.indexOf(listener);

      this._listeners.splice(i, 1);
    }
  }, {
    key: "terminate",
    value: function terminate() {
      this._listeners.length = 0;
    }
  }]);

  return LoopbackPort;
}();

exports.LoopbackPort = LoopbackPort;

var PDFWorker = function PDFWorkerClosure() {
  var pdfWorkerPorts = new WeakMap();
  var isWorkerDisabled = false;
  var fallbackWorkerSrc;
  var nextFakeWorkerId = 0;
  var fakeWorkerCapability;

  if (_is_node.isNodeJS && typeof require === "function") {
    isWorkerDisabled = true;
    fallbackWorkerSrc = "../pdf.worker.js";
  } else if ((typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" && "currentScript" in document) {
    var _document$currentScri;

    var pdfjsFilePath = (_document$currentScri = document.currentScript) === null || _document$currentScri === void 0 ? void 0 : _document$currentScri.src;

    if (pdfjsFilePath) {
      fallbackWorkerSrc = pdfjsFilePath.replace(/(\.(?:min\.)?js)(\?.*)?$/i, ".worker$1$2");
    }
  }

  function _getWorkerSrc() {
    if (pdfjsLib && pdfjsLib.workerSrc) {
      return pdfjsLib.workerSrc;
    }

    if (_worker_options.GlobalWorkerOptions.workerSrc) {
      return _worker_options.GlobalWorkerOptions.workerSrc;
    }

    if (typeof fallbackWorkerSrc !== "undefined") {
      if (!_is_node.isNodeJS) {
        (0, _display_utils.deprecated)('No "GlobalWorkerOptions.workerSrc" specified.');
      }

      return fallbackWorkerSrc;
    }

    if (!global || !global.MP || !global.MP.isSingleFile) {
      throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
    }
  }

  function getMainThreadWorkerMessageHandler() {
    var mainWorkerMessageHandler;

    try {
      var _globalThis$pdfjsWork;

      mainWorkerMessageHandler = (_globalThis$pdfjsWork = globalThis.pdfjsWorker) === null || _globalThis$pdfjsWork === void 0 ? void 0 : _globalThis$pdfjsWork.WorkerMessageHandler;
    } catch (ex) {}

    return mainWorkerMessageHandler || null;
  }

  function setupFakeWorkerGlobal() {
    if (fakeWorkerCapability) {
      return fakeWorkerCapability.promise;
    }

    fakeWorkerCapability = (0, _util_metapdf.createPromiseCapability)();

    var loader = /*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var mainWorkerMessageHandler, worker;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mainWorkerMessageHandler = getMainThreadWorkerMessageHandler();

                if (!mainWorkerMessageHandler) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", mainWorkerMessageHandler);

              case 3:
                if (!(_is_node.isNodeJS && typeof require === "function")) {
                  _context.next = 6;
                  break;
                }

                worker = eval("require")(_getWorkerSrc());
                return _context.abrupt("return", worker.WorkerMessageHandler);

              case 6:
                _context.next = 8;
                return (0, _display_utils.loadScript)(_getWorkerSrc());

              case 8:
                return _context.abrupt("return", window.pdfjsWorker.WorkerMessageHandler);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function loader() {
        return _ref12.apply(this, arguments);
      };
    }();

    loader().then(fakeWorkerCapability.resolve, fakeWorkerCapability.reject);
    return fakeWorkerCapability.promise;
  }

  function createCDNWrapper(url) {
    var wrapper = "importScripts('" + url + "');";
    return URL.createObjectURL(new Blob([wrapper]));
  }

  var PDFWorker = /*#__PURE__*/function () {
    function PDFWorker() {
      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref13$name = _ref13.name,
          name = _ref13$name === void 0 ? null : _ref13$name,
          _ref13$port = _ref13.port,
          port = _ref13$port === void 0 ? null : _ref13$port,
          _ref13$verbosity = _ref13.verbosity,
          verbosity = _ref13$verbosity === void 0 ? (0, _util_metapdf.getVerbosityLevel)() : _ref13$verbosity;

      _classCallCheck(this, PDFWorker);

      if (port && pdfWorkerPorts.has(port)) {
        throw new Error("Cannot use more than one PDFWorker per port");
      }

      this.name = name;
      this.destroyed = false;
      this.postMessageTransfers = true;
      this.verbosity = verbosity;
      this._readyCapability = (0, _util_metapdf.createPromiseCapability)();
      this._port = null;
      this._webWorker = null;
      this._messageHandler = null;

      if (port) {
        pdfWorkerPorts.set(port, this);

        this._initializeFromPort(port);

        return;
      }

      this._initialize();
    }

    _createClass(PDFWorker, [{
      key: "_initializeFromPort",
      value: function _initializeFromPort(port) {
        this._port = port;
        this._messageHandler = new _message_handler.MessageHandler("main", "worker", port);

        this._messageHandler.on("ready", function () {});

        this._readyCapability.resolve();
      }
    }, {
      key: "_initialize",
      value: function _initialize() {
        var _this9 = this;

        if (typeof Worker !== "undefined" && !isWorkerDisabled && !getMainThreadWorkerMessageHandler()) {
          var workerSrc = _getWorkerSrc();

          try {
            if (!(0, _util_metapdf.isSameOrigin)(window.location.href, workerSrc)) {
              workerSrc = createCDNWrapper(new URL(workerSrc, window.location).href);
            }

            var worker = new Worker(workerSrc);
            var messageHandler = new _message_handler.MessageHandler("main", "worker", worker);

            var terminateEarly = function terminateEarly() {
              worker.removeEventListener("error", onWorkerError);
              messageHandler.destroy();
              worker.terminate();

              if (_this9.destroyed) {
                _this9._readyCapability.reject(new Error("Worker was destroyed"));
              } else {
                _this9._setupFakeWorker();
              }
            };

            var onWorkerError = function onWorkerError() {
              if (!_this9._webWorker) {
                terminateEarly();
              }
            };

            worker.addEventListener("error", onWorkerError);
            messageHandler.on("test", function (data) {
              worker.removeEventListener("error", onWorkerError);

              if (_this9.destroyed) {
                terminateEarly();
                return;
              }

              if (data) {
                _this9._messageHandler = messageHandler;
                _this9._port = worker;
                _this9._webWorker = worker;

                if (!data.supportTransfers) {
                  _this9.postMessageTransfers = false;
                }

                _this9._readyCapability.resolve();

                messageHandler.send("configure", {
                  verbosity: _this9.verbosity
                });
              } else {
                _this9._setupFakeWorker();

                messageHandler.destroy();
                worker.terminate();
              }
            });
            messageHandler.on("ready", function (data) {
              worker.removeEventListener("error", onWorkerError);

              if (_this9.destroyed) {
                terminateEarly();
                return;
              }

              try {
                sendTest();
              } catch (e) {
                _this9._setupFakeWorker();
              }

              var decimals = MP.options.decimals || 3;
              messageHandler.send('setAnnoDecimals', {
                decimals: decimals
              });
            });

            var sendTest = function sendTest() {
              var testObj = new Uint8Array([_this9.postMessageTransfers ? 255 : 0]);

              try {
                messageHandler.send("test", testObj, [testObj.buffer]);
              } catch (ex) {
                (0, _util_metapdf.warn)("Cannot use postMessage transfers.");
                testObj[0] = 0;
                messageHandler.send("test", testObj);
              }
            };

            sendTest();
            return;
          } catch (e) {
            (0, _util_metapdf.info)("The worker has been disabled.");
          }
        }

        this._setupFakeWorker();
      }
    }, {
      key: "_setupFakeWorker",
      value: function _setupFakeWorker() {
        var _this10 = this;

        if (!isWorkerDisabled) {
          (0, _util_metapdf.warn)("Setting up fake worker.");
          isWorkerDisabled = true;
        }

        setupFakeWorkerGlobal().then(function (WorkerMessageHandler) {
          if (_this10.destroyed) {
            _this10._readyCapability.reject(new Error("Worker was destroyed"));

            return;
          }

          var port = new LoopbackPort();
          _this10._port = port;
          var id = "fake" + nextFakeWorkerId++;
          var workerHandler = new _message_handler.MessageHandler(id + "_worker", id, port);
          WorkerMessageHandler.setup(workerHandler, port);
          var messageHandler = new _message_handler.MessageHandler(id, id + "_worker", port);
          _this10._messageHandler = messageHandler;

          _this10._readyCapability.resolve();

          messageHandler.send("configure", {
            verbosity: _this10.verbosity
          });
        })["catch"](function (reason) {
          _this10._readyCapability.reject(new Error("Setting up fake worker failed: \"".concat(reason.message, "\".")));
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.destroyed = true;

        if (this._webWorker) {
          this._webWorker.terminate();

          this._webWorker = null;
        }

        pdfWorkerPorts["delete"](this._port);
        this._port = null;

        if (this._messageHandler) {
          this._messageHandler.destroy();

          this._messageHandler = null;
        }
      }
    }, {
      key: "promise",
      get: function get() {
        return this._readyCapability.promise;
      }
    }, {
      key: "port",
      get: function get() {
        return this._port;
      }
    }, {
      key: "messageHandler",
      get: function get() {
        return this._messageHandler;
      }
    }], [{
      key: "fromPort",
      value: function fromPort(params) {
        if (!params || !params.port) {
          throw new Error("PDFWorker.fromPort - invalid method signature.");
        }

        if (pdfWorkerPorts.has(params.port)) {
          return pdfWorkerPorts.get(params.port);
        }

        return new PDFWorker(params);
      }
    }, {
      key: "getWorkerSrc",
      value: function getWorkerSrc() {
        return _getWorkerSrc();
      }
    }]);

    return PDFWorker;
  }();

  return PDFWorker;
}();

exports.PDFWorker = PDFWorker;

var WorkerTransport = /*#__PURE__*/function () {
  function WorkerTransport(messageHandler, loadingTask, networkStream, params) {
    _classCallCheck(this, WorkerTransport);

    this.messageHandler = messageHandler;
    this.loadingTask = loadingTask;
    this.commonObjs = new PDFObjects();
    this.fontLoader = new _font_loader.FontLoader({
      docId: loadingTask.docId,
      onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
      ownerDocument: params.ownerDocument
    });
    this._params = params;
    this.CMapReaderFactory = new params.CMapReaderFactory({
      baseUrl: params.cMapUrl,
      isCompressed: params.cMapPacked
    });
    this.destroyed = false;
    this.destroyCapability = null;
    this._passwordCapability = null;
    this._networkStream = networkStream;
    this._fullReader = null;
    this._lastProgress = null;
    this.pageCache = [];
    this.pagePromises = [];
    this.downloadInfoCapability = (0, _util_metapdf.createPromiseCapability)();
    this.setupMessageHandler();
  }

  _createClass(WorkerTransport, [{
    key: "destroy",
    value: function destroy() {
      var _this11 = this;

      if (this.destroyCapability) {
        return this.destroyCapability.promise;
      }

      this.destroyed = true;
      this.destroyCapability = (0, _util_metapdf.createPromiseCapability)();

      if (this._passwordCapability) {
        this._passwordCapability.reject(new Error("Worker was destroyed during onPassword callback"));
      }

      var waitOn = [];
      this.pageCache.forEach(function (page) {
        if (page) {
          waitOn.push(page._destroy());
        }
      });
      this.pageCache.length = 0;
      this.pagePromises.length = 0;
      var terminated = this.messageHandler.sendWithPromise("Terminate", null);
      waitOn.push(terminated);
      Promise.all(waitOn).then(function () {
        _this11.fontLoader.clear();

        if (_this11._networkStream) {
          _this11._networkStream.cancelAllRequests(new _util_metapdf.AbortException("Worker was terminated."));
        }

        if (_this11.messageHandler) {
          _this11.messageHandler.destroy();

          _this11.messageHandler = null;
        }

        _this11.destroyCapability.resolve();
      }, this.destroyCapability.reject);
      return this.destroyCapability.promise;
    }
  }, {
    key: "setupMessageHandler",
    value: function setupMessageHandler() {
      var _this12 = this;

      var messageHandler = this.messageHandler,
          loadingTask = this.loadingTask;
      messageHandler.on("GetReader", function (data, sink) {
        (0, _util_metapdf.assert)(_this12._networkStream, "GetReader - no `IPDFStream` instance available.");
        _this12._fullReader = _this12._networkStream.getFullReader();

        _this12._fullReader.onProgress = function (evt) {
          _this12._lastProgress = {
            loaded: evt.loaded,
            total: evt.total
          };
        };

        sink.onPull = function () {
          _this12._fullReader.read().then(function (_ref14) {
            var value = _ref14.value,
                done = _ref14.done;

            if (done) {
              sink.close();
              return;
            }

            (0, _util_metapdf.assert)((0, _util_metapdf.isArrayBuffer)(value), "GetReader - expected an ArrayBuffer.");
            sink.enqueue(new Uint8Array(value), 1, [value]);
          })["catch"](function (reason) {
            sink.error(reason);
          });
        };

        sink.onCancel = function (reason) {
          _this12._fullReader.cancel(reason);

          sink.ready["catch"](function (readyReason) {
            if (_this12.destroyed) {
              return;
            }

            throw readyReason;
          });
        };
      });
      messageHandler.on("ReaderHeadersReady", function (data) {
        var headersCapability = (0, _util_metapdf.createPromiseCapability)();
        var fullReader = _this12._fullReader;
        fullReader.headersReady.then(function () {
          if (!fullReader.isStreamingSupported || !fullReader.isRangeSupported) {
            if (_this12._lastProgress && loadingTask.onProgress) {
              loadingTask.onProgress(_this12._lastProgress);
            }

            fullReader.onProgress = function (evt) {
              if (loadingTask.onProgress) {
                loadingTask.onProgress({
                  loaded: evt.loaded,
                  total: evt.total
                });
              }
            };
          }

          headersCapability.resolve({
            isStreamingSupported: fullReader.isStreamingSupported,
            isRangeSupported: fullReader.isRangeSupported,
            contentLength: fullReader.contentLength
          });
        }, headersCapability.reject);
        return headersCapability.promise;
      });
      messageHandler.on("GetRangeReader", function (data, sink) {
        (0, _util_metapdf.assert)(_this12._networkStream, "GetRangeReader - no `IPDFStream` instance available.");

        var rangeReader = _this12._networkStream.getRangeReader(data.begin, data.end);

        if (!rangeReader) {
          sink.close();
          return;
        }

        sink.onPull = function () {
          rangeReader.read().then(function (_ref15) {
            var value = _ref15.value,
                done = _ref15.done;

            if (done) {
              sink.close();
              return;
            }

            (0, _util_metapdf.assert)((0, _util_metapdf.isArrayBuffer)(value), "GetRangeReader - expected an ArrayBuffer.");
            sink.enqueue(new Uint8Array(value), 1, [value]);
          })["catch"](function (reason) {
            sink.error(reason);
          });
        };

        sink.onCancel = function (reason) {
          rangeReader.cancel(reason);
          sink.ready["catch"](function (readyReason) {
            if (_this12.destroyed) {
              return;
            }

            throw readyReason;
          });
        };
      });
      messageHandler.on("GetDoc", function (_ref16) {
        var pdfInfo = _ref16.pdfInfo;
        _this12._numPages = pdfInfo.numPages;

        loadingTask._capability.resolve(new PDFDocumentProxy(pdfInfo, _this12));
      });
      messageHandler.on("DocException", function (ex) {
        var reason;

        switch (ex.name) {
          case "PasswordException":
            reason = new _util_metapdf.PasswordException(ex.message, ex.code);
            break;

          case "InvalidPDFException":
            reason = new _util_metapdf.InvalidPDFException(ex.message);
            break;

          case "MissingPDFException":
            reason = new _util_metapdf.MissingPDFException(ex.message);
            break;

          case "UnexpectedResponseException":
            reason = new _util_metapdf.UnexpectedResponseException(ex.message, ex.status);
            break;

          case "UnknownErrorException":
            reason = new _util_metapdf.UnknownErrorException(ex.message, ex.details);
            break;
        }

        if (!(reason instanceof Error)) {
          var msg = "DocException - expected a valid Error.";
          (0, _util_metapdf.warn)(msg);
        }

        loadingTask._capability.reject(reason);
      });
      messageHandler.on("PasswordRequest", function (exception) {
        _this12._passwordCapability = (0, _util_metapdf.createPromiseCapability)();

        if (loadingTask.onPassword) {
          var updatePassword = function updatePassword(password) {
            _this12._passwordCapability.resolve({
              password: password
            });
          };

          try {
            loadingTask.onPassword(updatePassword, exception.code);
          } catch (ex) {
            _this12._passwordCapability.reject(ex);
          }
        } else {
          _this12._passwordCapability.reject(new _util_metapdf.PasswordException(exception.message, exception.code));
        }

        return _this12._passwordCapability.promise;
      });
      messageHandler.on("DataLoaded", function (data) {
        if (loadingTask.onProgress) {
          loadingTask.onProgress({
            loaded: data.length,
            total: data.length
          });
        }

        _this12.downloadInfoCapability.resolve(data);
      });
      messageHandler.on("StartRenderPage", function (data) {
        if (_this12.destroyed) {
          return;
        }

        var page = _this12.pageCache[data.pageIndex];

        page._startRenderPage(data.transparency, data.intent);
      });
      messageHandler.on("commonobj", function (data) {
        var _globalThis$FontInspe;

        if (_this12.destroyed) {
          return;
        }

        var _data = _slicedToArray(data, 3),
            id = _data[0],
            type = _data[1],
            exportedData = _data[2];

        if (_this12.commonObjs.has(id)) {
          return;
        }

        switch (type) {
          case "Font":
            var params = _this12._params;

            if ("error" in exportedData) {
              var exportedError = exportedData.error;
              (0, _util_metapdf.warn)("Error during font loading: ".concat(exportedError));

              _this12.commonObjs.resolve(id, exportedError);

              break;
            }

            var fontRegistry = null;

            if (params.pdfBug && ((_globalThis$FontInspe = globalThis.FontInspector) === null || _globalThis$FontInspe === void 0 ? void 0 : _globalThis$FontInspe.enabled)) {
              fontRegistry = {
                registerFont: function registerFont(font, url) {
                  globalThis.FontInspector.fontAdded(font, url);
                }
              };
            }

            var font = new _font_loader.FontFaceObject(exportedData, {
              isEvalSupported: params.isEvalSupported,
              disableFontFace: params.disableFontFace,
              ignoreErrors: params.ignoreErrors,
              onUnsupportedFeature: _this12._onUnsupportedFeature.bind(_this12),
              fontRegistry: fontRegistry
            });

            _this12.fontLoader.bind(font)["catch"](function (reason) {
              return messageHandler.sendWithPromise("FontFallback", {
                id: id
              });
            })["finally"](function () {
              if (!params.fontExtraProperties && font.data) {
                font.data = null;
              }

              _this12.commonObjs.resolve(id, font);
            });

            break;

          case "FontPath":
          case "Image":
            _this12.commonObjs.resolve(id, exportedData);

            break;

          default:
            throw new Error("Got unknown common object type ".concat(type));
        }
      });
      messageHandler.on("obj", function (data) {
        var _imageData$data;

        if (_this12.destroyed) {
          return undefined;
        }

        var _data2 = _slicedToArray(data, 4),
            id = _data2[0],
            pageIndex = _data2[1],
            type = _data2[2],
            imageData = _data2[3];

        var pageProxy = _this12.pageCache[pageIndex];

        if (pageProxy.objs.has(id)) {
          return undefined;
        }

        switch (type) {
          case "Image":
            pageProxy.objs.resolve(id, imageData);
            var MAX_IMAGE_SIZE_TO_STORE = 8000000;

            if ((imageData === null || imageData === void 0 ? void 0 : (_imageData$data = imageData.data) === null || _imageData$data === void 0 ? void 0 : _imageData$data.length) > MAX_IMAGE_SIZE_TO_STORE) {
              pageProxy.cleanupAfterRender = true;
            }

            break;

          default:
            throw new Error("Got unknown object type ".concat(type));
        }

        return undefined;
      });
      messageHandler.on("DocProgress", function (data) {
        if (_this12.destroyed) {
          return;
        }

        if (loadingTask.onProgress) {
          loadingTask.onProgress({
            loaded: data.loaded,
            total: data.total
          });
        }
      });
      messageHandler.on("UnsupportedFeature", this._onUnsupportedFeature.bind(this));
      messageHandler.on("FetchBuiltInCMap", function (data, sink) {
        if (_this12.destroyed) {
          sink.error(new Error("Worker was destroyed"));
          return;
        }

        var fetched = false;

        sink.onPull = function () {
          if (fetched) {
            sink.close();
            return;
          }

          fetched = true;

          _this12.CMapReaderFactory.fetch(data).then(function (builtInCMap) {
            sink.enqueue(builtInCMap, 1, [builtInCMap.cMapData.buffer]);
          })["catch"](function (reason) {
            sink.error(reason);
          });
        };
      });
    }
  }, {
    key: "_onUnsupportedFeature",
    value: function _onUnsupportedFeature(_ref17) {
      var featureId = _ref17.featureId;

      if (this.destroyed) {
        return;
      }

      if (this.loadingTask.onUnsupportedFeature) {
        this.loadingTask.onUnsupportedFeature(featureId);
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.messageHandler.sendWithPromise("GetData", null);
    }
  }, {
    key: "getXrefMETAPDF",
    value: function getXrefMETAPDF(data) {
      return this.messageHandler.sendWithPromise('GetXrefMETAPDF', data);
    }
  }, {
    key: "getPage",
    value: function getPage(pageNumber) {
      var _this13 = this;

      if (!Number.isInteger(pageNumber) || pageNumber <= 0 || pageNumber > this._numPages) {
        return Promise.reject(new Error("Invalid page request"));
      }

      var pageIndex = pageNumber - 1;

      if (pageIndex in this.pagePromises) {
        return this.pagePromises[pageIndex];
      }

      var promise = this.messageHandler.sendWithPromise("GetPage", {
        pageIndex: pageIndex
      }).then(function (pageInfo) {
        if (_this13.destroyed) {
          throw new Error("Transport destroyed");
        }

        var page = new PDFPageProxy(pageIndex, pageInfo, _this13, _this13._params.ownerDocument, _this13._params.pdfBug);
        _this13.pageCache[pageIndex] = page;
        return page;
      });
      this.pagePromises[pageIndex] = promise;
      return promise;
    }
  }, {
    key: "getPageIndex",
    value: function getPageIndex(ref) {
      return this.messageHandler.sendWithPromise("GetPageIndex", {
        ref: ref
      })["catch"](function (reason) {
        return Promise.reject(new Error(reason));
      });
    }
  }, {
    key: "getAnnotations",
    value: function getAnnotations(pageIndex, intent) {
      return this.messageHandler.sendWithPromise("GetAnnotations", {
        pageIndex: pageIndex,
        intent: intent
      });
    }
  }, {
    key: "saveDocument",
    value: function saveDocument(annotationStorage) {
      return this.messageHandler.sendWithPromise("SaveDocument", {
        numPages: this._numPages,
        annotationStorage: (annotationStorage === null || annotationStorage === void 0 ? void 0 : annotationStorage.getAll()) || null,
        filename: this._fullReader ? this._fullReader.filename : null
      })["finally"](function () {
        if (annotationStorage) {
          annotationStorage.resetModified();
        }
      });
    }
  }, {
    key: "getFieldObjects",
    value: function getFieldObjects() {
      return this.messageHandler.sendWithPromise("GetFieldObjects", null);
    }
  }, {
    key: "hasJSActions",
    value: function hasJSActions() {
      return this.messageHandler.sendWithPromise("HasJSActions", null);
    }
  }, {
    key: "getCalculationOrderIds",
    value: function getCalculationOrderIds() {
      return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
    }
  }, {
    key: "getDestinations",
    value: function getDestinations() {
      return this.messageHandler.sendWithPromise("GetDestinations", null);
    }
  }, {
    key: "getDestination",
    value: function getDestination(id) {
      if (typeof id !== "string") {
        return Promise.reject(new Error("Invalid destination request."));
      }

      return this.messageHandler.sendWithPromise("GetDestination", {
        id: id
      });
    }
  }, {
    key: "getPageLabels",
    value: function getPageLabels() {
      return this.messageHandler.sendWithPromise("GetPageLabels", null);
    }
  }, {
    key: "getPageLayout",
    value: function getPageLayout() {
      return this.messageHandler.sendWithPromise("GetPageLayout", null);
    }
  }, {
    key: "getPageMode",
    value: function getPageMode() {
      return this.messageHandler.sendWithPromise("GetPageMode", null);
    }
  }, {
    key: "getViewerPreferences",
    value: function getViewerPreferences() {
      return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
    }
  }, {
    key: "getOpenAction",
    value: function getOpenAction() {
      return this.messageHandler.sendWithPromise("GetOpenAction", null);
    }
  }, {
    key: "getAttachments",
    value: function getAttachments() {
      return this.messageHandler.sendWithPromise("GetAttachments", null);
    }
  }, {
    key: "getJavaScript",
    value: function getJavaScript() {
      return this.messageHandler.sendWithPromise("GetJavaScript", null);
    }
  }, {
    key: "getOutline",
    value: function getOutline() {
      return this.messageHandler.sendWithPromise("GetOutline", null);
    }
  }, {
    key: "getOptionalContentConfig",
    value: function getOptionalContentConfig() {
      return this.messageHandler.sendWithPromise("GetOptionalContentConfig", null).then(function (results) {
        return new _optional_content_config.OptionalContentConfig(results);
      });
    }
  }, {
    key: "getPermissions",
    value: function getPermissions() {
      return this.messageHandler.sendWithPromise("GetPermissions", null);
    }
  }, {
    key: "getMetadata",
    value: function getMetadata() {
      var _this14 = this;

      return this.messageHandler.sendWithPromise("GetMetadata", null).then(function (results) {
        return {
          info: results[0],
          metadata: results[1] ? results[1] : null,
          contentDispositionFilename: _this14._fullReader ? _this14._fullReader.filename : null
        };
      });
    }
  }, {
    key: "getMarkInfo",
    value: function getMarkInfo() {
      return this.messageHandler.sendWithPromise("GetMarkInfo", null);
    }
  }, {
    key: "getStats",
    value: function getStats() {
      return this.messageHandler.sendWithPromise("GetStats", null);
    }
  }, {
    key: "startCleanup",
    value: function startCleanup() {
      var _this15 = this;

      return this.messageHandler.sendWithPromise("Cleanup", null).then(function () {
        for (var i = 0, ii = _this15.pageCache.length; i < ii; i++) {
          var page = _this15.pageCache[i];

          if (page) {
            var cleanupSuccessful = page.cleanup();

            if (!cleanupSuccessful) {
              throw new Error("startCleanup: Page ".concat(i + 1, " is currently rendering."));
            }
          }
        }

        _this15.commonObjs.clear();

        _this15.fontLoader.clear();
      });
    }
  }, {
    key: "loadingParams",
    get: function get() {
      var params = this._params;
      return (0, _util_metapdf.shadow)(this, "loadingParams", {
        disableAutoFetch: params.disableAutoFetch,
        disableFontFace: params.disableFontFace
      });
    }
  }]);

  return WorkerTransport;
}();

var PDFObjects = /*#__PURE__*/function () {
  function PDFObjects() {
    _classCallCheck(this, PDFObjects);

    this._objs = Object.create(null);
  }

  _createClass(PDFObjects, [{
    key: "_ensureObj",
    value: function _ensureObj(objId) {
      if (this._objs[objId]) {
        return this._objs[objId];
      }

      return this._objs[objId] = {
        capability: (0, _util_metapdf.createPromiseCapability)(),
        data: null,
        resolved: false
      };
    }
  }, {
    key: "get",
    value: function get(objId) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (callback) {
        this._ensureObj(objId).capability.promise.then(callback);

        return null;
      }

      var obj = this._objs[objId];

      if (!obj || !obj.resolved) {
        throw new Error("Requesting object that isn't resolved yet ".concat(objId, "."));
      }

      return obj.data;
    }
  }, {
    key: "has",
    value: function has(objId) {
      var obj = this._objs[objId];
      return obj ? obj.resolved : false;
    }
  }, {
    key: "resolve",
    value: function resolve(objId, data) {
      var obj = this._ensureObj(objId);

      obj.resolved = true;
      obj.data = data;
      obj.capability.resolve(data);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._objs = Object.create(null);
    }
  }]);

  return PDFObjects;
}();

var RenderTask = /*#__PURE__*/function () {
  function RenderTask(internalRenderTask) {
    _classCallCheck(this, RenderTask);

    this._internalRenderTask = internalRenderTask;
    this.onContinue = null;
  }

  _createClass(RenderTask, [{
    key: "cancel",
    value: function cancel() {
      this._internalRenderTask.cancel();
    }
  }, {
    key: "promise",
    get: function get() {
      return this._internalRenderTask.capability.promise;
    }
  }]);

  return RenderTask;
}();

var InternalRenderTask = function InternalRenderTaskClosure() {
  var canvasInRendering = new WeakSet();

  var InternalRenderTask = /*#__PURE__*/function () {
    function InternalRenderTask(_ref18) {
      var callback = _ref18.callback,
          params = _ref18.params,
          objs = _ref18.objs,
          commonObjs = _ref18.commonObjs,
          operatorList = _ref18.operatorList,
          pageIndex = _ref18.pageIndex,
          canvasFactory = _ref18.canvasFactory,
          webGLContext = _ref18.webGLContext,
          _ref18$useRequestAnim = _ref18.useRequestAnimationFrame,
          useRequestAnimationFrame = _ref18$useRequestAnim === void 0 ? false : _ref18$useRequestAnim,
          _ref18$pdfBug = _ref18.pdfBug,
          pdfBug = _ref18$pdfBug === void 0 ? false : _ref18$pdfBug;

      _classCallCheck(this, InternalRenderTask);

      this.callback = callback;
      this.params = params;
      this.objs = objs;
      this.commonObjs = commonObjs;
      this.operatorListIdx = null;
      this.operatorList = operatorList;
      this._pageIndex = pageIndex;
      this.canvasFactory = canvasFactory;
      this.webGLContext = webGLContext;
      this._pdfBug = pdfBug;
      this.running = false;
      this.graphicsReadyCallback = null;
      this.graphicsReady = false;
      this._useRequestAnimationFrame = useRequestAnimationFrame === true && typeof window !== "undefined";
      this.cancelled = false;
      this.capability = (0, _util_metapdf.createPromiseCapability)();
      this.task = new RenderTask(this);
      this._continueBound = this._continue.bind(this);
      this._scheduleNextBound = this._scheduleNext.bind(this);
      this._nextBound = this._next.bind(this);
      this._canvas = params.canvasContext.canvas;
    }

    _createClass(InternalRenderTask, [{
      key: "initializeGraphics",
      value: function initializeGraphics(_ref19) {
        var _globalThis$StepperMa;

        var _ref19$transparency = _ref19.transparency,
            transparency = _ref19$transparency === void 0 ? false : _ref19$transparency,
            optionalContentConfig = _ref19.optionalContentConfig;

        if (this.cancelled) {
          return;
        }

        if (this._canvas) {
          if (canvasInRendering.has(this._canvas)) {
            throw new Error("Cannot use the same canvas during multiple render() operations. " + "Use different canvas or ensure previous operations were " + "cancelled or completed.");
          }

          canvasInRendering.add(this._canvas);
        }

        if (this._pdfBug && ((_globalThis$StepperMa = globalThis.StepperManager) === null || _globalThis$StepperMa === void 0 ? void 0 : _globalThis$StepperMa.enabled)) {
          this.stepper = globalThis.StepperManager.create(this._pageIndex);
          this.stepper.init(this.operatorList);
          this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
        }

        var _this$params = this.params,
            canvasContext = _this$params.canvasContext,
            viewport = _this$params.viewport,
            transform = _this$params.transform,
            imageLayer = _this$params.imageLayer,
            background = _this$params.background;
        this.gfx = new _canvas_metapdf.CanvasGraphics(canvasContext, this.commonObjs, this.objs, this.canvasFactory, this.webGLContext, imageLayer, optionalContentConfig);
        this.gfx.beginDrawing({
          transform: transform,
          viewport: viewport,
          transparency: transparency,
          background: background,
          metapdf: this.params.metapdf
        });
        this.operatorListIdx = 0;
        this.graphicsReady = true;

        if (this.graphicsReadyCallback) {
          this.graphicsReadyCallback();
        }
      }
    }, {
      key: "cancel",
      value: function cancel() {
        var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        this.running = false;
        this.cancelled = true;

        if (this.gfx) {
          this.gfx.endDrawing();
        }

        if (this._canvas) {
          canvasInRendering["delete"](this._canvas);
        }

        this.callback(error || new _display_utils.RenderingCancelledException("Rendering cancelled, page ".concat(this._pageIndex + 1), "canvas"));
      }
    }, {
      key: "operatorListChanged",
      value: function operatorListChanged() {
        if (!this.graphicsReady) {
          if (!this.graphicsReadyCallback) {
            this.graphicsReadyCallback = this._continueBound;
          }

          return;
        }

        if (this.stepper) {
          this.stepper.updateOperatorList(this.operatorList);
        }

        if (this.running) {
          return;
        }

        this._continue();
      }
    }, {
      key: "_continue",
      value: function _continue() {
        this.running = true;

        if (this.cancelled) {
          return;
        }

        if (this.task.onContinue) {
          this.task.onContinue(this._scheduleNextBound);
        } else {
          this._scheduleNext();
        }
      }
    }, {
      key: "_scheduleNext",
      value: function _scheduleNext() {
        var _this16 = this;

        if (this._useRequestAnimationFrame) {
          window.requestAnimationFrame(function () {
            _this16._nextBound()["catch"](_this16.cancel.bind(_this16));
          });
        } else {
          Promise.resolve().then(this._nextBound)["catch"](this.cancel.bind(this));
        }
      }
    }, {
      key: "_next",
      value: function () {
        var _next2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!this.cancelled) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return");

                case 2:
                  this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper);

                  if (this.operatorListIdx === this.operatorList.argsArray.length) {
                    this.running = false;

                    if (this.operatorList.lastChunk) {
                      this.gfx.endDrawing();

                      if (this._canvas) {
                        canvasInRendering["delete"](this._canvas);
                      }

                      this.callback();
                    }
                  }

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function _next() {
          return _next2.apply(this, arguments);
        }

        return _next;
      }()
    }, {
      key: "completed",
      get: function get() {
        return this.capability.promise["catch"](function () {});
      }
    }]);

    return InternalRenderTask;
  }();

  return InternalRenderTask;
}();

var version = '2.7.390';
exports.version = version;
var build = 'cd4f3adbf';
exports.build = build;