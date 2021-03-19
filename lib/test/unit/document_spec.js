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

var _primitives = require("../../core/primitives.js");

var _document_metapdf = require("../../core/document_metapdf.js");

var _stream = require("../../core/stream.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("document", function () {
  describe("Page", function () {
    it("should create correct objId/fontId using the idFactory", function () {
      var idFactory1 = (0, _test_utils.createIdFactory)(0);
      var idFactory2 = (0, _test_utils.createIdFactory)(1);
      expect(idFactory1.createObjId()).toEqual("p0_1");
      expect(idFactory1.createObjId()).toEqual("p0_2");
      expect(idFactory1.createFontId()).toEqual("f1");
      expect(idFactory1.createFontId()).toEqual("f2");
      expect(idFactory1.getDocId()).toEqual("g_d0");
      expect(idFactory2.createObjId()).toEqual("p1_1");
      expect(idFactory2.createObjId()).toEqual("p1_2");
      expect(idFactory2.createFontId()).toEqual("f1");
      expect(idFactory2.createFontId()).toEqual("f2");
      expect(idFactory2.getDocId()).toEqual("g_d0");
      expect(idFactory1.createObjId()).toEqual("p0_3");
      expect(idFactory1.createObjId()).toEqual("p0_4");
      expect(idFactory1.createFontId()).toEqual("f3");
      expect(idFactory1.createFontId()).toEqual("f4");
      expect(idFactory1.getDocId()).toEqual("g_d0");
    });
  });
  describe("PDFDocument", function () {
    var stream = new _stream.StringStream("Dummy_PDF_data");

    function getDocument(acroForm) {
      var xref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _test_utils.XRefMock();
      var catalog = {
        acroForm: acroForm
      };
      var pdfManager = {
        get docId() {
          return "d0";
        },

        ensureCatalog: function ensureCatalog(prop, args) {
          return pdfManager.ensure(catalog, prop, args);
        },
        ensure: function ensure(obj, prop, args) {
          return new Promise(function (resolve) {
            var value = obj[prop];

            if (typeof value === "function") {
              resolve(value.apply(obj, args));
            } else {
              resolve(value);
            }
          });
        }
      };
      var pdfDocument = new _document_metapdf.PDFDocument(pdfManager, stream);
      pdfDocument.xref = xref;
      pdfDocument.catalog = catalog;
      return pdfDocument;
    }

    it("should get form info when no form data is present", function () {
      var pdfDocument = getDocument(null);
      expect(pdfDocument.formInfo).toEqual({
        hasAcroForm: false,
        hasXfa: false,
        hasFields: false
      });
    });
    it("should get form info when XFA is present", function () {
      var acroForm = new _primitives.Dict();
      acroForm.set("XFA", []);
      var pdfDocument = getDocument(acroForm);
      expect(pdfDocument.formInfo).toEqual({
        hasAcroForm: false,
        hasXfa: false,
        hasFields: false
      });
      acroForm.set("XFA", ["foo", "bar"]);
      pdfDocument = getDocument(acroForm);
      expect(pdfDocument.formInfo).toEqual({
        hasAcroForm: false,
        hasXfa: true,
        hasFields: false
      });
      acroForm.set("XFA", new _stream.StringStream(""));
      pdfDocument = getDocument(acroForm);
      expect(pdfDocument.formInfo).toEqual({
        hasAcroForm: false,
        hasXfa: false,
        hasFields: false
      });
      acroForm.set("XFA", new _stream.StringStream("non-empty"));
      pdfDocument = getDocument(acroForm);
      expect(pdfDocument.formInfo).toEqual({
        hasAcroForm: false,
        hasXfa: true,
        hasFields: false
      });
    });
    it("should get form info when AcroForm is present", function () {
      var acroForm = new _primitives.Dict();
      acroForm.set("Fields", []);
      var pdfDocument = getDocument(acroForm);
      expect(pdfDocument.formInfo).toEqual({
        hasAcroForm: false,
        hasXfa: false,
        hasFields: false
      });
      acroForm.set("Fields", ["foo", "bar"]);
      pdfDocument = getDocument(acroForm);
      expect(pdfDocument.formInfo).toEqual({
        hasAcroForm: true,
        hasXfa: false,
        hasFields: true
      });
      acroForm.set("Fields", ["foo", "bar"]);
      acroForm.set("SigFlags", 2);
      pdfDocument = getDocument(acroForm);
      expect(pdfDocument.formInfo).toEqual({
        hasAcroForm: true,
        hasXfa: false,
        hasFields: true
      });
      var annotationDict = new _primitives.Dict();
      annotationDict.set("FT", _primitives.Name.get("Sig"));
      annotationDict.set("Rect", [0, 0, 0, 0]);

      var annotationRef = _primitives.Ref.get(11, 0);

      var kidsDict = new _primitives.Dict();
      kidsDict.set("Kids", [annotationRef]);

      var kidsRef = _primitives.Ref.get(10, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }, {
        ref: kidsRef,
        data: kidsDict
      }]);
      acroForm.set("Fields", [kidsRef]);
      acroForm.set("SigFlags", 3);
      pdfDocument = getDocument(acroForm, xref);
      expect(pdfDocument.formInfo).toEqual({
        hasAcroForm: false,
        hasXfa: false,
        hasFields: true
      });
    });
    it("should get calculation order array or null", function () {
      var acroForm = new _primitives.Dict();
      var pdfDocument = getDocument(acroForm);
      expect(pdfDocument.calculationOrderIds).toEqual(null);
      acroForm.set("CO", [_primitives.Ref.get(1, 0), _primitives.Ref.get(2, 0), _primitives.Ref.get(3, 0)]);
      pdfDocument = getDocument(acroForm);
      expect(pdfDocument.calculationOrderIds).toEqual(["1R", "2R", "3R"]);
      acroForm.set("CO", []);
      pdfDocument = getDocument(acroForm);
      expect(pdfDocument.calculationOrderIds).toEqual(null);
    });
    it("should get field objects array or null", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var acroForm, pdfDocument, fields, kid1Ref, kid11Ref, kid2Ref, parentRef, allFields, _i, _arr, name, buttonWidgetDict, xref, _i2, _Object$entries, _Object$entries$_i, _name, objs;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              acroForm = new _primitives.Dict();
              pdfDocument = getDocument(acroForm);
              _context.next = 4;
              return pdfDocument.fieldObjects;

            case 4:
              fields = _context.sent;
              expect(fields).toEqual(null);
              acroForm.set("Fields", []);
              pdfDocument = getDocument(acroForm);
              _context.next = 10;
              return pdfDocument.fieldObjects;

            case 10:
              fields = _context.sent;
              expect(fields).toEqual(null);
              kid1Ref = _primitives.Ref.get(314, 0);
              kid11Ref = _primitives.Ref.get(159, 0);
              kid2Ref = _primitives.Ref.get(265, 0);
              parentRef = _primitives.Ref.get(358, 0);
              allFields = Object.create(null);

              for (_i = 0, _arr = ["parent", "kid1", "kid2", "kid11"]; _i < _arr.length; _i++) {
                name = _arr[_i];
                buttonWidgetDict = new _primitives.Dict();
                buttonWidgetDict.set("Type", _primitives.Name.get("Annot"));
                buttonWidgetDict.set("Subtype", _primitives.Name.get("Widget"));
                buttonWidgetDict.set("FT", _primitives.Name.get("Btn"));
                buttonWidgetDict.set("T", name);
                allFields[name] = buttonWidgetDict;
              }

              allFields.kid1.set("Kids", [kid11Ref]);
              allFields.parent.set("Kids", [kid1Ref, kid2Ref]);
              xref = new _test_utils.XRefMock([{
                ref: parentRef,
                data: allFields.parent
              }, {
                ref: kid1Ref,
                data: allFields.kid1
              }, {
                ref: kid11Ref,
                data: allFields.kid11
              }, {
                ref: kid2Ref,
                data: allFields.kid2
              }]);
              acroForm.set("Fields", [parentRef]);
              pdfDocument = getDocument(acroForm, xref);
              _context.next = 25;
              return pdfDocument.fieldObjects;

            case 25:
              fields = _context.sent;

              for (_i2 = 0, _Object$entries = Object.entries(fields); _i2 < _Object$entries.length; _i2++) {
                _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2), _name = _Object$entries$_i[0], objs = _Object$entries$_i[1];
                fields[_name] = objs.map(function (obj) {
                  return obj.id;
                });
              }

              expect(fields["parent.kid1"]).toEqual(["314R"]);
              expect(fields["parent.kid1.kid11"]).toEqual(["159R"]);
              expect(fields["parent.kid2"]).toEqual(["265R"]);
              expect(fields.parent).toEqual(["358R"]);

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it("should check if fields have any actions", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var acroForm, pdfDocument, hasJSActions, kid1Ref, kid11Ref, kid2Ref, parentRef, allFields, _i3, _arr2, name, buttonWidgetDict, xref, JS, additionalActionsDict, eDict;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              acroForm = new _primitives.Dict();
              pdfDocument = getDocument(acroForm);
              _context2.next = 4;
              return pdfDocument.hasJSActions;

            case 4:
              hasJSActions = _context2.sent;
              expect(hasJSActions).toEqual(false);
              acroForm.set("Fields", []);
              pdfDocument = getDocument(acroForm);
              _context2.next = 10;
              return pdfDocument.hasJSActions;

            case 10:
              hasJSActions = _context2.sent;
              expect(hasJSActions).toEqual(false);
              kid1Ref = _primitives.Ref.get(314, 0);
              kid11Ref = _primitives.Ref.get(159, 0);
              kid2Ref = _primitives.Ref.get(265, 0);
              parentRef = _primitives.Ref.get(358, 0);
              allFields = Object.create(null);

              for (_i3 = 0, _arr2 = ["parent", "kid1", "kid2", "kid11"]; _i3 < _arr2.length; _i3++) {
                name = _arr2[_i3];
                buttonWidgetDict = new _primitives.Dict();
                buttonWidgetDict.set("Type", _primitives.Name.get("Annot"));
                buttonWidgetDict.set("Subtype", _primitives.Name.get("Widget"));
                buttonWidgetDict.set("FT", _primitives.Name.get("Btn"));
                buttonWidgetDict.set("T", name);
                allFields[name] = buttonWidgetDict;
              }

              allFields.kid1.set("Kids", [kid11Ref]);
              allFields.parent.set("Kids", [kid1Ref, kid2Ref]);
              xref = new _test_utils.XRefMock([{
                ref: parentRef,
                data: allFields.parent
              }, {
                ref: kid1Ref,
                data: allFields.kid1
              }, {
                ref: kid11Ref,
                data: allFields.kid11
              }, {
                ref: kid2Ref,
                data: allFields.kid2
              }]);
              acroForm.set("Fields", [parentRef]);
              pdfDocument = getDocument(acroForm, xref);
              _context2.next = 25;
              return pdfDocument.hasJSActions;

            case 25:
              hasJSActions = _context2.sent;
              expect(hasJSActions).toEqual(false);
              JS = _primitives.Name.get("JavaScript");
              additionalActionsDict = new _primitives.Dict();
              eDict = new _primitives.Dict();
              eDict.set("JS", "hello()");
              eDict.set("S", JS);
              additionalActionsDict.set("E", eDict);
              allFields.kid2.set("AA", additionalActionsDict);
              pdfDocument = getDocument(acroForm, xref);
              _context2.next = 37;
              return pdfDocument.hasJSActions;

            case 37:
              hasJSActions = _context2.sent;
              expect(hasJSActions).toEqual(true);

            case 39:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
});