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
exports.OptionalContentConfig = void 0;

var _util_metapdf = require("../shared/util_metapdf.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OptionalContentGroup = function OptionalContentGroup(name, intent) {
  _classCallCheck(this, OptionalContentGroup);

  this.visible = true;
  this.name = name;
  this.intent = intent;
};

var OptionalContentConfig = /*#__PURE__*/function () {
  function OptionalContentConfig(data) {
    _classCallCheck(this, OptionalContentConfig);

    this.name = null;
    this.creator = null;
    this._order = null;
    this._groups = new Map();

    if (data === null) {
      return;
    }

    this.name = data.name;
    this.creator = data.creator;
    this._order = data.order;

    var _iterator = _createForOfIteratorHelper(data.groups),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _group = _step.value;

        this._groups.set(_group.id, new OptionalContentGroup(_group.name, _group.intent));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (data.baseState === "OFF") {
      var _iterator2 = _createForOfIteratorHelper(this._groups),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var group = _step2.value;
          group.visible = false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    var _iterator3 = _createForOfIteratorHelper(data.on),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var on = _step3.value;
        this._groups.get(on).visible = true;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    var _iterator4 = _createForOfIteratorHelper(data.off),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var off = _step4.value;
        this._groups.get(off).visible = false;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }

  _createClass(OptionalContentConfig, [{
    key: "isVisible",
    value: function isVisible(group) {
      if (group.type === "OCG") {
        if (!this._groups.has(group.id)) {
          (0, _util_metapdf.warn)("Optional content group not found: ".concat(group.id));
          return true;
        }

        return this._groups.get(group.id).visible;
      } else if (group.type === "OCMD") {
        if (group.expression) {
          (0, _util_metapdf.warn)("Visibility expression not supported yet.");
        }

        if (!group.policy || group.policy === "AnyOn") {
          var _iterator5 = _createForOfIteratorHelper(group.ids),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var id = _step5.value;

              if (!this._groups.has(id)) {
                (0, _util_metapdf.warn)("Optional content group not found: ".concat(id));
                return true;
              }

              if (this._groups.get(id).visible) {
                return true;
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          return false;
        } else if (group.policy === "AllOn") {
          var _iterator6 = _createForOfIteratorHelper(group.ids),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _id = _step6.value;

              if (!this._groups.has(_id)) {
                (0, _util_metapdf.warn)("Optional content group not found: ".concat(_id));
                return true;
              }

              if (!this._groups.get(_id).visible) {
                return false;
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          return true;
        } else if (group.policy === "AnyOff") {
          var _iterator7 = _createForOfIteratorHelper(group.ids),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var _id2 = _step7.value;

              if (!this._groups.has(_id2)) {
                (0, _util_metapdf.warn)("Optional content group not found: ".concat(_id2));
                return true;
              }

              if (!this._groups.get(_id2).visible) {
                return true;
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }

          return false;
        } else if (group.policy === "AllOff") {
          var _iterator8 = _createForOfIteratorHelper(group.ids),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var _id3 = _step8.value;

              if (!this._groups.has(_id3)) {
                (0, _util_metapdf.warn)("Optional content group not found: ".concat(_id3));
                return true;
              }

              if (this._groups.get(_id3).visible) {
                return false;
              }
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }

          return true;
        }

        (0, _util_metapdf.warn)("Unknown optional content policy ".concat(group.policy, "."));
        return true;
      }

      (0, _util_metapdf.warn)("Unknown group type ".concat(group.type, "."));
      return true;
    }
  }, {
    key: "setVisibility",
    value: function setVisibility(id) {
      var visible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!this._groups.has(id)) {
        (0, _util_metapdf.warn)("Optional content group not found: ".concat(id));
        return;
      }

      this._groups.get(id).visible = !!visible;
    }
  }, {
    key: "getOrder",
    value: function getOrder() {
      if (!this._groups.size) {
        return null;
      }

      if (this._order) {
        return this._order.slice();
      }

      return Array.from(this._groups.keys());
    }
  }, {
    key: "getGroups",
    value: function getGroups() {
      if (!this._groups.size) {
        return null;
      }

      return (0, _util_metapdf.objectFromEntries)(this._groups);
    }
  }, {
    key: "getGroup",
    value: function getGroup(id) {
      return this._groups.get(id) || null;
    }
  }]);

  return OptionalContentConfig;
}();

exports.OptionalContentConfig = OptionalContentConfig;