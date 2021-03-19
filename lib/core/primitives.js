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
exports.clearPrimitiveCaches = clearPrimitiveCaches;
exports.isEOF = isEOF;
exports.isCmd = isCmd;
exports.isDict = isDict;
exports.isName = isName;
exports.isRef = isRef;
exports.isRefsEqual = isRefsEqual;
exports.isStream = isStream;
exports.RefSetCache = exports.RefSet = exports.Ref = exports.Name = exports.Dict = exports.Cmd = exports.EOF = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util_metapdf = require("../shared/util_metapdf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var EOF = {};
exports.EOF = EOF;

var Name = function NameClosure() {
  var nameCache = Object.create(null);

  function Name(name) {
    this.name = name;
  }

  Name.prototype = {};

  Name.get = function Name_get(name) {
    var nameValue = nameCache[name];
    return nameValue ? nameValue : nameCache[name] = new Name(name);
  };

  Name._clearCache = function () {
    nameCache = Object.create(null);
  };

  return Name;
}();

exports.Name = Name;

var Cmd = function CmdClosure() {
  var cmdCache = Object.create(null);

  function Cmd(cmd) {
    this.cmd = cmd;
  }

  Cmd.prototype = {};

  Cmd.get = function Cmd_get(cmd) {
    var cmdValue = cmdCache[cmd];
    return cmdValue ? cmdValue : cmdCache[cmd] = new Cmd(cmd);
  };

  Cmd._clearCache = function () {
    cmdCache = Object.create(null);
  };

  return Cmd;
}();

exports.Cmd = Cmd;

var Dict = function DictClosure() {
  var nonSerializable = function nonSerializableClosure() {
    return nonSerializable;
  };

  function Dict(xref) {
    this._map = Object.create(null);
    this.xref = xref;
    this.objId = null;
    this.suppressEncryption = false;
    this.__nonSerializable__ = nonSerializable;
  }

  Dict.prototype = {
    assignXref: function Dict_assignXref(newXref) {
      this.xref = newXref;
    },

    get size() {
      return Object.keys(this._map).length;
    },

    get: function get(key1, key2, key3) {
      var value = this._map[key1];

      if (value === undefined && key2 !== undefined) {
        value = this._map[key2];

        if (value === undefined && key3 !== undefined) {
          value = this._map[key3];
        }
      }

      if (value instanceof Ref && this.xref) {
        return this.xref.fetch(value, this.suppressEncryption);
      }

      return value;
    },
    getAsync: function getAsync(key1, key2, key3) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var value;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                value = _this._map[key1];

                if (value === undefined && key2 !== undefined) {
                  value = _this._map[key2];

                  if (value === undefined && key3 !== undefined) {
                    value = _this._map[key3];
                  }
                }

                if (!(value instanceof Ref && _this.xref)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", _this.xref.fetchAsync(value, _this.suppressEncryption));

              case 4:
                return _context.abrupt("return", value);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getArray: function getArray(key1, key2, key3) {
      var value = this.get(key1, key2, key3);

      if (!Array.isArray(value) || !this.xref) {
        return value;
      }

      value = value.slice();

      for (var i = 0, ii = value.length; i < ii; i++) {
        if (!(value[i] instanceof Ref)) {
          continue;
        }

        value[i] = this.xref.fetch(value[i], this.suppressEncryption);
      }

      return value;
    },
    getRaw: function Dict_getRaw(key) {
      return this._map[key];
    },
    getKeys: function Dict_getKeys() {
      return Object.keys(this._map);
    },
    getRawValues: function Dict_getRawValues() {
      return Object.values(this._map);
    },
    set: function Dict_set(key, value) {
      this._map[key] = value;
    },
    has: function Dict_has(key) {
      return this._map[key] !== undefined;
    },
    forEach: function Dict_forEach(callback) {
      for (var key in this._map) {
        callback(key, this.get(key));
      }
    }
  };

  Dict.empty = function () {
    var emptyDict = new Dict(null);

    emptyDict.set = function (key, value) {
      (0, _util_metapdf.unreachable)("Should not call `set` on the empty dictionary.");
    };

    return emptyDict;
  }();

  Dict.merge = function (_ref) {
    var xref = _ref.xref,
        dictArray = _ref.dictArray,
        _ref$mergeSubDicts = _ref.mergeSubDicts,
        mergeSubDicts = _ref$mergeSubDicts === void 0 ? false : _ref$mergeSubDicts;
    var mergedDict = new Dict(xref);

    if (!mergeSubDicts) {
      var _iterator = _createForOfIteratorHelper(dictArray),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dict = _step.value;

          if (!(dict instanceof Dict)) {
            continue;
          }

          for (var _i = 0, _Object$entries = Object.entries(dict._map); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            if (mergedDict._map[key] === undefined) {
              mergedDict._map[key] = value;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return mergedDict.size > 0 ? mergedDict : Dict.empty;
    }

    var properties = new Map();

    var _iterator2 = _createForOfIteratorHelper(dictArray),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _dict = _step2.value;

        if (!(_dict instanceof Dict)) {
          continue;
        }

        for (var _i2 = 0, _Object$entries2 = Object.entries(_dict._map); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              _key = _Object$entries2$_i[0],
              _value = _Object$entries2$_i[1];

          var property = properties.get(_key);

          if (property === undefined) {
            property = [];
            properties.set(_key, property);
          }

          property.push(_value);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var _iterator3 = _createForOfIteratorHelper(properties),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _step3$value = _slicedToArray(_step3.value, 2),
            name = _step3$value[0],
            values = _step3$value[1];

        if (values.length === 1 || !(values[0] instanceof Dict)) {
          mergedDict._map[name] = values[0];
          continue;
        }

        var subDict = new Dict(xref);

        var _iterator4 = _createForOfIteratorHelper(values),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _dict2 = _step4.value;

            if (!(_dict2 instanceof Dict)) {
              continue;
            }

            for (var _i3 = 0, _Object$entries3 = Object.entries(_dict2._map); _i3 < _Object$entries3.length; _i3++) {
              var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
                  _key2 = _Object$entries3$_i[0],
                  _value2 = _Object$entries3$_i[1];

              if (subDict._map[_key2] === undefined) {
                subDict._map[_key2] = _value2;
              }
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        if (subDict.size > 0) {
          mergedDict._map[name] = subDict;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    properties.clear();
    return mergedDict.size > 0 ? mergedDict : Dict.empty;
  };

  return Dict;
}();

exports.Dict = Dict;

var Ref = function RefClosure() {
  var refCache = Object.create(null);

  function Ref(num, gen) {
    this.num = num;
    this.gen = gen;
  }

  Ref.prototype = {
    toString: function Ref_toString() {
      if (this.gen === 0) {
        return "".concat(this.num, "R");
      }

      return "".concat(this.num, "R").concat(this.gen);
    }
  };

  Ref.get = function (num, gen) {
    var key = gen === 0 ? "".concat(num, "R") : "".concat(num, "R").concat(gen);
    var refValue = refCache[key];
    return refValue ? refValue : refCache[key] = new Ref(num, gen);
  };

  Ref._clearCache = function () {
    refCache = Object.create(null);
  };

  return Ref;
}();

exports.Ref = Ref;

var RefSet = /*#__PURE__*/function () {
  function RefSet() {
    var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, RefSet);

    this._set = new Set(parent && parent._set);
  }

  _createClass(RefSet, [{
    key: "has",
    value: function has(ref) {
      return this._set.has(ref.toString());
    }
  }, {
    key: "put",
    value: function put(ref) {
      this._set.add(ref.toString());
    }
  }, {
    key: "remove",
    value: function remove(ref) {
      this._set["delete"](ref.toString());
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      var _iterator5 = _createForOfIteratorHelper(this._set.values()),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var ref = _step5.value;
          callback(ref);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this._set.clear();
    }
  }]);

  return RefSet;
}();

exports.RefSet = RefSet;

var RefSetCache = /*#__PURE__*/function () {
  function RefSetCache() {
    _classCallCheck(this, RefSetCache);

    this._map = new Map();
  }

  _createClass(RefSetCache, [{
    key: "get",
    value: function get(ref) {
      return this._map.get(ref.toString());
    }
  }, {
    key: "has",
    value: function has(ref) {
      return this._map.has(ref.toString());
    }
  }, {
    key: "put",
    value: function put(ref, obj) {
      this._map.set(ref.toString(), obj);
    }
  }, {
    key: "putAlias",
    value: function putAlias(ref, aliasRef) {
      this._map.set(ref.toString(), this.get(aliasRef));
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      var _iterator6 = _createForOfIteratorHelper(this._map.values()),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var value = _step6.value;
          callback(value);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this._map.clear();
    }
  }, {
    key: "size",
    get: function get() {
      return this._map.size;
    }
  }]);

  return RefSetCache;
}();

exports.RefSetCache = RefSetCache;

function isEOF(v) {
  return v === EOF;
}

function isName(v, name) {
  return v instanceof Name && (name === undefined || v.name === name);
}

function isCmd(v, cmd) {
  return v instanceof Cmd && (cmd === undefined || v.cmd === cmd);
}

function isDict(v, type) {
  return v instanceof Dict && (type === undefined || isName(v.get("Type"), type));
}

function isRef(v) {
  return v instanceof Ref;
}

function isRefsEqual(v1, v2) {
  return v1.num === v2.num && v1.gen === v2.gen;
}

function isStream(v) {
  return _typeof(v) === "object" && v !== null && v.getBytes !== undefined;
}

function clearPrimitiveCaches() {
  Cmd._clearCache();

  Name._clearCache();

  Ref._clearCache();
}