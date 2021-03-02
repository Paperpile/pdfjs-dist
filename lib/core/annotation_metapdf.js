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
exports.getQuadPoints = getQuadPoints;
exports.MarkupAnnotation = exports.AnnotationFactory = exports.AnnotationBorderStyle = exports.Annotation = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util_metapdf = require("../shared/util_metapdf.js");

var _obj = require("./obj.js");

var _primitives = require("./primitives.js");

var _colorspace_metapdf = require("./colorspace_metapdf.js");

var _core_utils = require("./core_utils.js");

var _operator_list = require("./operator_list.js");

var _stream = require("./stream.js");

var _writer = require("./writer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnnotationFactory = /*#__PURE__*/function () {
  function AnnotationFactory() {
    _classCallCheck(this, AnnotationFactory);
  }

  _createClass(AnnotationFactory, null, [{
    key: "create",
    value: function create(xref, ref, pdfManager, idFactory) {
      var _this = this;

      return pdfManager.ensureCatalog("acroForm").then(function (acroForm) {
        return pdfManager.ensure(_this, "_create", [xref, ref, pdfManager, idFactory, acroForm]);
      });
    }
  }, {
    key: "_create",
    value: function _create(xref, ref, pdfManager, idFactory, acroForm) {
      var dict = xref.fetchIfRef(ref);

      if (!(0, _primitives.isDict)(dict)) {
        return undefined;
      }

      var id = (0, _primitives.isRef)(ref) ? ref.toString() : "annot_".concat(idFactory.createObjId());
      var subtype = dict.get("Subtype");
      subtype = (0, _primitives.isName)(subtype) ? subtype.name : null;
      var parameters = {
        xref: xref,
        ref: ref,
        dict: dict,
        subtype: subtype,
        id: id,
        pdfManager: pdfManager,
        acroForm: acroForm instanceof _primitives.Dict ? acroForm : _primitives.Dict.empty
      };

      switch (subtype) {
        case "Link":
          return new LinkAnnotation(parameters);

        case "Text":
          return new TextAnnotation(parameters);

        case "Widget":
          var fieldType = (0, _core_utils.getInheritableProperty)({
            dict: dict,
            key: "FT"
          });
          fieldType = (0, _primitives.isName)(fieldType) ? fieldType.name : null;

          switch (fieldType) {
            case "Tx":
              return new TextWidgetAnnotation(parameters);

            case "Btn":
              return new ButtonWidgetAnnotation(parameters);

            case "Ch":
              return new ChoiceWidgetAnnotation(parameters);
          }

          (0, _util_metapdf.warn)('Unimplemented widget field type "' + fieldType + '", ' + "falling back to base field type.");
          return new WidgetAnnotation(parameters);

        case "Popup":
          return new PopupAnnotation(parameters);

        case "FreeText":
          return new FreeTextAnnotation(parameters);

        case "Line":
          return new LineAnnotation(parameters);

        case "Square":
          return new SquareAnnotation(parameters);

        case "Circle":
          return new CircleAnnotation(parameters);

        case "PolyLine":
          return new PolylineAnnotation(parameters);

        case "Polygon":
          return new PolygonAnnotation(parameters);

        case "Caret":
          return new CaretAnnotation(parameters);

        case "Ink":
          return new InkAnnotation(parameters);

        case "Highlight":
          return new HighlightAnnotation(parameters);

        case "Underline":
          return new UnderlineAnnotation(parameters);

        case "Squiggly":
          return new SquigglyAnnotation(parameters);

        case "StrikeOut":
          return new StrikeOutAnnotation(parameters);

        case "Stamp":
          return new StampAnnotation(parameters);

        case "FileAttachment":
          return new FileAttachmentAnnotation(parameters);

        default:
          return new Annotation(parameters);
      }
    }
  }]);

  return AnnotationFactory;
}();

exports.AnnotationFactory = AnnotationFactory;

function getQuadPoints(dict, rect) {
  if (!dict.has("QuadPoints")) {
    return null;
  }

  var quadPoints = dict.getArray("QuadPoints");

  if (!Array.isArray(quadPoints) || quadPoints.length === 0 || quadPoints.length % 8 > 0) {
    return null;
  }

  var quadPointsLists = [];

  for (var i = 0, ii = quadPoints.length / 8; i < ii; i++) {
    quadPointsLists.push([]);

    for (var j = i * 8, jj = i * 8 + 8; j < jj; j += 2) {
      var x = quadPoints[j];
      var y = quadPoints[j + 1];

      if (rect !== null && (x < rect[0] || x > rect[2] || y < rect[1] || y > rect[3])) {
        return null;
      }

      quadPointsLists[i].push({
        x: x,
        y: y
      });
    }
  }

  return quadPointsLists;
}

function getTransformMatrix(rect, bbox, matrix) {
  var _Util$getAxialAligned = _util_metapdf.Util.getAxialAlignedBoundingBox(bbox, matrix),
      _Util$getAxialAligned2 = _slicedToArray(_Util$getAxialAligned, 4),
      minX = _Util$getAxialAligned2[0],
      minY = _Util$getAxialAligned2[1],
      maxX = _Util$getAxialAligned2[2],
      maxY = _Util$getAxialAligned2[3];

  if (minX === maxX || minY === maxY) {
    return [1, 0, 0, 1, rect[0], rect[1]];
  }

  var xRatio = (rect[2] - rect[0]) / (maxX - minX);
  var yRatio = (rect[3] - rect[1]) / (maxY - minY);
  return [xRatio, 0, 0, yRatio, rect[0] - minX * xRatio, rect[1] - minY * yRatio];
}

function getDefaultAppearance(dict) {
  var appearanceState = dict.get('AP');

  if (!(0, _primitives.isDict)(appearanceState)) {
    return;
  }

  var appearance;
  var appearances = appearanceState.get('N');

  if ((0, _primitives.isDict)(appearances)) {
    var as = dict.get('AS');

    if (as && appearances.has(as.name)) {
      appearance = appearances.get(as.name);
    }
  } else {
    appearance = appearances;
  }

  return appearance;
}

var Annotation = /*#__PURE__*/function () {
  function Annotation(params) {
    _classCallCheck(this, Annotation);

    var dict = params.dict;
    this.setContents(dict.get("Contents"));
    this.setModificationDate(dict.get("M"));
    this.setFlags(dict.get("F"));
    this.setRectangle(dict.getArray("Rect"));
    this.setColor(dict.getArray("C"));
    this.setBorderStyle(dict);
    var me = this;
    this.appearance = getDefaultAppearance(dict);

    var normalizeNumbers = function normalizeNumbers(array) {
      if (!array) return array;
      var decimals = 3;

      if (typeof MP !== 'undefined' && MP && MP.options && 'decimals' in MP.options) {
        decimals = MP.options.decimals;
      }

      for (var i = 0; i < array.length; i++) {
        array[i] = +array[i].toFixed(decimals);
      }
    };

    normalizeNumbers(this.rectangle);
    this._streams = [];

    if (this.appearance) {
      this._streams.push(this.appearance);
    }

    this.data = {
      annotationFlags: this.flags,
      borderStyle: this.borderStyle,
      id: params.id,
      modificationDate: this.modificationDate,
      rect: this.rectangle,
      subtype: params.subtype
    };

    if (this.color && this.color.length && this.color.length >= 3) {
      this.data.color = [this.color[0], this.color[1], this.color[2]];
    } else {
      this.data.color = [0, 0, 0];
    }

    this.data.creationDate = dict.get('CreationDate');
    this.data.m = dict.get('M');

    if (dict.has('NM')) {
      this.data.nm = dict.get('NM');
    }

    if (dict.has('MarkupText')) {
      this.data.markupText = (0, _util_metapdf.stringToPDFString)(dict.get('MarkupText') || '');
    } else {
      this.data.markupText = '';
    }

    if (dict.has('RC')) {
      this.data.richContent = dict.get('RC');
    }

    if (dict.has('EMail')) {
      this.data.email = (0, _util_metapdf.stringToPDFString)(dict.get('EMail') || '');
    }

    if (dict.has('UserPic')) {
      this.data.photoRef = (0, _util_metapdf.stringToPDFString)(dict.get('UserPic') || '');
    }

    if (dict.has('T')) {
      this.data.title = (0, _util_metapdf.stringToPDFString)(dict.get('T') || '');
    }

    if (dict.has('CA')) {
      this.data.ca = dict.get('CA');
    }

    if (dict.has('IC')) {
      var IC = dict.get('IC');

      if (IC && IC.length) {
        var interiorColor = this.rgbColor(dict.get('IC'));
        this.data.interiorColor = [interiorColor[0], interiorColor[1], interiorColor[2]];
      }
    }

    if (dict.has('L')) {
      var line = dict.get('L');
      normalizeNumbers(line);
      this.data.line = line;
    }

    if (dict.has('LE')) {
      this.data.lineEnding = dict.get('LE');
    }

    if (dict.has('InkList')) {
      var inkList = dict.get('InkList');

      for (var ink = 0; ink < inkList.length; ink++) {
        normalizeNumbers(inkList[ink]);
      }

      this.data.inkList = inkList;
    }

    if (dict.has('IT')) {
      this.data.intention = dict.get('IT').name;
    }

    if (dict.has('RD')) {
      var rd = dict.get('RD');
      normalizeNumbers(rd);
      this.data.rectDifference = rd;
    }

    if (dict.has('Vertices')) {
      var vertices = dict.get('Vertices');
      normalizeNumbers(vertices);
      this.data.vertices = vertices;
    }

    if (dict.has('BE')) {
      var be = dict.get('BE');
      this.data.borderEffect = {};
      if (be.has('I')) this.data.borderEffect.I = be.get('I');
      if (be.has('S')) this.data.borderEffect.S = be.get('S');
    }

    if (dict.has('DS') && this.data.subtype === 'FreeText') {
      this.data.ds = (0, _util_metapdf.stringToPDFString)(dict.get('DS') || '');
      var tmp = this.data.ds.replace(/\s+/g, ' ').replace(/^\s/, '').replace(/\s$/, '').split(/\s*;\s*/);
      var font = {
        'font': null,
        'size': null,
        'color': null
      };
      tmp.forEach(function (entry) {
        var x = entry.split(/\s*:\s*/);
        var y;

        if (x && x.length == 2) {
          x[0] = x[0].toLowerCase();

          if (x[0] == 'font') {
            y = x[1].match(/(.+)\s([\d\.]+)pt/);

            if (y && y.length == 3) {
              font.font = y[1].replace(/'/g, '').replace(/"/g, '');
              font.size = y[2];
            }
          } else if (x[0] === 'font-family') {
            y = x[1].match(/([\d\.]+)pt/);

            if (y && y.length == 2) {
              font.size = y[1];
            }
          } else if (x[0] === 'font-size') {
            y = x[1].split(',');

            if (y && y.length) {
              font.font = y[0].replace(/'/g, '').replace(/"/g, '');
            }
          } else if (x[0] == 'color') {
            font.color = me._colorStringToArray(x[1]);
          } else if (x[0] == 'font-stretch') {
            font.fontStretch = x[1];
          } else if (x[0] == 'text-align') {
            font.textAlign = x[1];
          } else if (x[0] == 'font-weight' && x[1] == 'bold') {
            font.fontWeight = 'bold';
          } else if (x[0] == 'font-style' && x[1] == 'italic') {
            font.fontStyle = 'italic';
          }
        }
      });

      if (font.font && font.font.split(',')[0].indexOf('bold ') >= 0) {
        font.fontWeight = 'bold';
        font.font = font.font.replace('bold ', '');
      }

      if (font.font && font.font.split(',')[0].indexOf('italic ') >= 0) {
        font.fontStyle = 'italic';
        font.font = font.font.replace('italic ', '');
      }

      if (font.font && font.font.indexOf('MetaPDF') >= 0) {
        if (font.font.indexOf('Bold') >= 0) font.fontWeight = 'bold';
        if (font.font.indexOf('Oblique') >= 0) font.fontStyle = 'italic';
      }

      this.data.font = font;

      if (!this.data.font.font) {
        this.data.tainted = true;
      }
    }

    if (dict.has('Subj')) {
      var subj = dict.get('Subj');

      if (['Text Box', 'Textfeld'].indexOf(subj) >= 0 && this.color && this.color.length) {
        this.data.interiorColor = this.data.color;
        delete this.data.color;
        var color = this.data.interiorColor;

        if (color && color[0] === 0 && color[1] === 0 && color[2] === 0) {
          if (!this.data.font || !this.data.font.color || this.data.font.color[0] === 0 && this.data.font.color[1] === 0 && this.data.font.color[2] === 0) {
            delete this.data.interiorColor;
          }
        }
      }
    }

    if (dict.has('DA') && this.data.subtype === 'FreeText') {
      var da = dict.get('DA');

      if (da) {
        var colorMatch = /(\d+\.?\d*\s\d+\.?\d*\s\d+\.?\d*)\srg/.exec(da);

        if (colorMatch && colorMatch[1]) {
          var color = this.rgbColor(colorMatch[1].split(' '));
          this.data.color = [color[0], color[1], color[2]];
        }
      }
    }

    if (dict.has('Contents')) {
      this.data.content = (0, _util_metapdf.stringToPDFString)(dict.get('Contents') || '');
    }

    if (dict.has('Replies')) {
      this.data.replies = [];
      dict.get('Replies').forEach(function (item) {
        if (item._map) {
          var tmp = {};

          if ('Contents' in item._map) {
            tmp.content = (0, _util_metapdf.stringToPDFString)(item._map.Contents || '');
          }

          if ('M' in item._map) {
            tmp.date = (0, _util_metapdf.stringToPDFString)(item._map.M || '');
          }

          if ('NM' in item._map) {
            tmp.replyid = (0, _util_metapdf.stringToPDFString)(item._map.NM || '');
          }

          if ('T' in item._map) {
            tmp.author = (0, _util_metapdf.stringToPDFString)(item._map.T || '');
          }

          if ('EMail' in item._map) {
            tmp.email = (0, _util_metapdf.stringToPDFString)(item._map.EMail || '');
          }

          if ('UserPic' in item._map) {
            tmp.photoRef = (0, _util_metapdf.stringToPDFString)(item._map.UserPic || '');
          }

          me.data.replies.push(tmp);
        }
      });
    }

    if (dict._map && dict._map['Popup']) {
      this.data.popup = {
        num: dict._map['Popup'].num,
        gen: dict._map['Popup'].gen
      };
    }

    if (dict._map && dict._map['AP']) {
      if (dict._map['AP']._map && dict._map['AP']._map['N']) {
        this.data.ap = {
          num: dict._map['AP']._map['N'].num,
          gen: dict._map['AP']._map['N'].gen
        };
      }
    }

    if (dict._map && dict._map['IRT']) {
      if (params.xref && params.xref._cacheMap) {
        var IRTobj = params.xref._cacheMap[parseInt(dict._map['IRT'].num + '')];

        if (IRTobj && IRTobj._map && IRTobj._map.NM) {
          this.data.inReplyToId = IRTobj._map.NM;
        }
      }

      if (this.data.inReplyToId) {
        this.data.inReplyTo = {
          num: dict._map['IRT'].num,
          gen: dict._map['IRT'].gen
        };
      }
    }

    var qp = dict.get('QuadPoints');

    if (Array.isArray(qp)) {
      normalizeNumbers(qp);
      this.data.quadPoints = qp;
    }

    if (dict.has('KAMI:comment_b64') && this.data.quadPoints && this.data.quadPoints.length) {
      this.data.rect = this._rectFromQuadPoints(this.data.quadPoints);
    }

    if (params.ref && params.ref.num) {
      if (typeof global !== 'undefined' && global.MP && global.MP.isSingleFile) {
        this.data.id = 'nm' in this.data ? this.data.nm : params.ref.num;
      } else {
        this.data.id = 'nm' in this.data ? this.data.nm : typeof MP !== 'undefined' ? MP.sharedutils.getNewUUID(this.data, params.ref.num) : null;
      }

      this.data.num = params.ref.num;
      this.data.gen = params.ref.gen;
    } else if ('nm' in this.data) {
      this.data.id = this.data.nm;
    }

    if (params.id && typeof params.id === 'string') {
      var num = parseInt(params.id.replace(/[^\d]/g, ''));

      if (num > 0) {
        this.data.num = num;

        if (params.xref && params.xref.entries && params.xref.entries[num] && _typeof(params.xref.entries[num]) === 'object') {
          this.data.gen = params.xref.entries[num].gen;
        }
      }
    }

    this._fallbackFontDict = null;
  }

  _createClass(Annotation, [{
    key: "_colorStringToArray",
    value: function _colorStringToArray(color) {
      if (Array.isArray(color) && color.length === 3) return color;
      var c = [0, 0, 0];
      if (typeof color !== 'string') return c;
      color = color.trim();
      var rgbMatch = /rgb\(([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)/i.exec(color);
      var hexMatch = /#?([0-9A-F][0-9A-F])([0-9A-F][0-9A-F])([0-9A-F][0-9A-F])/i.exec(color);

      if (rgbMatch && rgbMatch.length === 4) {
        var values = [rgbMatch[1], rgbMatch[2], rgbMatch[3]];

        if (values.join('').indexOf('.') >= 0) {
          c[0] = Math.floor(parseFloat(values[0]) * 255);
          c[1] = Math.floor(parseFloat(values[1]) * 255);
          c[2] = Math.floor(parseFloat(values[2]) * 255);
        } else {
          c[0] = parseInt(values[0]);
          c[1] = parseInt(values[1]);
          c[2] = parseInt(values[2]);
        }
      } else if (hexMatch && hexMatch.length === 4) {
        c[0] = parseInt(hexMatch[1], 16);
        c[1] = parseInt(hexMatch[2], 16);
        c[2] = parseInt(hexMatch[3], 16);
      }

      if (c[0] === 1 && c[1] === 1 && c[2] === 1) {
        c = [255, 255, 255];
      }

      c[0] = isNaN(c[0]) ? 0 : c[0];
      c[1] = isNaN(c[1]) ? 0 : c[1];
      c[2] = isNaN(c[2]) ? 0 : c[2];
      return c;
    }
  }, {
    key: "_rectFromQuadPoints",
    value: function _rectFromQuadPoints(quadPoints) {
      var rect = [quadPoints[0], quadPoints[1], quadPoints[0], quadPoints[1]];

      for (var i = 0; i < quadPoints.length; i += 8) {
        rect[0] = Math.min(rect[0], quadPoints[i + 0], quadPoints[i + 2], quadPoints[i + 4], quadPoints[i + 6]);
        rect[2] = Math.max(rect[2], quadPoints[i + 0], quadPoints[i + 2], quadPoints[i + 4], quadPoints[i + 6]);
        rect[1] = Math.min(rect[1], quadPoints[i + 1], quadPoints[i + 3], quadPoints[i + 5], quadPoints[i + 7]);
        rect[3] = Math.max(rect[3], quadPoints[i + 1], quadPoints[i + 3], quadPoints[i + 5], quadPoints[i + 7]);
      }

      return rect;
    }
  }, {
    key: "_hasFlag",
    value: function _hasFlag(flags, flag) {
      return !!(flags & flag);
    }
  }, {
    key: "_isViewable",
    value: function _isViewable(flags) {
      return !this._hasFlag(flags, _util_metapdf.AnnotationFlag.INVISIBLE) && !this._hasFlag(flags, _util_metapdf.AnnotationFlag.HIDDEN) && !this._hasFlag(flags, _util_metapdf.AnnotationFlag.NOVIEW);
    }
  }, {
    key: "_isPrintable",
    value: function _isPrintable(flags) {
      return this._hasFlag(flags, _util_metapdf.AnnotationFlag.PRINT) && !this._hasFlag(flags, _util_metapdf.AnnotationFlag.INVISIBLE) && !this._hasFlag(flags, _util_metapdf.AnnotationFlag.HIDDEN);
    }
  }, {
    key: "setContents",
    value: function setContents(contents) {
      this.contents = (0, _util_metapdf.stringToPDFString)(contents || "");
    }
  }, {
    key: "setModificationDate",
    value: function setModificationDate(modificationDate) {
      this.modificationDate = (0, _util_metapdf.isString)(modificationDate) ? modificationDate : null;
    }
  }, {
    key: "setFlags",
    value: function setFlags(flags) {
      this.flags = Number.isInteger(flags) && flags > 0 ? flags : 0;
    }
  }, {
    key: "hasFlag",
    value: function hasFlag(flag) {
      return this._hasFlag(this.flags, flag);
    }
  }, {
    key: "setRectangle",
    value: function setRectangle(rectangle) {
      if (Array.isArray(rectangle) && rectangle.length === 4) {
        this.rectangle = _util_metapdf.Util.normalizeRect(rectangle);
      } else {
        this.rectangle = [0, 0, 0, 0];
      }
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      var rgbColor = new Uint8ClampedArray(3);

      if (!Array.isArray(color)) {
        this.color = rgbColor;
        return;
      }

      switch (color.length) {
        case 0:
          this.color = null;
          break;

        case 1:
          _colorspace_metapdf.ColorSpace.singletons.gray.getRgbItem(color, 0, rgbColor, 0);

          this.color = rgbColor;
          break;

        case 3:
          _colorspace_metapdf.ColorSpace.singletons.rgb.getRgbItem(color, 0, rgbColor, 0);

          this.color = rgbColor;
          break;

        case 4:
          _colorspace_metapdf.ColorSpace.singletons.cmyk.getRgbItem(color, 0, rgbColor, 0);

          this.color = rgbColor;
          break;

        default:
          this.color = rgbColor;
          break;
      }
    }
  }, {
    key: "rgbColor",
    value: function rgbColor(color) {
      var rgbColor = new Uint8Array(3);

      if (!Array.isArray(color)) {
        return rgbColor;
      }

      switch (color.length) {
        case 0:
          return null;

        case 1:
          _colorspace_metapdf.ColorSpace.singletons.gray.getRgbItem(color, 0, rgbColor, 0);

          return rgbColor;

        case 3:
          _colorspace_metapdf.ColorSpace.singletons.rgb.getRgbItem(color, 0, rgbColor, 0);

          return rgbColor;

        case 4:
          _colorspace_metapdf.ColorSpace.singletons.cmyk.getRgbItem(color, 0, rgbColor, 0);

          return rgbColor;

        default:
          return rgbColor;
      }
    }
  }, {
    key: "setBorderStyle",
    value: function setBorderStyle(borderStyle) {
      this.borderStyle = new AnnotationBorderStyle();

      if (!(0, _primitives.isDict)(borderStyle)) {
        return;
      }

      if (borderStyle.has("BS")) {
        var dict = borderStyle.get("BS");
        var dictType = dict.get("Type");

        if (!dictType || (0, _primitives.isName)(dictType, "Border")) {
          this.borderStyle.setWidth(dict.get("W"), this.rectangle);
          this.borderStyle.setStyle(dict.get("S"));
          this.borderStyle.setDashArray(dict.getArray("D"));
        }
      } else if (borderStyle.has("Border")) {
        var array = borderStyle.getArray("Border");

        if (Array.isArray(array) && array.length >= 3) {
          this.borderStyle.setHorizontalCornerRadius(array[0]);
          this.borderStyle.setVerticalCornerRadius(array[1]);
          this.borderStyle.setWidth(array[2], this.rectangle);

          if (array.length === 4) {
            this.borderStyle.setDashArray(array[3]);
          }
        }
      } else {
        this.borderStyle.setWidth(0);
        this.borderStyle.widthForcedZero = 1;
      }
    }
  }, {
    key: "setAppearance",
    value: function setAppearance(dict) {
      this.appearance = null;
      var appearanceStates = dict.get("AP");

      if (!(0, _primitives.isDict)(appearanceStates)) {
        return;
      }

      var normalAppearanceState = appearanceStates.get("N");

      if ((0, _primitives.isStream)(normalAppearanceState)) {
        this.appearance = normalAppearanceState;
        return;
      }

      if (!(0, _primitives.isDict)(normalAppearanceState)) {
        return;
      }

      var as = dict.get("AS");

      if (!(0, _primitives.isName)(as) || !normalAppearanceState.has(as.name)) {
        return;
      }

      this.appearance = normalAppearanceState.get(as.name);
    }
  }, {
    key: "toBeRendered",
    value: function toBeRendered() {
      var data = this.data;

      if (data.subtype == 'Stamp') {
        return true;
      } else if (MP.sharedutils.supportedSubtypes.indexOf(data.subtype) > -1) {
        return false;
      } else if (data.subtype == 'Popup') {
        return false;
      }

      return true;
    }
  }, {
    key: "loadResources",
    value: function loadResources(keys) {
      return this.appearance.dict.getAsync("Resources").then(function (resources) {
        if (!resources) {
          return undefined;
        }

        var objectLoader = new _obj.ObjectLoader(resources, keys, resources.xref);
        return objectLoader.load().then(function () {
          return resources;
        });
      });
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList(evaluator, task, renderForms, annotationStorage) {
      var _this2 = this;

      if (!this.appearance) {
        return Promise.resolve(new _operator_list.OperatorList());
      }

      var data = this.data;

      if (data.subtype == 'Text') {
        return Promise.resolve(new _operator_list.OperatorList());
      }

      var appearanceDict = this.appearance.dict;
      var resourcesPromise = this.loadResources(['ExtGState', 'ColorSpace', 'Pattern', 'Shading', 'XObject', 'Font']);
      var bbox = appearanceDict.getArray("BBox") || [0, 0, 1, 1];
      var matrix = appearanceDict.getArray("Matrix") || [1, 0, 0, 1, 0, 0];
      var transform = getTransformMatrix(data.rect, bbox, matrix);
      return resourcesPromise.then(function (resources) {
        var opList = new _operator_list.OperatorList();
        opList.addOp(_util_metapdf.OPS.beginAnnotation, [data.rect, transform, matrix]);
        var flag = true;
        if (MP.sharedutils.supportedSubtypes.indexOf(data.subtype) == -1) flag = false;
        opList.addOp(_util_metapdf.OPS.beginAnnotation, [data.rect, transform, matrix, flag]);
        return evaluator.getOperatorList({
          stream: _this2.appearance,
          task: task,
          resources: resources,
          operatorList: opList
        }).then(function () {
          opList.addOp(_util_metapdf.OPS.endAnnotation, [data.rect, data.id]);

          _this2.appearance.reset();

          return opList;
        });
      });
    }
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(evaluator, task, annotationStorage) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", null);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function save(_x, _x2, _x3) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "getFieldObject",
    value: function getFieldObject() {
      return null;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _iterator = _createForOfIteratorHelper(this._streams),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var stream = _step.value;
          stream.reset();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "viewable",
    get: function get() {
      if (this.data.quadPoints === null) {
        return false;
      }

      if (this.flags === 0) {
        return true;
      }

      return this._isViewable(this.flags);
    }
  }, {
    key: "printable",
    get: function get() {
      if (this.data.quadPoints === null) {
        return false;
      }

      if (this.flags === 0) {
        return false;
      }

      return this._isPrintable(this.flags);
    }
  }]);

  return Annotation;
}();

exports.Annotation = Annotation;

var AnnotationBorderStyle = /*#__PURE__*/function () {
  function AnnotationBorderStyle() {
    _classCallCheck(this, AnnotationBorderStyle);

    this.width = 1;
    this.style = _util_metapdf.AnnotationBorderStyleType.SOLID;
    this.dashArray = [3];
    this.horizontalCornerRadius = 0;
    this.verticalCornerRadius = 0;
  }

  _createClass(AnnotationBorderStyle, [{
    key: "setWidth",
    value: function setWidth(width) {
      var rect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0, 0];

      if ((0, _primitives.isName)(width)) {
        this.width = 0;
        return;
      }

      if (parseFloat(width) === width) {
        if (width > 0) {
          var maxWidth = (rect[2] - rect[0]) / 2;
          var maxHeight = (rect[3] - rect[1]) / 2;

          if (maxWidth > 0 && maxHeight > 0 && (width > maxWidth || width > maxHeight)) {
            (0, _util_metapdf.warn)("AnnotationBorderStyle.setWidth - ignoring width: ".concat(width));
            width = 1;
          }
        }

        this.width = width;
      }
    }
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      if (!(0, _primitives.isName)(style)) {
        return;
      }

      switch (style.name) {
        case "S":
          this.style = _util_metapdf.AnnotationBorderStyleType.SOLID;
          break;

        case "D":
          this.style = _util_metapdf.AnnotationBorderStyleType.DASHED;
          break;

        case "B":
          this.style = _util_metapdf.AnnotationBorderStyleType.BEVELED;
          break;

        case "I":
          this.style = _util_metapdf.AnnotationBorderStyleType.INSET;
          break;

        case "U":
          this.style = _util_metapdf.AnnotationBorderStyleType.UNDERLINE;
          break;

        default:
          break;
      }
    }
  }, {
    key: "setDashArray",
    value: function setDashArray(dashArray) {
      if (Array.isArray(dashArray) && dashArray.length > 0) {
        var isValid = true;
        var allZeros = true;

        var _iterator2 = _createForOfIteratorHelper(dashArray),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var element = _step2.value;
            var validNumber = +element >= 0;

            if (!validNumber) {
              isValid = false;
              break;
            } else if (element > 0) {
              allZeros = false;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (isValid && !allZeros) {
          this.dashArray = dashArray;
        } else {
          this.width = 0;
        }
      } else if (dashArray) {
        this.width = 0;
      }
    }
  }, {
    key: "setHorizontalCornerRadius",
    value: function setHorizontalCornerRadius(radius) {
      if (Number.isInteger(radius)) {
        this.horizontalCornerRadius = radius;
      }
    }
  }, {
    key: "setVerticalCornerRadius",
    value: function setVerticalCornerRadius(radius) {
      if (Number.isInteger(radius)) {
        this.verticalCornerRadius = radius;
      }
    }
  }]);

  return AnnotationBorderStyle;
}();

exports.AnnotationBorderStyle = AnnotationBorderStyle;

var MarkupAnnotation = /*#__PURE__*/function (_Annotation) {
  _inherits(MarkupAnnotation, _Annotation);

  var _super = _createSuper(MarkupAnnotation);

  function MarkupAnnotation(parameters) {
    var _this3;

    _classCallCheck(this, MarkupAnnotation);

    _this3 = _super.call(this, parameters);
    var dict = parameters.dict;

    if (dict.has("IRT")) {
      var rawIRT = dict.getRaw("IRT");
      _this3.data.inReplyTo = (0, _primitives.isRef)(rawIRT) ? rawIRT.toString() : null;
      var rt = dict.get("RT");
      _this3.data.replyType = (0, _primitives.isName)(rt) ? rt.name : _util_metapdf.AnnotationReplyType.REPLY;
    }

    if (_this3.data.replyType === _util_metapdf.AnnotationReplyType.GROUP) {
      var parent = dict.get("IRT");
      _this3.data.title = (0, _util_metapdf.stringToPDFString)(parent.get("T") || "");

      _this3.setContents(parent.get("Contents"));

      _this3.data.contents = _this3.contents;

      if (!parent.has("CreationDate")) {
        _this3.data.creationDate = null;
      } else {
        _this3.setCreationDate(parent.get("CreationDate"));

        _this3.data.creationDate = _this3.creationDate;
      }

      if (!parent.has("M")) {
        _this3.data.modificationDate = null;
      } else {
        _this3.setModificationDate(parent.get("M"));

        _this3.data.modificationDate = _this3.modificationDate;
      }

      _this3.data.hasPopup = parent.has("Popup");

      if (!parent.has("C")) {
        _this3.data.color = null;
      } else {
        _this3.setColor(parent.getArray("C"));

        _this3.data.color = _this3.color;
      }
    } else {
      _this3.data.title = (0, _util_metapdf.stringToPDFString)(dict.get("T") || "");

      _this3.setCreationDate(dict.get("CreationDate"));

      _this3.data.creationDate = _this3.creationDate;
      _this3.data.hasPopup = dict.has("Popup");

      if (!dict.has("C")) {
        _this3.data.color = null;
      }
    }

    return _this3;
  }

  _createClass(MarkupAnnotation, [{
    key: "setCreationDate",
    value: function setCreationDate(creationDate) {
      this.creationDate = (0, _util_metapdf.isString)(creationDate) ? creationDate : null;
    }
  }, {
    key: "_setDefaultAppearance",
    value: function _setDefaultAppearance(_ref) {
      var xref = _ref.xref,
          extra = _ref.extra,
          strokeColor = _ref.strokeColor,
          fillColor = _ref.fillColor,
          blendMode = _ref.blendMode,
          pointsCallback = _ref.pointsCallback;
      var minX = Number.MAX_VALUE;
      var minY = Number.MAX_VALUE;
      var maxX = Number.MIN_VALUE;
      var maxY = Number.MIN_VALUE;
      var buffer = ["q"];

      if (extra) {
        buffer.push(extra);
      }

      if (strokeColor) {
        buffer.push("".concat(strokeColor[0], " ").concat(strokeColor[1], " ").concat(strokeColor[2], " RG"));
      }

      if (fillColor) {
        buffer.push("".concat(fillColor[0], " ").concat(fillColor[1], " ").concat(fillColor[2], " rg"));
      }

      var _iterator3 = _createForOfIteratorHelper(this.data.quadPoints),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var points = _step3.value;

          var _pointsCallback = pointsCallback(buffer, points),
              _pointsCallback2 = _slicedToArray(_pointsCallback, 4),
              mX = _pointsCallback2[0],
              MX = _pointsCallback2[1],
              mY = _pointsCallback2[2],
              MY = _pointsCallback2[3];

          minX = Math.min(minX, mX);
          maxX = Math.max(maxX, MX);
          minY = Math.min(minY, mY);
          maxY = Math.max(maxY, MY);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      buffer.push("Q");
      var formDict = new _primitives.Dict(xref);
      var appearanceStreamDict = new _primitives.Dict(xref);
      appearanceStreamDict.set("Subtype", _primitives.Name.get("Form"));
      var appearanceStream = new _stream.StringStream(buffer.join(" "));
      appearanceStream.dict = appearanceStreamDict;
      formDict.set("Fm0", appearanceStream);
      var gsDict = new _primitives.Dict(xref);

      if (blendMode) {
        gsDict.set("BM", _primitives.Name.get(blendMode));
      }

      var stateDict = new _primitives.Dict(xref);
      stateDict.set("GS0", gsDict);
      var resources = new _primitives.Dict(xref);
      resources.set("ExtGState", stateDict);
      resources.set("XObject", formDict);
      var appearanceDict = new _primitives.Dict(xref);
      appearanceDict.set("Resources", resources);
      var bbox = this.data.rect = [minX, minY, maxX, maxY];
      appearanceDict.set("BBox", bbox);
      this.appearance = new _stream.StringStream("/GS0 gs /Fm0 Do");
      this.appearance.dict = appearanceDict;

      this._streams.push(this.appearance, appearanceStream);
    }
  }]);

  return MarkupAnnotation;
}(Annotation);

exports.MarkupAnnotation = MarkupAnnotation;

var WidgetAnnotation = /*#__PURE__*/function (_Annotation2) {
  _inherits(WidgetAnnotation, _Annotation2);

  var _super2 = _createSuper(WidgetAnnotation);

  function WidgetAnnotation(params) {
    var _this4;

    _classCallCheck(this, WidgetAnnotation);

    _this4 = _super2.call(this, params);
    var dict = params.dict;
    var data = _this4.data;
    _this4.ref = params.ref;
    data.annotationType = _util_metapdf.AnnotationType.WIDGET;
    data.fieldName = _this4._constructFieldName(dict);
    data.actions = _this4._collectActions(params.xref, dict);
    var fieldValue = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "V",
      getArray: true
    });
    data.fieldValue = _this4._decodeFormValue(fieldValue);
    var defaultFieldValue = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "DV",
      getArray: true
    });
    data.defaultFieldValue = _this4._decodeFormValue(defaultFieldValue);
    data.alternativeText = (0, _util_metapdf.stringToPDFString)(dict.get("TU") || "");
    data.defaultAppearance = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "DA"
    }) || params.acroForm.get("DA") || "";
    var fieldType = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "FT"
    });
    data.fieldType = (0, _primitives.isName)(fieldType) ? fieldType.name : null;
    var localResources = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "DR"
    });
    var acroFormResources = params.acroForm.get("DR");
    _this4._fieldResources = {
      localResources: localResources,
      acroFormResources: acroFormResources,
      mergedResources: _primitives.Dict.merge({
        xref: params.xref,
        dictArray: [localResources, acroFormResources],
        mergeSubDicts: true
      })
    };
    data.fieldFlags = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "Ff"
    });

    if (!Number.isInteger(data.fieldFlags) || data.fieldFlags < 0) {
      data.fieldFlags = 0;
    }

    data.readOnly = _this4.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.READONLY);
    data.hidden = _this4.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.HIDDEN);

    if (data.fieldType === "Sig") {
      data.fieldValue = null;

      _this4.setFlags(_util_metapdf.AnnotationFlag.HIDDEN);

      data.hidden = true;
    }

    return _this4;
  }

  _createClass(WidgetAnnotation, [{
    key: "_constructFieldName",
    value: function _constructFieldName(dict) {
      if (!dict.has("T") && !dict.has("Parent")) {
        (0, _util_metapdf.warn)("Unknown field name, falling back to empty field name.");
        return "";
      }

      if (!dict.has("Parent")) {
        return (0, _util_metapdf.stringToPDFString)(dict.get("T"));
      }

      var fieldName = [];

      if (dict.has("T")) {
        fieldName.unshift((0, _util_metapdf.stringToPDFString)(dict.get("T")));
      }

      var loopDict = dict;

      while (loopDict.has("Parent")) {
        loopDict = loopDict.get("Parent");

        if (!(0, _primitives.isDict)(loopDict)) {
          break;
        }

        if (loopDict.has("T")) {
          fieldName.unshift((0, _util_metapdf.stringToPDFString)(loopDict.get("T")));
        }
      }

      return fieldName.join(".");
    }
  }, {
    key: "_decodeFormValue",
    value: function _decodeFormValue(formValue) {
      if (Array.isArray(formValue)) {
        return formValue.filter(function (item) {
          return (0, _util_metapdf.isString)(item);
        }).map(function (item) {
          return (0, _util_metapdf.stringToPDFString)(item);
        });
      } else if ((0, _primitives.isName)(formValue)) {
        return (0, _util_metapdf.stringToPDFString)(formValue.name);
      } else if ((0, _util_metapdf.isString)(formValue)) {
        return (0, _util_metapdf.stringToPDFString)(formValue);
      }

      return null;
    }
  }, {
    key: "hasFieldFlag",
    value: function hasFieldFlag(flag) {
      return !!(this.data.fieldFlags & flag);
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList(evaluator, task, renderForms, annotationStorage) {
      var _this5 = this;

      if (renderForms) {
        return Promise.resolve(new _operator_list.OperatorList());
      }

      if (!this._hasText) {
        return _get(_getPrototypeOf(WidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, renderForms, annotationStorage);
      }

      return this._getAppearance(evaluator, task, annotationStorage).then(function (content) {
        if (_this5.appearance && content === null) {
          return _get(_getPrototypeOf(WidgetAnnotation.prototype), "getOperatorList", _this5).call(_this5, evaluator, task, renderForms, annotationStorage);
        }

        var operatorList = new _operator_list.OperatorList();

        if (!_this5.data.defaultAppearance || content === null) {
          return operatorList;
        }

        var matrix = [1, 0, 0, 1, 0, 0];
        var bbox = [0, 0, _this5.data.rect[2] - _this5.data.rect[0], _this5.data.rect[3] - _this5.data.rect[1]];
        var transform = getTransformMatrix(_this5.data.rect, bbox, matrix);
        operatorList.addOp(_util_metapdf.OPS.beginAnnotation, [_this5.data.rect, transform, matrix]);
        var stream = new _stream.StringStream(content);
        return evaluator.getOperatorList({
          stream: stream,
          task: task,
          resources: _this5._fieldResources.mergedResources,
          operatorList: operatorList
        }).then(function () {
          operatorList.addOp(_util_metapdf.OPS.endAnnotation, []);
          return operatorList;
        });
      });
    }
  }, {
    key: "save",
    value: function () {
      var _save2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(evaluator, task, annotationStorage) {
        var value, appearance, xref, dict, bbox, xfa, newRef, AP, encrypt, originalTransform, newTransform, appearanceDict, bufferOriginal, bufferNew;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                value = annotationStorage[this.data.id];

                if (!(value === this.data.fieldValue || value === undefined)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", null);

              case 3:
                _context2.next = 5;
                return this._getAppearance(evaluator, task, annotationStorage);

              case 5:
                appearance = _context2.sent;

                if (!(appearance === null)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", null);

              case 8:
                xref = evaluator.xref;
                dict = xref.fetchIfRef(this.ref);

                if ((0, _primitives.isDict)(dict)) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", null);

              case 12:
                bbox = [0, 0, this.data.rect[2] - this.data.rect[0], this.data.rect[3] - this.data.rect[1]];
                xfa = {
                  path: (0, _util_metapdf.stringToPDFString)(dict.get("T") || ""),
                  value: value
                };
                newRef = xref.getNewRef();
                AP = new _primitives.Dict(xref);
                AP.set("N", newRef);
                encrypt = xref.encrypt;
                originalTransform = null;
                newTransform = null;

                if (encrypt) {
                  originalTransform = encrypt.createCipherTransform(this.ref.num, this.ref.gen);
                  newTransform = encrypt.createCipherTransform(newRef.num, newRef.gen);
                  appearance = newTransform.encryptString(appearance);
                }

                dict.set("V", value);
                dict.set("AP", AP);
                dict.set("M", "D:".concat((0, _util_metapdf.getModificationDate)()));
                appearanceDict = new _primitives.Dict(xref);
                appearanceDict.set("Length", appearance.length);
                appearanceDict.set("Subtype", _primitives.Name.get("Form"));
                appearanceDict.set("Resources", this._getSaveFieldResources(xref));
                appearanceDict.set("BBox", bbox);
                bufferOriginal = ["".concat(this.ref.num, " ").concat(this.ref.gen, " obj\n")];
                (0, _writer.writeDict)(dict, bufferOriginal, originalTransform);
                bufferOriginal.push("\nendobj\n");
                bufferNew = ["".concat(newRef.num, " ").concat(newRef.gen, " obj\n")];
                (0, _writer.writeDict)(appearanceDict, bufferNew, newTransform);
                bufferNew.push(" stream\n");
                bufferNew.push(appearance);
                bufferNew.push("\nendstream\nendobj\n");
                return _context2.abrupt("return", [{
                  ref: this.ref,
                  data: bufferOriginal.join(""),
                  xfa: xfa
                }, {
                  ref: newRef,
                  data: bufferNew.join(""),
                  xfa: null
                }]);

              case 38:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function save(_x4, _x5, _x6) {
        return _save2.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "_getAppearance",
    value: function () {
      var _getAppearance2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(evaluator, task, annotationStorage) {
        var isPassword, value, defaultPadding, hPadding, totalHeight, totalWidth, fontInfo, _fontInfo, font, fontName, fontSize, descent, vPadding, defaultAppearance, alignment, renderedText;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._fontName = null;
                isPassword = this.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.PASSWORD);

                if (!(!annotationStorage || isPassword)) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", null);

              case 4:
                value = annotationStorage[this.data.id];

                if (!(value === undefined)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", null);

              case 7:
                if (!(value === "")) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", "");

              case 9:
                defaultPadding = 2;
                hPadding = defaultPadding;
                totalHeight = this.data.rect[3] - this.data.rect[1];
                totalWidth = this.data.rect[2] - this.data.rect[0];
                _context3.next = 15;
                return this._getFontData(evaluator, task);

              case 15:
                fontInfo = _context3.sent;
                _fontInfo = _slicedToArray(fontInfo, 2), font = _fontInfo[0], fontName = _fontInfo[1];
                fontSize = this._computeFontSize.apply(this, _toConsumableArray(fontInfo).concat([totalHeight]));
                this._fontName = fontName;
                descent = font.descent;

                if (isNaN(descent)) {
                  descent = 0;
                }

                vPadding = defaultPadding + Math.abs(descent) * fontSize;
                defaultAppearance = this.data.defaultAppearance;
                alignment = this.data.textAlignment;

                if (!this.data.comb) {
                  _context3.next = 26;
                  break;
                }

                return _context3.abrupt("return", this._getCombAppearance(defaultAppearance, value, totalWidth, hPadding, vPadding));

              case 26:
                if (!this.data.multiLine) {
                  _context3.next = 28;
                  break;
                }

                return _context3.abrupt("return", this._getMultilineAppearance(defaultAppearance, value, font, fontSize, totalWidth, totalHeight, alignment, hPadding, vPadding));

              case 28:
                if (!(alignment === 0 || alignment > 2)) {
                  _context3.next = 30;
                  break;
                }

                return _context3.abrupt("return", "/Tx BMC q BT " + defaultAppearance + " 1 0 0 1 ".concat(hPadding, " ").concat(vPadding, " Tm (").concat((0, _util_metapdf.escapeString)(value), ") Tj") + " ET Q EMC");

              case 30:
                renderedText = this._renderText(value, font, fontSize, totalWidth, alignment, hPadding, vPadding);
                return _context3.abrupt("return", "/Tx BMC q BT " + defaultAppearance + " 1 0 0 1 0 0 Tm ".concat(renderedText) + " ET Q EMC");

              case 32:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _getAppearance(_x7, _x8, _x9) {
        return _getAppearance2.apply(this, arguments);
      }

      return _getAppearance;
    }()
  }, {
    key: "_getFontData",
    value: function () {
      var _getFontData2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(evaluator, task) {
        var operatorList, initialState;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                operatorList = new _operator_list.OperatorList();
                initialState = {
                  fontSize: 0,
                  font: null,
                  fontName: null,
                  clone: function clone() {
                    return this;
                  }
                };
                _context4.next = 4;
                return evaluator.getOperatorList({
                  stream: new _stream.StringStream(this.data.defaultAppearance),
                  task: task,
                  resources: this._fieldResources.mergedResources,
                  operatorList: operatorList,
                  initialState: initialState
                });

              case 4:
                return _context4.abrupt("return", [initialState.font, initialState.fontName, initialState.fontSize]);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _getFontData(_x10, _x11) {
        return _getFontData2.apply(this, arguments);
      }

      return _getFontData;
    }()
  }, {
    key: "_computeFontSize",
    value: function _computeFontSize(font, fontName, fontSize, height) {
      if (fontSize === null || fontSize === 0) {
        var em = font.charsToGlyphs("M")[0].width / 1000;
        var capHeight = 0.7 * em;
        fontSize = Math.max(1, Math.floor(height / (1.5 * capHeight)));
        var fontRegex = new RegExp("/".concat(fontName, "\\s+[0-9.]+\\s+Tf"));

        if (this.data.defaultAppearance.search(fontRegex) === -1) {
          fontRegex = new RegExp("/".concat(fontName, "\\s+Tf"));
        }

        this.data.defaultAppearance = this.data.defaultAppearance.replace(fontRegex, "/".concat(fontName, " ").concat(fontSize, " Tf"));
      }

      return fontSize;
    }
  }, {
    key: "_renderText",
    value: function _renderText(text, font, fontSize, totalWidth, alignment, hPadding, vPadding) {
      var glyphs = font.charsToGlyphs(text);
      var scale = fontSize / 1000;
      var width = 0;

      var _iterator4 = _createForOfIteratorHelper(glyphs),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var glyph = _step4.value;
          width += glyph.width * scale;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var shift;

      if (alignment === 1) {
        shift = (totalWidth - width) / 2;
      } else if (alignment === 2) {
        shift = totalWidth - width - hPadding;
      } else {
        shift = hPadding;
      }

      shift = shift.toFixed(2);
      vPadding = vPadding.toFixed(2);
      return "".concat(shift, " ").concat(vPadding, " Td (").concat((0, _util_metapdf.escapeString)(text), ") Tj");
    }
  }, {
    key: "_getSaveFieldResources",
    value: function _getSaveFieldResources(xref) {
      var _this$_fieldResources = this._fieldResources,
          localResources = _this$_fieldResources.localResources,
          acroFormResources = _this$_fieldResources.acroFormResources;

      if (!this._fontName) {
        return localResources || _primitives.Dict.empty;
      }

      if (localResources instanceof _primitives.Dict) {
        var localFont = localResources.get("Font");

        if (localFont instanceof _primitives.Dict && localFont.has(this._fontName)) {
          return localResources;
        }
      }

      if (acroFormResources instanceof _primitives.Dict) {
        var acroFormFont = acroFormResources.get("Font");

        if (acroFormFont instanceof _primitives.Dict && acroFormFont.has(this._fontName)) {
          var subFontDict = new _primitives.Dict(xref);
          subFontDict.set(this._fontName, acroFormFont.getRaw(this._fontName));
          var subResourcesDict = new _primitives.Dict(xref);
          subResourcesDict.set("Font", subFontDict);
          return _primitives.Dict.merge({
            xref: xref,
            dictArray: [subResourcesDict, localResources],
            mergeSubDicts: true
          });
        }
      }

      return localResources || _primitives.Dict.empty;
    }
  }, {
    key: "_collectJS",
    value: function _collectJS(entry, xref, list, parents) {
      if (!entry) {
        return;
      }

      var parent = null;

      if ((0, _primitives.isRef)(entry)) {
        if (parents.has(entry)) {
          return;
        }

        parent = entry;
        parents.put(parent);
        entry = xref.fetch(entry);
      }

      if (Array.isArray(entry)) {
        var _iterator5 = _createForOfIteratorHelper(entry),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var element = _step5.value;

            this._collectJS(element, xref, list, parents);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      } else if (entry instanceof _primitives.Dict) {
        if ((0, _primitives.isName)(entry.get("S"), "JavaScript") && entry.has("JS")) {
          var js = entry.get("JS");
          var code;

          if ((0, _primitives.isStream)(js)) {
            code = (0, _util_metapdf.bytesToString)(js.getBytes());
          } else {
            code = js;
          }

          code = (0, _util_metapdf.stringToPDFString)(code);

          if (code) {
            list.push(code);
          }
        }

        this._collectJS(entry.getRaw("Next"), xref, list, parents);
      }

      if (parent) {
        parents.remove(parent);
      }
    }
  }, {
    key: "_collectActions",
    value: function _collectActions(xref, dict) {
      var actions = Object.create(null);

      if (dict.has("AA")) {
        var additionalActions = dict.get("AA");

        var _iterator6 = _createForOfIteratorHelper(additionalActions.getKeys()),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var key = _step6.value;
            var action = _util_metapdf.AnnotationActionEventType[key];

            if (!action) {
              continue;
            }

            var actionDict = additionalActions.getRaw(key);
            var parents = new _primitives.RefSet();
            var list = [];

            this._collectJS(actionDict, xref, list, parents);

            if (list.length > 0) {
              actions[action] = list;
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }

      if (dict.has("A")) {
        var _actionDict = dict.get("A");

        var _parents = new _primitives.RefSet();

        var _list = [];

        this._collectJS(_actionDict, xref, _list, _parents);

        if (_list.length > 0) {
          actions.Action = _list;
        }
      }

      return (0, _util_metapdf.objectSize)(actions) > 0 ? actions : null;
    }
  }, {
    key: "getFieldObject",
    value: function getFieldObject() {
      if (this.data.fieldType === "Sig") {
        return {
          id: this.data.id,
          value: null,
          type: "signature"
        };
      }

      return null;
    }
  }]);

  return WidgetAnnotation;
}(Annotation);

var TextWidgetAnnotation = /*#__PURE__*/function (_WidgetAnnotation) {
  _inherits(TextWidgetAnnotation, _WidgetAnnotation);

  var _super3 = _createSuper(TextWidgetAnnotation);

  function TextWidgetAnnotation(params) {
    var _this6;

    _classCallCheck(this, TextWidgetAnnotation);

    _this6 = _super3.call(this, params);
    _this6._hasText = true;
    var dict = params.dict;

    if (!(0, _util_metapdf.isString)(_this6.data.fieldValue)) {
      _this6.data.fieldValue = "";
    }

    var alignment = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "Q"
    });

    if (!Number.isInteger(alignment) || alignment < 0 || alignment > 2) {
      alignment = null;
    }

    _this6.data.textAlignment = alignment;
    var maximumLength = (0, _core_utils.getInheritableProperty)({
      dict: dict,
      key: "MaxLen"
    });

    if (!Number.isInteger(maximumLength) || maximumLength < 0) {
      maximumLength = null;
    }

    _this6.data.maxLen = maximumLength;
    _this6.data.multiLine = _this6.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.MULTILINE);
    _this6.data.comb = _this6.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.COMB) && !_this6.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.MULTILINE) && !_this6.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.PASSWORD) && !_this6.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.FILESELECT) && _this6.data.maxLen !== null;
    return _this6;
  }

  _createClass(TextWidgetAnnotation, [{
    key: "_getCombAppearance",
    value: function _getCombAppearance(defaultAppearance, text, width, hPadding, vPadding) {
      var combWidth = (width / this.data.maxLen).toFixed(2);
      var buf = [];

      var _iterator7 = _createForOfIteratorHelper(text),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var character = _step7.value;
          buf.push("(".concat((0, _util_metapdf.escapeString)(character), ") Tj"));
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      var renderedComb = buf.join(" ".concat(combWidth, " 0 Td "));
      return "/Tx BMC q BT " + defaultAppearance + " 1 0 0 1 ".concat(hPadding, " ").concat(vPadding, " Tm ").concat(renderedComb) + " ET Q EMC";
    }
  }, {
    key: "_getMultilineAppearance",
    value: function _getMultilineAppearance(defaultAppearance, text, font, fontSize, width, height, alignment, hPadding, vPadding) {
      var lines = text.split(/\r\n|\r|\n/);
      var buf = [];
      var totalWidth = width - 2 * hPadding;

      var _iterator8 = _createForOfIteratorHelper(lines),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var line = _step8.value;

          var chunks = this._splitLine(line, font, fontSize, totalWidth);

          var _iterator9 = _createForOfIteratorHelper(chunks),
              _step9;

          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              var chunk = _step9.value;
              var padding = buf.length === 0 ? hPadding : 0;
              buf.push(this._renderText(chunk, font, fontSize, width, alignment, padding, -fontSize));
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      var renderedText = buf.join("\n");
      return "/Tx BMC q BT " + defaultAppearance + " 1 0 0 1 0 ".concat(height, " Tm ").concat(renderedText) + " ET Q EMC";
    }
  }, {
    key: "_splitLine",
    value: function _splitLine(line, font, fontSize, width) {
      if (line.length <= 1) {
        return [line];
      }

      var scale = fontSize / 1000;
      var whitespace = font.charsToGlyphs(" ")[0].width * scale;
      var chunks = [];
      var lastSpacePos = -1,
          startChunk = 0,
          currentWidth = 0;

      for (var i = 0, ii = line.length; i < ii; i++) {
        var character = line.charAt(i);

        if (character === " ") {
          if (currentWidth + whitespace > width) {
            chunks.push(line.substring(startChunk, i));
            startChunk = i;
            currentWidth = whitespace;
            lastSpacePos = -1;
          } else {
            currentWidth += whitespace;
            lastSpacePos = i;
          }
        } else {
          var charWidth = font.charsToGlyphs(character)[0].width * scale;

          if (currentWidth + charWidth > width) {
            if (lastSpacePos !== -1) {
              chunks.push(line.substring(startChunk, lastSpacePos + 1));
              startChunk = i = lastSpacePos + 1;
              lastSpacePos = -1;
              currentWidth = 0;
            } else {
              chunks.push(line.substring(startChunk, i));
              startChunk = i;
              currentWidth = charWidth;
            }
          } else {
            currentWidth += charWidth;
          }
        }
      }

      if (startChunk < line.length) {
        chunks.push(line.substring(startChunk, line.length));
      }

      return chunks;
    }
  }, {
    key: "getFieldObject",
    value: function getFieldObject() {
      return {
        id: this.data.id,
        value: this.data.fieldValue,
        defaultValue: this.data.defaultFieldValue,
        multiline: this.data.multiLine,
        password: this.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.PASSWORD),
        charLimit: this.data.maxLen,
        comb: this.data.comb,
        editable: !this.data.readOnly,
        hidden: this.data.hidden,
        name: this.data.fieldName,
        rect: this.data.rect,
        actions: this.data.actions,
        type: "text"
      };
    }
  }]);

  return TextWidgetAnnotation;
}(WidgetAnnotation);

var ButtonWidgetAnnotation = /*#__PURE__*/function (_WidgetAnnotation2) {
  _inherits(ButtonWidgetAnnotation, _WidgetAnnotation2);

  var _super4 = _createSuper(ButtonWidgetAnnotation);

  function ButtonWidgetAnnotation(params) {
    var _this7;

    _classCallCheck(this, ButtonWidgetAnnotation);

    _this7 = _super4.call(this, params);
    _this7.checkedAppearance = null;
    _this7.uncheckedAppearance = null;
    _this7.data.checkBox = !_this7.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.RADIO) && !_this7.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.PUSHBUTTON);
    _this7.data.radioButton = _this7.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.RADIO) && !_this7.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.PUSHBUTTON);
    _this7.data.pushButton = _this7.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.PUSHBUTTON);
    _this7.data.isTooltipOnly = false;

    if (_this7.data.checkBox) {
      _this7._processCheckBox(params);
    } else if (_this7.data.radioButton) {
      _this7._processRadioButton(params);
    } else if (_this7.data.pushButton) {
      _this7._processPushButton(params);
    } else {
      (0, _util_metapdf.warn)("Invalid field flags for button widget annotation");
    }

    return _this7;
  }

  _createClass(ButtonWidgetAnnotation, [{
    key: "getOperatorList",
    value: function getOperatorList(evaluator, task, renderForms, annotationStorage) {
      if (this.data.pushButton) {
        return _get(_getPrototypeOf(ButtonWidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, false, annotationStorage);
      }

      if (annotationStorage) {
        var value = annotationStorage[this.data.id];

        if (value === undefined) {
          return _get(_getPrototypeOf(ButtonWidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, renderForms, annotationStorage);
        }

        var appearance;

        if (value) {
          appearance = this.checkedAppearance;
        } else {
          appearance = this.uncheckedAppearance;
        }

        if (appearance) {
          var savedAppearance = this.appearance;
          this.appearance = appearance;

          var operatorList = _get(_getPrototypeOf(ButtonWidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, renderForms, annotationStorage);

          this.appearance = savedAppearance;
          return operatorList;
        }

        return Promise.resolve(new _operator_list.OperatorList());
      }

      return _get(_getPrototypeOf(ButtonWidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, renderForms, annotationStorage);
    }
  }, {
    key: "save",
    value: function () {
      var _save3 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(evaluator, task, annotationStorage) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.data.checkBox) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", this._saveCheckbox(evaluator, task, annotationStorage));

              case 2:
                if (!this.data.radioButton) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt("return", this._saveRadioButton(evaluator, task, annotationStorage));

              case 4:
                return _context5.abrupt("return", null);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function save(_x12, _x13, _x14) {
        return _save3.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "_saveCheckbox",
    value: function () {
      var _saveCheckbox2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6(evaluator, task, annotationStorage) {
        var value, defaultValue, dict, xfa, name, encrypt, originalTransform, buffer;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                value = annotationStorage[this.data.id];

                if (!(value === undefined)) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", null);

              case 3:
                defaultValue = this.data.fieldValue && this.data.fieldValue !== "Off";

                if (!(defaultValue === value)) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", null);

              case 6:
                dict = evaluator.xref.fetchIfRef(this.ref);

                if ((0, _primitives.isDict)(dict)) {
                  _context6.next = 9;
                  break;
                }

                return _context6.abrupt("return", null);

              case 9:
                xfa = {
                  path: (0, _util_metapdf.stringToPDFString)(dict.get("T") || ""),
                  value: value ? this.data.exportValue : ""
                };
                name = _primitives.Name.get(value ? this.data.exportValue : "Off");
                dict.set("V", name);
                dict.set("AS", name);
                dict.set("M", "D:".concat((0, _util_metapdf.getModificationDate)()));
                encrypt = evaluator.xref.encrypt;
                originalTransform = null;

                if (encrypt) {
                  originalTransform = encrypt.createCipherTransform(this.ref.num, this.ref.gen);
                }

                buffer = ["".concat(this.ref.num, " ").concat(this.ref.gen, " obj\n")];
                (0, _writer.writeDict)(dict, buffer, originalTransform);
                buffer.push("\nendobj\n");
                return _context6.abrupt("return", [{
                  ref: this.ref,
                  data: buffer.join(""),
                  xfa: xfa
                }]);

              case 21:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _saveCheckbox(_x15, _x16, _x17) {
        return _saveCheckbox2.apply(this, arguments);
      }

      return _saveCheckbox;
    }()
  }, {
    key: "_saveRadioButton",
    value: function () {
      var _saveRadioButton2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7(evaluator, task, annotationStorage) {
        var value, defaultValue, dict, xfa, name, parentBuffer, encrypt, parent, parentTransform, originalTransform, buffer, newRefs;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                value = annotationStorage[this.data.id];

                if (!(value === undefined)) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", null);

              case 3:
                defaultValue = this.data.fieldValue === this.data.buttonValue;

                if (!(defaultValue === value)) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt("return", null);

              case 6:
                dict = evaluator.xref.fetchIfRef(this.ref);

                if ((0, _primitives.isDict)(dict)) {
                  _context7.next = 9;
                  break;
                }

                return _context7.abrupt("return", null);

              case 9:
                xfa = {
                  path: (0, _util_metapdf.stringToPDFString)(dict.get("T") || ""),
                  value: value ? this.data.buttonValue : ""
                };
                name = _primitives.Name.get(value ? this.data.buttonValue : "Off");
                parentBuffer = null;
                encrypt = evaluator.xref.encrypt;

                if (value) {
                  if ((0, _primitives.isRef)(this.parent)) {
                    parent = evaluator.xref.fetch(this.parent);
                    parentTransform = null;

                    if (encrypt) {
                      parentTransform = encrypt.createCipherTransform(this.parent.num, this.parent.gen);
                    }

                    parent.set("V", name);
                    parentBuffer = ["".concat(this.parent.num, " ").concat(this.parent.gen, " obj\n")];
                    (0, _writer.writeDict)(parent, parentBuffer, parentTransform);
                    parentBuffer.push("\nendobj\n");
                  } else if ((0, _primitives.isDict)(this.parent)) {
                    this.parent.set("V", name);
                  }
                }

                dict.set("AS", name);
                dict.set("M", "D:".concat((0, _util_metapdf.getModificationDate)()));
                originalTransform = null;

                if (encrypt) {
                  originalTransform = encrypt.createCipherTransform(this.ref.num, this.ref.gen);
                }

                buffer = ["".concat(this.ref.num, " ").concat(this.ref.gen, " obj\n")];
                (0, _writer.writeDict)(dict, buffer, originalTransform);
                buffer.push("\nendobj\n");
                newRefs = [{
                  ref: this.ref,
                  data: buffer.join(""),
                  xfa: xfa
                }];

                if (parentBuffer !== null) {
                  newRefs.push({
                    ref: this.parent,
                    data: parentBuffer.join(""),
                    xfa: null
                  });
                }

                return _context7.abrupt("return", newRefs);

              case 24:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _saveRadioButton(_x18, _x19, _x20) {
        return _saveRadioButton2.apply(this, arguments);
      }

      return _saveRadioButton;
    }()
  }, {
    key: "_processCheckBox",
    value: function _processCheckBox(params) {
      var customAppearance = params.dict.get("AP");

      if (!(0, _primitives.isDict)(customAppearance)) {
        return;
      }

      var normalAppearance = customAppearance.get("N");

      if (!(0, _primitives.isDict)(normalAppearance)) {
        return;
      }

      var exportValues = normalAppearance.getKeys();

      if (!exportValues.includes("Off")) {
        exportValues.push("Off");
      }

      if (exportValues.length !== 2) {
        return;
      }

      this.data.exportValue = exportValues[0] === "Off" ? exportValues[1] : exportValues[0];
      this.checkedAppearance = normalAppearance.get(this.data.exportValue);
      this.uncheckedAppearance = normalAppearance.get("Off") || null;

      this._streams.push(this.checkedAppearance);

      if (this.uncheckedAppearance) {
        this._streams.push(this.uncheckedAppearance);
      }

      this._fallbackFontDict = this.fallbackFontDict;
    }
  }, {
    key: "_processRadioButton",
    value: function _processRadioButton(params) {
      this.data.fieldValue = this.data.buttonValue = null;
      var fieldParent = params.dict.get("Parent");

      if ((0, _primitives.isDict)(fieldParent)) {
        this.parent = params.dict.getRaw("Parent");
        var fieldParentValue = fieldParent.get("V");

        if ((0, _primitives.isName)(fieldParentValue)) {
          this.data.fieldValue = this._decodeFormValue(fieldParentValue);
        }
      }

      var appearanceStates = params.dict.get("AP");

      if (!(0, _primitives.isDict)(appearanceStates)) {
        return;
      }

      var normalAppearance = appearanceStates.get("N");

      if (!(0, _primitives.isDict)(normalAppearance)) {
        return;
      }

      var _iterator10 = _createForOfIteratorHelper(normalAppearance.getKeys()),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var key = _step10.value;

          if (key !== "Off") {
            this.data.buttonValue = this._decodeFormValue(key);
            break;
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      this.checkedAppearance = normalAppearance.get(this.data.buttonValue);
      this.uncheckedAppearance = normalAppearance.get("Off") || null;

      this._streams.push(this.checkedAppearance);

      if (this.uncheckedAppearance) {
        this._streams.push(this.uncheckedAppearance);
      }

      this._fallbackFontDict = this.fallbackFontDict;
    }
  }, {
    key: "_processPushButton",
    value: function _processPushButton(params) {
      if (!params.dict.has("A") && !params.dict.has("AA") && !this.data.alternativeText) {
        (0, _util_metapdf.warn)("Push buttons without action dictionaries are not supported");
        return;
      }

      this.data.isTooltipOnly = !params.dict.has("A") && !params.dict.has("AA");

      _obj.Catalog.parseDestDictionary({
        destDict: params.dict,
        resultObj: this.data,
        docBaseUrl: params.pdfManager.docBaseUrl
      });
    }
  }, {
    key: "getFieldObject",
    value: function getFieldObject() {
      var type = "button";
      var value = null;

      if (this.data.checkBox) {
        type = "checkbox";
        value = this.data.fieldValue && this.data.fieldValue !== "Off";
      } else if (this.data.radioButton) {
        type = "radiobutton";
        value = this.data.fieldValue === this.data.buttonValue;
      }

      return {
        id: this.data.id,
        value: value,
        defaultValue: this.data.defaultFieldValue,
        editable: !this.data.readOnly,
        name: this.data.fieldName,
        rect: this.data.rect,
        hidden: this.data.hidden,
        actions: this.data.actions,
        type: type
      };
    }
  }, {
    key: "fallbackFontDict",
    get: function get() {
      var dict = new _primitives.Dict();
      dict.set("BaseFont", _primitives.Name.get("ZapfDingbats"));
      dict.set("Type", _primitives.Name.get("FallbackType"));
      dict.set("Subtype", _primitives.Name.get("FallbackType"));
      dict.set("Encoding", _primitives.Name.get("ZapfDingbatsEncoding"));
      return (0, _util_metapdf.shadow)(this, "fallbackFontDict", dict);
    }
  }]);

  return ButtonWidgetAnnotation;
}(WidgetAnnotation);

var ChoiceWidgetAnnotation = /*#__PURE__*/function (_WidgetAnnotation3) {
  _inherits(ChoiceWidgetAnnotation, _WidgetAnnotation3);

  var _super5 = _createSuper(ChoiceWidgetAnnotation);

  function ChoiceWidgetAnnotation(params) {
    var _this8;

    _classCallCheck(this, ChoiceWidgetAnnotation);

    _this8 = _super5.call(this, params);
    _this8.data.options = [];
    var options = (0, _core_utils.getInheritableProperty)({
      dict: params.dict,
      key: "Opt"
    });

    if (Array.isArray(options)) {
      var xref = params.xref;

      for (var i = 0, ii = options.length; i < ii; i++) {
        var option = xref.fetchIfRef(options[i]);
        var isOptionArray = Array.isArray(option);
        _this8.data.options[i] = {
          exportValue: _this8._decodeFormValue(isOptionArray ? xref.fetchIfRef(option[0]) : option),
          displayValue: _this8._decodeFormValue(isOptionArray ? xref.fetchIfRef(option[1]) : option)
        };
      }
    }

    if ((0, _util_metapdf.isString)(_this8.data.fieldValue)) {
      _this8.data.fieldValue = [_this8.data.fieldValue];
    } else if (!_this8.data.fieldValue) {
      _this8.data.fieldValue = [];
    }

    _this8.data.combo = _this8.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.COMBO);
    _this8.data.multiSelect = _this8.hasFieldFlag(_util_metapdf.AnnotationFieldFlag.MULTISELECT);
    _this8._hasText = true;
    return _this8;
  }

  _createClass(ChoiceWidgetAnnotation, [{
    key: "getFieldObject",
    value: function getFieldObject() {
      var type = this.data.combo ? "combobox" : "listbox";
      var value = this.data.fieldValue.length > 0 ? this.data.fieldValue[0] : null;
      return {
        id: this.data.id,
        value: value,
        defaultValue: this.data.defaultFieldValue,
        editable: !this.data.readOnly,
        name: this.data.fieldName,
        rect: this.data.rect,
        multipleSelection: this.data.multiSelect,
        hidden: this.data.hidden,
        actions: this.data.actions,
        type: type
      };
    }
  }]);

  return ChoiceWidgetAnnotation;
}(WidgetAnnotation);

var TextAnnotation = /*#__PURE__*/function (_MarkupAnnotation) {
  _inherits(TextAnnotation, _MarkupAnnotation);

  var _super6 = _createSuper(TextAnnotation);

  function TextAnnotation(parameters) {
    var _this9;

    _classCallCheck(this, TextAnnotation);

    var DEFAULT_ICON_SIZE = 22;
    _this9 = _super6.call(this, parameters);
    var dict = parameters.dict;
    _this9.data.annotationType = _util_metapdf.AnnotationType.TEXT;

    if (_this9.data.hasAppearance) {
      _this9.data.name = "NoIcon";
    } else {
      _this9.data.rect[1] = _this9.data.rect[3] - DEFAULT_ICON_SIZE;
      _this9.data.rect[2] = _this9.data.rect[0] + DEFAULT_ICON_SIZE;
      _this9.data.name = dict.has("Name") ? dict.get("Name").name : "Note";
    }

    if (dict.has("State")) {
      _this9.data.state = dict.get("State") || null;
      _this9.data.stateModel = dict.get("StateModel") || null;
    } else {
      _this9.data.state = null;
      _this9.data.stateModel = null;
    }

    return _this9;
  }

  return TextAnnotation;
}(MarkupAnnotation);

var LinkAnnotation = /*#__PURE__*/function (_Annotation3) {
  _inherits(LinkAnnotation, _Annotation3);

  var _super7 = _createSuper(LinkAnnotation);

  function LinkAnnotation(params) {
    var _this10;

    _classCallCheck(this, LinkAnnotation);

    _this10 = _super7.call(this, params);
    _this10.data.annotationType = _util_metapdf.AnnotationType.LINK;
    var quadPoints = getQuadPoints(params.dict, _this10.rectangle);

    if (quadPoints) {
      _this10.data.quadPoints = quadPoints;
    }

    _obj.Catalog.parseDestDictionary({
      destDict: params.dict,
      resultObj: _this10.data,
      docBaseUrl: params.pdfManager.docBaseUrl
    });

    return _this10;
  }

  return LinkAnnotation;
}(Annotation);

var PopupAnnotation = /*#__PURE__*/function (_Annotation4) {
  _inherits(PopupAnnotation, _Annotation4);

  var _super8 = _createSuper(PopupAnnotation);

  function PopupAnnotation(parameters) {
    var _this11;

    _classCallCheck(this, PopupAnnotation);

    _this11 = _super8.call(this, parameters);
    _this11.data.annotationType = _util_metapdf.AnnotationType.POPUP;
    var parentItem = parameters.dict.get("Parent");

    if (!parentItem) {
      (0, _util_metapdf.warn)("Popup annotation has a missing or invalid parent annotation.");
      return _possibleConstructorReturn(_this11);
    }

    var parentSubtype = parentItem.get("Subtype");
    _this11.data.parentType = (0, _primitives.isName)(parentSubtype) ? parentSubtype.name : null;
    var rawParent = parameters.dict.getRaw("Parent");
    _this11.data.parentId = (0, _primitives.isRef)(rawParent) ? rawParent.toString() : null;
    var parentRect = parentItem.getArray("Rect");

    if (Array.isArray(parentRect) && parentRect.length === 4) {
      _this11.data.parentRect = _util_metapdf.Util.normalizeRect(parentRect);
    } else {
      _this11.data.parentRect = [0, 0, 0, 0];
    }

    var rt = parentItem.get("RT");

    if ((0, _primitives.isName)(rt, _util_metapdf.AnnotationReplyType.GROUP)) {
      parentItem = parentItem.get("IRT");
    }

    if (!parentItem.has("M")) {
      _this11.data.modificationDate = null;
    } else {
      _this11.setModificationDate(parentItem.get("M"));

      _this11.data.modificationDate = _this11.modificationDate;
    }

    if (!parentItem.has("C")) {
      _this11.data.color = null;
    } else {
      _this11.setColor(parentItem.getArray("C"));

      _this11.data.color = _this11.color;
    }

    if (!_this11.viewable) {
      var parentFlags = parentItem.get("F");

      if (_this11._isViewable(parentFlags)) {
        _this11.setFlags(parentFlags);
      }
    }

    _this11.data.title = (0, _util_metapdf.stringToPDFString)(parentItem.get("T") || "");
    _this11.data.contents = (0, _util_metapdf.stringToPDFString)(parentItem.get("Contents") || "");
    return _this11;
  }

  return PopupAnnotation;
}(Annotation);

var FreeTextAnnotation = /*#__PURE__*/function (_MarkupAnnotation2) {
  _inherits(FreeTextAnnotation, _MarkupAnnotation2);

  var _super9 = _createSuper(FreeTextAnnotation);

  function FreeTextAnnotation(parameters) {
    var _this12;

    _classCallCheck(this, FreeTextAnnotation);

    _this12 = _super9.call(this, parameters);
    _this12.data.annotationType = _util_metapdf.AnnotationType.FREETEXT;
    return _this12;
  }

  return FreeTextAnnotation;
}(MarkupAnnotation);

var LineAnnotation = /*#__PURE__*/function (_MarkupAnnotation3) {
  _inherits(LineAnnotation, _MarkupAnnotation3);

  var _super10 = _createSuper(LineAnnotation);

  function LineAnnotation(parameters) {
    var _this13;

    _classCallCheck(this, LineAnnotation);

    _this13 = _super10.call(this, parameters);
    _this13.data.annotationType = _util_metapdf.AnnotationType.LINE;
    _this13.data.lineCoordinates = _util_metapdf.Util.normalizeRect(parameters.dict.getArray("L"));
    return _this13;
  }

  return LineAnnotation;
}(MarkupAnnotation);

var SquareAnnotation = /*#__PURE__*/function (_MarkupAnnotation4) {
  _inherits(SquareAnnotation, _MarkupAnnotation4);

  var _super11 = _createSuper(SquareAnnotation);

  function SquareAnnotation(parameters) {
    var _this14;

    _classCallCheck(this, SquareAnnotation);

    _this14 = _super11.call(this, parameters);
    _this14.data.annotationType = _util_metapdf.AnnotationType.SQUARE;
    return _this14;
  }

  return SquareAnnotation;
}(MarkupAnnotation);

var CircleAnnotation = /*#__PURE__*/function (_MarkupAnnotation5) {
  _inherits(CircleAnnotation, _MarkupAnnotation5);

  var _super12 = _createSuper(CircleAnnotation);

  function CircleAnnotation(parameters) {
    var _this15;

    _classCallCheck(this, CircleAnnotation);

    _this15 = _super12.call(this, parameters);
    _this15.data.annotationType = _util_metapdf.AnnotationType.CIRCLE;
    return _this15;
  }

  return CircleAnnotation;
}(MarkupAnnotation);

var PolylineAnnotation = /*#__PURE__*/function (_MarkupAnnotation6) {
  _inherits(PolylineAnnotation, _MarkupAnnotation6);

  var _super13 = _createSuper(PolylineAnnotation);

  function PolylineAnnotation(parameters) {
    var _this16;

    _classCallCheck(this, PolylineAnnotation);

    _this16 = _super13.call(this, parameters);
    _this16.data.annotationType = _util_metapdf.AnnotationType.POLYLINE;
    _this16.data.vertices = [];
    var rawVertices = parameters.dict.getArray("Vertices");

    if (!Array.isArray(rawVertices)) {
      return _possibleConstructorReturn(_this16);
    }

    for (var i = 0, ii = rawVertices.length; i < ii; i += 2) {
      _this16.data.vertices.push({
        x: rawVertices[i],
        y: rawVertices[i + 1]
      });
    }

    return _this16;
  }

  return PolylineAnnotation;
}(MarkupAnnotation);

var PolygonAnnotation = /*#__PURE__*/function (_PolylineAnnotation) {
  _inherits(PolygonAnnotation, _PolylineAnnotation);

  var _super14 = _createSuper(PolygonAnnotation);

  function PolygonAnnotation(parameters) {
    var _this17;

    _classCallCheck(this, PolygonAnnotation);

    _this17 = _super14.call(this, parameters);
    _this17.data.annotationType = _util_metapdf.AnnotationType.POLYGON;
    return _this17;
  }

  return PolygonAnnotation;
}(PolylineAnnotation);

var CaretAnnotation = /*#__PURE__*/function (_MarkupAnnotation7) {
  _inherits(CaretAnnotation, _MarkupAnnotation7);

  var _super15 = _createSuper(CaretAnnotation);

  function CaretAnnotation(parameters) {
    var _this18;

    _classCallCheck(this, CaretAnnotation);

    _this18 = _super15.call(this, parameters);
    _this18.data.annotationType = _util_metapdf.AnnotationType.CARET;
    return _this18;
  }

  return CaretAnnotation;
}(MarkupAnnotation);

var InkAnnotation = /*#__PURE__*/function (_MarkupAnnotation8) {
  _inherits(InkAnnotation, _MarkupAnnotation8);

  var _super16 = _createSuper(InkAnnotation);

  function InkAnnotation(parameters) {
    var _this19;

    _classCallCheck(this, InkAnnotation);

    _this19 = _super16.call(this, parameters);
    _this19.data.annotationType = _util_metapdf.AnnotationType.INK;
    _this19.data.inkLists = [];
    var rawInkLists = parameters.dict.getArray("InkList");

    if (!Array.isArray(rawInkLists)) {
      return _possibleConstructorReturn(_this19);
    }

    var xref = parameters.xref;

    for (var i = 0, ii = rawInkLists.length; i < ii; ++i) {
      _this19.data.inkLists.push([]);

      for (var j = 0, jj = rawInkLists[i].length; j < jj; j += 2) {
        _this19.data.inkLists[i].push({
          x: xref.fetchIfRef(rawInkLists[i][j]),
          y: xref.fetchIfRef(rawInkLists[i][j + 1])
        });
      }
    }

    return _this19;
  }

  return InkAnnotation;
}(MarkupAnnotation);

var HighlightAnnotation = /*#__PURE__*/function (_MarkupAnnotation9) {
  _inherits(HighlightAnnotation, _MarkupAnnotation9);

  var _super17 = _createSuper(HighlightAnnotation);

  function HighlightAnnotation(parameters) {
    var _this20;

    _classCallCheck(this, HighlightAnnotation);

    _this20 = _super17.call(this, parameters);
    _this20.data.annotationType = _util_metapdf.AnnotationType.HIGHLIGHT;
    var quadPoints = _this20.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!_this20.appearance) {
        var fillColor = _this20.color ? Array.from(_this20.color).map(function (c) {
          return c / 255;
        }) : [1, 1, 0];

        _this20._setDefaultAppearance({
          xref: parameters.xref,
          fillColor: fillColor,
          blendMode: "Multiply",
          pointsCallback: function pointsCallback(buffer, points) {
            buffer.push("".concat(points[0].x, " ").concat(points[0].y, " m"));
            buffer.push("".concat(points[1].x, " ").concat(points[1].y, " l"));
            buffer.push("".concat(points[3].x, " ").concat(points[3].y, " l"));
            buffer.push("".concat(points[2].x, " ").concat(points[2].y, " l"));
            buffer.push("f");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      _this20.data.hasPopup = false;
    }

    return _this20;
  }

  return HighlightAnnotation;
}(MarkupAnnotation);

var UnderlineAnnotation = /*#__PURE__*/function (_MarkupAnnotation10) {
  _inherits(UnderlineAnnotation, _MarkupAnnotation10);

  var _super18 = _createSuper(UnderlineAnnotation);

  function UnderlineAnnotation(parameters) {
    var _this21;

    _classCallCheck(this, UnderlineAnnotation);

    _this21 = _super18.call(this, parameters);
    _this21.data.annotationType = _util_metapdf.AnnotationType.UNDERLINE;
    var quadPoints = _this21.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!_this21.appearance) {
        var strokeColor = _this21.color ? Array.from(_this21.color).map(function (c) {
          return c / 255;
        }) : [0, 0, 0];

        _this21._setDefaultAppearance({
          xref: parameters.xref,
          extra: "[] 0 d 1 w",
          strokeColor: strokeColor,
          pointsCallback: function pointsCallback(buffer, points) {
            buffer.push("".concat(points[2].x, " ").concat(points[2].y, " m"));
            buffer.push("".concat(points[3].x, " ").concat(points[3].y, " l"));
            buffer.push("S");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      _this21.data.hasPopup = false;
    }

    return _this21;
  }

  return UnderlineAnnotation;
}(MarkupAnnotation);

var SquigglyAnnotation = /*#__PURE__*/function (_MarkupAnnotation11) {
  _inherits(SquigglyAnnotation, _MarkupAnnotation11);

  var _super19 = _createSuper(SquigglyAnnotation);

  function SquigglyAnnotation(parameters) {
    var _this22;

    _classCallCheck(this, SquigglyAnnotation);

    _this22 = _super19.call(this, parameters);
    _this22.data.annotationType = _util_metapdf.AnnotationType.SQUIGGLY;
    var quadPoints = _this22.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!_this22.appearance) {
        var strokeColor = _this22.color ? Array.from(_this22.color).map(function (c) {
          return c / 255;
        }) : [0, 0, 0];

        _this22._setDefaultAppearance({
          xref: parameters.xref,
          extra: "[] 0 d 1 w",
          strokeColor: strokeColor,
          pointsCallback: function pointsCallback(buffer, points) {
            var dy = (points[0].y - points[2].y) / 6;
            var shift = dy;
            var x = points[2].x;
            var y = points[2].y;
            var xEnd = points[3].x;
            buffer.push("".concat(x, " ").concat(y + shift, " m"));

            do {
              x += 2;
              shift = shift === 0 ? dy : 0;
              buffer.push("".concat(x, " ").concat(y + shift, " l"));
            } while (x < xEnd);

            buffer.push("S");
            return [points[2].x, xEnd, y - 2 * dy, y + 2 * dy];
          }
        });
      }
    } else {
      _this22.data.hasPopup = false;
    }

    return _this22;
  }

  return SquigglyAnnotation;
}(MarkupAnnotation);

var StrikeOutAnnotation = /*#__PURE__*/function (_MarkupAnnotation12) {
  _inherits(StrikeOutAnnotation, _MarkupAnnotation12);

  var _super20 = _createSuper(StrikeOutAnnotation);

  function StrikeOutAnnotation(parameters) {
    var _this23;

    _classCallCheck(this, StrikeOutAnnotation);

    _this23 = _super20.call(this, parameters);
    _this23.data.annotationType = _util_metapdf.AnnotationType.STRIKEOUT;
    var quadPoints = _this23.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!_this23.appearance) {
        var strokeColor = _this23.color ? Array.from(_this23.color).map(function (c) {
          return c / 255;
        }) : [0, 0, 0];

        _this23._setDefaultAppearance({
          xref: parameters.xref,
          extra: "[] 0 d 1 w",
          strokeColor: strokeColor,
          pointsCallback: function pointsCallback(buffer, points) {
            buffer.push("".concat((points[0].x + points[2].x) / 2) + " ".concat((points[0].y + points[2].y) / 2, " m"));
            buffer.push("".concat((points[1].x + points[3].x) / 2) + " ".concat((points[1].y + points[3].y) / 2, " l"));
            buffer.push("S");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      _this23.data.hasPopup = false;
    }

    return _this23;
  }

  return StrikeOutAnnotation;
}(MarkupAnnotation);

var StampAnnotation = /*#__PURE__*/function (_MarkupAnnotation13) {
  _inherits(StampAnnotation, _MarkupAnnotation13);

  var _super21 = _createSuper(StampAnnotation);

  function StampAnnotation(parameters) {
    var _this24;

    _classCallCheck(this, StampAnnotation);

    _this24 = _super21.call(this, parameters);
    _this24.data.annotationType = _util_metapdf.AnnotationType.STAMP;
    return _this24;
  }

  return StampAnnotation;
}(MarkupAnnotation);

var FileAttachmentAnnotation = /*#__PURE__*/function (_MarkupAnnotation14) {
  _inherits(FileAttachmentAnnotation, _MarkupAnnotation14);

  var _super22 = _createSuper(FileAttachmentAnnotation);

  function FileAttachmentAnnotation(parameters) {
    var _this25;

    _classCallCheck(this, FileAttachmentAnnotation);

    _this25 = _super22.call(this, parameters);
    var file = new _obj.FileSpec(parameters.dict.get("FS"), parameters.xref);
    _this25.data.annotationType = _util_metapdf.AnnotationType.FILEATTACHMENT;
    _this25.data.file = file.serializable;
    return _this25;
  }

  return FileAttachmentAnnotation;
}(MarkupAnnotation);