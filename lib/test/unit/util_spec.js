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

var _util_metapdf = require("../../shared/util_metapdf.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

describe("util", function () {
  describe("bytesToString", function () {
    it("handles non-array arguments", function () {
      expect(function () {
        (0, _util_metapdf.bytesToString)(null);
      }).toThrow(new Error("Invalid argument for bytesToString"));
    });
    it("handles array arguments with a length not exceeding the maximum", function () {
      expect((0, _util_metapdf.bytesToString)(new Uint8Array([]))).toEqual("");
      expect((0, _util_metapdf.bytesToString)(new Uint8Array([102, 111, 111]))).toEqual("foo");
    });
    it("handles array arguments with a length exceeding the maximum", function () {
      var length = 10000;
      var bytes = new Uint8Array(length);

      for (var i = 0; i < length; i++) {
        bytes[i] = "a".charCodeAt(0);
      }

      var string = Array(length + 1).join("a");
      expect((0, _util_metapdf.bytesToString)(bytes)).toEqual(string);
    });
  });
  describe("isArrayBuffer", function () {
    it("handles array buffer values", function () {
      expect((0, _util_metapdf.isArrayBuffer)(new ArrayBuffer(0))).toEqual(true);
      expect((0, _util_metapdf.isArrayBuffer)(new Uint8Array(0))).toEqual(true);
    });
    it("handles non-array buffer values", function () {
      expect((0, _util_metapdf.isArrayBuffer)("true")).toEqual(false);
      expect((0, _util_metapdf.isArrayBuffer)(1)).toEqual(false);
      expect((0, _util_metapdf.isArrayBuffer)(null)).toEqual(false);
      expect((0, _util_metapdf.isArrayBuffer)(undefined)).toEqual(false);
    });
  });
  describe("isBool", function () {
    it("handles boolean values", function () {
      expect((0, _util_metapdf.isBool)(true)).toEqual(true);
      expect((0, _util_metapdf.isBool)(false)).toEqual(true);
    });
    it("handles non-boolean values", function () {
      expect((0, _util_metapdf.isBool)("true")).toEqual(false);
      expect((0, _util_metapdf.isBool)("false")).toEqual(false);
      expect((0, _util_metapdf.isBool)(1)).toEqual(false);
      expect((0, _util_metapdf.isBool)(0)).toEqual(false);
      expect((0, _util_metapdf.isBool)(null)).toEqual(false);
      expect((0, _util_metapdf.isBool)(undefined)).toEqual(false);
    });
  });
  describe("isNum", function () {
    it("handles numeric values", function () {
      expect((0, _util_metapdf.isNum)(1)).toEqual(true);
      expect((0, _util_metapdf.isNum)(0)).toEqual(true);
      expect((0, _util_metapdf.isNum)(-1)).toEqual(true);
      expect((0, _util_metapdf.isNum)(1000000000000000000)).toEqual(true);
      expect((0, _util_metapdf.isNum)(12.34)).toEqual(true);
    });
    it("handles non-numeric values", function () {
      expect((0, _util_metapdf.isNum)("true")).toEqual(false);
      expect((0, _util_metapdf.isNum)(true)).toEqual(false);
      expect((0, _util_metapdf.isNum)(null)).toEqual(false);
      expect((0, _util_metapdf.isNum)(undefined)).toEqual(false);
    });
  });
  describe("isString", function () {
    it("handles string values", function () {
      expect((0, _util_metapdf.isString)("foo")).toEqual(true);
      expect((0, _util_metapdf.isString)("")).toEqual(true);
    });
    it("handles non-string values", function () {
      expect((0, _util_metapdf.isString)(true)).toEqual(false);
      expect((0, _util_metapdf.isString)(1)).toEqual(false);
      expect((0, _util_metapdf.isString)(null)).toEqual(false);
      expect((0, _util_metapdf.isString)(undefined)).toEqual(false);
    });
  });
  describe("string32", function () {
    it("converts unsigned 32-bit integers to strings", function () {
      expect((0, _util_metapdf.string32)(0x74727565)).toEqual("true");
      expect((0, _util_metapdf.string32)(0x74797031)).toEqual("typ1");
      expect((0, _util_metapdf.string32)(0x4f54544f)).toEqual("OTTO");
    });
  });
  describe("stringToBytes", function () {
    it("handles non-string arguments", function () {
      expect(function () {
        (0, _util_metapdf.stringToBytes)(null);
      }).toThrow(new Error("Invalid argument for stringToBytes"));
    });
    it("handles string arguments", function () {
      expect((0, _util_metapdf.stringToBytes)("")).toEqual(new Uint8Array([]));
      expect((0, _util_metapdf.stringToBytes)("foo")).toEqual(new Uint8Array([102, 111, 111]));
    });
  });
  describe("stringToPDFString", function () {
    it("handles ISO Latin 1 strings", function () {
      var str = "\x8Dstring\x8E";
      expect((0, _util_metapdf.stringToPDFString)(str)).toEqual("\u201Cstring\u201D");
    });
    it("handles UTF-16 big-endian strings", function () {
      var str = "\xFE\xFF\x00\x73\x00\x74\x00\x72\x00\x69\x00\x6E\x00\x67";
      expect((0, _util_metapdf.stringToPDFString)(str)).toEqual("string");
    });
    it("handles UTF-16 little-endian strings", function () {
      var str = "\xFF\xFE\x73\x00\x74\x00\x72\x00\x69\x00\x6E\x00\x67\x00";
      expect((0, _util_metapdf.stringToPDFString)(str)).toEqual("string");
    });
    it("handles empty strings", function () {
      var str1 = "";
      expect((0, _util_metapdf.stringToPDFString)(str1)).toEqual("");
      var str2 = "\xFE\xFF";
      expect((0, _util_metapdf.stringToPDFString)(str2)).toEqual("");
      var str3 = "\xFF\xFE";
      expect((0, _util_metapdf.stringToPDFString)(str3)).toEqual("");
    });
  });
  describe("removeNullCharacters", function () {
    it("should not modify string without null characters", function () {
      var str = "string without null chars";
      expect((0, _util_metapdf.removeNullCharacters)(str)).toEqual("string without null chars");
    });
    it("should modify string with null characters", function () {
      var str = "string\x00With\x00Null\x00Chars";
      expect((0, _util_metapdf.removeNullCharacters)(str)).toEqual("stringWithNullChars");
    });
  });
  describe("ReadableStream", function () {
    it("should return an Object", function () {
      var readable = new ReadableStream();
      expect(_typeof(readable)).toEqual("object");
    });
    it("should have property getReader", function () {
      var readable = new ReadableStream();
      expect(_typeof(readable.getReader)).toEqual("function");
    });
  });
  describe("URL", function () {
    it("should return an Object", function () {
      var url = new URL("https://example.com");
      expect(_typeof(url)).toEqual("object");
    });
    it("should have property `href`", function () {
      var url = new URL("https://example.com");
      expect(_typeof(url.href)).toEqual("string");
    });
  });
  describe("isSameOrigin", function () {
    it("handles invalid base URLs", function () {
      expect((0, _util_metapdf.isSameOrigin)("/foo", "/bar")).toEqual(false);
      expect((0, _util_metapdf.isSameOrigin)("blob:foo", "/bar")).toEqual(false);
    });
    it("correctly checks if the origin of both URLs matches", function () {
      expect((0, _util_metapdf.isSameOrigin)("https://www.mozilla.org/foo", "https://www.mozilla.org/bar")).toEqual(true);
      expect((0, _util_metapdf.isSameOrigin)("https://www.mozilla.org/foo", "https://www.example.com/bar")).toEqual(false);
    });
  });
  describe("createValidAbsoluteUrl", function () {
    it("handles invalid URLs", function () {
      expect((0, _util_metapdf.createValidAbsoluteUrl)(undefined, undefined)).toEqual(null);
      expect((0, _util_metapdf.createValidAbsoluteUrl)(null, null)).toEqual(null);
      expect((0, _util_metapdf.createValidAbsoluteUrl)("/foo", "/bar")).toEqual(null);
    });
    it("handles URLs that do not use an allowed protocol", function () {
      expect((0, _util_metapdf.createValidAbsoluteUrl)("magnet:?foo", null)).toEqual(null);
    });
    it("correctly creates a valid URL for allowed protocols", function () {
      expect((0, _util_metapdf.createValidAbsoluteUrl)("http://www.mozilla.org/foo", null)).toEqual(new URL("http://www.mozilla.org/foo"));
      expect((0, _util_metapdf.createValidAbsoluteUrl)("/foo", "http://www.mozilla.org")).toEqual(new URL("http://www.mozilla.org/foo"));
      expect((0, _util_metapdf.createValidAbsoluteUrl)("https://www.mozilla.org/foo", null)).toEqual(new URL("https://www.mozilla.org/foo"));
      expect((0, _util_metapdf.createValidAbsoluteUrl)("/foo", "https://www.mozilla.org")).toEqual(new URL("https://www.mozilla.org/foo"));
      expect((0, _util_metapdf.createValidAbsoluteUrl)("ftp://www.mozilla.org/foo", null)).toEqual(new URL("ftp://www.mozilla.org/foo"));
      expect((0, _util_metapdf.createValidAbsoluteUrl)("/foo", "ftp://www.mozilla.org")).toEqual(new URL("ftp://www.mozilla.org/foo"));
      expect((0, _util_metapdf.createValidAbsoluteUrl)("mailto:foo@bar.baz", null)).toEqual(new URL("mailto:foo@bar.baz"));
      expect((0, _util_metapdf.createValidAbsoluteUrl)("/foo", "mailto:foo@bar.baz")).toEqual(null);
      expect((0, _util_metapdf.createValidAbsoluteUrl)("tel:+0123456789", null)).toEqual(new URL("tel:+0123456789"));
      expect((0, _util_metapdf.createValidAbsoluteUrl)("/foo", "tel:0123456789")).toEqual(null);
    });
  });
  describe("createPromiseCapability", function () {
    it("should resolve with correct data", function (done) {
      var promiseCapability = (0, _util_metapdf.createPromiseCapability)();
      expect(promiseCapability.settled).toEqual(false);
      promiseCapability.resolve({
        test: "abc"
      });
      promiseCapability.promise.then(function (data) {
        expect(promiseCapability.settled).toEqual(true);
        expect(data).toEqual({
          test: "abc"
        });
        done();
      }, done.fail);
    });
    it("should reject with correct reason", function (done) {
      var promiseCapability = (0, _util_metapdf.createPromiseCapability)();
      expect(promiseCapability.settled).toEqual(false);
      promiseCapability.reject(new Error("reason"));
      promiseCapability.promise.then(done.fail, function (reason) {
        expect(promiseCapability.settled).toEqual(true);
        expect(reason instanceof Error).toEqual(true);
        expect(reason.message).toEqual("reason");
        done();
      });
    });
  });
  describe("escapeString", function () {
    it("should escape (, ), \\n, \\r, and \\", function () {
      expect((0, _util_metapdf.escapeString)("((a\\a))\n(b(b\\b)\rb)")).toEqual("\\(\\(a\\\\a\\)\\)\\n\\(b\\(b\\\\b\\)\\rb\\)");
    });
  });
  describe("getModificationDate", function () {
    it("should get a correctly formatted date", function () {
      var date = new Date(Date.UTC(3141, 5, 9, 2, 6, 53));
      expect((0, _util_metapdf.getModificationDate)(date)).toEqual("31410609020653");
    });
  });
  describe("encodeToXmlString", function () {
    it("should get a correctly encoded string with some entities", function () {
      var str = "\"\u0397ell\uD83D\uDE02' & <W\uD83D\uDE02rld>";
      expect((0, _util_metapdf.encodeToXmlString)(str)).toEqual("&quot;&#x397;ell&#x1F602;&apos; &amp; &lt;W&#x1F602;rld&gt;");
    });
    it("should get a correctly encoded basic ascii string", function () {
      var str = "hello world";
      expect((0, _util_metapdf.encodeToXmlString)(str)).toEqual(str);
    });
  });
});