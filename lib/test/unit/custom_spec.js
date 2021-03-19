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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _test_utils = require("./test_utils.js");

var _display_utils = require("../../display/display_utils.js");

var _api_metapdf = require("../../display/api_metapdf.js");

var _is_node = require("../../shared/is_node.js");

var _node_utils = require("../../display/node_utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getTopLeftPixel(canvasContext) {
  var imgData = canvasContext.getImageData(0, 0, 1, 1);
  return {
    r: imgData.data[0],
    g: imgData.data[1],
    b: imgData.data[2],
    a: imgData.data[3]
  };
}

describe("custom canvas rendering", function () {
  var transparentGetDocumentParams = (0, _test_utils.buildGetDocumentParams)("transparent.pdf");
  var CanvasFactory;
  var loadingTask;
  var page;
  beforeAll(function (done) {
    if (_is_node.isNodeJS) {
      CanvasFactory = new _node_utils.NodeCanvasFactory();
    } else {
      CanvasFactory = new _display_utils.DOMCanvasFactory();
    }

    loadingTask = (0, _api_metapdf.getDocument)(transparentGetDocumentParams);
    loadingTask.promise.then(function (doc) {
      return doc.getPage(1);
    }).then(function (data) {
      page = data;
      done();
    })["catch"](done.fail);
  });
  afterAll(function (done) {
    CanvasFactory = null;
    page = null;
    loadingTask.destroy().then(done);
  });
  it("renders to canvas with a default white background", function (done) {
    var viewport = page.getViewport({
      scale: 1
    });
    var canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
    var renderTask = page.render({
      canvasContext: canvasAndCtx.context,
      viewport: viewport
    });
    renderTask.promise.then(function () {
      expect(getTopLeftPixel(canvasAndCtx.context)).toEqual({
        r: 255,
        g: 255,
        b: 255,
        a: 255
      });
      CanvasFactory.destroy(canvasAndCtx);
      done();
    })["catch"](done.fail);
  });
  it("renders to canvas with a custom background", function (done) {
    var viewport = page.getViewport({
      scale: 1
    });
    var canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
    var renderTask = page.render({
      canvasContext: canvasAndCtx.context,
      viewport: viewport,
      background: "rgba(255,0,0,1.0)"
    });
    renderTask.promise.then(function () {
      expect(getTopLeftPixel(canvasAndCtx.context)).toEqual({
        r: 255,
        g: 0,
        b: 0,
        a: 255
      });
      CanvasFactory.destroy(canvasAndCtx);
      done();
    })["catch"](done.fail);
  });
});
describe("custom ownerDocument", function () {
  var FontFace = globalThis.FontFace;

  var checkFont = function checkFont(font) {
    return /g_d\d+_f1/.test(font.family);
  };

  var checkFontFaceRule = function checkFontFaceRule(rule) {
    return /^@font-face {font-family:"g_d\d+_f1";src:/.test(rule);
  };

  beforeEach(function () {
    globalThis.FontFace = function MockFontFace(name) {
      this.family = name;
    };
  });
  afterEach(function () {
    globalThis.FontFace = FontFace;
  });

  function getMocks() {
    var elements = [];

    var createElement = function createElement(name) {
      var element = typeof document !== "undefined" && document.createElement(name);

      if (name === "style") {
        element = {
          tagName: name,
          sheet: {
            cssRules: [],
            insertRule: function insertRule(rule) {
              this.cssRules.push(rule);
            }
          }
        };
        Object.assign(element, {
          remove: function remove() {
            this.remove.called = true;
          }
        });
      }

      elements.push(element);
      return element;
    };

    var ownerDocument = {
      fonts: new Set(),
      createElement: createElement,
      documentElement: {
        getElementsByTagName: function getElementsByTagName() {
          return [{
            appendChild: function appendChild() {}
          }];
        }
      }
    };
    var CanvasFactory = _is_node.isNodeJS ? new _node_utils.NodeCanvasFactory() : new _display_utils.DOMCanvasFactory({
      ownerDocument: ownerDocument
    });
    return {
      elements: elements,
      ownerDocument: ownerDocument,
      CanvasFactory: CanvasFactory
    };
  }

  it("should use given document for loading fonts (with Font Loading API)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _getMocks, ownerDocument, elements, CanvasFactory, getDocumentParams, loadingTask, doc, page, viewport, canvasAndCtx, style;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _getMocks = getMocks(), ownerDocument = _getMocks.ownerDocument, elements = _getMocks.elements, CanvasFactory = _getMocks.CanvasFactory;
            getDocumentParams = (0, _test_utils.buildGetDocumentParams)("TrueType_without_cmap.pdf", {
              disableFontFace: false,
              ownerDocument: ownerDocument
            });
            loadingTask = (0, _api_metapdf.getDocument)(getDocumentParams);
            _context.next = 5;
            return loadingTask.promise;

          case 5:
            doc = _context.sent;
            _context.next = 8;
            return doc.getPage(1);

          case 8:
            page = _context.sent;
            viewport = page.getViewport({
              scale: 1
            });
            canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
            _context.next = 13;
            return page.render({
              canvasContext: canvasAndCtx.context,
              viewport: viewport
            }).promise;

          case 13:
            style = elements.find(function (element) {
              return element.tagName === "style";
            });
            expect(style).toBeFalsy();
            expect(ownerDocument.fonts.size).toBeGreaterThanOrEqual(1);
            expect(Array.from(ownerDocument.fonts).find(checkFont)).toBeTruthy();
            _context.next = 19;
            return doc.destroy();

          case 19:
            _context.next = 21;
            return loadingTask.destroy();

          case 21:
            CanvasFactory.destroy(canvasAndCtx);
            expect(ownerDocument.fonts.size).toBe(0);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("should use given document for loading fonts (with CSS rules)", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var _getMocks2, ownerDocument, elements, CanvasFactory, getDocumentParams, loadingTask, doc, page, viewport, canvasAndCtx, style;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _getMocks2 = getMocks(), ownerDocument = _getMocks2.ownerDocument, elements = _getMocks2.elements, CanvasFactory = _getMocks2.CanvasFactory;
            ownerDocument.fonts = null;
            getDocumentParams = (0, _test_utils.buildGetDocumentParams)("TrueType_without_cmap.pdf", {
              disableFontFace: false,
              ownerDocument: ownerDocument
            });
            loadingTask = (0, _api_metapdf.getDocument)(getDocumentParams);
            _context2.next = 6;
            return loadingTask.promise;

          case 6:
            doc = _context2.sent;
            _context2.next = 9;
            return doc.getPage(1);

          case 9:
            page = _context2.sent;
            viewport = page.getViewport({
              scale: 1
            });
            canvasAndCtx = CanvasFactory.create(viewport.width, viewport.height);
            _context2.next = 14;
            return page.render({
              canvasContext: canvasAndCtx.context,
              viewport: viewport
            }).promise;

          case 14:
            style = elements.find(function (element) {
              return element.tagName === "style";
            });
            expect(style.sheet.cssRules.length).toBeGreaterThanOrEqual(1);
            expect(style.sheet.cssRules.find(checkFontFaceRule)).toBeTruthy();
            _context2.next = 19;
            return doc.destroy();

          case 19:
            _context2.next = 21;
            return loadingTask.destroy();

          case 21:
            CanvasFactory.destroy(canvasAndCtx);
            expect(style.remove.called).toBe(true);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});