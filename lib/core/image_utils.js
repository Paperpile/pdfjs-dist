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
exports.GlobalImageCache = exports.LocalTilingPatternCache = exports.LocalGStateCache = exports.LocalFunctionCache = exports.LocalColorSpaceCache = exports.LocalImageCache = void 0;

var _util_metapdf = require("../shared/util_metapdf.js");

var _primitives = require("./primitives.js");

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

var BaseLocalCache = /*#__PURE__*/function () {
  function BaseLocalCache(options) {
    _classCallCheck(this, BaseLocalCache);

    if (this.constructor === BaseLocalCache) {
      (0, _util_metapdf.unreachable)("Cannot initialize BaseLocalCache.");
    }

    if (!options || !options.onlyRefs) {
      this._nameRefMap = new Map();
      this._imageMap = new Map();
    }

    this._imageCache = new _primitives.RefSetCache();
  }

  _createClass(BaseLocalCache, [{
    key: "getByName",
    value: function getByName(name) {
      var ref = this._nameRefMap.get(name);

      if (ref) {
        return this.getByRef(ref);
      }

      return this._imageMap.get(name) || null;
    }
  }, {
    key: "getByRef",
    value: function getByRef(ref) {
      return this._imageCache.get(ref) || null;
    }
  }, {
    key: "set",
    value: function set(name, ref, data) {
      (0, _util_metapdf.unreachable)("Abstract method `set` called.");
    }
  }]);

  return BaseLocalCache;
}();

var LocalImageCache = /*#__PURE__*/function (_BaseLocalCache) {
  _inherits(LocalImageCache, _BaseLocalCache);

  var _super = _createSuper(LocalImageCache);

  function LocalImageCache() {
    _classCallCheck(this, LocalImageCache);

    return _super.apply(this, arguments);
  }

  _createClass(LocalImageCache, [{
    key: "set",
    value: function set(name) {
      var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = arguments.length > 2 ? arguments[2] : undefined;

      if (!name) {
        throw new Error('LocalImageCache.set - expected "name" argument.');
      }

      if (ref) {
        if (this._imageCache.has(ref)) {
          return;
        }

        this._nameRefMap.set(name, ref);

        this._imageCache.put(ref, data);

        return;
      }

      if (this._imageMap.has(name)) {
        return;
      }

      this._imageMap.set(name, data);
    }
  }]);

  return LocalImageCache;
}(BaseLocalCache);

exports.LocalImageCache = LocalImageCache;

var LocalColorSpaceCache = /*#__PURE__*/function (_BaseLocalCache2) {
  _inherits(LocalColorSpaceCache, _BaseLocalCache2);

  var _super2 = _createSuper(LocalColorSpaceCache);

  function LocalColorSpaceCache() {
    _classCallCheck(this, LocalColorSpaceCache);

    return _super2.apply(this, arguments);
  }

  _createClass(LocalColorSpaceCache, [{
    key: "set",
    value: function set() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = arguments.length > 2 ? arguments[2] : undefined;

      if (!name && !ref) {
        throw new Error('LocalColorSpaceCache.set - expected "name" and/or "ref" argument.');
      }

      if (ref) {
        if (this._imageCache.has(ref)) {
          return;
        }

        if (name) {
          this._nameRefMap.set(name, ref);
        }

        this._imageCache.put(ref, data);

        return;
      }

      if (this._imageMap.has(name)) {
        return;
      }

      this._imageMap.set(name, data);
    }
  }]);

  return LocalColorSpaceCache;
}(BaseLocalCache);

exports.LocalColorSpaceCache = LocalColorSpaceCache;

var LocalFunctionCache = /*#__PURE__*/function (_BaseLocalCache3) {
  _inherits(LocalFunctionCache, _BaseLocalCache3);

  var _super3 = _createSuper(LocalFunctionCache);

  function LocalFunctionCache(options) {
    _classCallCheck(this, LocalFunctionCache);

    return _super3.call(this, {
      onlyRefs: true
    });
  }

  _createClass(LocalFunctionCache, [{
    key: "getByName",
    value: function getByName(name) {
      (0, _util_metapdf.unreachable)("Should not call `getByName` method.");
    }
  }, {
    key: "set",
    value: function set() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var ref = arguments.length > 1 ? arguments[1] : undefined;
      var data = arguments.length > 2 ? arguments[2] : undefined;

      if (!ref) {
        throw new Error('LocalFunctionCache.set - expected "ref" argument.');
      }

      if (this._imageCache.has(ref)) {
        return;
      }

      this._imageCache.put(ref, data);
    }
  }]);

  return LocalFunctionCache;
}(BaseLocalCache);

exports.LocalFunctionCache = LocalFunctionCache;

var LocalGStateCache = /*#__PURE__*/function (_BaseLocalCache4) {
  _inherits(LocalGStateCache, _BaseLocalCache4);

  var _super4 = _createSuper(LocalGStateCache);

  function LocalGStateCache() {
    _classCallCheck(this, LocalGStateCache);

    return _super4.apply(this, arguments);
  }

  _createClass(LocalGStateCache, [{
    key: "set",
    value: function set(name) {
      var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = arguments.length > 2 ? arguments[2] : undefined;

      if (!name) {
        throw new Error('LocalGStateCache.set - expected "name" argument.');
      }

      if (ref) {
        if (this._imageCache.has(ref)) {
          return;
        }

        this._nameRefMap.set(name, ref);

        this._imageCache.put(ref, data);

        return;
      }

      if (this._imageMap.has(name)) {
        return;
      }

      this._imageMap.set(name, data);
    }
  }]);

  return LocalGStateCache;
}(BaseLocalCache);

exports.LocalGStateCache = LocalGStateCache;

var LocalTilingPatternCache = /*#__PURE__*/function (_BaseLocalCache5) {
  _inherits(LocalTilingPatternCache, _BaseLocalCache5);

  var _super5 = _createSuper(LocalTilingPatternCache);

  function LocalTilingPatternCache() {
    _classCallCheck(this, LocalTilingPatternCache);

    return _super5.apply(this, arguments);
  }

  _createClass(LocalTilingPatternCache, [{
    key: "set",
    value: function set(name) {
      var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var data = arguments.length > 2 ? arguments[2] : undefined;

      if (!name) {
        throw new Error('LocalTilingPatternCache.set - expected "name" argument.');
      }

      if (ref) {
        if (this._imageCache.has(ref)) {
          return;
        }

        this._nameRefMap.set(name, ref);

        this._imageCache.put(ref, data);

        return;
      }

      if (this._imageMap.has(name)) {
        return;
      }

      this._imageMap.set(name, data);
    }
  }]);

  return LocalTilingPatternCache;
}(BaseLocalCache);

exports.LocalTilingPatternCache = LocalTilingPatternCache;

var GlobalImageCache = /*#__PURE__*/function () {
  _createClass(GlobalImageCache, null, [{
    key: "NUM_PAGES_THRESHOLD",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "NUM_PAGES_THRESHOLD", 2);
    }
  }, {
    key: "MAX_IMAGES_TO_CACHE",
    get: function get() {
      return (0, _util_metapdf.shadow)(this, "MAX_IMAGES_TO_CACHE", 10);
    }
  }]);

  function GlobalImageCache() {
    _classCallCheck(this, GlobalImageCache);

    this._refCache = new _primitives.RefSetCache();
    this._imageCache = new _primitives.RefSetCache();
  }

  _createClass(GlobalImageCache, [{
    key: "shouldCache",
    value: function shouldCache(ref, pageIndex) {
      var pageIndexSet = this._refCache.get(ref);

      var numPages = pageIndexSet ? pageIndexSet.size + (pageIndexSet.has(pageIndex) ? 0 : 1) : 1;

      if (numPages < GlobalImageCache.NUM_PAGES_THRESHOLD) {
        return false;
      }

      if (!this._imageCache.has(ref) && this._imageCache.size >= GlobalImageCache.MAX_IMAGES_TO_CACHE) {
        return false;
      }

      return true;
    }
  }, {
    key: "addPageIndex",
    value: function addPageIndex(ref, pageIndex) {
      var pageIndexSet = this._refCache.get(ref);

      if (!pageIndexSet) {
        pageIndexSet = new Set();

        this._refCache.put(ref, pageIndexSet);
      }

      pageIndexSet.add(pageIndex);
    }
  }, {
    key: "getData",
    value: function getData(ref, pageIndex) {
      var pageIndexSet = this._refCache.get(ref);

      if (!pageIndexSet) {
        return null;
      }

      if (pageIndexSet.size < GlobalImageCache.NUM_PAGES_THRESHOLD) {
        return null;
      }

      if (!this._imageCache.has(ref)) {
        return null;
      }

      pageIndexSet.add(pageIndex);
      return this._imageCache.get(ref);
    }
  }, {
    key: "setData",
    value: function setData(ref, data) {
      if (!this._refCache.has(ref)) {
        throw new Error('GlobalImageCache.setData - expected "addPageIndex" to have been called.');
      }

      if (this._imageCache.has(ref)) {
        return;
      }

      if (this._imageCache.size >= GlobalImageCache.MAX_IMAGES_TO_CACHE) {
        (0, _util_metapdf.info)("GlobalImageCache.setData - ignoring image above MAX_IMAGES_TO_CACHE.");
        return;
      }

      this._imageCache.put(ref, data);
    }
  }, {
    key: "clear",
    value: function clear() {
      var onlyData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!onlyData) {
        this._refCache.clear();
      }

      this._imageCache.clear();
    }
  }]);

  return GlobalImageCache;
}();

exports.GlobalImageCache = GlobalImageCache;