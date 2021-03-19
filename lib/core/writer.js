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
exports.writeDict = writeDict;
exports.incrementalUpdate = incrementalUpdate;

var _util_metapdf = require("../shared/util_metapdf.js");

var _primitives = require("./primitives.js");

var _core_utils = require("./core_utils.js");

var _xml_parser = require("../shared/xml_parser.js");

var _crypto_metapdf = require("./crypto_metapdf.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function writeDict(dict, buffer, transform) {
  buffer.push("<<");

  var _iterator = _createForOfIteratorHelper(dict.getKeys()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      buffer.push(" /".concat((0, _core_utils.escapePDFName)(key), " "));
      writeValue(dict.getRaw(key), buffer, transform);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  buffer.push(">>");
}

function writeStream(stream, buffer, transform) {
  writeDict(stream.dict, buffer, transform);
  buffer.push(" stream\n");
  var string = (0, _util_metapdf.bytesToString)(stream.getBytes());

  if (transform !== null) {
    string = transform.encryptString(string);
  }

  buffer.push(string);
  buffer.push("\nendstream\n");
}

function writeArray(array, buffer, transform) {
  buffer.push("[");
  var first = true;

  var _iterator2 = _createForOfIteratorHelper(array),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var val = _step2.value;

      if (!first) {
        buffer.push(" ");
      } else {
        first = false;
      }

      writeValue(val, buffer, transform);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  buffer.push("]");
}

function numberToString(value) {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  var roundedValue = Math.round(value * 100);

  if (roundedValue % 100 === 0) {
    return (roundedValue / 100).toString();
  }

  if (roundedValue % 10 === 0) {
    return value.toFixed(1);
  }

  return value.toFixed(2);
}

function writeValue(value, buffer, transform) {
  if ((0, _primitives.isName)(value)) {
    buffer.push("/".concat((0, _core_utils.escapePDFName)(value.name)));
  } else if ((0, _primitives.isRef)(value)) {
    buffer.push("".concat(value.num, " ").concat(value.gen, " R"));
  } else if (Array.isArray(value)) {
    writeArray(value, buffer, transform);
  } else if (typeof value === "string") {
    if (transform !== null) {
      value = transform.encryptString(value);
    }

    buffer.push("(".concat((0, _util_metapdf.escapeString)(value), ")"));
  } else if (typeof value === "number") {
    buffer.push(numberToString(value));
  } else if ((0, _primitives.isDict)(value)) {
    writeDict(value, buffer, transform);
  } else if ((0, _primitives.isStream)(value)) {
    writeStream(value, buffer, transform);
  }
}

function writeInt(number, size, offset, buffer) {
  for (var i = size + offset - 1; i > offset - 1; i--) {
    buffer[i] = number & 0xff;
    number >>= 8;
  }

  return offset + size;
}

function writeString(string, offset, buffer) {
  for (var i = 0, len = string.length; i < len; i++) {
    buffer[offset + i] = string.charCodeAt(i) & 0xff;
  }
}

function computeMD5(filesize, xrefInfo) {
  var time = Math.floor(Date.now() / 1000);
  var filename = xrefInfo.filename || "";
  var md5Buffer = [time.toString(), filename, filesize.toString()];
  var md5BufferLen = md5Buffer.reduce(function (a, str) {
    return a + str.length;
  }, 0);

  for (var _i = 0, _Object$values = Object.values(xrefInfo.info); _i < _Object$values.length; _i++) {
    var value = _Object$values[_i];
    md5Buffer.push(value);
    md5BufferLen += value.length;
  }

  var array = new Uint8Array(md5BufferLen);
  var offset = 0;

  for (var _i2 = 0, _md5Buffer = md5Buffer; _i2 < _md5Buffer.length; _i2++) {
    var str = _md5Buffer[_i2];
    writeString(str, offset, array);
    offset += str.length;
  }

  return (0, _util_metapdf.bytesToString)((0, _crypto_metapdf.calculateMD5)(array));
}

function updateXFA(datasetsRef, newRefs, xref) {
  if (datasetsRef === null || xref === null) {
    return;
  }

  var datasets = xref.fetchIfRef(datasetsRef);
  var str = (0, _util_metapdf.bytesToString)(datasets.getBytes());
  var xml = new _xml_parser.SimpleXMLParser(true).parseFromString(str);

  var _iterator3 = _createForOfIteratorHelper(newRefs),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var xfa = _step3.value.xfa;

      if (!xfa) {
        continue;
      }

      var path = xfa.path,
          value = xfa.value;

      if (!path) {
        continue;
      }

      var node = xml.documentElement.searchNode((0, _core_utils.parseXFAPath)(path), 0);

      if (node) {
        node.childNodes = [new _xml_parser.SimpleDOMNode("#text", value)];
      } else {
        (0, _util_metapdf.warn)("Node not found for path: ".concat(path));
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  var buffer = [];
  xml.documentElement.dump(buffer);
  var updatedXml = buffer.join("");
  var encrypt = xref.encrypt;

  if (encrypt) {
    var transform = encrypt.createCipherTransform(datasetsRef.num, datasetsRef.gen);
    updatedXml = transform.encryptString(updatedXml);
  }

  var data = "".concat(datasetsRef.num, " ").concat(datasetsRef.gen, " obj\n") + "<< /Type /EmbeddedFile /Length ".concat(updatedXml.length, ">>\nstream\n") + updatedXml + "\nendstream\nendobj\n";
  newRefs.push({
    ref: datasetsRef,
    data: data
  });
}

function incrementalUpdate(_ref) {
  var originalData = _ref.originalData,
      xrefInfo = _ref.xrefInfo,
      newRefs = _ref.newRefs,
      _ref$xref = _ref.xref,
      xref = _ref$xref === void 0 ? null : _ref$xref,
      _ref$datasetsRef = _ref.datasetsRef,
      datasetsRef = _ref$datasetsRef === void 0 ? null : _ref$datasetsRef;
  updateXFA(datasetsRef, newRefs, xref);
  var newXref = new _primitives.Dict(null);
  var refForXrefTable = xrefInfo.newRef;
  var buffer, baseOffset;
  var lastByte = originalData[originalData.length - 1];

  if (lastByte === 0x0a || lastByte === 0x0d) {
    buffer = [];
    baseOffset = originalData.length;
  } else {
    buffer = ["\n"];
    baseOffset = originalData.length + 1;
  }

  newXref.set("Size", refForXrefTable.num + 1);
  newXref.set("Prev", xrefInfo.startXRef);
  newXref.set("Type", _primitives.Name.get("XRef"));

  if (xrefInfo.rootRef !== null) {
    newXref.set("Root", xrefInfo.rootRef);
  }

  if (xrefInfo.infoRef !== null) {
    newXref.set("Info", xrefInfo.infoRef);
  }

  if (xrefInfo.encrypt !== null) {
    newXref.set("Encrypt", xrefInfo.encrypt);
  }

  newRefs.push({
    ref: refForXrefTable,
    data: ""
  });
  newRefs = newRefs.sort(function (a, b) {
    return a.ref.num - b.ref.num;
  });
  var xrefTableData = [[0, 1, 0xffff]];
  var indexes = [0, 1];
  var maxOffset = 0;

  var _iterator4 = _createForOfIteratorHelper(newRefs),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _step4$value = _step4.value,
          ref = _step4$value.ref,
          data = _step4$value.data;
      maxOffset = Math.max(maxOffset, baseOffset);
      xrefTableData.push([1, baseOffset, Math.min(ref.gen, 0xffff)]);
      baseOffset += data.length;
      indexes.push(ref.num);
      indexes.push(1);
      buffer.push(data);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  newXref.set("Index", indexes);

  if (xrefInfo.fileIds.length !== 0) {
    var md5 = computeMD5(baseOffset, xrefInfo);
    newXref.set("ID", [xrefInfo.fileIds[0], md5]);
  }

  var offsetSize = Math.ceil(Math.log2(maxOffset) / 8);
  var sizes = [1, offsetSize, 2];
  var structSize = sizes[0] + sizes[1] + sizes[2];
  var tableLength = structSize * xrefTableData.length;
  newXref.set("W", sizes);
  newXref.set("Length", tableLength);
  buffer.push("".concat(refForXrefTable.num, " ").concat(refForXrefTable.gen, " obj\n"));
  writeDict(newXref, buffer, null);
  buffer.push(" stream\n");
  var bufferLen = buffer.reduce(function (a, str) {
    return a + str.length;
  }, 0);
  var footer = "\nendstream\nendobj\nstartxref\n".concat(baseOffset, "\n%%EOF\n");
  var array = new Uint8Array(originalData.length + bufferLen + tableLength + footer.length);
  array.set(originalData);
  var offset = originalData.length;

  var _iterator5 = _createForOfIteratorHelper(buffer),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var str = _step5.value;
      writeString(str, offset, array);
      offset += str.length;
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  for (var _i3 = 0, _xrefTableData = xrefTableData; _i3 < _xrefTableData.length; _i3++) {
    var _xrefTableData$_i = _slicedToArray(_xrefTableData[_i3], 3),
        type = _xrefTableData$_i[0],
        objOffset = _xrefTableData$_i[1],
        gen = _xrefTableData$_i[2];

    offset = writeInt(type, sizes[0], offset, array);
    offset = writeInt(objOffset, sizes[1], offset, array);
    offset = writeInt(gen, sizes[2], offset, array);
  }

  writeString(footer, offset, array);
  return array;
}