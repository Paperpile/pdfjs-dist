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
exports.PartialEvaluator = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util_metapdf = require("../shared/util_metapdf.js");

var _cmap = require("./cmap.js");

var _primitives = require("./primitives.js");

var _fonts = require("./fonts.js");

var _encodings = require("./encodings.js");

var _core_utils = require("./core_utils.js");

var _unicode = require("./unicode.js");

var _standard_fonts = require("./standard_fonts.js");

var _pattern = require("./pattern.js");

var _function = require("./function.js");

var _parser = require("./parser.js");

var _image_utils = require("./image_utils.js");

var _bidi = require("./bidi.js");

var _colorspace_metapdf = require("./colorspace_metapdf.js");

var _stream = require("./stream.js");

var _glyphlist = require("./glyphlist.js");

var _metrics = require("./metrics.js");

var _murmurhash = require("./murmurhash3.js");

var _operator_list = require("./operator_list.js");

var _image = require("./image.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DefaultPartialEvaluatorOptions = Object.freeze({
  maxImageSize: -1,
  disableFontFace: false,
  ignoreErrors: false,
  isEvalSupported: true,
  fontExtraProperties: false
});
var PatternType = {
  TILING: 1,
  SHADING: 2
};
var deferred = Promise.resolve();

function normalizeBlendMode(value) {
  var parsingArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (Array.isArray(value)) {
    for (var i = 0, ii = value.length; i < ii; i++) {
      var maybeBM = normalizeBlendMode(value[i], true);

      if (maybeBM) {
        return maybeBM;
      }
    }

    (0, _util_metapdf.warn)("Unsupported blend mode Array: ".concat(value));
    return "source-over";
  }

  if (!(0, _primitives.isName)(value)) {
    if (parsingArray) {
      return null;
    }

    return "source-over";
  }

  switch (value.name) {
    case "Normal":
    case "Compatible":
      return "source-over";

    case "Multiply":
      return "multiply";

    case "Screen":
      return "screen";

    case "Overlay":
      return "overlay";

    case "Darken":
      return "darken";

    case "Lighten":
      return "lighten";

    case "ColorDodge":
      return "color-dodge";

    case "ColorBurn":
      return "color-burn";

    case "HardLight":
      return "hard-light";

    case "SoftLight":
      return "soft-light";

    case "Difference":
      return "difference";

    case "Exclusion":
      return "exclusion";

    case "Hue":
      return "hue";

    case "Saturation":
      return "saturation";

    case "Color":
      return "color";

    case "Luminosity":
      return "luminosity";
  }

  if (parsingArray) {
    return null;
  }

  (0, _util_metapdf.warn)("Unsupported blend mode: ".concat(value.name));
  return "source-over";
}

var TimeSlotManager = /*#__PURE__*/function () {
  _createClass(TimeSlotManager, null, [{
    key: "TIME_SLOT_DURATION_MS",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "TIME_SLOT_DURATION_MS", 20);
    }
  }, {
    key: "CHECK_TIME_EVERY",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "CHECK_TIME_EVERY", 100);
    }
  }]);

  function TimeSlotManager() {
    _classCallCheck(this, TimeSlotManager);

    this.reset();
  }

  _createClass(TimeSlotManager, [{
    key: "check",
    value: function check() {
      if (++this.checked < TimeSlotManager.CHECK_TIME_EVERY) {
        return false;
      }

      this.checked = 0;
      return this.endTime <= Date.now();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.endTime = Date.now() + TimeSlotManager.TIME_SLOT_DURATION_MS;
      this.checked = 0;
    }
  }]);

  return TimeSlotManager;
}();

var PartialEvaluator = /*#__PURE__*/function () {
  function PartialEvaluator(_ref) {
    var xref = _ref.xref,
        handler = _ref.handler,
        pageIndex = _ref.pageIndex,
        idFactory = _ref.idFactory,
        fontCache = _ref.fontCache,
        builtInCMapCache = _ref.builtInCMapCache,
        globalImageCache = _ref.globalImageCache,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? null : _ref$options;

    _classCallCheck(this, PartialEvaluator);

    this.xref = xref;
    this.handler = handler;
    this.pageIndex = pageIndex;
    this.idFactory = idFactory;
    this.fontCache = fontCache;
    this.builtInCMapCache = builtInCMapCache;
    this.globalImageCache = globalImageCache;
    this.options = options || DefaultPartialEvaluatorOptions;
    this.parsingType3Font = false;
    this._fetchBuiltInCMapBound = this.fetchBuiltInCMap.bind(this);
  }

  _createClass(PartialEvaluator, [{
    key: "clone",
    value: function clone() {
      var newOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultPartialEvaluatorOptions;
      var newEvaluator = Object.create(this);
      newEvaluator.options = newOptions;
      return newEvaluator;
    }
  }, {
    key: "hasBlendModes",
    value: function hasBlendModes(resources, nonBlendModesSet) {
      if (!(resources instanceof _primitives.Dict)) {
        return false;
      }

      if (resources.objId && nonBlendModesSet.has(resources.objId)) {
        return false;
      }

      var processed = new _primitives.RefSet(nonBlendModesSet);

      if (resources.objId) {
        processed.put(resources.objId);
      }

      var nodes = [resources],
          xref = this.xref;

      while (nodes.length) {
        var node = nodes.shift();
        var graphicStates = node.get("ExtGState");

        if (graphicStates instanceof _primitives.Dict) {
          var _iterator = _createForOfIteratorHelper(graphicStates.getRawValues()),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var graphicState = _step.value;

              if (graphicState instanceof _primitives.Ref) {
                if (processed.has(graphicState)) {
                  continue;
                }

                try {
                  graphicState = xref.fetch(graphicState);
                } catch (ex) {
                  if (ex instanceof _core_utils.MissingDataException) {
                    throw ex;
                  }

                  processed.put(graphicState);
                  (0, _util_metapdf.info)("hasBlendModes - ignoring ExtGState: \"".concat(ex, "\"."));
                  continue;
                }
              }

              if (!(graphicState instanceof _primitives.Dict)) {
                continue;
              }

              if (graphicState.objId) {
                processed.put(graphicState.objId);
              }

              var bm = graphicState.get("BM");

              if (bm instanceof _primitives.Name) {
                if (bm.name !== "Normal") {
                  return true;
                }

                continue;
              }

              if (bm !== undefined && Array.isArray(bm)) {
                var _iterator2 = _createForOfIteratorHelper(bm),
                    _step2;

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var element = _step2.value;

                    if (element instanceof _primitives.Name && element.name !== "Normal") {
                      return true;
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        var xObjects = node.get("XObject");

        if (!(xObjects instanceof _primitives.Dict)) {
          continue;
        }

        var _iterator3 = _createForOfIteratorHelper(xObjects.getRawValues()),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var xObject = _step3.value;

            if (xObject instanceof _primitives.Ref) {
              if (processed.has(xObject)) {
                continue;
              }

              try {
                xObject = xref.fetch(xObject);
              } catch (ex) {
                if (ex instanceof _core_utils.MissingDataException) {
                  throw ex;
                }

                processed.put(xObject);
                (0, _util_metapdf.info)("hasBlendModes - ignoring XObject: \"".concat(ex, "\"."));
                continue;
              }
            }

            if (!(0, _primitives.isStream)(xObject)) {
              continue;
            }

            if (xObject.dict.objId) {
              processed.put(xObject.dict.objId);
            }

            var xResources = xObject.dict.get("Resources");

            if (!(xResources instanceof _primitives.Dict)) {
              continue;
            }

            if (xResources.objId && processed.has(xResources.objId)) {
              continue;
            }

            nodes.push(xResources);

            if (xResources.objId) {
              processed.put(xResources.objId);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      processed.forEach(function (ref) {
        nonBlendModesSet.put(ref);
      });
      return false;
    }
  }, {
    key: "fetchBuiltInCMap",
    value: function () {
      var _fetchBuiltInCMap = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(name) {
        var cachedData, readableStream, reader, data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cachedData = this.builtInCMapCache.get(name);

                if (!cachedData) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", cachedData);

              case 3:
                readableStream = this.handler.sendWithStream("FetchBuiltInCMap", {
                  name: name
                });
                reader = readableStream.getReader();
                _context.next = 7;
                return new Promise(function (resolve, reject) {
                  function pump() {
                    reader.read().then(function (_ref2) {
                      var value = _ref2.value,
                          done = _ref2.done;

                      if (done) {
                        return;
                      }

                      resolve(value);
                      pump();
                    }, reject);
                  }

                  pump();
                });

              case 7:
                data = _context.sent;

                if (data.compressionType !== _util_metapdf.CMapCompressionType.NONE) {
                  this.builtInCMapCache.set(name, data);
                }

                return _context.abrupt("return", data);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchBuiltInCMap(_x) {
        return _fetchBuiltInCMap.apply(this, arguments);
      }

      return fetchBuiltInCMap;
    }()
  }, {
    key: "buildFormXObject",
    value: function () {
      var _buildFormXObject = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resources, xobj, smask, operatorList, task, initialState, localColorSpaceCache) {
        var dict, matrix, bbox, optionalContent, group, groupOptions, groupSubtype, colorSpace, cs, cachedColorSpace;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dict = xobj.dict;
                matrix = dict.getArray("Matrix");
                bbox = dict.getArray("BBox");

                if (Array.isArray(bbox) && bbox.length === 4) {
                  bbox = _util_metapdf.Util.normalizeRect(bbox);
                } else {
                  bbox = null;
                }

                optionalContent = null;

                if (!dict.has("OC")) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 8;
                return this.parseMarkedContentProps(dict.get("OC"), resources);

              case 8:
                optionalContent = _context2.sent;
                operatorList.addOp(_util_metapdf.OPS.beginMarkedContentProps, ["OC", optionalContent]);

              case 10:
                group = dict.get("Group");

                if (!group) {
                  _context2.next = 30;
                  break;
                }

                groupOptions = {
                  matrix: matrix,
                  bbox: bbox,
                  smask: smask,
                  isolated: false,
                  knockout: false
                };
                groupSubtype = group.get("S");
                colorSpace = null;

                if (!(0, _primitives.isName)(groupSubtype, "Transparency")) {
                  _context2.next = 28;
                  break;
                }

                groupOptions.isolated = group.get("I") || false;
                groupOptions.knockout = group.get("K") || false;

                if (!group.has("CS")) {
                  _context2.next = 28;
                  break;
                }

                cs = group.getRaw("CS");
                cachedColorSpace = _colorspace_metapdf.ColorSpace.getCached(cs, this.xref, localColorSpaceCache);

                if (!cachedColorSpace) {
                  _context2.next = 25;
                  break;
                }

                colorSpace = cachedColorSpace;
                _context2.next = 28;
                break;

              case 25:
                _context2.next = 27;
                return this.parseColorSpace({
                  cs: cs,
                  resources: resources,
                  localColorSpaceCache: localColorSpaceCache
                });

              case 27:
                colorSpace = _context2.sent;

              case 28:
                if (smask && smask.backdrop) {
                  colorSpace = colorSpace || _colorspace_metapdf.ColorSpace.singletons.rgb;
                  smask.backdrop = colorSpace.getRgb(smask.backdrop, 0);
                }

                operatorList.addOp(_util_metapdf.OPS.beginGroup, [groupOptions]);

              case 30:
                operatorList.addOp(_util_metapdf.OPS.paintFormXObjectBegin, [matrix, bbox]);
                return _context2.abrupt("return", this.getOperatorList({
                  stream: xobj,
                  task: task,
                  resources: dict.get("Resources") || resources,
                  operatorList: operatorList,
                  initialState: initialState
                }).then(function () {
                  operatorList.addOp(_util_metapdf.OPS.paintFormXObjectEnd, []);

                  if (group) {
                    operatorList.addOp(_util_metapdf.OPS.endGroup, [groupOptions]);
                  }

                  if (optionalContent) {
                    operatorList.addOp(_util_metapdf.OPS.endMarkedContent, []);
                  }
                }));

              case 32:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function buildFormXObject(_x2, _x3, _x4, _x5, _x6, _x7, _x8) {
        return _buildFormXObject.apply(this, arguments);
      }

      return buildFormXObject;
    }()
  }, {
    key: "_sendImgData",
    value: function _sendImgData(objId, imgData) {
      var cacheGlobally = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var transfers = imgData ? [imgData.data.buffer] : null;

      if (this.parsingType3Font || cacheGlobally) {
        return this.handler.send("commonobj", [objId, "Image", imgData], transfers);
      }

      return this.handler.send("obj", [objId, this.pageIndex, "Image", imgData], transfers);
    }
  }, {
    key: "buildPaintImageXObject",
    value: function () {
      var _buildPaintImageXObject = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
        var _this = this;

        var resources, image, _ref3$isInline, isInline, operatorList, cacheKey, localImageCache, localColorSpaceCache, dict, imageRef, w, h, maxImageSize, imageMask, imgData, args, width, height, bitStrideLength, imgArray, decode, softMask, mask, SMALL_IMAGE_DIMENSIONS, imageObj, objId, cacheGlobally;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resources = _ref3.resources, image = _ref3.image, _ref3$isInline = _ref3.isInline, isInline = _ref3$isInline === void 0 ? false : _ref3$isInline, operatorList = _ref3.operatorList, cacheKey = _ref3.cacheKey, localImageCache = _ref3.localImageCache, localColorSpaceCache = _ref3.localColorSpaceCache;
                dict = image.dict;
                imageRef = dict.objId;
                w = dict.get("Width", "W");
                h = dict.get("Height", "H");

                if (!(!(w && (0, _util_metapdf.isNum)(w)) || !(h && (0, _util_metapdf.isNum)(h)))) {
                  _context3.next = 8;
                  break;
                }

                (0, _util_metapdf.warn)("Image dimensions are missing, or not numbers.");
                return _context3.abrupt("return", undefined);

              case 8:
                maxImageSize = this.options.maxImageSize;

                if (!(maxImageSize !== -1 && w * h > maxImageSize)) {
                  _context3.next = 12;
                  break;
                }

                (0, _util_metapdf.warn)("Image exceeded maximum allowed size and was removed.");
                return _context3.abrupt("return", undefined);

              case 12:
                imageMask = dict.get("ImageMask", "IM") || false;

                if (!imageMask) {
                  _context3.next = 25;
                  break;
                }

                width = dict.get("Width", "W");
                height = dict.get("Height", "H");
                bitStrideLength = width + 7 >> 3;
                imgArray = image.getBytes(bitStrideLength * height, true);
                decode = dict.getArray("Decode", "D");
                imgData = _image.PDFImage.createMask({
                  imgArray: imgArray,
                  width: width,
                  height: height,
                  imageIsFromDecodeStream: image instanceof _stream.DecodeStream,
                  inverseDecode: !!decode && decode[0] > 0
                });
                imgData.cached = !!cacheKey;
                args = [imgData];
                operatorList.addOp(_util_metapdf.OPS.paintImageMaskXObject, args);

                if (cacheKey) {
                  localImageCache.set(cacheKey, imageRef, {
                    fn: _util_metapdf.OPS.paintImageMaskXObject,
                    args: args
                  });
                }

                return _context3.abrupt("return", undefined);

              case 25:
                softMask = dict.get("SMask", "SM") || false;
                mask = dict.get("Mask") || false;
                SMALL_IMAGE_DIMENSIONS = 200;

                if (!(isInline && !softMask && !mask && w + h < SMALL_IMAGE_DIMENSIONS)) {
                  _context3.next = 33;
                  break;
                }

                imageObj = new _image.PDFImage({
                  xref: this.xref,
                  res: resources,
                  image: image,
                  isInline: isInline,
                  pdfFunctionFactory: this._pdfFunctionFactory,
                  localColorSpaceCache: localColorSpaceCache
                });
                imgData = imageObj.createImageData(true);
                operatorList.addOp(_util_metapdf.OPS.paintInlineImageXObject, [imgData]);
                return _context3.abrupt("return", undefined);

              case 33:
                objId = "img_".concat(this.idFactory.createObjId()), cacheGlobally = false;

                if (this.parsingType3Font) {
                  objId = "".concat(this.idFactory.getDocId(), "_type3_").concat(objId);
                } else if (imageRef) {
                  cacheGlobally = this.globalImageCache.shouldCache(imageRef, this.pageIndex);

                  if (cacheGlobally) {
                    objId = "".concat(this.idFactory.getDocId(), "_").concat(objId);
                  }
                }

                operatorList.addDependency(objId);
                args = [objId, w, h];

                _image.PDFImage.buildImage({
                  xref: this.xref,
                  res: resources,
                  image: image,
                  isInline: isInline,
                  pdfFunctionFactory: this._pdfFunctionFactory,
                  localColorSpaceCache: localColorSpaceCache
                }).then(function (imageObj) {
                  imgData = imageObj.createImageData(false);
                  return _this._sendImgData(objId, imgData, cacheGlobally);
                })["catch"](function (reason) {
                  (0, _util_metapdf.warn)("Unable to decode image \"".concat(objId, "\": \"").concat(reason, "\"."));
                  return _this._sendImgData(objId, null, cacheGlobally);
                });

                operatorList.addOp(_util_metapdf.OPS.paintImageXObject, args);

                if (cacheKey) {
                  localImageCache.set(cacheKey, imageRef, {
                    fn: _util_metapdf.OPS.paintImageXObject,
                    args: args
                  });

                  if (imageRef) {
                    (0, _util_metapdf.assert)(!isInline, "Cannot cache an inline image globally.");
                    this.globalImageCache.addPageIndex(imageRef, this.pageIndex);

                    if (cacheGlobally) {
                      this.globalImageCache.setData(imageRef, {
                        objId: objId,
                        fn: _util_metapdf.OPS.paintImageXObject,
                        args: args
                      });
                    }
                  }
                }

                return _context3.abrupt("return", undefined);

              case 41:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function buildPaintImageXObject(_x9) {
        return _buildPaintImageXObject.apply(this, arguments);
      }

      return buildPaintImageXObject;
    }()
  }, {
    key: "handleSMask",
    value: function handleSMask(smask, resources, operatorList, task, stateManager, localColorSpaceCache) {
      var smaskContent = smask.get("G");
      var smaskOptions = {
        subtype: smask.get("S").name,
        backdrop: smask.get("BC")
      };
      var transferObj = smask.get("TR");

      if ((0, _function.isPDFFunction)(transferObj)) {
        var transferFn = this._pdfFunctionFactory.create(transferObj);

        var transferMap = new Uint8Array(256);
        var tmp = new Float32Array(1);

        for (var i = 0; i < 256; i++) {
          tmp[0] = i / 255;
          transferFn(tmp, 0, tmp, 0);
          transferMap[i] = tmp[0] * 255 | 0;
        }

        smaskOptions.transferMap = transferMap;
      }

      return this.buildFormXObject(resources, smaskContent, smaskOptions, operatorList, task, stateManager.state.clone(), localColorSpaceCache);
    }
  }, {
    key: "handleTransferFunction",
    value: function handleTransferFunction(tr) {
      var transferArray;

      if (Array.isArray(tr)) {
        transferArray = tr;
      } else if ((0, _function.isPDFFunction)(tr)) {
        transferArray = [tr];
      } else {
        return null;
      }

      var transferMaps = [];
      var numFns = 0,
          numEffectfulFns = 0;

      var _iterator4 = _createForOfIteratorHelper(transferArray),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var entry = _step4.value;
          var transferObj = this.xref.fetchIfRef(entry);
          numFns++;

          if ((0, _primitives.isName)(transferObj, "Identity")) {
            transferMaps.push(null);
            continue;
          } else if (!(0, _function.isPDFFunction)(transferObj)) {
            return null;
          }

          var transferFn = this._pdfFunctionFactory.create(transferObj);

          var transferMap = new Uint8Array(256),
              tmp = new Float32Array(1);

          for (var j = 0; j < 256; j++) {
            tmp[0] = j / 255;
            transferFn(tmp, 0, tmp, 0);
            transferMap[j] = tmp[0] * 255 | 0;
          }

          transferMaps.push(transferMap);
          numEffectfulFns++;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (!(numFns === 1 || numFns === 4)) {
        return null;
      }

      if (numEffectfulFns === 0) {
        return null;
      }

      return transferMaps;
    }
  }, {
    key: "handleTilingType",
    value: function handleTilingType(fn, color, resources, pattern, patternDict, operatorList, task, cacheKey, localTilingPatternCache) {
      var _this2 = this;

      var tilingOpList = new _operator_list.OperatorList();

      var patternResources = _primitives.Dict.merge({
        xref: this.xref,
        dictArray: [patternDict.get("Resources"), resources]
      });

      return this.getOperatorList({
        stream: pattern,
        task: task,
        resources: patternResources,
        operatorList: tilingOpList
      }).then(function () {
        var operatorListIR = tilingOpList.getIR();
        var tilingPatternIR = (0, _pattern.getTilingPatternIR)(operatorListIR, patternDict, color);
        operatorList.addDependencies(tilingOpList.dependencies);
        operatorList.addOp(fn, tilingPatternIR);

        if (cacheKey) {
          localTilingPatternCache.set(cacheKey, patternDict.objId, {
            operatorListIR: operatorListIR,
            dict: patternDict
          });
        }
      })["catch"](function (reason) {
        if (reason instanceof _util_metapdf.AbortException) {
          return;
        }

        if (_this2.options.ignoreErrors) {
          _this2.handler.send("UnsupportedFeature", {
            featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorTilingPattern
          });

          (0, _util_metapdf.warn)("handleTilingType - ignoring pattern: \"".concat(reason, "\"."));
          return;
        }

        throw reason;
      });
    }
  }, {
    key: "handleSetFont",
    value: function handleSetFont(resources, fontArgs, fontRef, operatorList, task, state) {
      var _this3 = this;

      var fallbackFontDict = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var fontName,
          fontSize = 0;

      if (fontArgs) {
        fontArgs = fontArgs.slice();
        fontName = fontArgs[0].name;
        fontSize = fontArgs[1];
      }

      return this.loadFont(fontName, fontRef, resources, fallbackFontDict).then(function (translated) {
        if (!translated.font.isType3Font) {
          return translated;
        }

        return translated.loadType3Data(_this3, resources, task).then(function () {
          operatorList.addDependencies(translated.type3Dependencies);
          return translated;
        })["catch"](function (reason) {
          _this3.handler.send("UnsupportedFeature", {
            featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorFontLoadType3
          });

          return new TranslatedFont({
            loadedName: "g_font_error",
            font: new _fonts.ErrorFont("Type3 font load error: ".concat(reason)),
            dict: translated.font,
            extraProperties: _this3.options.fontExtraProperties
          });
        });
      }).then(function (translated) {
        state.font = translated.font;
        state.fontSize = fontSize;
        state.fontName = fontName;
        translated.send(_this3.handler);
        return translated.loadedName;
      });
    }
  }, {
    key: "handleText",
    value: function handleText(chars, state) {
      var font = state.font;
      var glyphs = font.charsToGlyphs(chars);

      if (font.data) {
        var isAddToPathSet = !!(state.textRenderingMode & _util_metapdf.TextRenderingMode.ADD_TO_PATH_FLAG);

        if (isAddToPathSet || state.fillColorSpace.name === "Pattern" || font.disableFontFace || this.options.disableFontFace) {
          PartialEvaluator.buildFontPaths(font, glyphs, this.handler);
        }
      }

      return glyphs;
    }
  }, {
    key: "ensureStateFont",
    value: function ensureStateFont(state) {
      if (state.font) {
        return;
      }

      var reason = new _util_metapdf.FormatError("Missing setFont (Tf) operator before text rendering operator.");

      if (this.options.ignoreErrors) {
        this.handler.send("UnsupportedFeature", {
          featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorFontState
        });
        (0, _util_metapdf.warn)("ensureStateFont: \"".concat(reason, "\"."));
        return;
      }

      throw reason;
    }
  }, {
    key: "setGState",
    value: function () {
      var _setGState = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
        var _this4 = this;

        var resources, gState, operatorList, cacheKey, task, stateManager, localGStateCache, localColorSpaceCache, gStateRef, isSimpleGState, gStateObj, gStateKeys, promise, _loop, i, ii;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resources = _ref4.resources, gState = _ref4.gState, operatorList = _ref4.operatorList, cacheKey = _ref4.cacheKey, task = _ref4.task, stateManager = _ref4.stateManager, localGStateCache = _ref4.localGStateCache, localColorSpaceCache = _ref4.localColorSpaceCache;
                gStateRef = gState.objId;
                isSimpleGState = true;
                gStateObj = [];
                gStateKeys = gState.getKeys();
                promise = Promise.resolve();

                _loop = function _loop() {
                  var key = gStateKeys[i];
                  var value = gState.get(key);

                  switch (key) {
                    case "Type":
                      break;

                    case "LW":
                    case "LC":
                    case "LJ":
                    case "ML":
                    case "D":
                    case "RI":
                    case "FL":
                    case "CA":
                    case "ca":
                      gStateObj.push([key, value]);
                      break;

                    case "Font":
                      isSimpleGState = false;
                      promise = promise.then(function () {
                        return _this4.handleSetFont(resources, null, value[0], operatorList, task, stateManager.state).then(function (loadedName) {
                          operatorList.addDependency(loadedName);
                          gStateObj.push([key, [loadedName, value[1]]]);
                        });
                      });
                      break;

                    case "BM":
                      gStateObj.push([key, normalizeBlendMode(value)]);
                      break;

                    case "SMask":
                      if ((0, _primitives.isName)(value, "None")) {
                        gStateObj.push([key, false]);
                        break;
                      }

                      if ((0, _primitives.isDict)(value)) {
                        isSimpleGState = false;
                        promise = promise.then(function () {
                          return _this4.handleSMask(value, resources, operatorList, task, stateManager, localColorSpaceCache);
                        });
                        gStateObj.push([key, true]);
                      } else {
                        (0, _util_metapdf.warn)("Unsupported SMask type");
                      }

                      break;

                    case "TR":
                      var transferMaps = _this4.handleTransferFunction(value);

                      gStateObj.push([key, transferMaps]);
                      break;

                    case "OP":
                    case "op":
                    case "OPM":
                    case "BG":
                    case "BG2":
                    case "UCR":
                    case "UCR2":
                    case "TR2":
                    case "HT":
                    case "SM":
                    case "SA":
                    case "AIS":
                    case "TK":
                      (0, _util_metapdf.info)("graphic state operator " + key);
                      break;

                    default:
                      (0, _util_metapdf.info)("Unknown graphic state operator " + key);
                      break;
                  }
                };

                for (i = 0, ii = gStateKeys.length; i < ii; i++) {
                  _loop();
                }

                return _context4.abrupt("return", promise.then(function () {
                  if (gStateObj.length > 0) {
                    operatorList.addOp(_util_metapdf.OPS.setGState, [gStateObj]);
                  }

                  if (isSimpleGState) {
                    localGStateCache.set(cacheKey, gStateRef, gStateObj);
                  }
                }));

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function setGState(_x10) {
        return _setGState.apply(this, arguments);
      }

      return setGState;
    }()
  }, {
    key: "loadFont",
    value: function loadFont(fontName, font, resources) {
      var _this5 = this;

      var fallbackFontDict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      var errorFont = /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt("return", new TranslatedFont({
                    loadedName: "g_font_error",
                    font: new _fonts.ErrorFont("Font \"".concat(fontName, "\" is not available.")),
                    dict: font,
                    extraProperties: _this5.options.fontExtraProperties
                  }));

                case 1:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function errorFont() {
          return _ref5.apply(this, arguments);
        };
      }();

      var fontRef,
          xref = this.xref;

      if (font) {
        if (!(0, _primitives.isRef)(font)) {
          throw new _util_metapdf.FormatError('The "font" object should be a reference.');
        }

        fontRef = font;
      } else {
        var fontRes = resources.get("Font");

        if (fontRes) {
          fontRef = fontRes.getRaw(fontName);
        }
      }

      if (!fontRef) {
        var partialMsg = "Font \"".concat(fontName || font && font.toString(), "\" is not available");

        if (!this.options.ignoreErrors && !this.parsingType3Font) {
          (0, _util_metapdf.warn)("".concat(partialMsg, "."));
          return errorFont();
        }

        this.handler.send("UnsupportedFeature", {
          featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorFontMissing
        });
        (0, _util_metapdf.warn)("".concat(partialMsg, " -- attempting to fallback to a default font."));

        if (fallbackFontDict) {
          fontRef = fallbackFontDict;
        } else {
          fontRef = PartialEvaluator.fallbackFontDict;
        }
      }

      if (this.fontCache.has(fontRef)) {
        return this.fontCache.get(fontRef);
      }

      font = xref.fetchIfRef(fontRef);

      if (!(0, _primitives.isDict)(font)) {
        return errorFont();
      }

      if (font.cacheKey && this.fontCache.has(font.cacheKey)) {
        return this.fontCache.get(font.cacheKey);
      }

      var fontCapability = (0, _util_metapdf.createPromiseCapability)();
      var preEvaluatedFont = this.preEvaluateFont(font);
      var descriptor = preEvaluatedFont.descriptor,
          hash = preEvaluatedFont.hash;
      var fontRefIsRef = (0, _primitives.isRef)(fontRef),
          fontID;

      if (fontRefIsRef) {
        fontID = "f".concat(fontRef.toString());
      }

      if (hash && (0, _primitives.isDict)(descriptor)) {
        if (!descriptor.fontAliases) {
          descriptor.fontAliases = Object.create(null);
        }

        var fontAliases = descriptor.fontAliases;

        if (fontAliases[hash]) {
          var aliasFontRef = fontAliases[hash].aliasRef;

          if (fontRefIsRef && aliasFontRef && this.fontCache.has(aliasFontRef)) {
            this.fontCache.putAlias(fontRef, aliasFontRef);
            return this.fontCache.get(fontRef);
          }
        } else {
          fontAliases[hash] = {
            fontID: this.idFactory.createFontId()
          };
        }

        if (fontRefIsRef) {
          fontAliases[hash].aliasRef = fontRef;
        }

        fontID = fontAliases[hash].fontID;
      }

      if (fontRefIsRef) {
        this.fontCache.put(fontRef, fontCapability.promise);
      } else {
        if (!fontID) {
          fontID = this.idFactory.createFontId();
        }

        font.cacheKey = "cacheKey_".concat(fontID);
        this.fontCache.put(font.cacheKey, fontCapability.promise);
      }

      (0, _util_metapdf.assert)(fontID && fontID.startsWith("f"), 'The "fontID" must be (correctly) defined.');
      font.loadedName = "".concat(this.idFactory.getDocId(), "_").concat(fontID);
      this.translateFont(preEvaluatedFont).then(function (translatedFont) {
        if (translatedFont.fontType !== undefined) {
          var xrefFontStats = xref.stats.fontTypes;
          xrefFontStats[translatedFont.fontType] = true;
        }

        fontCapability.resolve(new TranslatedFont({
          loadedName: font.loadedName,
          font: translatedFont,
          dict: font,
          extraProperties: _this5.options.fontExtraProperties
        }));
      })["catch"](function (reason) {
        _this5.handler.send("UnsupportedFeature", {
          featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorFontTranslate
        });

        try {
          var fontFile3 = descriptor && descriptor.get("FontFile3");
          var subtype = fontFile3 && fontFile3.get("Subtype");
          var fontType = (0, _fonts.getFontType)(preEvaluatedFont.type, subtype && subtype.name);
          var xrefFontStats = xref.stats.fontTypes;
          xrefFontStats[fontType] = true;
        } catch (ex) {}

        fontCapability.resolve(new TranslatedFont({
          loadedName: font.loadedName,
          font: new _fonts.ErrorFont(reason instanceof Error ? reason.message : reason),
          dict: font,
          extraProperties: _this5.options.fontExtraProperties
        }));
      });
      return fontCapability.promise;
    }
  }, {
    key: "buildPath",
    value: function buildPath(operatorList, fn, args) {
      var parsingText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var lastIndex = operatorList.length - 1;

      if (!args) {
        args = [];
      }

      if (lastIndex < 0 || operatorList.fnArray[lastIndex] !== _util_metapdf.OPS.constructPath) {
        if (parsingText) {
          (0, _util_metapdf.warn)("Encountered path operator \"".concat(fn, "\" inside of a text object."));
          operatorList.addOp(_util_metapdf.OPS.save, null);
        }

        operatorList.addOp(_util_metapdf.OPS.constructPath, [[fn], args]);

        if (parsingText) {
          operatorList.addOp(_util_metapdf.OPS.restore, null);
        }
      } else {
        var opArgs = operatorList.argsArray[lastIndex];
        opArgs[0].push(fn);
        Array.prototype.push.apply(opArgs[1], args);
      }
    }
  }, {
    key: "parseColorSpace",
    value: function parseColorSpace(_ref6) {
      var _this6 = this;

      var cs = _ref6.cs,
          resources = _ref6.resources,
          localColorSpaceCache = _ref6.localColorSpaceCache;
      return _colorspace_metapdf.ColorSpace.parseAsync({
        cs: cs,
        xref: this.xref,
        resources: resources,
        pdfFunctionFactory: this._pdfFunctionFactory,
        localColorSpaceCache: localColorSpaceCache
      })["catch"](function (reason) {
        if (reason instanceof _util_metapdf.AbortException) {
          return null;
        }

        if (_this6.options.ignoreErrors) {
          _this6.handler.send("UnsupportedFeature", {
            featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorColorSpace
          });

          (0, _util_metapdf.warn)("parseColorSpace - ignoring ColorSpace: \"".concat(reason, "\"."));
          return null;
        }

        throw reason;
      });
    }
  }, {
    key: "handleColorN",
    value: function handleColorN(operatorList, fn, args, cs, patterns, resources, task, localColorSpaceCache, localTilingPatternCache) {
      var patternName = args.pop();

      if (patternName instanceof _primitives.Name) {
        var name = patternName.name;
        var localTilingPattern = localTilingPatternCache.getByName(name);

        if (localTilingPattern) {
          try {
            var color = cs.base ? cs.base.getRgb(args, 0) : null;
            var tilingPatternIR = (0, _pattern.getTilingPatternIR)(localTilingPattern.operatorListIR, localTilingPattern.dict, color);
            operatorList.addOp(fn, tilingPatternIR);
            return undefined;
          } catch (ex) {
            if (ex instanceof _core_utils.MissingDataException) {
              throw ex;
            }
          }
        }

        var pattern = patterns.get(name);

        if (pattern) {
          var dict = (0, _primitives.isStream)(pattern) ? pattern.dict : pattern;
          var typeNum = dict.get("PatternType");

          if (typeNum === PatternType.TILING) {
            var _color = cs.base ? cs.base.getRgb(args, 0) : null;

            return this.handleTilingType(fn, _color, resources, pattern, dict, operatorList, task, name, localTilingPatternCache);
          } else if (typeNum === PatternType.SHADING) {
            var shading = dict.get("Shading");
            var matrix = dict.getArray("Matrix");
            pattern = _pattern.Pattern.parseShading(shading, matrix, this.xref, resources, this.handler, this._pdfFunctionFactory, localColorSpaceCache);
            operatorList.addOp(fn, pattern.getIR());
            return undefined;
          }

          throw new _util_metapdf.FormatError("Unknown PatternType: ".concat(typeNum));
        }
      }

      throw new _util_metapdf.FormatError("Unknown PatternName: ".concat(patternName));
    }
  }, {
    key: "parseMarkedContentProps",
    value: function () {
      var _parseMarkedContentProps = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6(contentProperties, resources) {
        var optionalContent, properties, optionalContentType, optionalContentGroups, groupIds, expression;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(0, _primitives.isName)(contentProperties)) {
                  _context6.next = 5;
                  break;
                }

                properties = resources.get("Properties");
                optionalContent = properties.get(contentProperties.name);
                _context6.next = 10;
                break;

              case 5:
                if (!(0, _primitives.isDict)(contentProperties)) {
                  _context6.next = 9;
                  break;
                }

                optionalContent = contentProperties;
                _context6.next = 10;
                break;

              case 9:
                throw new _util_metapdf.FormatError("Optional content properties malformed.");

              case 10:
                optionalContentType = optionalContent.get("Type").name;

                if (!(optionalContentType === "OCG")) {
                  _context6.next = 15;
                  break;
                }

                return _context6.abrupt("return", {
                  type: optionalContentType,
                  id: optionalContent.objId
                });

              case 15:
                if (!(optionalContentType === "OCMD")) {
                  _context6.next = 27;
                  break;
                }

                optionalContentGroups = optionalContent.get("OCGs");

                if (!(Array.isArray(optionalContentGroups) || (0, _primitives.isDict)(optionalContentGroups))) {
                  _context6.next = 25;
                  break;
                }

                groupIds = [];

                if (Array.isArray(optionalContentGroups)) {
                  optionalContent.get("OCGs").forEach(function (ocg) {
                    groupIds.push(ocg.toString());
                  });
                } else {
                  groupIds.push(optionalContentGroups.objId);
                }

                expression = null;

                if (optionalContent.get("VE")) {
                  expression = true;
                }

                return _context6.abrupt("return", {
                  type: optionalContentType,
                  ids: groupIds,
                  policy: (0, _primitives.isName)(optionalContent.get("P")) ? optionalContent.get("P").name : null,
                  expression: expression
                });

              case 25:
                if (!(0, _primitives.isRef)(optionalContentGroups)) {
                  _context6.next = 27;
                  break;
                }

                return _context6.abrupt("return", {
                  type: optionalContentType,
                  id: optionalContentGroups.toString()
                });

              case 27:
                return _context6.abrupt("return", null);

              case 28:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function parseMarkedContentProps(_x11, _x12) {
        return _parseMarkedContentProps.apply(this, arguments);
      }

      return parseMarkedContentProps;
    }()
  }, {
    key: "getOperatorList",
    value: function getOperatorList(_ref7) {
      var _this7 = this;

      var stream = _ref7.stream,
          task = _ref7.task,
          resources = _ref7.resources,
          operatorList = _ref7.operatorList,
          _ref7$initialState = _ref7.initialState,
          initialState = _ref7$initialState === void 0 ? null : _ref7$initialState,
          _ref7$fallbackFontDic = _ref7.fallbackFontDict,
          fallbackFontDict = _ref7$fallbackFontDic === void 0 ? null : _ref7$fallbackFontDic;
      resources = resources || _primitives.Dict.empty;
      initialState = initialState || new EvalState();

      if (!operatorList) {
        throw new Error('getOperatorList: missing "operatorList" parameter');
      }

      var self = this;
      var xref = this.xref;
      var parsingText = false;
      var localImageCache = new _image_utils.LocalImageCache();
      var localColorSpaceCache = new _image_utils.LocalColorSpaceCache();
      var localGStateCache = new _image_utils.LocalGStateCache();
      var localTilingPatternCache = new _image_utils.LocalTilingPatternCache();

      var xobjs = resources.get("XObject") || _primitives.Dict.empty;

      var patterns = resources.get("Pattern") || _primitives.Dict.empty;

      var stateManager = new StateManager(initialState);
      var preprocessor = new EvaluatorPreprocessor(stream, xref, stateManager);
      var timeSlotManager = new TimeSlotManager();

      function closePendingRestoreOPS(argument) {
        for (var i = 0, ii = preprocessor.savedStatesDepth; i < ii; i++) {
          operatorList.addOp(_util_metapdf.OPS.restore, []);
        }
      }

      return new Promise(function promiseBody(resolve, reject) {
        var next = function next(promise) {
          Promise.all([promise, operatorList.ready]).then(function () {
            try {
              promiseBody(resolve, reject);
            } catch (ex) {
              reject(ex);
            }
          }, reject);
        };

        task.ensureNotTerminated();
        timeSlotManager.reset();
        var stop,
            operation = {},
            i,
            ii,
            cs,
            name;

        while (!(stop = timeSlotManager.check())) {
          operation.args = null;

          if (!preprocessor.read(operation)) {
            break;
          }

          var args = operation.args;
          var fn = operation.fn;

          switch (fn | 0) {
            case _util_metapdf.OPS.paintXObject:
              name = args[0].name;

              if (name) {
                var localImage = localImageCache.getByName(name);

                if (localImage) {
                  operatorList.addOp(localImage.fn, localImage.args);
                  args = null;
                  continue;
                }
              }

              next(new Promise(function (resolveXObject, rejectXObject) {
                if (!name) {
                  throw new _util_metapdf.FormatError("XObject must be referred to by name.");
                }

                var xobj = xobjs.getRaw(name);

                if (xobj instanceof _primitives.Ref) {
                  var _localImage = localImageCache.getByRef(xobj);

                  if (_localImage) {
                    operatorList.addOp(_localImage.fn, _localImage.args);
                    resolveXObject();
                    return;
                  }

                  var globalImage = self.globalImageCache.getData(xobj, self.pageIndex);

                  if (globalImage) {
                    operatorList.addDependency(globalImage.objId);
                    operatorList.addOp(globalImage.fn, globalImage.args);
                    resolveXObject();
                    return;
                  }

                  xobj = xref.fetch(xobj);
                }

                if (!(0, _primitives.isStream)(xobj)) {
                  throw new _util_metapdf.FormatError("XObject should be a stream");
                }

                var type = xobj.dict.get("Subtype");

                if (!(0, _primitives.isName)(type)) {
                  throw new _util_metapdf.FormatError("XObject should have a Name subtype");
                }

                if (type.name === "Form") {
                  stateManager.save();
                  self.buildFormXObject(resources, xobj, null, operatorList, task, stateManager.state.clone(), localColorSpaceCache).then(function () {
                    stateManager.restore();
                    resolveXObject();
                  }, rejectXObject);
                  return;
                } else if (type.name === "Image") {
                  self.buildPaintImageXObject({
                    resources: resources,
                    image: xobj,
                    operatorList: operatorList,
                    cacheKey: name,
                    localImageCache: localImageCache,
                    localColorSpaceCache: localColorSpaceCache
                  }).then(resolveXObject, rejectXObject);
                  return;
                } else if (type.name === "PS") {
                  (0, _util_metapdf.info)("Ignored XObject subtype PS");
                } else {
                  throw new _util_metapdf.FormatError("Unhandled XObject subtype ".concat(type.name));
                }

                resolveXObject();
              })["catch"](function (reason) {
                if (reason instanceof _util_metapdf.AbortException) {
                  return;
                }

                if (self.options.ignoreErrors) {
                  self.handler.send("UnsupportedFeature", {
                    featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorXObject
                  });
                  (0, _util_metapdf.warn)("getOperatorList - ignoring XObject: \"".concat(reason, "\"."));
                  return;
                }

                throw reason;
              }));
              return;

            case _util_metapdf.OPS.setFont:
              var fontSize = args[1];
              next(self.handleSetFont(resources, args, null, operatorList, task, stateManager.state, fallbackFontDict).then(function (loadedName) {
                operatorList.addDependency(loadedName);
                operatorList.addOp(_util_metapdf.OPS.setFont, [loadedName, fontSize]);
              }));
              return;

            case _util_metapdf.OPS.beginText:
              parsingText = true;
              break;

            case _util_metapdf.OPS.endText:
              parsingText = false;
              break;

            case _util_metapdf.OPS.endInlineImage:
              var cacheKey = args[0].cacheKey;

              if (cacheKey) {
                var _localImage2 = localImageCache.getByName(cacheKey);

                if (_localImage2) {
                  operatorList.addOp(_localImage2.fn, _localImage2.args);
                  args = null;
                  continue;
                }
              }

              next(self.buildPaintImageXObject({
                resources: resources,
                image: args[0],
                isInline: true,
                operatorList: operatorList,
                cacheKey: cacheKey,
                localImageCache: localImageCache,
                localColorSpaceCache: localColorSpaceCache
              }));
              return;

            case _util_metapdf.OPS.showText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              args[0] = self.handleText(args[0], stateManager.state);
              break;

            case _util_metapdf.OPS.showSpacedText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              var arr = args[0];
              var combinedGlyphs = [];
              var arrLength = arr.length;
              var state = stateManager.state;

              for (i = 0; i < arrLength; ++i) {
                var arrItem = arr[i];

                if ((0, _util_metapdf.isString)(arrItem)) {
                  Array.prototype.push.apply(combinedGlyphs, self.handleText(arrItem, state));
                } else if ((0, _util_metapdf.isNum)(arrItem)) {
                  combinedGlyphs.push(arrItem);
                }
              }

              args[0] = combinedGlyphs;
              fn = _util_metapdf.OPS.showText;
              break;

            case _util_metapdf.OPS.nextLineShowText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              operatorList.addOp(_util_metapdf.OPS.nextLine);
              args[0] = self.handleText(args[0], stateManager.state);
              fn = _util_metapdf.OPS.showText;
              break;

            case _util_metapdf.OPS.nextLineSetSpacingShowText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              operatorList.addOp(_util_metapdf.OPS.nextLine);
              operatorList.addOp(_util_metapdf.OPS.setWordSpacing, [args.shift()]);
              operatorList.addOp(_util_metapdf.OPS.setCharSpacing, [args.shift()]);
              args[0] = self.handleText(args[0], stateManager.state);
              fn = _util_metapdf.OPS.showText;
              break;

            case _util_metapdf.OPS.setTextRenderingMode:
              stateManager.state.textRenderingMode = args[0];
              break;

            case _util_metapdf.OPS.setFillColorSpace:
              {
                var cachedColorSpace = _colorspace_metapdf.ColorSpace.getCached(args[0], xref, localColorSpaceCache);

                if (cachedColorSpace) {
                  stateManager.state.fillColorSpace = cachedColorSpace;
                  continue;
                }

                next(self.parseColorSpace({
                  cs: args[0],
                  resources: resources,
                  localColorSpaceCache: localColorSpaceCache
                }).then(function (colorSpace) {
                  if (colorSpace) {
                    stateManager.state.fillColorSpace = colorSpace;
                  }
                }));
                return;
              }

            case _util_metapdf.OPS.setStrokeColorSpace:
              {
                var _cachedColorSpace = _colorspace_metapdf.ColorSpace.getCached(args[0], xref, localColorSpaceCache);

                if (_cachedColorSpace) {
                  stateManager.state.strokeColorSpace = _cachedColorSpace;
                  continue;
                }

                next(self.parseColorSpace({
                  cs: args[0],
                  resources: resources,
                  localColorSpaceCache: localColorSpaceCache
                }).then(function (colorSpace) {
                  if (colorSpace) {
                    stateManager.state.strokeColorSpace = colorSpace;
                  }
                }));
                return;
              }

            case _util_metapdf.OPS.setFillColor:
              cs = stateManager.state.fillColorSpace;
              args = cs.getRgb(args, 0);
              fn = _util_metapdf.OPS.setFillRGBColor;
              break;

            case _util_metapdf.OPS.setStrokeColor:
              cs = stateManager.state.strokeColorSpace;
              args = cs.getRgb(args, 0);
              fn = _util_metapdf.OPS.setStrokeRGBColor;
              break;

            case _util_metapdf.OPS.setFillGray:
              stateManager.state.fillColorSpace = _colorspace_metapdf.ColorSpace.singletons.gray;
              args = _colorspace_metapdf.ColorSpace.singletons.gray.getRgb(args, 0);
              fn = _util_metapdf.OPS.setFillRGBColor;
              break;

            case _util_metapdf.OPS.setStrokeGray:
              stateManager.state.strokeColorSpace = _colorspace_metapdf.ColorSpace.singletons.gray;
              args = _colorspace_metapdf.ColorSpace.singletons.gray.getRgb(args, 0);
              fn = _util_metapdf.OPS.setStrokeRGBColor;
              break;

            case _util_metapdf.OPS.setFillCMYKColor:
              stateManager.state.fillColorSpace = _colorspace_metapdf.ColorSpace.singletons.cmyk;
              args = _colorspace_metapdf.ColorSpace.singletons.cmyk.getRgb(args, 0);
              fn = _util_metapdf.OPS.setFillRGBColor;
              break;

            case _util_metapdf.OPS.setStrokeCMYKColor:
              stateManager.state.strokeColorSpace = _colorspace_metapdf.ColorSpace.singletons.cmyk;
              args = _colorspace_metapdf.ColorSpace.singletons.cmyk.getRgb(args, 0);
              fn = _util_metapdf.OPS.setStrokeRGBColor;
              break;

            case _util_metapdf.OPS.setFillRGBColor:
              stateManager.state.fillColorSpace = _colorspace_metapdf.ColorSpace.singletons.rgb;
              args = _colorspace_metapdf.ColorSpace.singletons.rgb.getRgb(args, 0);
              break;

            case _util_metapdf.OPS.setStrokeRGBColor:
              stateManager.state.strokeColorSpace = _colorspace_metapdf.ColorSpace.singletons.rgb;
              args = _colorspace_metapdf.ColorSpace.singletons.rgb.getRgb(args, 0);
              break;

            case _util_metapdf.OPS.setFillColorN:
              cs = stateManager.state.fillColorSpace;

              if (cs.name === "Pattern") {
                next(self.handleColorN(operatorList, _util_metapdf.OPS.setFillColorN, args, cs, patterns, resources, task, localColorSpaceCache, localTilingPatternCache));
                return;
              }

              args = cs.getRgb(args, 0);
              fn = _util_metapdf.OPS.setFillRGBColor;
              break;

            case _util_metapdf.OPS.setStrokeColorN:
              cs = stateManager.state.strokeColorSpace;

              if (cs.name === "Pattern") {
                next(self.handleColorN(operatorList, _util_metapdf.OPS.setStrokeColorN, args, cs, patterns, resources, task, localColorSpaceCache, localTilingPatternCache));
                return;
              }

              args = cs.getRgb(args, 0);
              fn = _util_metapdf.OPS.setStrokeRGBColor;
              break;

            case _util_metapdf.OPS.shadingFill:
              var shadingRes = resources.get("Shading");

              if (!shadingRes) {
                throw new _util_metapdf.FormatError("No shading resource found");
              }

              var shading = shadingRes.get(args[0].name);

              if (!shading) {
                throw new _util_metapdf.FormatError("No shading object found");
              }

              var shadingFill = _pattern.Pattern.parseShading(shading, null, xref, resources, self.handler, self._pdfFunctionFactory, localColorSpaceCache);

              var patternIR = shadingFill.getIR();
              args = [patternIR];
              fn = _util_metapdf.OPS.shadingFill;
              break;

            case _util_metapdf.OPS.setGState:
              name = args[0].name;

              if (name) {
                var localGStateObj = localGStateCache.getByName(name);

                if (localGStateObj) {
                  if (localGStateObj.length > 0) {
                    operatorList.addOp(_util_metapdf.OPS.setGState, [localGStateObj]);
                  }

                  args = null;
                  continue;
                }
              }

              next(new Promise(function (resolveGState, rejectGState) {
                if (!name) {
                  throw new _util_metapdf.FormatError("GState must be referred to by name.");
                }

                var extGState = resources.get("ExtGState");

                if (!(extGState instanceof _primitives.Dict)) {
                  throw new _util_metapdf.FormatError("ExtGState should be a dictionary.");
                }

                var gState = extGState.get(name);

                if (!(gState instanceof _primitives.Dict)) {
                  throw new _util_metapdf.FormatError("GState should be a dictionary.");
                }

                self.setGState({
                  resources: resources,
                  gState: gState,
                  operatorList: operatorList,
                  cacheKey: name,
                  task: task,
                  stateManager: stateManager,
                  localGStateCache: localGStateCache,
                  localColorSpaceCache: localColorSpaceCache
                }).then(resolveGState, rejectGState);
              })["catch"](function (reason) {
                if (reason instanceof _util_metapdf.AbortException) {
                  return;
                }

                if (self.options.ignoreErrors) {
                  self.handler.send("UnsupportedFeature", {
                    featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorExtGState
                  });
                  (0, _util_metapdf.warn)("getOperatorList - ignoring ExtGState: \"".concat(reason, "\"."));
                  return;
                }

                throw reason;
              }));
              return;

            case _util_metapdf.OPS.moveTo:
            case _util_metapdf.OPS.lineTo:
            case _util_metapdf.OPS.curveTo:
            case _util_metapdf.OPS.curveTo2:
            case _util_metapdf.OPS.curveTo3:
            case _util_metapdf.OPS.closePath:
            case _util_metapdf.OPS.rectangle:
              self.buildPath(operatorList, fn, args, parsingText);
              continue;

            case _util_metapdf.OPS.markPoint:
            case _util_metapdf.OPS.markPointProps:
            case _util_metapdf.OPS.beginCompat:
            case _util_metapdf.OPS.endCompat:
              continue;

            case _util_metapdf.OPS.beginMarkedContentProps:
              if (!(0, _primitives.isName)(args[0])) {
                (0, _util_metapdf.warn)("Expected name for beginMarkedContentProps arg0=".concat(args[0]));
                continue;
              }

              if (args[0].name === "OC") {
                next(self.parseMarkedContentProps(args[1], resources).then(function (data) {
                  operatorList.addOp(_util_metapdf.OPS.beginMarkedContentProps, ["OC", data]);
                })["catch"](function (reason) {
                  if (reason instanceof _util_metapdf.AbortException) {
                    return;
                  }

                  if (self.options.ignoreErrors) {
                    self.handler.send("UnsupportedFeature", {
                      featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorMarkedContent
                    });
                    (0, _util_metapdf.warn)("getOperatorList - ignoring beginMarkedContentProps: \"".concat(reason, "\"."));
                    return;
                  }

                  throw reason;
                }));
                return;
              }

              args = [args[0].name];
              break;

            case _util_metapdf.OPS.beginMarkedContent:
            case _util_metapdf.OPS.endMarkedContent:
            default:
              if (args !== null) {
                for (i = 0, ii = args.length; i < ii; i++) {
                  if (args[i] instanceof _primitives.Dict) {
                    break;
                  }
                }

                if (i < ii) {
                  (0, _util_metapdf.warn)("getOperatorList - ignoring operator: " + fn);
                  continue;
                }
              }

          }

          operatorList.addOp(fn, args);
        }

        if (stop) {
          next(deferred);
          return;
        }

        closePendingRestoreOPS();
        resolve();
      })["catch"](function (reason) {
        if (reason instanceof _util_metapdf.AbortException) {
          return;
        }

        if (_this7.options.ignoreErrors) {
          _this7.handler.send("UnsupportedFeature", {
            featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorOperatorList
          });

          (0, _util_metapdf.warn)("getOperatorList - ignoring errors during \"".concat(task.name, "\" ") + "task: \"".concat(reason, "\"."));
          closePendingRestoreOPS();
          return;
        }

        throw reason;
      });
    }
  }, {
    key: "getTextContent",
    value: function getTextContent(_ref8) {
      var _this8 = this;

      var stream = _ref8.stream,
          task = _ref8.task,
          resources = _ref8.resources,
          _ref8$stateManager = _ref8.stateManager,
          stateManager = _ref8$stateManager === void 0 ? null : _ref8$stateManager,
          _ref8$normalizeWhites = _ref8.normalizeWhitespace,
          normalizeWhitespace = _ref8$normalizeWhites === void 0 ? false : _ref8$normalizeWhites,
          _ref8$combineTextItem = _ref8.combineTextItems,
          combineTextItems = _ref8$combineTextItem === void 0 ? false : _ref8$combineTextItem,
          sink = _ref8.sink,
          _ref8$seenStyles = _ref8.seenStyles,
          seenStyles = _ref8$seenStyles === void 0 ? Object.create(null) : _ref8$seenStyles;
      resources = resources || _primitives.Dict.empty;
      stateManager = stateManager || new StateManager(new TextState());
      var WhitespaceRegexp = /\s/g;
      var textContent = {
        items: [],
        styles: Object.create(null)
      };
      var textContentItem = {
        initialized: false,
        str: [],
        width: 0,
        glyphWidths: [],
        height: 0,
        vertical: false,
        lastAdvanceWidth: 0,
        lastAdvanceHeight: 0,
        textAdvanceScale: 0,
        spaceWidth: 0,
        fakeSpaceMin: Infinity,
        fakeMultiSpaceMin: Infinity,
        fakeMultiSpaceMax: -0,
        textRunBreakAllowed: false,
        transform: null,
        fontName: null
      };
      var SPACE_FACTOR = 0.3;
      var MULTI_SPACE_FACTOR = 1.5;
      var MULTI_SPACE_FACTOR_MAX = 4;
      var self = this;
      var xref = this.xref;
      var xobjs = null;
      var emptyXObjectCache = new _image_utils.LocalImageCache();
      var emptyGStateCache = new _image_utils.LocalGStateCache();
      var preprocessor = new EvaluatorPreprocessor(stream, xref, stateManager);
      var textState;

      function ensureTextContentItem() {
        if (textContentItem.initialized) {
          return textContentItem;
        }

        var font = textState.font;

        if (!(font.loadedName in seenStyles)) {
          seenStyles[font.loadedName] = true;
          textContent.styles[font.loadedName] = {
            fontFamily: font.fallbackName,
            ascent: font.ascent,
            descent: font.descent,
            vertical: font.vertical
          };
        }

        textContentItem.fontName = font.loadedName;
        var tsm = [textState.fontSize * textState.textHScale, 0, 0, textState.fontSize, 0, textState.textRise];

        if (font.isType3Font && textState.fontSize <= 1 && !(0, _util_metapdf.isArrayEqual)(textState.fontMatrix, _util_metapdf.FONT_IDENTITY_MATRIX)) {
          var glyphHeight = font.bbox[3] - font.bbox[1];

          if (glyphHeight > 0) {
            tsm[3] *= glyphHeight * textState.fontMatrix[3];
          }
        }

        var trm = _util_metapdf.Util.transform(textState.ctm, _util_metapdf.Util.transform(textState.textMatrix, tsm));

        textContentItem.transform = trm;

        if (!font.vertical) {
          textContentItem.width = 0;
          textContentItem.height = Math.sqrt(trm[2] * trm[2] + trm[3] * trm[3]);
          textContentItem.vertical = false;
        } else {
          textContentItem.width = Math.sqrt(trm[0] * trm[0] + trm[1] * trm[1]);
          textContentItem.height = 0;
          textContentItem.vertical = true;
        }

        var a = textState.textLineMatrix[0];
        var b = textState.textLineMatrix[1];
        var scaleLineX = Math.sqrt(a * a + b * b);
        a = textState.ctm[0];
        b = textState.ctm[1];
        var scaleCtmX = Math.sqrt(a * a + b * b);
        textContentItem.textAdvanceScale = scaleCtmX * scaleLineX;
        textContentItem.lastAdvanceWidth = 0;
        textContentItem.lastAdvanceHeight = 0;
        var spaceWidth = font.spaceWidth / 1000 * textState.fontSize;

        if (spaceWidth) {
          textContentItem.spaceWidth = spaceWidth;
          textContentItem.fakeSpaceMin = spaceWidth * SPACE_FACTOR;
          textContentItem.fakeMultiSpaceMin = spaceWidth * MULTI_SPACE_FACTOR;
          textContentItem.fakeMultiSpaceMax = spaceWidth * MULTI_SPACE_FACTOR_MAX;
          textContentItem.textRunBreakAllowed = !font.isMonospace;
        } else {
          textContentItem.spaceWidth = 0;
          textContentItem.fakeSpaceMin = Infinity;
          textContentItem.fakeMultiSpaceMin = Infinity;
          textContentItem.fakeMultiSpaceMax = 0;
          textContentItem.textRunBreakAllowed = false;
        }

        textContentItem.initialized = true;
        return textContentItem;
      }

      function replaceWhitespace(str) {
        var i = 0,
            ii = str.length,
            code;

        while (i < ii && (code = str.charCodeAt(i)) >= 0x20 && code <= 0x7f) {
          i++;
        }

        return i < ii ? str.replace(WhitespaceRegexp, " ") : str;
      }

      function runBidiTransform(textChunk) {
        var str = textChunk.str.join("");
        var bidiResult = (0, _bidi.bidi)(str, -1, textChunk.vertical);
        return {
          str: normalizeWhitespace ? replaceWhitespace(bidiResult.str) : bidiResult.str,
          dir: bidiResult.dir,
          width: textChunk.width,
          height: textChunk.height,
          transform: textChunk.transform,
          fontName: textChunk.fontName
        };
      }

      function handleSetFont(fontName, fontRef) {
        return self.loadFont(fontName, fontRef, resources).then(function (translated) {
          textState.font = translated.font;
          textState.fontMatrix = translated.font.fontMatrix || _util_metapdf.FONT_IDENTITY_MATRIX;
        });
      }

      function buildTextContentItem(chars) {
        var font = textState.font;
        var textChunk = ensureTextContentItem();
        var width = 0;
        var height = 0;
        var glyphs = font.charsToGlyphs(chars);
        var defaultVMetrics = font.defaultVMetrics;
        var glyphWidths = [];

        for (var i = 0; i < glyphs.length; i++) {
          var glyph = glyphs[i];
          var glyphWidth = null;
          var fakeSpacesAdded = 0;

          if (font.vertical) {
            if (glyph.vmetric) {
              glyphWidth = glyph.vmetric[0];
              vMetricX = glyph.vmetric[1];
              vMetricY = glyph.vmetric[2];
            } else {
              glyphWidth = glyph.width;
              vMetricX = glyph.width * 0.5;
              vMetricY = defaultVMetrics[2];
            }
          } else {
            glyphWidth = glyph.width;
          }

          var glyphUnicode = glyph.unicode;
          var NormalizedUnicodes = (0, _unicode.getNormalizedUnicodes)();

          if (NormalizedUnicodes[glyphUnicode] !== undefined) {
            glyphUnicode = NormalizedUnicodes[glyphUnicode];
          }

          glyphUnicode = (0, _unicode.reverseIfRtl)(glyphUnicode);
          var charSpacing = textState.charSpacing;

          if (glyph.isSpace) {
            var wordSpacing = textState.wordSpacing;
            charSpacing += wordSpacing;

            if (wordSpacing > 0) {
              fakeSpacesAdded = addFakeSpaces(wordSpacing, textChunk.str);
            }
          }

          var glyphUnicode = glyph.unicode;
          var NormalizedUnicodes = (0, _unicode.getNormalizedUnicodes)();

          if (NormalizedUnicodes[glyphUnicode] !== undefined) {
            glyphUnicode = NormalizedUnicodes[glyphUnicode];
          }

          glyphUnicode = (0, _unicode.reverseIfRtl)(glyphUnicode);
          var charSpacing = textState.charSpacing;

          if (glyph.isSpace) {
            var wordSpacing = textState.wordSpacing;
            charSpacing += wordSpacing;

            if (wordSpacing > 0) {
              addFakeSpaces(wordSpacing, textChunk.str);
            }

            textState.translateTextMatrix(tx, ty);

            if (fakeSpacesAdded > 0) {
              for (var ii = 0; ii <= fakeSpacesAdded; ii++) {
                glyphWidths.push(tx / (fakeSpacesAdded + 1));
              }
            } else {
              glyphWidths.push(tx);
            }

            textChunk.str.push(glyphUnicode);
          }

          var tx = 0;
          var ty = 0;

          if (!font.vertical) {
            var w0 = glyphWidth * textState.fontMatrix[0];
            tx = (w0 * textState.fontSize + charSpacing) * textState.textHScale;
            width += tx;
          } else {
            var w1 = glyphWidth * textState.fontMatrix[0];
            ty = w1 * textState.fontSize + charSpacing;
            height += ty;
          }

          textChunk.glyphWidths = textChunk.glyphWidths.concat(glyphWidths);
          textState.translateTextMatrix(tx, ty);
          textChunk.str.push(glyphUnicode);
        }

        if (!font.vertical) {
          textChunk.lastAdvanceWidth = width;
          textChunk.width += width;
        } else {
          textChunk.lastAdvanceHeight = height;
          textChunk.height += Math.abs(height);
        }

        return textChunk;
      }

      function addFakeSpaces(width, strBuf) {
        var fS = 0;

        if (width < textContentItem.fakeSpaceMin) {
          return fS;
        }

        if (width < textContentItem.fakeMultiSpaceMin) {
          strBuf.push(' ');
          fS++;
          return fS;
        }

        var fakeSpaces = Math.round(width / textContentItem.spaceWidth);

        while (fakeSpaces-- > 0) {
          fS++;
          strBuf.push(' ');
        }

        return fS;
      }

      function flushTextContentItem() {
        if (!textContentItem.initialized) {
          return;
        }

        if (!textContentItem.vertical) {
          textContentItem.width *= textContentItem.textAdvanceScale;
        } else {
          textContentItem.height *= textContentItem.textAdvanceScale;
        }

        textContent.items.push(runBidiTransform(textContentItem));
        textContentItem.initialized = false;
        textContentItem.str.length = 0;
        textContentItem.glyphWidths.length = 0;
      }

      function enqueueChunk() {
        var length = textContent.items.length;

        if (length > 0) {
          sink.enqueue(textContent, length);
          textContent.items = [];
          textContent.styles = Object.create(null);
        }
      }

      var timeSlotManager = new TimeSlotManager();
      return new Promise(function promiseBody(resolve, reject) {
        var next = function next(promise) {
          enqueueChunk();
          Promise.all([promise, sink.ready]).then(function () {
            try {
              promiseBody(resolve, reject);
            } catch (ex) {
              reject(ex);
            }
          }, reject);
        };

        task.ensureNotTerminated();
        timeSlotManager.reset();
        var stop,
            operation = {},
            args = [];

        while (!(stop = timeSlotManager.check())) {
          args.length = 0;
          operation.args = args;

          if (!preprocessor.read(operation)) {
            break;
          }

          textState = stateManager.state;
          var fn = operation.fn;
          args = operation.args;
          var advance, diff;

          switch (fn | 0) {
            case _util_metapdf.OPS.setFont:
              var fontNameArg = args[0].name,
                  fontSizeArg = args[1];

              if (textState.font && fontNameArg === textState.fontName && fontSizeArg === textState.fontSize) {
                break;
              }

              flushTextContentItem();
              textState.fontName = fontNameArg;
              textState.fontSize = fontSizeArg;
              next(handleSetFont(fontNameArg, null));
              return;

            case _util_metapdf.OPS.setTextRise:
              flushTextContentItem();
              textState.textRise = args[0];
              break;

            case _util_metapdf.OPS.setHScale:
              flushTextContentItem();
              textState.textHScale = args[0] / 100;
              break;

            case _util_metapdf.OPS.setLeading:
              flushTextContentItem();
              textState.leading = args[0];
              break;

            case _util_metapdf.OPS.moveText:
              var isSameTextLine = !textState.font ? false : (textState.font.vertical ? args[0] : args[1]) === 0;
              advance = args[0] - args[1];

              if (combineTextItems && isSameTextLine && textContentItem.initialized && advance > 0 && advance <= textContentItem.fakeMultiSpaceMax) {
                textState.translateTextLineMatrix(args[0], args[1]);
                textContentItem.width += args[0] - textContentItem.lastAdvanceWidth;
                textContentItem.height += args[1] - textContentItem.lastAdvanceHeight;
                diff = args[0] - textContentItem.lastAdvanceWidth - (args[1] - textContentItem.lastAdvanceHeight);
                addFakeSpaces(diff, textContentItem.str);
                break;
              }

              flushTextContentItem();
              textState.translateTextLineMatrix(args[0], args[1]);
              textState.textMatrix = textState.textLineMatrix.slice();
              break;

            case _util_metapdf.OPS.setLeadingMoveText:
              flushTextContentItem();
              textState.leading = -args[1];
              textState.translateTextLineMatrix(args[0], args[1]);
              textState.textMatrix = textState.textLineMatrix.slice();
              break;

            case _util_metapdf.OPS.nextLine:
              flushTextContentItem();
              textState.carriageReturn();
              break;

            case _util_metapdf.OPS.setTextMatrix:
              advance = textState.calcTextLineMatrixAdvance(args[0], args[1], args[2], args[3], args[4], args[5]);

              if (combineTextItems && advance !== null && textContentItem.initialized && advance.value > 0 && advance.value <= textContentItem.fakeMultiSpaceMax) {
                textState.translateTextLineMatrix(advance.width, advance.height);
                textContentItem.width += advance.width - textContentItem.lastAdvanceWidth;
                textContentItem.height += advance.height - textContentItem.lastAdvanceHeight;
                diff = advance.width - textContentItem.lastAdvanceWidth - (advance.height - textContentItem.lastAdvanceHeight);
                addFakeSpaces(diff, textContentItem.str);
                break;
              }

              flushTextContentItem();
              textState.setTextMatrix(args[0], args[1], args[2], args[3], args[4], args[5]);
              textState.setTextLineMatrix(args[0], args[1], args[2], args[3], args[4], args[5]);
              break;

            case _util_metapdf.OPS.setCharSpacing:
              textState.charSpacing = args[0];
              break;

            case _util_metapdf.OPS.setWordSpacing:
              textState.wordSpacing = args[0];
              break;

            case _util_metapdf.OPS.beginText:
              flushTextContentItem();
              textState.textMatrix = _util_metapdf.IDENTITY_MATRIX.slice();
              textState.textLineMatrix = _util_metapdf.IDENTITY_MATRIX.slice();
              break;

            case _util_metapdf.OPS.showSpacedText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              var items = args[0];
              var offset;

              for (var j = 0, jj = items.length; j < jj; j++) {
                if (typeof items[j] === "string") {
                  buildTextContentItem(items[j]);
                } else if ((0, _util_metapdf.isNum)(items[j])) {
                  ensureTextContentItem();
                  advance = items[j] * textState.fontSize / 1000;
                  var breakTextRun = false;

                  if (textState.font.vertical) {
                    offset = advance;
                    textState.translateTextMatrix(0, offset);
                    breakTextRun = textContentItem.textRunBreakAllowed && advance > textContentItem.fakeMultiSpaceMax;

                    if (!breakTextRun) {
                      textContentItem.height += offset;
                    }
                  } else {
                    advance = -advance;
                    offset = advance * textState.textHScale;
                    textState.translateTextMatrix(offset, 0);
                    breakTextRun = textContentItem.textRunBreakAllowed && advance > textContentItem.fakeMultiSpaceMax;

                    if (!breakTextRun) {
                      textContentItem.width += offset;
                    }
                  }

                  if (breakTextRun) {
                    flushTextContentItem();
                  } else if (advance > 0) {
                    addFakeSpaces(advance, textContentItem.str);
                  }
                }
              }

              break;

            case _util_metapdf.OPS.showText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              buildTextContentItem(args[0]);
              break;

            case _util_metapdf.OPS.nextLineShowText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              flushTextContentItem();
              textState.carriageReturn();
              buildTextContentItem(args[0]);
              break;

            case _util_metapdf.OPS.nextLineSetSpacingShowText:
              if (!stateManager.state.font) {
                self.ensureStateFont(stateManager.state);
                continue;
              }

              flushTextContentItem();
              textState.wordSpacing = args[0];
              textState.charSpacing = args[1];
              textState.carriageReturn();
              buildTextContentItem(args[2]);
              break;

            case _util_metapdf.OPS.paintXObject:
              flushTextContentItem();

              if (!xobjs) {
                xobjs = resources.get("XObject") || _primitives.Dict.empty;
              }

              var name = args[0].name;

              if (name && emptyXObjectCache.getByName(name)) {
                break;
              }

              next(new Promise(function (resolveXObject, rejectXObject) {
                if (!name) {
                  throw new _util_metapdf.FormatError("XObject must be referred to by name.");
                }

                var xobj = xobjs.getRaw(name);

                if (xobj instanceof _primitives.Ref) {
                  if (emptyXObjectCache.getByRef(xobj)) {
                    resolveXObject();
                    return;
                  }

                  xobj = xref.fetch(xobj);
                }

                if (!(0, _primitives.isStream)(xobj)) {
                  throw new _util_metapdf.FormatError("XObject should be a stream");
                }

                var type = xobj.dict.get("Subtype");

                if (!(0, _primitives.isName)(type)) {
                  throw new _util_metapdf.FormatError("XObject should have a Name subtype");
                }

                if (type.name !== "Form") {
                  emptyXObjectCache.set(name, xobj.dict.objId, true);
                  resolveXObject();
                  return;
                }

                var currentState = stateManager.state.clone();
                var xObjStateManager = new StateManager(currentState);
                var matrix = xobj.dict.getArray("Matrix");

                if (Array.isArray(matrix) && matrix.length === 6) {
                  xObjStateManager.transform(matrix);
                }

                enqueueChunk();
                var sinkWrapper = {
                  enqueueInvoked: false,
                  enqueue: function enqueue(chunk, size) {
                    this.enqueueInvoked = true;
                    sink.enqueue(chunk, size);
                  },

                  get desiredSize() {
                    return sink.desiredSize;
                  },

                  get ready() {
                    return sink.ready;
                  }

                };
                self.getTextContent({
                  stream: xobj,
                  task: task,
                  resources: xobj.dict.get("Resources") || resources,
                  stateManager: xObjStateManager,
                  normalizeWhitespace: normalizeWhitespace,
                  combineTextItems: combineTextItems,
                  sink: sinkWrapper,
                  seenStyles: seenStyles
                }).then(function () {
                  if (!sinkWrapper.enqueueInvoked) {
                    emptyXObjectCache.set(name, xobj.dict.objId, true);
                  }

                  resolveXObject();
                }, rejectXObject);
              })["catch"](function (reason) {
                if (reason instanceof _util_metapdf.AbortException) {
                  return;
                }

                if (self.options.ignoreErrors) {
                  (0, _util_metapdf.warn)("getTextContent - ignoring XObject: \"".concat(reason, "\"."));
                  return;
                }

                throw reason;
              }));
              return;

            case _util_metapdf.OPS.setGState:
              name = args[0].name;

              if (name && emptyGStateCache.getByName(name)) {
                break;
              }

              next(new Promise(function (resolveGState, rejectGState) {
                if (!name) {
                  throw new _util_metapdf.FormatError("GState must be referred to by name.");
                }

                var extGState = resources.get("ExtGState");

                if (!(extGState instanceof _primitives.Dict)) {
                  throw new _util_metapdf.FormatError("ExtGState should be a dictionary.");
                }

                var gState = extGState.get(name);

                if (!(gState instanceof _primitives.Dict)) {
                  throw new _util_metapdf.FormatError("GState should be a dictionary.");
                }

                var gStateFont = gState.get("Font");

                if (!gStateFont) {
                  emptyGStateCache.set(name, gState.objId, true);
                  resolveGState();
                  return;
                }

                flushTextContentItem();
                textState.fontName = null;
                textState.fontSize = gStateFont[1];
                handleSetFont(null, gStateFont[0]).then(resolveGState, rejectGState);
              })["catch"](function (reason) {
                if (reason instanceof _util_metapdf.AbortException) {
                  return;
                }

                if (self.options.ignoreErrors) {
                  (0, _util_metapdf.warn)("getTextContent - ignoring ExtGState: \"".concat(reason, "\"."));
                  return;
                }

                throw reason;
              }));
              return;
          }

          if (textContent.items.length >= sink.desiredSize) {
            stop = true;
            break;
          }
        }

        if (stop) {
          next(deferred);
          return;
        }

        flushTextContentItem();
        enqueueChunk();
        resolve();
      })["catch"](function (reason) {
        if (reason instanceof _util_metapdf.AbortException) {
          return;
        }

        if (_this8.options.ignoreErrors) {
          (0, _util_metapdf.warn)("getTextContent - ignoring errors during \"".concat(task.name, "\" ") + "task: \"".concat(reason, "\"."));
          flushTextContentItem();
          enqueueChunk();
          return;
        }

        throw reason;
      });
    }
  }, {
    key: "extractDataStructures",
    value: function extractDataStructures(dict, baseDict, properties) {
      var _this9 = this;

      var xref = this.xref;
      var cidToGidBytes;
      var toUnicode = dict.get("ToUnicode") || baseDict.get("ToUnicode");
      var toUnicodePromise = toUnicode ? this.readToUnicode(toUnicode) : Promise.resolve(undefined);

      if (properties.composite) {
        var cidSystemInfo = dict.get("CIDSystemInfo");

        if ((0, _primitives.isDict)(cidSystemInfo)) {
          properties.cidSystemInfo = {
            registry: (0, _util_metapdf.stringToPDFString)(cidSystemInfo.get("Registry")),
            ordering: (0, _util_metapdf.stringToPDFString)(cidSystemInfo.get("Ordering")),
            supplement: cidSystemInfo.get("Supplement")
          };
        }

        var cidToGidMap = dict.get("CIDToGIDMap");

        if ((0, _primitives.isStream)(cidToGidMap)) {
          cidToGidBytes = cidToGidMap.getBytes();
        }
      }

      var differences = [];
      var baseEncodingName = null;
      var encoding;

      if (dict.has("Encoding")) {
        encoding = dict.get("Encoding");

        if ((0, _primitives.isDict)(encoding)) {
          baseEncodingName = encoding.get("BaseEncoding");
          baseEncodingName = (0, _primitives.isName)(baseEncodingName) ? baseEncodingName.name : null;

          if (encoding.has("Differences")) {
            var diffEncoding = encoding.get("Differences");
            var index = 0;

            for (var j = 0, jj = diffEncoding.length; j < jj; j++) {
              var data = xref.fetchIfRef(diffEncoding[j]);

              if ((0, _util_metapdf.isNum)(data)) {
                index = data;
              } else if ((0, _primitives.isName)(data)) {
                differences[index++] = data.name;
              } else {
                throw new _util_metapdf.FormatError("Invalid entry in 'Differences' array: ".concat(data));
              }
            }
          }
        } else if ((0, _primitives.isName)(encoding)) {
          baseEncodingName = encoding.name;
        } else {
          throw new _util_metapdf.FormatError("Encoding is not a Name nor a Dict");
        }

        if (baseEncodingName !== "MacRomanEncoding" && baseEncodingName !== "MacExpertEncoding" && baseEncodingName !== "WinAnsiEncoding") {
          baseEncodingName = null;
        }
      }

      if (baseEncodingName) {
        properties.defaultEncoding = (0, _encodings.getEncoding)(baseEncodingName).slice();
      } else {
        var isSymbolicFont = !!(properties.flags & _fonts.FontFlags.Symbolic);
        var isNonsymbolicFont = !!(properties.flags & _fonts.FontFlags.Nonsymbolic);
        encoding = _encodings.StandardEncoding;

        if (properties.type === "TrueType" && !isNonsymbolicFont) {
          encoding = _encodings.WinAnsiEncoding;
        }

        if (isSymbolicFont) {
          encoding = _encodings.MacRomanEncoding;

          if (!properties.file) {
            if (/Symbol/i.test(properties.name)) {
              encoding = _encodings.SymbolSetEncoding;
            } else if (/Dingbats|Wingdings/i.test(properties.name)) {
              encoding = _encodings.ZapfDingbatsEncoding;
            }
          }
        }

        properties.defaultEncoding = encoding;
      }

      properties.differences = differences;
      properties.baseEncodingName = baseEncodingName;
      properties.hasEncoding = !!baseEncodingName || differences.length > 0;
      properties.dict = dict;
      return toUnicodePromise.then(function (readToUnicode) {
        properties.toUnicode = readToUnicode;
        return _this9.buildToUnicode(properties);
      }).then(function (builtToUnicode) {
        properties.toUnicode = builtToUnicode;

        if (cidToGidBytes) {
          properties.cidToGidMap = _this9.readCidToGidMap(cidToGidBytes, builtToUnicode);
        }

        return properties;
      });
    }
  }, {
    key: "_buildSimpleFontToUnicode",
    value: function _buildSimpleFontToUnicode(properties) {
      var forceGlyphs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      (0, _util_metapdf.assert)(!properties.composite, "Must be a simple font.");
      var toUnicode = [];
      var encoding = properties.defaultEncoding.slice();
      var baseEncodingName = properties.baseEncodingName;
      var differences = properties.differences;

      for (var charcode in differences) {
        var glyphName = differences[charcode];

        if (glyphName === ".notdef") {
          continue;
        }

        encoding[charcode] = glyphName;
      }

      var glyphsUnicodeMap = (0, _glyphlist.getGlyphsUnicode)();

      for (var _charcode in encoding) {
        var _glyphName = encoding[_charcode];

        if (_glyphName === "") {
          continue;
        } else if (glyphsUnicodeMap[_glyphName] === undefined) {
          var code = 0;

          switch (_glyphName[0]) {
            case "G":
              if (_glyphName.length === 3) {
                code = parseInt(_glyphName.substring(1), 16);
              }

              break;

            case "g":
              if (_glyphName.length === 5) {
                code = parseInt(_glyphName.substring(1), 16);
              }

              break;

            case "C":
            case "c":
              if (_glyphName.length >= 3 && _glyphName.length <= 4) {
                var codeStr = _glyphName.substring(1);

                if (forceGlyphs) {
                  code = parseInt(codeStr, 16);
                  break;
                }

                code = +codeStr;

                if (Number.isNaN(code) && Number.isInteger(parseInt(codeStr, 16))) {
                  return this._buildSimpleFontToUnicode(properties, true);
                }
              }

              break;

            default:
              var unicode = (0, _unicode.getUnicodeForGlyph)(_glyphName, glyphsUnicodeMap);

              if (unicode !== -1) {
                code = unicode;
              }

          }

          if (code > 0 && code <= 0x10ffff && Number.isInteger(code)) {
            if (baseEncodingName && code === +_charcode) {
              var baseEncoding = (0, _encodings.getEncoding)(baseEncodingName);

              if (baseEncoding && (_glyphName = baseEncoding[_charcode])) {
                toUnicode[_charcode] = String.fromCharCode(glyphsUnicodeMap[_glyphName]);
                continue;
              }
            }

            toUnicode[_charcode] = String.fromCodePoint(code);
          }

          continue;
        }

        toUnicode[_charcode] = String.fromCharCode(glyphsUnicodeMap[_glyphName]);
      }

      return new _fonts.ToUnicodeMap(toUnicode);
    }
  }, {
    key: "buildToUnicode",
    value: function buildToUnicode(properties) {
      properties.hasIncludedToUnicodeMap = !!properties.toUnicode && properties.toUnicode.length > 0;

      if (properties.hasIncludedToUnicodeMap) {
        if (!properties.composite && properties.hasEncoding) {
          properties.fallbackToUnicode = this._buildSimpleFontToUnicode(properties);
        }

        return Promise.resolve(properties.toUnicode);
      }

      if (!properties.composite) {
        return Promise.resolve(this._buildSimpleFontToUnicode(properties));
      }

      if (properties.composite && (properties.cMap.builtInCMap && !(properties.cMap instanceof _cmap.IdentityCMap) || properties.cidSystemInfo.registry === "Adobe" && (properties.cidSystemInfo.ordering === "GB1" || properties.cidSystemInfo.ordering === "CNS1" || properties.cidSystemInfo.ordering === "Japan1" || properties.cidSystemInfo.ordering === "Korea1"))) {
        var registry = properties.cidSystemInfo.registry;
        var ordering = properties.cidSystemInfo.ordering;

        var ucs2CMapName = _primitives.Name.get(registry + "-" + ordering + "-UCS2");

        return _cmap.CMapFactory.create({
          encoding: ucs2CMapName,
          fetchBuiltInCMap: this._fetchBuiltInCMapBound,
          useCMap: null
        }).then(function (ucs2CMap) {
          var cMap = properties.cMap;
          var toUnicode = [];
          cMap.forEach(function (charcode, cid) {
            if (cid > 0xffff) {
              throw new _util_metapdf.FormatError("Max size of CID is 65,535");
            }

            var ucs2 = ucs2CMap.lookup(cid);

            if (ucs2) {
              toUnicode[charcode] = String.fromCharCode((ucs2.charCodeAt(0) << 8) + ucs2.charCodeAt(1));
            }
          });
          return new _fonts.ToUnicodeMap(toUnicode);
        });
      }

      return Promise.resolve(new _fonts.IdentityToUnicodeMap(properties.firstChar, properties.lastChar));
    }
  }, {
    key: "readToUnicode",
    value: function readToUnicode(toUnicode) {
      var _this10 = this;

      var cmapObj = toUnicode;

      if ((0, _primitives.isName)(cmapObj)) {
        return _cmap.CMapFactory.create({
          encoding: cmapObj,
          fetchBuiltInCMap: this._fetchBuiltInCMapBound,
          useCMap: null
        }).then(function (cmap) {
          if (cmap instanceof _cmap.IdentityCMap) {
            return new _fonts.IdentityToUnicodeMap(0, 0xffff);
          }

          return new _fonts.ToUnicodeMap(cmap.getMap());
        });
      } else if ((0, _primitives.isStream)(cmapObj)) {
        return _cmap.CMapFactory.create({
          encoding: cmapObj,
          fetchBuiltInCMap: this._fetchBuiltInCMapBound,
          useCMap: null
        }).then(function (cmap) {
          if (cmap instanceof _cmap.IdentityCMap) {
            return new _fonts.IdentityToUnicodeMap(0, 0xffff);
          }

          var map = new Array(cmap.length);
          cmap.forEach(function (charCode, token) {
            var str = [];

            for (var k = 0; k < token.length; k += 2) {
              var w1 = token.charCodeAt(k) << 8 | token.charCodeAt(k + 1);

              if ((w1 & 0xf800) !== 0xd800) {
                str.push(w1);
                continue;
              }

              k += 2;
              var w2 = token.charCodeAt(k) << 8 | token.charCodeAt(k + 1);
              str.push(((w1 & 0x3ff) << 10) + (w2 & 0x3ff) + 0x10000);
            }

            map[charCode] = String.fromCodePoint.apply(String, str);
          });
          return new _fonts.ToUnicodeMap(map);
        }, function (reason) {
          if (reason instanceof _util_metapdf.AbortException) {
            return null;
          }

          if (_this10.options.ignoreErrors) {
            _this10.handler.send("UnsupportedFeature", {
              featureId: _util_metapdf.UNSUPPORTED_FEATURES.errorFontToUnicode
            });

            (0, _util_metapdf.warn)("readToUnicode - ignoring ToUnicode data: \"".concat(reason, "\"."));
            return null;
          }

          throw reason;
        });
      }

      return Promise.resolve(null);
    }
  }, {
    key: "readCidToGidMap",
    value: function readCidToGidMap(glyphsData, toUnicode) {
      var result = [];

      for (var j = 0, jj = glyphsData.length; j < jj; j++) {
        var glyphID = glyphsData[j++] << 8 | glyphsData[j];
        var code = j >> 1;

        if (glyphID === 0 && !toUnicode.has(code)) {
          continue;
        }

        result[code] = glyphID;
      }

      return result;
    }
  }, {
    key: "extractWidths",
    value: function extractWidths(dict, descriptor, properties) {
      var xref = this.xref;
      var glyphsWidths = [];
      var defaultWidth = 0;
      var glyphsVMetrics = [];
      var defaultVMetrics;
      var i, ii, j, jj, start, code, widths;

      if (properties.composite) {
        defaultWidth = dict.has("DW") ? dict.get("DW") : 1000;
        widths = dict.get("W");

        if (widths) {
          for (i = 0, ii = widths.length; i < ii; i++) {
            start = xref.fetchIfRef(widths[i++]);
            code = xref.fetchIfRef(widths[i]);

            if (Array.isArray(code)) {
              for (j = 0, jj = code.length; j < jj; j++) {
                glyphsWidths[start++] = xref.fetchIfRef(code[j]);
              }
            } else {
              var width = xref.fetchIfRef(widths[++i]);

              for (j = start; j <= code; j++) {
                glyphsWidths[j] = width;
              }
            }
          }
        }

        if (properties.vertical) {
          var vmetrics = dict.getArray("DW2") || [880, -1000];
          defaultVMetrics = [vmetrics[1], defaultWidth * 0.5, vmetrics[0]];
          vmetrics = dict.get("W2");

          if (vmetrics) {
            for (i = 0, ii = vmetrics.length; i < ii; i++) {
              start = xref.fetchIfRef(vmetrics[i++]);
              code = xref.fetchIfRef(vmetrics[i]);

              if (Array.isArray(code)) {
                for (j = 0, jj = code.length; j < jj; j++) {
                  glyphsVMetrics[start++] = [xref.fetchIfRef(code[j++]), xref.fetchIfRef(code[j++]), xref.fetchIfRef(code[j])];
                }
              } else {
                var vmetric = [xref.fetchIfRef(vmetrics[++i]), xref.fetchIfRef(vmetrics[++i]), xref.fetchIfRef(vmetrics[++i])];

                for (j = start; j <= code; j++) {
                  glyphsVMetrics[j] = vmetric;
                }
              }
            }
          }
        }
      } else {
        var firstChar = properties.firstChar;
        widths = dict.get("Widths");

        if (widths) {
          j = firstChar;

          for (i = 0, ii = widths.length; i < ii; i++) {
            glyphsWidths[j++] = xref.fetchIfRef(widths[i]);
          }

          defaultWidth = parseFloat(descriptor.get("MissingWidth")) || 0;
        } else {
          var baseFontName = dict.get("BaseFont");

          if ((0, _primitives.isName)(baseFontName)) {
            var metrics = this.getBaseFontMetrics(baseFontName.name);
            glyphsWidths = this.buildCharCodeToWidth(metrics.widths, properties);
            defaultWidth = metrics.defaultWidth;
          }
        }
      }

      var isMonospace = true;
      var firstWidth = defaultWidth;

      for (var glyph in glyphsWidths) {
        var glyphWidth = glyphsWidths[glyph];

        if (!glyphWidth) {
          continue;
        }

        if (!firstWidth) {
          firstWidth = glyphWidth;
          continue;
        }

        if (firstWidth !== glyphWidth) {
          isMonospace = false;
          break;
        }
      }

      if (isMonospace) {
        properties.flags |= _fonts.FontFlags.FixedPitch;
      }

      properties.defaultWidth = defaultWidth;
      properties.widths = glyphsWidths;
      properties.defaultVMetrics = defaultVMetrics;
      properties.vmetrics = glyphsVMetrics;
    }
  }, {
    key: "isSerifFont",
    value: function isSerifFont(baseFontName) {
      var fontNameWoStyle = baseFontName.split("-")[0];
      return fontNameWoStyle in (0, _standard_fonts.getSerifFonts)() || fontNameWoStyle.search(/serif/gi) !== -1;
    }
  }, {
    key: "getBaseFontMetrics",
    value: function getBaseFontMetrics(name) {
      var defaultWidth = 0;
      var widths = [];
      var monospace = false;
      var stdFontMap = (0, _standard_fonts.getStdFontMap)();
      var lookupName = stdFontMap[name] || name;
      var Metrics = (0, _metrics.getMetrics)();

      if (!(lookupName in Metrics)) {
        if (this.isSerifFont(name)) {
          lookupName = "Times-Roman";
        } else {
          lookupName = "Helvetica";
        }
      }

      var glyphWidths = Metrics[lookupName];

      if ((0, _util_metapdf.isNum)(glyphWidths)) {
        defaultWidth = glyphWidths;
        monospace = true;
      } else {
        widths = glyphWidths();
      }

      return {
        defaultWidth: defaultWidth,
        monospace: monospace,
        widths: widths
      };
    }
  }, {
    key: "buildCharCodeToWidth",
    value: function buildCharCodeToWidth(widthsByGlyphName, properties) {
      var widths = Object.create(null);
      var differences = properties.differences;
      var encoding = properties.defaultEncoding;

      for (var charCode = 0; charCode < 256; charCode++) {
        if (charCode in differences && widthsByGlyphName[differences[charCode]]) {
          widths[charCode] = widthsByGlyphName[differences[charCode]];
          continue;
        }

        if (charCode in encoding && widthsByGlyphName[encoding[charCode]]) {
          widths[charCode] = widthsByGlyphName[encoding[charCode]];
          continue;
        }
      }

      return widths;
    }
  }, {
    key: "preEvaluateFont",
    value: function preEvaluateFont(dict) {
      var baseDict = dict;
      var type = dict.get("Subtype");

      if (!(0, _primitives.isName)(type)) {
        throw new _util_metapdf.FormatError("invalid font Subtype");
      }

      var composite = false;
      var uint8array;

      if (type.name === "Type0") {
        var df = dict.get("DescendantFonts");

        if (!df) {
          throw new _util_metapdf.FormatError("Descendant fonts are not specified");
        }

        dict = Array.isArray(df) ? this.xref.fetchIfRef(df[0]) : df;
        type = dict.get("Subtype");

        if (!(0, _primitives.isName)(type)) {
          throw new _util_metapdf.FormatError("invalid font Subtype");
        }

        composite = true;
      }

      var descriptor = dict.get("FontDescriptor");

      if (descriptor) {
        var hash = new _murmurhash.MurmurHash3_64();
        var encoding = baseDict.getRaw("Encoding");

        if ((0, _primitives.isName)(encoding)) {
          hash.update(encoding.name);
        } else if ((0, _primitives.isRef)(encoding)) {
          hash.update(encoding.toString());
        } else if ((0, _primitives.isDict)(encoding)) {
          var _iterator5 = _createForOfIteratorHelper(encoding.getRawValues()),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var entry = _step5.value;

              if ((0, _primitives.isName)(entry)) {
                hash.update(entry.name);
              } else if ((0, _primitives.isRef)(entry)) {
                hash.update(entry.toString());
              } else if (Array.isArray(entry)) {
                var diffLength = entry.length,
                    diffBuf = new Array(diffLength);

                for (var j = 0; j < diffLength; j++) {
                  var diffEntry = entry[j];

                  if ((0, _primitives.isName)(diffEntry)) {
                    diffBuf[j] = diffEntry.name;
                  } else if ((0, _util_metapdf.isNum)(diffEntry) || (0, _primitives.isRef)(diffEntry)) {
                    diffBuf[j] = diffEntry.toString();
                  }
                }

                hash.update(diffBuf.join());
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }

        var firstChar = dict.get("FirstChar") || 0;
        var lastChar = dict.get("LastChar") || (composite ? 0xffff : 0xff);
        hash.update("".concat(firstChar, "-").concat(lastChar));
        var toUnicode = dict.get("ToUnicode") || baseDict.get("ToUnicode");

        if ((0, _primitives.isStream)(toUnicode)) {
          var stream = toUnicode.str || toUnicode;
          uint8array = stream.buffer ? new Uint8Array(stream.buffer.buffer, 0, stream.bufferLength) : new Uint8Array(stream.bytes.buffer, stream.start, stream.end - stream.start);
          hash.update(uint8array);
        } else if ((0, _primitives.isName)(toUnicode)) {
          hash.update(toUnicode.name);
        }

        var widths = dict.get("Widths") || baseDict.get("Widths");

        if (widths) {
          uint8array = new Uint8Array(new Uint32Array(widths).buffer);
          hash.update(uint8array);
        }
      }

      return {
        descriptor: descriptor,
        dict: dict,
        baseDict: baseDict,
        composite: composite,
        type: type.name,
        hash: hash ? hash.hexdigest() : ""
      };
    }
  }, {
    key: "translateFont",
    value: function () {
      var _translateFont = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7(preEvaluatedFont) {
        var _this11 = this;

        var baseDict, dict, composite, descriptor, type, maxCharIndex, properties, firstChar, lastChar, baseFontName, metrics, fontNameWoStyle, flags, widths, fontName, baseFont, fontNameStr, baseFontStr, fontFile, subtype, length1, length2, length3, cidEncoding, cMap;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                baseDict = preEvaluatedFont.baseDict;
                dict = preEvaluatedFont.dict;
                composite = preEvaluatedFont.composite;
                descriptor = preEvaluatedFont.descriptor;
                type = preEvaluatedFont.type;
                maxCharIndex = composite ? 0xffff : 0xff;
                firstChar = dict.get("FirstChar") || 0;
                lastChar = dict.get("LastChar") || maxCharIndex;

                if (descriptor) {
                  _context7.next = 25;
                  break;
                }

                if (!(type === "Type3")) {
                  _context7.next = 15;
                  break;
                }

                descriptor = new _primitives.Dict(null);
                descriptor.set("FontName", _primitives.Name.get(type));
                descriptor.set("FontBBox", dict.getArray("FontBBox") || [0, 0, 0, 0]);
                _context7.next = 25;
                break;

              case 15:
                baseFontName = dict.get("BaseFont");

                if ((0, _primitives.isName)(baseFontName)) {
                  _context7.next = 18;
                  break;
                }

                throw new _util_metapdf.FormatError("Base font is not specified");

              case 18:
                baseFontName = baseFontName.name.replace(/[,_]/g, "-");
                metrics = this.getBaseFontMetrics(baseFontName);
                fontNameWoStyle = baseFontName.split("-")[0];
                flags = (this.isSerifFont(fontNameWoStyle) ? _fonts.FontFlags.Serif : 0) | (metrics.monospace ? _fonts.FontFlags.FixedPitch : 0) | ((0, _standard_fonts.getSymbolsFonts)()[fontNameWoStyle] ? _fonts.FontFlags.Symbolic : _fonts.FontFlags.Nonsymbolic);
                properties = {
                  type: type,
                  name: baseFontName,
                  widths: metrics.widths,
                  defaultWidth: metrics.defaultWidth,
                  flags: flags,
                  firstChar: firstChar,
                  lastChar: lastChar
                };
                widths = dict.get("Widths");
                return _context7.abrupt("return", this.extractDataStructures(dict, dict, properties).then(function (newProperties) {
                  if (widths) {
                    var glyphWidths = [];
                    var j = firstChar;

                    for (var _i = 0, ii = widths.length; _i < ii; _i++) {
                      glyphWidths[j++] = _this11.xref.fetchIfRef(widths[_i]);
                    }

                    newProperties.widths = glyphWidths;
                  } else {
                    newProperties.widths = _this11.buildCharCodeToWidth(metrics.widths, newProperties);
                  }

                  return new _fonts.Font(baseFontName, null, newProperties);
                }));

              case 25:
                fontName = descriptor.get("FontName");
                baseFont = dict.get("BaseFont");

                if ((0, _util_metapdf.isString)(fontName)) {
                  fontName = _primitives.Name.get(fontName);
                }

                if ((0, _util_metapdf.isString)(baseFont)) {
                  baseFont = _primitives.Name.get(baseFont);
                }

                if (type !== "Type3") {
                  fontNameStr = fontName && fontName.name;
                  baseFontStr = baseFont && baseFont.name;

                  if (fontNameStr !== baseFontStr) {
                    (0, _util_metapdf.info)("The FontDescriptor's FontName is \"".concat(fontNameStr, "\" but ") + "should be the same as the Font's BaseFont \"".concat(baseFontStr, "\"."));

                    if (fontNameStr && baseFontStr && baseFontStr.startsWith(fontNameStr)) {
                      fontName = baseFont;
                    }
                  }
                }

                fontName = fontName || baseFont;

                if ((0, _primitives.isName)(fontName)) {
                  _context7.next = 33;
                  break;
                }

                throw new _util_metapdf.FormatError("invalid font name");

              case 33:
                fontFile = descriptor.get("FontFile", "FontFile2", "FontFile3");

                if (fontFile) {
                  if (fontFile.dict) {
                    subtype = fontFile.dict.get("Subtype");

                    if (subtype) {
                      subtype = subtype.name;
                    }

                    length1 = fontFile.dict.get("Length1");
                    length2 = fontFile.dict.get("Length2");
                    length3 = fontFile.dict.get("Length3");
                  }
                }

                properties = {
                  type: type,
                  name: fontName.name,
                  subtype: subtype,
                  file: fontFile,
                  length1: length1,
                  length2: length2,
                  length3: length3,
                  loadedName: baseDict.loadedName,
                  composite: composite,
                  fixedPitch: false,
                  fontMatrix: dict.getArray("FontMatrix") || _util_metapdf.FONT_IDENTITY_MATRIX,
                  firstChar: firstChar || 0,
                  lastChar: lastChar || maxCharIndex,
                  bbox: descriptor.getArray("FontBBox"),
                  ascent: descriptor.get("Ascent"),
                  descent: descriptor.get("Descent"),
                  xHeight: descriptor.get("XHeight"),
                  capHeight: descriptor.get("CapHeight"),
                  flags: descriptor.get("Flags"),
                  italicAngle: descriptor.get("ItalicAngle"),
                  isType3Font: false
                };

                if (!composite) {
                  _context7.next = 44;
                  break;
                }

                cidEncoding = baseDict.get("Encoding");

                if ((0, _primitives.isName)(cidEncoding)) {
                  properties.cidEncoding = cidEncoding.name;
                }

                _context7.next = 41;
                return _cmap.CMapFactory.create({
                  encoding: cidEncoding,
                  fetchBuiltInCMap: this._fetchBuiltInCMapBound,
                  useCMap: null
                });

              case 41:
                cMap = _context7.sent;
                properties.cMap = cMap;
                properties.vertical = properties.cMap.vertical;

              case 44:
                return _context7.abrupt("return", this.extractDataStructures(dict, baseDict, properties).then(function (newProperties) {
                  _this11.extractWidths(dict, descriptor, newProperties);

                  if (type === "Type3") {
                    newProperties.isType3Font = true;
                  }

                  return new _fonts.Font(fontName.name, fontFile, newProperties);
                }));

              case 45:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function translateFont(_x13) {
        return _translateFont.apply(this, arguments);
      }

      return translateFont;
    }()
  }, {
    key: "_pdfFunctionFactory",
    get: function get() {
      var pdfFunctionFactory = new _function.PDFFunctionFactory({
        xref: this.xref,
        isEvalSupported: this.options.isEvalSupported
      });
      return (0, _util_metapdf.shadow)(this, "_pdfFunctionFactory", pdfFunctionFactory);
    }
  }], [{
    key: "buildFontPaths",
    value: function buildFontPaths(font, glyphs, handler) {
      function buildPath(fontChar) {
        if (font.renderer.hasBuiltPath(fontChar)) {
          return;
        }

        handler.send("commonobj", ["".concat(font.loadedName, "_path_").concat(fontChar), "FontPath", font.renderer.getPathJs(fontChar)]);
      }

      var _iterator6 = _createForOfIteratorHelper(glyphs),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var glyph = _step6.value;
          buildPath(glyph.fontChar);
          var accent = glyph.accent;

          if (accent && accent.fontChar) {
            buildPath(accent.fontChar);
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "fallbackFontDict",
    get: function get() {
      var dict = new _primitives.Dict();
      dict.set("BaseFont", _primitives.Name.get("PDFJS-FallbackFont"));
      dict.set("Type", _primitives.Name.get("FallbackType"));
      dict.set("Subtype", _primitives.Name.get("FallbackType"));
      dict.set("Encoding", _primitives.Name.get("WinAnsiEncoding"));
      return (0, _util_metapdf.shadow)(this, "fallbackFontDict", dict);
    }
  }]);

  return PartialEvaluator;
}();

exports.PartialEvaluator = PartialEvaluator;

var TranslatedFont = /*#__PURE__*/function () {
  function TranslatedFont(_ref9) {
    var loadedName = _ref9.loadedName,
        font = _ref9.font,
        dict = _ref9.dict,
        _ref9$extraProperties = _ref9.extraProperties,
        extraProperties = _ref9$extraProperties === void 0 ? false : _ref9$extraProperties;

    _classCallCheck(this, TranslatedFont);

    this.loadedName = loadedName;
    this.font = font;
    this.dict = dict;
    this._extraProperties = extraProperties;
    this.type3Loaded = null;
    this.type3Dependencies = font.isType3Font ? new Set() : null;
    this.sent = false;
  }

  _createClass(TranslatedFont, [{
    key: "send",
    value: function send(handler) {
      if (this.sent) {
        return;
      }

      this.sent = true;
      handler.send("commonobj", [this.loadedName, "Font", this.font.exportData(this._extraProperties)]);
    }
  }, {
    key: "fallback",
    value: function fallback(handler) {
      if (!this.font.data) {
        return;
      }

      this.font.disableFontFace = true;
      var glyphs = this.font.glyphCacheValues;
      PartialEvaluator.buildFontPaths(this.font, glyphs, handler);
    }
  }, {
    key: "loadType3Data",
    value: function loadType3Data(evaluator, resources, task) {
      if (this.type3Loaded) {
        return this.type3Loaded;
      }

      if (!this.font.isType3Font) {
        throw new Error("Must be a Type3 font.");
      }

      var type3Options = Object.create(evaluator.options);
      type3Options.ignoreErrors = false;
      var type3Evaluator = evaluator.clone(type3Options);
      type3Evaluator.parsingType3Font = true;
      var translatedFont = this.font,
          type3Dependencies = this.type3Dependencies;
      var loadCharProcsPromise = Promise.resolve();
      var charProcs = this.dict.get("CharProcs");
      var fontResources = this.dict.get("Resources") || resources;
      var charProcOperatorList = Object.create(null);

      var _iterator7 = _createForOfIteratorHelper(charProcs.getKeys()),
          _step7;

      try {
        var _loop2 = function _loop2() {
          var key = _step7.value;
          loadCharProcsPromise = loadCharProcsPromise.then(function () {
            var glyphStream = charProcs.get(key);
            var operatorList = new _operator_list.OperatorList();
            return type3Evaluator.getOperatorList({
              stream: glyphStream,
              task: task,
              resources: fontResources,
              operatorList: operatorList
            }).then(function () {
              charProcOperatorList[key] = operatorList.getIR();

              var _iterator8 = _createForOfIteratorHelper(operatorList.dependencies),
                  _step8;

              try {
                for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                  var dependency = _step8.value;
                  type3Dependencies.add(dependency);
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }
            })["catch"](function (reason) {
              (0, _util_metapdf.warn)("Type3 font resource \"".concat(key, "\" is not available."));
              var dummyOperatorList = new _operator_list.OperatorList();
              charProcOperatorList[key] = dummyOperatorList.getIR();
            });
          });
        };

        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      this.type3Loaded = loadCharProcsPromise.then(function () {
        translatedFont.charProcOperatorList = charProcOperatorList;
      });
      return this.type3Loaded;
    }
  }]);

  return TranslatedFont;
}();

var StateManager = /*#__PURE__*/function () {
  function StateManager(initialState) {
    _classCallCheck(this, StateManager);

    this.state = initialState;
    this.stateStack = [];
  }

  _createClass(StateManager, [{
    key: "save",
    value: function save() {
      var old = this.state;
      this.stateStack.push(this.state);
      this.state = old.clone();
    }
  }, {
    key: "restore",
    value: function restore() {
      var prev = this.stateStack.pop();

      if (prev) {
        this.state = prev;
      }
    }
  }, {
    key: "transform",
    value: function transform(args) {
      this.state.ctm = _util_metapdf.Util.transform(this.state.ctm, args);
    }
  }]);

  return StateManager;
}();

var TextState = /*#__PURE__*/function () {
  function TextState() {
    _classCallCheck(this, TextState);

    this.ctm = new Float32Array(_util_metapdf.IDENTITY_MATRIX);
    this.fontName = null;
    this.fontSize = 0;
    this.font = null;
    this.fontMatrix = _util_metapdf.FONT_IDENTITY_MATRIX;
    this.textMatrix = _util_metapdf.IDENTITY_MATRIX.slice();
    this.textLineMatrix = _util_metapdf.IDENTITY_MATRIX.slice();
    this.charSpacing = 0;
    this.wordSpacing = 0;
    this.leading = 0;
    this.textHScale = 1;
    this.textRise = 0;
  }

  _createClass(TextState, [{
    key: "setTextMatrix",
    value: function setTextMatrix(a, b, c, d, e, f) {
      var m = this.textMatrix;
      m[0] = a;
      m[1] = b;
      m[2] = c;
      m[3] = d;
      m[4] = e;
      m[5] = f;
    }
  }, {
    key: "setTextLineMatrix",
    value: function setTextLineMatrix(a, b, c, d, e, f) {
      var m = this.textLineMatrix;
      m[0] = a;
      m[1] = b;
      m[2] = c;
      m[3] = d;
      m[4] = e;
      m[5] = f;
    }
  }, {
    key: "translateTextMatrix",
    value: function translateTextMatrix(x, y) {
      var m = this.textMatrix;
      m[4] = m[0] * x + m[2] * y + m[4];
      m[5] = m[1] * x + m[3] * y + m[5];
    }
  }, {
    key: "translateTextLineMatrix",
    value: function translateTextLineMatrix(x, y) {
      var m = this.textLineMatrix;
      m[4] = m[0] * x + m[2] * y + m[4];
      m[5] = m[1] * x + m[3] * y + m[5];
    }
  }, {
    key: "calcTextLineMatrixAdvance",
    value: function calcTextLineMatrixAdvance(a, b, c, d, e, f) {
      var font = this.font;

      if (!font) {
        return null;
      }

      var m = this.textLineMatrix;

      if (!(a === m[0] && b === m[1] && c === m[2] && d === m[3])) {
        return null;
      }

      var txDiff = e - m[4],
          tyDiff = f - m[5];

      if (font.vertical && txDiff !== 0 || !font.vertical && tyDiff !== 0) {
        return null;
      }

      var tx,
          ty,
          denominator = a * d - b * c;

      if (font.vertical) {
        tx = -tyDiff * c / denominator;
        ty = tyDiff * a / denominator;
      } else {
        tx = txDiff * d / denominator;
        ty = -txDiff * b / denominator;
      }

      return {
        width: tx,
        height: ty,
        value: font.vertical ? ty : tx
      };
    }
  }, {
    key: "calcRenderMatrix",
    value: function calcRenderMatrix(ctm) {
      var tsm = [this.fontSize * this.textHScale, 0, 0, this.fontSize, 0, this.textRise];
      return _util_metapdf.Util.transform(ctm, _util_metapdf.Util.transform(this.textMatrix, tsm));
    }
  }, {
    key: "carriageReturn",
    value: function carriageReturn() {
      this.translateTextLineMatrix(0, -this.leading);
      this.textMatrix = this.textLineMatrix.slice();
    }
  }, {
    key: "clone",
    value: function clone() {
      var clone = Object.create(this);
      clone.textMatrix = this.textMatrix.slice();
      clone.textLineMatrix = this.textLineMatrix.slice();
      clone.fontMatrix = this.fontMatrix.slice();
      return clone;
    }
  }]);

  return TextState;
}();

var EvalState = /*#__PURE__*/function () {
  function EvalState() {
    _classCallCheck(this, EvalState);

    this.ctm = new Float32Array(_util_metapdf.IDENTITY_MATRIX);
    this.font = null;
    this.textRenderingMode = _util_metapdf.TextRenderingMode.FILL;
    this.fillColorSpace = _colorspace_metapdf.ColorSpace.singletons.gray;
    this.strokeColorSpace = _colorspace_metapdf.ColorSpace.singletons.gray;
  }

  _createClass(EvalState, [{
    key: "clone",
    value: function clone() {
      return Object.create(this);
    }
  }]);

  return EvalState;
}();

var EvaluatorPreprocessor = /*#__PURE__*/function () {
  _createClass(EvaluatorPreprocessor, null, [{
    key: "opMap",
    get: function get() {
      var getOPMap = (0, _core_utils.getLookupTableFactory)(function (t) {
        t.w = {
          id: _util_metapdf.OPS.setLineWidth,
          numArgs: 1,
          variableArgs: false
        };
        t.J = {
          id: _util_metapdf.OPS.setLineCap,
          numArgs: 1,
          variableArgs: false
        };
        t.j = {
          id: _util_metapdf.OPS.setLineJoin,
          numArgs: 1,
          variableArgs: false
        };
        t.M = {
          id: _util_metapdf.OPS.setMiterLimit,
          numArgs: 1,
          variableArgs: false
        };
        t.d = {
          id: _util_metapdf.OPS.setDash,
          numArgs: 2,
          variableArgs: false
        };
        t.ri = {
          id: _util_metapdf.OPS.setRenderingIntent,
          numArgs: 1,
          variableArgs: false
        };
        t.i = {
          id: _util_metapdf.OPS.setFlatness,
          numArgs: 1,
          variableArgs: false
        };
        t.gs = {
          id: _util_metapdf.OPS.setGState,
          numArgs: 1,
          variableArgs: false
        };
        t.q = {
          id: _util_metapdf.OPS.save,
          numArgs: 0,
          variableArgs: false
        };
        t.Q = {
          id: _util_metapdf.OPS.restore,
          numArgs: 0,
          variableArgs: false
        };
        t.cm = {
          id: _util_metapdf.OPS.transform,
          numArgs: 6,
          variableArgs: false
        };
        t.m = {
          id: _util_metapdf.OPS.moveTo,
          numArgs: 2,
          variableArgs: false
        };
        t.l = {
          id: _util_metapdf.OPS.lineTo,
          numArgs: 2,
          variableArgs: false
        };
        t.c = {
          id: _util_metapdf.OPS.curveTo,
          numArgs: 6,
          variableArgs: false
        };
        t.v = {
          id: _util_metapdf.OPS.curveTo2,
          numArgs: 4,
          variableArgs: false
        };
        t.y = {
          id: _util_metapdf.OPS.curveTo3,
          numArgs: 4,
          variableArgs: false
        };
        t.h = {
          id: _util_metapdf.OPS.closePath,
          numArgs: 0,
          variableArgs: false
        };
        t.re = {
          id: _util_metapdf.OPS.rectangle,
          numArgs: 4,
          variableArgs: false
        };
        t.S = {
          id: _util_metapdf.OPS.stroke,
          numArgs: 0,
          variableArgs: false
        };
        t.s = {
          id: _util_metapdf.OPS.closeStroke,
          numArgs: 0,
          variableArgs: false
        };
        t.f = {
          id: _util_metapdf.OPS.fill,
          numArgs: 0,
          variableArgs: false
        };
        t.F = {
          id: _util_metapdf.OPS.fill,
          numArgs: 0,
          variableArgs: false
        };
        t["f*"] = {
          id: _util_metapdf.OPS.eoFill,
          numArgs: 0,
          variableArgs: false
        };
        t.B = {
          id: _util_metapdf.OPS.fillStroke,
          numArgs: 0,
          variableArgs: false
        };
        t["B*"] = {
          id: _util_metapdf.OPS.eoFillStroke,
          numArgs: 0,
          variableArgs: false
        };
        t.b = {
          id: _util_metapdf.OPS.closeFillStroke,
          numArgs: 0,
          variableArgs: false
        };
        t["b*"] = {
          id: _util_metapdf.OPS.closeEOFillStroke,
          numArgs: 0,
          variableArgs: false
        };
        t.n = {
          id: _util_metapdf.OPS.endPath,
          numArgs: 0,
          variableArgs: false
        };
        t.W = {
          id: _util_metapdf.OPS.clip,
          numArgs: 0,
          variableArgs: false
        };
        t["W*"] = {
          id: _util_metapdf.OPS.eoClip,
          numArgs: 0,
          variableArgs: false
        };
        t.BT = {
          id: _util_metapdf.OPS.beginText,
          numArgs: 0,
          variableArgs: false
        };
        t.ET = {
          id: _util_metapdf.OPS.endText,
          numArgs: 0,
          variableArgs: false
        };
        t.Tc = {
          id: _util_metapdf.OPS.setCharSpacing,
          numArgs: 1,
          variableArgs: false
        };
        t.Tw = {
          id: _util_metapdf.OPS.setWordSpacing,
          numArgs: 1,
          variableArgs: false
        };
        t.Tz = {
          id: _util_metapdf.OPS.setHScale,
          numArgs: 1,
          variableArgs: false
        };
        t.TL = {
          id: _util_metapdf.OPS.setLeading,
          numArgs: 1,
          variableArgs: false
        };
        t.Tf = {
          id: _util_metapdf.OPS.setFont,
          numArgs: 2,
          variableArgs: false
        };
        t.Tr = {
          id: _util_metapdf.OPS.setTextRenderingMode,
          numArgs: 1,
          variableArgs: false
        };
        t.Ts = {
          id: _util_metapdf.OPS.setTextRise,
          numArgs: 1,
          variableArgs: false
        };
        t.Td = {
          id: _util_metapdf.OPS.moveText,
          numArgs: 2,
          variableArgs: false
        };
        t.TD = {
          id: _util_metapdf.OPS.setLeadingMoveText,
          numArgs: 2,
          variableArgs: false
        };
        t.Tm = {
          id: _util_metapdf.OPS.setTextMatrix,
          numArgs: 6,
          variableArgs: false
        };
        t["T*"] = {
          id: _util_metapdf.OPS.nextLine,
          numArgs: 0,
          variableArgs: false
        };
        t.Tj = {
          id: _util_metapdf.OPS.showText,
          numArgs: 1,
          variableArgs: false
        };
        t.TJ = {
          id: _util_metapdf.OPS.showSpacedText,
          numArgs: 1,
          variableArgs: false
        };
        t["'"] = {
          id: _util_metapdf.OPS.nextLineShowText,
          numArgs: 1,
          variableArgs: false
        };
        t['"'] = {
          id: _util_metapdf.OPS.nextLineSetSpacingShowText,
          numArgs: 3,
          variableArgs: false
        };
        t.d0 = {
          id: _util_metapdf.OPS.setCharWidth,
          numArgs: 2,
          variableArgs: false
        };
        t.d1 = {
          id: _util_metapdf.OPS.setCharWidthAndBounds,
          numArgs: 6,
          variableArgs: false
        };
        t.CS = {
          id: _util_metapdf.OPS.setStrokeColorSpace,
          numArgs: 1,
          variableArgs: false
        };
        t.cs = {
          id: _util_metapdf.OPS.setFillColorSpace,
          numArgs: 1,
          variableArgs: false
        };
        t.SC = {
          id: _util_metapdf.OPS.setStrokeColor,
          numArgs: 4,
          variableArgs: true
        };
        t.SCN = {
          id: _util_metapdf.OPS.setStrokeColorN,
          numArgs: 33,
          variableArgs: true
        };
        t.sc = {
          id: _util_metapdf.OPS.setFillColor,
          numArgs: 4,
          variableArgs: true
        };
        t.scn = {
          id: _util_metapdf.OPS.setFillColorN,
          numArgs: 33,
          variableArgs: true
        };
        t.G = {
          id: _util_metapdf.OPS.setStrokeGray,
          numArgs: 1,
          variableArgs: false
        };
        t.g = {
          id: _util_metapdf.OPS.setFillGray,
          numArgs: 1,
          variableArgs: false
        };
        t.RG = {
          id: _util_metapdf.OPS.setStrokeRGBColor,
          numArgs: 3,
          variableArgs: false
        };
        t.rg = {
          id: _util_metapdf.OPS.setFillRGBColor,
          numArgs: 3,
          variableArgs: false
        };
        t.K = {
          id: _util_metapdf.OPS.setStrokeCMYKColor,
          numArgs: 4,
          variableArgs: false
        };
        t.k = {
          id: _util_metapdf.OPS.setFillCMYKColor,
          numArgs: 4,
          variableArgs: false
        };
        t.sh = {
          id: _util_metapdf.OPS.shadingFill,
          numArgs: 1,
          variableArgs: false
        };
        t.BI = {
          id: _util_metapdf.OPS.beginInlineImage,
          numArgs: 0,
          variableArgs: false
        };
        t.ID = {
          id: _util_metapdf.OPS.beginImageData,
          numArgs: 0,
          variableArgs: false
        };
        t.EI = {
          id: _util_metapdf.OPS.endInlineImage,
          numArgs: 1,
          variableArgs: false
        };
        t.Do = {
          id: _util_metapdf.OPS.paintXObject,
          numArgs: 1,
          variableArgs: false
        };
        t.MP = {
          id: _util_metapdf.OPS.markPoint,
          numArgs: 1,
          variableArgs: false
        };
        t.DP = {
          id: _util_metapdf.OPS.markPointProps,
          numArgs: 2,
          variableArgs: false
        };
        t.BMC = {
          id: _util_metapdf.OPS.beginMarkedContent,
          numArgs: 1,
          variableArgs: false
        };
        t.BDC = {
          id: _util_metapdf.OPS.beginMarkedContentProps,
          numArgs: 2,
          variableArgs: false
        };
        t.EMC = {
          id: _util_metapdf.OPS.endMarkedContent,
          numArgs: 0,
          variableArgs: false
        };
        t.BX = {
          id: _util_metapdf.OPS.beginCompat,
          numArgs: 0,
          variableArgs: false
        };
        t.EX = {
          id: _util_metapdf.OPS.endCompat,
          numArgs: 0,
          variableArgs: false
        };
        t.BM = null;
        t.BD = null;
        t["true"] = null;
        t.fa = null;
        t.fal = null;
        t.fals = null;
        t["false"] = null;
        t.nu = null;
        t.nul = null;
        t["null"] = null;
      });
      return (0, _util_metapdf.shadow)(this, "opMap", getOPMap());
    }
  }, {
    key: "MAX_INVALID_PATH_OPS",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "MAX_INVALID_PATH_OPS", 20);
    }
  }]);

  function EvaluatorPreprocessor(stream, xref, stateManager) {
    _classCallCheck(this, EvaluatorPreprocessor);

    this.parser = new _parser.Parser({
      lexer: new _parser.Lexer(stream, EvaluatorPreprocessor.opMap),
      xref: xref
    });
    this.stateManager = stateManager;
    this.nonProcessedArgs = [];
    this._numInvalidPathOPS = 0;
  }

  _createClass(EvaluatorPreprocessor, [{
    key: "read",
    value: function read(operation) {
      var args = operation.args;

      while (true) {
        var obj = this.parser.getObj();

        if (obj instanceof _primitives.Cmd) {
          var cmd = obj.cmd;
          var opSpec = EvaluatorPreprocessor.opMap[cmd];

          if (!opSpec) {
            (0, _util_metapdf.warn)("Unknown command \"".concat(cmd, "\"."));
            continue;
          }

          var fn = opSpec.id;
          var numArgs = opSpec.numArgs;
          var argsLength = args !== null ? args.length : 0;

          if (!opSpec.variableArgs) {
            if (argsLength !== numArgs) {
              var nonProcessedArgs = this.nonProcessedArgs;

              while (argsLength > numArgs) {
                nonProcessedArgs.push(args.shift());
                argsLength--;
              }

              while (argsLength < numArgs && nonProcessedArgs.length !== 0) {
                if (args === null) {
                  args = [];
                }

                args.unshift(nonProcessedArgs.pop());
                argsLength++;
              }
            }

            if (argsLength < numArgs) {
              var partialMsg = "command ".concat(cmd, ": expected ").concat(numArgs, " args, ") + "but received ".concat(argsLength, " args.");

              if (fn >= _util_metapdf.OPS.moveTo && fn <= _util_metapdf.OPS.endPath && ++this._numInvalidPathOPS > EvaluatorPreprocessor.MAX_INVALID_PATH_OPS) {
                throw new _util_metapdf.FormatError("Invalid ".concat(partialMsg));
              }

              (0, _util_metapdf.warn)("Skipping ".concat(partialMsg));

              if (args !== null) {
                args.length = 0;
              }

              continue;
            }
          } else if (argsLength > numArgs) {
            (0, _util_metapdf.info)("Command ".concat(cmd, ": expected [0, ").concat(numArgs, "] args, ") + "but received ".concat(argsLength, " args."));
          }

          this.preprocessCommand(fn, args);
          operation.fn = fn;
          operation.args = args;
          return true;
        }

        if (obj === _primitives.EOF) {
          return false;
        }

        if (obj !== null) {
          if (args === null) {
            args = [];
          }

          args.push(obj);

          if (args.length > 33) {
            throw new _util_metapdf.FormatError("Too many arguments");
          }
        }
      }
    }
  }, {
    key: "preprocessCommand",
    value: function preprocessCommand(fn, args) {
      switch (fn | 0) {
        case _util_metapdf.OPS.save:
          this.stateManager.save();
          break;

        case _util_metapdf.OPS.restore:
          this.stateManager.restore();
          break;

        case _util_metapdf.OPS.transform:
          this.stateManager.transform(args);
          break;
      }
    }
  }, {
    key: "savedStatesDepth",
    get: function get() {
      return this.stateManager.stateStack.length;
    }
  }]);

  return EvaluatorPreprocessor;
}();