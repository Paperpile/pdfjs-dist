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
exports.PDFPrintService = PDFPrintService;

var _ui_utils_metapdf = require("./ui_utils_metapdf.js");

var _app_metapdf = require("./app_metapdf.js");

var _viewer_compatibility = require("./viewer_compatibility.js");

var activeService = null;
var overlayManager = null;

function renderPage(activeServiceOnEntry, pdfDocument, pageNumber, size, printResolution, optionalContentConfigPromise) {
  var scratchCanvas = activeService.scratchCanvas;
  var PRINT_UNITS = printResolution / 72.0;
  scratchCanvas.width = Math.floor(size.width * PRINT_UNITS);
  scratchCanvas.height = Math.floor(size.height * PRINT_UNITS);
  var width = Math.floor(size.width * _ui_utils_metapdf.CSS_UNITS) + "px";
  var height = Math.floor(size.height * _ui_utils_metapdf.CSS_UNITS) + "px";
  var ctx = scratchCanvas.getContext("2d");
  ctx.save();
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
  ctx.restore();
  return pdfDocument.getPage(pageNumber).then(function (pdfPage) {
    var renderContext = {
      canvasContext: ctx,
      transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
      viewport: pdfPage.getViewport({
        scale: 1,
        rotation: size.rotation
      }),
      intent: "print",
      annotationStorage: pdfDocument.annotationStorage,
      optionalContentConfigPromise: optionalContentConfigPromise
    };
    renderContext.pageNumber = pageNumber;
    return pdfPage.render(renderContext).promise;
  }).then(function () {
    return {
      width: width,
      height: height
    };
  });
}

function PDFPrintService(pdfDocument, pagesOverview, printContainer, printResolution) {
  var optionalContentConfigPromise = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var l10n = arguments.length > 5 ? arguments[5] : undefined;
  this.pdfDocument = pdfDocument;
  this.pagesOverview = pagesOverview;
  this.printContainer = printContainer;
  this._printResolution = printResolution || 150;
  this._optionalContentConfigPromise = optionalContentConfigPromise || pdfDocument.getOptionalContentConfig();
  this.l10n = l10n || _ui_utils_metapdf.NullL10n;
  this.currentPage = -1;
  this.scratchCanvas = document.createElement("canvas");
}

PDFPrintService.prototype = {
  layout: function layout() {
    this.throwIfInactive();
    var body = document.querySelector("body");
    body.setAttribute("data-pdfjsprinting", true);
    var hasEqualPageSizes = this.pagesOverview.every(function (size) {
      return size.width === this.pagesOverview[0].width && size.height === this.pagesOverview[0].height;
    }, this);

    if (!hasEqualPageSizes) {
      console.warn("Not all pages have the same size. The printed " + "result may be incorrect!");
    }

    this.pageStyleSheet = document.createElement("style");
    var pageSize = this.pagesOverview[0];
    var ua = new UAParser().getResult();

    if (MP.localSession.get('printAnnotationList')) {
      if (ua.browser.name === 'Firefox') {
        this.pageStyleSheet.textContent = '@supports ((size:A4) and (size:1pt 1pt)) {' + '@page { margin: 20 !important;;}' + '}' + '@media print {' + '@page { margin: 20 !important;}' + '#mp-print-container > div {' + 'overflow: visible; ' + '} ';
        '}';
      } else {
        this.pageStyleSheet.textContent = '@supports ((size:A4) and (size:1pt 1pt)) {' + '@page { margin: 20 !important;;}' + '}';
      }
    } else {
      if (ua.browser.name === 'Firefox') {
        this.pageStyleSheet.textContent = '@supports ((size:A4) and (size:1pt 1pt)) {' + '@page { size: ' + pageSize.width + 'pt ' + (pageSize.height + 1) + 'pt; margin: 0pt !important;}' + '} ' + '@media print {' + '@page { size: ' + pageSize.width + 'pt ' + (pageSize.height + 2) + 'pt; margin: 0pt !important;}' + '#mp-print-container > div {' + 'height: 100%; overflow: hidden;' + 'page-break-after: always; ' + 'page-break-inside: avoid; ' + '}';
        '}';
      } else {
        this.pageStyleSheet.textContent = '@supports ((size:A4) and (size:1pt 1pt)) {' + '@page { size: ' + pageSize.width + 'pt ' + (pageSize.height + 1) + 'pt; margin: 0pt;}' + '}';
      }
    }

    body.appendChild(this.pageStyleSheet);
  },
  destroy: function destroy() {
    if (activeService !== this) {
      return;
    }

    this.printContainer.textContent = "";
    var body = document.querySelector("body");
    body.removeAttribute("data-pdfjsprinting");

    if (this.pageStyleSheet) {
      this.pageStyleSheet.remove();
      this.pageStyleSheet = null;
    }

    this.scratchCanvas.width = this.scratchCanvas.height = 0;
    this.scratchCanvas = null;
    activeService = null;
  },
  renderPages: function renderPages() {
    var _this = this;

    var pageCount = this.pagesOverview.length;

    var renderNextPage = function renderNextPage(resolve, reject) {
      _this.throwIfInactive();

      if (++_this.currentPage >= pageCount) {
        MP.actions.Viewer.updateProgressBar(_this.currentPage / pageCount);
        resolve();
        return;
      }

      var index = _this.currentPage;
      MP.actions.Viewer.updateProgressBar(_this.currentPage / pageCount);
      renderPage(_this, _this.pdfDocument, index + 1, _this.pagesOverview[index], _this._printResolution, _this._optionalContentConfigPromise).then(_this.useRenderedPage.bind(_this)).then(function () {
        renderNextPage(resolve, reject);
      }, reject);
    };

    return new Promise(renderNextPage);
  },
  useRenderedPage: function useRenderedPage(printItem) {
    this.throwIfInactive();
    var img = document.createElement("img");
    img.style.width = printItem.width;
    img.style.height = printItem.height;
    var scratchCanvas = this.scratchCanvas;

    if ("toBlob" in scratchCanvas && !_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
      scratchCanvas.toBlob(function (blob) {
        img.src = URL.createObjectURL(blob);
      });
    } else {
      img.src = scratchCanvas.toDataURL();
    }

    var wrapper = document.createElement("div");
    wrapper.appendChild(img);
    this.printContainer.appendChild(wrapper);
    return new Promise(function (resolve, reject) {
      img.onload = resolve;
      img.onerror = reject;
    });
  },
  performPrint: function performPrint() {
    var _this2 = this;

    this.throwIfInactive();
    return new Promise(function (resolve) {
      setTimeout(function () {
        if (!_this2.active) {
          resolve();
          return;
        }

        if (MP.localSession.get('printAnnotationList')) {
          var annotmp = MP.actions.Export.exportHTML(MP.actions.Export.buildJSON({
            includePrintID: true
          }), true, false);
          MP.$('#mp-print-container').html('<div>' + annotmp + '</div>');
        }

        print.call(window);
        setTimeout(resolve, 20);
      }, 0);
    });
  },

  get active() {
    return this === activeService;
  },

  throwIfInactive: function throwIfInactive() {
    if (!this.active) {
      throw new Error("This print request was cancelled or completed.");
    }
  }
};
var print = window.print;

window.print = function () {
  if (activeService) {
    console.warn("Ignored window.print() because of a pending print job.");
    return;
  }

  try {
    dispatchEvent("beforeprint");
  } finally {
    if (!activeService) {
      console.error("Expected print service to be initialized.");
      ensureOverlay().then(function () {
        if (overlayManager.active === "printServiceOverlay") {
          overlayManager.close("printServiceOverlay");
        }
      });
      return;
    }

    var activeServiceOnEntry = activeService;

    if (MP.localSession.get('printAnnotationList')) {
      return activeServiceOnEntry.performPrint()["catch"](function () {}).then(function () {
        if (activeServiceOnEntry.active) {
          abort();
        }
      });
    }

    activeService.renderPages().then(function () {
      return activeServiceOnEntry.performPrint();
    })["catch"](function () {}).then(function () {
      if (activeServiceOnEntry.active) {
        abort();
      }
    });
  }
};

function dispatchEvent(eventType) {
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent(eventType, false, false, "custom");
  window.dispatchEvent(event);
}

function abort() {
  if (activeService) {
    activeService.destroy();
    dispatchEvent("afterprint");
  }
}

function renderProgress(index, total, l10n) {
  var progressContainer = document.getElementById("printServiceOverlay");
  var progress = Math.round(100 * index / total);
  var progressBar = progressContainer.querySelector("progress");
  var progressPerc = progressContainer.querySelector(".relative-progress");
  progressBar.value = progress;
  l10n.get("print_progress_percent", {
    progress: progress
  }, progress + "%").then(function (msg) {
    progressPerc.textContent = msg;
  });
}

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 80 && (event.ctrlKey || event.metaKey) && !event.altKey && (!event.shiftKey || window.chrome || window.opera)) {
    window.print();
    event.preventDefault();

    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    } else {
      event.stopPropagation();
    }
  }
}, true);

if ("onbeforeprint" in window) {
  var stopPropagationIfNeeded = function stopPropagationIfNeeded(event) {
    if (event.detail !== "custom" && event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    }
  };

  window.addEventListener("beforeprint", stopPropagationIfNeeded);
  window.addEventListener("afterprint", stopPropagationIfNeeded);
}

var overlayPromise;

function ensureOverlay() {
  overlayPromise = new Promise(function (resolve) {
    resolve();
  });
  return overlayPromise;
}

_app_metapdf.PDFPrintServiceFactory.instance = {
  supportsPrinting: true,
  createPrintService: function createPrintService(pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, l10n) {
    if (activeService) {
      throw new Error("The print service is created and active.");
    }

    activeService = new PDFPrintService(pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, l10n);
    return activeService;
  }
};