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
exports.AnnotationStorage = void 0;

var _util_metapdf = require("../shared/util_metapdf.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnnotationStorage = /*#__PURE__*/function () {
  function AnnotationStorage() {
    _classCallCheck(this, AnnotationStorage);

    this._storage = new Map();
    this._modified = false;
    this.onSetModified = null;
    this.onResetModified = null;
  }

  _createClass(AnnotationStorage, [{
    key: "getOrCreateValue",
    value: function getOrCreateValue(key, defaultValue) {
      if (this._storage.has(key)) {
        return this._storage.get(key);
      }

      this._storage.set(key, defaultValue);

      return defaultValue;
    }
  }, {
    key: "setValue",
    value: function setValue(key, value) {
      if (this._storage.get(key) !== value) {
        this._setModified();
      }

      this._storage.set(key, value);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      if (this._storage.size === 0) {
        return null;
      }

      return (0, _util_metapdf.objectFromEntries)(this._storage);
    }
  }, {
    key: "_setModified",
    value: function _setModified() {
      if (!this._modified) {
        this._modified = true;

        if (typeof this.onSetModified === "function") {
          this.onSetModified();
        }
      }
    }
  }, {
    key: "resetModified",
    value: function resetModified() {
      if (this._modified) {
        this._modified = false;

        if (typeof this.onResetModified === "function") {
          this.onResetModified();
        }
      }
    }
  }, {
    key: "size",
    get: function get() {
      return this._storage.size;
    }
  }]);

  return AnnotationStorage;
}();

exports.AnnotationStorage = AnnotationStorage;