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
exports.buildGetDocumentParams = buildGetDocumentParams;
exports.createIdFactory = createIdFactory;
exports.isEmptyObj = isEmptyObj;
exports.TEST_PDFS_PATH = exports.XRefMock = exports.NodeFileReaderFactory = exports.DOMFileReaderFactory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _primitives = require("../../core/primitives.js");

var _document_metapdf = require("../../core/document_metapdf.js");

var _util_metapdf = require("../../shared/util_metapdf.js");

var _is_node = require("../../shared/is_node.js");

var _stream = require("../../core/stream.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DOMFileReaderFactory = /*#__PURE__*/function () {
  function DOMFileReaderFactory() {
    _classCallCheck(this, DOMFileReaderFactory);
  }

  _createClass(DOMFileReaderFactory, null, [{
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
        var response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(params.path);

              case 2:
                response = _context.sent;

                if (response.ok) {
                  _context.next = 5;
                  break;
                }

                throw new Error(response.statusText);

              case 5:
                _context.t0 = Uint8Array;
                _context.next = 8;
                return response.arrayBuffer();

              case 8:
                _context.t1 = _context.sent;
                return _context.abrupt("return", new _context.t0(_context.t1));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }())
  }]);

  return DOMFileReaderFactory;
}();

exports.DOMFileReaderFactory = DOMFileReaderFactory;

var NodeFileReaderFactory = /*#__PURE__*/function () {
  function NodeFileReaderFactory() {
    _classCallCheck(this, NodeFileReaderFactory);
  }

  _createClass(NodeFileReaderFactory, null, [{
    key: "fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params) {
        var fs;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fs = require("fs");
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  fs.readFile(params.path, function (error, data) {
                    if (error || !data) {
                      reject(error || new Error("Empty file for: ".concat(params.path)));
                      return;
                    }

                    resolve(new Uint8Array(data));
                  });
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function fetch(_x3) {
        return _fetch2.apply(this, arguments);
      }

      return fetch;
    }()
  }]);

  return NodeFileReaderFactory;
}();

exports.NodeFileReaderFactory = NodeFileReaderFactory;
var TEST_PDFS_PATH = {
  dom: "../pdfs/",
  node: "./test/pdfs/"
};
exports.TEST_PDFS_PATH = TEST_PDFS_PATH;

function buildGetDocumentParams(filename, options) {
  var params = Object.create(null);

  if (_is_node.isNodeJS) {
    params.url = TEST_PDFS_PATH.node + filename;
  } else {
    params.url = new URL(TEST_PDFS_PATH.dom + filename, window.location).href;
  }

  for (var option in options) {
    params[option] = options[option];
  }

  return params;
}

var XRefMock = /*#__PURE__*/function () {
  function XRefMock(array) {
    _classCallCheck(this, XRefMock);

    this._map = Object.create(null);
    this.stats = {
      streamTypes: Object.create(null),
      fontTypes: Object.create(null)
    };
    this._newRefNum = null;

    for (var key in array) {
      var obj = array[key];
      this._map[obj.ref.toString()] = obj.data;
    }
  }

  _createClass(XRefMock, [{
    key: "getNewRef",
    value: function getNewRef() {
      if (this._newRefNum === null) {
        this._newRefNum = Object.keys(this._map).length;
      }

      return _primitives.Ref.get(this._newRefNum++, 0);
    }
  }, {
    key: "resetNewRef",
    value: function resetNewRef() {
      this.newRef = null;
    }
  }, {
    key: "fetch",
    value: function fetch(ref) {
      return this._map[ref.toString()];
    }
  }, {
    key: "fetchAsync",
    value: function () {
      var _fetchAsync = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ref) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.fetch(ref));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchAsync(_x4) {
        return _fetchAsync.apply(this, arguments);
      }

      return fetchAsync;
    }()
  }, {
    key: "fetchIfRef",
    value: function fetchIfRef(obj) {
      if (!(0, _primitives.isRef)(obj)) {
        return obj;
      }

      return this.fetch(obj);
    }
  }, {
    key: "fetchIfRefAsync",
    value: function () {
      var _fetchIfRefAsync = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(obj) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.fetchIfRef(obj));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchIfRefAsync(_x5) {
        return _fetchIfRefAsync.apply(this, arguments);
      }

      return fetchIfRefAsync;
    }()
  }]);

  return XRefMock;
}();

exports.XRefMock = XRefMock;

function createIdFactory(pageIndex) {
  var pdfManager = {
    get docId() {
      return "d0";
    }

  };
  var stream = new _stream.StringStream("Dummy_PDF_data");
  var pdfDocument = new _document_metapdf.PDFDocument(pdfManager, stream);
  var page = new _document_metapdf.Page({
    pdfManager: pdfDocument.pdfManager,
    xref: pdfDocument.xref,
    pageIndex: pageIndex,
    globalIdFactory: pdfDocument._globalIdFactory
  });
  return page._localIdFactory;
}

function isEmptyObj(obj) {
  (0, _util_metapdf.assert)(_typeof(obj) === "object" && obj !== null, "isEmptyObj - invalid argument.");
  return Object.keys(obj).length === 0;
}