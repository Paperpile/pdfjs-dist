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
exports.BaseTreeViewer = void 0;

var _pdf = require("../pdf");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseTreeViewer = /*#__PURE__*/function () {
  function BaseTreeViewer(options) {
    _classCallCheck(this, BaseTreeViewer);

    if (this.constructor === BaseTreeViewer) {
      throw new Error("Cannot initialize BaseTreeViewer.");
    }

    this.container = options.container;
    this.eventBus = options.eventBus;
    this.reset();
  }

  _createClass(BaseTreeViewer, [{
    key: "reset",
    value: function reset() {
      this._lastToggleIsShow = true;
      this.container.textContent = "";
      this.container.classList.remove("treeWithDeepNesting");
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(count) {
      throw new Error("Not implemented: _dispatchEvent");
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(element, params) {
      throw new Error("Not implemented: _bindLink");
    }
  }, {
    key: "_normalizeTextContent",
    value: function _normalizeTextContent(str) {
      return (0, _pdf.removeNullCharacters)(str) || "\u2013";
    }
  }, {
    key: "_addToggleButton",
    value: function _addToggleButton(div) {
      var _this = this;

      var hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var toggler = document.createElement("div");
      toggler.className = "treeItemToggler";

      if (hidden) {
        toggler.classList.add("treeItemsHidden");
      }

      toggler.onclick = function (evt) {
        evt.stopPropagation();
        toggler.classList.toggle("treeItemsHidden");

        if (evt.shiftKey) {
          var shouldShowAll = !toggler.classList.contains("treeItemsHidden");

          _this._toggleTreeItem(div, shouldShowAll);
        }
      };

      div.insertBefore(toggler, div.firstChild);
    }
  }, {
    key: "_toggleTreeItem",
    value: function _toggleTreeItem(root) {
      var show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this._lastToggleIsShow = show;

      var _iterator = _createForOfIteratorHelper(root.querySelectorAll(".treeItemToggler")),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var toggler = _step.value;
          toggler.classList.toggle("treeItemsHidden", !show);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_toggleAllTreeItems",
    value: function _toggleAllTreeItems() {
      this._toggleTreeItem(this.container, !this._lastToggleIsShow);
    }
  }, {
    key: "render",
    value: function render(params) {
      throw new Error("Not implemented: render");
    }
  }]);

  return BaseTreeViewer;
}();

exports.BaseTreeViewer = BaseTreeViewer;