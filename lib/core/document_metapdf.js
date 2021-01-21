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
exports.PDFDocument = exports.Page = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util_metapdf = require("../shared/util_metapdf.js");

var _obj = require("./obj.js");

var _primitives = require("./primitives.js");

var _core_utils = require("./core_utils.js");

var _stream = require("./stream.js");

var _annotation_metapdf = require("./annotation_metapdf.js");

var _crypto_metapdf = require("./crypto_metapdf.js");

var _parser = require("./parser.js");

var _operator_list = require("./operator_list.js");

var _evaluator_metapdf = require("./evaluator_metapdf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_USER_UNIT = 1.0;
var LETTER_SIZE_MEDIABOX = [0, 0, 612, 792];

function isAnnotationRenderable(annotation, intent) {
  return intent === "display" && annotation.viewable || intent === "print" && annotation.printable;
}

var Page = /*#__PURE__*/function () {
  function Page(_ref) {
    var pdfManager = _ref.pdfManager,
        xref = _ref.xref,
        pageIndex = _ref.pageIndex,
        pageDict = _ref.pageDict,
        ref = _ref.ref,
        globalIdFactory = _ref.globalIdFactory,
        fontCache = _ref.fontCache,
        builtInCMapCache = _ref.builtInCMapCache,
        globalImageCache = _ref.globalImageCache,
        nonBlendModesSet = _ref.nonBlendModesSet;

    _classCallCheck(this, Page);

    this.pdfManager = pdfManager;
    this.pageIndex = pageIndex;
    this.pageDict = pageDict;
    this.xref = xref;
    this.ref = ref;
    this.fontCache = fontCache;
    this.builtInCMapCache = builtInCMapCache;
    this.globalImageCache = globalImageCache;
    this.nonBlendModesSet = nonBlendModesSet;
    this.evaluatorOptions = pdfManager.evaluatorOptions;
    this.resourcesPromise = null;
    var idCounters = {
      obj: 0
    };

    this._localIdFactory = /*#__PURE__*/function (_globalIdFactory) {
      _inherits(_class, _globalIdFactory);

      var _super = _createSuper(_class);

      function _class() {
        _classCallCheck(this, _class);

        return _super.apply(this, arguments);
      }

      _createClass(_class, null, [{
        key: "createObjId",
        value: function createObjId() {
          return "p".concat(pageIndex, "_").concat(++idCounters.obj);
        }
      }]);

      return _class;
    }(globalIdFactory);
  }

  _createClass(Page, [{
    key: "_getInheritableProperty",
    value: function _getInheritableProperty(key) {
      var getArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var value = (0, _core_utils.getInheritableProperty)({
        dict: this.pageDict,
        key: key,
        getArray: getArray,
        stopWhenFound: false
      });

      if (!Array.isArray(value)) {
        return value;
      }

      if (value.length === 1 || !(0, _primitives.isDict)(value[0])) {
        return value[0];
      }

      return _primitives.Dict.merge({
        xref: this.xref,
        dictArray: value
      });
    }
  }, {
    key: "_getBoundingBox",
    value: function _getBoundingBox(name) {
      var box = this._getInheritableProperty(name, true);

      if (Array.isArray(box) && box.length === 4) {
        if (box[2] - box[0] !== 0 && box[3] - box[1] !== 0) {
          return box;
        }

        (0, _util_metapdf.warn)("Empty /".concat(name, " entry."));
      }

      return null;
    }
  }, {
    key: "getContentStream",
    value: function getContentStream() {
      var content = this.content;
      var stream;

      if (Array.isArray(content)) {
        var xref = this.xref;
        var streams = [];

        var _iterator = _createForOfIteratorHelper(content),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var subStream = _step.value;
            streams.push(xref.fetchIfRef(subStream));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        stream = new _stream.StreamsSequenceStream(streams);
      } else if ((0, _primitives.isStream)(content)) {
        stream = content;
      } else {
        stream = new _stream.NullStream();
      }

      return stream;
    }
  }, {
    key: "save",
    value: function save(handler, task, annotationStorage) {
      var partialEvaluator = new _evaluator_metapdf.PartialEvaluator({
        xref: this.xref,
        handler: handler,
        pageIndex: this.pageIndex,
        idFactory: this._localIdFactory,
        fontCache: this.fontCache,
        builtInCMapCache: this.builtInCMapCache,
        globalImageCache: this.globalImageCache,
        options: this.evaluatorOptions
      });
      return this._parsedAnnotations.then(function (annotations) {
        var newRefsPromises = [];

        var _iterator2 = _createForOfIteratorHelper(annotations),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var annotation = _step2.value;

            if (!isAnnotationRenderable(annotation, "print")) {
              continue;
            }

            newRefsPromises.push(annotation.save(partialEvaluator, task, annotationStorage)["catch"](function (reason) {
              (0, _util_metapdf.warn)("save - ignoring annotation data during " + "\"".concat(task.name, "\" task: \"").concat(reason, "\"."));
              return null;
            }));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return Promise.all(newRefsPromises);
      });
    }
  }, {
    key: "loadResources",
    value: function loadResources(keys) {
      var _this = this;

      if (!this.resourcesPromise) {
        this.resourcesPromise = this.pdfManager.ensure(this, "resources");
      }

      return this.resourcesPromise.then(function () {
        var objectLoader = new _obj.ObjectLoader(_this.resources, keys, _this.xref);
        return objectLoader.load();
      });
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList(_ref2) {
      var _this2 = this;

      var handler = _ref2.handler,
          sink = _ref2.sink,
          task = _ref2.task,
          intent = _ref2.intent,
          renderInteractiveForms = _ref2.renderInteractiveForms,
          annotationStorage = _ref2.annotationStorage;
      var contentStreamPromise = this.pdfManager.ensure(this, "getContentStream");
      var resourcesPromise = this.loadResources(["ExtGState", "ColorSpace", "Pattern", "Shading", "XObject", "Font"]);
      var partialEvaluator = new _evaluator_metapdf.PartialEvaluator({
        xref: this.xref,
        handler: handler,
        pageIndex: this.pageIndex,
        idFactory: this._localIdFactory,
        fontCache: this.fontCache,
        builtInCMapCache: this.builtInCMapCache,
        globalImageCache: this.globalImageCache,
        options: this.evaluatorOptions
      });
      var dataPromises = Promise.all([contentStreamPromise, resourcesPromise]);
      var pageListPromise = dataPromises.then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            contentStream = _ref4[0];

        var opList = new _operator_list.OperatorList(intent, sink);
        handler.send("StartRenderPage", {
          transparency: partialEvaluator.hasBlendModes(_this2.resources, _this2.nonBlendModesSet),
          pageIndex: _this2.pageIndex,
          intent: intent
        });
        return partialEvaluator.getOperatorList({
          stream: contentStream,
          task: task,
          resources: _this2.resources,
          operatorList: opList
        }).then(function () {
          return opList;
        });
      });
      return Promise.all([pageListPromise, this._parsedAnnotations]).then(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            pageOpList = _ref6[0],
            annotations = _ref6[1];

        if (annotations.length === 0) {
          pageOpList.flush(true);
          return {
            length: pageOpList.totalLength
          };
        }

        var opListPromises = [];

        var _iterator3 = _createForOfIteratorHelper(annotations),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var annotation = _step3.value;

            if (isAnnotationRenderable(annotation, intent)) {
              opListPromises.push(annotation.getOperatorList(partialEvaluator, task, renderInteractiveForms, annotationStorage)["catch"](function (reason) {
                (0, _util_metapdf.warn)("getOperatorList - ignoring annotation data during " + "\"".concat(task.name, "\" task: \"").concat(reason, "\"."));
                return null;
              }));
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return Promise.all(opListPromises).then(function (opLists) {
          pageOpList.addOp(_util_metapdf.OPS.beginAnnotations, []);

          var _iterator4 = _createForOfIteratorHelper(opLists),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var opList = _step4.value;
              pageOpList.addOpList(opList);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          pageOpList.addOp(_util_metapdf.OPS.endAnnotations, []);
          pageOpList.flush(true);
          return {
            length: pageOpList.totalLength
          };
        });
      });
    }
  }, {
    key: "extractTextContent",
    value: function extractTextContent(_ref7) {
      var _this3 = this;

      var handler = _ref7.handler,
          task = _ref7.task,
          normalizeWhitespace = _ref7.normalizeWhitespace,
          sink = _ref7.sink,
          combineTextItems = _ref7.combineTextItems;
      var contentStreamPromise = this.pdfManager.ensure(this, "getContentStream");
      var resourcesPromise = this.loadResources(["ExtGState", "XObject", "Font"]);
      var dataPromises = Promise.all([contentStreamPromise, resourcesPromise]);
      return dataPromises.then(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 1),
            contentStream = _ref9[0];

        var partialEvaluator = new _evaluator_metapdf.PartialEvaluator({
          xref: _this3.xref,
          handler: handler,
          pageIndex: _this3.pageIndex,
          idFactory: _this3._localIdFactory,
          fontCache: _this3.fontCache,
          builtInCMapCache: _this3.builtInCMapCache,
          globalImageCache: _this3.globalImageCache,
          options: _this3.evaluatorOptions
        });
        return partialEvaluator.getTextContent({
          stream: contentStream,
          task: task,
          resources: _this3.resources,
          normalizeWhitespace: normalizeWhitespace,
          combineTextItems: combineTextItems,
          sink: sink
        });
      });
    }
  }, {
    key: "getAnnotationsData",
    value: function getAnnotationsData(intent) {
      var thispage = this;
      return this._parsedAnnotations.then(function (annotations) {
        var annotationsData = [];

        for (var i = 0, ii = annotations.length; i < ii; i++) {
          if (!intent || isAnnotationRenderable(annotations[i], intent)) {
            annotationsData.push(annotations[i].data);
            var lastA = annotationsData[annotationsData.length - 1];

            if (lastA.font && lastA.font.font && thispage && thispage.xref && thispage.xref._cacheMap) {
              thispage.xref._cacheMap.forEach(function (entry, idx) {
                if (entry._map && entry._map.Type && entry._map.Type.name && entry._map.Type.name == 'Font') {
                  if (entry._map.Name && entry._map.Name.name && entry._map.Name.name == lastA.font.font) {
                    if (entry._map.BaseFont && entry._map.BaseFont.name) {
                      lastA.font.basefont = entry._map.BaseFont.name;
                      lastA.font.fontRef = idx;
                    }
                  }
                }
              });
            }
          }
        }

        return annotationsData;
      });
    }
  }, {
    key: "content",
    get: function get() {
      return this.pageDict.get("Contents");
    }
  }, {
    key: "resources",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "resources", this._getInheritableProperty("Resources") || _primitives.Dict.empty);
    }
  }, {
    key: "mediaBox",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "mediaBox", this._getBoundingBox("MediaBox") || LETTER_SIZE_MEDIABOX);
    }
  }, {
    key: "cropBox",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "cropBox", this._getBoundingBox("CropBox") || this.mediaBox);
    }
  }, {
    key: "userUnit",
    get: function get() {
      var obj = this.pageDict.get("UserUnit");

      if (!(0, _util_metapdf.isNum)(obj) || obj <= 0) {
        obj = DEFAULT_USER_UNIT;
      }

      return (0, _util_metapdf.shadow)(this, "userUnit", obj);
    }
  }, {
    key: "view",
    get: function get() {
      var cropBox = this.cropBox,
          mediaBox = this.mediaBox;
      var view;

      if (cropBox === mediaBox || (0, _util_metapdf.isArrayEqual)(cropBox, mediaBox)) {
        view = mediaBox;
      } else {
        var box = _util_metapdf.Util.intersect(cropBox, mediaBox);

        if (box && box[2] - box[0] !== 0 && box[3] - box[1] !== 0) {
          view = box;
        } else {
          (0, _util_metapdf.warn)("Empty /CropBox and /MediaBox intersection.");
        }
      }

      return (0, _util_metapdf.shadow)(this, "view", view || mediaBox);
    }
  }, {
    key: "rotate",
    get: function get() {
      var rotate = this._getInheritableProperty("Rotate") || 0;

      if (rotate % 90 !== 0) {
        rotate = 0;
      } else if (rotate >= 360) {
        rotate = rotate % 360;
      } else if (rotate < 0) {
        rotate = (rotate % 360 + 360) % 360;
      }

      return (0, _util_metapdf.shadow)(this, "rotate", rotate);
    }
  }, {
    key: "annotations",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "annotations", this._getInheritableProperty("Annots") || []);
    }
  }, {
    key: "_parsedAnnotations",
    get: function get() {
      var _this4 = this;

      var parsedAnnotations = this.pdfManager.ensure(this, "annotations").then(function () {
        var annotationPromises = [];

        var _iterator5 = _createForOfIteratorHelper(_this4.annotations),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var annotationRef = _step5.value;
            annotationPromises.push(_annotation_metapdf.AnnotationFactory.create(_this4.xref, annotationRef, _this4.pdfManager, _this4._localIdFactory)["catch"](function (reason) {
              (0, _util_metapdf.warn)("_parsedAnnotations: \"".concat(reason, "\"."));
              return null;
            }));
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        return Promise.all(annotationPromises).then(function (annotations) {
          return annotations.filter(function (annotation) {
            return !!annotation;
          });
        });
      });
      return (0, _util_metapdf.shadow)(this, "_parsedAnnotations", parsedAnnotations);
    }
  }]);

  return Page;
}();

exports.Page = Page;
var PDF_HEADER_SIGNATURE = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
var STARTXREF_SIGNATURE = new Uint8Array([0x73, 0x74, 0x61, 0x72, 0x74, 0x78, 0x72, 0x65, 0x66]);
var ENDOBJ_SIGNATURE = new Uint8Array([0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a]);
var FINGERPRINT_FIRST_BYTES = 1024;
var EMPTY_FINGERPRINT = "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00";
var PDF_HEADER_VERSION_REGEXP = /^[1-9]\.[0-9]$/;

function find(stream, signature) {
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1024;
  var backwards = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var signatureLength = signature.length;
  var scanBytes = stream.peekBytes(limit);
  var scanLength = scanBytes.length - signatureLength;

  if (scanLength <= 0) {
    return false;
  }

  if (backwards) {
    var signatureEnd = signatureLength - 1;
    var pos = scanBytes.length - 1;

    while (pos >= signatureEnd) {
      var j = 0;

      while (j < signatureLength && scanBytes[pos - j] === signature[signatureEnd - j]) {
        j++;
      }

      if (j >= signatureLength) {
        stream.pos += pos - signatureEnd;
        return true;
      }

      pos--;
    }
  } else {
    var _pos = 0;

    while (_pos <= scanLength) {
      var _j = 0;

      while (_j < signatureLength && scanBytes[_pos + _j] === signature[_j]) {
        _j++;
      }

      if (_j >= signatureLength) {
        stream.pos += _pos;
        return true;
      }

      _pos++;
    }
  }

  return false;
}

var PDFDocument = /*#__PURE__*/function () {
  function PDFDocument(pdfManager, arg) {
    _classCallCheck(this, PDFDocument);

    var stream;

    if ((0, _primitives.isStream)(arg)) {
      stream = arg;
    } else if ((0, _util_metapdf.isArrayBuffer)(arg)) {
      stream = new _stream.Stream(arg);
    } else {
      throw new Error("PDFDocument: Unknown argument type");
    }

    if (stream.length <= 0) {
      throw new _util_metapdf.InvalidPDFException("The PDF file is empty, i.e. its size is zero bytes.");
    }

    this.pdfManager = pdfManager;
    this.stream = stream;
    this.xref = new _obj.XRef(stream, pdfManager);
    this._pagePromises = [];
    this._version = null;
    var idCounters = {
      font: 0
    };

    this._globalIdFactory = /*#__PURE__*/function () {
      function _class2() {
        _classCallCheck(this, _class2);
      }

      _createClass(_class2, null, [{
        key: "getDocId",
        value: function getDocId() {
          return "g_".concat(pdfManager.docId);
        }
      }, {
        key: "createFontId",
        value: function createFontId() {
          return "f".concat(++idCounters.font);
        }
      }, {
        key: "createObjId",
        value: function createObjId() {
          (0, _util_metapdf.unreachable)("Abstract method `createObjId` called.");
        }
      }]);

      return _class2;
    }();
  }

  _createClass(PDFDocument, [{
    key: "parse",
    value: function parse(recoveryMode) {
      this.xref.parse(recoveryMode);
      this.catalog = new _obj.Catalog(this.pdfManager, this.xref);

      if (this.catalog.version) {
        this._version = this.catalog.version;
      }
    }
  }, {
    key: "checkHeader",
    value: function checkHeader() {
      var stream = this.stream;
      stream.reset();

      if (!find(stream, PDF_HEADER_SIGNATURE)) {
        return;
      }

      stream.moveStart();
      var MAX_PDF_VERSION_LENGTH = 12;
      var version = "",
          ch;

      while ((ch = stream.getByte()) > 0x20) {
        if (version.length >= MAX_PDF_VERSION_LENGTH) {
          break;
        }

        version += String.fromCharCode(ch);
      }

      if (!this._version) {
        this._version = version.substring(5);
      }
    }
  }, {
    key: "parseStartXRef",
    value: function parseStartXRef() {
      this.xref.setStartXRef(this.startXRef);
    }
  }, {
    key: "_hasOnlyDocumentSignatures",
    value: function _hasOnlyDocumentSignatures(fields) {
      var _this5 = this;

      var recursionDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var RECURSION_LIMIT = 10;

      if (!Array.isArray(fields)) {
        return false;
      }

      return fields.every(function (field) {
        field = _this5.xref.fetchIfRef(field);

        if (!(field instanceof _primitives.Dict)) {
          return false;
        }

        if (field.has("Kids")) {
          if (++recursionDepth > RECURSION_LIMIT) {
            (0, _util_metapdf.warn)("_hasOnlyDocumentSignatures: maximum recursion depth reached");
            return false;
          }

          return _this5._hasOnlyDocumentSignatures(field.get("Kids"), recursionDepth);
        }

        var isSignature = (0, _primitives.isName)(field.get("FT"), "Sig");
        var rectangle = field.get("Rect");
        var isInvisible = Array.isArray(rectangle) && rectangle.every(function (value) {
          return value === 0;
        });
        return isSignature && isInvisible;
      });
    }
  }, {
    key: "_getLinearizationPage",
    value: function _getLinearizationPage(pageIndex) {
      var catalog = this.catalog,
          linearization = this.linearization;

      var ref = _primitives.Ref.get(linearization.objectNumberFirst, 0);

      return this.xref.fetchAsync(ref).then(function (obj) {
        if ((0, _primitives.isDict)(obj, "Page") || (0, _primitives.isDict)(obj) && !obj.has("Type") && obj.has("Contents")) {
          if (ref && !catalog.pageKidsCountCache.has(ref)) {
            catalog.pageKidsCountCache.put(ref, 1);
          }

          return [obj, ref];
        }

        throw new _util_metapdf.FormatError("The Linearization dictionary doesn't point " + "to a valid Page dictionary.");
      })["catch"](function (reason) {
        (0, _util_metapdf.info)(reason);
        return catalog.getPageDict(pageIndex);
      });
    }
  }, {
    key: "getPage",
    value: function getPage(pageIndex) {
      var _this6 = this;

      if (this._pagePromises[pageIndex] !== undefined) {
        return this._pagePromises[pageIndex];
      }

      var catalog = this.catalog,
          linearization = this.linearization;
      var promise = linearization && linearization.pageFirst === pageIndex ? this._getLinearizationPage(pageIndex) : catalog.getPageDict(pageIndex);
      return this._pagePromises[pageIndex] = promise.then(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
            pageDict = _ref11[0],
            ref = _ref11[1];

        return new Page({
          pdfManager: _this6.pdfManager,
          xref: _this6.xref,
          pageIndex: pageIndex,
          pageDict: pageDict,
          ref: ref,
          globalIdFactory: _this6._globalIdFactory,
          fontCache: catalog.fontCache,
          builtInCMapCache: catalog.builtInCMapCache,
          globalImageCache: catalog.globalImageCache,
          nonBlendModesSet: catalog.nonBlendModesSet
        });
      });
    }
  }, {
    key: "checkFirstPage",
    value: function checkFirstPage() {
      var _this7 = this;

      return this.getPage(0)["catch"]( /*#__PURE__*/function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(reason) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(reason instanceof _core_utils.XRefEntryException)) {
                    _context.next = 5;
                    break;
                  }

                  _this7._pagePromises.length = 0;
                  _context.next = 4;
                  return _this7.cleanup();

                case 4:
                  throw new _core_utils.XRefParseException();

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref12.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "fontFallback",
    value: function fontFallback(id, handler) {
      return this.catalog.fontFallback(id, handler);
    }
  }, {
    key: "cleanup",
    value: function () {
      var _cleanup = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var manuallyTriggered,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                manuallyTriggered = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
                return _context2.abrupt("return", this.catalog ? this.catalog.cleanup(manuallyTriggered) : (0, _primitives.clearPrimitiveCaches)());

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function cleanup() {
        return _cleanup.apply(this, arguments);
      }

      return cleanup;
    }()
  }, {
    key: "_collectFieldObjects",
    value: function _collectFieldObjects(name, fieldRef, promises) {
      var field = this.xref.fetchIfRef(fieldRef);

      if (field.has("T")) {
        var partName = (0, _util_metapdf.stringToPDFString)(field.get("T"));

        if (name === "") {
          name = partName;
        } else {
          name = "".concat(name, ".").concat(partName);
        }
      }

      if (!(name in promises)) {
        promises.set(name, []);
      }

      promises.get(name).push(_annotation_metapdf.AnnotationFactory.create(this.xref, fieldRef, this.pdfManager, this._localIdFactory).then(function (annotation) {
        return annotation && annotation.getFieldObject();
      })["catch"](function (reason) {
        (0, _util_metapdf.warn)("_collectFieldObjects: \"".concat(reason, "\"."));
        return null;
      }));

      if (field.has("Kids")) {
        var kids = field.get("Kids");

        var _iterator6 = _createForOfIteratorHelper(kids),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var kid = _step6.value;

            this._collectFieldObjects(name, kid, promises);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }
  }, {
    key: "linearization",
    get: function get() {
      var linearization = null;

      try {
        linearization = _parser.Linearization.create(this.stream);
      } catch (err) {
        if (err instanceof _core_utils.MissingDataException) {
          throw err;
        }

        (0, _util_metapdf.info)(err);
      }

      return (0, _util_metapdf.shadow)(this, "linearization", linearization);
    }
  }, {
    key: "startXRef",
    get: function get() {
      var stream = this.stream;
      var startXRef = 0;

      if (this.linearization) {
        stream.reset();

        if (find(stream, ENDOBJ_SIGNATURE)) {
          startXRef = stream.pos + 6 - stream.start;
        }
      } else {
        var step = 1024;
        var startXRefLength = STARTXREF_SIGNATURE.length;
        var found = false,
            pos = stream.end;

        while (!found && pos > 0) {
          pos -= step - startXRefLength;

          if (pos < 0) {
            pos = 0;
          }

          stream.pos = pos;
          found = find(stream, STARTXREF_SIGNATURE, step, true);
        }

        if (found) {
          stream.skip(9);
          var ch;

          do {
            ch = stream.getByte();
          } while ((0, _core_utils.isWhiteSpace)(ch));

          var str = "";

          while (ch >= 0x20 && ch <= 0x39) {
            str += String.fromCharCode(ch);
            ch = stream.getByte();
          }

          startXRef = parseInt(str, 10);

          if (isNaN(startXRef)) {
            startXRef = 0;
          }
        }
      }

      return (0, _util_metapdf.shadow)(this, "startXRef", startXRef);
    }
  }, {
    key: "numPages",
    get: function get() {
      var linearization = this.linearization;
      var num = linearization ? linearization.numPages : this.catalog.numPages;
      return (0, _util_metapdf.shadow)(this, "numPages", num);
    }
  }, {
    key: "formInfo",
    get: function get() {
      var formInfo = {
        hasFields: false,
        hasAcroForm: false,
        hasXfa: false
      };
      var acroForm = this.catalog.acroForm;

      if (!acroForm) {
        return (0, _util_metapdf.shadow)(this, "formInfo", formInfo);
      }

      try {
        var fields = acroForm.get("Fields");
        var hasFields = Array.isArray(fields) && fields.length > 0;
        formInfo.hasFields = hasFields;
        var xfa = acroForm.get("XFA");
        formInfo.hasXfa = Array.isArray(xfa) && xfa.length > 0 || (0, _primitives.isStream)(xfa) && !xfa.isEmpty;
        var sigFlags = acroForm.get("SigFlags");

        var hasOnlyDocumentSignatures = !!(sigFlags & 0x1) && this._hasOnlyDocumentSignatures(fields);

        formInfo.hasAcroForm = hasFields && !hasOnlyDocumentSignatures;
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        (0, _util_metapdf.warn)("Cannot fetch form information: \"".concat(ex, "\"."));
      }

      return (0, _util_metapdf.shadow)(this, "formInfo", formInfo);
    }
  }, {
    key: "documentInfo",
    get: function get() {
      var DocumentInfoValidators = {
        Title: _util_metapdf.isString,
        Author: _util_metapdf.isString,
        Subject: _util_metapdf.isString,
        Keywords: _util_metapdf.isString,
        Creator: _util_metapdf.isString,
        Producer: _util_metapdf.isString,
        CreationDate: _util_metapdf.isString,
        ModDate: _util_metapdf.isString,
        Trapped: _primitives.isName
      };
      var version = this._version;

      if (typeof version !== "string" || !PDF_HEADER_VERSION_REGEXP.test(version)) {
        (0, _util_metapdf.warn)("Invalid PDF header version number: ".concat(version));
        version = null;
      }

      var docInfo = {
        PDFFormatVersion: version,
        IsLinearized: !!this.linearization,
        IsAcroFormPresent: this.formInfo.hasAcroForm,
        IsXFAPresent: this.formInfo.hasXfa,
        IsCollectionPresent: !!this.catalog.collection
      };
      var infoDict;

      try {
        infoDict = this.xref.trailer.get("Info");
      } catch (err) {
        if (err instanceof _core_utils.MissingDataException) {
          throw err;
        }

        (0, _util_metapdf.info)("The document information dictionary is invalid.");
      }

      if ((0, _primitives.isDict)(infoDict)) {
        var _iterator7 = _createForOfIteratorHelper(infoDict.getKeys()),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var key = _step7.value;
            var value = infoDict.get(key);

            if (DocumentInfoValidators[key]) {
              if (DocumentInfoValidators[key](value)) {
                docInfo[key] = typeof value !== "string" ? value : (0, _util_metapdf.stringToPDFString)(value);
              } else {
                (0, _util_metapdf.info)("Bad value in document info for \"".concat(key, "\"."));
              }
            } else if (typeof key === "string") {
              var customValue = void 0;

              if ((0, _util_metapdf.isString)(value)) {
                customValue = (0, _util_metapdf.stringToPDFString)(value);
              } else if ((0, _primitives.isName)(value) || (0, _util_metapdf.isNum)(value) || (0, _util_metapdf.isBool)(value)) {
                customValue = value;
              } else {
                (0, _util_metapdf.info)("Unsupported value in document info for (custom) \"".concat(key, "\"."));
                continue;
              }

              if (!docInfo.Custom) {
                docInfo.Custom = Object.create(null);
              }

              docInfo.Custom[key] = customValue;
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }

      return (0, _util_metapdf.shadow)(this, "documentInfo", docInfo);
    }
  }, {
    key: "fingerprint",
    get: function get() {
      var hash;
      var idArray = this.xref.trailer.get("ID");

      if (Array.isArray(idArray) && idArray[0] && (0, _util_metapdf.isString)(idArray[0]) && idArray[0] !== EMPTY_FINGERPRINT) {
        hash = (0, _util_metapdf.stringToBytes)(idArray[0]);
      } else {
        hash = (0, _crypto_metapdf.calculateMD5)(this.stream.getByteRange(0, FINGERPRINT_FIRST_BYTES), 0, FINGERPRINT_FIRST_BYTES);
      }

      var fingerprintBuf = [];

      for (var i = 0, ii = hash.length; i < ii; i++) {
        var hex = hash[i].toString(16);
        fingerprintBuf.push(hex.padStart(2, "0"));
      }

      return (0, _util_metapdf.shadow)(this, "fingerprint", fingerprintBuf.join(""));
    }
  }, {
    key: "fieldObjects",
    get: function get() {
      if (!this.formInfo.hasFields) {
        return (0, _util_metapdf.shadow)(this, "fieldObjects", Promise.resolve(null));
      }

      var allFields = Object.create(null);
      var fieldPromises = new Map();

      var _iterator8 = _createForOfIteratorHelper(this.catalog.acroForm.get("Fields")),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var fieldRef = _step8.value;

          this._collectFieldObjects("", fieldRef, fieldPromises);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      var allPromises = [];

      var _iterator9 = _createForOfIteratorHelper(fieldPromises),
          _step9;

      try {
        var _loop = function _loop() {
          var _step9$value = _slicedToArray(_step9.value, 2),
              name = _step9$value[0],
              promises = _step9$value[1];

          allPromises.push(Promise.all(promises).then(function (fields) {
            fields = fields.filter(function (field) {
              return !!field;
            });

            if (fields.length > 0) {
              allFields[name] = fields;
            }
          }));
        };

        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return (0, _util_metapdf.shadow)(this, "fieldObjects", Promise.all(allPromises).then(function () {
        return allFields;
      }));
    }
  }, {
    key: "hasJSActions",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "hasJSActions", this.fieldObjects.then(function (fieldObjects) {
        return fieldObjects !== null && Object.values(fieldObjects).some(function (fieldObject) {
          return fieldObject.some(function (object) {
            return object.actions !== null;
          });
        });
      }));
    }
  }, {
    key: "calculationOrderIds",
    get: function get() {
      var acroForm = this.catalog.acroForm;

      if (!acroForm || !acroForm.has("CO")) {
        return (0, _util_metapdf.shadow)(this, "calculationOrderIds", null);
      }

      var calculationOrder = acroForm.get("CO");

      if (!Array.isArray(calculationOrder) || calculationOrder.length === 0) {
        return (0, _util_metapdf.shadow)(this, "calculationOrderIds", null);
      }

      var ids = calculationOrder.filter(_primitives.isRef).map(function (ref) {
        return ref.toString();
      });
      return (0, _util_metapdf.shadow)(this, "calculationOrderIds", ids);
    }
  }]);

  return PDFDocument;
}();

exports.PDFDocument = PDFDocument;