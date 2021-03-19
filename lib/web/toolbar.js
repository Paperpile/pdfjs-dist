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
exports.Toolbar = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _ui_utils_metapdf = require("./ui_utils_metapdf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PAGE_NUMBER_LOADING_INDICATOR = "visiblePageIsLoading";
var SCALE_SELECT_CONTAINER_WIDTH = 140;
var SCALE_SELECT_WIDTH = 162;

var Toolbar = /*#__PURE__*/function () {
  function Toolbar(options, eventBus) {
    var l10n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ui_utils_metapdf.NullL10n;

    _classCallCheck(this, Toolbar);

    this.toolbar = options.container;
    this.eventBus = eventBus;
    this.l10n = l10n;
    this.buttons = [{
      element: options.previous,
      eventName: "previouspage"
    }, {
      element: options.next,
      eventName: "nextpage"
    }, {
      element: options.zoomIn,
      eventName: "zoomin"
    }, {
      element: options.zoomOut,
      eventName: "zoomout"
    }, {
      element: options.openFile,
      eventName: "openfile"
    }, {
      element: options.print,
      eventName: "print"
    }, {
      element: options.presentationModeButton,
      eventName: "presentationmode"
    }, {
      element: options.download,
      eventName: "download"
    }, {
      element: options.viewBookmark,
      eventName: null
    }];
    this.items = {
      numPages: options.numPages,
      pageNumber: options.pageNumber,
      scaleSelectContainer: options.scaleSelectContainer,
      scaleSelect: options.scaleSelect,
      customScaleOption: options.customScaleOption,
      previous: options.previous,
      next: options.next,
      zoomIn: options.zoomIn,
      zoomOut: options.zoomOut
    };
    this._wasLocalized = false;
    this.reset();

    this._bindListeners();
  }

  _createClass(Toolbar, [{
    key: "setPageNumber",
    value: function setPageNumber(pageNumber, pageLabel) {
      this.pageNumber = pageNumber;
      this.pageLabel = pageLabel;

      this._updateUIState(false);
    }
  }, {
    key: "setPagesCount",
    value: function setPagesCount(pagesCount, hasPageLabels) {
      this.pagesCount = pagesCount;
      this.hasPageLabels = hasPageLabels;

      this._updateUIState(true);
    }
  }, {
    key: "setPageScale",
    value: function setPageScale(pageScaleValue, pageScale) {
      this.pageScaleValue = (pageScaleValue || pageScale).toString();
      this.pageScale = pageScale;

      this._updateUIState(false);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pageNumber = 0;
      this.pageLabel = null;
      this.hasPageLabels = false;
      this.pagesCount = 0;
      this.pageScaleValue = _ui_utils_metapdf.DEFAULT_SCALE_VALUE;
      this.pageScale = _ui_utils_metapdf.DEFAULT_SCALE;

      this._updateUIState(true);

      this.updateLoadingIndicatorState();
    }
  }, {
    key: "_bindListeners",
    value: function _bindListeners() {
      var _this = this;

      var _this$items = this.items,
          pageNumber = _this$items.pageNumber,
          scaleSelect = _this$items.scaleSelect;
      var self = this;

      var _iterator = _createForOfIteratorHelper(this.buttons),
          _step;

      try {
        var _loop = function _loop() {
          var _step$value = _step.value,
              element = _step$value.element,
              eventName = _step$value.eventName;
          element.addEventListener("click", function (evt) {
            if (eventName !== null) {
              _this.eventBus.dispatch(eventName, {
                source: _this
              });
            }
          });
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      pageNumber.addEventListener("click", function () {
        this.select();
      });
      pageNumber.addEventListener("change", function () {
        self.eventBus.dispatch("pagenumberchanged", {
          source: self,
          value: this.value
        });
      });
      scaleSelect.addEventListener("change", function () {
        if (this.value === "custom") {
          return;
        }

        self.eventBus.dispatch("scalechanged", {
          source: self,
          value: this.value
        });
      });
      scaleSelect.oncontextmenu = _ui_utils_metapdf.noContextMenuHandler;

      this.eventBus._on("localized", function () {
        _this._wasLocalized = true;

        _this._adjustScaleWidth();

        _this._updateUIState(true);
      });
    }
  }, {
    key: "_updateUIState",
    value: function _updateUIState() {
      var resetNumPages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this._wasLocalized) {
        return;
      }

      var pageNumber = this.pageNumber,
          pagesCount = this.pagesCount,
          pageScaleValue = this.pageScaleValue,
          pageScale = this.pageScale,
          items = this.items;

      if (resetNumPages) {
        if (this.hasPageLabels) {
          items.pageNumber.type = "text";
        } else {
          items.pageNumber.type = "number";
          this.l10n.get("of_pages", {
            pagesCount: pagesCount
          }, "of {{pagesCount}}").then(function (msg) {
            items.numPages.textContent = msg;
          });
        }

        items.pageNumber.max = pagesCount;
      }

      if (this.hasPageLabels) {
        items.pageNumber.value = this.pageLabel;
        this.l10n.get("page_of_pages", {
          pageNumber: pageNumber,
          pagesCount: pagesCount
        }, "({{pageNumber}} of {{pagesCount}})").then(function (msg) {
          items.numPages.textContent = msg;
        });
      } else {
        items.pageNumber.value = pageNumber;
      }

      items.previous.disabled = pageNumber <= 1;
      items.next.disabled = pageNumber >= pagesCount;
      items.zoomOut.disabled = pageScale <= _ui_utils_metapdf.MIN_SCALE;
      items.zoomIn.disabled = pageScale >= _ui_utils_metapdf.MAX_SCALE;
      var customScale = Math.round(pageScale * 10000) / 100;
      this.l10n.get("page_scale_percent", {
        scale: customScale
      }, "{{scale}}%").then(function (msg) {
        var predefinedValueFound = false;

        var _iterator2 = _createForOfIteratorHelper(items.scaleSelect.options),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var option = _step2.value;

            if (option.value !== pageScaleValue) {
              option.selected = false;
              continue;
            }

            option.selected = true;
            predefinedValueFound = true;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (!predefinedValueFound) {
          items.customScaleOption.textContent = msg;
          items.customScaleOption.selected = true;
        }
      });
    }
  }, {
    key: "updateLoadingIndicatorState",
    value: function updateLoadingIndicatorState() {
      var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var pageNumberInput = this.items.pageNumber;
      pageNumberInput.classList.toggle(PAGE_NUMBER_LOADING_INDICATOR, loading);
    }
  }, {
    key: "_adjustScaleWidth",
    value: function () {
      var _adjustScaleWidth2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var items, l10n, predefinedValuesPromise, canvas, ctx, _getComputedStyle, fontSize, fontFamily, maxWidth, _iterator3, _step3, predefinedValue, _ctx$measureText, width, overflow;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                items = this.items, l10n = this.l10n;
                predefinedValuesPromise = Promise.all([l10n.get("page_scale_auto", null, "Automatic Zoom"), l10n.get("page_scale_actual", null, "Actual Size"), l10n.get("page_scale_fit", null, "Page Fit"), l10n.get("page_scale_width", null, "Page Width")]);
                canvas = document.createElement("canvas");
                canvas.mozOpaque = true;
                ctx = canvas.getContext("2d", {
                  alpha: false
                });
                _context.next = 7;
                return _ui_utils_metapdf.animationStarted;

              case 7:
                _getComputedStyle = getComputedStyle(items.scaleSelect), fontSize = _getComputedStyle.fontSize, fontFamily = _getComputedStyle.fontFamily;
                ctx.font = "".concat(fontSize, " ").concat(fontFamily);
                maxWidth = 0;
                _context.t0 = _createForOfIteratorHelper;
                _context.next = 13;
                return predefinedValuesPromise;

              case 13:
                _context.t1 = _context.sent;
                _iterator3 = (0, _context.t0)(_context.t1);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    predefinedValue = _step3.value;
                    _ctx$measureText = ctx.measureText(predefinedValue), width = _ctx$measureText.width;

                    if (width > maxWidth) {
                      maxWidth = width;
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

                overflow = SCALE_SELECT_WIDTH - SCALE_SELECT_CONTAINER_WIDTH;
                maxWidth += 2 * overflow;

                if (maxWidth > SCALE_SELECT_CONTAINER_WIDTH) {
                  items.scaleSelect.style.width = "".concat(maxWidth + overflow, "px");
                  items.scaleSelectContainer.style.width = "".concat(maxWidth, "px");
                }

                canvas.width = 0;
                canvas.height = 0;
                canvas = ctx = null;

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _adjustScaleWidth() {
        return _adjustScaleWidth2.apply(this, arguments);
      }

      return _adjustScaleWidth;
    }()
  }]);

  return Toolbar;
}();

exports.Toolbar = Toolbar;