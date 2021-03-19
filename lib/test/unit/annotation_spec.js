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

var _annotation_metapdf = require("../../core/annotation_metapdf.js");

var _util_metapdf = require("../../shared/util_metapdf.js");

var _test_utils = require("./test_utils.js");

var _primitives = require("../../core/primitives.js");

var _parser = require("../../core/parser.js");

var _evaluator_metapdf = require("../../core/evaluator_metapdf.js");

var _stream = require("../../core/stream.js");

var _worker = require("../../core/worker.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

describe("annotation", function () {
  var PDFManagerMock = /*#__PURE__*/function () {
    function PDFManagerMock(params) {
      _classCallCheck(this, PDFManagerMock);

      this.docBaseUrl = params.docBaseUrl || null;
      this.pdfDocument = {
        catalog: {
          acroForm: new _primitives.Dict()
        }
      };
    }

    _createClass(PDFManagerMock, [{
      key: "ensure",
      value: function ensure(obj, prop, args) {
        return new Promise(function (resolve) {
          var value = obj[prop];

          if (typeof value === "function") {
            resolve(value.apply(obj, args));
          } else {
            resolve(value);
          }
        });
      }
    }, {
      key: "ensureCatalog",
      value: function ensureCatalog(prop, args) {
        return this.ensure(this.pdfDocument.catalog, prop, args);
      }
    }, {
      key: "ensureDoc",
      value: function ensureDoc(prop, args) {
        return this.ensure(this.pdfDocument, prop, args);
      }
    }]);

    return PDFManagerMock;
  }();

  function HandlerMock() {
    this.inputs = [];
  }

  HandlerMock.prototype = {
    send: function send(name, data) {
      this.inputs.push({
        name: name,
        data: data
      });
    }
  };
  var pdfManagerMock, idFactoryMock, partialEvaluator;
  beforeAll(function (done) {
    pdfManagerMock = new PDFManagerMock({
      docBaseUrl: null
    });
    idFactoryMock = (0, _test_utils.createIdFactory)(0);
    partialEvaluator = new _evaluator_metapdf.PartialEvaluator({
      xref: new _test_utils.XRefMock(),
      handler: new HandlerMock(),
      pageIndex: 0,
      idFactory: (0, _test_utils.createIdFactory)(0),
      fontCache: new _primitives.RefSetCache()
    });
    done();
  });
  afterAll(function () {
    pdfManagerMock = null;
    idFactoryMock = null;
    partialEvaluator = null;
  });
  describe("AnnotationFactory", function () {
    it("should get id for annotation", function (done) {
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));

      var annotationRef = _primitives.Ref.get(10, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref) {
        var data = _ref.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.id).toEqual("10R");
        done();
      }, done.fail);
    });
    it("should handle, and get fallback IDs for, annotations that are not " + "indirect objects (issue 7569)", function (done) {
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      var xref = new _test_utils.XRefMock();
      var idFactory = (0, _test_utils.createIdFactory)(0);

      var annotation1 = _annotation_metapdf.AnnotationFactory.create(xref, annotationDict, pdfManagerMock, idFactory).then(function (_ref2) {
        var data = _ref2.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.id).toEqual("annot_p0_1");
      });

      var annotation2 = _annotation_metapdf.AnnotationFactory.create(xref, annotationDict, pdfManagerMock, idFactory).then(function (_ref3) {
        var data = _ref3.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.id).toEqual("annot_p0_2");
      });

      Promise.all([annotation1, annotation2]).then(done, done.fail);
    });
    it("should handle missing /Subtype", function (done) {
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));

      var annotationRef = _primitives.Ref.get(1, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref4) {
        var data = _ref4.data;
        expect(data.annotationType).toBeUndefined();
        done();
      }, done.fail);
    });
  });
  describe("getQuadPoints", function () {
    var dict, rect;
    beforeEach(function (done) {
      dict = new _primitives.Dict();
      rect = [];
      done();
    });
    afterEach(function () {
      dict = null;
      rect = null;
    });
    it("should ignore missing quadpoints", function () {
      expect((0, _annotation_metapdf.getQuadPoints)(dict, rect)).toEqual(null);
    });
    it("should ignore non-array values", function () {
      dict.set("QuadPoints", "foo");
      expect((0, _annotation_metapdf.getQuadPoints)(dict, rect)).toEqual(null);
    });
    it("should ignore arrays where the length is not a multiple of eight", function () {
      dict.set("QuadPoints", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect((0, _annotation_metapdf.getQuadPoints)(dict, rect)).toEqual(null);
    });
    it("should ignore quadpoints if one coordinate lies outside the rectangle", function () {
      rect = [10, 10, 20, 20];
      var inputs = [[11, 11, 12, 12, 9, 13, 14, 14], [11, 11, 12, 12, 13, 9, 14, 14], [11, 11, 12, 12, 21, 13, 14, 14], [11, 11, 12, 12, 13, 21, 14, 14]];

      for (var _i = 0, _inputs = inputs; _i < _inputs.length; _i++) {
        var input = _inputs[_i];
        dict.set("QuadPoints", input);
        expect((0, _annotation_metapdf.getQuadPoints)(dict, rect)).toEqual(null);
      }
    });
    it("should process valid quadpoints arrays", function () {
      rect = [10, 10, 20, 20];
      dict.set("QuadPoints", [11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18]);
      expect((0, _annotation_metapdf.getQuadPoints)(dict, rect)).toEqual([[{
        x: 11,
        y: 11
      }, {
        x: 12,
        y: 12
      }, {
        x: 13,
        y: 13
      }, {
        x: 14,
        y: 14
      }], [{
        x: 15,
        y: 15
      }, {
        x: 16,
        y: 16
      }, {
        x: 17,
        y: 17
      }, {
        x: 18,
        y: 18
      }]]);
    });
  });
  describe("Annotation", function () {
    var dict, ref;
    beforeAll(function (done) {
      dict = new _primitives.Dict();
      ref = _primitives.Ref.get(1, 0);
      done();
    });
    afterAll(function () {
      dict = ref = null;
    });
    it("should set and get valid contents", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setContents("Foo bar baz");
      expect(annotation.contents).toEqual("Foo bar baz");
    });
    it("should not set and get invalid contents", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setContents(undefined);
      expect(annotation.contents).toEqual("");
    });
    it("should set and get a valid modification date", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setModificationDate("D:20190422");
      expect(annotation.modificationDate).toEqual("D:20190422");
    });
    it("should not set and get an invalid modification date", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setModificationDate(undefined);
      expect(annotation.modificationDate).toEqual(null);
    });
    it("should set and get flags", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setFlags(13);
      expect(annotation.hasFlag(_util_metapdf.AnnotationFlag.INVISIBLE)).toEqual(true);
      expect(annotation.hasFlag(_util_metapdf.AnnotationFlag.NOZOOM)).toEqual(true);
      expect(annotation.hasFlag(_util_metapdf.AnnotationFlag.PRINT)).toEqual(true);
      expect(annotation.hasFlag(_util_metapdf.AnnotationFlag.READONLY)).toEqual(false);
      expect(annotation.hasFlag(_util_metapdf.AnnotationFlag.HIDDEN)).toEqual(false);
    });
    it("should be viewable and not printable by default", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      expect(annotation.viewable).toEqual(true);
      expect(annotation.printable).toEqual(false);
    });
    it("should set and get a valid rectangle", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setRectangle([117, 694, 164.298, 720]);
      expect(annotation.rectangle).toEqual([117, 694, 164.298, 720]);
    });
    it("should not set and get an invalid rectangle", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setRectangle([117, 694, 164.298]);
      expect(annotation.rectangle).toEqual([0, 0, 0, 0]);
    });
    it("should reject a color if it is not an array", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor("red");
      expect(annotation.color).toEqual(new Uint8ClampedArray([0, 0, 0]));
    });
    it("should set and get a transparent color", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor([]);
      expect(annotation.color).toEqual(null);
    });
    it("should set and get a grayscale color", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor([0.4]);
      expect(annotation.color).toEqual(new Uint8ClampedArray([102, 102, 102]));
    });
    it("should set and get an RGB color", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor([0, 0, 1]);
      expect(annotation.color).toEqual(new Uint8ClampedArray([0, 0, 255]));
    });
    it("should set and get a CMYK color", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor([0.1, 0.92, 0.84, 0.02]);
      expect(annotation.color).toEqual(new Uint8ClampedArray([234, 59, 48]));
    });
    it("should not set and get an invalid color", function () {
      var annotation = new _annotation_metapdf.Annotation({
        dict: dict,
        ref: ref
      });
      annotation.setColor([0.4, 0.6]);
      expect(annotation.color).toEqual(new Uint8ClampedArray([0, 0, 0]));
    });
  });
  describe("AnnotationBorderStyle", function () {
    it("should set and get a valid width", function () {
      var borderStyle = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyle.setWidth(3);
      expect(borderStyle.width).toEqual(3);
    });
    it("should not set and get an invalid width", function () {
      var borderStyle = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyle.setWidth("three");
      expect(borderStyle.width).toEqual(1);
    });
    it("should set the width to zero, when the input is a `Name` (issue 10385)", function () {
      var borderStyleZero = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyleZero.setWidth(_primitives.Name.get("0"));
      var borderStyleFive = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyleFive.setWidth(_primitives.Name.get("5"));
      expect(borderStyleZero.width).toEqual(0);
      expect(borderStyleFive.width).toEqual(0);
    });
    it("should set and get a valid style", function () {
      var borderStyle = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyle.setStyle(_primitives.Name.get("D"));
      expect(borderStyle.style).toEqual(_util_metapdf.AnnotationBorderStyleType.DASHED);
    });
    it("should not set and get an invalid style", function () {
      var borderStyle = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyle.setStyle("Dashed");
      expect(borderStyle.style).toEqual(_util_metapdf.AnnotationBorderStyleType.SOLID);
    });
    it("should set and get a valid dash array", function () {
      var borderStyle = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyle.setDashArray([1, 2, 3]);
      expect(borderStyle.dashArray).toEqual([1, 2, 3]);
    });
    it("should not set and get an invalid dash array", function () {
      var borderStyle = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyle.setDashArray([0, 0]);
      expect(borderStyle.dashArray).toEqual([3]);
    });
    it("should set and get a valid horizontal corner radius", function () {
      var borderStyle = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyle.setHorizontalCornerRadius(3);
      expect(borderStyle.horizontalCornerRadius).toEqual(3);
    });
    it("should not set and get an invalid horizontal corner radius", function () {
      var borderStyle = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyle.setHorizontalCornerRadius("three");
      expect(borderStyle.horizontalCornerRadius).toEqual(0);
    });
    it("should set and get a valid vertical corner radius", function () {
      var borderStyle = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyle.setVerticalCornerRadius(3);
      expect(borderStyle.verticalCornerRadius).toEqual(3);
    });
    it("should not set and get an invalid vertical corner radius", function () {
      var borderStyle = new _annotation_metapdf.AnnotationBorderStyle();
      borderStyle.setVerticalCornerRadius("three");
      expect(borderStyle.verticalCornerRadius).toEqual(0);
    });
  });
  describe("MarkupAnnotation", function () {
    var dict, ref;
    beforeAll(function (done) {
      dict = new _primitives.Dict();
      ref = _primitives.Ref.get(1, 0);
      done();
    });
    afterAll(function () {
      dict = ref = null;
    });
    it("should set and get a valid creation date", function () {
      var markupAnnotation = new _annotation_metapdf.MarkupAnnotation({
        dict: dict,
        ref: ref
      });
      markupAnnotation.setCreationDate("D:20190422");
      expect(markupAnnotation.creationDate).toEqual("D:20190422");
    });
    it("should not set and get an invalid creation date", function () {
      var markupAnnotation = new _annotation_metapdf.MarkupAnnotation({
        dict: dict,
        ref: ref
      });
      markupAnnotation.setCreationDate(undefined);
      expect(markupAnnotation.creationDate).toEqual(null);
    });
    it("should not parse IRT/RT when not defined", function (done) {
      dict.set("Type", _primitives.Name.get("Annot"));
      dict.set("Subtype", _primitives.Name.get("Text"));
      var xref = new _test_utils.XRefMock([{
        ref: ref,
        data: dict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, ref, pdfManagerMock, idFactoryMock).then(function (_ref5) {
        var data = _ref5.data;
        expect(data.inReplyTo).toBeUndefined();
        expect(data.replyType).toBeUndefined();
        done();
      }, done.fail);
    });
    it("should parse IRT and set default RT when not defined.", function (done) {
      var annotationRef = _primitives.Ref.get(819, 0);

      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Text"));

      var replyRef = _primitives.Ref.get(820, 0);

      var replyDict = new _primitives.Dict();
      replyDict.set("Type", _primitives.Name.get("Annot"));
      replyDict.set("Subtype", _primitives.Name.get("Text"));
      replyDict.set("IRT", annotationRef);
      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }, {
        ref: replyRef,
        data: replyDict
      }]);
      annotationDict.assignXref(xref);
      replyDict.assignXref(xref);

      _annotation_metapdf.AnnotationFactory.create(xref, replyRef, pdfManagerMock, idFactoryMock).then(function (_ref6) {
        var data = _ref6.data;
        expect(data.inReplyTo).toEqual(annotationRef.toString());
        expect(data.replyType).toEqual("R");
        done();
      }, done.fail);
    });
    it("should parse IRT/RT for a group type", function (done) {
      var annotationRef = _primitives.Ref.get(819, 0);

      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Text"));
      annotationDict.set("T", "ParentTitle");
      annotationDict.set("Contents", "ParentText");
      annotationDict.set("CreationDate", "D:20180423");
      annotationDict.set("M", "D:20190423");
      annotationDict.set("C", [0, 0, 1]);

      var popupRef = _primitives.Ref.get(820, 0);

      var popupDict = new _primitives.Dict();
      popupDict.set("Type", _primitives.Name.get("Annot"));
      popupDict.set("Subtype", _primitives.Name.get("Popup"));
      popupDict.set("Parent", annotationRef);
      annotationDict.set("Popup", popupRef);

      var replyRef = _primitives.Ref.get(821, 0);

      var replyDict = new _primitives.Dict();
      replyDict.set("Type", _primitives.Name.get("Annot"));
      replyDict.set("Subtype", _primitives.Name.get("Text"));
      replyDict.set("IRT", annotationRef);
      replyDict.set("RT", _primitives.Name.get("Group"));
      replyDict.set("T", "ReplyTitle");
      replyDict.set("Contents", "ReplyText");
      replyDict.set("CreationDate", "D:20180523");
      replyDict.set("M", "D:20190523");
      replyDict.set("C", [0.4]);
      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }, {
        ref: popupRef,
        data: popupDict
      }, {
        ref: replyRef,
        data: replyDict
      }]);
      annotationDict.assignXref(xref);
      popupDict.assignXref(xref);
      replyDict.assignXref(xref);

      _annotation_metapdf.AnnotationFactory.create(xref, replyRef, pdfManagerMock, idFactoryMock).then(function (_ref7) {
        var data = _ref7.data;
        expect(data.inReplyTo).toEqual(annotationRef.toString());
        expect(data.replyType).toEqual("Group");
        expect(data.title).toEqual("ParentTitle");
        expect(data.contents).toEqual("ParentText");
        expect(data.creationDate).toEqual("D:20180423");
        expect(data.modificationDate).toEqual("D:20190423");
        expect(data.color).toEqual(new Uint8ClampedArray([0, 0, 255]));
        expect(data.hasPopup).toEqual(true);
        done();
      }, done.fail);
    });
    it("should parse IRT/RT for a reply type", function (done) {
      var annotationRef = _primitives.Ref.get(819, 0);

      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Text"));
      annotationDict.set("T", "ParentTitle");
      annotationDict.set("Contents", "ParentText");
      annotationDict.set("CreationDate", "D:20180423");
      annotationDict.set("M", "D:20190423");
      annotationDict.set("C", [0, 0, 1]);

      var popupRef = _primitives.Ref.get(820, 0);

      var popupDict = new _primitives.Dict();
      popupDict.set("Type", _primitives.Name.get("Annot"));
      popupDict.set("Subtype", _primitives.Name.get("Popup"));
      popupDict.set("Parent", annotationRef);
      annotationDict.set("Popup", popupRef);

      var replyRef = _primitives.Ref.get(821, 0);

      var replyDict = new _primitives.Dict();
      replyDict.set("Type", _primitives.Name.get("Annot"));
      replyDict.set("Subtype", _primitives.Name.get("Text"));
      replyDict.set("IRT", annotationRef);
      replyDict.set("RT", _primitives.Name.get("R"));
      replyDict.set("T", "ReplyTitle");
      replyDict.set("Contents", "ReplyText");
      replyDict.set("CreationDate", "D:20180523");
      replyDict.set("M", "D:20190523");
      replyDict.set("C", [0.4]);
      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }, {
        ref: popupRef,
        data: popupDict
      }, {
        ref: replyRef,
        data: replyDict
      }]);
      annotationDict.assignXref(xref);
      popupDict.assignXref(xref);
      replyDict.assignXref(xref);

      _annotation_metapdf.AnnotationFactory.create(xref, replyRef, pdfManagerMock, idFactoryMock).then(function (_ref8) {
        var data = _ref8.data;
        expect(data.inReplyTo).toEqual(annotationRef.toString());
        expect(data.replyType).toEqual("R");
        expect(data.title).toEqual("ReplyTitle");
        expect(data.contents).toEqual("ReplyText");
        expect(data.creationDate).toEqual("D:20180523");
        expect(data.modificationDate).toEqual("D:20190523");
        expect(data.color).toEqual(new Uint8ClampedArray([102, 102, 102]));
        expect(data.hasPopup).toEqual(false);
        done();
      }, done.fail);
    });
  });
  describe("TextAnnotation", function () {
    it("should not parse state model and state when not defined", function (done) {
      var annotationRef = _primitives.Ref.get(819, 0);

      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Text"));
      annotationDict.set("Contents", "TestText");

      var replyRef = _primitives.Ref.get(820, 0);

      var replyDict = new _primitives.Dict();
      replyDict.set("Type", _primitives.Name.get("Annot"));
      replyDict.set("Subtype", _primitives.Name.get("Text"));
      replyDict.set("IRT", annotationRef);
      replyDict.set("RT", _primitives.Name.get("R"));
      replyDict.set("Contents", "ReplyText");
      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }, {
        ref: replyRef,
        data: replyDict
      }]);
      annotationDict.assignXref(xref);
      replyDict.assignXref(xref);

      _annotation_metapdf.AnnotationFactory.create(xref, replyRef, pdfManagerMock, idFactoryMock).then(function (_ref9) {
        var data = _ref9.data;
        expect(data.stateModel).toBeNull();
        expect(data.state).toBeNull();
        done();
      }, done.fail);
    });
    it("should correctly parse state model and state when defined", function (done) {
      var annotationRef = _primitives.Ref.get(819, 0);

      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Text"));

      var replyRef = _primitives.Ref.get(820, 0);

      var replyDict = new _primitives.Dict();
      replyDict.set("Type", _primitives.Name.get("Annot"));
      replyDict.set("Subtype", _primitives.Name.get("Text"));
      replyDict.set("IRT", annotationRef);
      replyDict.set("RT", _primitives.Name.get("R"));
      replyDict.set("StateModel", "Review");
      replyDict.set("State", "Rejected");
      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }, {
        ref: replyRef,
        data: replyDict
      }]);
      annotationDict.assignXref(xref);
      replyDict.assignXref(xref);

      _annotation_metapdf.AnnotationFactory.create(xref, replyRef, pdfManagerMock, idFactoryMock).then(function (_ref10) {
        var data = _ref10.data;
        expect(data.stateModel).toEqual("Review");
        expect(data.state).toEqual("Rejected");
        done();
      }, done.fail);
    });
  });
  describe("LinkAnnotation", function () {
    it("should correctly parse a URI action", function (done) {
      var actionDict = new _primitives.Dict();
      actionDict.set("Type", _primitives.Name.get("Action"));
      actionDict.set("S", _primitives.Name.get("URI"));
      actionDict.set("URI", "http://www.ctan.org/tex-archive/info/lshort");
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("A", actionDict);

      var annotationRef = _primitives.Ref.get(820, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref11) {
        var data = _ref11.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toEqual("http://www.ctan.org/tex-archive/info/lshort");
        expect(data.unsafeUrl).toEqual("http://www.ctan.org/tex-archive/info/lshort");
        expect(data.dest).toBeUndefined();
        done();
      }, done.fail);
    });
    it("should correctly parse a URI action, where the URI entry " + "is missing a protocol", function (done) {
      var actionDict = new _primitives.Dict();
      actionDict.set("Type", _primitives.Name.get("Action"));
      actionDict.set("S", _primitives.Name.get("URI"));
      actionDict.set("URI", "www.hmrc.gov.uk");
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("A", actionDict);

      var annotationRef = _primitives.Ref.get(353, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref12) {
        var data = _ref12.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toEqual("http://www.hmrc.gov.uk/");
        expect(data.unsafeUrl).toEqual("http://www.hmrc.gov.uk");
        expect(data.dest).toBeUndefined();
        done();
      }, done.fail);
    });
    it("should correctly parse a URI action, where the URI entry " + "has an incorrect encoding (bug 1122280)", function (done) {
      var actionStream = new _stream.StringStream("<<\n" + "/Type /Action\n" + "/S /URI\n" + "/URI (http://www.example.com/\\303\\274\\303\\266\\303\\244)\n" + ">>\n");
      var parser = new _parser.Parser({
        lexer: new _parser.Lexer(actionStream),
        xref: null
      });
      var actionDict = parser.getObj();
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("A", actionDict);

      var annotationRef = _primitives.Ref.get(8, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref13) {
        var data = _ref13.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toEqual(new URL((0, _util_metapdf.stringToUTF8String)("http://www.example.com/\xC3\xBC\xC3\xB6\xC3\xA4")).href);
        expect(data.unsafeUrl).toEqual((0, _util_metapdf.stringToUTF8String)("http://www.example.com/\xC3\xBC\xC3\xB6\xC3\xA4"));
        expect(data.dest).toBeUndefined();
        done();
      }, done.fail);
    });
    it("should correctly parse a GoTo action", function (done) {
      var actionDict = new _primitives.Dict();
      actionDict.set("Type", _primitives.Name.get("Action"));
      actionDict.set("S", _primitives.Name.get("GoTo"));
      actionDict.set("D", "page.157");
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("A", actionDict);

      var annotationRef = _primitives.Ref.get(798, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref14) {
        var data = _ref14.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toBeUndefined();
        expect(data.unsafeUrl).toBeUndefined();
        expect(data.dest).toEqual("page.157");
        done();
      }, done.fail);
    });
    it("should correctly parse a GoToR action, where the FileSpec entry " + "is a string containing a relative URL", function (done) {
      var actionDict = new _primitives.Dict();
      actionDict.set("Type", _primitives.Name.get("Action"));
      actionDict.set("S", _primitives.Name.get("GoToR"));
      actionDict.set("F", "../../0013/001346/134685E.pdf");
      actionDict.set("D", "4.3");
      actionDict.set("NewWindow", true);
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("A", actionDict);

      var annotationRef = _primitives.Ref.get(489, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref15) {
        var data = _ref15.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toBeUndefined();
        expect(data.unsafeUrl).toEqual("../../0013/001346/134685E.pdf#4.3");
        expect(data.dest).toBeUndefined();
        expect(data.newWindow).toEqual(true);
        done();
      }, done.fail);
    });
    it("should correctly parse a GoToR action, containing a relative URL, " + 'with the "docBaseUrl" parameter specified', function (done) {
      var actionDict = new _primitives.Dict();
      actionDict.set("Type", _primitives.Name.get("Action"));
      actionDict.set("S", _primitives.Name.get("GoToR"));
      actionDict.set("F", "../../0013/001346/134685E.pdf");
      actionDict.set("D", "4.3");
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("A", actionDict);

      var annotationRef = _primitives.Ref.get(489, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);
      var pdfManager = new PDFManagerMock({
        docBaseUrl: "http://www.example.com/test/pdfs/qwerty.pdf"
      });

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManager, idFactoryMock).then(function (_ref16) {
        var data = _ref16.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toEqual("http://www.example.com/0013/001346/134685E.pdf#4.3");
        expect(data.unsafeUrl).toEqual("../../0013/001346/134685E.pdf#4.3");
        expect(data.dest).toBeUndefined();
        done();
      }, done.fail);
    });
    it("should correctly parse a GoToR action, with named destination", function (done) {
      var actionDict = new _primitives.Dict();
      actionDict.set("Type", _primitives.Name.get("Action"));
      actionDict.set("S", _primitives.Name.get("GoToR"));
      actionDict.set("F", "http://www.example.com/test.pdf");
      actionDict.set("D", "15");
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("A", actionDict);

      var annotationRef = _primitives.Ref.get(495, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref17) {
        var data = _ref17.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toEqual("http://www.example.com/test.pdf#15");
        expect(data.unsafeUrl).toEqual("http://www.example.com/test.pdf#15");
        expect(data.dest).toBeUndefined();
        expect(data.newWindow).toBeFalsy();
        done();
      }, done.fail);
    });
    it("should correctly parse a GoToR action, with explicit destination array", function (done) {
      var actionDict = new _primitives.Dict();
      actionDict.set("Type", _primitives.Name.get("Action"));
      actionDict.set("S", _primitives.Name.get("GoToR"));
      actionDict.set("F", "http://www.example.com/test.pdf");
      actionDict.set("D", [14, _primitives.Name.get("XYZ"), null, 298.043, null]);
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("A", actionDict);

      var annotationRef = _primitives.Ref.get(489, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref18) {
        var data = _ref18.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toEqual(new URL("http://www.example.com/test.pdf#" + '[14,{"name":"XYZ"},null,298.043,null]').href);
        expect(data.unsafeUrl).toEqual("http://www.example.com/test.pdf#" + '[14,{"name":"XYZ"},null,298.043,null]');
        expect(data.dest).toBeUndefined();
        expect(data.newWindow).toBeFalsy();
        done();
      }, done.fail);
    });
    it("should correctly parse a Launch action, where the FileSpec dict " + 'contains a relative URL, with the "docBaseUrl" parameter specified', function (done) {
      var fileSpecDict = new _primitives.Dict();
      fileSpecDict.set("Type", _primitives.Name.get("FileSpec"));
      fileSpecDict.set("F", "Part II/Part II.pdf");
      fileSpecDict.set("UF", "Part II/Part II.pdf");
      var actionDict = new _primitives.Dict();
      actionDict.set("Type", _primitives.Name.get("Action"));
      actionDict.set("S", _primitives.Name.get("Launch"));
      actionDict.set("F", fileSpecDict);
      actionDict.set("NewWindow", true);
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("A", actionDict);

      var annotationRef = _primitives.Ref.get(88, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);
      var pdfManager = new PDFManagerMock({
        docBaseUrl: "http://www.example.com/test/pdfs/qwerty.pdf"
      });

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManager, idFactoryMock).then(function (_ref19) {
        var data = _ref19.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toEqual(new URL("http://www.example.com/test/pdfs/Part II/Part II.pdf").href);
        expect(data.unsafeUrl).toEqual("Part II/Part II.pdf");
        expect(data.dest).toBeUndefined();
        expect(data.newWindow).toEqual(true);
        done();
      }, done.fail);
    });
    it("should recover valid URLs from JavaScript actions having certain " + "white-listed formats", function (done) {
      function checkJsAction(params) {
        var jsEntry = params.jsEntry;
        var expectedUrl = params.expectedUrl;
        var expectedUnsafeUrl = params.expectedUnsafeUrl;
        var expectedNewWindow = params.expectedNewWindow;
        var actionDict = new _primitives.Dict();
        actionDict.set("Type", _primitives.Name.get("Action"));
        actionDict.set("S", _primitives.Name.get("JavaScript"));
        actionDict.set("JS", jsEntry);
        var annotationDict = new _primitives.Dict();
        annotationDict.set("Type", _primitives.Name.get("Annot"));
        annotationDict.set("Subtype", _primitives.Name.get("Link"));
        annotationDict.set("A", actionDict);

        var annotationRef = _primitives.Ref.get(46, 0);

        var xref = new _test_utils.XRefMock([{
          ref: annotationRef,
          data: annotationDict
        }]);
        return _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref20) {
          var data = _ref20.data;
          expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
          expect(data.url).toEqual(expectedUrl);
          expect(data.unsafeUrl).toEqual(expectedUnsafeUrl);
          expect(data.dest).toBeUndefined();
          expect(data.newWindow).toEqual(expectedNewWindow);
        });
      }

      var annotation1 = checkJsAction({
        jsEntry: 'function someFun() { return "qwerty"; } someFun();',
        expectedUrl: undefined,
        expectedUnsafeUrl: undefined,
        expectedNewWindow: undefined
      });
      var annotation2 = checkJsAction({
        jsEntry: "window.open('http://www.example.com/test.pdf')",
        expectedUrl: new URL("http://www.example.com/test.pdf").href,
        expectedUnsafeUrl: "http://www.example.com/test.pdf",
        expectedNewWindow: undefined
      });
      var annotation3 = checkJsAction({
        jsEntry: new _stream.StringStream('app.launchURL("http://www.example.com/test.pdf", true)'),
        expectedUrl: new URL("http://www.example.com/test.pdf").href,
        expectedUnsafeUrl: "http://www.example.com/test.pdf",
        expectedNewWindow: true
      });
      Promise.all([annotation1, annotation2, annotation3]).then(done, done.fail);
    });
    it("should correctly parse a Named action", function (done) {
      var actionDict = new _primitives.Dict();
      actionDict.set("Type", _primitives.Name.get("Action"));
      actionDict.set("S", _primitives.Name.get("Named"));
      actionDict.set("N", _primitives.Name.get("GoToPage"));
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("A", actionDict);

      var annotationRef = _primitives.Ref.get(12, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref21) {
        var data = _ref21.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toBeUndefined();
        expect(data.unsafeUrl).toBeUndefined();
        expect(data.action).toEqual("GoToPage");
        done();
      }, done.fail);
    });
    it("should correctly parse a simple Dest", function (done) {
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("Dest", _primitives.Name.get("LI0"));

      var annotationRef = _primitives.Ref.get(583, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref22) {
        var data = _ref22.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toBeUndefined();
        expect(data.unsafeUrl).toBeUndefined();
        expect(data.dest).toEqual("LI0");
        done();
      }, done.fail);
    });
    it("should correctly parse a simple Dest, with explicit destination array", function (done) {
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("Dest", [_primitives.Ref.get(17, 0), _primitives.Name.get("XYZ"), 0, 841.89, null]);

      var annotationRef = _primitives.Ref.get(10, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref23) {
        var data = _ref23.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toBeUndefined();
        expect(data.unsafeUrl).toBeUndefined();
        expect(data.dest).toEqual([{
          num: 17,
          gen: 0
        }, {
          name: "XYZ"
        }, 0, 841.89, null]);
        done();
      }, done.fail);
    });
    it("should correctly parse a Dest, which violates the specification " + "by containing a dictionary", function (done) {
      var destDict = new _primitives.Dict();
      destDict.set("Type", _primitives.Name.get("Action"));
      destDict.set("S", _primitives.Name.get("GoTo"));
      destDict.set("D", "page.157");
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("Dest", destDict);

      var annotationRef = _primitives.Ref.get(798, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref24) {
        var data = _ref24.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.url).toBeUndefined();
        expect(data.unsafeUrl).toBeUndefined();
        expect(data.dest).toEqual("page.157");
        done();
      }, done.fail);
    });
    it("should not set quadpoints if not defined", function (done) {
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));

      var annotationRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref25) {
        var data = _ref25.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.quadPoints).toBeUndefined();
        done();
      }, done.fail);
    });
    it("should set quadpoints if defined", function (done) {
      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Link"));
      annotationDict.set("Rect", [10, 10, 20, 20]);
      annotationDict.set("QuadPoints", [11, 11, 12, 12, 13, 13, 14, 14]);

      var annotationRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, annotationRef, pdfManagerMock, idFactoryMock).then(function (_ref26) {
        var data = _ref26.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINK);
        expect(data.quadPoints).toEqual([[{
          x: 11,
          y: 11
        }, {
          x: 12,
          y: 12
        }, {
          x: 13,
          y: 13
        }, {
          x: 14,
          y: 14
        }]]);
        done();
      }, done.fail);
    });
  });
  describe("WidgetAnnotation", function () {
    var widgetDict;
    beforeEach(function (done) {
      widgetDict = new _primitives.Dict();
      widgetDict.set("Type", _primitives.Name.get("Annot"));
      widgetDict.set("Subtype", _primitives.Name.get("Widget"));
      done();
    });
    afterEach(function () {
      widgetDict = null;
    });
    it("should handle unknown field names", function (done) {
      var widgetRef = _primitives.Ref.get(20, 0);

      var xref = new _test_utils.XRefMock([{
        ref: widgetRef,
        data: widgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, widgetRef, pdfManagerMock, idFactoryMock).then(function (_ref27) {
        var data = _ref27.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.fieldName).toEqual("");
        done();
      }, done.fail);
    });
    it("should construct the field name when there are no ancestors", function (done) {
      widgetDict.set("T", "foo");

      var widgetRef = _primitives.Ref.get(21, 0);

      var xref = new _test_utils.XRefMock([{
        ref: widgetRef,
        data: widgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, widgetRef, pdfManagerMock, idFactoryMock).then(function (_ref28) {
        var data = _ref28.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.fieldName).toEqual("foo");
        done();
      }, done.fail);
    });
    it("should construct the field name when there are ancestors", function (done) {
      var firstParent = new _primitives.Dict();
      firstParent.set("T", "foo");
      var secondParent = new _primitives.Dict();
      secondParent.set("Parent", firstParent);
      secondParent.set("T", "bar");
      widgetDict.set("Parent", secondParent);
      widgetDict.set("T", "baz");

      var widgetRef = _primitives.Ref.get(22, 0);

      var xref = new _test_utils.XRefMock([{
        ref: widgetRef,
        data: widgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, widgetRef, pdfManagerMock, idFactoryMock).then(function (_ref29) {
        var data = _ref29.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.fieldName).toEqual("foo.bar.baz");
        done();
      }, done.fail);
    });
    it("should construct the field name if a parent is not a dictionary " + "(issue 8143)", function (done) {
      var parentDict = new _primitives.Dict();
      parentDict.set("Parent", null);
      parentDict.set("T", "foo");
      widgetDict.set("Parent", parentDict);
      widgetDict.set("T", "bar");

      var widgetRef = _primitives.Ref.get(22, 0);

      var xref = new _test_utils.XRefMock([{
        ref: widgetRef,
        data: widgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, widgetRef, pdfManagerMock, idFactoryMock).then(function (_ref30) {
        var data = _ref30.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.fieldName).toEqual("foo.bar");
        done();
      }, done.fail);
    });
  });
  describe("TextWidgetAnnotation", function () {
    var textWidgetDict, fontRefObj;
    beforeEach(function (done) {
      textWidgetDict = new _primitives.Dict();
      textWidgetDict.set("Type", _primitives.Name.get("Annot"));
      textWidgetDict.set("Subtype", _primitives.Name.get("Widget"));
      textWidgetDict.set("FT", _primitives.Name.get("Tx"));
      var helvDict = new _primitives.Dict();
      helvDict.set("BaseFont", _primitives.Name.get("Helvetica"));
      helvDict.set("Type", _primitives.Name.get("Font"));
      helvDict.set("Subtype", _primitives.Name.get("Type1"));

      var fontRef = _primitives.Ref.get(314, 0);

      fontRefObj = {
        ref: fontRef,
        data: helvDict
      };
      var resourceDict = new _primitives.Dict();
      var fontDict = new _primitives.Dict();
      fontDict.set("Helv", fontRef);
      resourceDict.set("Font", fontDict);
      textWidgetDict.set("DA", "/Helv 5 Tf");
      textWidgetDict.set("DR", resourceDict);
      textWidgetDict.set("Rect", [0, 0, 32, 10]);
      done();
    });
    afterEach(function () {
      textWidgetDict = fontRefObj = null;
    });
    it("should handle unknown text alignment, maximum length and flags", function (done) {
      textWidgetDict.set("DV", "foo");

      var textWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref31) {
        var data = _ref31.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.textAlignment).toEqual(null);
        expect(data.maxLen).toEqual(null);
        expect(data.readOnly).toEqual(false);
        expect(data.hidden).toEqual(false);
        expect(data.multiLine).toEqual(false);
        expect(data.comb).toEqual(false);
        expect(data.defaultFieldValue).toEqual("foo");
        done();
      }, done.fail);
    });
    it("should not set invalid text alignment, maximum length and flags", function (done) {
      textWidgetDict.set("Q", "center");
      textWidgetDict.set("MaxLen", "five");
      textWidgetDict.set("Ff", "readonly");

      var textWidgetRef = _primitives.Ref.get(43, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref32) {
        var data = _ref32.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.textAlignment).toEqual(null);
        expect(data.maxLen).toEqual(null);
        expect(data.readOnly).toEqual(false);
        expect(data.hidden).toEqual(false);
        expect(data.multiLine).toEqual(false);
        expect(data.comb).toEqual(false);
        done();
      }, done.fail);
    });
    it("should set valid text alignment, maximum length and flags", function (done) {
      textWidgetDict.set("Q", 1);
      textWidgetDict.set("MaxLen", 20);
      textWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.READONLY + _util_metapdf.AnnotationFieldFlag.MULTILINE);

      var textWidgetRef = _primitives.Ref.get(84, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref33) {
        var data = _ref33.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.textAlignment).toEqual(1);
        expect(data.maxLen).toEqual(20);
        expect(data.readOnly).toEqual(true);
        expect(data.hidden).toEqual(false);
        expect(data.multiLine).toEqual(true);
        done();
      }, done.fail);
    });
    it("should reject comb fields without a maximum length", function (done) {
      textWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.COMB);

      var textWidgetRef = _primitives.Ref.get(46, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref34) {
        var data = _ref34.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.comb).toEqual(false);
        done();
      }, done.fail);
    });
    it("should accept comb fields with a maximum length", function (done) {
      textWidgetDict.set("MaxLen", 20);
      textWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.COMB);

      var textWidgetRef = _primitives.Ref.get(46, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref35) {
        var data = _ref35.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.comb).toEqual(true);
        done();
      }, done.fail);
    });
    it("should only accept comb fields when the flags are valid", function (done) {
      var invalidFieldFlags = [_util_metapdf.AnnotationFieldFlag.MULTILINE, _util_metapdf.AnnotationFieldFlag.PASSWORD, _util_metapdf.AnnotationFieldFlag.FILESELECT];
      var flags = _util_metapdf.AnnotationFieldFlag.COMB + _util_metapdf.AnnotationFieldFlag.MULTILINE + _util_metapdf.AnnotationFieldFlag.PASSWORD + _util_metapdf.AnnotationFieldFlag.FILESELECT;
      var promise = Promise.resolve();

      for (var i = 0, ii = invalidFieldFlags.length; i <= ii; i++) {
        promise = promise.then(function () {
          textWidgetDict.set("MaxLen", 20);
          textWidgetDict.set("Ff", flags);

          var textWidgetRef = _primitives.Ref.get(93, 0);

          var xref = new _test_utils.XRefMock([{
            ref: textWidgetRef,
            data: textWidgetDict
          }]);
          return _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref36) {
            var data = _ref36.data;
            expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
            var valid = invalidFieldFlags.length === 0;
            expect(data.comb).toEqual(valid);

            if (!valid) {
              flags -= invalidFieldFlags.pop();
            }
          });
        });
      }

      promise.then(done, done.fail);
    });
    it("should render regular text for printing", function (done) {
      var textWidgetRef = _primitives.Ref.get(271, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }, fontRefObj]);
      var task = new _worker.WorkerTask("test print");
      partialEvaluator.xref = xref;

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var id = annotation.data.id;
        var annotationStorage = {};
        annotationStorage[id] = "test\\print";
        return annotation._getAppearance(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (appearance) {
        expect(appearance).toEqual("/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 0 Tm" + " 2.00 2.00 Td (test\\\\print) Tj ET Q EMC");
        done();
      }, done.fail);
    });
    it("should render regular text for printing using normal appearance", function (done) {
      var textWidgetRef = _primitives.Ref.get(271, 0);

      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      var normalAppearanceStream = new _stream.StringStream("0.1 0.2 0.3 rg");
      normalAppearanceStream.dict = normalAppearanceDict;
      appearanceStatesDict.set("N", normalAppearanceStream);
      textWidgetDict.set("AP", appearanceStatesDict);
      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }, fontRefObj]);
      var task = new _worker.WorkerTask("test print");
      partialEvaluator.xref = xref;

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        return annotation.getOperatorList(partialEvaluator, task, false, annotationStorage);
      }).then(function (opList) {
        expect(opList.argsArray.length).toEqual(3);
        expect(opList.fnArray).toEqual([_util_metapdf.OPS.beginAnnotation, _util_metapdf.OPS.setFillRGBColor, _util_metapdf.OPS.endAnnotation]);
        expect(opList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));
        done();
      })["catch"](done.fail);
    });
    it("should render auto-sized text for printing", function (done) {
      textWidgetDict.set("DA", "/Helv 0 Tf");

      var textWidgetRef = _primitives.Ref.get(271, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }, fontRefObj]);
      var task = new _worker.WorkerTask("test print");
      partialEvaluator.xref = xref;

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var id = annotation.data.id;
        var annotationStorage = {};
        annotationStorage[id] = "test (print)";
        return annotation._getAppearance(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (appearance) {
        expect(appearance).toEqual("/Tx BMC q BT /Helv 11 Tf 1 0 0 1 0 0 Tm" + " 2.00 2.00 Td (test \\(print\\)) Tj ET Q EMC");
        done();
      }, done.fail);
    });
    it("should not render a password for printing", function (done) {
      textWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.PASSWORD);

      var textWidgetRef = _primitives.Ref.get(271, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }, fontRefObj]);
      var task = new _worker.WorkerTask("test print");
      partialEvaluator.xref = xref;

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var id = annotation.data.id;
        var annotationStorage = {};
        annotationStorage[id] = "mypassword";
        return annotation._getAppearance(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (appearance) {
        expect(appearance).toEqual(null);
        done();
      }, done.fail);
    });
    it("should render multiline text for printing", function (done) {
      textWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.MULTILINE);

      var textWidgetRef = _primitives.Ref.get(271, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }, fontRefObj]);
      var task = new _worker.WorkerTask("test print");
      partialEvaluator.xref = xref;

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var id = annotation.data.id;
        var annotationStorage = {};
        annotationStorage[id] = "a aa aaa aaaa aaaaa aaaaaa " + "pneumonoultramicroscopicsilicovolcanoconiosis";
        return annotation._getAppearance(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (appearance) {
        expect(appearance).toEqual("/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 10 Tm " + "2.00 -5.00 Td (a aa aaa ) Tj\n" + "0.00 -5.00 Td (aaaa aaaaa ) Tj\n" + "0.00 -5.00 Td (aaaaaa ) Tj\n" + "0.00 -5.00 Td (pneumonoultr) Tj\n" + "0.00 -5.00 Td (amicroscopi) Tj\n" + "0.00 -5.00 Td (csilicovolca) Tj\n" + "0.00 -5.00 Td (noconiosis) Tj ET Q EMC");
        done();
      }, done.fail);
    });
    it("should render multiline text with various EOL for printing", function (done) {
      textWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.MULTILINE);
      textWidgetDict.set("Rect", [0, 0, 128, 10]);

      var textWidgetRef = _primitives.Ref.get(271, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }, fontRefObj]);
      var task = new _worker.WorkerTask("test print");
      partialEvaluator.xref = xref;
      var expectedAppearance = "/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 10 Tm " + "2.00 -5.00 Td " + "(Lorem ipsum dolor sit amet, consectetur adipiscing elit.) Tj\n" + "0.00 -5.00 Td " + "(Aliquam vitae felis ac lectus bibendum ultricies quis non) Tj\n" + "0.00 -5.00 Td " + "( diam.) Tj\n" + "0.00 -5.00 Td " + "(Morbi id porttitor quam, a iaculis dui.) Tj\n" + "0.00 -5.00 Td " + "(Pellentesque habitant morbi tristique senectus et netus ) Tj\n" + "0.00 -5.00 Td " + "(et malesuada fames ac turpis egestas.) Tj\n" + "0.00 -5.00 Td () Tj\n" + "0.00 -5.00 Td () Tj\n" + "0.00 -5.00 Td " + "(Nulla consectetur, ligula in tincidunt placerat, velit ) Tj\n" + "0.00 -5.00 Td " + "(augue consectetur orci, sed mattis libero nunc ut massa.) Tj\n" + "0.00 -5.00 Td " + "(Etiam facilisis tempus interdum.) Tj ET Q EMC";

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var id = annotation.data.id;
        var annotationStorage = {};
        annotationStorage[id] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r" + "Aliquam vitae felis ac lectus bibendum ultricies quis non diam.\n" + "Morbi id porttitor quam, a iaculis dui.\r\n" + "Pellentesque habitant morbi tristique senectus et " + "netus et malesuada fames ac turpis egestas.\n\r\n\r" + "Nulla consectetur, ligula in tincidunt placerat, " + "velit augue consectetur orci, sed mattis libero nunc ut massa.\r" + "Etiam facilisis tempus interdum.";
        return annotation._getAppearance(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (appearance) {
        expect(appearance).toEqual(expectedAppearance);
        done();
      }, done.fail);
    });
    it("should render comb for printing", function (done) {
      textWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.COMB);
      textWidgetDict.set("MaxLen", 4);

      var textWidgetRef = _primitives.Ref.get(271, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }, fontRefObj]);
      var task = new _worker.WorkerTask("test print");
      partialEvaluator.xref = xref;

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var id = annotation.data.id;
        var annotationStorage = {};
        annotationStorage[id] = "aa(aa)a\\";
        return annotation._getAppearance(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (appearance) {
        expect(appearance).toEqual("/Tx BMC q BT /Helv 5 Tf 1 0 0 1 2 2 Tm" + " (a) Tj 8.00 0 Td (a) Tj 8.00 0 Td (\\() Tj" + " 8.00 0 Td (a) Tj 8.00 0 Td (a) Tj" + " 8.00 0 Td (\\)) Tj 8.00 0 Td (a) Tj" + " 8.00 0 Td (\\\\) Tj ET Q EMC");
        done();
      }, done.fail);
    });
    it("should save text", function (done) {
      var textWidgetRef = _primitives.Ref.get(123, 0);

      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }]);
      partialEvaluator.xref = xref;
      var task = new _worker.WorkerTask("test save");

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = "hello world";
        return annotation.save(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (data) {
        expect(data.length).toEqual(2);

        var _data = _slicedToArray(data, 2),
            oldData = _data[0],
            newData = _data[1];

        expect(oldData.ref).toEqual(_primitives.Ref.get(123, 0));
        expect(newData.ref).toEqual(_primitives.Ref.get(1, 0));
        oldData.data = oldData.data.replace(/\(D:[0-9]+\)/, "(date)");
        expect(oldData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Tx /DA (/Helv 5 Tf) /DR " + "<< /Font << /Helv 314 0 R>>>> /Rect [0 0 32 10] " + "/V (hello world) /AP << /N 1 0 R>> /M (date)>>\nendobj\n");
        expect(newData.data).toEqual("1 0 obj\n<< /Length 77 /Subtype /Form /Resources " + "<< /Font << /Helv 314 0 R>>>> /BBox [0 0 32 10]>> stream\n" + "/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 0 Tm 2.00 2.00 Td (hello world) Tj " + "ET Q EMC\nendstream\nendobj\n");
        done();
      }, done.fail);
    });
    it("should get field object for usage in JS sandbox", function (done) {
      var textWidgetRef = _primitives.Ref.get(123, 0);

      var xDictRef = _primitives.Ref.get(141, 0);

      var dDictRef = _primitives.Ref.get(262, 0);

      var next0Ref = _primitives.Ref.get(314, 0);

      var next1Ref = _primitives.Ref.get(271, 0);

      var next2Ref = _primitives.Ref.get(577, 0);

      var next00Ref = _primitives.Ref.get(413, 0);

      var xDict = new _primitives.Dict();
      var dDict = new _primitives.Dict();
      var next0Dict = new _primitives.Dict();
      var next1Dict = new _primitives.Dict();
      var next2Dict = new _primitives.Dict();
      var next00Dict = new _primitives.Dict();
      var xref = new _test_utils.XRefMock([{
        ref: textWidgetRef,
        data: textWidgetDict
      }, {
        ref: xDictRef,
        data: xDict
      }, {
        ref: dDictRef,
        data: dDict
      }, {
        ref: next0Ref,
        data: next0Dict
      }, {
        ref: next00Ref,
        data: next00Dict
      }, {
        ref: next1Ref,
        data: next1Dict
      }, {
        ref: next2Ref,
        data: next2Dict
      }]);

      var JS = _primitives.Name.get("JavaScript");

      var additionalActionsDict = new _primitives.Dict();
      var eDict = new _primitives.Dict();
      eDict.set("JS", "hello()");
      eDict.set("S", JS);
      additionalActionsDict.set("E", eDict);
      xDict.set("JS", "world()");
      xDict.set("S", JS);
      xDict.set("Next", [next0Ref, next1Ref, next2Ref, xDictRef]);
      next0Dict.set("JS", "olleh()");
      next0Dict.set("S", JS);
      next0Dict.set("Next", next00Ref);
      next00Dict.set("JS", "foo()");
      next00Dict.set("S", JS);
      next00Dict.set("Next", next0Ref);
      next1Dict.set("JS", "dlrow()");
      next1Dict.set("S", JS);
      next1Dict.set("Next", xDictRef);
      next2Dict.set("JS", "oof()");
      next2Dict.set("S", JS);
      dDict.set("JS", "bar()");
      dDict.set("S", JS);
      dDict.set("Next", dDictRef);
      additionalActionsDict.set("D", dDictRef);
      additionalActionsDict.set("X", xDictRef);
      textWidgetDict.set("AA", additionalActionsDict);
      partialEvaluator.xref = xref;

      _annotation_metapdf.AnnotationFactory.create(xref, textWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        return annotation.getFieldObject();
      }).then(function (object) {
        var actions = object.actions;
        expect(actions.MouseEnter).toEqual(["hello()"]);
        expect(actions.MouseExit).toEqual(["world()", "olleh()", "foo()", "dlrow()", "oof()"]);
        expect(actions.MouseDown).toEqual(["bar()"]);
        done();
      }, done.fail);
    });
  });
  describe("ButtonWidgetAnnotation", function () {
    var buttonWidgetDict;
    beforeEach(function (done) {
      buttonWidgetDict = new _primitives.Dict();
      buttonWidgetDict.set("Type", _primitives.Name.get("Annot"));
      buttonWidgetDict.set("Subtype", _primitives.Name.get("Widget"));
      buttonWidgetDict.set("FT", _primitives.Name.get("Btn"));
      done();
    });
    afterEach(function () {
      buttonWidgetDict = null;
    });
    it("should handle checkboxes with export value", function (done) {
      buttonWidgetDict.set("V", _primitives.Name.get("1"));
      buttonWidgetDict.set("DV", _primitives.Name.get("2"));
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      normalAppearanceDict.set("Off", 0);
      normalAppearanceDict.set("Checked", 1);
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("AP", appearanceStatesDict);

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref37) {
        var data = _ref37.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.checkBox).toEqual(true);
        expect(data.fieldValue).toEqual("1");
        expect(data.defaultFieldValue).toEqual("2");
        expect(data.radioButton).toEqual(false);
        expect(data.exportValue).toEqual("Checked");
        done();
      }, done.fail);
    });
    it("should handle checkboxes without export value", function (done) {
      buttonWidgetDict.set("V", _primitives.Name.get("1"));
      buttonWidgetDict.set("DV", _primitives.Name.get("2"));

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref38) {
        var data = _ref38.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.checkBox).toEqual(true);
        expect(data.fieldValue).toEqual("1");
        expect(data.defaultFieldValue).toEqual("2");
        expect(data.radioButton).toEqual(false);
        done();
      }, done.fail);
    });
    it("should handle checkboxes without /Off appearance", function (done) {
      buttonWidgetDict.set("V", _primitives.Name.get("1"));
      buttonWidgetDict.set("DV", _primitives.Name.get("2"));
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      normalAppearanceDict.set("Checked", 1);
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("AP", appearanceStatesDict);

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref39) {
        var data = _ref39.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.checkBox).toEqual(true);
        expect(data.fieldValue).toEqual("1");
        expect(data.defaultFieldValue).toEqual("2");
        expect(data.radioButton).toEqual(false);
        expect(data.exportValue).toEqual("Checked");
        done();
      }, done.fail);
    });
    it("should render checkbox with fallback font for printing", function (done) {
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      var checkedAppearanceDict = new _primitives.Dict();
      var uncheckedAppearanceDict = new _primitives.Dict();
      var checkedStream = new _stream.StringStream("/ 12 Tf (4) Tj");
      checkedStream.dict = checkedAppearanceDict;
      var uncheckedStream = new _stream.StringStream("");
      uncheckedStream.dict = uncheckedAppearanceDict;
      checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
      checkedAppearanceDict.set("FormType", 1);
      checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
      normalAppearanceDict.set("Checked", checkedStream);
      normalAppearanceDict.set("Off", uncheckedStream);
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("AP", appearanceStatesDict);

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);
      var task = new _worker.WorkerTask("test print");
      partialEvaluator.options = {
        ignoreErrors: true
      };

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = true;
        return annotation.getOperatorList(partialEvaluator, task, false, annotationStorage);
      }).then(function (opList) {
        expect(opList.argsArray.length).toEqual(5);
        expect(opList.fnArray).toEqual([_util_metapdf.OPS.beginAnnotation, _util_metapdf.OPS.dependency, _util_metapdf.OPS.setFont, _util_metapdf.OPS.showText, _util_metapdf.OPS.endAnnotation]);
        expect(opList.argsArray[3][0][0].fontChar).toEqual("✔");
        done();
      })["catch"](done.fail);
    });
    it("should render checkboxes for printing", function (done) {
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      var checkedAppearanceDict = new _primitives.Dict();
      var uncheckedAppearanceDict = new _primitives.Dict();
      var checkedStream = new _stream.StringStream("0.1 0.2 0.3 rg");
      checkedStream.dict = checkedAppearanceDict;
      var uncheckedStream = new _stream.StringStream("0.3 0.2 0.1 rg");
      uncheckedStream.dict = uncheckedAppearanceDict;
      checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
      checkedAppearanceDict.set("FormType", 1);
      checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
      normalAppearanceDict.set("Checked", checkedStream);
      normalAppearanceDict.set("Off", uncheckedStream);
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("AP", appearanceStatesDict);

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);
      var task = new _worker.WorkerTask("test print");

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = true;
        return Promise.all([annotation, annotation.getOperatorList(partialEvaluator, task, false, annotationStorage)]);
      }, done.fail).then(function (_ref40) {
        var _ref41 = _slicedToArray(_ref40, 2),
            annotation = _ref41[0],
            opList = _ref41[1];

        expect(opList.argsArray.length).toEqual(3);
        expect(opList.fnArray).toEqual([_util_metapdf.OPS.beginAnnotation, _util_metapdf.OPS.setFillRGBColor, _util_metapdf.OPS.endAnnotation]);
        expect(opList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));
        return annotation;
      }, done.fail).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = false;
        return annotation.getOperatorList(partialEvaluator, task, false, annotationStorage);
      }, done.fail).then(function (opList) {
        expect(opList.argsArray.length).toEqual(3);
        expect(opList.fnArray).toEqual([_util_metapdf.OPS.beginAnnotation, _util_metapdf.OPS.setFillRGBColor, _util_metapdf.OPS.endAnnotation]);
        expect(opList.argsArray[1]).toEqual(new Uint8ClampedArray([76, 51, 26]));
        done();
      }, done.fail);
    });
    it("should render checkboxes for printing two times", function (done) {
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      var checkedAppearanceDict = new _primitives.Dict();
      var uncheckedAppearanceDict = new _primitives.Dict();
      var checkedStream = new _stream.StringStream("0.1 0.2 0.3 rg");
      checkedStream.dict = checkedAppearanceDict;
      var uncheckedStream = new _stream.StringStream("0.3 0.2 0.1 rg");
      uncheckedStream.dict = uncheckedAppearanceDict;
      checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
      checkedAppearanceDict.set("FormType", 1);
      checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
      normalAppearanceDict.set("Checked", checkedStream);
      normalAppearanceDict.set("Off", uncheckedStream);
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("AP", appearanceStatesDict);
      buttonWidgetDict.set("AS", _primitives.Name.get("Off"));

      var buttonWidgetRef = _primitives.Ref.get(1249, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);
      var task = new _worker.WorkerTask("test print");

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = true;
        return Promise.all([annotation, annotation.getOperatorList(partialEvaluator, task, false, annotationStorage)]);
      }).then(function (_ref42) {
        var _ref43 = _slicedToArray(_ref42, 2),
            annotation = _ref43[0],
            opList = _ref43[1];

        expect(opList.argsArray.length).toEqual(3);
        expect(opList.fnArray).toEqual([_util_metapdf.OPS.beginAnnotation, _util_metapdf.OPS.setFillRGBColor, _util_metapdf.OPS.endAnnotation]);
        expect(opList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));
        return annotation;
      }).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = true;
        return annotation.getOperatorList(partialEvaluator, task, false, annotationStorage);
      }).then(function (opList) {
        expect(opList.argsArray.length).toEqual(3);
        expect(opList.fnArray).toEqual([_util_metapdf.OPS.beginAnnotation, _util_metapdf.OPS.setFillRGBColor, _util_metapdf.OPS.endAnnotation]);
        expect(opList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));
        done();
      })["catch"](done.fail);
    });
    it("should render checkboxes for printing using normal appearance", function (done) {
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      var checkedAppearanceDict = new _primitives.Dict();
      var uncheckedAppearanceDict = new _primitives.Dict();
      var checkedStream = new _stream.StringStream("0.1 0.2 0.3 rg");
      checkedStream.dict = checkedAppearanceDict;
      var uncheckedStream = new _stream.StringStream("0.3 0.2 0.1 rg");
      uncheckedStream.dict = uncheckedAppearanceDict;
      checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
      checkedAppearanceDict.set("FormType", 1);
      checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
      normalAppearanceDict.set("Checked", checkedStream);
      normalAppearanceDict.set("Off", uncheckedStream);
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("AP", appearanceStatesDict);
      buttonWidgetDict.set("AS", _primitives.Name.get("Checked"));

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);
      var task = new _worker.WorkerTask("test print");

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        return annotation.getOperatorList(partialEvaluator, task, false, annotationStorage);
      }).then(function (opList) {
        expect(opList.argsArray.length).toEqual(3);
        expect(opList.fnArray).toEqual([_util_metapdf.OPS.beginAnnotation, _util_metapdf.OPS.setFillRGBColor, _util_metapdf.OPS.endAnnotation]);
        expect(opList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));
        done();
      })["catch"](done.fail);
    });
    it("should save checkboxes", function (done) {
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      normalAppearanceDict.set("Checked", _primitives.Ref.get(314, 0));
      normalAppearanceDict.set("Off", _primitives.Ref.get(271, 0));
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("AP", appearanceStatesDict);
      buttonWidgetDict.set("V", _primitives.Name.get("Off"));

      var buttonWidgetRef = _primitives.Ref.get(123, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);
      partialEvaluator.xref = xref;
      var task = new _worker.WorkerTask("test save");

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = true;
        return Promise.all([annotation, annotation.save(partialEvaluator, task, annotationStorage)]);
      }, done.fail).then(function (_ref44) {
        var _ref45 = _slicedToArray(_ref44, 2),
            annotation = _ref45[0],
            _ref45$ = _slicedToArray(_ref45[1], 1),
            oldData = _ref45$[0];

        oldData.data = oldData.data.replace(/\(D:[0-9]+\)/, "(date)");
        expect(oldData.ref).toEqual(_primitives.Ref.get(123, 0));
        expect(oldData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Btn " + "/AP << /N << /Checked 314 0 R /Off 271 0 R>>>> " + "/V /Checked /AS /Checked /M (date)>>\nendobj\n");
        return annotation;
      }, done.fail).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = false;
        return annotation.save(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (data) {
        expect(data).toEqual(null);
        done();
      }, done.fail);
    });
    it("should handle radio buttons with a field value", function (done) {
      var parentDict = new _primitives.Dict();
      parentDict.set("V", _primitives.Name.get("1"));
      var normalAppearanceStateDict = new _primitives.Dict();
      normalAppearanceStateDict.set("2", null);
      var appearanceStatesDict = new _primitives.Dict();
      appearanceStatesDict.set("N", normalAppearanceStateDict);
      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.RADIO);
      buttonWidgetDict.set("Parent", parentDict);
      buttonWidgetDict.set("AP", appearanceStatesDict);

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref46) {
        var data = _ref46.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.checkBox).toEqual(false);
        expect(data.radioButton).toEqual(true);
        expect(data.fieldValue).toEqual("1");
        expect(data.buttonValue).toEqual("2");
        done();
      }, done.fail);
    });
    it("should handle radio buttons with a field value not an ascii string", function (done) {
      var parentDict = new _primitives.Dict();
      parentDict.set("V", _primitives.Name.get("\x91I=\x91\xf0\x93\xe0\x97e3"));
      var normalAppearanceStateDict = new _primitives.Dict();
      normalAppearanceStateDict.set("\x91I=\x91\xf0\x93\xe0\x97e3", null);
      var appearanceStatesDict = new _primitives.Dict();
      appearanceStatesDict.set("N", normalAppearanceStateDict);
      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.RADIO);
      buttonWidgetDict.set("Parent", parentDict);
      buttonWidgetDict.set("AP", appearanceStatesDict);

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref47) {
        var data = _ref47.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.checkBox).toEqual(false);
        expect(data.radioButton).toEqual(true);
        expect(data.fieldValue).toEqual("‚I=‚ðﬁàŠe3");
        expect(data.buttonValue).toEqual("‚I=‚ðﬁàŠe3");
        done();
      }, done.fail);
    });
    it("should handle radio buttons without a field value", function (done) {
      var normalAppearanceStateDict = new _primitives.Dict();
      normalAppearanceStateDict.set("2", null);
      var appearanceStatesDict = new _primitives.Dict();
      appearanceStatesDict.set("N", normalAppearanceStateDict);
      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.RADIO);
      buttonWidgetDict.set("AP", appearanceStatesDict);

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref48) {
        var data = _ref48.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.checkBox).toEqual(false);
        expect(data.radioButton).toEqual(true);
        expect(data.fieldValue).toEqual(null);
        expect(data.buttonValue).toEqual("2");
        done();
      }, done.fail);
    });
    it("should render radio buttons for printing", function (done) {
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      var checkedAppearanceDict = new _primitives.Dict();
      var uncheckedAppearanceDict = new _primitives.Dict();
      var checkedStream = new _stream.StringStream("0.1 0.2 0.3 rg");
      checkedStream.dict = checkedAppearanceDict;
      var uncheckedStream = new _stream.StringStream("0.3 0.2 0.1 rg");
      uncheckedStream.dict = uncheckedAppearanceDict;
      checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
      checkedAppearanceDict.set("FormType", 1);
      checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
      normalAppearanceDict.set("Checked", checkedStream);
      normalAppearanceDict.set("Off", uncheckedStream);
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.RADIO);
      buttonWidgetDict.set("AP", appearanceStatesDict);

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);
      var task = new _worker.WorkerTask("test print");

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = true;
        return Promise.all([annotation, annotation.getOperatorList(partialEvaluator, task, false, annotationStorage)]);
      }, done.fail).then(function (_ref49) {
        var _ref50 = _slicedToArray(_ref49, 2),
            annotation = _ref50[0],
            opList = _ref50[1];

        expect(opList.argsArray.length).toEqual(3);
        expect(opList.fnArray).toEqual([_util_metapdf.OPS.beginAnnotation, _util_metapdf.OPS.setFillRGBColor, _util_metapdf.OPS.endAnnotation]);
        expect(opList.argsArray[1]).toEqual(new Uint8ClampedArray([26, 51, 76]));
        return annotation;
      }, done.fail).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = false;
        return annotation.getOperatorList(partialEvaluator, task, false, annotationStorage);
      }, done.fail).then(function (opList) {
        expect(opList.argsArray.length).toEqual(3);
        expect(opList.fnArray).toEqual([_util_metapdf.OPS.beginAnnotation, _util_metapdf.OPS.setFillRGBColor, _util_metapdf.OPS.endAnnotation]);
        expect(opList.argsArray[1]).toEqual(new Uint8ClampedArray([76, 51, 26]));
        done();
      }, done.fail);
    });
    it("should render radio buttons for printing using normal appearance", function (done) {
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      var checkedAppearanceDict = new _primitives.Dict();
      var uncheckedAppearanceDict = new _primitives.Dict();
      var checkedStream = new _stream.StringStream("0.1 0.2 0.3 rg");
      checkedStream.dict = checkedAppearanceDict;
      var uncheckedStream = new _stream.StringStream("0.3 0.2 0.1 rg");
      uncheckedStream.dict = uncheckedAppearanceDict;
      checkedAppearanceDict.set("BBox", [0, 0, 8, 8]);
      checkedAppearanceDict.set("FormType", 1);
      checkedAppearanceDict.set("Matrix", [1, 0, 0, 1, 0, 0]);
      normalAppearanceDict.set("Checked", checkedStream);
      normalAppearanceDict.set("Off", uncheckedStream);
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.RADIO);
      buttonWidgetDict.set("AP", appearanceStatesDict);
      buttonWidgetDict.set("AS", _primitives.Name.get("Off"));

      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);
      var task = new _worker.WorkerTask("test print");

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        return annotation.getOperatorList(partialEvaluator, task, false, annotationStorage);
      }).then(function (opList) {
        expect(opList.argsArray.length).toEqual(3);
        expect(opList.fnArray).toEqual([_util_metapdf.OPS.beginAnnotation, _util_metapdf.OPS.setFillRGBColor, _util_metapdf.OPS.endAnnotation]);
        expect(opList.argsArray[1]).toEqual(new Uint8ClampedArray([76, 51, 26]));
        done();
      })["catch"](done.fail);
    });
    it("should save radio buttons", function (done) {
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      normalAppearanceDict.set("Checked", _primitives.Ref.get(314, 0));
      normalAppearanceDict.set("Off", _primitives.Ref.get(271, 0));
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.RADIO);
      buttonWidgetDict.set("AP", appearanceStatesDict);

      var buttonWidgetRef = _primitives.Ref.get(123, 0);

      var parentRef = _primitives.Ref.get(456, 0);

      var parentDict = new _primitives.Dict();
      parentDict.set("V", _primitives.Name.get("Off"));
      parentDict.set("Kids", [buttonWidgetRef]);
      buttonWidgetDict.set("Parent", parentRef);
      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }, {
        ref: parentRef,
        data: parentDict
      }]);
      parentDict.xref = xref;
      buttonWidgetDict.xref = xref;
      partialEvaluator.xref = xref;
      var task = new _worker.WorkerTask("test save");

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = true;
        return Promise.all([annotation, annotation.save(partialEvaluator, task, annotationStorage)]);
      }, done.fail).then(function (_ref51) {
        var _ref52 = _slicedToArray(_ref51, 2),
            annotation = _ref52[0],
            data = _ref52[1];

        expect(data.length).toEqual(2);

        var _data2 = _slicedToArray(data, 2),
            radioData = _data2[0],
            parentData = _data2[1];

        radioData.data = radioData.data.replace(/\(D:[0-9]+\)/, "(date)");
        expect(radioData.ref).toEqual(_primitives.Ref.get(123, 0));
        expect(radioData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Btn /Ff 32768 " + "/AP << /N << /Checked 314 0 R /Off 271 0 R>>>> " + "/Parent 456 0 R /AS /Checked /M (date)>>\nendobj\n");
        expect(parentData.ref).toEqual(_primitives.Ref.get(456, 0));
        expect(parentData.data).toEqual("456 0 obj\n<< /V /Checked /Kids [123 0 R]>>\nendobj\n");
        return annotation;
      }, done.fail).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = false;
        return annotation.save(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (data) {
        expect(data).toEqual(null);
        done();
      }, done.fail);
    });
    it("should save radio buttons without a field value", function (done) {
      var appearanceStatesDict = new _primitives.Dict();
      var normalAppearanceDict = new _primitives.Dict();
      normalAppearanceDict.set("Checked", _primitives.Ref.get(314, 0));
      normalAppearanceDict.set("Off", _primitives.Ref.get(271, 0));
      appearanceStatesDict.set("N", normalAppearanceDict);
      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.RADIO);
      buttonWidgetDict.set("AP", appearanceStatesDict);

      var buttonWidgetRef = _primitives.Ref.get(123, 0);

      var parentRef = _primitives.Ref.get(456, 0);

      var parentDict = new _primitives.Dict();
      parentDict.set("Kids", [buttonWidgetRef]);
      buttonWidgetDict.set("Parent", parentRef);
      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }, {
        ref: parentRef,
        data: parentDict
      }]);
      parentDict.xref = xref;
      buttonWidgetDict.xref = xref;
      partialEvaluator.xref = xref;
      var task = new _worker.WorkerTask("test save");

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = true;
        return Promise.all([annotation, annotation.save(partialEvaluator, task, annotationStorage)]);
      }).then(function (_ref53) {
        var _ref54 = _slicedToArray(_ref53, 2),
            annotation = _ref54[0],
            data = _ref54[1];

        expect(data.length).toEqual(2);

        var _data3 = _slicedToArray(data, 2),
            radioData = _data3[0],
            parentData = _data3[1];

        radioData.data = radioData.data.replace(/\(D:[0-9]+\)/, "(date)");
        expect(radioData.ref).toEqual(_primitives.Ref.get(123, 0));
        expect(radioData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Btn /Ff 32768 " + "/AP << /N << /Checked 314 0 R /Off 271 0 R>>>> " + "/Parent 456 0 R /AS /Checked /M (date)>>\nendobj\n");
        expect(parentData.ref).toEqual(_primitives.Ref.get(456, 0));
        expect(parentData.data).toEqual("456 0 obj\n<< /Kids [123 0 R] /V /Checked>>\nendobj\n");
        done();
      })["catch"](done.fail);
    });
    it("should save nothing", function (done) {
      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);
      var task = new _worker.WorkerTask("test save");

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        return annotation.save(partialEvaluator, task, {});
      }).then(function (data) {
        expect(data).toEqual(null);
        done();
      })["catch"](done.fail);
    });
    it("should handle push buttons", function (done) {
      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.PUSHBUTTON);
      var actionDict = new _primitives.Dict();
      actionDict.set("S", _primitives.Name.get("JavaScript"));
      actionDict.set("JS", "do_something();");
      buttonWidgetDict.set("A", actionDict);
      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref55) {
        var data = _ref55.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.pushButton).toEqual(true);
        expect(data.actions.Action).toEqual(["do_something();"]);
        done();
      }, done.fail);
    });
    it("should handle push buttons that act as a tooltip only", function (done) {
      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.PUSHBUTTON);
      buttonWidgetDict.set("TU", "An alternative text");
      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref56) {
        var data = _ref56.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.pushButton).toEqual(true);
        expect(data.alternativeText).toEqual("An alternative text");
        done();
      }, done.fail);
    });
    it("should handle URL in A dict in push buttons", function (done) {
      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.PUSHBUTTON);
      var actionDict = new _primitives.Dict();
      actionDict.set("S", _primitives.Name.get("JavaScript"));
      actionDict.set("JS", "app.launchURL('https://developer.mozilla.org/en-US/', true)");
      buttonWidgetDict.set("A", actionDict);
      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref57) {
        var data = _ref57.data;
        expect(data.url).toEqual("https://developer.mozilla.org/en-US/");
        done();
      }, done.fail);
    });
    it("should handle URL in AA dict in push buttons", function (done) {
      var buttonWidgetRef = _primitives.Ref.get(124, 0);

      buttonWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.PUSHBUTTON);
      var dDict = new _primitives.Dict();
      dDict.set("S", _primitives.Name.get("JavaScript"));
      dDict.set("JS", "app.launchURL('https://developer.mozilla.org/en-US/', true)");
      var actionDict = new _primitives.Dict();
      actionDict.set("D", dDict);
      buttonWidgetDict.set("AA", actionDict);
      var xref = new _test_utils.XRefMock([{
        ref: buttonWidgetRef,
        data: buttonWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, buttonWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref58) {
        var data = _ref58.data;
        expect(data.url).toEqual("https://developer.mozilla.org/en-US/");
        done();
      }, done.fail);
    });
  });
  describe("ChoiceWidgetAnnotation", function () {
    var choiceWidgetDict, fontRefObj;
    beforeEach(function (done) {
      choiceWidgetDict = new _primitives.Dict();
      choiceWidgetDict.set("Type", _primitives.Name.get("Annot"));
      choiceWidgetDict.set("Subtype", _primitives.Name.get("Widget"));
      choiceWidgetDict.set("FT", _primitives.Name.get("Ch"));
      var helvDict = new _primitives.Dict();
      helvDict.set("BaseFont", _primitives.Name.get("Helvetica"));
      helvDict.set("Type", _primitives.Name.get("Font"));
      helvDict.set("Subtype", _primitives.Name.get("Type1"));

      var fontRef = _primitives.Ref.get(314, 0);

      fontRefObj = {
        ref: fontRef,
        data: helvDict
      };
      var resourceDict = new _primitives.Dict();
      var fontDict = new _primitives.Dict();
      fontDict.set("Helv", fontRef);
      resourceDict.set("Font", fontDict);
      choiceWidgetDict.set("DA", "/Helv 5 Tf");
      choiceWidgetDict.set("DR", resourceDict);
      choiceWidgetDict.set("Rect", [0, 0, 32, 10]);
      done();
    });
    afterEach(function () {
      choiceWidgetDict = fontRefObj = null;
    });
    it("should handle missing option arrays", function (done) {
      var choiceWidgetRef = _primitives.Ref.get(122, 0);

      var xref = new _test_utils.XRefMock([{
        ref: choiceWidgetRef,
        data: choiceWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref59) {
        var data = _ref59.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.options).toEqual([]);
        done();
      }, done.fail);
    });
    it("should handle option arrays with array elements", function (done) {
      var optionBarRef = _primitives.Ref.get(20, 0);

      var optionBarStr = "Bar";

      var optionOneRef = _primitives.Ref.get(10, 0);

      var optionOneArr = ["bar_export", optionBarRef];
      var options = [["foo_export", "Foo"], optionOneRef];
      var expected = [{
        exportValue: "foo_export",
        displayValue: "Foo"
      }, {
        exportValue: "bar_export",
        displayValue: "Bar"
      }];
      choiceWidgetDict.set("Opt", options);

      var choiceWidgetRef = _primitives.Ref.get(123, 0);

      var xref = new _test_utils.XRefMock([{
        ref: choiceWidgetRef,
        data: choiceWidgetDict
      }, {
        ref: optionBarRef,
        data: optionBarStr
      }, {
        ref: optionOneRef,
        data: optionOneArr
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref60) {
        var data = _ref60.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.options).toEqual(expected);
        done();
      }, done.fail);
    });
    it("should handle option arrays with string elements", function (done) {
      var optionBarRef = _primitives.Ref.get(10, 0);

      var optionBarStr = "Bar";
      var options = ["Foo", optionBarRef];
      var expected = [{
        exportValue: "Foo",
        displayValue: "Foo"
      }, {
        exportValue: "Bar",
        displayValue: "Bar"
      }];
      choiceWidgetDict.set("Opt", options);

      var choiceWidgetRef = _primitives.Ref.get(981, 0);

      var xref = new _test_utils.XRefMock([{
        ref: choiceWidgetRef,
        data: choiceWidgetDict
      }, {
        ref: optionBarRef,
        data: optionBarStr
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref61) {
        var data = _ref61.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.options).toEqual(expected);
        done();
      }, done.fail);
    });
    it("should handle inherited option arrays (issue 8094)", function (done) {
      var options = [["Value1", "Description1"], ["Value2", "Description2"]];
      var expected = [{
        exportValue: "Value1",
        displayValue: "Description1"
      }, {
        exportValue: "Value2",
        displayValue: "Description2"
      }];
      var parentDict = new _primitives.Dict();
      parentDict.set("Opt", options);
      choiceWidgetDict.set("Parent", parentDict);

      var choiceWidgetRef = _primitives.Ref.get(123, 0);

      var xref = new _test_utils.XRefMock([{
        ref: choiceWidgetRef,
        data: choiceWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref62) {
        var data = _ref62.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.options).toEqual(expected);
        done();
      }, done.fail);
    });
    it("should decode form values", function (done) {
      var encodedString = "\xFE\xFF\x00F\x00o\x00o";
      var decodedString = "Foo";
      choiceWidgetDict.set("Opt", [encodedString]);
      choiceWidgetDict.set("V", encodedString);
      choiceWidgetDict.set("DV", _primitives.Name.get("foo"));

      var choiceWidgetRef = _primitives.Ref.get(984, 0);

      var xref = new _test_utils.XRefMock([{
        ref: choiceWidgetRef,
        data: choiceWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref63) {
        var data = _ref63.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.fieldValue).toEqual([decodedString]);
        expect(data.defaultFieldValue).toEqual("foo");
        expect(data.options).toEqual([{
          exportValue: decodedString,
          displayValue: decodedString
        }]);
        done();
      }, done.fail);
    });
    it("should convert the field value to an array", function (done) {
      var inputs = [null, "Foo", ["Foo", "Bar"]];
      var outputs = [[], ["Foo"], ["Foo", "Bar"]];
      var promise = Promise.resolve();

      var _loop = function _loop(i, ii) {
        promise = promise.then(function () {
          choiceWidgetDict.set("V", inputs[i]);

          var choiceWidgetRef = _primitives.Ref.get(968, 0);

          var xref = new _test_utils.XRefMock([{
            ref: choiceWidgetRef,
            data: choiceWidgetDict
          }]);
          return _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref64) {
            var data = _ref64.data;
            expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
            expect(data.fieldValue).toEqual(outputs[i]);
          });
        });
      };

      for (var i = 0, ii = inputs.length; i < ii; i++) {
        _loop(i, ii);
      }

      promise.then(done, done.fail);
    });
    it("should handle unknown flags", function (done) {
      var choiceWidgetRef = _primitives.Ref.get(166, 0);

      var xref = new _test_utils.XRefMock([{
        ref: choiceWidgetRef,
        data: choiceWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref65) {
        var data = _ref65.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.readOnly).toEqual(false);
        expect(data.hidden).toEqual(false);
        expect(data.combo).toEqual(false);
        expect(data.multiSelect).toEqual(false);
        done();
      }, done.fail);
    });
    it("should not set invalid flags", function (done) {
      choiceWidgetDict.set("Ff", "readonly");

      var choiceWidgetRef = _primitives.Ref.get(165, 0);

      var xref = new _test_utils.XRefMock([{
        ref: choiceWidgetRef,
        data: choiceWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref66) {
        var data = _ref66.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.readOnly).toEqual(false);
        expect(data.hidden).toEqual(false);
        expect(data.combo).toEqual(false);
        expect(data.multiSelect).toEqual(false);
        done();
      }, done.fail);
    });
    it("should set valid flags", function (done) {
      choiceWidgetDict.set("Ff", _util_metapdf.AnnotationFieldFlag.READONLY + _util_metapdf.AnnotationFieldFlag.COMBO + _util_metapdf.AnnotationFieldFlag.MULTISELECT);

      var choiceWidgetRef = _primitives.Ref.get(512, 0);

      var xref = new _test_utils.XRefMock([{
        ref: choiceWidgetRef,
        data: choiceWidgetDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (_ref67) {
        var data = _ref67.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.WIDGET);
        expect(data.readOnly).toEqual(true);
        expect(data.hidden).toEqual(false);
        expect(data.combo).toEqual(true);
        expect(data.multiSelect).toEqual(true);
        done();
      }, done.fail);
    });
    it("should render choice for printing", function (done) {
      var choiceWidgetRef = _primitives.Ref.get(271, 0);

      var xref = new _test_utils.XRefMock([{
        ref: choiceWidgetRef,
        data: choiceWidgetDict
      }, fontRefObj]);
      var task = new _worker.WorkerTask("test print");
      partialEvaluator.xref = xref;

      _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var id = annotation.data.id;
        var annotationStorage = {};
        annotationStorage[id] = "a value";
        return annotation._getAppearance(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (appearance) {
        expect(appearance).toEqual("/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 0 Tm" + " 2.00 2.00 Td (a value) Tj ET Q EMC");
        done();
      }, done.fail);
    });
    it("should save choice", function (done) {
      choiceWidgetDict.set("Opt", ["A", "B", "C"]);
      choiceWidgetDict.set("V", "A");

      var choiceWidgetRef = _primitives.Ref.get(123, 0);

      var xref = new _test_utils.XRefMock([{
        ref: choiceWidgetRef,
        data: choiceWidgetDict
      }]);
      partialEvaluator.xref = xref;
      var task = new _worker.WorkerTask("test save");

      _annotation_metapdf.AnnotationFactory.create(xref, choiceWidgetRef, pdfManagerMock, idFactoryMock).then(function (annotation) {
        var annotationStorage = {};
        annotationStorage[annotation.data.id] = "C";
        return annotation.save(partialEvaluator, task, annotationStorage);
      }, done.fail).then(function (data) {
        expect(data.length).toEqual(2);

        var _data4 = _slicedToArray(data, 2),
            oldData = _data4[0],
            newData = _data4[1];

        expect(oldData.ref).toEqual(_primitives.Ref.get(123, 0));
        expect(newData.ref).toEqual(_primitives.Ref.get(1, 0));
        oldData.data = oldData.data.replace(/\(D:[0-9]+\)/, "(date)");
        expect(oldData.data).toEqual("123 0 obj\n" + "<< /Type /Annot /Subtype /Widget /FT /Ch /DA (/Helv 5 Tf) /DR " + "<< /Font << /Helv 314 0 R>>>> " + "/Rect [0 0 32 10] /Opt [(A) (B) (C)] /V (C) " + "/AP << /N 1 0 R>> /M (date)>>\nendobj\n");
        expect(newData.data).toEqual("1 0 obj\n" + "<< /Length 67 /Subtype /Form /Resources << /Font << /Helv 314 0 R>>>> " + "/BBox [0 0 32 10]>> stream\n" + "/Tx BMC q BT /Helv 5 Tf 1 0 0 1 0 0 Tm 2.00 2.00 Td (C) Tj ET Q EMC\n" + "endstream\nendobj\n");
        done();
      }, done.fail);
    });
  });
  describe("LineAnnotation", function () {
    it("should set the line coordinates", function (done) {
      var lineDict = new _primitives.Dict();
      lineDict.set("Type", _primitives.Name.get("Annot"));
      lineDict.set("Subtype", _primitives.Name.get("Line"));
      lineDict.set("L", [1, 2, 3, 4]);

      var lineRef = _primitives.Ref.get(122, 0);

      var xref = new _test_utils.XRefMock([{
        ref: lineRef,
        data: lineDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, lineRef, pdfManagerMock, idFactoryMock).then(function (_ref68) {
        var data = _ref68.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.LINE);
        expect(data.lineCoordinates).toEqual([1, 2, 3, 4]);
        done();
      }, done.fail);
    });
  });
  describe("FileAttachmentAnnotation", function () {
    it("should correctly parse a file attachment", function (done) {
      var fileStream = new _stream.StringStream("<<\n" + "/Type /EmbeddedFile\n" + "/Subtype /text#2Fplain\n" + ">>\n" + "stream\n" + "Test attachment" + "endstream\n");
      var parser = new _parser.Parser({
        lexer: new _parser.Lexer(fileStream),
        xref: null,
        allowStreams: true
      });

      var fileStreamRef = _primitives.Ref.get(18, 0);

      var fileStreamDict = parser.getObj();
      var embeddedFileDict = new _primitives.Dict();
      embeddedFileDict.set("F", fileStreamRef);

      var fileSpecRef = _primitives.Ref.get(19, 0);

      var fileSpecDict = new _primitives.Dict();
      fileSpecDict.set("Type", _primitives.Name.get("Filespec"));
      fileSpecDict.set("Desc", "");
      fileSpecDict.set("EF", embeddedFileDict);
      fileSpecDict.set("UF", "Test.txt");

      var fileAttachmentRef = _primitives.Ref.get(20, 0);

      var fileAttachmentDict = new _primitives.Dict();
      fileAttachmentDict.set("Type", _primitives.Name.get("Annot"));
      fileAttachmentDict.set("Subtype", _primitives.Name.get("FileAttachment"));
      fileAttachmentDict.set("FS", fileSpecRef);
      fileAttachmentDict.set("T", "Topic");
      fileAttachmentDict.set("Contents", "Test.txt");
      var xref = new _test_utils.XRefMock([{
        ref: fileStreamRef,
        data: fileStreamDict
      }, {
        ref: fileSpecRef,
        data: fileSpecDict
      }, {
        ref: fileAttachmentRef,
        data: fileAttachmentDict
      }]);
      embeddedFileDict.assignXref(xref);
      fileSpecDict.assignXref(xref);
      fileAttachmentDict.assignXref(xref);

      _annotation_metapdf.AnnotationFactory.create(xref, fileAttachmentRef, pdfManagerMock, idFactoryMock).then(function (_ref69) {
        var data = _ref69.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.FILEATTACHMENT);
        expect(data.file.filename).toEqual("Test.txt");
        expect(data.file.content).toEqual((0, _util_metapdf.stringToBytes)("Test attachment"));
        done();
      }, done.fail);
    });
  });
  describe("PopupAnnotation", function () {
    it("should inherit properties from its parent", function (done) {
      var parentDict = new _primitives.Dict();
      parentDict.set("Type", _primitives.Name.get("Annot"));
      parentDict.set("Subtype", _primitives.Name.get("Text"));
      parentDict.set("M", "D:20190423");
      parentDict.set("C", [0, 0, 1]);
      var popupDict = new _primitives.Dict();
      popupDict.set("Type", _primitives.Name.get("Annot"));
      popupDict.set("Subtype", _primitives.Name.get("Popup"));
      popupDict.set("Parent", parentDict);

      var popupRef = _primitives.Ref.get(13, 0);

      var xref = new _test_utils.XRefMock([{
        ref: popupRef,
        data: popupDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, popupRef, pdfManagerMock, idFactoryMock).then(function (_ref70) {
        var data = _ref70.data,
            viewable = _ref70.viewable;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.POPUP);
        expect(data.modificationDate).toEqual("D:20190423");
        expect(data.color).toEqual(new Uint8ClampedArray([0, 0, 255]));
        done();
      }, done.fail);
    });
    it("should handle missing parent properties", function (done) {
      var parentDict = new _primitives.Dict();
      parentDict.set("Type", _primitives.Name.get("Annot"));
      parentDict.set("Subtype", _primitives.Name.get("Text"));
      var popupDict = new _primitives.Dict();
      popupDict.set("Type", _primitives.Name.get("Annot"));
      popupDict.set("Subtype", _primitives.Name.get("Popup"));
      popupDict.set("Parent", parentDict);

      var popupRef = _primitives.Ref.get(13, 0);

      var xref = new _test_utils.XRefMock([{
        ref: popupRef,
        data: popupDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, popupRef, pdfManagerMock, idFactoryMock).then(function (_ref71) {
        var data = _ref71.data,
            viewable = _ref71.viewable;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.POPUP);
        expect(data.modificationDate).toEqual(null);
        expect(data.color).toEqual(null);
        done();
      }, done.fail);
    });
    it("should inherit the parent flags when the Popup is not viewable, " + "but the parent is (PR 7352)", function (done) {
      var parentDict = new _primitives.Dict();
      parentDict.set("Type", _primitives.Name.get("Annot"));
      parentDict.set("Subtype", _primitives.Name.get("Text"));
      parentDict.set("F", 28);
      var popupDict = new _primitives.Dict();
      popupDict.set("Type", _primitives.Name.get("Annot"));
      popupDict.set("Subtype", _primitives.Name.get("Popup"));
      popupDict.set("F", 25);
      popupDict.set("Parent", parentDict);

      var popupRef = _primitives.Ref.get(13, 0);

      var xref = new _test_utils.XRefMock([{
        ref: popupRef,
        data: popupDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, popupRef, pdfManagerMock, idFactoryMock).then(function (_ref72) {
        var data = _ref72.data,
            viewable = _ref72.viewable;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.POPUP);
        expect(data.annotationFlags).toEqual(25);
        expect(viewable).toEqual(true);
        done();
      }, done.fail);
    });
    it("should correctly inherit Contents from group-master annotation " + "if parent has ReplyType == Group", function (done) {
      var annotationRef = _primitives.Ref.get(819, 0);

      var annotationDict = new _primitives.Dict();
      annotationDict.set("Type", _primitives.Name.get("Annot"));
      annotationDict.set("Subtype", _primitives.Name.get("Text"));
      annotationDict.set("T", "Correct Title");
      annotationDict.set("Contents", "Correct Text");
      annotationDict.set("M", "D:20190423");
      annotationDict.set("C", [0, 0, 1]);

      var replyRef = _primitives.Ref.get(820, 0);

      var replyDict = new _primitives.Dict();
      replyDict.set("Type", _primitives.Name.get("Annot"));
      replyDict.set("Subtype", _primitives.Name.get("Text"));
      replyDict.set("IRT", annotationRef);
      replyDict.set("RT", _primitives.Name.get("Group"));
      replyDict.set("T", "Reply Title");
      replyDict.set("Contents", "Reply Text");
      replyDict.set("M", "D:20190523");
      replyDict.set("C", [0.4]);

      var popupRef = _primitives.Ref.get(821, 0);

      var popupDict = new _primitives.Dict();
      popupDict.set("Type", _primitives.Name.get("Annot"));
      popupDict.set("Subtype", _primitives.Name.get("Popup"));
      popupDict.set("T", "Wrong Title");
      popupDict.set("Contents", "Wrong Text");
      popupDict.set("Parent", replyRef);
      popupDict.set("M", "D:20190623");
      popupDict.set("C", [0.8]);
      replyDict.set("Popup", popupRef);
      var xref = new _test_utils.XRefMock([{
        ref: annotationRef,
        data: annotationDict
      }, {
        ref: replyRef,
        data: replyDict
      }, {
        ref: popupRef,
        data: popupDict
      }]);
      annotationDict.assignXref(xref);
      popupDict.assignXref(xref);
      replyDict.assignXref(xref);

      _annotation_metapdf.AnnotationFactory.create(xref, popupRef, pdfManagerMock, idFactoryMock).then(function (_ref73) {
        var data = _ref73.data;
        expect(data.title).toEqual("Correct Title");
        expect(data.contents).toEqual("Correct Text");
        expect(data.modificationDate).toEqual("D:20190423");
        expect(data.color).toEqual(new Uint8ClampedArray([0, 0, 255]));
        done();
      }, done.fail);
    });
  });
  describe("InkAnnotation", function () {
    it("should handle a single ink list", function (done) {
      var inkDict = new _primitives.Dict();
      inkDict.set("Type", _primitives.Name.get("Annot"));
      inkDict.set("Subtype", _primitives.Name.get("Ink"));
      inkDict.set("InkList", [[1, 1, 1, 2, 2, 2, 3, 3]]);

      var inkRef = _primitives.Ref.get(142, 0);

      var xref = new _test_utils.XRefMock([{
        ref: inkRef,
        data: inkDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, inkRef, pdfManagerMock, idFactoryMock).then(function (_ref74) {
        var data = _ref74.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.INK);
        expect(data.inkLists.length).toEqual(1);
        expect(data.inkLists[0]).toEqual([{
          x: 1,
          y: 1
        }, {
          x: 1,
          y: 2
        }, {
          x: 2,
          y: 2
        }, {
          x: 3,
          y: 3
        }]);
        done();
      }, done.fail);
    });
    it("should handle multiple ink lists", function (done) {
      var inkDict = new _primitives.Dict();
      inkDict.set("Type", _primitives.Name.get("Annot"));
      inkDict.set("Subtype", _primitives.Name.get("Ink"));
      inkDict.set("InkList", [[1, 1, 1, 2], [3, 3, 4, 5]]);

      var inkRef = _primitives.Ref.get(143, 0);

      var xref = new _test_utils.XRefMock([{
        ref: inkRef,
        data: inkDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, inkRef, pdfManagerMock, idFactoryMock).then(function (_ref75) {
        var data = _ref75.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.INK);
        expect(data.inkLists.length).toEqual(2);
        expect(data.inkLists[0]).toEqual([{
          x: 1,
          y: 1
        }, {
          x: 1,
          y: 2
        }]);
        expect(data.inkLists[1]).toEqual([{
          x: 3,
          y: 3
        }, {
          x: 4,
          y: 5
        }]);
        done();
      }, done.fail);
    });
  });
  describe("HightlightAnnotation", function () {
    it("should set quadpoints to null if not defined", function (done) {
      var highlightDict = new _primitives.Dict();
      highlightDict.set("Type", _primitives.Name.get("Annot"));
      highlightDict.set("Subtype", _primitives.Name.get("Highlight"));

      var highlightRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: highlightRef,
        data: highlightDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, highlightRef, pdfManagerMock, idFactoryMock).then(function (_ref76) {
        var data = _ref76.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.HIGHLIGHT);
        expect(data.quadPoints).toEqual(null);
        done();
      }, done.fail);
    });
    it("should set quadpoints if defined", function (done) {
      var highlightDict = new _primitives.Dict();
      highlightDict.set("Type", _primitives.Name.get("Annot"));
      highlightDict.set("Subtype", _primitives.Name.get("Highlight"));
      highlightDict.set("Rect", [10, 10, 20, 20]);
      highlightDict.set("QuadPoints", [11, 11, 12, 12, 13, 13, 14, 14]);

      var highlightRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: highlightRef,
        data: highlightDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, highlightRef, pdfManagerMock, idFactoryMock).then(function (_ref77) {
        var data = _ref77.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.HIGHLIGHT);
        expect(data.quadPoints).toEqual([[{
          x: 11,
          y: 11
        }, {
          x: 12,
          y: 12
        }, {
          x: 13,
          y: 13
        }, {
          x: 14,
          y: 14
        }]]);
        done();
      }, done.fail);
    });
    it("should set quadpoints to null when empty", function (done) {
      var highlightDict = new _primitives.Dict();
      highlightDict.set("Type", _primitives.Name.get("Annot"));
      highlightDict.set("Subtype", _primitives.Name.get("Highlight"));
      highlightDict.set("Rect", [10, 10, 20, 20]);
      highlightDict.set("QuadPoints", []);

      var highlightRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: highlightRef,
        data: highlightDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, highlightRef, pdfManagerMock, idFactoryMock).then(function (_ref78) {
        var data = _ref78.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.HIGHLIGHT);
        expect(data.quadPoints).toEqual(null);
        done();
      }, done.fail);
    });
  });
  describe("UnderlineAnnotation", function () {
    it("should set quadpoints to null if not defined", function (done) {
      var underlineDict = new _primitives.Dict();
      underlineDict.set("Type", _primitives.Name.get("Annot"));
      underlineDict.set("Subtype", _primitives.Name.get("Underline"));

      var underlineRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: underlineRef,
        data: underlineDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, underlineRef, pdfManagerMock, idFactoryMock).then(function (_ref79) {
        var data = _ref79.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.UNDERLINE);
        expect(data.quadPoints).toEqual(null);
        done();
      }, done.fail);
    });
    it("should set quadpoints if defined", function (done) {
      var underlineDict = new _primitives.Dict();
      underlineDict.set("Type", _primitives.Name.get("Annot"));
      underlineDict.set("Subtype", _primitives.Name.get("Underline"));
      underlineDict.set("Rect", [10, 10, 20, 20]);
      underlineDict.set("QuadPoints", [11, 11, 12, 12, 13, 13, 14, 14]);

      var underlineRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: underlineRef,
        data: underlineDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, underlineRef, pdfManagerMock, idFactoryMock).then(function (_ref80) {
        var data = _ref80.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.UNDERLINE);
        expect(data.quadPoints).toEqual([[{
          x: 11,
          y: 11
        }, {
          x: 12,
          y: 12
        }, {
          x: 13,
          y: 13
        }, {
          x: 14,
          y: 14
        }]]);
        done();
      }, done.fail);
    });
  });
  describe("SquigglyAnnotation", function () {
    it("should set quadpoints to null if not defined", function (done) {
      var squigglyDict = new _primitives.Dict();
      squigglyDict.set("Type", _primitives.Name.get("Annot"));
      squigglyDict.set("Subtype", _primitives.Name.get("Squiggly"));

      var squigglyRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: squigglyRef,
        data: squigglyDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, squigglyRef, pdfManagerMock, idFactoryMock).then(function (_ref81) {
        var data = _ref81.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.SQUIGGLY);
        expect(data.quadPoints).toEqual(null);
        done();
      }, done.fail);
    });
    it("should set quadpoints if defined", function (done) {
      var squigglyDict = new _primitives.Dict();
      squigglyDict.set("Type", _primitives.Name.get("Annot"));
      squigglyDict.set("Subtype", _primitives.Name.get("Squiggly"));
      squigglyDict.set("Rect", [10, 10, 20, 20]);
      squigglyDict.set("QuadPoints", [11, 11, 12, 12, 13, 13, 14, 14]);

      var squigglyRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: squigglyRef,
        data: squigglyDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, squigglyRef, pdfManagerMock, idFactoryMock).then(function (_ref82) {
        var data = _ref82.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.SQUIGGLY);
        expect(data.quadPoints).toEqual([[{
          x: 11,
          y: 11
        }, {
          x: 12,
          y: 12
        }, {
          x: 13,
          y: 13
        }, {
          x: 14,
          y: 14
        }]]);
        done();
      }, done.fail);
    });
  });
  describe("StrikeOutAnnotation", function () {
    it("should set quadpoints to null if not defined", function (done) {
      var strikeOutDict = new _primitives.Dict();
      strikeOutDict.set("Type", _primitives.Name.get("Annot"));
      strikeOutDict.set("Subtype", _primitives.Name.get("StrikeOut"));

      var strikeOutRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: strikeOutRef,
        data: strikeOutDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, strikeOutRef, pdfManagerMock, idFactoryMock).then(function (_ref83) {
        var data = _ref83.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.STRIKEOUT);
        expect(data.quadPoints).toEqual(null);
        done();
      }, done.fail);
    });
    it("should set quadpoints if defined", function (done) {
      var strikeOutDict = new _primitives.Dict();
      strikeOutDict.set("Type", _primitives.Name.get("Annot"));
      strikeOutDict.set("Subtype", _primitives.Name.get("StrikeOut"));
      strikeOutDict.set("Rect", [10, 10, 20, 20]);
      strikeOutDict.set("QuadPoints", [11, 11, 12, 12, 13, 13, 14, 14]);

      var strikeOutRef = _primitives.Ref.get(121, 0);

      var xref = new _test_utils.XRefMock([{
        ref: strikeOutRef,
        data: strikeOutDict
      }]);

      _annotation_metapdf.AnnotationFactory.create(xref, strikeOutRef, pdfManagerMock, idFactoryMock).then(function (_ref84) {
        var data = _ref84.data;
        expect(data.annotationType).toEqual(_util_metapdf.AnnotationType.STRIKEOUT);
        expect(data.quadPoints).toEqual([[{
          x: 11,
          y: 11
        }, {
          x: 12,
          y: 12
        }, {
          x: 13,
          y: 13
        }, {
          x: 14,
          y: 14
        }]]);
        done();
      }, done.fail);
    });
  });
});