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
exports.PDFPrintServiceFactory = exports.DefaultExternalServices = exports.PDFViewerApplication = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _ui_utils_metapdf = require("./ui_utils_metapdf.js");

var _app_options = require("./app_options.js");

var _pdf = require("../pdf");

var _pdf_cursor_tools = require("./pdf_cursor_tools.js");

var _pdf_rendering_queue = require("./pdf_rendering_queue.js");

var _pdf_sidebar_metapdf = require("./pdf_sidebar_metapdf.js");

var _overlay_manager = require("./overlay_manager.js");

var _password_prompt = require("./password_prompt.js");

var _pdf_attachment_viewer_metapdf = require("./pdf_attachment_viewer_metapdf.js");

var _pdf_document_properties_metapdf = require("./pdf_document_properties_metapdf.js");

var _pdf_find_bar_metapdf = require("./pdf_find_bar_metapdf.js");

var _pdf_find_controller_metapdf = require("./pdf_find_controller_metapdf.js");

var _pdf_history_metapdf = require("./pdf_history_metapdf.js");

var _pdf_layer_viewer_metapdf = require("./pdf_layer_viewer_metapdf.js");

var _pdf_link_service_metapdf = require("./pdf_link_service_metapdf.js");

var _pdf_outline_viewer_metapdf = require("./pdf_outline_viewer_metapdf.js");

var _pdf_presentation_mode = require("./pdf_presentation_mode.js");

var _pdf_sidebar_resizer = require("./pdf_sidebar_resizer.js");

var _pdf_thumbnail_viewer_metapdf = require("./pdf_thumbnail_viewer_metapdf.js");

var _pdf_viewer_metapdf = require("./pdf_viewer_metapdf.js");

var _secondary_toolbar = require("./secondary_toolbar.js");

var _toolbar = require("./toolbar.js");

var _viewer_compatibility = require("./viewer_compatibility.js");

var _view_history = require("./view_history.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_SCALE_DELTA = 1.1;
var DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
var FORCE_PAGES_LOADED_TIMEOUT = 10000;
var WHEEL_ZOOM_DISABLED_TIMEOUT = 1000;
var ENABLE_PERMISSIONS_CLASS = "enablePermissions";
var ViewOnLoad = {
  UNKNOWN: -1,
  PREVIOUS: 0,
  INITIAL: 1
};
var KNOWN_VERSIONS = ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0", "2.1", "2.2", "2.3"];
var KNOWN_GENERATORS = ["acrobat distiller", "acrobat pdfwriter", "adobe livecycle", "adobe pdf library", "adobe photoshop", "ghostscript", "tcpdf", "cairo", "dvipdfm", "dvips", "pdftex", "pdfkit", "itext", "prince", "quarkxpress", "mac os x", "microsoft", "openoffice", "oracle", "luradocument", "pdf-xchange", "antenna house", "aspose.cells", "fpdf"];

var DefaultExternalServices = /*#__PURE__*/function () {
  function DefaultExternalServices() {
    _classCallCheck(this, DefaultExternalServices);

    throw new Error("Cannot initialize DefaultExternalServices.");
  }

  _createClass(DefaultExternalServices, null, [{
    key: "updateFindControlState",
    value: function updateFindControlState(data) {}
  }, {
    key: "updateFindMatchesCount",
    value: function updateFindMatchesCount(data) {}
  }, {
    key: "initPassiveLoading",
    value: function initPassiveLoading(callbacks) {}
  }, {
    key: "fallback",
    value: function fallback(data, callback) {}
  }, {
    key: "reportTelemetry",
    value: function reportTelemetry(data) {}
  }, {
    key: "createDownloadManager",
    value: function createDownloadManager(options) {
      throw new Error("Not implemented: createDownloadManager");
    }
  }, {
    key: "createPreferences",
    value: function createPreferences() {
      throw new Error("Not implemented: createPreferences");
    }
  }, {
    key: "createL10n",
    value: function createL10n(options) {
      throw new Error("Not implemented: createL10n");
    }
  }, {
    key: "supportsIntegratedFind",
    get: function get() {
      return (0, _pdf.shadow)(this, "supportsIntegratedFind", false);
    }
  }, {
    key: "supportsDocumentFonts",
    get: function get() {
      return (0, _pdf.shadow)(this, "supportsDocumentFonts", true);
    }
  }, {
    key: "supportedMouseWheelZoomModifierKeys",
    get: function get() {
      return (0, _pdf.shadow)(this, "supportedMouseWheelZoomModifierKeys", {
        ctrlKey: true,
        metaKey: true
      });
    }
  }, {
    key: "isInAutomation",
    get: function get() {
      return (0, _pdf.shadow)(this, "isInAutomation", false);
    }
  }, {
    key: "scripting",
    get: function get() {
      throw new Error("Not implemented: scripting");
    }
  }]);

  return DefaultExternalServices;
}();

exports.DefaultExternalServices = DefaultExternalServices;
var PDFViewerApplication = {
  initialBookmark: document.location.hash.substring(1),
  _initializedCapability: (0, _pdf.createPromiseCapability)(),
  fellback: false,
  appConfig: null,
  pdfDocument: null,
  pdfLoadingTask: null,
  printService: null,
  pdfViewer: null,
  pdfThumbnailViewer: null,
  pdfRenderingQueue: null,
  pdfPresentationMode: null,
  pdfDocumentProperties: null,
  pdfLinkService: null,
  pdfHistory: null,
  pdfSidebar: null,
  pdfSidebarResizer: null,
  pdfOutlineViewer: null,
  pdfAttachmentViewer: null,
  pdfLayerViewer: null,
  pdfCursorTools: null,
  store: null,
  downloadManager: null,
  overlayManager: null,
  preferences: null,
  toolbar: null,
  secondaryToolbar: null,
  eventBus: null,
  l10n: null,
  isInitialViewSet: false,
  downloadComplete: false,
  isViewerEmbedded: window.parent !== window,
  url: "",
  baseUrl: "",
  externalServices: DefaultExternalServices,
  _boundEvents: {},
  contentDispositionFilename: null,
  triggerDelayedFallback: null,
  _saveInProgress: false,
  _wheelUnusedTicks: 0,
  _idleCallbacks: new Set(),
  initialize: function initialize(appConfig) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var appContainer;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.preferences = _this.externalServices.createPreferences();

              _this.preferences.set('textLayerMode', 2);

              _this.appConfig = appConfig;
              _context.next = 5;
              return _this._readPreferences();

            case 5:
              _context.next = 7;
              return _this._parseHashParameters();

            case 7:
              _context.next = 9;
              return _this._initializeL10n();

            case 9:
              if (_this.isViewerEmbedded && _app_options.AppOptions.get("externalLinkTarget") === _pdf.LinkTarget.NONE) {
                _app_options.AppOptions.set("externalLinkTarget", _pdf.LinkTarget.TOP);
              }

              _context.next = 12;
              return _this._initializeViewerComponents();

            case 12:
              _this.bindEvents();

              _this.bindWindowEvents();

              appContainer = appConfig.appContainer || document.documentElement;

              _this.l10n.translate(appContainer).then(function () {
                _this.eventBus.dispatch("localized", {
                  source: _this
                });
              });

              _this._initializedCapability.resolve();

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  _readPreferences: function _readPreferences() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var excludedPreferences, prefs, name;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!_app_options.AppOptions.get("disablePreferences")) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _app_options.AppOptions.set('cMapUrl', pdfjsLib.cMapUrl);

              excludedPreferences = ['sidebarViewOnLoad', 'curstorToolOnLoad', 'pdfBugEnabled', 'showPreviousViewOnLoad', 'defaultZoomValue'];
              _context2.prev = 4;
              _context2.next = 7;
              return _this2.preferences.getAll();

            case 7:
              prefs = _context2.sent;
              _context2.t0 = _regenerator["default"].keys(prefs);

            case 9:
              if ((_context2.t1 = _context2.t0()).done) {
                _context2.next = 16;
                break;
              }

              name = _context2.t1.value;

              if (!(excludedPreferences.indexOf(name) >= 0)) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("continue", 9);

            case 13:
              _app_options.AppOptions.set(name, prefs[name]);

              _context2.next = 9;
              break;

            case 16:
              _context2.next = 21;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t2 = _context2["catch"](4);
              console.error("_readPreferences: \"".concat(_context2.t2.message, "\"."));

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 18]]);
    }))();
  },
  _parseHashParameters: function _parseHashParameters() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var hash, hashParams, waitOn, viewer, enabled;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (_app_options.AppOptions.get("pdfBugEnabled")) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", undefined);

            case 2:
              hash = document.location.hash.substring(1);

              if (hash) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", undefined);

            case 5:
              hashParams = (0, _ui_utils_metapdf.parseQueryString)(hash), waitOn = [];

              if ("disableworker" in hashParams && hashParams.disableworker === "true") {
                waitOn.push(loadFakeWorker());
              }

              if ("disablerange" in hashParams) {
                _app_options.AppOptions.set("disableRange", hashParams.disablerange === "true");
              }

              if ("disablestream" in hashParams) {
                _app_options.AppOptions.set("disableStream", hashParams.disablestream === "true");
              }

              if ("disableautofetch" in hashParams) {
                _app_options.AppOptions.set("disableAutoFetch", hashParams.disableautofetch === "true");
              }

              if ("disablefontface" in hashParams) {
                _app_options.AppOptions.set("disableFontFace", hashParams.disablefontface === "true");
              }

              if ("disablehistory" in hashParams) {
                _app_options.AppOptions.set("disableHistory", hashParams.disablehistory === "true");
              }

              if ("webgl" in hashParams) {
                _app_options.AppOptions.set("enableWebGL", hashParams.webgl === "true");
              }

              if ("verbosity" in hashParams) {
                _app_options.AppOptions.set("verbosity", hashParams.verbosity | 0);
              }

              if (!("textlayer" in hashParams)) {
                _context3.next = 23;
                break;
              }

              _context3.t0 = hashParams.textlayer;
              _context3.next = _context3.t0 === "off" ? 18 : _context3.t0 === "visible" ? 20 : _context3.t0 === "shadow" ? 20 : _context3.t0 === "hover" ? 20 : 23;
              break;

            case 18:
              _app_options.AppOptions.set("textLayerMode", _ui_utils_metapdf.TextLayerMode.DISABLE);

              return _context3.abrupt("break", 23);

            case 20:
              viewer = _this3.appConfig.viewerContainer;
              viewer.classList.add("textLayer-" + hashParams.textlayer);
              return _context3.abrupt("break", 23);

            case 23:
              if ("pdfbug" in hashParams) {
                _app_options.AppOptions.set("pdfBug", true);

                _app_options.AppOptions.set("fontExtraProperties", true);

                enabled = hashParams.pdfbug.split(",");
                waitOn.push(loadAndEnablePDFBug(enabled));
              }

              if ("locale" in hashParams) {
                _app_options.AppOptions.set("locale", hashParams.locale);
              }

              return _context3.abrupt("return", Promise.all(waitOn)["catch"](function (reason) {
                console.error("_parseHashParameters: \"".concat(reason.message, "\"."));
              }));

            case 26:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  _initializeL10n: function _initializeL10n() {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var dir;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this4.l10n = _this4.externalServices.createL10n({
                locale: _app_options.AppOptions.get("locale")
              });
              _context4.next = 3;
              return _this4.l10n.getDirection();

            case 3:
              dir = _context4.sent;

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  _initializeViewerComponents: function _initializeViewerComponents() {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var appConfig, eventBus, pdfRenderingQueue, pdfLinkService, downloadManager, findController, container, viewer;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              appConfig = _this5.appConfig;
              eventBus = appConfig.eventBus || new _ui_utils_metapdf.EventBus({
                isInAutomation: _this5.externalServices.isInAutomation
              });
              _this5.eventBus = eventBus;
              _this5.overlayManager = new _overlay_manager.OverlayManager();
              pdfRenderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
              pdfRenderingQueue.onIdle = _this5.cleanup.bind(_this5);
              _this5.pdfRenderingQueue = pdfRenderingQueue;
              pdfLinkService = new _pdf_link_service_metapdf.PDFLinkService({
                eventBus: eventBus,
                externalLinkTarget: _app_options.AppOptions.get("externalLinkTarget"),
                externalLinkRel: _app_options.AppOptions.get("externalLinkRel"),
                ignoreDestinationZoom: _app_options.AppOptions.get("ignoreDestinationZoom")
              });
              _this5.pdfLinkService = pdfLinkService;
              downloadManager = _this5.externalServices.createDownloadManager();
              _this5.downloadManager = downloadManager;
              findController = new _pdf_find_controller_metapdf.PDFFindController({
                linkService: pdfLinkService,
                eventBus: eventBus
              });
              _this5.findController = findController;
              container = appConfig.mainContainer;
              viewer = appConfig.viewerContainer;
              _this5.pdfViewer = new _pdf_viewer_metapdf.PDFViewer({
                container: container,
                viewer: viewer,
                eventBus: eventBus,
                renderingQueue: pdfRenderingQueue,
                linkService: pdfLinkService,
                downloadManager: downloadManager,
                findController: findController,
                renderer: _app_options.AppOptions.get("renderer"),
                enableWebGL: _app_options.AppOptions.get("enableWebGL"),
                l10n: _this5.l10n,
                textLayerMode: _app_options.AppOptions.get("textLayerMode"),
                imageResourcesPath: _app_options.AppOptions.get("imageResourcesPath"),
                renderInteractiveForms: _app_options.AppOptions.get("renderInteractiveForms"),
                enablePrintAutoRotate: _app_options.AppOptions.get("enablePrintAutoRotate"),
                useOnlyCssZoom: _app_options.AppOptions.get("useOnlyCssZoom"),
                maxCanvasPixels: _app_options.AppOptions.get("maxCanvasPixels"),
                enableScripting: _app_options.AppOptions.get("enableScripting")
              });
              pdfRenderingQueue.setViewer(_this5.pdfViewer);
              pdfLinkService.setViewer(_this5.pdfViewer);

              if (appConfig.sidebar.thumbnailView) {
                _this5.pdfThumbnailViewer = new _pdf_thumbnail_viewer_metapdf.PDFThumbnailViewer({
                  container: appConfig.sidebar.thumbnailView,
                  eventBus: eventBus,
                  renderingQueue: pdfRenderingQueue,
                  linkService: pdfLinkService,
                  l10n: _this5.l10n
                });
                pdfRenderingQueue.setThumbnailViewer(_this5.pdfThumbnailViewer);
              }

              _this5.pdfHistory = new _pdf_history_metapdf.PDFHistory({
                linkService: pdfLinkService,
                eventBus: eventBus
              });
              pdfLinkService.setHistory(_this5.pdfHistory);

              if (!_this5.supportsIntegratedFind) {
                _this5.findBar = new _pdf_find_bar_metapdf.PDFFindBar(appConfig.findBar, eventBus, _this5.l10n);
              }

              _this5.pdfDocumentProperties = new _pdf_document_properties_metapdf.PDFDocumentProperties(appConfig.documentProperties, _this5.overlayManager, eventBus, _this5.l10n);
              _this5.pdfCursorTools = new _pdf_cursor_tools.PDFCursorTools({
                container: container,
                eventBus: eventBus,
                cursorToolOnLoad: _app_options.AppOptions.get("cursorToolOnLoad")
              });
              _this5.pdfOutlineViewer = new _pdf_outline_viewer_metapdf.PDFOutlineViewer({
                container: appConfig.sidebar.outlineView,
                eventBus: eventBus,
                linkService: pdfLinkService
              });
              _this5.pdfAttachmentViewer = new _pdf_attachment_viewer_metapdf.PDFAttachmentViewer({
                container: appConfig.sidebar.attachmentsView,
                eventBus: eventBus,
                downloadManager: downloadManager
              });
              _this5.pdfLayerViewer = new _pdf_layer_viewer_metapdf.PDFLayerViewer({
                container: appConfig.sidebar.layersView,
                eventBus: eventBus,
                l10n: _this5.l10n
              });
              _this5.pdfSidebar = new _pdf_sidebar_metapdf.PDFSidebar({
                elements: appConfig.sidebar,
                pdfViewer: _this5.pdfViewer,
                pdfThumbnailViewer: _this5.pdfThumbnailViewer,
                eventBus: eventBus,
                l10n: _this5.l10n
              });
              _this5.pdfSidebar.onToggled = _this5.forceRendering.bind(_this5);

            case 29:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  run: function run(config) {
    this.initialize(config).then(webViewerInitialized);
  },

  get initialized() {
    return this._initializedCapability.settled;
  },

  get initializedPromise() {
    return this._initializedCapability.promise;
  },

  zoomIn: function zoomIn(ticks) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    var newScale = this.pdfViewer.currentScale;

    do {
      newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(_ui_utils_metapdf.MAX_SCALE, newScale);
    } while (--ticks > 0 && newScale < _ui_utils_metapdf.MAX_SCALE);

    this.pdfViewer.currentScaleValue = newScale;
  },
  zoomOut: function zoomOut(ticks) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    var newScale = this.pdfViewer.currentScale;

    do {
      newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(_ui_utils_metapdf.MIN_SCALE, newScale);
    } while (--ticks > 0 && newScale > _ui_utils_metapdf.MIN_SCALE);

    this.pdfViewer.currentScaleValue = newScale;
  },
  zoomReset: function zoomReset() {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    this.pdfViewer.currentScaleValue = _ui_utils_metapdf.DEFAULT_SCALE_VALUE;
  },

  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  },

  set page(val) {
    MP.localSession.set('page', val);
    this.pdfViewer.currentPageNumber = val;
  },

  get page() {
    return this.pdfViewer.currentPageNumber;
  },

  get supportsPrinting() {
    return PDFPrintServiceFactory.instance.supportsPrinting;
  },

  get supportsFullscreen() {
    var support;
    var doc = document.documentElement;
    support = !!(doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullScreen);

    if (document.fullscreenEnabled === false || document.mozFullScreenEnabled === false || document.webkitFullscreenEnabled === false) {
      support = false;
    }

    return (0, _pdf.shadow)(this, "supportsFullscreen", support);
  },

  get supportsIntegratedFind() {
    return this.externalServices.supportsIntegratedFind;
  },

  get supportsDocumentFonts() {
    return this.externalServices.supportsDocumentFonts;
  },

  get supportedMouseWheelZoomModifierKeys() {
    return this.externalServices.supportedMouseWheelZoomModifierKeys;
  },

  initPassiveLoading: function initPassiveLoading() {
    throw new Error("Not implemented: initPassiveLoading");
  },
  setTitleUsingUrl: function setTitleUsingUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    this.url = url;
    this.baseUrl = url.split("#")[0];
    var title = (0, _ui_utils_metapdf.getPDFFileNameFromURL)(url, "");

    if (!title) {
      try {
        title = decodeURIComponent((0, _pdf.getFilenameFromUrl)(url)) || url;
      } catch (ex) {
        title = url;
      }
    }

    this.setTitle(title);
  },
  setTitle: function setTitle(title) {
    if (this.isViewerEmbedded) {
      return;
    }

    document.title = title;
  },
  close: function close() {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var promise, _iterator, _step, callback;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (_this6.pdfLoadingTask) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", undefined);

            case 2:
              promise = _this6.pdfLoadingTask.destroy();
              _this6.pdfLoadingTask = null;

              if (_this6.pdfDocument) {
                _this6.pdfDocument = null;

                _this6.pdfThumbnailViewer.setDocument(null);

                _this6.pdfViewer.setDocument(null);

                _this6.pdfLinkService.setDocument(null);

                _this6.pdfDocumentProperties.setDocument(null);
              }

              webViewerResetPermissions();
              _this6.store = null;
              _this6.isInitialViewSet = false;
              _this6.downloadComplete = false;
              _this6.url = "";
              _this6.baseUrl = "";
              _this6.contentDispositionFilename = null;
              _this6.triggerDelayedFallback = null;
              _this6._saveInProgress = false;
              _iterator = _createForOfIteratorHelper(_this6._idleCallbacks);

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  callback = _step.value;
                  window.cancelIdleCallback(callback);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              _this6._idleCallbacks.clear();

              _this6.pdfSidebar.reset();

              _this6.pdfOutlineViewer.reset();

              _this6.pdfAttachmentViewer.reset();

              _this6.pdfLayerViewer.reset();

              if (_this6.pdfHistory) {
                _this6.pdfHistory.reset();
              }

              if (_this6.findBar) {
                _this6.findBar.reset();
              }

              if (typeof PDFBug !== "undefined") {
                PDFBug.cleanup();
              }

              return _context6.abrupt("return", promise);

            case 25:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  open: function open(file, args, callback) {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var workerParameters, key, parameters, apiParameters, _key, value, _key2, _value, pwAttempted, loadingTask;

      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!_this7.pdfLoadingTask) {
                _context7.next = 3;
                break;
              }

              _context7.next = 3;
              return _this7.close();

            case 3:
              workerParameters = _app_options.AppOptions.getAll(_app_options.OptionKind.WORKER);

              for (key in workerParameters) {
                _pdf.GlobalWorkerOptions[key] = workerParameters[key];
              }

              parameters = Object.create(null);

              if (typeof file === "string") {
                _this7.setTitleUsingUrl(file);

                parameters.url = file;
              } else if (file && "byteLength" in file) {
                parameters.data = file;
              } else if (file.url && file.originalUrl) {
                _this7.setTitleUsingUrl(file.originalUrl);

                parameters.url = file.url;
              }

              apiParameters = _app_options.AppOptions.getAll(_app_options.OptionKind.API);

              for (_key in apiParameters) {
                value = apiParameters[_key];

                if (_key === "docBaseUrl" && !value) {}

                parameters[_key] = value;
              }

              if (args) {
                for (_key2 in args) {
                  _value = args[_key2];

                  if (_key2 === "length") {
                    _this7.pdfDocumentProperties.setFileSize(_value);
                  }

                  parameters[_key2] = _value;
                }
              }

              pwAttempted = false;
              loadingTask = (0, _pdf.getDocument)(parameters);
              _this7.pdfLoadingTask = loadingTask;

              loadingTask.onPassword = function (updateCallback, reason) {
                MP.actions.File.getPassword(updateCallback, reason);
              };

              loadingTask.onProgress = function (_ref) {
                var loaded = _ref.loaded,
                    total = _ref.total;
                MP.actions.Viewer.updateProgressBar(loaded / total);
              };

              loadingTask.onUnsupportedFeature = _this7.fallback.bind(_this7);
              return _context7.abrupt("return", loadingTask.promise.then(function (pdfDocument) {
                callback({
                  'error': false,
                  'msg': ''
                });

                _this7.load(pdfDocument);
              }, function (exception) {
                if (loadingTask !== _this7.pdfLoadingTask) {
                  return undefined;
                }

                var message = exception && exception.message;
                var loadingErrorMessage;
                callback({
                  'error': true,
                  'msg': message
                });
              }));

            case 17:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  download: function download() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$sourceEventType = _ref2.sourceEventType,
        sourceEventType = _ref2$sourceEventType === void 0 ? "download" : _ref2$sourceEventType;
  },
  save: function save() {
    var _this8 = this;

    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$sourceEventType = _ref3.sourceEventType,
        sourceEventType = _ref3$sourceEventType === void 0 ? "download" : _ref3$sourceEventType;

    if (this._saveInProgress) {
      return;
    }

    var url = this.baseUrl;
    var filename = this.contentDispositionFilename || (0, _ui_utils_metapdf.getPDFFileNameFromURL)(this.url);
    var downloadManager = this.downloadManager;

    downloadManager.onerror = function (err) {
      _this8.error("PDF failed to be saved: ".concat(err));
    };

    if (!this.pdfDocument || !this.downloadComplete) {
      this.download({
        sourceEventType: sourceEventType
      });
      return;
    }

    this._saveInProgress = true;
    this.pdfDocument.saveDocument(this.pdfDocument.annotationStorage).then(function (data) {
      var blob = new Blob([data], {
        type: "application/pdf"
      });
      downloadManager.download(blob, url, filename, sourceEventType);
    })["catch"](function () {
      _this8.download({
        sourceEventType: sourceEventType
      });
    })["finally"](function () {
      _this8._saveInProgress = false;
    });
  },
  _delayedFallback: function _delayedFallback(featureId) {
    var _this9 = this;

    this.externalServices.reportTelemetry({
      type: "unsupportedFeature",
      featureId: featureId
    });

    if (!this.triggerDelayedFallback) {
      this.triggerDelayedFallback = function () {
        _this9.fallback(featureId);

        _this9.triggerDelayedFallback = null;
      };
    }
  },
  fallback: function fallback(featureId) {
    this.externalServices.reportTelemetry({
      type: "unsupportedFeature",
      featureId: featureId
    });

    if (this.fellback) {
      return;
    }

    this.fellback = true;
    this.externalServices.fallback({
      featureId: featureId,
      url: this.baseUrl
    }, function response(download) {
      if (!download) {
        return;
      }

      PDFViewerApplication.download({
        sourceEventType: "download"
      });
    });
  },
  error: function error(message, moreInfo) {
    console.log(message, moreInfo);
  },
  progress: function progress(level) {},
  load: function load(pdfDocument) {
    var _this10 = this;

    this.pdfDocument = pdfDocument;
    this.pdfDocumentProperties.open();
    pdfDocument.getDownloadInfo().then(function () {
      _this10.downloadComplete = true;
      firstPagePromise.then(function () {
        _this10.eventBus.dispatch("documentloaded", {
          source: _this10
        });
      });
    });
    var pageLayoutPromise = pdfDocument.getPageLayout()["catch"](function () {});
    var pageModePromise = pdfDocument.getPageMode()["catch"](function () {});
    var openActionPromise = pdfDocument.getOpenAction()["catch"](function () {});
    MP.localSession.set('pages', this.pdfDocument.numPages);

    if (this.pdfDocument.pdfInfo) {
      if (this.pdfDocument.pdfInfo.encrypted) {}
    }

    var baseDocumentUrl;
    baseDocumentUrl = null;
    this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
    this.pdfDocumentProperties.setDocument(pdfDocument, this.url);
    var annotationStorage = pdfDocument.annotationStorage;

    annotationStorage.onSetModified = function () {
      window.addEventListener("beforeunload", beforeUnload);
    };

    annotationStorage.onResetModified = function () {
      window.removeEventListener("beforeunload", beforeUnload);
    };

    var pdfViewer = this.pdfViewer;
    pdfViewer.setDocument(pdfDocument);
    var firstPagePromise = pdfViewer.firstPagePromise,
        onePageRendered = pdfViewer.onePageRendered,
        pagesPromise = pdfViewer.pagesPromise;
    var pdfThumbnailViewer = this.pdfThumbnailViewer;

    if (pdfThumbnailViewer) {
      pdfThumbnailViewer.setDocument(pdfDocument);
    }

    var storedPromise = (this.store = new _view_history.ViewHistory(pdfDocument.fingerprint)).getMultiple({
      page: null,
      zoom: _ui_utils_metapdf.DEFAULT_SCALE_VALUE,
      scrollLeft: "0",
      scrollTop: "0",
      rotation: null,
      sidebarView: _pdf_sidebar_metapdf.SidebarView.UNKNOWN,
      scrollMode: _ui_utils_metapdf.ScrollMode.UNKNOWN,
      spreadMode: _ui_utils_metapdf.SpreadMode.UNKNOWN
    })["catch"](function () {
      return Object.create(null);
    });
    firstPagePromise.then(function (pdfPage) {
      Promise.all([_ui_utils_metapdf.animationStarted, storedPromise, pageLayoutPromise, pageModePromise, openActionPromise]).then( /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_ref4) {
          var _ref6, timeStamp, stored, pageLayout, pageMode, openAction, viewOnLoad, initialBookmark, zoom, hash, rotation, sidebarView, scrollMode, spreadMode;

          return _regenerator["default"].wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _ref6 = _slicedToArray(_ref4, 5), timeStamp = _ref6[0], stored = _ref6[1], pageLayout = _ref6[2], pageMode = _ref6[3], openAction = _ref6[4];
                  viewOnLoad = _app_options.AppOptions.get("viewOnLoad");

                  _this10._initializePdfHistory({
                    fingerprint: pdfDocument.fingerprint,
                    viewOnLoad: viewOnLoad,
                    initialDest: openAction && openAction.dest
                  });

                  initialBookmark = _this10.initialBookmark;
                  zoom = _app_options.AppOptions.get("defaultZoomValue");
                  hash = zoom ? "zoom=".concat(zoom) : null;
                  rotation = null;
                  sidebarView = _app_options.AppOptions.get("sidebarViewOnLoad");
                  scrollMode = _app_options.AppOptions.get("scrollModeOnLoad");
                  spreadMode = _app_options.AppOptions.get("spreadModeOnLoad");

                  if (stored.page && viewOnLoad !== ViewOnLoad.INITIAL) {
                    hash = "page=".concat(stored.page, "&zoom=").concat(zoom || stored.zoom, ",") + "".concat(stored.scrollLeft, ",").concat(stored.scrollTop);
                    rotation = parseInt(stored.rotation, 10);

                    if (sidebarView === _pdf_sidebar_metapdf.SidebarView.UNKNOWN) {
                      sidebarView = stored.sidebarView | 0;
                    }

                    if (scrollMode === _ui_utils_metapdf.ScrollMode.UNKNOWN) {
                      scrollMode = stored.scrollMode | 0;
                    }

                    if (spreadMode === _ui_utils_metapdf.SpreadMode.UNKNOWN) {
                      spreadMode = stored.spreadMode | 0;
                    }
                  }

                  if (pageMode && sidebarView === _pdf_sidebar_metapdf.SidebarView.UNKNOWN) {
                    sidebarView = apiPageModeToSidebarView(pageMode);
                  }

                  if (pageLayout && spreadMode === _ui_utils_metapdf.SpreadMode.UNKNOWN) {
                    spreadMode = apiPageLayoutToSpreadMode(pageLayout);
                  }

                  _this10.setInitialView(hash, {
                    rotation: rotation,
                    sidebarView: sidebarView,
                    scrollMode: scrollMode,
                    spreadMode: spreadMode
                  });

                  _this10.eventBus.dispatch("documentinit", {
                    source: _this10
                  });

                  if (!_this10.isViewerEmbedded) {
                    pdfViewer.focus();
                  }

                  _this10._initializePermissions(pdfDocument);

                  _context8.next = 19;
                  return Promise.race([pagesPromise, new Promise(function (resolve) {
                    setTimeout(resolve, FORCE_PAGES_LOADED_TIMEOUT);
                  })]);

                case 19:
                  if (!(!initialBookmark && !hash)) {
                    _context8.next = 21;
                    break;
                  }

                  return _context8.abrupt("return");

                case 21:
                  if (!pdfViewer.hasEqualPageSizes) {
                    _context8.next = 23;
                    break;
                  }

                  return _context8.abrupt("return");

                case 23:
                  _this10.initialBookmark = initialBookmark;
                  pdfViewer.currentScaleValue = pdfViewer.currentScaleValue;

                  _this10.setInitialView(hash);

                case 26:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8);
        }));

        return function (_x) {
          return _ref5.apply(this, arguments);
        };
      }())["catch"](function () {
        _this10.setInitialView();
      }).then(function () {
        pdfViewer.update();
      });
    });
    pagesPromise.then(function () {
      _this10._initializeAutoPrint(pdfDocument, openActionPromise);
    });
    onePageRendered.then(function () {
      pdfDocument.getOutline().then(function (outline) {
        MP.localSession.set('outline', outline);
      });
      pdfDocument.getAttachments().then(function (attachments) {});
      pdfViewer.optionalContentConfigPromise.then(function (optionalContentConfig) {
        _this10.pdfLayerViewer.render({
          optionalContentConfig: optionalContentConfig,
          pdfDocument: pdfDocument
        });
      });

      if ("requestIdleCallback" in window) {
        var callback = window.requestIdleCallback(function () {
          _this10._collectTelemetry(pdfDocument);

          _this10._idleCallbacks["delete"](callback);
        }, {
          timeout: 1000
        });

        _this10._idleCallbacks.add(callback);
      }

      _this10._initializeJavaScript(pdfDocument);
    });

    this._initializePageLabels(pdfDocument);

    this._initializeMetadata(pdfDocument);
  },
  _initializeJavaScript: function _initializeJavaScript(pdfDocument) {
    var _this11 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var objects, scripting, _yield$pdfDocument$ge, info, metadata, contentDispositionFilename, dispatchEventName, calculationOrder, _yield$pdfDocument$ge2, length, filename;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return pdfDocument.getFieldObjects();

            case 2:
              objects = _context9.sent;

              if (!(pdfDocument !== _this11.pdfDocument)) {
                _context9.next = 5;
                break;
              }

              return _context9.abrupt("return");

            case 5:
              if (!(!objects || !_app_options.AppOptions.get("enableScripting"))) {
                _context9.next = 7;
                break;
              }

              return _context9.abrupt("return");

            case 7:
              scripting = _this11.externalServices.scripting;
              _context9.next = 10;
              return pdfDocument.getMetadata();

            case 10:
              _yield$pdfDocument$ge = _context9.sent;
              info = _yield$pdfDocument$ge.info;
              metadata = _yield$pdfDocument$ge.metadata;
              contentDispositionFilename = _yield$pdfDocument$ge.contentDispositionFilename;
              window.addEventListener("updateFromSandbox", function (event) {
                var detail = event.detail;
                var id = detail.id;

                if (!id) {
                  switch (detail.command) {
                    case "alert":
                      window.alert(detail.value);
                      break;

                    case "clear":
                      console.clear();
                      break;

                    case "error":
                      console.error(detail.value);
                      break;

                    case "layout":
                      _this11.pdfViewer.spreadMode = apiPageLayoutToSpreadMode(detail.value);
                      return;

                    case "page-num":
                      _this11.pdfViewer.currentPageNumber = detail.value + 1;
                      return;

                    case "print":
                      _this11.triggerPrinting();

                      return;

                    case "println":
                      console.log(detail.value);
                      break;

                    case "zoom":
                      if (typeof detail.value === "string") {
                        _this11.pdfViewer.currentScaleValue = detail.value;
                      } else {
                        _this11.pdfViewer.currentScale = detail.value;
                      }

                      return;
                  }

                  return;
                }

                var element = document.getElementById(id);

                if (element) {
                  element.dispatchEvent(new CustomEvent("updateFromSandbox", {
                    detail: detail
                  }));
                } else {
                  var value = detail.value;

                  if (value !== undefined && value !== null) {
                    pdfDocument.annotationStorage.setValue(id, detail.value);
                  }
                }
              });
              window.addEventListener("dispatchEventInSandbox", function (event) {
                scripting.dispatchEventInSandbox(event.detail);
              });
              dispatchEventName = (0, _ui_utils_metapdf.generateRandomStringForSandbox)(objects);
              calculationOrder = [];
              _context9.next = 20;
              return pdfDocument.getDownloadInfo();

            case 20:
              _yield$pdfDocument$ge2 = _context9.sent;
              length = _yield$pdfDocument$ge2.length;
              filename = contentDispositionFilename || (0, _ui_utils_metapdf.getPDFFileNameFromURL)(_this11.url);
              scripting.createSandbox({
                objects: objects,
                dispatchEventName: dispatchEventName,
                calculationOrder: calculationOrder,
                docInfo: _objectSpread(_objectSpread({}, info), {}, {
                  baseURL: _this11.baseUrl,
                  filesize: length,
                  filename: filename,
                  metadata: metadata,
                  numPages: pdfDocument.numPages,
                  URL: _this11.url
                })
              });

            case 24:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  _collectTelemetry: function _collectTelemetry(pdfDocument) {
    var _this12 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var markInfo, tagged;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _this12.pdfDocument.getMarkInfo();

            case 2:
              markInfo = _context10.sent;

              if (!(pdfDocument !== _this12.pdfDocument)) {
                _context10.next = 5;
                break;
              }

              return _context10.abrupt("return");

            case 5:
              tagged = (markInfo === null || markInfo === void 0 ? void 0 : markInfo.Marked) || false;

              _this12.externalServices.reportTelemetry({
                type: "tagged",
                tagged: tagged
              });

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  _initializeAutoPrint: function _initializeAutoPrint(pdfDocument, openActionPromise) {
    var _this13 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var _yield$Promise$all, _yield$Promise$all2, openAction, javaScript, triggerAutoPrint, _iterator2, _step2, js;

      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return Promise.all([openActionPromise, pdfDocument.getJavaScript()]);

            case 2:
              _yield$Promise$all = _context11.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              openAction = _yield$Promise$all2[0];
              javaScript = _yield$Promise$all2[1];

              if (!(pdfDocument !== _this13.pdfDocument)) {
                _context11.next = 8;
                break;
              }

              return _context11.abrupt("return");

            case 8:
              triggerAutoPrint = false;

              if (openAction && openAction.action === "Print") {
                triggerAutoPrint = true;
              }

              if (!javaScript) {
                _context11.next = 31;
                break;
              }

              javaScript.some(function (js) {
                if (!js) {
                  return false;
                }

                console.warn("Warning: JavaScript is not supported");

                _this13._delayedFallback(_pdf.UNSUPPORTED_FEATURES.javaScript);

                return true;
              });

              if (triggerAutoPrint) {
                _context11.next = 31;
                break;
              }

              _iterator2 = _createForOfIteratorHelper(javaScript);
              _context11.prev = 14;

              _iterator2.s();

            case 16:
              if ((_step2 = _iterator2.n()).done) {
                _context11.next = 23;
                break;
              }

              js = _step2.value;

              if (!(js && _ui_utils_metapdf.AutoPrintRegExp.test(js))) {
                _context11.next = 21;
                break;
              }

              triggerAutoPrint = true;
              return _context11.abrupt("break", 23);

            case 21:
              _context11.next = 16;
              break;

            case 23:
              _context11.next = 28;
              break;

            case 25:
              _context11.prev = 25;
              _context11.t0 = _context11["catch"](14);

              _iterator2.e(_context11.t0);

            case 28:
              _context11.prev = 28;

              _iterator2.f();

              return _context11.finish(28);

            case 31:
              if (triggerAutoPrint) {
                setTimeout(function () {
                  _this13.triggerPrinting();
                });
              }

            case 32:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[14, 25, 28, 31]]);
    }))();
  },
  _initializeMetadata: function _initializeMetadata(pdfDocument) {
    var _this14 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var _yield$pdfDocument$ge3, info, metadata, contentDispositionFilename, pdfTitle, infoTitle, versionId, generatorId, producer, formType;

      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return pdfDocument.getMetadata();

            case 2:
              _yield$pdfDocument$ge3 = _context12.sent;
              info = _yield$pdfDocument$ge3.info;
              metadata = _yield$pdfDocument$ge3.metadata;
              contentDispositionFilename = _yield$pdfDocument$ge3.contentDispositionFilename;
              console.log('PDF ' + pdfDocument.fingerprint + ' [' + info.PDFFormatVersion + ' ' + (info.Producer || '-').trim() + ' / ' + (info.Creator || '-').trim() + ']' + ' (PDF.js: ' + (_pdf.version || '-') + (_app_options.AppOptions.get('enableWebGL') ? ' [WebGL]' : '') + ')');
              infoTitle = info && info.Title;

              if (infoTitle) {
                pdfTitle = infoTitle;
              }

              versionId = "other";

              if (KNOWN_VERSIONS.includes(info.PDFFormatVersion)) {
                versionId = "v".concat(info.PDFFormatVersion.replace(".", "_"));
              }

              generatorId = "other";

              if (info.Producer) {
                producer = info.Producer.toLowerCase();
                KNOWN_GENERATORS.some(function (generator) {
                  if (!producer.includes(generator)) {
                    return false;
                  }

                  generatorId = generator.replace(/[ .-]/g, "_");
                  return true;
                });
              }

              formType = null;

              if (info.IsXFAPresent) {
                formType = "xfa";
              } else if (info.IsAcroFormPresent) {
                formType = "acroform";
              }

              _this14.externalServices.reportTelemetry({
                type: "documentInfo",
                version: versionId,
                generator: generatorId,
                formType: formType
              });

            case 16:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
  },
  _initializePageLabels: function _initializePageLabels(pdfDocument) {
    var _this15 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var labels, numLabels, i, pdfViewer, pdfThumbnailViewer, toolbar;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return pdfDocument.getPageLabels();

            case 2:
              labels = _context13.sent;

              if (!(pdfDocument !== _this15.pdfDocument)) {
                _context13.next = 5;
                break;
              }

              return _context13.abrupt("return");

            case 5:
              if (!(!labels || _app_options.AppOptions.get("disablePageLabels"))) {
                _context13.next = 7;
                break;
              }

              return _context13.abrupt("return");

            case 7:
              numLabels = labels.length;

              if (!(numLabels !== _this15.pagesCount)) {
                _context13.next = 11;
                break;
              }

              console.error("The number of Page Labels does not match the number of pages in the document.");
              return _context13.abrupt("return");

            case 11:
              i = 0;

              while (i < numLabels && labels[i] === (i + 1).toString()) {
                i++;
              }

              if (!(i === numLabels)) {
                _context13.next = 15;
                break;
              }

              return _context13.abrupt("return");

            case 15:
              pdfViewer = _this15.pdfViewer, pdfThumbnailViewer = _this15.pdfThumbnailViewer, toolbar = _this15.toolbar;
              pdfViewer.setPageLabels(labels);

              if (pdfThumbnailViewer) {
                pdfThumbnailViewer.setPageLabels(labels);
              }

            case 18:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  },
  _initializePdfHistory: function _initializePdfHistory(_ref7) {
    var fingerprint = _ref7.fingerprint,
        viewOnLoad = _ref7.viewOnLoad,
        _ref7$initialDest = _ref7.initialDest,
        initialDest = _ref7$initialDest === void 0 ? null : _ref7$initialDest;

    if (this.isViewerEmbedded || _app_options.AppOptions.get("disableHistory")) {
      return;
    }

    this.pdfHistory.initialize({
      fingerprint: fingerprint,
      resetHistory: viewOnLoad === ViewOnLoad.INITIAL,
      updateUrl: _app_options.AppOptions.get("historyUpdateUrl")
    });

    if (this.pdfHistory.initialBookmark) {
      this.initialBookmark = this.pdfHistory.initialBookmark;
      this.initialRotation = this.pdfHistory.initialRotation;
    }

    if (initialDest && !this.initialBookmark && viewOnLoad === ViewOnLoad.UNKNOWN) {
      this.initialBookmark = JSON.stringify(initialDest);
      this.pdfHistory.push({
        explicitDest: initialDest,
        pageNumber: null
      });
    }
  },
  _initializePermissions: function _initializePermissions(pdfDocument) {
    var _this16 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var permissions;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return pdfDocument.getPermissions();

            case 2:
              permissions = _context14.sent;

              if (!(pdfDocument !== _this16.pdfDocument)) {
                _context14.next = 5;
                break;
              }

              return _context14.abrupt("return");

            case 5:
              if (!(!permissions || !_app_options.AppOptions.get("enablePermissions"))) {
                _context14.next = 7;
                break;
              }

              return _context14.abrupt("return");

            case 7:
              if (!permissions.includes(_pdf.PermissionFlag.COPY)) {
                _this16.appConfig.viewerContainer.classList.add(ENABLE_PERMISSIONS_CLASS);
              }

            case 8:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }))();
  },
  setInitialView: function setInitialView(storedHash) {
    var _this17 = this;

    var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        rotation = _ref8.rotation,
        sidebarView = _ref8.sidebarView,
        scrollMode = _ref8.scrollMode,
        spreadMode = _ref8.spreadMode;

    var setRotation = function setRotation(angle) {
      if ((0, _ui_utils_metapdf.isValidRotation)(angle)) {
        _this17.pdfViewer.pagesRotation = angle;
      }
    };

    var setViewerModes = function setViewerModes(scroll, spread) {
      if ((0, _ui_utils_metapdf.isValidScrollMode)(scroll)) {
        _this17.pdfViewer.scrollMode = scroll;
      }

      if ((0, _ui_utils_metapdf.isValidSpreadMode)(spread)) {
        _this17.pdfViewer.spreadMode = spread;
      }
    };

    this.isInitialViewSet = true;
    setViewerModes(scrollMode, spreadMode);
    MP.localSession.set('page', 1);
    this.pdfViewer.currentPageNumber = 1;

    if (this.initialDestination) {
      this.pdfLinkService.navigateTo(this.initialDestination);
      this.initialDestination = null;
    } else if (this.initialBookmark) {
      setRotation(this.initialRotation);
      delete this.initialRotation;
      this.pdfLinkService.setHash(this.initialBookmark);
      this.initialBookmark = null;
    } else if (storedHash) {
      setRotation(rotation);
      if (!this.pdfViewer.currentScaleValue) this.pdfViewer.currentScaleValue = _ui_utils_metapdf.DEFAULT_SCALE_VALUE;
      this.pdfLinkService.setHash(storedHash);
    }

    if (!this.pdfViewer.currentScaleValue) {
      this.pdfViewer.currentScaleValue = _ui_utils_metapdf.DEFAULT_SCALE_VALUE;
    }
  },
  cleanup: function cleanup() {
    if (!this.pdfDocument) {
      return;
    }

    this.pdfViewer.cleanup();

    if (this.pdfThumbnailViewer) {
      this.pdfThumbnailViewer.cleanup();
    }

    if (this.pdfViewer.renderer !== _ui_utils_metapdf.RendererType.SVG) {
      this.pdfDocument.cleanup();
    }
  },
  forceRendering: function forceRendering() {
    this.pdfRenderingQueue.printing = !!this.printService;
    this.pdfRenderingQueue.isThumbnailViewEnabled = MP.$('#mp-thumbnails-tab').hasClass('active');
    this.pdfRenderingQueue.renderHighestPriority();
  },
  beforePrint: function beforePrint() {
    var _this18 = this;

    if (this.printService) {
      return;
    }

    if (!this.supportsPrinting) {
      this.l10n.get("printing_not_supported", null, "Warning: Printing is not fully supported by this browser.").then(function (printMessage) {
        _this18.error(printMessage);
      });
      return;
    }

    if (!this.pdfViewer.pageViewsReady) {
      this.l10n.get("printing_not_ready", null, "Warning: The PDF is not fully loaded for printing.").then(function (notReadyMessage) {
        window.alert(notReadyMessage);
      });
      return;
    }

    MP.actions.Viewer.showProgressBar();
    MP.actions.Viewer.updateProgressBar(0);

    if (!MP.localSession.get('printTriggered')) {
      MP.localSession.set({
        printTriggered: true,
        printAnnotations: true,
        printAnnotationList: false
      });
    }

    var pagesOverview = this.pdfViewer.getPagesOverview();
    var printContainer = this.appConfig.printContainer;

    var printResolution = _app_options.AppOptions.get("printResolution");

    var optionalContentConfigPromise = this.pdfViewer.optionalContentConfigPromise;
    var printService = PDFPrintServiceFactory.instance.createPrintService(this.pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, this.l10n);
    this.printService = printService;
    this.forceRendering();
    printService.layout();
    this.externalServices.reportTelemetry({
      type: "print"
    });
  },
  afterPrint: function afterPrint() {
    if (this.printService) {
      this.printService.destroy();
      this.printService = null;

      if (this.pdfDocument) {
        this.pdfDocument.annotationStorage.resetModified();
      }
    }

    this.forceRendering();
    var body = document.querySelector('body');
    body.setAttribute('data-pdfjsprinting', false);
    MP.$('#mp-print-container').html('');
    MP.localSession.set({
      printTriggered: false,
      printAnnotations: false,
      printAnnotationList: false
    });
  },
  rotatePages: function rotatePages(delta) {
    if (!this.pdfDocument) {
      return;
    }

    var newRotation = (this.pdfViewer.pagesRotation + 360 + delta) % 360;
    this.pdfViewer.pagesRotation = newRotation;
  },
  requestPresentationMode: function requestPresentationMode() {
    if (!this.pdfPresentationMode) {
      return;
    }

    this.pdfPresentationMode.request();
  },
  triggerPrinting: function triggerPrinting() {
    if (!this.supportsPrinting) {
      return;
    }

    window.print();
  },
  bindEvents: function bindEvents() {
    var eventBus = this.eventBus,
        _boundEvents = this._boundEvents;
    _boundEvents.beforePrint = this.beforePrint.bind(this);
    _boundEvents.afterPrint = this.afterPrint.bind(this);

    eventBus._on("resize", webViewerResize);

    eventBus._on("hashchange", webViewerHashchange);

    eventBus._on("beforeprint", _boundEvents.beforePrint);

    eventBus._on("afterprint", _boundEvents.afterPrint);

    eventBus._on("pagerendered", webViewerPageRendered);

    eventBus._on("updateviewarea", webViewerUpdateViewarea);

    eventBus._on("pagechanging", webViewerPageChanging);

    eventBus._on("scalechanging", webViewerScaleChanging);

    eventBus._on("rotationchanging", webViewerRotationChanging);

    eventBus._on("sidebarviewchanged", webViewerSidebarViewChanged);

    eventBus._on("pagemode", webViewerPageMode);

    eventBus._on("namedaction", webViewerNamedAction);

    eventBus._on("presentationmodechanged", webViewerPresentationModeChanged);

    eventBus._on("presentationmode", webViewerPresentationMode);

    eventBus._on("print", webViewerPrint);

    eventBus._on("download", webViewerDownload);

    eventBus._on("save", webViewerSave);

    eventBus._on("firstpage", webViewerFirstPage);

    eventBus._on("lastpage", webViewerLastPage);

    eventBus._on("nextpage", webViewerNextPage);

    eventBus._on("previouspage", webViewerPreviousPage);

    eventBus._on("zoomin", webViewerZoomIn);

    eventBus._on("zoomout", webViewerZoomOut);

    eventBus._on("zoomreset", webViewerZoomReset);

    eventBus._on("pagenumberchanged", webViewerPageNumberChanged);

    eventBus._on("scalechanged", webViewerScaleChanged);

    eventBus._on("rotatecw", webViewerRotateCw);

    eventBus._on("rotateccw", webViewerRotateCcw);

    eventBus._on("optionalcontentconfig", webViewerOptionalContentConfig);

    eventBus._on("switchscrollmode", webViewerSwitchScrollMode);

    eventBus._on("scrollmodechanged", webViewerScrollModeChanged);

    eventBus._on("switchspreadmode", webViewerSwitchSpreadMode);

    eventBus._on("spreadmodechanged", webViewerSpreadModeChanged);

    eventBus._on("documentproperties", webViewerDocumentProperties);

    eventBus._on("find", webViewerFind);

    eventBus._on("findfromurlhash", webViewerFindFromUrlHash);

    eventBus._on("updatefindmatchescount", webViewerUpdateFindMatchesCount);

    eventBus._on("updatefindcontrolstate", webViewerUpdateFindControlState);

    if (_app_options.AppOptions.get("pdfBug")) {
      _boundEvents.reportPageStatsPDFBug = reportPageStatsPDFBug;

      eventBus._on("pagerendered", _boundEvents.reportPageStatsPDFBug);

      eventBus._on("pagechanging", _boundEvents.reportPageStatsPDFBug);
    }
  },
  bindWindowEvents: function bindWindowEvents() {
    var eventBus = this.eventBus,
        _boundEvents = this._boundEvents;

    _boundEvents.windowResize = function () {
      eventBus.dispatch("resize", {
        source: window
      });
    };

    _boundEvents.windowHashChange = function () {
      eventBus.dispatch("hashchange", {
        source: window,
        hash: document.location.hash.substring(1)
      });
    };

    _boundEvents.windowBeforePrint = function () {
      eventBus.dispatch("beforeprint", {
        source: window
      });
    };

    _boundEvents.windowAfterPrint = function () {
      eventBus.dispatch("afterprint", {
        source: window
      });
    };

    window.addEventListener("visibilitychange", webViewerVisibilityChange);
    window.addEventListener("wheel", webViewerWheel, {
      passive: false
    });
    window.addEventListener("touchstart", webViewerTouchStart, {
      passive: false
    });
    window.addEventListener("keyup", webViewerKeyUp);
    window.addEventListener("resize", _boundEvents.windowResize);
    window.addEventListener("hashchange", _boundEvents.windowHashChange);
    window.addEventListener("beforeprint", _boundEvents.windowBeforePrint);
    window.addEventListener("afterprint", _boundEvents.windowAfterPrint);
  },
  unbindEvents: function unbindEvents() {
    var eventBus = this.eventBus,
        _boundEvents = this._boundEvents;

    eventBus._off("resize", webViewerResize);

    eventBus._off("hashchange", webViewerHashchange);

    eventBus._off("beforeprint", _boundEvents.beforePrint);

    eventBus._off("afterprint", _boundEvents.afterPrint);

    eventBus._off("pagerendered", webViewerPageRendered);

    eventBus._off("updateviewarea", webViewerUpdateViewarea);

    eventBus._off("pagechanging", webViewerPageChanging);

    eventBus._off("scalechanging", webViewerScaleChanging);

    eventBus._off("rotationchanging", webViewerRotationChanging);

    eventBus._off("sidebarviewchanged", webViewerSidebarViewChanged);

    eventBus._off("pagemode", webViewerPageMode);

    eventBus._off("namedaction", webViewerNamedAction);

    eventBus._off("presentationmodechanged", webViewerPresentationModeChanged);

    eventBus._off("presentationmode", webViewerPresentationMode);

    eventBus._off("print", webViewerPrint);

    eventBus._off("download", webViewerDownload);

    eventBus._off("save", webViewerSave);

    eventBus._off("firstpage", webViewerFirstPage);

    eventBus._off("lastpage", webViewerLastPage);

    eventBus._off("nextpage", webViewerNextPage);

    eventBus._off("previouspage", webViewerPreviousPage);

    eventBus._off("zoomin", webViewerZoomIn);

    eventBus._off("zoomout", webViewerZoomOut);

    eventBus._off("zoomreset", webViewerZoomReset);

    eventBus._off("pagenumberchanged", webViewerPageNumberChanged);

    eventBus._off("scalechanged", webViewerScaleChanged);

    eventBus._off("rotatecw", webViewerRotateCw);

    eventBus._off("rotateccw", webViewerRotateCcw);

    eventBus._off("optionalcontentconfig", webViewerOptionalContentConfig);

    eventBus._off("switchscrollmode", webViewerSwitchScrollMode);

    eventBus._off("scrollmodechanged", webViewerScrollModeChanged);

    eventBus._off("switchspreadmode", webViewerSwitchSpreadMode);

    eventBus._off("spreadmodechanged", webViewerSpreadModeChanged);

    eventBus._off("documentproperties", webViewerDocumentProperties);

    eventBus._off("find", webViewerFind);

    eventBus._off("findfromurlhash", webViewerFindFromUrlHash);

    eventBus._off("updatefindmatchescount", webViewerUpdateFindMatchesCount);

    eventBus._off("updatefindcontrolstate", webViewerUpdateFindControlState);

    if (_boundEvents.reportPageStatsPDFBug) {
      eventBus._off("pagerendered", _boundEvents.reportPageStatsPDFBug);

      eventBus._off("pagechanging", _boundEvents.reportPageStatsPDFBug);

      _boundEvents.reportPageStatsPDFBug = null;
    }

    eventBus._off("fileinputchange", webViewerFileInputChange);

    eventBus._off("openfile", webViewerOpenFile);

    _boundEvents.beforePrint = null;
    _boundEvents.afterPrint = null;
  },
  unbindWindowEvents: function unbindWindowEvents() {
    var _boundEvents = this._boundEvents;
    window.removeEventListener("visibilitychange", webViewerVisibilityChange);
    window.removeEventListener("wheel", webViewerWheel, {
      passive: false
    });
    window.removeEventListener("touchstart", webViewerTouchStart, {
      passive: false
    });
    window.removeEventListener("click", webViewerClick);
    window.removeEventListener("keydown", webViewerKeyDown);
    window.removeEventListener("keyup", webViewerKeyUp);
    window.removeEventListener("resize", _boundEvents.windowResize);
    window.removeEventListener("hashchange", _boundEvents.windowHashChange);
    window.removeEventListener("beforeprint", _boundEvents.windowBeforePrint);
    window.removeEventListener("afterprint", _boundEvents.windowAfterPrint);
    _boundEvents.windowResize = null;
    _boundEvents.windowHashChange = null;
    _boundEvents.windowBeforePrint = null;
    _boundEvents.windowAfterPrint = null;
  },
  accumulateWheelTicks: function accumulateWheelTicks(ticks) {
    if (this._wheelUnusedTicks > 0 && ticks < 0 || this._wheelUnusedTicks < 0 && ticks > 0) {
      this._wheelUnusedTicks = 0;
    }

    this._wheelUnusedTicks += ticks;
    var wholeTicks = Math.sign(this._wheelUnusedTicks) * Math.floor(Math.abs(this._wheelUnusedTicks));
    this._wheelUnusedTicks -= wholeTicks;
    return wholeTicks;
  }
};
exports.PDFViewerApplication = PDFViewerApplication;
var validateFileURL;
{
  var HOSTED_VIEWER_ORIGINS = ["null", "http://mozilla.github.io", "https://mozilla.github.io"];

  validateFileURL = function validateFileURL(file) {
    if (file === undefined) {
      return;
    }

    try {
      var viewerOrigin = new URL(window.location.href).origin || "null";

      if (HOSTED_VIEWER_ORIGINS.includes(viewerOrigin)) {
        return;
      }

      var _URL = new URL(file, window.location.href),
          origin = _URL.origin,
          protocol = _URL.protocol;

      if (origin !== viewerOrigin && protocol !== "blob:") {
        throw new Error("file origin does not match viewer_metapdf's");
      }
    } catch (ex) {
      var message = ex && ex.message;
      PDFViewerApplication.l10n.get("loading_error", null, "An error occurred while loading the PDF.").then(function (loadingErrorMessage) {
        PDFViewerApplication.error(loadingErrorMessage, {
          message: message
        });
      });
      throw ex;
    }
  };
}

function loadFakeWorker() {
  return _loadFakeWorker.apply(this, arguments);
}

function _loadFakeWorker() {
  _loadFakeWorker = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            if (!_pdf.GlobalWorkerOptions.workerSrc) {
              _pdf.GlobalWorkerOptions.workerSrc = _app_options.AppOptions.get("workerSrc");
            }

            return _context15.abrupt("return", (0, _pdf.loadScript)(_pdf.PDFWorker.getWorkerSrc()));

          case 2:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _loadFakeWorker.apply(this, arguments);
}

function loadAndEnablePDFBug(enabledTabs) {
  var appConfig = PDFViewerApplication.appConfig;
  return (0, _pdf.loadScript)(appConfig.debuggerScriptPath).then(function () {
    PDFBug.enable(enabledTabs);
    PDFBug.init({
      OPS: _pdf.OPS
    }, appConfig.mainContainer);
  });
}

function reportPageStatsPDFBug(_ref9) {
  var pageNumber = _ref9.pageNumber;

  if (typeof Stats === "undefined" || !Stats.enabled) {
    return;
  }

  var pageView = PDFViewerApplication.pdfViewer.getPageView(pageNumber - 1);
  var pageStats = pageView && pageView.pdfPage && pageView.pdfPage.stats;

  if (!pageStats) {
    return;
  }

  Stats.add(pageNumber, pageStats);
}

function webViewerInitialized() {
  var appConfig = PDFViewerApplication.appConfig;
  var file;
  var queryString = document.location.search.substring(1);
  var params = (0, _ui_utils_metapdf.parseQueryString)(queryString);
  file = "file" in params ? params.file : _app_options.AppOptions.get("defaultUrl");
  validateFileURL(file);

  if (!PDFViewerApplication.supportsDocumentFonts) {
    _app_options.AppOptions.set("disableFontFace", true);

    PDFViewerApplication.l10n.get("web_fonts_disabled", null, "Web fonts are disabled: unable to use embedded PDF fonts.").then(function (msg) {
      console.warn(msg);
    });
  }

  if (!PDFViewerApplication.supportsFullscreen) {
    appConfig.toolbar.presentationModeButton.classList.add('mp-hidden');
    appConfig.secondaryToolbar.presentationModeButton.classList.add('mp-hidden');
  }

  if (PDFViewerApplication.supportsIntegratedFind) {
    appConfig.toolbar.viewFind.classList.add('mp-hidden');
  }

  try {
    webViewerOpenFileViaURL(file);
  } catch (reason) {
    PDFViewerApplication.l10n.get("loading_error", null, "An error occurred while loading the PDF.").then(function (msg) {
      PDFViewerApplication.error(msg, reason);
    });
  }
}

var webViewerOpenFileViaURL;
{
  webViewerOpenFileViaURL = function webViewerOpenFileViaURL(file) {
    if (file && file.lastIndexOf("file:", 0) === 0) {
      PDFViewerApplication.setTitleUsingUrl(file);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        PDFViewerApplication.open(new Uint8Array(xhr.response));
      };

      xhr.open("GET", file);
      xhr.responseType = "arraybuffer";
      xhr.send();
      return;
    }

    if (file) {
      PDFViewerApplication.open(file);
    }
  };
}

function webViewerResetPermissions() {
  var appConfig = PDFViewerApplication.appConfig;

  if (!appConfig) {
    return;
  }
}

function webViewerPageRendered(_ref10) {
  var pageNumber = _ref10.pageNumber,
      timestamp = _ref10.timestamp,
      error = _ref10.error;

  if (error) {
    PDFViewerApplication.l10n.get("rendering_error", null, "An error occurred while rendering the page.").then(function (msg) {
      PDFViewerApplication.error(msg, error);
    });
  }
}

function webViewerPageMode(_ref11) {
  var mode = _ref11.mode;
  var view;

  switch (mode) {
    case "thumbs":
      view = _pdf_sidebar_metapdf.SidebarView.THUMBS;
      break;

    case "bookmarks":
    case "outline":
      view = _pdf_sidebar_metapdf.SidebarView.OUTLINE;
      break;

    case "attachments":
      view = _pdf_sidebar_metapdf.SidebarView.ATTACHMENTS;
      break;

    case "layers":
      view = _pdf_sidebar_metapdf.SidebarView.LAYERS;
      break;

    case "none":
      view = _pdf_sidebar_metapdf.SidebarView.NONE;
      break;

    default:
      console.error('Invalid "pagemode" hash parameter: ' + mode);
      return;
  }

  PDFViewerApplication.pdfSidebar.switchView(view, true);
}

function webViewerNamedAction(evt) {
  switch (evt.action) {
    case "GoToPage":
      PDFViewerApplication.appConfig.toolbar.pageNumber.select();
      break;

    case "Find":
      if (!PDFViewerApplication.supportsIntegratedFind) {
        PDFViewerApplication.findBar.toggle();
      }

      break;

    case "Print":
      PDFViewerApplication.triggerPrinting();
      break;

    case "SaveAs":
      webViewerSave();
      break;
  }
}

function webViewerPresentationModeChanged(_ref12) {
  var active = _ref12.active,
      switchInProgress = _ref12.switchInProgress;
  var state = _ui_utils_metapdf.PresentationModeState.NORMAL;

  if (switchInProgress) {
    state = _ui_utils_metapdf.PresentationModeState.CHANGING;
  } else if (active) {
    state = _ui_utils_metapdf.PresentationModeState.FULLSCREEN;
  }

  PDFViewerApplication.pdfViewer.presentationModeState = state;
}

function webViewerSidebarViewChanged(evt) {
  PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled = PDFViewerApplication.pdfSidebar.isThumbnailViewVisible;
  var store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.set("sidebarView", evt.view)["catch"](function () {});
  }
}

function webViewerUpdateViewarea(evt) {
  var location = evt.location,
      store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.setMultiple({
      page: location.pageNumber,
      zoom: location.scale,
      scrollLeft: location.left,
      scrollTop: location.top,
      rotation: location.rotation
    })["catch"](function () {});
  }

  var href = PDFViewerApplication.pdfLinkService.getAnchorUrl(location.pdfOpenParams);
}

function webViewerScrollModeChanged(evt) {
  var store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.set("scrollMode", evt.mode)["catch"](function () {});
  }
}

function webViewerSpreadModeChanged(evt) {
  var store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.set("spreadMode", evt.mode)["catch"](function () {});
  }
}

function webViewerResize() {
  var pdfDocument = PDFViewerApplication.pdfDocument,
      pdfViewer = PDFViewerApplication.pdfViewer;

  if (!pdfDocument) {
    return;
  }

  var currentScaleValue = pdfViewer.currentScaleValue;

  if (currentScaleValue === "auto" || currentScaleValue === "page-fit" || currentScaleValue === "page-width") {
    pdfViewer.currentScaleValue = currentScaleValue;
  }

  pdfViewer.update();
  MP.actions.Viewer.setMarginLeft();
}

function webViewerHashchange(evt) {
  var hash = evt.hash;

  if (!hash) {
    return;
  }

  if (!PDFViewerApplication.isInitialViewSet) {
    PDFViewerApplication.initialBookmark = hash;
  } else if (!PDFViewerApplication.pdfHistory.popStateInProgress) {
    PDFViewerApplication.pdfLinkService.setHash(hash);
  }
}

function webViewerPresentationMode() {
  PDFViewerApplication.requestPresentationMode();
}

function webViewerPrint() {
  PDFViewerApplication.triggerPrinting();
}

function webViewerDownloadOrSave(sourceEventType) {
  if (PDFViewerApplication.pdfDocument && PDFViewerApplication.pdfDocument.annotationStorage.size > 0) {
    PDFViewerApplication.save({
      sourceEventType: sourceEventType
    });
  } else {
    PDFViewerApplication.download({
      sourceEventType: sourceEventType
    });
  }
}

function webViewerDownload() {
  webViewerDownloadOrSave("download");
}

function webViewerSave() {
  webViewerDownloadOrSave("save");
}

function webViewerFirstPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = 1;
  }
}

function webViewerLastPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = PDFViewerApplication.pagesCount;
  }
}

function webViewerNextPage() {
  PDFViewerApplication.page++;
}

function webViewerPreviousPage() {
  PDFViewerApplication.page--;
}

function webViewerZoomIn() {
  PDFViewerApplication.zoomIn();
}

function webViewerZoomOut() {
  PDFViewerApplication.zoomOut();
}

function webViewerZoomReset() {
  PDFViewerApplication.zoomReset();
}

function webViewerPageNumberChanged(evt) {
  var pdfViewer = PDFViewerApplication.pdfViewer;

  if (evt.value !== "") {
    PDFViewerApplication.pdfLinkService.goToPage(evt.value);
  }

  if (evt.value !== pdfViewer.currentPageNumber.toString() && evt.value !== pdfViewer.currentPageLabel) {
    PDFViewerApplication.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  }
}

function webViewerScaleChanged(evt) {
  PDFViewerApplication.pdfViewer.currentScaleValue = evt.value;
}

function webViewerRotateCw() {
  PDFViewerApplication.rotatePages(90);
}

function webViewerRotateCcw() {
  PDFViewerApplication.rotatePages(-90);
}

function webViewerOptionalContentConfig(evt) {
  PDFViewerApplication.pdfViewer.optionalContentConfigPromise = evt.promise;
}

function webViewerSwitchScrollMode(evt) {
  PDFViewerApplication.pdfViewer.scrollMode = evt.mode;
}

function webViewerSwitchSpreadMode(evt) {
  PDFViewerApplication.pdfViewer.spreadMode = evt.mode;
}

function webViewerDocumentProperties() {
  PDFViewerApplication.pdfDocumentProperties.open();
}

function webViewerFind(evt) {
  PDFViewerApplication.findController.executeCommand("find" + evt.type, {
    query: evt.query,
    phraseSearch: evt.phraseSearch,
    caseSensitive: evt.caseSensitive,
    entireWord: evt.entireWord,
    highlightAll: evt.highlightAll,
    findPrevious: evt.findPrevious
  });
}

function webViewerFindFromUrlHash(evt) {
  PDFViewerApplication.findController.executeCommand("find", {
    query: evt.query,
    phraseSearch: evt.phraseSearch,
    caseSensitive: false,
    entireWord: false,
    highlightAll: true,
    findPrevious: false
  });
}

function webViewerUpdateFindMatchesCount(_ref13) {
  var matchesCount = _ref13.matchesCount;

  if (PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.externalServices.updateFindMatchesCount(matchesCount);
  } else {
    PDFViewerApplication.findBar.updateResultsCount(matchesCount);
  }
}

function webViewerUpdateFindControlState(_ref14) {
  var state = _ref14.state,
      previous = _ref14.previous,
      matchesCount = _ref14.matchesCount,
      rawQuery = _ref14.rawQuery;

  if (PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.externalServices.updateFindControlState({
      result: state,
      findPrevious: previous,
      matchesCount: matchesCount,
      rawQuery: rawQuery
    });
  } else {
    PDFViewerApplication.findBar.updateUIState(state, previous, matchesCount);
  }
}

function webViewerScaleChanging(evt) {
  PDFViewerApplication.pdfViewer.update();
}

function webViewerRotationChanging(evt) {
  PDFViewerApplication.pdfThumbnailViewer.pagesRotation = evt.pagesRotation;
  PDFViewerApplication.forceRendering();
  PDFViewerApplication.pdfViewer.currentPageNumber = evt.pageNumber;
}

function webViewerPageChanging(_ref15) {
  var pageNumber = _ref15.pageNumber,
      pageLabel = _ref15.pageLabel;

  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(pageNumber);
  }
}

function webViewerVisibilityChange(evt) {
  if (document.visibilityState === "visible") {
    setZoomDisabledTimeout();
  }
}

var zoomDisabledTimeout = null;

function setZoomDisabledTimeout() {
  if (zoomDisabledTimeout) {
    clearTimeout(zoomDisabledTimeout);
  }

  zoomDisabledTimeout = setTimeout(function () {
    zoomDisabledTimeout = null;
  }, WHEEL_ZOOM_DISABLED_TIMEOUT);
}

function webViewerWheel(evt) {
  var pdfViewer = PDFViewerApplication.pdfViewer,
      supportedMouseWheelZoomModifierKeys = PDFViewerApplication.supportedMouseWheelZoomModifierKeys;

  if (pdfViewer.isInPresentationMode) {
    return;
  }

  if (evt.ctrlKey && supportedMouseWheelZoomModifierKeys.ctrlKey || evt.metaKey && supportedMouseWheelZoomModifierKeys.metaKey) {
    evt.preventDefault();

    if (zoomDisabledTimeout || document.visibilityState === "hidden") {
      return;
    }

    var previousScale = pdfViewer.currentScale;
    var delta = (0, _ui_utils_metapdf.normalizeWheelEventDirection)(evt);
    var ticks = 0;

    if (evt.deltaMode === WheelEvent.DOM_DELTA_LINE || evt.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      if (Math.abs(delta) >= 1) {
        ticks = Math.sign(delta);
      } else {
        ticks = PDFViewerApplication.accumulateWheelTicks(delta);
      }
    } else {
      var PIXELS_PER_LINE_SCALE = 30;
      ticks = PDFViewerApplication.accumulateWheelTicks(delta / PIXELS_PER_LINE_SCALE);
    }

    if (ticks < 0) {
      PDFViewerApplication.zoomOut(-ticks);
    } else if (ticks > 0) {
      PDFViewerApplication.zoomIn(ticks);
    }

    var currentScale = pdfViewer.currentScale;

    if (previousScale !== currentScale) {
      var scaleCorrectionFactor = currentScale / previousScale - 1;
      var rect = pdfViewer.container.getBoundingClientRect();
      var dx = evt.clientX - rect.left;
      var dy = evt.clientY - rect.top;
      pdfViewer.container.scrollLeft += dx * scaleCorrectionFactor;
      pdfViewer.container.scrollTop += dy * scaleCorrectionFactor;
    }
  } else {
    setZoomDisabledTimeout();
  }
}

function webViewerTouchStart(evt) {
  if (evt.touches.length > 1) {
    evt.preventDefault();
  }
}

function webViewerKeyUp(evt) {
  if (evt.keyCode === 9) {
    if (PDFViewerApplication.triggerDelayedFallback) {
      PDFViewerApplication.triggerDelayedFallback();
    }
  }
}

function webViewerKeyDown(evt) {
  if (PDFViewerApplication.overlayManager.active) {
    return;
  }

  var handled = false,
      ensureViewerFocused = false;
  var cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);
  var pdfViewer = PDFViewerApplication.pdfViewer;
  var isViewerInPresentationMode = pdfViewer && pdfViewer.isInPresentationMode;

  if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
    switch (evt.keyCode) {
      case 70:
        if (!PDFViewerApplication.supportsIntegratedFind && !evt.shiftKey) {
          PDFViewerApplication.findBar.open();
          handled = true;
        }

        break;

      case 71:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          var findState = PDFViewerApplication.findController.state;

          if (findState) {
            PDFViewerApplication.findController.executeCommand("findagain", {
              query: findState.query,
              phraseSearch: findState.phraseSearch,
              caseSensitive: findState.caseSensitive,
              entireWord: findState.entireWord,
              highlightAll: findState.highlightAll,
              findPrevious: cmd === 5 || cmd === 12
            });
          }

          handled = true;
        }

        break;

      case 61:
      case 107:
      case 187:
      case 171:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomIn();
        }

        handled = true;
        break;

      case 173:
      case 109:
      case 189:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomOut();
        }

        handled = true;
        break;

      case 48:
      case 96:
        if (!isViewerInPresentationMode) {
          setTimeout(function () {
            PDFViewerApplication.zoomReset();
          });
          handled = false;
        }

        break;

      case 38:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 40:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }

        break;
    }
  }

  var eventBus = PDFViewerApplication.eventBus;

  if (cmd === 1 || cmd === 8) {
    switch (evt.keyCode) {
      case 83:
        eventBus.dispatch("download", {
          source: window
        });
        handled = true;
        break;

      case 79:
        {
          eventBus.dispatch("openfile", {
            source: window
          });
          handled = true;
        }
        break;
    }
  }

  if (cmd === 3 || cmd === 10) {
    switch (evt.keyCode) {
      case 80:
        PDFViewerApplication.requestPresentationMode();
        handled = true;
        break;

      case 71:
        PDFViewerApplication.appConfig.toolbar.pageNumber.select();
        handled = true;
        break;
    }
  }

  if (handled) {
    if (ensureViewerFocused && !isViewerInPresentationMode) {
      pdfViewer.focus();
    }

    evt.preventDefault();
    return;
  }

  var curElement = (0, _ui_utils_metapdf.getActiveOrFocusedElement)();
  var curElementTagName = curElement && curElement.tagName.toUpperCase();

  if (curElementTagName === "INPUT" || curElementTagName === "TEXTAREA" || curElementTagName === "SELECT" || curElement && curElement.isContentEditable) {
    if (evt.keyCode !== 27) {
      return;
    }
  }

  if (cmd === 0) {
    var turnPage = 0,
        turnOnlyIfPageFit = false;

    switch (evt.keyCode) {
      case 38:
      case 33:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

        turnPage = -1;
        break;

      case 8:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }

        turnPage = -1;
        break;

      case 37:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

      case 75:
      case 80:
        turnPage = -1;
        break;

      case 27:
        if (PDFViewerApplication.secondaryToolbar.isOpen) {
          PDFViewerApplication.secondaryToolbar.close();
          handled = true;
        }

        if (!PDFViewerApplication.supportsIntegratedFind && PDFViewerApplication.findBar.opened) {
          PDFViewerApplication.findBar.close();
          handled = true;
        }

        break;

      case 40:
      case 34:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

        turnPage = 1;
        break;

      case 13:
      case 32:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }

        turnPage = 1;
        break;

      case 39:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

      case 74:
      case 78:
        turnPage = 1;
        break;

      case 36:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 35:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 83:
        PDFViewerApplication.pdfCursorTools.switchTool(_pdf_cursor_tools.CursorTool.SELECT);
        break;

      case 72:
        PDFViewerApplication.pdfCursorTools.switchTool(_pdf_cursor_tools.CursorTool.HAND);
        break;

      case 82:
        PDFViewerApplication.rotatePages(90);
        break;

      case 115:
        PDFViewerApplication.pdfSidebar.toggle();
        break;
    }

    if (turnPage !== 0 && (!turnOnlyIfPageFit || pdfViewer.currentScaleValue === "page-fit")) {
      if (turnPage > 0) {
        if (PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page++;
        }
      } else {
        if (PDFViewerApplication.page > 1) {
          PDFViewerApplication.page--;
        }
      }

      handled = true;
    }
  }

  if (cmd === 4) {
    switch (evt.keyCode) {
      case 13:
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== "page-fit") {
          break;
        }

        if (PDFViewerApplication.page > 1) {
          PDFViewerApplication.page--;
        }

        handled = true;
        break;

      case 82:
        PDFViewerApplication.rotatePages(-90);
        break;
    }
  }

  if (!handled && !isViewerInPresentationMode) {
    if (evt.keyCode >= 33 && evt.keyCode <= 40 || evt.keyCode === 32 && curElementTagName !== "BUTTON") {
      ensureViewerFocused = true;
    }
  }

  if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
    pdfViewer.focus();
  }

  if (handled) {
    evt.preventDefault();
  }
}

function beforeUnload(evt) {
  evt.preventDefault();
  evt.returnValue = "";
  return false;
}

function apiPageLayoutToSpreadMode(layout) {
  switch (layout) {
    case "SinglePage":
    case "OneColumn":
      return _ui_utils_metapdf.SpreadMode.NONE;

    case "TwoColumnLeft":
    case "TwoPageLeft":
      return _ui_utils_metapdf.SpreadMode.ODD;

    case "TwoColumnRight":
    case "TwoPageRight":
      return _ui_utils_metapdf.SpreadMode.EVEN;
  }

  return _ui_utils_metapdf.SpreadMode.NONE;
}

function apiPageModeToSidebarView(mode) {
  switch (mode) {
    case "UseNone":
      return _pdf_sidebar_metapdf.SidebarView.NONE;

    case "UseThumbs":
      return _pdf_sidebar_metapdf.SidebarView.THUMBS;

    case "UseOutlines":
      return _pdf_sidebar_metapdf.SidebarView.OUTLINE;

    case "UseAttachments":
      return _pdf_sidebar_metapdf.SidebarView.ATTACHMENTS;

    case "UseOC":
      return _pdf_sidebar_metapdf.SidebarView.LAYERS;
  }

  return _pdf_sidebar_metapdf.SidebarView.NONE;
}

var PDFPrintServiceFactory = {
  instance: {
    supportsPrinting: false,
    createPrintService: function createPrintService() {
      throw new Error("Not implemented: createPrintService");
    }
  }
};
exports.PDFPrintServiceFactory = PDFPrintServiceFactory;