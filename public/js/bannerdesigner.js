(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    // export function imageHandler(fileInputID, canvasCreator) {
    //   const bdFile = document.getElementById(fileInputID);
    //   bdFile.addEventListener('change', (ev) => {
    //     var input = ev.target as HTMLInputElement;
    //     var url = input.value;
    //     var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    //     console.log('ext', url, ext);
    //     if (input.files && input.files[0] && (ext == 'gif' || ext == 'png' || ext == 'jpeg' || ext == 'jpg')) {
    //       var reader = new FileReader();
    //       reader.addEventListener('load', (readerLoadEvent) => {
    //         console.log('readerLoadEvent', readerLoadEvent.target.result);
    //         const base_image = new Image();
    //         base_image.src = readerLoadEvent.target.result.toString();
    //         base_image.addEventListener('load', () => {
    //           console.log('height', base_image.height, 'width', base_image.width);
    //           canvasCreator.addImage(base_image);
    //         });
    //       });
    //       reader.readAsDataURL(input.files[0]);
    //     } else {
    //       console.log('ELSE!!!');
    //     }
    //   });
    // }
    function imageHandler(input) {
        var url = input.value;
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        console.log('ext', url, ext);
        return new Promise(function (resolve, reject) {
            if (input.files && input.files[0] && (ext == 'gif' || ext == 'png' || ext == 'jpeg' || ext == 'jpg')) {
                var reader = new FileReader();
                reader.addEventListener('load', function (readerLoadEvent) {
                    var base_image = new Image();
                    base_image.src = readerLoadEvent.target.result.toString();
                    base_image.addEventListener('load', function () {
                        console.log('height', base_image.height, 'width', base_image.width);
                        resolve(base_image);
                    });
                });
                reader.readAsDataURL(input.files[0]);
                // var reader = new FileReader();
                // reader.addEventListener('load', (readerLoadEvent) => {
                //   console.log('readerLoadEvent', readerLoadEvent.target.result);
                //   const base_image = new Image();
                //   base_image.src = readerLoadEvent.target.result.toString();
                //   base_image.addEventListener('load', () => {
                //     console.log('height', base_image.height, 'width', base_image.width);
                //     canvasCreator.addImage(base_image);
                //   });
                // });
            }
            else {
                reject();
            }
        });
    }

    var simpleTextStyler = {
        sizes: [],
        baseSize: undefined,
        font: undefined,
        controlChars: '{}\n\t',
        spaceSize: 0,
        tabSize: 8,
        tabs: (function () {
            var t = [];
            for (var i = 0; i < 100; i += 8) {
                t.push(i);
            }
            return t;
        })(),
        getNextTab: function (x) {
            var i = 0;
            while (i < this.tabs.length) {
                if (x < this.tabs[i] * this.tabSize * this.spaceSize) {
                    return this.tabs[i] * this.tabSize * this.spaceSize;
                }
                i++;
            }
            return this.tabs[i - 1] * this.tabSize * this.spaceSize;
        },
        getFontSize: function (font) {
            var numFind = /[0-9]+/;
            var number = parseInt(numFind.exec(font)[0], 10);
            if (isNaN(number)) {
                throw Error('SimpleTextStyler Cant find font size');
            }
            return Number(number);
        },
        setFont: function (context) {
            this.font = context.font;
            this.baseSize = this.getFontSize(this.font);
            for (var i = 32; i < 256; i++) {
                this.sizes[i - 32] = context.measureText(String.fromCharCode(i), 0, 0).width / this.baseSize;
            }
            this.spaceSize = this.sizes[0];
        },
        drawText: function (context, text, x, y, size) {
            var i, len, subText;
            var w, scale;
            var xx, 
            // yy,
            ctx;
            var state = [];
            if (text === undefined) {
                return;
            }
            xx = x;
            // yy = y;
            if (!context.setTransform) {
                // simple test if this is a 2D context
                if (context.ctx) {
                    ctx = context.ctx;
                } // may be a image with attached ctx?
                else {
                    return;
                }
            }
            else {
                ctx = context;
            }
            function renderText(text) {
                ctx.save();
                ctx.fillStyle = colour;
                ctx.translate(x, y);
                ctx.scale(scale, scale);
                ctx.fillText(text, 0, 0);
                ctx.restore();
            }
            var colour = ctx.fillStyle;
            ctx.font = this.font;
            len = text.length;
            subText = '';
            w = 0;
            i = 0;
            scale = size / this.baseSize;
            while (i < len) {
                var c = text[i];
                var cc = text.charCodeAt(i);
                if (cc < 256) {
                    // only ascii
                    if (this.controlChars.indexOf(c) > -1) {
                        if (subText !== '') {
                            scale = size / this.baseSize;
                            renderText(subText);
                            x += w;
                            w = 0;
                            subText = '';
                        }
                        if (c === '\n') {
                            // return move to new line
                            x = xx;
                            y += size;
                        }
                        else if (c === '\t') {
                            // tab move to next tab
                            x = this.getNextTab(x - xx) + xx;
                        }
                        else if (c === '{') {
                            // Text format delimiter
                            state.push({
                                size: size,
                                colour: colour,
                                x: x,
                                y: y,
                            });
                            i += 1;
                            var t = text[i];
                            if (t === '+') {
                                // Increase size
                                size *= 1 / (3 / 4);
                            }
                            else if (t === '-') {
                                // decrease size
                                size *= 3 / 4;
                            }
                            else if (t === 's') {
                                // sub script
                                y += size * (1 / 3);
                                size *= 2 / 3;
                            }
                            else if (t === 'S') {
                                // super script
                                y -= size * (1 / 3);
                                size *= 2 / 3;
                            }
                            else if (t === '#') {
                                colour = text.substr(i, 7);
                                i += 6;
                            }
                        }
                        else if (c === '}') {
                            var s = state.pop();
                            y = s.y;
                            size = s.size;
                            colour = s.colour;
                            scale = size / this.baseSize;
                        }
                    }
                    else {
                        subText += c;
                        w += this.sizes[cc - 32] * size;
                    }
                }
                i += 1;
            }
            if (subText !== '') {
                renderText(subText);
            }
        },
    };

    var RATIOTYPES;
    (function (RATIOTYPES) {
        RATIOTYPES["square"] = "square";
        RATIOTYPES["tall"] = "tall";
        RATIOTYPES["wide"] = "wide";
    })(RATIOTYPES || (RATIOTYPES = {}));
    var DATEINFOTYPES;
    (function (DATEINFOTYPES) {
        DATEINFOTYPES["date"] = "date";
        DATEINFOTYPES["venue"] = "venue";
        DATEINFOTYPES["tickets"] = "tickets";
    })(DATEINFOTYPES || (DATEINFOTYPES = {}));
    var CanvasCreator = /** @class */ (function () {
        function CanvasCreator(container) {
            this.containerWidth = 640;
            this.canvasContainer = document.createElement('div');
            this.canvasConfig = {
                square: {
                    left: 10,
                    ratio: 1 / 2.3,
                    top: 10,
                    type: RATIOTYPES.square,
                },
                tall: {
                    left: 10,
                    ratio: 16 / 9,
                    top: 10,
                    type: RATIOTYPES.tall,
                },
                wide: {
                    left: 20,
                    ratio: 9 / 16,
                    top: 20,
                    type: RATIOTYPES.wide,
                },
            };
            this.currentCanvas = [];
            this.fontsize = 16;
            this.lineheight = 30;
            this.theme = {
                artistColor: 'FFFFFF',
                bgColor: '000000',
                dateColor: '3333FF',
                tournameColor: '3333FF',
                venueColor: 'FFFFFF',
            };
            this.types = [RATIOTYPES.wide, RATIOTYPES.square, RATIOTYPES.tall];
            this.container = container;
            this.containerWidth = this.container.clientWidth;
            this.canvasContainer.className = 'flex flex-wrap flex-start';
            this.container.appendChild(this.canvasContainer);
        }
        CanvasCreator.prototype.addAll = function () {
            // this.types.forEach((configName) => {
            // this.addCanvas(configName);
            // });
            this.addCanvas(this.types[0]);
        };
        CanvasCreator.prototype.addCanvas = function (configName) {
            var wrapper = document.createElement('div');
            var canvas = document.createElement('canvas');
            canvas.id = this.canvasConfig[configName].type;
            var ctx = canvas.getContext('2d');
            var width, height;
            switch (this.canvasConfig[configName].type) {
                case RATIOTYPES.square:
                    width = this.containerWidth * this.canvasConfig[configName].ratio;
                    height = this.containerWidth * this.canvasConfig[configName].ratio;
                    break;
                case RATIOTYPES.tall:
                    width = this.containerWidth / 2; // this.containerWidth * this.canvasConfig[configName].ratio;
                    height = (this.containerWidth / 2) * this.canvasConfig[configName].ratio;
                    break;
                case RATIOTYPES.wide:
                    width = this.containerWidth;
                    height = this.containerWidth * this.canvasConfig[configName].ratio;
                    break;
            }
            this.canvasConfig[configName].canvas = canvas;
            this.canvasConfig[configName].canvasContext = ctx;
            this.currentCanvas.push({ canvas: canvas, canvasContext: ctx, configName: configName });
            canvas.height = height;
            canvas.width = width;
            canvas.setAttribute('style', "background: #" + this.theme.bgColor + ";");
            wrapper.appendChild(canvas);
            this.canvasContainer.appendChild(wrapper);
        };
        CanvasCreator.prototype.addContent = function (contentInfo, clear) {
            return __awaiter(this, void 0, void 0, function () {
                var image, imageReturn;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            image = contentInfo.image;
                            if (!image) return [3 /*break*/, 2];
                            return [4 /*yield*/, imageHandler(image)];
                        case 1:
                            imageReturn = _a.sent();
                            console.log(imageReturn);
                            _a.label = 2;
                        case 2:
                            console.log('image?', image);
                            this.currentCanvas.forEach(function (current) {
                                var configName = current.configName;
                                var cfg = _this.canvasConfig[configName];
                                if (clear) {
                                    cfg.canvasContext.clearRect(0, 0, cfg.canvas.width, cfg.canvas.height);
                                }
                                if (image) {
                                    _this.addImage(imageReturn, current);
                                }
                                _this.addText(contentInfo, current);
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        CanvasCreator.prototype.addDates = function (datesInfo, cfgName, top) {
            var cfg = this.canvasConfig[cfgName];
            var dateTexts = [];
            var _loop_1 = function (dates) {
                if (datesInfo[dates]) {
                    var dateText_1, ticketText_1, venueText_1;
                    cfg.canvasContext.textBaseline = 'alphabetic';
                    datesInfo[dates].forEach(function (datesInfoElement) {
                        var elName = datesInfoElement.name;
                        if (elName.indexOf(DATEINFOTYPES.date) !== -1) {
                            dateText_1 = datesInfoElement.value.toUpperCase();
                        }
                        if (elName.indexOf(DATEINFOTYPES.venue) !== -1) {
                            venueText_1 = datesInfoElement.value.toUpperCase();
                        }
                        if (elName.indexOf(DATEINFOTYPES.tickets) !== -1 && datesInfoElement.checked) {
                            switch (datesInfoElement.value) {
                                case 'few':
                                    ticketText_1 = 'Få billetter'.toUpperCase();
                                    break;
                                case 'soldout':
                                    ticketText_1 = 'Udsolgt'.toUpperCase();
                                    break;
                                default:
                                    ticketText_1 = '';
                                    break;
                            }
                        }
                    });
                    cfg.canvasContext.fillStyle = this_1.theme.dateColor;
                    dateTexts.push("{#" + this_1.theme.dateColor + dateText_1 + "} {#" + this_1.theme.venueColor + venueText_1 + " {-" + ticketText_1 + "}}");
                }
            };
            var this_1 = this;
            for (var dates in datesInfo) {
                _loop_1(dates);
            }
            simpleTextStyler.setFont(cfg.canvasContext);
            var datestexting = dateTexts.join('\n');
            console.log(datestexting);
            simpleTextStyler.drawText(cfg.canvasContext, datestexting, cfg.left, top + cfg.top + this.lineheight, this.fontsize);
        };
        CanvasCreator.prototype.addImage = function (baseImage, current) {
            console.log(baseImage);
            var iWidth = baseImage.width;
            var iHeight = baseImage.height;
            var bigWidth = iWidth > iHeight;
            var ratio = bigWidth ? iHeight / iWidth : iWidth / iHeight;
            var canvas = current.canvas, canvasContext = current.canvasContext;
            current.image = baseImage;
            var cImgWidth = canvas.width / 3;
            var cImgMaxHeight = canvas.height / 3;
            var h = bigWidth ? cImgMaxHeight * ratio : cImgMaxHeight, w = bigWidth ? cImgWidth : cImgWidth * ratio, y = canvas.height - h, x = canvas.width - w;
            console.log('cImgWidth', cImgWidth, cImgWidth * ratio, ratio, cImgMaxHeight);
            canvasContext.drawImage(baseImage, x, y, w, h);
            console.log('canvas', this.currentCanvas);
        };
        CanvasCreator.prototype.addText = function (stuff, current) {
            var artist = stuff.artist, dates = stuff.dates, tourname = stuff.tourname;
            var configName = current.configName;
            var cfg = this.canvasConfig[configName];
            cfg.canvasContext.font = this.fontsize + "px/1 Arial";
            cfg.canvasContext.textAlign = 'left';
            var tournameTop = cfg.top + this.lineheight / 2;
            var headerString = "{#" + this.theme.artistColor + artist.toUpperCase() + "}\n{#" + this.theme.tournameColor + tourname.toUpperCase() + "}";
            simpleTextStyler.drawText(cfg.canvasContext, headerString, cfg.left, cfg.top + this.fontsize, this.fontsize);
            this.addDates(dates, configName, tournameTop);
        };
        CanvasCreator.prototype.getCanvas = function () {
            return this.currentCanvas;
        };
        CanvasCreator.prototype.update = function (eleList) {
            var formElements = Array.from(eleList);
            var info = {
                dates: {},
            };
            formElements.forEach(function (el) {
                if (el.dataset.line) {
                    info.dates[el.dataset.line] = info.dates[el.dataset.line] || [];
                    info.dates[el.dataset.line].push(el);
                }
                else if (el.name) {
                    info[el.name] = el.value;
                }
                else if (el.type === 'file') {
                    info['image'] = el.value ? el : null;
                }
            });
            this.addContent(info, true);
            // this.addText(info, true);
        };
        return CanvasCreator;
    }());

    var createLine = function (idx) { return "\n  <div class=\"flex-item line-item date\">\n    <input data-line=\"" + idx + "\" type=\"text\" name=\"date-" + idx + "\" id=\"bdDate-" + idx + "\" />\n  </div>\n  <div class=\"flex-item line-item venue\">\n    <input data-line=\"" + idx + "\" type=\"text\" name=\"venue-" + idx + "\" id=\"bdVenue-" + idx + "\" />\n  </div>\n  <div class=\"flex-item line-item radio\">\n    <input data-line=\"" + idx + "\" type=\"radio\" name=\"tickets-" + idx + "\" value=\"reg\" checked hidden />\n    <input data-line=\"" + idx + "\" type=\"radio\" name=\"tickets-" + idx + "\" value=\"few\" />\n  </div>\n  <div class=\"flex-item line-item radio\">\n    <input data-line=\"" + idx + "\" type=\"radio\" name=\"tickets-" + idx + "\" value=\"soldout\" />\n  </div>\n  "; };
    var createHeader = function () { return "\n  <div class=\"flex\">\n    <div class=\"flex-item delete-item\"></div>\n    <div class=\"flex-item date\">Datoer</div>\n    <div class=\"flex-item venue\">Spillested</div>\n    <div class=\"flex-item radio\">F\u00E5 billetter</div>\n    <div class=\"flex-item radio\">Udsolgt</div>\n  </div>\n  "; };
    var LineItems = /** @class */ (function () {
        function LineItems() {
            this.container = document.createDocumentFragment();
            this.counter = 0;
            this.lineContainer = document.createElement('div');
        }
        LineItems.prototype.addItem = function () {
            var lineItem = document.createElement('div');
            lineItem.className = 'flex';
            lineItem.id = "line-" + this.counter;
            var deleteItem = document.createElement('div');
            deleteItem.className = 'flex-item line-item delete-item';
            deleteItem.innerHTML = '&times;';
            deleteItem.addEventListener('click', function () {
                lineItem.remove();
            });
            lineItem.appendChild(deleteItem);
            var lineItemInput = document.createElement('div');
            lineItemInput.className = 'flex';
            lineItemInput.innerHTML = createLine(this.counter);
            lineItem.appendChild(lineItemInput);
            this.lineContainer.appendChild(lineItem);
            this.counter++;
        };
        // private deleteItem() {}
        LineItems.prototype.render = function () {
            var _this = this;
            this.addItem();
            var header = document.createElement('div');
            header.innerHTML = createHeader();
            var addButton = document.createElement('div');
            addButton.className = 'button-add';
            addButton.innerHTML = '+';
            addButton.addEventListener('click', function () {
                _this.addItem();
            });
            this.container.appendChild(header);
            this.container.appendChild(this.lineContainer);
            this.container.appendChild(addButton);
            return this.container;
        };
        return LineItems;
    }());

    // import canvas2image from 'canvas2image-2';
    var canvascontainer = document.getElementById('canvascontainer');
    var canvasCreator = new CanvasCreator(canvascontainer);
    canvasCreator.addAll();
    // console.log('canvasCreator', canvasCreator);
    // var canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    // var canvasContext = canvas.getContext('2d');
    // canvasContext.fillStyle = 'rgb(200, 0, 0)';
    // canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    // canvasContext.fillStyle = 'rgb(0, 30, 0)';
    // canvasContext.font = '30px Arial';
    // canvasContext.fillText('Your Text', 10, 50);
    // console.log('we in here?');
    // const bdText = document.getElementById('bdText') as HTMLInputElement;
    // const bdUpdate = document.getElementById('bdUpdate');
    // const bdTitle = document.getElementById('bdTitle') as HTMLInputElement;
    // const bdArtist = document.getElementById('bdArtist') as HTMLInputElement;
    var bannerdesigner = document.getElementById('bannerdesigner');
    bannerdesigner.addEventListener('submit', function (ev) {
        ev.preventDefault();
        // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        // canvasContext.fillText(bdText.value, 10, 50);
        canvasCreator.update(bannerdesigner.elements);
        // canvasCreator.addText(bdArtist.value, bdTitle.value);
    });
    var bdSave = document.getElementById('bdSave');
    // save img
    // const typeSet = document.getElementById('typeSet') as HTMLFieldSetElement;
    bdSave.addEventListener('click', function () {
        // const imgTypes = Array.from(typeSet.elements).filter((typeInput) => (typeInput as HTMLInputElement).checked);
        // console.log(imgTypes);
        // for (const imgTypeEl of imgTypes) {
        //   const imgType = (imgTypeEl as HTMLInputElement).value;
        //   console.log(imgType);
        //   canvas2image.convertToImage(canvas, 900, 1600, imgType);
        //   canvas2image.saveAsImage(canvas, 900, 1600, imgType);
        // }
        // canvas2image.convertToImage(canvas, 1600, 900, imgType);
        // canvas2image.convertToImage(canvas, 900, 900, imgType);
        // canvas2image.saveAsImage(canvas, 900, 1600, imgType);
        // canvas2image.saveAsImage(canvas, 1600, 900, imgType);
        // canvas2image.saveAsImage(canvas, 900, 900, imgType);
    });
    var thing = document.getElementById('lineitems');
    var lineItems = new LineItems();
    thing.appendChild(lineItems.render());

}());
