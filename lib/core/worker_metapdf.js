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
exports.WorkerMessageHandler = exports.WorkerTask = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util_metapdf = require("../shared/util_metapdf.js");

var _primitives = require("./primitives.js");

var _pdf_manager = require("./pdf_manager.js");

var _writer = require("./writer.js");

var _is_node = require("../shared/is_node.js");

var _message_handler = require("../shared/message_handler.js");

var _worker_stream = require("./worker_stream.js");

var _core_utils = require("./core_utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WorkerTask = /*#__PURE__*/function () {
  function WorkerTask(name) {
    _classCallCheck(this, WorkerTask);

    this.name = name;
    this.terminated = false;
    this._capability = (0, _util_metapdf.createPromiseCapability)();
  }

  _createClass(WorkerTask, [{
    key: "finish",
    value: function finish() {
      this._capability.resolve();
    }
  }, {
    key: "terminate",
    value: function terminate() {
      this.terminated = true;
    }
  }, {
    key: "ensureNotTerminated",
    value: function ensureNotTerminated() {
      if (this.terminated) {
        throw new Error("Worker task was terminated");
      }
    }
  }, {
    key: "finished",
    get: function get() {
      return this._capability.promise;
    }
  }]);

  return WorkerTask;
}();

exports.WorkerTask = WorkerTask;

var WorkerMessageHandler = /*#__PURE__*/function () {
  function WorkerMessageHandler() {
    _classCallCheck(this, WorkerMessageHandler);
  }

  _createClass(WorkerMessageHandler, null, [{
    key: "setup",
    value: function setup(handler, port) {
      var testMessageProcessed = false;
      handler.on("test", function wphSetupTest(data) {
        if (testMessageProcessed) {
          return;
        }

        testMessageProcessed = true;

        if (!(data instanceof Uint8Array)) {
          handler.send("test", null);
          return;
        }

        var supportTransfers = data[0] === 255;
        handler.postMessageTransfers = supportTransfers;
        handler.send("test", {
          supportTransfers: supportTransfers
        });
      });
      handler.on("configure", function wphConfigure(data) {
        (0, _util_metapdf.setVerbosityLevel)(data.verbosity);
      });
      handler.on('setAnnoDecimals', function wphSetDecimals(data) {
        if (MP && MP.options && data.decimals) MP.options.decimals = data.decimals;
      });
      handler.on('GetDocRequest', function wphSetupDoc(data) {
        return WorkerMessageHandler.createDocumentHandler(data, port);
      });
    }
  }, {
    key: "createDocumentHandler",
    value: function createDocumentHandler(docParams, port) {
      var pdfManager;
      var terminated = false;
      var cancelXHRs = null;
      var WorkerTasks = [];
      var verbosity = (0, _util_metapdf.getVerbosityLevel)();
      var apiVersion = docParams.apiVersion;
      var workerVersion = '2.7.391';

      if (apiVersion !== workerVersion) {
        throw new Error("The API version \"".concat(apiVersion, "\" does not match ") + "the Worker version \"".concat(workerVersion, "\"."));
      }

      var enumerableProperties = [];

      for (var property in []) {
        enumerableProperties.push(property);
      }

      if (enumerableProperties.length) {
        throw new Error("The `Array.prototype` contains unexpected enumerable properties: " + enumerableProperties.join(", ") + "; thus breaking e.g. `for...in` iteration of `Array`s.");
      }

      var docId = docParams.docId;
      var docBaseUrl = docParams.docBaseUrl;
      var workerHandlerName = docParams.docId + "_worker";
      var handler = new _message_handler.MessageHandler(workerHandlerName, docId, port);
      handler.postMessageTransfers = docParams.postMessageTransfers;

      function ensureNotTerminated() {
        if (terminated) {
          throw new Error("Worker was terminated");
        }
      }

      function startWorkerTask(task) {
        WorkerTasks.push(task);
      }

      function finishWorkerTask(task) {
        task.finish();
        var i = WorkerTasks.indexOf(task);
        WorkerTasks.splice(i, 1);
      }

      function loadDocument(_x) {
        return _loadDocument.apply(this, arguments);
      }

      function _loadDocument() {
        _loadDocument = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(recoveryMode) {
          var _yield$Promise$all, _yield$Promise$all2, numPages, fingerprint;

          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return pdfManager.ensureDoc("checkHeader");

                case 2:
                  _context.next = 4;
                  return pdfManager.ensureDoc("parseStartXRef");

                case 4:
                  _context.next = 6;
                  return pdfManager.ensureDoc("parse", [recoveryMode]);

                case 6:
                  if (recoveryMode) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 9;
                  return pdfManager.ensureDoc("checkFirstPage");

                case 9:
                  _context.next = 11;
                  return Promise.all([pdfManager.ensureDoc("numPages"), pdfManager.ensureDoc("fingerprint")]);

                case 11:
                  _yield$Promise$all = _context.sent;
                  _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                  numPages = _yield$Promise$all2[0];
                  fingerprint = _yield$Promise$all2[1];
                  return _context.abrupt("return", {
                    numPages: numPages,
                    fingerprint: fingerprint
                  });

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return _loadDocument.apply(this, arguments);
      }

      function getPdfManager(data, evaluatorOptions) {
        var pdfManagerCapability = (0, _util_metapdf.createPromiseCapability)();
        var newPdfManager;
        var source = data.source;

        if (source.data) {
          try {
            newPdfManager = new _pdf_manager.LocalPdfManager(docId, source.data, source.password, evaluatorOptions, docBaseUrl);
            pdfManagerCapability.resolve(newPdfManager);
          } catch (ex) {
            pdfManagerCapability.reject(ex);
          }

          return pdfManagerCapability.promise;
        }

        var pdfStream,
            cachedChunks = [];

        try {
          pdfStream = new _worker_stream.PDFWorkerStream(handler);
        } catch (ex) {
          pdfManagerCapability.reject(ex);
          return pdfManagerCapability.promise;
        }

        var fullRequest = pdfStream.getFullReader();
        fullRequest.headersReady.then(function () {
          if (!fullRequest.isRangeSupported) {
            return;
          }

          var disableAutoFetch = source.disableAutoFetch || fullRequest.isStreamingSupported;
          newPdfManager = new _pdf_manager.NetworkPdfManager(docId, pdfStream, {
            msgHandler: handler,
            password: source.password,
            length: fullRequest.contentLength,
            disableAutoFetch: disableAutoFetch,
            rangeChunkSize: source.rangeChunkSize
          }, evaluatorOptions, docBaseUrl);

          for (var i = 0; i < cachedChunks.length; i++) {
            newPdfManager.sendProgressiveData(cachedChunks[i]);
          }

          cachedChunks = [];
          pdfManagerCapability.resolve(newPdfManager);
          cancelXHRs = null;
        })["catch"](function (reason) {
          pdfManagerCapability.reject(reason);
          cancelXHRs = null;
        });
        var loaded = 0;

        var flushChunks = function flushChunks() {
          var pdfFile = (0, _util_metapdf.arraysToBytes)(cachedChunks);

          if (source.length && pdfFile.length !== source.length) {
            (0, _util_metapdf.warn)("reported HTTP length is different from actual");
          }

          try {
            newPdfManager = new _pdf_manager.LocalPdfManager(docId, pdfFile, source.password, evaluatorOptions, docBaseUrl);
            pdfManagerCapability.resolve(newPdfManager);
          } catch (ex) {
            pdfManagerCapability.reject(ex);
          }

          cachedChunks = [];
        };

        var readPromise = new Promise(function (resolve, reject) {
          var readChunk = function readChunk(_ref) {
            var value = _ref.value,
                done = _ref.done;

            try {
              ensureNotTerminated();

              if (done) {
                if (!newPdfManager) {
                  flushChunks();
                }

                cancelXHRs = null;
                return;
              }

              loaded += (0, _util_metapdf.arrayByteLength)(value);

              if (!fullRequest.isStreamingSupported) {
                handler.send("DocProgress", {
                  loaded: loaded,
                  total: Math.max(loaded, fullRequest.contentLength || 0)
                });
              }

              if (newPdfManager) {
                newPdfManager.sendProgressiveData(value);
              } else {
                cachedChunks.push(value);
              }

              fullRequest.read().then(readChunk, reject);
            } catch (e) {
              reject(e);
            }
          };

          fullRequest.read().then(readChunk, reject);
        });
        readPromise["catch"](function (e) {
          pdfManagerCapability.reject(e);
          cancelXHRs = null;
        });

        cancelXHRs = function cancelXHRs(reason) {
          pdfStream.cancelAllRequests(reason);
        };

        return pdfManagerCapability.promise;
      }

      function setupDoc(data) {
        function onSuccess(doc) {
          ensureNotTerminated();
          handler.send("GetDoc", {
            pdfInfo: doc
          });
        }

        function onFailure(ex) {
          ensureNotTerminated();

          if (ex instanceof _util_metapdf.PasswordException) {
            var task = new WorkerTask("PasswordException: response ".concat(ex.code));
            startWorkerTask(task);
            handler.sendWithPromise("PasswordRequest", ex).then(function (_ref2) {
              var password = _ref2.password;
              finishWorkerTask(task);
              pdfManager.updatePassword(password);
              pdfManagerReady();
            })["catch"](function () {
              finishWorkerTask(task);
              handler.send("DocException", ex);
            });
          } else if (ex instanceof _util_metapdf.InvalidPDFException || ex instanceof _util_metapdf.MissingPDFException || ex instanceof _util_metapdf.UnexpectedResponseException || ex instanceof _util_metapdf.UnknownErrorException) {
            handler.send("DocException", ex);
          } else {
            handler.send("DocException", new _util_metapdf.UnknownErrorException(ex.message, ex.toString()));
          }
        }

        function pdfManagerReady() {
          ensureNotTerminated();
          loadDocument(false).then(onSuccess, function (reason) {
            ensureNotTerminated();

            if (!(reason instanceof _core_utils.XRefParseException)) {
              onFailure(reason);
              return;
            }

            pdfManager.requestLoadedStream();
            pdfManager.onLoadedStream().then(function () {
              ensureNotTerminated();
              loadDocument(true).then(onSuccess, onFailure);
            });
          });
        }

        ensureNotTerminated();
        var evaluatorOptions = {
          maxImageSize: data.maxImageSize,
          disableFontFace: data.disableFontFace,
          ignoreErrors: data.ignoreErrors,
          isEvalSupported: data.isEvalSupported,
          fontExtraProperties: data.fontExtraProperties
        };
        getPdfManager(data, evaluatorOptions).then(function (newPdfManager) {
          if (terminated) {
            newPdfManager.terminate(new _util_metapdf.AbortException("Worker was terminated."));
            throw new Error("Worker was terminated");
          }

          pdfManager = newPdfManager;
          pdfManager.onLoadedStream().then(function (stream) {
            handler.send("DataLoaded", {
              length: stream.bytes.byteLength
            });
          });
        }).then(pdfManagerReady, onFailure);
      }

      handler.on("GetPage", function wphSetupGetPage(data) {
        return pdfManager.getPage(data.pageIndex).then(function (page) {
          return Promise.all([pdfManager.ensure(page, "rotate"), pdfManager.ensure(page, "ref"), pdfManager.ensure(page, "userUnit"), pdfManager.ensure(page, "view")]).then(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 4),
                rotate = _ref4[0],
                ref = _ref4[1],
                userUnit = _ref4[2],
                view = _ref4[3];

            return {
              rotate: rotate,
              ref: ref,
              userUnit: userUnit,
              view: view
            };
          });
        });
      });
      handler.on("GetPageIndex", function wphSetupGetPageIndex(_ref5) {
        var ref = _ref5.ref;

        var pageRef = _primitives.Ref.get(ref.num, ref.gen);

        return pdfManager.ensureCatalog("getPageIndex", [pageRef]);
      });
      handler.on("GetDestinations", function wphSetupGetDestinations(data) {
        return pdfManager.ensureCatalog("destinations");
      });
      handler.on("GetDestination", function wphSetupGetDestination(data) {
        return pdfManager.ensureCatalog("getDestination", [data.id]);
      });
      handler.on("GetPageLabels", function wphSetupGetPageLabels(data) {
        return pdfManager.ensureCatalog("pageLabels");
      });
      handler.on("GetPageLayout", function wphSetupGetPageLayout(data) {
        return pdfManager.ensureCatalog("pageLayout");
      });
      handler.on("GetPageMode", function wphSetupGetPageMode(data) {
        return pdfManager.ensureCatalog("pageMode");
      });
      handler.on("GetViewerPreferences", function (data) {
        return pdfManager.ensureCatalog("viewerPreferences");
      });
      handler.on("GetOpenAction", function (data) {
        return pdfManager.ensureCatalog("openAction");
      });
      handler.on("GetAttachments", function wphSetupGetAttachments(data) {
        return pdfManager.ensureCatalog("attachments");
      });
      handler.on("GetJavaScript", function wphSetupGetJavaScript(data) {
        return pdfManager.ensureCatalog("javaScript");
      });
      handler.on("GetOutline", function wphSetupGetOutline(data) {
        return pdfManager.ensureCatalog("documentOutline");
      });
      handler.on("GetOptionalContentConfig", function (data) {
        return pdfManager.ensureCatalog("optionalContentConfig");
      });
      handler.on("GetPermissions", function (data) {
        return pdfManager.ensureCatalog("permissions");
      });
      handler.on("GetMetadata", function wphSetupGetMetadata(data) {
        return Promise.all([pdfManager.ensureDoc("documentInfo"), pdfManager.ensureCatalog("metadata")]);
      });
      handler.on("GetMarkInfo", function wphSetupGetMarkInfo(data) {
        return pdfManager.ensureCatalog("markInfo");
      });
      handler.on("GetData", function wphSetupGetData(data) {
        pdfManager.requestLoadedStream();
        return pdfManager.onLoadedStream().then(function (stream) {
          return stream.bytes;
        });
      });
      handler.on('GetXrefMETAPDF', function wphSetupGetData2(params) {
        return pdfManager.onLoadedXref(params).then(function (stream) {
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            window.metapdfBlob = stream.blob;
          }

          return stream;
        });
      });
      handler.on("GetStats", function wphSetupGetStats(data) {
        return pdfManager.ensureXRef("stats");
      });
      handler.on("GetAnnotations", function (_ref6) {
        var pageIndex = _ref6.pageIndex,
            intent = _ref6.intent;
        return pdfManager.getPage(pageIndex).then(function (page) {
          return page.getAnnotationsData(intent);
        });
      });
      handler.on("GetFieldObjects", function (data) {
        return pdfManager.ensureDoc("fieldObjects");
      });
      handler.on("HasJSActions", function (data) {
        return pdfManager.ensureDoc("hasJSActions");
      });
      handler.on("GetCalculationOrderIds", function (data) {
        return pdfManager.ensureDoc("calculationOrderIds");
      });
      handler.on("SaveDocument", function (_ref7) {
        var numPages = _ref7.numPages,
            annotationStorage = _ref7.annotationStorage,
            filename = _ref7.filename;
        pdfManager.requestLoadedStream();
        var promises = [pdfManager.onLoadedStream(), pdfManager.ensureCatalog("acroForm"), pdfManager.ensureDoc("xref"), pdfManager.ensureDoc("startXRef")];

        var _loop = function _loop(pageIndex) {
          promises.push(pdfManager.getPage(pageIndex).then(function (page) {
            var task = new WorkerTask("Save: page ".concat(pageIndex));
            startWorkerTask(task);
            return page.save(handler, task, annotationStorage)["finally"](function () {
              finishWorkerTask(task);
            });
          }));
        };

        for (var pageIndex = 0; pageIndex < numPages; pageIndex++) {
          _loop(pageIndex);
        }

        return Promise.all(promises).then(function (_ref8) {
          var _ref9 = _toArray(_ref8),
              stream = _ref9[0],
              acroForm = _ref9[1],
              xref = _ref9[2],
              startXRef = _ref9[3],
              refs = _ref9.slice(4);

          var newRefs = [];

          var _iterator = _createForOfIteratorHelper(refs),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var ref = _step.value;
              newRefs = ref.filter(function (x) {
                return x !== null;
              }).reduce(function (a, b) {
                return a.concat(b);
              }, newRefs);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          if (newRefs.length === 0) {
            return stream.bytes;
          }

          var xfa = acroForm instanceof _primitives.Dict && acroForm.get("XFA") || [];
          var xfaDatasets = null;

          if (Array.isArray(xfa)) {
            for (var i = 0, ii = xfa.length; i < ii; i += 2) {
              if (xfa[i] === "datasets") {
                xfaDatasets = xfa[i + 1];
              }
            }
          } else {
            (0, _util_metapdf.warn)("Unsupported XFA type.");
          }

          var newXrefInfo = Object.create(null);

          if (xref.trailer) {
            var infoObj = Object.create(null);
            var xrefInfo = xref.trailer.get("Info") || null;

            if (xrefInfo instanceof _primitives.Dict) {
              xrefInfo.forEach(function (key, value) {
                if ((0, _util_metapdf.isString)(key) && (0, _util_metapdf.isString)(value)) {
                  infoObj[key] = (0, _util_metapdf.stringToPDFString)(value);
                }
              });
            }

            newXrefInfo = {
              rootRef: xref.trailer.getRaw("Root") || null,
              encrypt: xref.trailer.getRaw("Encrypt") || null,
              newRef: xref.getNewRef(),
              infoRef: xref.trailer.getRaw("Info") || null,
              info: infoObj,
              fileIds: xref.trailer.getRaw("ID") || null,
              startXRef: startXRef,
              filename: filename
            };
          }

          xref.resetNewRef();
          return (0, _writer.incrementalUpdate)({
            originalData: stream.bytes,
            xrefInfo: newXrefInfo,
            newRefs: newRefs,
            xref: xref,
            datasetsRef: xfaDatasets
          });
        });
      });
      handler.on("GetOperatorList", function wphSetupRenderPage(data, sink) {
        var pageIndex = data.pageIndex;
        pdfManager.getPage(pageIndex).then(function (page) {
          var task = new WorkerTask("GetOperatorList: page ".concat(pageIndex));
          startWorkerTask(task);
          var start = verbosity >= _util_metapdf.VerbosityLevel.INFOS ? Date.now() : 0;
          page.getOperatorList({
            handler: handler,
            sink: sink,
            task: task,
            intent: data.intent,
            renderInteractiveForms: data.renderInteractiveForms,
            annotationStorage: data.annotationStorage
          }).then(function (operatorListInfo) {
            finishWorkerTask(task);

            if (start) {
              (0, _util_metapdf.info)("page=".concat(pageIndex + 1, " - getOperatorList: time=") + "".concat(Date.now() - start, "ms, len=").concat(operatorListInfo.length));
            }

            sink.close();
          }, function (reason) {
            finishWorkerTask(task);

            if (task.terminated) {
              return;
            }

            handler.send("UnsupportedFeature", {
              featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorOperatorList
            });
            sink.error(reason);
          });
        });
      });
      handler.on("GetTextContent", function wphExtractText(data, sink) {
        var pageIndex = data.pageIndex;

        sink.onPull = function (desiredSize) {};

        sink.onCancel = function (reason) {};

        pdfManager.getPage(pageIndex).then(function (page) {
          var task = new WorkerTask("GetTextContent: page " + pageIndex);
          startWorkerTask(task);
          var start = verbosity >= _util_metapdf.VerbosityLevel.INFOS ? Date.now() : 0;
          page.extractTextContent({
            handler: handler,
            task: task,
            sink: sink,
            normalizeWhitespace: data.normalizeWhitespace,
            combineTextItems: data.combineTextItems
          }).then(function () {
            finishWorkerTask(task);

            if (start) {
              (0, _util_metapdf.info)("page=".concat(pageIndex + 1, " - getTextContent: time=") + "".concat(Date.now() - start, "ms"));
            }

            sink.close();
          }, function (reason) {
            finishWorkerTask(task);

            if (task.terminated) {
              return;
            }

            sink.error(reason);
          });
        });
      });
      handler.on("FontFallback", function (data) {
        return pdfManager.fontFallback(data.id, handler);
      });
      handler.on("Cleanup", function wphCleanup(data) {
        return pdfManager.cleanup(true);
      });
      handler.on("Terminate", function wphTerminate(data) {
        terminated = true;
        var waitOn = [];

        if (pdfManager) {
          pdfManager.terminate(new _util_metapdf.AbortException("Worker was terminated."));
          var cleanupPromise = pdfManager.cleanup();
          waitOn.push(cleanupPromise);
          pdfManager = null;
        } else {
          (0, _primitives.clearPrimitiveCaches)();
        }

        if (cancelXHRs) {
          cancelXHRs(new _util_metapdf.AbortException("Worker was terminated."));
        }

        WorkerTasks.forEach(function (task) {
          waitOn.push(task.finished);
          task.terminate();
        });
        return Promise.all(waitOn).then(function () {
          handler.destroy();
          handler = null;
        });
      });
      handler.on("Ready", function wphReady(data) {
        setupDoc(docParams);
        docParams = null;
      });
      return workerHandlerName;
    }
  }, {
    key: "initializeFromPort",
    value: function initializeFromPort(port) {
      var handler = new _message_handler.MessageHandler("worker", "main", port);
      WorkerMessageHandler.setup(handler, port);
      handler.send("ready", null);
    }
  }]);

  return WorkerMessageHandler;
}();

exports.WorkerMessageHandler = WorkerMessageHandler;

function isMessagePort(maybePort) {
  return typeof maybePort.postMessage === "function" && "onmessage" in maybePort;
}

function initializeWorker() {
  if (!('console' in globalScope)) {
    var consoleTimer = {};
    var workerConsole = {
      log: function log() {
        var args = Array.prototype.slice.call(arguments);
        globalScope.postMessage({
          targetName: 'main',
          action: 'console_log',
          data: args
        });
      },
      error: function error() {
        var args = Array.prototype.slice.call(arguments);
        globalScope.postMessage({
          targetName: 'main',
          action: 'console_error',
          data: args
        });
        throw 'pdf.js execution error';
      },
      time: function time(name) {
        consoleTimer[name] = Date.now();
      },
      timeEnd: function timeEnd(name) {
        var time = consoleTimer[name];

        if (!time) {
          error('Unknown timer name ' + name);
        }

        this.log('Timer:', name, Date.now() - time);
      }
    };
    globalScope.console = workerConsole;
  }

  if (typeof self !== 'undefined') {
    var handler = new _message_handler.MessageHandler('worker', 'main', self);
    WorkerMessageHandler.setup(handler, self);
    handler.send('ready', null);
  }
}

if (typeof window === "undefined" && !_is_node.isNodeJS && typeof self !== "undefined" && isMessagePort(self)) {
  WorkerMessageHandler.initializeFromPort(self);
}