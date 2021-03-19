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
exports.FontLoader = exports.FontFaceObject = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util_metapdf = require("../shared/util_metapdf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseFontLoader = /*#__PURE__*/function () {
  function BaseFontLoader(_ref) {
    var docId = _ref.docId,
        onUnsupportedFeature = _ref.onUnsupportedFeature,
        _ref$ownerDocument = _ref.ownerDocument,
        ownerDocument = _ref$ownerDocument === void 0 ? globalThis.document : _ref$ownerDocument;

    _classCallCheck(this, BaseFontLoader);

    if (this.constructor === BaseFontLoader) {
      (0, _util_metapdf.unreachable)("Cannot initialize BaseFontLoader.");
    }

    this.docId = docId;
    this._onUnsupportedFeature = onUnsupportedFeature;
    this._document = ownerDocument;
    this.nativeFontFaces = [];
    this.styleElement = null;
  }

  _createClass(BaseFontLoader, [{
    key: "addNativeFontFace",
    value: function addNativeFontFace(nativeFontFace) {
      this.nativeFontFaces.push(nativeFontFace);

      this._document.fonts.add(nativeFontFace);
    }
  }, {
    key: "insertRule",
    value: function insertRule(rule) {
      var styleElement = this.styleElement;

      if (!styleElement) {
        styleElement = this.styleElement = this._document.createElement("style");
        styleElement.id = "PDFJS_FONT_STYLE_TAG_".concat(this.docId);

        this._document.documentElement.getElementsByTagName("head")[0].appendChild(styleElement);
      }

      var styleSheet = styleElement.sheet;
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this = this;

      this.nativeFontFaces.forEach(function (nativeFontFace) {
        _this._document.fonts["delete"](nativeFontFace);
      });
      this.nativeFontFaces.length = 0;

      if (this.styleElement) {
        this.styleElement.remove();
        this.styleElement = null;
      }
    }
  }, {
    key: "bind",
    value: function () {
      var _bind = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(font) {
        var _this2 = this;

        var nativeFontFace, rule;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(font.attached || font.missingFile)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                font.attached = true;

                if (!this.isFontLoadingAPISupported) {
                  _context.next = 19;
                  break;
                }

                nativeFontFace = font.createNativeFontFace();

                if (!nativeFontFace) {
                  _context.next = 18;
                  break;
                }

                this.addNativeFontFace(nativeFontFace);
                _context.prev = 7;
                _context.next = 10;
                return nativeFontFace.loaded;

              case 10:
                _context.next = 18;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](7);

                this._onUnsupportedFeature({
                  featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorFontLoadNative
                });

                (0, _util_metapdf.warn)("Failed to load font '".concat(nativeFontFace.family, "': '").concat(_context.t0, "'."));
                font.disableFontFace = true;
                throw _context.t0;

              case 18:
                return _context.abrupt("return");

              case 19:
                rule = font.createFontFaceRule();

                if (!rule) {
                  _context.next = 26;
                  break;
                }

                this.insertRule(rule);

                if (!this.isSyncFontLoadingSupported) {
                  _context.next = 24;
                  break;
                }

                return _context.abrupt("return");

              case 24:
                _context.next = 26;
                return new Promise(function (resolve) {
                  var request = _this2._queueLoadingCallback(resolve);

                  _this2._prepareFontLoadEvent([rule], [font], request);
                });

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 12]]);
      }));

      function bind(_x) {
        return _bind.apply(this, arguments);
      }

      return bind;
    }()
  }, {
    key: "_queueLoadingCallback",
    value: function _queueLoadingCallback(callback) {
      (0, _util_metapdf.unreachable)("Abstract method `_queueLoadingCallback`.");
    }
  }, {
    key: "_prepareFontLoadEvent",
    value: function _prepareFontLoadEvent(rules, fontsToLoad, request) {
      (0, _util_metapdf.unreachable)("Abstract method `_prepareFontLoadEvent`.");
    }
  }, {
    key: "isFontLoadingAPISupported",
    get: function get() {
      var _this$_document;

      return (0, _util_metapdf.shadow)(this, "isFontLoadingAPISupported", !!((_this$_document = this._document) === null || _this$_document === void 0 ? void 0 : _this$_document.fonts));
    }
  }, {
    key: "isSyncFontLoadingSupported",
    get: function get() {
      (0, _util_metapdf.unreachable)("Abstract method `isSyncFontLoadingSupported`.");
    }
  }, {
    key: "_loadTestFont",
    get: function get() {
      (0, _util_metapdf.unreachable)("Abstract method `_loadTestFont`.");
    }
  }]);

  return BaseFontLoader;
}();

var FontLoader;
exports.FontLoader = FontLoader;
{
  exports.FontLoader = FontLoader = /*#__PURE__*/function (_BaseFontLoader) {
    _inherits(GenericFontLoader, _BaseFontLoader);

    var _super = _createSuper(GenericFontLoader);

    function GenericFontLoader(params) {
      var _this3;

      _classCallCheck(this, GenericFontLoader);

      _this3 = _super.call(this, params);
      _this3.loadingContext = {
        requests: [],
        nextRequestId: 0
      };
      _this3.loadTestFontId = 0;
      return _this3;
    }

    _createClass(GenericFontLoader, [{
      key: "_queueLoadingCallback",
      value: function _queueLoadingCallback(callback) {
        function completeRequest() {
          (0, _util_metapdf.assert)(!request.done, "completeRequest() cannot be called twice.");
          request.done = true;

          while (context.requests.length > 0 && context.requests[0].done) {
            var otherRequest = context.requests.shift();
            setTimeout(otherRequest.callback, 0);
          }
        }

        var context = this.loadingContext;
        var request = {
          id: "pdfjs-font-loading-".concat(context.nextRequestId++),
          done: false,
          complete: completeRequest,
          callback: callback
        };
        context.requests.push(request);
        return request;
      }
    }, {
      key: "_prepareFontLoadEvent",
      value: function _prepareFontLoadEvent(rules, fonts, request) {
        var _this4 = this;

        function int32(data, offset) {
          return data.charCodeAt(offset) << 24 | data.charCodeAt(offset + 1) << 16 | data.charCodeAt(offset + 2) << 8 | data.charCodeAt(offset + 3) & 0xff;
        }

        function spliceString(s, offset, remove, insert) {
          var chunk1 = s.substring(0, offset);
          var chunk2 = s.substring(offset + remove);
          return chunk1 + insert + chunk2;
        }

        var i, ii;

        var canvas = this._document.createElement("canvas");

        canvas.width = 1;
        canvas.height = 1;
        var ctx = canvas.getContext("2d");
        var called = 0;

        function isFontReady(name, callback) {
          called++;

          if (called > 30) {
            (0, _util_metapdf.warn)("Load test font never loaded.");
            callback();
            return;
          }

          ctx.font = "30px " + name;
          ctx.fillText(".", 0, 20);
          var imageData = ctx.getImageData(0, 0, 1, 1);

          if (imageData.data[3] > 0) {
            callback();
            return;
          }

          setTimeout(isFontReady.bind(null, name, callback));
        }

        var loadTestFontId = "lt".concat(Date.now()).concat(this.loadTestFontId++);
        var data = this._loadTestFont;
        var COMMENT_OFFSET = 976;
        data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length, loadTestFontId);
        var CFF_CHECKSUM_OFFSET = 16;
        var XXXX_VALUE = 0x58585858;
        var checksum = int32(data, CFF_CHECKSUM_OFFSET);

        for (i = 0, ii = loadTestFontId.length - 3; i < ii; i += 4) {
          checksum = checksum - XXXX_VALUE + int32(loadTestFontId, i) | 0;
        }

        if (i < loadTestFontId.length) {
          checksum = checksum - XXXX_VALUE + int32(loadTestFontId + "XXX", i) | 0;
        }

        data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, (0, _util_metapdf.string32)(checksum));
        var url = "url(data:font/opentype;base64,".concat(btoa(data), ");");
        var rule = "@font-face {font-family:\"".concat(loadTestFontId, "\";src:").concat(url, "}");
        this.insertRule(rule);
        var names = [];

        for (i = 0, ii = fonts.length; i < ii; i++) {
          names.push(fonts[i].loadedName);
        }

        names.push(loadTestFontId);

        var div = this._document.createElement("div");

        div.style.visibility = "hidden";
        div.style.width = div.style.height = "10px";
        div.style.position = "absolute";
        div.style.top = div.style.left = "0px";

        for (i = 0, ii = names.length; i < ii; ++i) {
          var span = this._document.createElement("span");

          span.textContent = "Hi";
          span.style.fontFamily = names[i];
          div.appendChild(span);
        }

        this._document.body.appendChild(div);

        isFontReady(loadTestFontId, function () {
          _this4._document.body.removeChild(div);

          request.complete();
        });
      }
    }, {
      key: "isSyncFontLoadingSupported",
      get: function get() {
        var supported = false;

        if (typeof navigator === "undefined") {
          supported = true;
        } else {
          var m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);

          if ((m === null || m === void 0 ? void 0 : m[1]) >= 14) {
            supported = true;
          }
        }

        return (0, _util_metapdf.shadow)(this, "isSyncFontLoadingSupported", supported);
      }
    }, {
      key: "_loadTestFont",
      get: function get() {
        var getLoadTestFont = function getLoadTestFont() {
          return atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQA" + "FQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAA" + "ALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgA" + "AAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1" + "AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD" + "6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACM" + "AooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4D" + "IP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAA" + "AAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUA" + "AQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgAB" + "AAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABY" + "AAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAA" + "AC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAA" + "AAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQAC" + "AQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3" + "Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTj" + "FQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
        };

        return (0, _util_metapdf.shadow)(this, "_loadTestFont", getLoadTestFont());
      }
    }]);

    return GenericFontLoader;
  }(BaseFontLoader);
}

var FontFaceObject = /*#__PURE__*/function () {
  function FontFaceObject(translatedData, _ref2) {
    var _ref2$isEvalSupported = _ref2.isEvalSupported,
        isEvalSupported = _ref2$isEvalSupported === void 0 ? true : _ref2$isEvalSupported,
        _ref2$disableFontFace = _ref2.disableFontFace,
        disableFontFace = _ref2$disableFontFace === void 0 ? false : _ref2$disableFontFace,
        _ref2$ignoreErrors = _ref2.ignoreErrors,
        ignoreErrors = _ref2$ignoreErrors === void 0 ? false : _ref2$ignoreErrors,
        _ref2$onUnsupportedFe = _ref2.onUnsupportedFeature,
        onUnsupportedFeature = _ref2$onUnsupportedFe === void 0 ? null : _ref2$onUnsupportedFe,
        _ref2$fontRegistry = _ref2.fontRegistry,
        fontRegistry = _ref2$fontRegistry === void 0 ? null : _ref2$fontRegistry;

    _classCallCheck(this, FontFaceObject);

    this.compiledGlyphs = Object.create(null);

    for (var i in translatedData) {
      this[i] = translatedData[i];
    }

    this.isEvalSupported = isEvalSupported !== false;
    this.disableFontFace = disableFontFace === true;
    this.ignoreErrors = ignoreErrors === true;
    this._onUnsupportedFeature = onUnsupportedFeature;
    this.fontRegistry = fontRegistry;
  }

  _createClass(FontFaceObject, [{
    key: "createNativeFontFace",
    value: function createNativeFontFace() {
      if (!this.data || this.disableFontFace) {
        return null;
      }

      var nativeFontFace = new FontFace(this.loadedName, this.data, {});

      if (this.fontRegistry) {
        this.fontRegistry.registerFont(this);
      }

      return nativeFontFace;
    }
  }, {
    key: "createFontFaceRule",
    value: function createFontFaceRule() {
      if (!this.data || this.disableFontFace) {
        return null;
      }

      var data = (0, _util_metapdf.bytesToString)(new Uint8Array(this.data));
      var url = "url(data:".concat(this.mimetype, ";base64,").concat(btoa(data), ");");
      var rule = "@font-face {font-family:\"".concat(this.loadedName, "\";src:").concat(url, "}");

      if (this.fontRegistry) {
        this.fontRegistry.registerFont(this, url);
      }

      return rule;
    }
  }, {
    key: "getPathGenerator",
    value: function getPathGenerator(objs, character) {
      if (this.compiledGlyphs[character] !== undefined) {
        return this.compiledGlyphs[character];
      }

      var cmds, current;

      try {
        cmds = objs.get(this.loadedName + "_path_" + character);
      } catch (ex) {
        if (!this.ignoreErrors) {
          throw ex;
        }

        if (this._onUnsupportedFeature) {
          this._onUnsupportedFeature({
            featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorFontGetPath
          });
        }

        (0, _util_metapdf.warn)("getPathGenerator - ignoring character: \"".concat(ex, "\"."));
        return this.compiledGlyphs[character] = function (c, size) {};
      }

      if (this.isEvalSupported && _util_metapdf.IsEvalSupportedCached.value) {
        var args,
            js = "";

        for (var i = 0, ii = cmds.length; i < ii; i++) {
          current = cmds[i];

          if (current.args !== undefined) {
            args = current.args.join(",");
          } else {
            args = "";
          }

          js += "c." + current.cmd + "(" + args + ");\n";
        }

        return this.compiledGlyphs[character] = new Function("c", "size", js);
      }

      return this.compiledGlyphs[character] = function (c, size) {
        for (var _i = 0, _ii = cmds.length; _i < _ii; _i++) {
          current = cmds[_i];

          if (current.cmd === "scale") {
            current.args = [size, -size];
          }

          c[current.cmd].apply(c, current.args);
        }
      };
    }
  }]);

  return FontFaceObject;
}();

exports.FontFaceObject = FontFaceObject;