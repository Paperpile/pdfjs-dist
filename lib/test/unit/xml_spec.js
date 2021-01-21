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

var _core_utils = require("../../core/core_utils.js");

var _xml_parser = require("../../shared/xml_parser.js");

describe("XML", function () {
  describe("searchNode", function () {
    it("should search a node with a given path in xml tree", function () {
      var xml = "\n      <a>\n          <b>\n              <c a=\"123\"/>\n              <d/>\n              <e>\n                  <f>\n                      <g a=\"321\"/>\n                  </f>\n              </e>\n              <c a=\"456\"/>\n              <c a=\"789\"/>\n              <h/>\n              <c a=\"101112\"/>\n          </b>\n          <h>\n              <i/>\n              <j/>\n              <k>\n                  <g a=\"654\"/>\n              </k>\n          </h>\n          <b>\n              <g a=\"987\"/>\n              <h/>\n              <g a=\"121110\"/>\n          </b>\n      </a>";
      var root = new _xml_parser.SimpleXMLParser(true).parseFromString(xml).documentElement;

      function getAttr(path) {
        return root.searchNode((0, _core_utils.parseXFAPath)(path), 0).attributes[0].value;
      }

      expect(getAttr("b.g")).toEqual("321");
      expect(getAttr("e.f.g")).toEqual("321");
      expect(getAttr("e.g")).toEqual("321");
      expect(getAttr("g")).toEqual("321");
      expect(getAttr("h.g")).toEqual("654");
      expect(getAttr("b[0].g")).toEqual("321");
      expect(getAttr("b[1].g")).toEqual("987");
      expect(getAttr("b[1].g[0]")).toEqual("987");
      expect(getAttr("b[1].g[1]")).toEqual("121110");
      expect(getAttr("c")).toEqual("123");
      expect(getAttr("c[1]")).toEqual("456");
      expect(getAttr("c[2]")).toEqual("789");
      expect(getAttr("c[3]")).toEqual("101112");
    });
    it("should dump a xml tree", function () {
      var xml = "\n      <a>\n          <b>\n              <c a=\"123\"/>\n              <d>hello</d>\n              <e>\n                  <f>\n                      <g a=\"321\"/>\n                  </f>\n              </e>\n              <c a=\"456\"/>\n              <c a=\"789\"/>\n              <h/>\n              <c a=\"101112\"/>\n          </b>\n          <h>\n              <i/>\n              <j/>\n              <k>&#xA;W&#x1F602;rld&#xA;<g a=\"654\"/>\n              </k>\n          </h>\n          <b>\n              <g a=\"987\"/>\n              <h/>\n              <g a=\"121110\"/>\n          </b>\n      </a>";
      var root = new _xml_parser.SimpleXMLParser(true).parseFromString(xml).documentElement;
      var buffer = [];
      root.dump(buffer);
      expect(buffer.join("").replace(/\s+/g, "")).toEqual(xml.replace(/\s+/g, ""));
    });
  });
});