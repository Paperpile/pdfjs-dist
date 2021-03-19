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
exports.PDFLayerViewer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _base_tree_viewer_metapdf = require("./base_tree_viewer_metapdf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDFLayerViewer = /*#__PURE__*/function (_BaseTreeViewer) {
  _inherits(PDFLayerViewer, _BaseTreeViewer);

  var _super = _createSuper(PDFLayerViewer);

  function PDFLayerViewer(options) {
    var _this;

    _classCallCheck(this, PDFLayerViewer);

    _this = _super.call(this, options);
    _this.l10n = options.l10n;

    _this.eventBus._on("resetlayers", _this._resetLayers.bind(_assertThisInitialized(_this)));

    _this.eventBus._on("togglelayerstree", _this._toggleAllTreeItems.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(PDFLayerViewer, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(PDFLayerViewer.prototype), "reset", this).call(this);

      this._optionalContentConfig = null;
      this._pdfDocument = null;
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(layersCount) {
      this.eventBus.dispatch("layersloaded", {
        source: this,
        layersCount: layersCount
      });
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(element, _ref) {
      var _this2 = this;

      var groupId = _ref.groupId,
          input = _ref.input;

      var setVisibility = function setVisibility() {
        _this2._optionalContentConfig.setVisibility(groupId, input.checked);

        _this2.eventBus.dispatch("optionalcontentconfig", {
          source: _this2,
          promise: Promise.resolve(_this2._optionalContentConfig)
        });
      };

      element.onclick = function (evt) {
        if (evt.target === input) {
          setVisibility();
          return true;
        } else if (evt.target !== element) {
          return true;
        }

        input.checked = !input.checked;
        setVisibility();
        return false;
      };
    }
  }, {
    key: "_setNestedName",
    value: function () {
      var _setNestedName2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(element, _ref2) {
        var _ref2$name, name;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref2$name = _ref2.name, name = _ref2$name === void 0 ? null : _ref2$name;

                if (!(typeof name === "string")) {
                  _context.next = 4;
                  break;
                }

                element.textContent = this._normalizeTextContent(name);
                return _context.abrupt("return");

              case 4:
                _context.next = 6;
                return this.l10n.get("additional_layers", null, "Additional Layers");

              case 6:
                element.textContent = _context.sent;
                element.style.fontStyle = "italic";

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _setNestedName(_x, _x2) {
        return _setNestedName2.apply(this, arguments);
      }

      return _setNestedName;
    }()
  }, {
    key: "_addToggleButton",
    value: function _addToggleButton(div, _ref3) {
      var _ref3$name = _ref3.name,
          name = _ref3$name === void 0 ? null : _ref3$name;

      _get(_getPrototypeOf(PDFLayerViewer.prototype), "_addToggleButton", this).call(this, div, name === null);
    }
  }, {
    key: "_toggleAllTreeItems",
    value: function _toggleAllTreeItems() {
      if (!this._optionalContentConfig) {
        return;
      }

      _get(_getPrototypeOf(PDFLayerViewer.prototype), "_toggleAllTreeItems", this).call(this);
    }
  }, {
    key: "render",
    value: function render(_ref4) {
      var optionalContentConfig = _ref4.optionalContentConfig,
          pdfDocument = _ref4.pdfDocument;

      if (this._optionalContentConfig) {
        this.reset();
      }

      this._optionalContentConfig = optionalContentConfig || null;
      this._pdfDocument = pdfDocument || null;
      var groups = optionalContentConfig && optionalContentConfig.getOrder();

      if (!groups) {
        this._dispatchEvent(0);

        return;
      }

      var fragment = document.createDocumentFragment(),
          queue = [{
        parent: fragment,
        groups: groups
      }];
      var layersCount = 0,
          hasAnyNesting = false;

      while (queue.length > 0) {
        var levelData = queue.shift();

        var _iterator = _createForOfIteratorHelper(levelData.groups),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var groupId = _step.value;
            var div = document.createElement("div");
            div.className = "treeItem";
            var element = document.createElement("a");
            div.appendChild(element);

            if (_typeof(groupId) === "object") {
              hasAnyNesting = true;

              this._addToggleButton(div, groupId);

              this._setNestedName(element, groupId);

              var itemsDiv = document.createElement("div");
              itemsDiv.className = "treeItems";
              div.appendChild(itemsDiv);
              queue.push({
                parent: itemsDiv,
                groups: groupId.order
              });
            } else {
              var group = optionalContentConfig.getGroup(groupId);
              var input = document.createElement("input");

              this._bindLink(element, {
                groupId: groupId,
                input: input
              });

              input.type = "checkbox";
              input.id = groupId;
              input.checked = group.visible;
              var label = document.createElement("label");
              label.setAttribute("for", groupId);
              label.textContent = this._normalizeTextContent(group.name);
              element.appendChild(input);
              element.appendChild(label);
              layersCount++;
            }

            levelData.parent.appendChild(div);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      if (hasAnyNesting) {
        this.container.classList.add("treeWithDeepNesting");
        this._lastToggleIsShow = fragment.querySelectorAll(".treeItemsHidden").length === 0;
      }

      this.container.appendChild(fragment);

      this._dispatchEvent(layersCount);
    }
  }, {
    key: "_resetLayers",
    value: function () {
      var _resetLayers2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var optionalContentConfig;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._optionalContentConfig) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _context2.next = 4;
                return this._pdfDocument.getOptionalContentConfig();

              case 4:
                optionalContentConfig = _context2.sent;
                this.eventBus.dispatch("optionalcontentconfig", {
                  source: this,
                  promise: Promise.resolve(optionalContentConfig)
                });
                this.render({
                  optionalContentConfig: optionalContentConfig,
                  pdfDocument: this._pdfDocument
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _resetLayers() {
        return _resetLayers2.apply(this, arguments);
      }

      return _resetLayers;
    }()
  }]);

  return PDFLayerViewer;
}(_base_tree_viewer_metapdf.BaseTreeViewer);

exports.PDFLayerViewer = PDFLayerViewer;