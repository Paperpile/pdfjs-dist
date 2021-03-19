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
exports.addLinkAttributes = addLinkAttributes;
exports.getFilenameFromUrl = getFilenameFromUrl;
exports.isFetchSupported = isFetchSupported;
exports.isValidFetchUrl = isValidFetchUrl;
exports.loadScript = loadScript;
exports.deprecated = deprecated;
exports.PDFDateString = exports.StatTimer = exports.DOMSVGFactory = exports.DOMCMapReaderFactory = exports.BaseCMapReaderFactory = exports.DOMCanvasFactory = exports.BaseCanvasFactory = exports.DEFAULT_LINK_REL = exports.LinkTarget = exports.RenderingCancelledException = exports.PageViewport = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util_metapdf = require("../shared/util_metapdf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var DEFAULT_LINK_REL = "noopener noreferrer nofollow";
exports.DEFAULT_LINK_REL = DEFAULT_LINK_REL;
var SVG_NS = "http://www.w3.org/2000/svg";

var BaseCanvasFactory = /*#__PURE__*/function () {
  function BaseCanvasFactory() {
    _classCallCheck(this, BaseCanvasFactory);

    if (this.constructor === BaseCanvasFactory) {
      (0, _util_metapdf.unreachable)("Cannot initialize BaseCanvasFactory.");
    }
  }

  _createClass(BaseCanvasFactory, [{
    key: "create",
    value: function create(width, height) {
      (0, _util_metapdf.unreachable)("Abstract method `create` called.");
    }
  }, {
    key: "reset",
    value: function reset(canvasAndContext, width, height) {
      if (!canvasAndContext.canvas) {
        throw new Error("Canvas is not specified");
      }

      if (width <= 0 || height <= 0) {
        throw new Error("Invalid canvas size");
      }

      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    }
  }, {
    key: "destroy",
    value: function destroy(canvasAndContext) {
      if (!canvasAndContext.canvas) {
        throw new Error("Canvas is not specified");
      }

      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    }
  }]);

  return BaseCanvasFactory;
}();

exports.BaseCanvasFactory = BaseCanvasFactory;

var DOMCanvasFactory = /*#__PURE__*/function (_BaseCanvasFactory) {
  _inherits(DOMCanvasFactory, _BaseCanvasFactory);

  var _super = _createSuper(DOMCanvasFactory);

  function DOMCanvasFactory() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$ownerDocument = _ref.ownerDocument,
        ownerDocument = _ref$ownerDocument === void 0 ? globalThis.document : _ref$ownerDocument;

    _classCallCheck(this, DOMCanvasFactory);

    _this = _super.call(this);
    _this._document = ownerDocument;
    return _this;
  }

  _createClass(DOMCanvasFactory, [{
    key: "create",
    value: function create(width, height) {
      if (width <= 0 || height <= 0) {
        throw new Error("Invalid canvas size");
      }

      var canvas = this._document.createElement("canvas");

      var context = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      return {
        canvas: canvas,
        context: context
      };
    }
  }]);

  return DOMCanvasFactory;
}(BaseCanvasFactory);

exports.DOMCanvasFactory = DOMCanvasFactory;

var BaseCMapReaderFactory = /*#__PURE__*/function () {
  function BaseCMapReaderFactory(_ref2) {
    var _ref2$baseUrl = _ref2.baseUrl,
        baseUrl = _ref2$baseUrl === void 0 ? null : _ref2$baseUrl,
        _ref2$isCompressed = _ref2.isCompressed,
        isCompressed = _ref2$isCompressed === void 0 ? false : _ref2$isCompressed;

    _classCallCheck(this, BaseCMapReaderFactory);

    if (this.constructor === BaseCMapReaderFactory) {
      (0, _util_metapdf.unreachable)("Cannot initialize BaseCMapReaderFactory.");
    }

    this.baseUrl = baseUrl;
    this.isCompressed = isCompressed;
  }

  _createClass(BaseCMapReaderFactory, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref3) {
        var _this2 = this;

        var name, url, compressionType;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref3.name;

                if (this.baseUrl) {
                  _context.next = 3;
                  break;
                }

                throw new Error('The CMap "baseUrl" parameter must be specified, ensure that ' + 'the "cMapUrl" and "cMapPacked" API parameters are provided.');

              case 3:
                if (name) {
                  _context.next = 5;
                  break;
                }

                throw new Error("CMap name must be specified.");

              case 5:
                url = this.baseUrl + name + (this.isCompressed ? ".bcmap" : "");
                compressionType = this.isCompressed ? _util_metapdf.CMapCompressionType.BINARY : _util_metapdf.CMapCompressionType.NONE;
                return _context.abrupt("return", this._fetchData(url, compressionType)["catch"](function (reason) {
                  throw new Error("Unable to load ".concat(_this2.isCompressed ? "binary " : "", "CMap at: ").concat(url));
                }));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "_fetchData",
    value: function _fetchData(url, compressionType) {
      (0, _util_metapdf.unreachable)("Abstract method `_fetchData` called.");
    }
  }]);

  return BaseCMapReaderFactory;
}();

exports.BaseCMapReaderFactory = BaseCMapReaderFactory;

var DOMCMapReaderFactory = /*#__PURE__*/function (_BaseCMapReaderFactor) {
  _inherits(DOMCMapReaderFactory, _BaseCMapReaderFactor);

  var _super2 = _createSuper(DOMCMapReaderFactory);

  function DOMCMapReaderFactory() {
    _classCallCheck(this, DOMCMapReaderFactory);

    return _super2.apply(this, arguments);
  }

  _createClass(DOMCMapReaderFactory, [{
    key: "_fetchData",
    value: function _fetchData(url, compressionType) {
      var _this3 = this;

      if (isFetchSupported() && isValidFetchUrl(url, document.baseURI)) {
        return fetch(url).then( /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(response) {
            var cMapData;
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (response.ok) {
                      _context2.next = 2;
                      break;
                    }

                    throw new Error(response.statusText);

                  case 2:
                    if (!_this3.isCompressed) {
                      _context2.next = 10;
                      break;
                    }

                    _context2.t0 = Uint8Array;
                    _context2.next = 6;
                    return response.arrayBuffer();

                  case 6:
                    _context2.t1 = _context2.sent;
                    cMapData = new _context2.t0(_context2.t1);
                    _context2.next = 15;
                    break;

                  case 10:
                    _context2.t2 = _util_metapdf.stringToBytes;
                    _context2.next = 13;
                    return response.text();

                  case 13:
                    _context2.t3 = _context2.sent;
                    cMapData = (0, _context2.t2)(_context2.t3);

                  case 15:
                    return _context2.abrupt("return", {
                      cMapData: cMapData,
                      compressionType: compressionType
                    });

                  case 16:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x2) {
            return _ref4.apply(this, arguments);
          };
        }());
      }

      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);

        if (_this3.isCompressed) {
          request.responseType = "arraybuffer";
        }

        request.onreadystatechange = function () {
          if (request.readyState !== XMLHttpRequest.DONE) {
            return;
          }

          if (request.status === 200 || request.status === 0) {
            var cMapData;

            if (_this3.isCompressed && request.response) {
              cMapData = new Uint8Array(request.response);
            } else if (!_this3.isCompressed && request.responseText) {
              cMapData = (0, _util_metapdf.stringToBytes)(request.responseText);
            }

            if (cMapData) {
              resolve({
                cMapData: cMapData,
                compressionType: compressionType
              });
              return;
            }
          }

          reject(new Error(request.statusText));
        };

        request.send(null);
      });
    }
  }]);

  return DOMCMapReaderFactory;
}(BaseCMapReaderFactory);

exports.DOMCMapReaderFactory = DOMCMapReaderFactory;

var DOMSVGFactory = /*#__PURE__*/function () {
  function DOMSVGFactory() {
    _classCallCheck(this, DOMSVGFactory);
  }

  _createClass(DOMSVGFactory, [{
    key: "create",
    value: function create(width, height) {
      (0, _util_metapdf.assert)(width > 0 && height > 0, "Invalid SVG dimensions");
      var svg = document.createElementNS(SVG_NS, "svg:svg");
      svg.setAttribute("version", "1.1");
      svg.setAttribute("width", width + "px");
      svg.setAttribute("height", height + "px");
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      return svg;
    }
  }, {
    key: "createElement",
    value: function createElement(type) {
      (0, _util_metapdf.assert)(typeof type === "string", "Invalid SVG element type");
      return document.createElementNS(SVG_NS, type);
    }
  }]);

  return DOMSVGFactory;
}();

exports.DOMSVGFactory = DOMSVGFactory;

var PageViewport = /*#__PURE__*/function () {
  function PageViewport(_ref5) {
    var viewBox = _ref5.viewBox,
        scale = _ref5.scale,
        rotation = _ref5.rotation,
        _ref5$offsetX = _ref5.offsetX,
        offsetX = _ref5$offsetX === void 0 ? 0 : _ref5$offsetX,
        _ref5$offsetY = _ref5.offsetY,
        offsetY = _ref5$offsetY === void 0 ? 0 : _ref5$offsetY,
        _ref5$dontFlip = _ref5.dontFlip,
        dontFlip = _ref5$dontFlip === void 0 ? false : _ref5$dontFlip;

    _classCallCheck(this, PageViewport);

    this.viewBox = viewBox;
    this.scale = scale;
    this.rotation = rotation;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    var centerX = (viewBox[2] + viewBox[0]) / 2;
    var centerY = (viewBox[3] + viewBox[1]) / 2;
    var rotateA, rotateB, rotateC, rotateD;
    rotation = rotation % 360;
    rotation = rotation < 0 ? rotation + 360 : rotation;

    switch (rotation) {
      case 180:
        rotateA = -1;
        rotateB = 0;
        rotateC = 0;
        rotateD = 1;
        break;

      case 90:
        rotateA = 0;
        rotateB = 1;
        rotateC = 1;
        rotateD = 0;
        break;

      case 270:
        rotateA = 0;
        rotateB = -1;
        rotateC = -1;
        rotateD = 0;
        break;

      case 0:
        rotateA = 1;
        rotateB = 0;
        rotateC = 0;
        rotateD = -1;
        break;

      default:
        throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
    }

    if (dontFlip) {
      rotateC = -rotateC;
      rotateD = -rotateD;
    }

    var offsetCanvasX, offsetCanvasY;
    var width, height;

    if (rotateA === 0) {
      offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
      offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
      width = Math.abs(viewBox[3] - viewBox[1]) * scale;
      height = Math.abs(viewBox[2] - viewBox[0]) * scale;
    } else {
      offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
      offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
      width = Math.abs(viewBox[2] - viewBox[0]) * scale;
      height = Math.abs(viewBox[3] - viewBox[1]) * scale;
    }

    this.transform = [rotateA * scale, rotateB * scale, rotateC * scale, rotateD * scale, offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY, offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY];
    this.width = width;
    this.height = height;
  }

  _createClass(PageViewport, [{
    key: "clone",
    value: function clone() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$scale = _ref6.scale,
          scale = _ref6$scale === void 0 ? this.scale : _ref6$scale,
          _ref6$rotation = _ref6.rotation,
          rotation = _ref6$rotation === void 0 ? this.rotation : _ref6$rotation,
          _ref6$offsetX = _ref6.offsetX,
          offsetX = _ref6$offsetX === void 0 ? this.offsetX : _ref6$offsetX,
          _ref6$offsetY = _ref6.offsetY,
          offsetY = _ref6$offsetY === void 0 ? this.offsetY : _ref6$offsetY,
          _ref6$dontFlip = _ref6.dontFlip,
          dontFlip = _ref6$dontFlip === void 0 ? false : _ref6$dontFlip;

      return new PageViewport({
        viewBox: this.viewBox.slice(),
        scale: scale,
        rotation: rotation,
        offsetX: offsetX,
        offsetY: offsetY,
        dontFlip: dontFlip
      });
    }
  }, {
    key: "convertToViewportPoint",
    value: function convertToViewportPoint(x, y) {
      return _util_metapdf.Util.applyTransform([x, y], this.transform);
    }
  }, {
    key: "convertToViewportRectangle",
    value: function convertToViewportRectangle(rect) {
      var topLeft = _util_metapdf.Util.applyTransform([rect[0], rect[1]], this.transform);

      var bottomRight = _util_metapdf.Util.applyTransform([rect[2], rect[3]], this.transform);

      return [topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]];
    }
  }, {
    key: "convertToPdfPoint",
    value: function convertToPdfPoint(x, y) {
      return _util_metapdf.Util.applyInverseTransform([x, y], this.transform);
    }
  }]);

  return PageViewport;
}();

exports.PageViewport = PageViewport;

var RenderingCancelledException = /*#__PURE__*/function (_BaseException) {
  _inherits(RenderingCancelledException, _BaseException);

  var _super3 = _createSuper(RenderingCancelledException);

  function RenderingCancelledException(msg, type) {
    var _this4;

    _classCallCheck(this, RenderingCancelledException);

    _this4 = _super3.call(this, msg);
    _this4.type = type;
    return _this4;
  }

  return RenderingCancelledException;
}(_util_metapdf.BaseException);

exports.RenderingCancelledException = RenderingCancelledException;
var LinkTarget = {
  NONE: 0,
  SELF: 1,
  BLANK: 2,
  PARENT: 3,
  TOP: 4
};
exports.LinkTarget = LinkTarget;

function addLinkAttributes(link) {
  var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      url = _ref7.url,
      target = _ref7.target,
      rel = _ref7.rel,
      _ref7$enabled = _ref7.enabled,
      enabled = _ref7$enabled === void 0 ? true : _ref7$enabled;

  (0, _util_metapdf.assert)(url && typeof url === "string", 'addLinkAttributes: A valid "url" parameter must provided.');
  var urlNullRemoved = (0, _util_metapdf.removeNullCharacters)(url);

  if (enabled) {
    link.href = link.title = urlNullRemoved;
  } else {
    link.href = "";
    link.title = "Disabled: ".concat(urlNullRemoved);

    link.onclick = function () {
      return false;
    };
  }

  var targetStr = "";

  switch (target) {
    case LinkTarget.NONE:
      break;

    case LinkTarget.SELF:
      targetStr = "_self";
      break;

    case LinkTarget.BLANK:
      targetStr = "_blank";
      break;

    case LinkTarget.PARENT:
      targetStr = "_parent";
      break;

    case LinkTarget.TOP:
      targetStr = "_top";
      break;
  }

  link.target = targetStr;
  link.rel = typeof rel === "string" ? rel : DEFAULT_LINK_REL;
}

function getFilenameFromUrl(url) {
  var anchor = url.indexOf("#");
  var query = url.indexOf("?");
  var end = Math.min(anchor > 0 ? anchor : url.length, query > 0 ? query : url.length);
  return url.substring(url.lastIndexOf("/", end) + 1, end);
}

var StatTimer = /*#__PURE__*/function () {
  function StatTimer() {
    _classCallCheck(this, StatTimer);

    this.started = Object.create(null);
    this.times = [];
  }

  _createClass(StatTimer, [{
    key: "time",
    value: function time(name) {
      if (name in this.started) {
        (0, _util_metapdf.warn)("Timer is already running for ".concat(name));
      }

      this.started[name] = Date.now();
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(name) {
      if (!(name in this.started)) {
        (0, _util_metapdf.warn)("Timer has not been started for ".concat(name));
      }

      this.times.push({
        name: name,
        start: this.started[name],
        end: Date.now()
      });
      delete this.started[name];
    }
  }, {
    key: "toString",
    value: function toString() {
      var outBuf = [];
      var longest = 0;

      var _iterator = _createForOfIteratorHelper(this.times),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var time = _step.value;
          var name = time.name;

          if (name.length > longest) {
            longest = name.length;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(this.times),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _time = _step2.value;
          var duration = _time.end - _time.start;
          outBuf.push("".concat(_time.name.padEnd(longest), " ").concat(duration, "ms\n"));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return outBuf.join("");
    }
  }]);

  return StatTimer;
}();

exports.StatTimer = StatTimer;

function isFetchSupported() {
  return typeof fetch !== "undefined" && typeof Response !== "undefined" && "body" in Response.prototype && typeof ReadableStream !== "undefined";
}

function isValidFetchUrl(url, baseUrl) {
  try {
    var _ref8 = baseUrl ? new URL(url, baseUrl) : new URL(url),
        protocol = _ref8.protocol;

    return protocol === "http:" || protocol === "https:";
  } catch (ex) {
    return false;
  }
}

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement("script");
    script.src = src;
    script.onload = resolve;

    script.onerror = function () {
      reject(new Error("Cannot load script at: ".concat(script.src)));
    };

    (document.head || document.documentElement).appendChild(script);
  });
}

function deprecated(details) {
  console.log("Deprecated API usage: " + details);
}

var pdfDateStringRegex;

var PDFDateString = /*#__PURE__*/function () {
  function PDFDateString() {
    _classCallCheck(this, PDFDateString);
  }

  _createClass(PDFDateString, null, [{
    key: "toDateObject",
    value: function toDateObject(input) {
      if (!input || !(0, _util_metapdf.isString)(input)) {
        return null;
      }

      if (!pdfDateStringRegex) {
        pdfDateStringRegex = new RegExp("^D:" + "(\\d{4})" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "([Z|+|-])?" + "(\\d{2})?" + "'?" + "(\\d{2})?" + "'?");
      }

      var matches = pdfDateStringRegex.exec(input);

      if (!matches) {
        return null;
      }

      var year = parseInt(matches[1], 10);
      var month = parseInt(matches[2], 10);
      month = month >= 1 && month <= 12 ? month - 1 : 0;
      var day = parseInt(matches[3], 10);
      day = day >= 1 && day <= 31 ? day : 1;
      var hour = parseInt(matches[4], 10);
      hour = hour >= 0 && hour <= 23 ? hour : 0;
      var minute = parseInt(matches[5], 10);
      minute = minute >= 0 && minute <= 59 ? minute : 0;
      var second = parseInt(matches[6], 10);
      second = second >= 0 && second <= 59 ? second : 0;
      var universalTimeRelation = matches[7] || "Z";
      var offsetHour = parseInt(matches[8], 10);
      offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
      var offsetMinute = parseInt(matches[9], 10) || 0;
      offsetMinute = offsetMinute >= 0 && offsetMinute <= 59 ? offsetMinute : 0;

      if (universalTimeRelation === "-") {
        hour += offsetHour;
        minute += offsetMinute;
      } else if (universalTimeRelation === "+") {
        hour -= offsetHour;
        minute -= offsetMinute;
      }

      return new Date(Date.UTC(year, month, day, hour, minute, second));
    }
  }]);

  return PDFDateString;
}();

exports.PDFDateString = PDFDateString;