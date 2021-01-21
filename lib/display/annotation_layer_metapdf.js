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
exports.AnnotationLayer = void 0;

var _display_utils = require("./display_utils.js");

var _util_metapdf = require("../shared/util_metapdf.js");

var _annotation_storage = require("./annotation_storage.js");

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnnotationElementFactory = /*#__PURE__*/function () {
  function AnnotationElementFactory() {
    _classCallCheck(this, AnnotationElementFactory);
  }

  _createClass(AnnotationElementFactory, null, [{
    key: "create",
    value: function create(parameters) {
      var subtype = parameters.data.annotationType;

      switch (subtype) {
        case _util_metapdf.AnnotationType.LINK:
          return new LinkAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.TEXT:
          return new TextAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.WIDGET:
          var fieldType = parameters.data.fieldType;

          switch (fieldType) {
            case "Tx":
              return new TextWidgetAnnotationElement(parameters);

            case "Btn":
              if (parameters.data.radioButton) {
                return new RadioButtonWidgetAnnotationElement(parameters);
              } else if (parameters.data.checkBox) {
                return new CheckboxWidgetAnnotationElement(parameters);
              }

              return new PushButtonWidgetAnnotationElement(parameters);

            case "Ch":
              return new ChoiceWidgetAnnotationElement(parameters);
          }

          return new WidgetAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.POPUP:
          return new PopupAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.FREETEXT:
          return new FreeTextAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.LINE:
          return new LineAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.SQUARE:
          return new SquareAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.CIRCLE:
          return new CircleAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.POLYLINE:
          return new PolylineAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.CARET:
          return new CaretAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.INK:
          return new InkAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.POLYGON:
          return new PolygonAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.HIGHLIGHT:
          return new HighlightAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.UNDERLINE:
          return new UnderlineAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.SQUIGGLY:
          return new SquigglyAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.STRIKEOUT:
          return new StrikeOutAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.STAMP:
          return new StampAnnotationElement(parameters);

        case _util_metapdf.AnnotationType.FILEATTACHMENT:
          return new FileAttachmentAnnotationElement(parameters);

        default:
          return new AnnotationElement(parameters);
      }
    }
  }]);

  return AnnotationElementFactory;
}();

var AnnotationElement = /*#__PURE__*/function () {
  function AnnotationElement(parameters) {
    var isRenderable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var ignoreBorder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, AnnotationElement);

    this.isRenderable = isRenderable;
    this.data = parameters.data;
    this.layer = parameters.layer;
    this.page = parameters.page;
    this.viewport = parameters.viewport;
    this.linkService = parameters.linkService;
    this.downloadManager = parameters.downloadManager;
    this.imageResourcesPath = parameters.imageResourcesPath;
    this.renderInteractiveForms = parameters.renderInteractiveForms;
    this.svgFactory = parameters.svgFactory;
    this.annotationStorage = parameters.annotationStorage;
    this.enableScripting = parameters.enableScripting;
    this.hasJSActions = parameters.hasJSActions;

    if (isRenderable) {
      this.container = this._createContainer(ignoreBorder);
    }
  }

  _createClass(AnnotationElement, [{
    key: "_createContainer",
    value: function _createContainer() {
      var ignoreBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var data = this.data,
          page = this.page,
          viewport = this.viewport;
      var container = document.createElement("section");
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      container.setAttribute("data-annotation-id", data.id);

      var rect = _util_metapdf.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

      container.style.transform = "matrix(".concat(viewport.transform.join(","), ")");
      container.style.transformOrigin = "".concat(-rect[0], "px ").concat(-rect[1], "px");
      container.style.left = "".concat(rect[0], "px");
      container.style.top = "".concat(rect[1], "px");
      container.style.width = "".concat(width, "px");
      container.style.height = "".concat(height, "px");
      return container;
    }
  }, {
    key: "_createQuadrilaterals",
    value: function _createQuadrilaterals() {
      var ignoreBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.data.quadPoints) {
        return null;
      }

      var quadrilaterals = [];
      var savedRect = this.data.rect;

      var _iterator = _createForOfIteratorHelper(this.data.quadPoints),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var quadPoint = _step.value;
          var rect = [quadPoint[2].x, quadPoint[2].y, quadPoint[1].x, quadPoint[1].y];
          this.data.rect = rect;

          var quad = this._createContainer(ignoreBorder);

          quad.className = "highlightAnnotation";
          quadrilaterals.push(quad);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.data.rect = savedRect;
      return quadrilaterals;
    }
  }, {
    key: "_createPopup",
    value: function _createPopup(trigger, data) {
      var container = this.container;

      if (this.quadrilaterals) {
        trigger = trigger || this.quadrilaterals;
        container = this.quadrilaterals[0];
      }

      if (!trigger) {
        trigger = document.createElement("div");
        trigger.style.height = container.style.height;
        trigger.style.width = container.style.width;
        container.appendChild(trigger);
      }

      var popupElement = new PopupElement({
        container: container,
        trigger: trigger,
        color: data.color,
        title: data.title,
        modificationDate: data.modificationDate,
        contents: data.contents,
        hideWrapper: true
      });
      var popup = popupElement.render();
      popup.style.left = container.style.width;
      container.appendChild(popup);
    }
  }, {
    key: "render",
    value: function render() {
      (0, _util_metapdf.unreachable)("Abstract method `AnnotationElement.render` called");
    }
  }]);

  return AnnotationElement;
}();

var LinkAnnotationElement = /*#__PURE__*/function (_AnnotationElement) {
  _inherits(LinkAnnotationElement, _AnnotationElement);

  var _super = _createSuper(LinkAnnotationElement);

  function LinkAnnotationElement(parameters) {
    _classCallCheck(this, LinkAnnotationElement);

    var isRenderable = !!(parameters.data.url || parameters.data.dest || parameters.data.action || parameters.data.isTooltipOnly);
    return _super.call(this, parameters, isRenderable);
  }

  _createClass(LinkAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "linkAnnotation";
      var data = this.data,
          linkService = this.linkService;
      var link = document.createElement("a");

      if (data.url) {
        (0, _display_utils.addLinkAttributes)(link, {
          url: data.url,
          target: data.newWindow ? _display_utils.LinkTarget.BLANK : linkService.externalLinkTarget,
          rel: linkService.externalLinkRel,
          enabled: linkService.externalLinkEnabled
        });
      } else if (data.action) {
        this._bindNamedAction(link, data.action);
      } else if (data.dest) {
        this._bindLink(link, data.dest);
      } else {
        this._bindLink(link, "");
      }

      if (this.data.url) {
        link.target = '_blank';
      }

      this.container.appendChild(link);
      return this.container;
    }
  }, {
    key: "_bindLink",
    value: function _bindLink(link, destination) {
      var _this = this;

      link.href = this.linkService.getDestinationHash(destination);

      link.onclick = function () {
        if (destination) {
          _this.linkService.goToDestination(destination);
        }

        return false;
      };

      if (destination || destination === "") {
        link.className = "internalLink";
      }
    }
  }, {
    key: "_bindNamedAction",
    value: function _bindNamedAction(link, action) {
      var _this2 = this;

      link.href = this.linkService.getAnchorUrl("");

      link.onclick = function () {
        _this2.linkService.executeNamedAction(action);

        return false;
      };

      link.className = "internalLink";
    }
  }]);

  return LinkAnnotationElement;
}(AnnotationElement);

var TextAnnotationElement = /*#__PURE__*/function (_AnnotationElement2) {
  _inherits(TextAnnotationElement, _AnnotationElement2);

  var _super2 = _createSuper(TextAnnotationElement);

  function TextAnnotationElement(parameters) {
    _classCallCheck(this, TextAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super2.call(this, parameters, isRenderable);
  }

  _createClass(TextAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "textAnnotation";
      var image = document.createElement("img");
      image.style.height = this.container.style.height;
      image.style.width = this.container.style.width;
      image.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg";
      image.alt = "[{{type}} Annotation]";
      image.dataset.l10nId = "text_annotation_type";
      image.dataset.l10nArgs = JSON.stringify({
        type: this.data.name
      });

      if (!this.data.hasPopup) {
        this._createPopup(image, this.data);
      }

      this.container.appendChild(image);
      return this.container;
    }
  }]);

  return TextAnnotationElement;
}(AnnotationElement);

var WidgetAnnotationElement = /*#__PURE__*/function (_AnnotationElement3) {
  _inherits(WidgetAnnotationElement, _AnnotationElement3);

  var _super3 = _createSuper(WidgetAnnotationElement);

  function WidgetAnnotationElement() {
    _classCallCheck(this, WidgetAnnotationElement);

    return _super3.apply(this, arguments);
  }

  _createClass(WidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      if (this.data.alternativeText) {
        this.container.title = this.data.alternativeText;
      }

      return this.container;
    }
  }]);

  return WidgetAnnotationElement;
}(AnnotationElement);

var TextWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem) {
  _inherits(TextWidgetAnnotationElement, _WidgetAnnotationElem);

  var _super4 = _createSuper(TextWidgetAnnotationElement);

  function TextWidgetAnnotationElement(parameters) {
    _classCallCheck(this, TextWidgetAnnotationElement);

    var isRenderable = parameters.renderInteractiveForms || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
    return _super4.call(this, parameters, isRenderable);
  }

  _createClass(TextWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var TEXT_ALIGNMENT = ["left", "center", "right"];
      var storage = this.annotationStorage;
      var id = this.data.id;
      this.container.className = "textWidgetAnnotation";
      var element = null;

      if (this.renderInteractiveForms) {
        var textContent = storage.getOrCreateValue(id, this.data.fieldValue);

        if (this.data.multiLine) {
          element = document.createElement("textarea");
          element.textContent = textContent;
        } else {
          element = document.createElement("input");
          element.type = "text";
          element.setAttribute("value", textContent);
        }

        element.setAttribute("id", id);
        element.addEventListener("input", function (event) {
          storage.setValue(id, event.target.value);
        });
        element.addEventListener("blur", function (event) {
          event.target.setSelectionRange(0, 0);
        });

        if (this.enableScripting && this.hasJSActions) {
          element.addEventListener("updateFromSandbox", function (event) {
            var data = event.detail;

            if ("value" in data) {
              event.target.value = event.detail.value;
            } else if ("focus" in data) {
              event.target.focus({
                preventScroll: false
              });
            }
          });

          if (this.data.actions !== null) {
            for (var _i = 0, _Object$keys = Object.keys(this.data.actions); _i < _Object$keys.length; _i++) {
              var eventType = _Object$keys[_i];

              switch (eventType) {
                case "Format":
                  element.addEventListener("blur", function (event) {
                    window.dispatchEvent(new CustomEvent("dispatchEventInSandbox", {
                      detail: {
                        id: id,
                        name: "Format",
                        value: event.target.value
                      }
                    }));
                  });
                  break;
              }
            }
          }
        }

        element.disabled = this.data.readOnly;
        element.name = this.data.fieldName;

        if (this.data.maxLen !== null) {
          element.maxLength = this.data.maxLen;
        }

        if (this.data.comb) {
          var fieldWidth = this.data.rect[2] - this.data.rect[0];
          var combWidth = fieldWidth / this.data.maxLen;
          element.classList.add("comb");
          element.style.letterSpacing = "calc(".concat(combWidth, "px - 1ch)");
        }
      } else {
        element = document.createElement("div");
        element.textContent = this.data.fieldValue;
        element.style.verticalAlign = "middle";
        element.style.display = "table-cell";
        var font = null;

        if (this.data.fontRefName && this.page.commonObjs.has(this.data.fontRefName)) {
          font = this.page.commonObjs.get(this.data.fontRefName);
        }

        this._setTextStyle(element, font);
      }

      if (this.data.textAlignment !== null) {
        element.style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
      }

      this.container.appendChild(element);
      return this.container;
    }
  }, {
    key: "_setTextStyle",
    value: function _setTextStyle(element, font) {
      var style = element.style;
      style.fontSize = "".concat(this.data.fontSize, "px");
      style.direction = this.data.fontDirection < 0 ? "rtl" : "ltr";

      if (!font) {
        return;
      }

      var bold = "normal";

      if (font.black) {
        bold = "900";
      } else if (font.bold) {
        bold = "bold";
      }

      style.fontWeight = bold;
      style.fontStyle = font.italic ? "italic" : "normal";
      var fontFamily = font.loadedName ? "\"".concat(font.loadedName, "\", ") : "";
      var fallbackName = font.fallbackName || "Helvetica, sans-serif";
      style.fontFamily = fontFamily + fallbackName;
    }
  }]);

  return TextWidgetAnnotationElement;
}(WidgetAnnotationElement);

var CheckboxWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem2) {
  _inherits(CheckboxWidgetAnnotationElement, _WidgetAnnotationElem2);

  var _super5 = _createSuper(CheckboxWidgetAnnotationElement);

  function CheckboxWidgetAnnotationElement(parameters) {
    _classCallCheck(this, CheckboxWidgetAnnotationElement);

    return _super5.call(this, parameters, parameters.renderInteractiveForms);
  }

  _createClass(CheckboxWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var storage = this.annotationStorage;
      var data = this.data;
      var id = data.id;
      var value = storage.getOrCreateValue(id, data.fieldValue && data.fieldValue !== "Off");
      this.container.className = "buttonWidgetAnnotation checkBox";
      var element = document.createElement("input");
      element.disabled = data.readOnly;
      element.type = "checkbox";
      element.name = this.data.fieldName;

      if (value) {
        element.setAttribute("checked", true);
      }

      element.addEventListener("change", function (event) {
        storage.setValue(id, event.target.checked);
      });
      this.container.appendChild(element);
      return this.container;
    }
  }]);

  return CheckboxWidgetAnnotationElement;
}(WidgetAnnotationElement);

var RadioButtonWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem3) {
  _inherits(RadioButtonWidgetAnnotationElement, _WidgetAnnotationElem3);

  var _super6 = _createSuper(RadioButtonWidgetAnnotationElement);

  function RadioButtonWidgetAnnotationElement(parameters) {
    _classCallCheck(this, RadioButtonWidgetAnnotationElement);

    return _super6.call(this, parameters, parameters.renderInteractiveForms);
  }

  _createClass(RadioButtonWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "buttonWidgetAnnotation radioButton";
      var storage = this.annotationStorage;
      var data = this.data;
      var id = data.id;
      var value = storage.getOrCreateValue(id, data.fieldValue === data.buttonValue);
      var element = document.createElement("input");
      element.disabled = data.readOnly;
      element.type = "radio";
      element.name = data.fieldName;

      if (value) {
        element.setAttribute("checked", true);
      }

      element.addEventListener("change", function (event) {
        var name = event.target.name;

        var _iterator2 = _createForOfIteratorHelper(document.getElementsByName(name)),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var radio = _step2.value;

            if (radio !== event.target) {
              storage.setValue(radio.parentNode.getAttribute("data-annotation-id"), false);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        storage.setValue(id, event.target.checked);
      });
      this.container.appendChild(element);
      return this.container;
    }
  }]);

  return RadioButtonWidgetAnnotationElement;
}(WidgetAnnotationElement);

var PushButtonWidgetAnnotationElement = /*#__PURE__*/function (_LinkAnnotationElemen) {
  _inherits(PushButtonWidgetAnnotationElement, _LinkAnnotationElemen);

  var _super7 = _createSuper(PushButtonWidgetAnnotationElement);

  function PushButtonWidgetAnnotationElement() {
    _classCallCheck(this, PushButtonWidgetAnnotationElement);

    return _super7.apply(this, arguments);
  }

  _createClass(PushButtonWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      var container = _get(_getPrototypeOf(PushButtonWidgetAnnotationElement.prototype), "render", this).call(this);

      container.className = "buttonWidgetAnnotation pushButton";

      if (this.data.alternativeText) {
        container.title = this.data.alternativeText;
      }

      return container;
    }
  }]);

  return PushButtonWidgetAnnotationElement;
}(LinkAnnotationElement);

var ChoiceWidgetAnnotationElement = /*#__PURE__*/function (_WidgetAnnotationElem4) {
  _inherits(ChoiceWidgetAnnotationElement, _WidgetAnnotationElem4);

  var _super8 = _createSuper(ChoiceWidgetAnnotationElement);

  function ChoiceWidgetAnnotationElement(parameters) {
    _classCallCheck(this, ChoiceWidgetAnnotationElement);

    return _super8.call(this, parameters, parameters.renderInteractiveForms);
  }

  _createClass(ChoiceWidgetAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "choiceWidgetAnnotation";
      var storage = this.annotationStorage;
      var id = this.data.id;
      storage.getOrCreateValue(id, this.data.fieldValue.length > 0 ? this.data.fieldValue[0] : undefined);
      var selectElement = document.createElement("select");
      selectElement.disabled = this.data.readOnly;
      selectElement.name = this.data.fieldName;

      if (!this.data.combo) {
        selectElement.size = this.data.options.length;

        if (this.data.multiSelect) {
          selectElement.multiple = true;
        }
      }

      var _iterator3 = _createForOfIteratorHelper(this.data.options),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var option = _step3.value;
          var optionElement = document.createElement("option");
          optionElement.textContent = option.displayValue;
          optionElement.value = option.exportValue;

          if (this.data.fieldValue.includes(option.exportValue)) {
            optionElement.setAttribute("selected", true);
          }

          selectElement.appendChild(optionElement);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      selectElement.addEventListener("input", function (event) {
        var options = event.target.options;
        var value = options[options.selectedIndex].value;
        storage.setValue(id, value);
      });
      this.container.appendChild(selectElement);
      return this.container;
    }
  }]);

  return ChoiceWidgetAnnotationElement;
}(WidgetAnnotationElement);

var PopupAnnotationElement = /*#__PURE__*/function (_AnnotationElement4) {
  _inherits(PopupAnnotationElement, _AnnotationElement4);

  var _super9 = _createSuper(PopupAnnotationElement);

  function PopupAnnotationElement(parameters) {
    _classCallCheck(this, PopupAnnotationElement);

    var isRenderable = !!(parameters.data.title || parameters.data.contents);
    return _super9.call(this, parameters, isRenderable);
  }

  _createClass(PopupAnnotationElement, [{
    key: "render",
    value: function render() {
      var IGNORE_TYPES = ["Line", "Square", "Circle", "PolyLine", "Polygon", "Ink"];
      this.container.className = "popupAnnotation";

      if (IGNORE_TYPES.includes(this.data.parentType)) {
        return this.container;
      }

      var selector = "[data-annotation-id=\"".concat(this.data.parentId, "\"]");
      var parentElements = this.layer.querySelectorAll(selector);

      if (parentElements.length === 0) {
        return this.container;
      }

      var popup = new PopupElement({
        container: this.container,
        trigger: Array.from(parentElements),
        color: this.data.color,
        title: this.data.title,
        modificationDate: this.data.modificationDate,
        contents: this.data.contents
      });
      var page = this.page;

      var rect = _util_metapdf.Util.normalizeRect([this.data.parentRect[0], page.view[3] - this.data.parentRect[1] + page.view[1], this.data.parentRect[2], page.view[3] - this.data.parentRect[3] + page.view[1]]);

      var popupLeft = rect[0] + this.data.parentRect[2] - this.data.parentRect[0];
      var popupTop = rect[1];
      this.container.style.transformOrigin = "".concat(-popupLeft, "px ").concat(-popupTop, "px");
      this.container.style.left = "".concat(popupLeft, "px");
      this.container.style.top = "".concat(popupTop, "px");
      this.container.appendChild(popup.render());
      return this.container;
    }
  }]);

  return PopupAnnotationElement;
}(AnnotationElement);

var PopupElement = /*#__PURE__*/function () {
  function PopupElement(parameters) {
    _classCallCheck(this, PopupElement);

    this.container = parameters.container;
    this.trigger = parameters.trigger;
    this.color = parameters.color;
    this.title = parameters.title;
    this.modificationDate = parameters.modificationDate;
    this.contents = parameters.contents;
    this.hideWrapper = parameters.hideWrapper || false;
    this.pinned = false;
  }

  _createClass(PopupElement, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var BACKGROUND_ENLIGHT = 0.7;
      var wrapper = document.createElement("div");
      wrapper.className = "popupWrapper";
      this.hideElement = this.hideWrapper ? wrapper : this.container;
      this.hideElement.setAttribute("hidden", true);
      var popup = document.createElement("div");
      popup.className = "popup";
      var color = this.color;

      if (color) {
        var r = BACKGROUND_ENLIGHT * (255 - color[0]) + color[0];
        var g = BACKGROUND_ENLIGHT * (255 - color[1]) + color[1];
        var b = BACKGROUND_ENLIGHT * (255 - color[2]) + color[2];
        popup.style.backgroundColor = _util_metapdf.Util.makeHexColor(r | 0, g | 0, b | 0);
      }

      var title = document.createElement("h1");
      title.textContent = this.title;
      popup.appendChild(title);

      var dateObject = _display_utils.PDFDateString.toDateObject(this.modificationDate);

      if (dateObject) {
        var modificationDate = document.createElement("span");
        modificationDate.textContent = "{{date}}, {{time}}";
        modificationDate.dataset.l10nId = "annotation_date_string";
        modificationDate.dataset.l10nArgs = JSON.stringify({
          date: dateObject.toLocaleDateString(),
          time: dateObject.toLocaleTimeString()
        });
        popup.appendChild(modificationDate);
      }

      var contents = this._formatContents(this.contents);

      popup.appendChild(contents);

      if (!Array.isArray(this.trigger)) {
        this.trigger = [this.trigger];
      }

      this.trigger.forEach(function (element) {
        element.addEventListener("click", _this3._toggle.bind(_this3));
        element.addEventListener("mouseover", _this3._show.bind(_this3, false));
        element.addEventListener("mouseout", _this3._hide.bind(_this3, false));
      });
      popup.addEventListener("click", this._hide.bind(this, true));
      wrapper.appendChild(popup);
      return wrapper;
    }
  }, {
    key: "_formatContents",
    value: function _formatContents(contents) {
      var p = document.createElement("p");
      var lines = contents.split(/(?:\r\n?|\n)/);

      for (var i = 0, ii = lines.length; i < ii; ++i) {
        var line = lines[i];
        p.appendChild(document.createTextNode(line));

        if (i < ii - 1) {
          p.appendChild(document.createElement("br"));
        }
      }

      return p;
    }
  }, {
    key: "_toggle",
    value: function _toggle() {
      if (this.pinned) {
        this._hide(true);
      } else {
        this._show(true);
      }
    }
  }, {
    key: "_show",
    value: function _show() {
      var pin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (pin) {
        this.pinned = true;
      }

      if (this.hideElement.hasAttribute("hidden")) {
        this.hideElement.removeAttribute("hidden");
        this.container.style.zIndex += 1;
      }
    }
  }, {
    key: "_hide",
    value: function _hide() {
      var unpin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (unpin) {
        this.pinned = false;
      }

      if (!this.hideElement.hasAttribute("hidden") && !this.pinned) {
        this.hideElement.setAttribute("hidden", true);
        this.container.style.zIndex -= 1;
      }
    }
  }]);

  return PopupElement;
}();

var FreeTextAnnotationElement = /*#__PURE__*/function (_AnnotationElement5) {
  _inherits(FreeTextAnnotationElement, _AnnotationElement5);

  var _super10 = _createSuper(FreeTextAnnotationElement);

  function FreeTextAnnotationElement(parameters) {
    _classCallCheck(this, FreeTextAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super10.call(this, parameters, isRenderable, true);
  }

  _createClass(FreeTextAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "freeTextAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return FreeTextAnnotationElement;
}(AnnotationElement);

var LineAnnotationElement = /*#__PURE__*/function (_AnnotationElement6) {
  _inherits(LineAnnotationElement, _AnnotationElement6);

  var _super11 = _createSuper(LineAnnotationElement);

  function LineAnnotationElement(parameters) {
    _classCallCheck(this, LineAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super11.call(this, parameters, isRenderable, true);
  }

  _createClass(LineAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "lineAnnotation";
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var line = this.svgFactory.createElement("svg:line");
      line.setAttribute("x1", data.rect[2] - data.lineCoordinates[0]);
      line.setAttribute("y1", data.rect[3] - data.lineCoordinates[1]);
      line.setAttribute("x2", data.rect[2] - data.lineCoordinates[2]);
      line.setAttribute("y2", data.rect[3] - data.lineCoordinates[3]);
      line.setAttribute("stroke-width", data.borderStyle.width || 1);
      line.setAttribute("stroke", "transparent");
      svg.appendChild(line);
      this.container.append(svg);

      this._createPopup(line, data);

      return this.container;
    }
  }]);

  return LineAnnotationElement;
}(AnnotationElement);

var SquareAnnotationElement = /*#__PURE__*/function (_AnnotationElement7) {
  _inherits(SquareAnnotationElement, _AnnotationElement7);

  var _super12 = _createSuper(SquareAnnotationElement);

  function SquareAnnotationElement(parameters) {
    _classCallCheck(this, SquareAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super12.call(this, parameters, isRenderable, true);
  }

  _createClass(SquareAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "squareAnnotation";
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var borderWidth = data.borderStyle.width;
      var square = this.svgFactory.createElement("svg:rect");
      square.setAttribute("x", borderWidth / 2);
      square.setAttribute("y", borderWidth / 2);
      square.setAttribute("width", width - borderWidth);
      square.setAttribute("height", height - borderWidth);
      square.setAttribute("stroke-width", borderWidth || 1);
      square.setAttribute("stroke", "transparent");
      square.setAttribute("fill", "none");
      svg.appendChild(square);
      this.container.append(svg);

      this._createPopup(square, data);

      return this.container;
    }
  }]);

  return SquareAnnotationElement;
}(AnnotationElement);

var CircleAnnotationElement = /*#__PURE__*/function (_AnnotationElement8) {
  _inherits(CircleAnnotationElement, _AnnotationElement8);

  var _super13 = _createSuper(CircleAnnotationElement);

  function CircleAnnotationElement(parameters) {
    _classCallCheck(this, CircleAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super13.call(this, parameters, isRenderable, true);
  }

  _createClass(CircleAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "circleAnnotation";
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var borderWidth = data.borderStyle.width;
      var circle = this.svgFactory.createElement("svg:ellipse");
      circle.setAttribute("cx", width / 2);
      circle.setAttribute("cy", height / 2);
      circle.setAttribute("rx", width / 2 - borderWidth / 2);
      circle.setAttribute("ry", height / 2 - borderWidth / 2);
      circle.setAttribute("stroke-width", borderWidth || 1);
      circle.setAttribute("stroke", "transparent");
      circle.setAttribute("fill", "none");
      svg.appendChild(circle);
      this.container.append(svg);

      this._createPopup(circle, data);

      return this.container;
    }
  }]);

  return CircleAnnotationElement;
}(AnnotationElement);

var PolylineAnnotationElement = /*#__PURE__*/function (_AnnotationElement9) {
  _inherits(PolylineAnnotationElement, _AnnotationElement9);

  var _super14 = _createSuper(PolylineAnnotationElement);

  function PolylineAnnotationElement(parameters) {
    var _this4;

    _classCallCheck(this, PolylineAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    _this4 = _super14.call(this, parameters, isRenderable, true);
    _this4.containerClassName = "polylineAnnotation";
    _this4.svgElementName = "svg:polyline";
    return _this4;
  }

  _createClass(PolylineAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = this.containerClassName;
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);
      var points = [];

      var _iterator4 = _createForOfIteratorHelper(data.vertices),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var coordinate = _step4.value;
          var x = coordinate.x - data.rect[0];
          var y = data.rect[3] - coordinate.y;
          points.push(x + "," + y);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      points = points.join(" ");
      var polyline = this.svgFactory.createElement(this.svgElementName);
      polyline.setAttribute("points", points);
      polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
      polyline.setAttribute("stroke", "transparent");
      polyline.setAttribute("fill", "none");
      svg.appendChild(polyline);
      this.container.append(svg);

      this._createPopup(polyline, data);

      return this.container;
    }
  }]);

  return PolylineAnnotationElement;
}(AnnotationElement);

var PolygonAnnotationElement = /*#__PURE__*/function (_PolylineAnnotationEl) {
  _inherits(PolygonAnnotationElement, _PolylineAnnotationEl);

  var _super15 = _createSuper(PolygonAnnotationElement);

  function PolygonAnnotationElement(parameters) {
    var _this5;

    _classCallCheck(this, PolygonAnnotationElement);

    _this5 = _super15.call(this, parameters);
    _this5.containerClassName = "polygonAnnotation";
    _this5.svgElementName = "svg:polygon";
    return _this5;
  }

  return PolygonAnnotationElement;
}(PolylineAnnotationElement);

var CaretAnnotationElement = /*#__PURE__*/function (_AnnotationElement10) {
  _inherits(CaretAnnotationElement, _AnnotationElement10);

  var _super16 = _createSuper(CaretAnnotationElement);

  function CaretAnnotationElement(parameters) {
    _classCallCheck(this, CaretAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super16.call(this, parameters, isRenderable, true);
  }

  _createClass(CaretAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "caretAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return CaretAnnotationElement;
}(AnnotationElement);

var InkAnnotationElement = /*#__PURE__*/function (_AnnotationElement11) {
  _inherits(InkAnnotationElement, _AnnotationElement11);

  var _super17 = _createSuper(InkAnnotationElement);

  function InkAnnotationElement(parameters) {
    var _this6;

    _classCallCheck(this, InkAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    _this6 = _super17.call(this, parameters, isRenderable, true);
    _this6.containerClassName = "inkAnnotation";
    _this6.svgElementName = "svg:polyline";
    return _this6;
  }

  _createClass(InkAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = this.containerClassName;
      var data = this.data;
      var width = data.rect[2] - data.rect[0];
      var height = data.rect[3] - data.rect[1];
      var svg = this.svgFactory.create(width, height);

      var _iterator5 = _createForOfIteratorHelper(data.inkLists),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var inkList = _step5.value;
          var points = [];

          var _iterator6 = _createForOfIteratorHelper(inkList),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var coordinate = _step6.value;
              var x = coordinate.x - data.rect[0];
              var y = data.rect[3] - coordinate.y;
              points.push("".concat(x, ",").concat(y));
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          points = points.join(" ");
          var polyline = this.svgFactory.createElement(this.svgElementName);
          polyline.setAttribute("points", points);
          polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
          polyline.setAttribute("stroke", "transparent");
          polyline.setAttribute("fill", "none");

          this._createPopup(polyline, data);

          svg.appendChild(polyline);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this.container.append(svg);
      return this.container;
    }
  }]);

  return InkAnnotationElement;
}(AnnotationElement);

var HighlightAnnotationElement = /*#__PURE__*/function (_AnnotationElement12) {
  _inherits(HighlightAnnotationElement, _AnnotationElement12);

  var _super18 = _createSuper(HighlightAnnotationElement);

  function HighlightAnnotationElement(parameters) {
    var _this7;

    _classCallCheck(this, HighlightAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    _this7 = _super18.call(this, parameters, isRenderable, true);
    _this7.quadrilaterals = _this7._createQuadrilaterals(true);
    return _this7;
  }

  _createClass(HighlightAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "highlightAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.quadrilaterals || this.container;
    }
  }]);

  return HighlightAnnotationElement;
}(AnnotationElement);

var UnderlineAnnotationElement = /*#__PURE__*/function (_AnnotationElement13) {
  _inherits(UnderlineAnnotationElement, _AnnotationElement13);

  var _super19 = _createSuper(UnderlineAnnotationElement);

  function UnderlineAnnotationElement(parameters) {
    _classCallCheck(this, UnderlineAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super19.call(this, parameters, isRenderable, true);
  }

  _createClass(UnderlineAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "underlineAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return UnderlineAnnotationElement;
}(AnnotationElement);

var SquigglyAnnotationElement = /*#__PURE__*/function (_AnnotationElement14) {
  _inherits(SquigglyAnnotationElement, _AnnotationElement14);

  var _super20 = _createSuper(SquigglyAnnotationElement);

  function SquigglyAnnotationElement(parameters) {
    _classCallCheck(this, SquigglyAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super20.call(this, parameters, isRenderable, true);
  }

  _createClass(SquigglyAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "squigglyAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return SquigglyAnnotationElement;
}(AnnotationElement);

var StrikeOutAnnotationElement = /*#__PURE__*/function (_AnnotationElement15) {
  _inherits(StrikeOutAnnotationElement, _AnnotationElement15);

  var _super21 = _createSuper(StrikeOutAnnotationElement);

  function StrikeOutAnnotationElement(parameters) {
    _classCallCheck(this, StrikeOutAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super21.call(this, parameters, isRenderable, true);
  }

  _createClass(StrikeOutAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "strikeoutAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return StrikeOutAnnotationElement;
}(AnnotationElement);

var StampAnnotationElement = /*#__PURE__*/function (_AnnotationElement16) {
  _inherits(StampAnnotationElement, _AnnotationElement16);

  var _super22 = _createSuper(StampAnnotationElement);

  function StampAnnotationElement(parameters) {
    _classCallCheck(this, StampAnnotationElement);

    var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    return _super22.call(this, parameters, isRenderable, true);
  }

  _createClass(StampAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "stampAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }
  }]);

  return StampAnnotationElement;
}(AnnotationElement);

var FileAttachmentAnnotationElement = /*#__PURE__*/function (_AnnotationElement17) {
  _inherits(FileAttachmentAnnotationElement, _AnnotationElement17);

  var _super23 = _createSuper(FileAttachmentAnnotationElement);

  function FileAttachmentAnnotationElement(parameters) {
    var _this8;

    _classCallCheck(this, FileAttachmentAnnotationElement);

    _this8 = _super23.call(this, parameters, true);
    var _this8$data$file = _this8.data.file,
        filename = _this8$data$file.filename,
        content = _this8$data$file.content;
    _this8.filename = (0, _display_utils.getFilenameFromUrl)(filename);
    _this8.content = content;

    if (_this8.linkService.eventBus) {
      _this8.linkService.eventBus.dispatch("fileattachmentannotation", {
        source: _assertThisInitialized(_this8),
        id: (0, _util_metapdf.stringToPDFString)(filename),
        filename: filename,
        content: content
      });
    }

    return _this8;
  }

  _createClass(FileAttachmentAnnotationElement, [{
    key: "render",
    value: function render() {
      this.container.className = "fileAttachmentAnnotation";
      var trigger = document.createElement("div");
      trigger.style.height = this.container.style.height;
      trigger.style.width = this.container.style.width;
      trigger.addEventListener("dblclick", this._download.bind(this));

      if (!this.data.hasPopup && (this.data.title || this.data.contents)) {
        this._createPopup(trigger, this.data);
      }

      this.container.appendChild(trigger);
      return this.container;
    }
  }, {
    key: "_download",
    value: function _download() {
      if (!this.downloadManager) {
        (0, _util_metapdf.warn)("Download cannot be started due to unavailable download manager");
        return;
      }

      this.downloadManager.downloadData(this.content, this.filename, "");
    }
  }]);

  return FileAttachmentAnnotationElement;
}(AnnotationElement);

var AnnotationLayer = /*#__PURE__*/function () {
  function AnnotationLayer() {
    _classCallCheck(this, AnnotationLayer);
  }

  _createClass(AnnotationLayer, null, [{
    key: "render",
    value: function render(parameters) {
      var sortedAnnotations = [],
          popupAnnotations = [];

      var _iterator7 = _createForOfIteratorHelper(parameters.annotations),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _data = _step7.value;

          if (!_data) {
            continue;
          }

          if (_data.annotationType === _util_metapdf.AnnotationType.POPUP) {
            popupAnnotations.push(_data);
            continue;
          }

          sortedAnnotations.push(_data);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      if (popupAnnotations.length) {
        sortedAnnotations.push.apply(sortedAnnotations, popupAnnotations);
      }

      for (var _i2 = 0, _sortedAnnotations = sortedAnnotations; _i2 < _sortedAnnotations.length; _i2++) {
        var data = _sortedAnnotations[_i2];

        if (data.subtype) {
          if (MP.sharedutils.supportedSubtypes.indexOf(data.subtype) > -1) continue;
          if (data.subtype == 'Popup') continue;
        }

        var element = AnnotationElementFactory.create({
          data: data,
          layer: parameters.div,
          page: parameters.page,
          viewport: parameters.viewport,
          linkService: parameters.linkService,
          downloadManager: parameters.downloadManager,
          imageResourcesPath: parameters.imageResourcesPath || "",
          renderInteractiveForms: typeof parameters.renderInteractiveForms === "boolean" ? parameters.renderInteractiveForms : true,
          svgFactory: new _display_utils.DOMSVGFactory(),
          annotationStorage: parameters.annotationStorage || new _annotation_storage.AnnotationStorage(),
          enableScripting: parameters.enableScripting,
          hasJSActions: parameters.hasJSActions
        });

        if (element.isRenderable) {
          var rendered = element.render();

          if (Array.isArray(rendered)) {
            var _iterator8 = _createForOfIteratorHelper(rendered),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var renderedElement = _step8.value;
                parameters.div.appendChild(renderedElement);
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          } else {
            if (element instanceof PopupAnnotationElement) {
              parameters.div.prepend(rendered);
            } else {
              parameters.div.appendChild(rendered);
            }
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update(parameters) {
      var transform = "matrix(".concat(parameters.viewport.transform.join(","), ")");

      var _iterator9 = _createForOfIteratorHelper(parameters.annotations),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var data = _step9.value;

          if (data.subtype) {
            if (MP.sharedutils.supportedSubtypes.indexOf(data.subtype) > -1) continue;
            if (data.subtype == 'Popup') continue;
          }

          var elements = parameters.div.querySelectorAll("[data-annotation-id=\"".concat(data.id, "\"]"));

          if (elements) {
            elements.forEach(function (element) {
              element.style.transform = transform;
            });
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      parameters.div.removeAttribute("hidden");
    }
  }]);

  return AnnotationLayer;
}();

exports.AnnotationLayer = AnnotationLayer;