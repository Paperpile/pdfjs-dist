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

var _primitives = require("../../core/primitives.js");

var _stream = require("../../core/stream.js");

var _test_utils = require("./test_utils.js");

describe("primitives", function () {
  describe("Name", function () {
    it("should retain the given name", function () {
      var givenName = "Font";

      var name = _primitives.Name.get(givenName);

      expect(name.name).toEqual(givenName);
    });
    it("should create only one object for a name and cache it", function () {
      var firstFont = _primitives.Name.get("Font");

      var secondFont = _primitives.Name.get("Font");

      var firstSubtype = _primitives.Name.get("Subtype");

      var secondSubtype = _primitives.Name.get("Subtype");

      expect(firstFont).toBe(secondFont);
      expect(firstSubtype).toBe(secondSubtype);
      expect(firstFont).not.toBe(firstSubtype);
    });
  });
  describe("Cmd", function () {
    it("should retain the given cmd name", function () {
      var givenCmd = "BT";

      var cmd = _primitives.Cmd.get(givenCmd);

      expect(cmd.cmd).toEqual(givenCmd);
    });
    it("should create only one object for a command and cache it", function () {
      var firstBT = _primitives.Cmd.get("BT");

      var secondBT = _primitives.Cmd.get("BT");

      var firstET = _primitives.Cmd.get("ET");

      var secondET = _primitives.Cmd.get("ET");

      expect(firstBT).toBe(secondBT);
      expect(firstET).toBe(secondET);
      expect(firstBT).not.toBe(firstET);
    });
  });
  describe("Dict", function () {
    var checkInvalidHasValues = function checkInvalidHasValues(dict) {
      expect(dict.has()).toBeFalsy();
      expect(dict.has("Prev")).toBeFalsy();
    };

    var checkInvalidKeyValues = function checkInvalidKeyValues(dict) {
      expect(dict.get()).toBeUndefined();
      expect(dict.get("Prev")).toBeUndefined();
      expect(dict.get("Decode", "D")).toBeUndefined();
      expect(dict.get("FontFile", "FontFile2", "FontFile3")).toBeUndefined();
    };

    var emptyDict, dictWithSizeKey, dictWithManyKeys;
    var storedSize = 42;
    var testFontFile = "file1";
    var testFontFile2 = "file2";
    var testFontFile3 = "file3";
    beforeAll(function (done) {
      emptyDict = new _primitives.Dict();
      dictWithSizeKey = new _primitives.Dict();
      dictWithSizeKey.set("Size", storedSize);
      dictWithManyKeys = new _primitives.Dict();
      dictWithManyKeys.set("FontFile", testFontFile);
      dictWithManyKeys.set("FontFile2", testFontFile2);
      dictWithManyKeys.set("FontFile3", testFontFile3);
      done();
    });
    afterAll(function () {
      emptyDict = dictWithSizeKey = dictWithManyKeys = null;
    });
    it("should allow assigning an XRef table after creation", function () {
      var dict = new _primitives.Dict(null);
      expect(dict.xref).toEqual(null);
      var xref = new _test_utils.XRefMock([]);
      dict.assignXref(xref);
      expect(dict.xref).toEqual(xref);
    });
    it("should return correct size", function () {
      var dict = new _primitives.Dict(null);
      expect(dict.size).toEqual(0);
      dict.set("Type", _primitives.Name.get("Page"));
      expect(dict.size).toEqual(1);
      dict.set("Contents", _primitives.Ref.get(10, 0));
      expect(dict.size).toEqual(2);
    });
    it("should return invalid values for unknown keys", function () {
      checkInvalidHasValues(emptyDict);
      checkInvalidKeyValues(emptyDict);
    });
    it("should return correct value for stored Size key", function () {
      expect(dictWithSizeKey.has("Size")).toBeTruthy();
      expect(dictWithSizeKey.get("Size")).toEqual(storedSize);
      expect(dictWithSizeKey.get("Prev", "Size")).toEqual(storedSize);
      expect(dictWithSizeKey.get("Prev", "Root", "Size")).toEqual(storedSize);
    });
    it("should return invalid values for unknown keys when Size key is stored", function () {
      checkInvalidHasValues(dictWithSizeKey);
      checkInvalidKeyValues(dictWithSizeKey);
    });
    it("should not accept to set a key with an undefined value", function () {
      var dict = new _primitives.Dict();
      expect(function () {
        dict.set("Size");
      }).toThrow(new Error('Dict.set: The "value" cannot be undefined.'));
      expect(dict.has("Size")).toBeFalsy();
      checkInvalidKeyValues(dict);
    });
    it("should return correct values for multiple stored keys", function () {
      expect(dictWithManyKeys.has("FontFile")).toBeTruthy();
      expect(dictWithManyKeys.has("FontFile2")).toBeTruthy();
      expect(dictWithManyKeys.has("FontFile3")).toBeTruthy();
      expect(dictWithManyKeys.get("FontFile3")).toEqual(testFontFile3);
      expect(dictWithManyKeys.get("FontFile2", "FontFile3")).toEqual(testFontFile2);
      expect(dictWithManyKeys.get("FontFile", "FontFile2", "FontFile3")).toEqual(testFontFile);
    });
    it("should asynchronously fetch unknown keys", function (done) {
      var keyPromises = [dictWithManyKeys.getAsync("Size"), dictWithSizeKey.getAsync("FontFile", "FontFile2", "FontFile3")];
      Promise.all(keyPromises).then(function (values) {
        expect(values[0]).toBeUndefined();
        expect(values[1]).toBeUndefined();
        done();
      })["catch"](function (reason) {
        done.fail(reason);
      });
    });
    it("should asynchronously fetch correct values for multiple stored keys", function (done) {
      var keyPromises = [dictWithManyKeys.getAsync("FontFile3"), dictWithManyKeys.getAsync("FontFile2", "FontFile3"), dictWithManyKeys.getAsync("FontFile", "FontFile2", "FontFile3")];
      Promise.all(keyPromises).then(function (values) {
        expect(values[0]).toEqual(testFontFile3);
        expect(values[1]).toEqual(testFontFile2);
        expect(values[2]).toEqual(testFontFile);
        done();
      })["catch"](function (reason) {
        done.fail(reason);
      });
    });
    it("should callback for each stored key", function () {
      var callbackSpy = jasmine.createSpy("spy on callback in dictionary");
      dictWithManyKeys.forEach(callbackSpy);
      expect(callbackSpy).toHaveBeenCalled();
      var callbackSpyCalls = callbackSpy.calls;
      expect(callbackSpyCalls.argsFor(0)).toEqual(["FontFile", testFontFile]);
      expect(callbackSpyCalls.argsFor(1)).toEqual(["FontFile2", testFontFile2]);
      expect(callbackSpyCalls.argsFor(2)).toEqual(["FontFile3", testFontFile3]);
      expect(callbackSpyCalls.count()).toEqual(3);
    });
    it("should handle keys pointing to indirect objects, both sync and async", function (done) {
      var fontRef = _primitives.Ref.get(1, 0);

      var xref = new _test_utils.XRefMock([{
        ref: fontRef,
        data: testFontFile
      }]);
      var fontDict = new _primitives.Dict(xref);
      fontDict.set("FontFile", fontRef);
      expect(fontDict.getRaw("FontFile")).toEqual(fontRef);
      expect(fontDict.get("FontFile", "FontFile2", "FontFile3")).toEqual(testFontFile);
      fontDict.getAsync("FontFile", "FontFile2", "FontFile3").then(function (value) {
        expect(value).toEqual(testFontFile);
        done();
      })["catch"](function (reason) {
        done.fail(reason);
      });
    });
    it("should handle arrays containing indirect objects", function () {
      var minCoordRef = _primitives.Ref.get(1, 0);

      var maxCoordRef = _primitives.Ref.get(2, 0);

      var minCoord = 0;
      var maxCoord = 1;
      var xref = new _test_utils.XRefMock([{
        ref: minCoordRef,
        data: minCoord
      }, {
        ref: maxCoordRef,
        data: maxCoord
      }]);
      var xObjectDict = new _primitives.Dict(xref);
      xObjectDict.set("BBox", [minCoord, maxCoord, minCoordRef, maxCoordRef]);
      expect(xObjectDict.get("BBox")).toEqual([minCoord, maxCoord, minCoordRef, maxCoordRef]);
      expect(xObjectDict.getArray("BBox")).toEqual([minCoord, maxCoord, minCoord, maxCoord]);
    });
    it("should get all key names", function () {
      var expectedKeys = ["FontFile", "FontFile2", "FontFile3"];
      var keys = dictWithManyKeys.getKeys();
      expect(keys.sort()).toEqual(expectedKeys);
    });
    it("should get all raw values", function () {
      var expectedRawValues1 = [testFontFile, testFontFile2, testFontFile3];
      var rawValues1 = dictWithManyKeys.getRawValues();
      expect(rawValues1.sort()).toEqual(expectedRawValues1);

      var typeName = _primitives.Name.get("Page");

      var resources = new _primitives.Dict(null),
          resourcesRef = _primitives.Ref.get(5, 0);

      var contents = new _stream.StringStream("data"),
          contentsRef = _primitives.Ref.get(10, 0);

      var xref = new _test_utils.XRefMock([{
        ref: resourcesRef,
        data: resources
      }, {
        ref: contentsRef,
        data: contents
      }]);
      var dict = new _primitives.Dict(xref);
      dict.set("Type", typeName);
      dict.set("Resources", resourcesRef);
      dict.set("Contents", contentsRef);
      var expectedRawValues2 = [contentsRef, resourcesRef, typeName];
      var rawValues2 = dict.getRawValues();
      expect(rawValues2.sort()).toEqual(expectedRawValues2);
    });
    it("should create only one object for Dict.empty", function () {
      var firstDictEmpty = _primitives.Dict.empty;
      var secondDictEmpty = _primitives.Dict.empty;
      expect(firstDictEmpty).toBe(secondDictEmpty);
      expect(firstDictEmpty).not.toBe(emptyDict);
    });
    it("should correctly merge dictionaries", function () {
      var expectedKeys = ["FontFile", "FontFile2", "FontFile3", "Size"];
      var fontFileDict = new _primitives.Dict();
      fontFileDict.set("FontFile", "Type1 font file");

      var mergedDict = _primitives.Dict.merge({
        xref: null,
        dictArray: [dictWithManyKeys, dictWithSizeKey, fontFileDict]
      });

      var mergedKeys = mergedDict.getKeys();
      expect(mergedKeys.sort()).toEqual(expectedKeys);
      expect(mergedDict.get("FontFile")).toEqual(testFontFile);
    });
    it("should correctly merge sub-dictionaries", function () {
      var localFontDict = new _primitives.Dict();
      localFontDict.set("F1", "Local font one");
      var globalFontDict = new _primitives.Dict();
      globalFontDict.set("F1", "Global font one");
      globalFontDict.set("F2", "Global font two");
      globalFontDict.set("F3", "Global font three");
      var localDict = new _primitives.Dict();
      localDict.set("Font", localFontDict);
      var globalDict = new _primitives.Dict();
      globalDict.set("Font", globalFontDict);

      var mergedDict = _primitives.Dict.merge({
        xref: null,
        dictArray: [localDict, globalDict]
      });

      var mergedSubDict = _primitives.Dict.merge({
        xref: null,
        dictArray: [localDict, globalDict],
        mergeSubDicts: true
      });

      var mergedFontDict = mergedDict.get("Font");
      var mergedSubFontDict = mergedSubDict.get("Font");
      expect(mergedFontDict instanceof _primitives.Dict).toEqual(true);
      expect(mergedSubFontDict instanceof _primitives.Dict).toEqual(true);
      var mergedFontDictKeys = mergedFontDict.getKeys();
      var mergedSubFontDictKeys = mergedSubFontDict.getKeys();
      expect(mergedFontDictKeys).toEqual(["F1"]);
      expect(mergedSubFontDictKeys).toEqual(["F1", "F2", "F3"]);
      var mergedFontDictValues = mergedFontDict.getRawValues();
      var mergedSubFontDictValues = mergedSubFontDict.getRawValues();
      expect(mergedFontDictValues).toEqual(["Local font one"]);
      expect(mergedSubFontDictValues).toEqual(["Local font one", "Global font two", "Global font three"]);
    });
  });
  describe("Ref", function () {
    it("should get a string representation", function () {
      var nonZeroRef = _primitives.Ref.get(4, 2);

      expect(nonZeroRef.toString()).toEqual("4R2");

      var zeroRef = _primitives.Ref.get(4, 0);

      expect(zeroRef.toString()).toEqual("4R");
    });
    it("should retain the stored values", function () {
      var storedNum = 4;
      var storedGen = 2;

      var ref = _primitives.Ref.get(storedNum, storedGen);

      expect(ref.num).toEqual(storedNum);
      expect(ref.gen).toEqual(storedGen);
    });
    it("should create only one object for a reference and cache it", function () {
      var firstRef = _primitives.Ref.get(4, 2);

      var secondRef = _primitives.Ref.get(4, 2);

      var firstOtherRef = _primitives.Ref.get(5, 2);

      var secondOtherRef = _primitives.Ref.get(5, 2);

      expect(firstRef).toBe(secondRef);
      expect(firstOtherRef).toBe(secondOtherRef);
      expect(firstRef).not.toBe(firstOtherRef);
    });
  });
  describe("RefSet", function () {
    it("should have a stored value", function () {
      var ref = _primitives.Ref.get(4, 2);

      var refset = new _primitives.RefSet();
      refset.put(ref);
      expect(refset.has(ref)).toBeTruthy();
    });
    it("should not have an unknown value", function () {
      var ref = _primitives.Ref.get(4, 2);

      var refset = new _primitives.RefSet();
      expect(refset.has(ref)).toBeFalsy();
      refset.put(ref);

      var anotherRef = _primitives.Ref.get(2, 4);

      expect(refset.has(anotherRef)).toBeFalsy();
    });
  });
  describe("RefSetCache", function () {
    var ref1 = _primitives.Ref.get(4, 2);

    var ref2 = _primitives.Ref.get(5, 2);

    var obj1 = _primitives.Name.get("foo");

    var obj2 = _primitives.Name.get("bar");

    var cache;
    beforeEach(function (done) {
      cache = new _primitives.RefSetCache();
      done();
    });
    afterEach(function () {
      cache = null;
    });
    it("should put, have and get a value", function () {
      cache.put(ref1, obj1);
      expect(cache.has(ref1)).toBeTruthy();
      expect(cache.has(ref2)).toBeFalsy();
      expect(cache.get(ref1)).toBe(obj1);
    });
    it("should put, have and get a value by alias", function () {
      cache.put(ref1, obj1);
      cache.putAlias(ref2, ref1);
      expect(cache.has(ref1)).toBeTruthy();
      expect(cache.has(ref2)).toBeTruthy();
      expect(cache.get(ref1)).toBe(obj1);
      expect(cache.get(ref2)).toBe(obj1);
    });
    it("should report the size of the cache", function () {
      cache.put(ref1, obj1);
      expect(cache.size).toEqual(1);
      cache.put(ref2, obj2);
      expect(cache.size).toEqual(2);
    });
    it("should clear the cache", function () {
      cache.put(ref1, obj1);
      expect(cache.size).toEqual(1);
      cache.clear();
      expect(cache.size).toEqual(0);
    });
    it("should support iteration", function () {
      cache.put(ref1, obj1);
      cache.put(ref2, obj2);
      var values = [];
      cache.forEach(function (value) {
        values.push(value);
      });
      expect(values).toEqual([obj1, obj2]);
    });
  });
  describe("isEOF", function () {
    it("handles non-EOF", function () {
      var nonEOF = "foo";
      expect((0, _primitives.isEOF)(nonEOF)).toEqual(false);
    });
    it("handles EOF", function () {
      expect((0, _primitives.isEOF)(_primitives.EOF)).toEqual(true);
    });
  });
  describe("isName", function () {
    it("handles non-names", function () {
      var nonName = {};
      expect((0, _primitives.isName)(nonName)).toEqual(false);
    });
    it("handles names", function () {
      var name = _primitives.Name.get("Font");

      expect((0, _primitives.isName)(name)).toEqual(true);
    });
    it("handles names with name check", function () {
      var name = _primitives.Name.get("Font");

      expect((0, _primitives.isName)(name, "Font")).toEqual(true);
      expect((0, _primitives.isName)(name, "Subtype")).toEqual(false);
    });
  });
  describe("isCmd", function () {
    it("handles non-commands", function () {
      var nonCmd = {};
      expect((0, _primitives.isCmd)(nonCmd)).toEqual(false);
    });
    it("handles commands", function () {
      var cmd = _primitives.Cmd.get("BT");

      expect((0, _primitives.isCmd)(cmd)).toEqual(true);
    });
    it("handles commands with cmd check", function () {
      var cmd = _primitives.Cmd.get("BT");

      expect((0, _primitives.isCmd)(cmd, "BT")).toEqual(true);
      expect((0, _primitives.isCmd)(cmd, "ET")).toEqual(false);
    });
  });
  describe("isDict", function () {
    it("handles non-dictionaries", function () {
      var nonDict = {};
      expect((0, _primitives.isDict)(nonDict)).toEqual(false);
    });
    it("handles empty dictionaries with type check", function () {
      var dict = _primitives.Dict.empty;
      expect((0, _primitives.isDict)(dict)).toEqual(true);
      expect((0, _primitives.isDict)(dict, "Page")).toEqual(false);
    });
    it("handles dictionaries with type check", function () {
      var dict = new _primitives.Dict();
      dict.set("Type", _primitives.Name.get("Page"));
      expect((0, _primitives.isDict)(dict, "Page")).toEqual(true);
      expect((0, _primitives.isDict)(dict, "Contents")).toEqual(false);
    });
  });
  describe("isRef", function () {
    it("handles non-refs", function () {
      var nonRef = {};
      expect((0, _primitives.isRef)(nonRef)).toEqual(false);
    });
    it("handles refs", function () {
      var ref = _primitives.Ref.get(1, 0);

      expect((0, _primitives.isRef)(ref)).toEqual(true);
    });
  });
  describe("isRefsEqual", function () {
    it("should handle Refs pointing to the same object", function () {
      var ref1 = _primitives.Ref.get(1, 0);

      var ref2 = _primitives.Ref.get(1, 0);

      expect((0, _primitives.isRefsEqual)(ref1, ref2)).toEqual(true);
    });
    it("should handle Refs pointing to different objects", function () {
      var ref1 = _primitives.Ref.get(1, 0);

      var ref2 = _primitives.Ref.get(2, 0);

      expect((0, _primitives.isRefsEqual)(ref1, ref2)).toEqual(false);
    });
  });
  describe("isStream", function () {
    it("handles non-streams", function () {
      var nonStream = {};
      expect((0, _primitives.isStream)(nonStream)).toEqual(false);
    });
    it("handles streams", function () {
      var stream = new _stream.StringStream("foo");
      expect((0, _primitives.isStream)(stream)).toEqual(true);
    });
  });
});