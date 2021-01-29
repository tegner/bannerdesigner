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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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

    function asyncForEach(array, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < array.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, callback(array[index], index, array)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }

    var DragHandler = /** @class */ (function () {
        function DragHandler(current, scaleFactor) {
            var _this = this;
            this.dragging = false;
            this.scaleFactor = scaleFactor;
            this.offsetX = current.canvas.offsetLeft;
            this.offsetY = current.canvas.offsetTop;
            this.current = current;
            this.imageInfo = current.image;
            // listen for mouse events
            current.canvas.addEventListener('mousedown', function (mouseEv) {
                _this.handleMouseDown(mouseEv);
            });
            current.canvas.addEventListener('mousemove', function (mouseEv) {
                _this.handleMouseMove(mouseEv);
            });
            current.canvas.addEventListener('mouseout', function (mouseEv) {
                _this.handleMouseOut(mouseEv);
            });
            current.canvas.addEventListener('mouseup', function (mouseEv) {
                _this.handleMouseUp(mouseEv);
            });
        }
        // test if x,y is inside the bounding box of texts[textIndex]
        DragHandler.prototype.imageHittest = function (x, y) {
            var _a = this.imageInfo, imageH = _a.h, imageX = _a.x, imageY = _a.y, imageW = _a.w;
            var scaledX = imageX * this.scaleFactor;
            var scaledY = imageY * this.scaleFactor;
            return x >= scaledX && x <= scaledX + imageW && y >= scaledY && y <= scaledY + imageH;
        };
        // handle mousedown events
        // iterate through texts[] and see if the user
        // mousedown'ed on one of them
        // If yes, set the selectedText to the index of that text
        DragHandler.prototype.handleMouseDown = function (ev) {
            ev.preventDefault();
            this.startX = ev.clientX - this.offsetX;
            this.startY = ev.clientY - this.offsetY;
            // Put your mousedown stuff here
            this.dragging = this.imageHittest(this.startX, this.startY);
        };
        // handle mousemove events
        // calc how far the mouse has been dragged since
        // the last mousemove event and move the selected text
        // by that distance
        DragHandler.prototype.handleMouseMove = function (ev) {
            if (!this.dragging) {
                return;
            }
            ev.preventDefault();
            var mouseX = ev.clientX - this.offsetX;
            var mouseY = ev.clientY - this.offsetY;
            // Put your mousemove stuff here
            var dx = mouseX - this.startX;
            var dy = mouseY - this.startY;
            this.startX = mouseX;
            this.startY = mouseY;
            var _a = this.imageInfo, h = _a.h, image = _a.image, x = _a.x, y = _a.y, w = _a.w;
            this.current.canvasContext.fillRect(x, y, x + w, y + h);
            this.imageInfo.x += dx;
            this.imageInfo.y += dy;
            this.current.canvasContext.drawImage(image, this.imageInfo.x, this.imageInfo.y, w, h);
        };
        // // also done dragging
        DragHandler.prototype.handleMouseOut = function (ev) {
            ev.preventDefault();
            this.dragging = false;
        };
        // // done dragging
        DragHandler.prototype.handleMouseUp = function (ev) {
            ev.preventDefault();
            this.dragging = false;
        };
        return DragHandler;
    }());

    function imageHandler(input) {
        var url = input.value;
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        return new Promise(function (resolve, reject) {
            if (input.files && input.files[0] && (ext == 'gif' || ext == 'png' || ext == 'jpeg' || ext == 'jpg')) {
                var reader = new FileReader();
                reader.addEventListener('load', function (readerLoadEvent) {
                    var base_image = new Image();
                    base_image.src = readerLoadEvent.target.result.toString();
                    base_image.addEventListener('load', function () {
                        resolve(base_image);
                    });
                });
                reader.readAsDataURL(input.files[0]);
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
            console.log('setFont', this.font, this.baseSize);
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
            console.log('drawtext ... ', ctx.font);
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

    var themes = {
        classic: {
            artistColor: 'D9E4E1',
            bgColor: '000000',
            dateColor: 'D47843',
            fontFamily: 'Cormorant Garamond',
            tournameColor: 'D47843',
            venueColor: 'D9E4E1',
        },
        modern: {
            artistColor: 'E5DADA',
            bgColor: '000000',
            dateColor: '015EB6',
            fontFamily: 'Bebas Neue',
            tournameColor: '015EB6',
            venueColor: 'E5DADA',
        },
    };

    var sizeCanvas = function (w, h, ratio) {
        if (ratio === void 0) { ratio = 4; }
        var can = document.createElement('canvas');
        can.width = w * ratio;
        can.height = h * ratio;
        can.style.width = w + 'px';
        can.style.height = h + 'px';
        can.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
        can.getContext('2d').scale(ratio, ratio);
        return can;
    };
    var CanvasCreator = /** @class */ (function () {
        function CanvasCreator(container) {
            this.containerWidth = 640;
            this.canvasContainer = document.createElement('div');
            this.canvasConfig = {
                square: {
                    fontSize: 45,
                    header: 'Banner: Instagram',
                    height: 900,
                    imageConfig: {
                        maxHeight: 0.5,
                        maxWidth: 0.5,
                    },
                    left: 20,
                    ratio: 1 / 2.3,
                    top: 20,
                    type: RATIOTYPES.square,
                    width: 900,
                },
                tall: {
                    fontSize: 36,
                    header: 'Banner: Skyskraper',
                    height: 600,
                    imageConfig: {
                        maxWidth: 1,
                    },
                    left: 20,
                    ratio: 16 / 9,
                    top: 20,
                    type: RATIOTYPES.tall,
                    width: 300,
                },
                wide: {
                    fontSize: 55,
                    header: 'Banner: Facebook',
                    height: 700,
                    imageConfig: {
                        base: 'height',
                        maxHeight: 1,
                        square: 1,
                        tall: 1,
                        wide: 1,
                    },
                    left: 30,
                    ratio: 7 / 19,
                    top: 30,
                    type: RATIOTYPES.wide,
                    width: 1900,
                },
            };
            this.currentCanvas = [];
            this.imageHasChanged = false;
            this.theme = __assign({}, themes.classic);
            this.types = [RATIOTYPES.wide, RATIOTYPES.square]; // TODO? , RATIOTYPES.tall];
            this.container = container;
            this.containerWidth = container.clientWidth;
            this.canvasContainer.className = 'flex flex-wrap flex-start';
            this.container.appendChild(this.canvasContainer);
            this.addAll();
        }
        CanvasCreator.prototype.getCanvas = function () {
            return this.currentCanvas;
        };
        CanvasCreator.prototype.imageChanged = function (status) {
            this.imageHasChanged = status;
        };
        CanvasCreator.prototype.setTheme = function (themeName) {
            this.theme = themes[themeName];
            console.log(this.theme);
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
        };
        CanvasCreator.prototype.addAll = function () {
            var _this = this;
            this.types.forEach(function (configName) {
                _this.addCanvas(configName);
            });
        };
        CanvasCreator.prototype.addCanvas = function (configName) {
            var _a = this.canvasConfig[configName], header = _a.header, height = _a.height, type = _a.type, width = _a.width;
            var wrapper = document.createElement('div');
            wrapper.className = 'margin-l--b';
            wrapper.id = "wrapper" + type;
            this.canvasContainer.appendChild(wrapper);
            var head = document.createElement('h5');
            head.innerHTML = header;
            wrapper.appendChild(head);
            var scaleFactor;
            switch (type) {
                case RATIOTYPES.square:
                    scaleFactor = this.containerWidth / this.canvasConfig.wide.width;
                    break;
                case RATIOTYPES.tall:
                    scaleFactor = width < this.containerWidth / 2 ? 1 : width / this.containerWidth;
                    break;
                case RATIOTYPES.wide:
                    scaleFactor = this.containerWidth / width;
                    break;
            }
            var canvas = sizeCanvas(width, height, 4);
            if (type !== RATIOTYPES.tall) {
                wrapper.setAttribute('style', "width: " + width * scaleFactor + "px; height: " + (height * scaleFactor + head.clientHeight) + "px;");
                canvas.setAttribute('style', "transform: scale(" + scaleFactor + "); transform-origin: top left;");
            }
            canvas.id = type;
            var ctx = canvas.getContext('2d');
            var curCanvas = __assign(__assign({}, this.canvasConfig[configName]), { canvas: canvas, canvasContext: ctx, configName: configName,
                scaleFactor: scaleFactor });
            this.currentCanvas.push(curCanvas);
            canvas.height = height;
            canvas.width = width;
            wrapper.appendChild(canvas);
            this.resetCanvas(curCanvas);
        };
        CanvasCreator.prototype.addContent = function (contentInfo, clear) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, asyncForEach(this.currentCanvas, function (current) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (clear) {
                                                this.resetCanvas(current);
                                            }
                                            return [4 /*yield*/, this.addImage(contentInfo, current)];
                                        case 1:
                                            _a.sent();
                                            this.addText(contentInfo, current);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        CanvasCreator.prototype.addImage = function (contentInfo, current) {
            return __awaiter(this, void 0, void 0, function () {
                var image, canvas, canvasContext, imageConfig, type, imageReturn, iWidth, iHeight, bigWidth, ratio, maxHeight, maxWidth, cImgMaxWidth, cImgMaxHeight, h, w, y, x, _a, image_1, x, y, w, h;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            image = contentInfo.image;
                            canvas = current.canvas, canvasContext = current.canvasContext, imageConfig = current.imageConfig, type = current.type;
                            if (!(image && this.imageHasChanged)) return [3 /*break*/, 2];
                            this.imageChanged(false);
                            return [4 /*yield*/, imageHandler(image)];
                        case 1:
                            imageReturn = _b.sent();
                            this.image = imageReturn;
                            if (current.image)
                                delete current.image;
                            _b.label = 2;
                        case 2:
                            if (this.image) {
                                iWidth = this.image.width;
                                iHeight = this.image.height;
                                bigWidth = iWidth > iHeight;
                                ratio = bigWidth ? iWidth / iHeight : iHeight / iWidth;
                                maxHeight = imageConfig.maxHeight, maxWidth = imageConfig.maxWidth;
                                cImgMaxWidth = maxWidth ? canvas.width * maxWidth : iWidth * ratio;
                                cImgMaxHeight = maxHeight ? canvas.height * maxHeight : canvas.height;
                                h = cImgMaxHeight, w = cImgMaxWidth;
                                if (iWidth > iHeight) {
                                    ratio = iHeight / iWidth;
                                    w = type === RATIOTYPES.wide ? w * ratio : w;
                                    h = type === RATIOTYPES.square ? w * maxWidth : h;
                                }
                                else if (iWidth < iHeight) {
                                    ratio = iWidth / iHeight;
                                    w = h * ratio;
                                }
                                else {
                                    w = h;
                                }
                                y = canvas.height - h, x = canvas.width - w;
                                current.image = { image: this.image, x: x, y: y, w: w, h: h };
                            }
                            if (current.image) {
                                _a = current.image, image_1 = _a.image, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
                                canvasContext.drawImage(image_1, x, y, w, h);
                                current.image.dragImage = new DragHandler(current, current.scaleFactor);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        CanvasCreator.prototype.addText = function (stuff, current) {
            return __awaiter(this, void 0, void 0, function () {
                var artist, dates, tourname, canvasContext, configName, cfg, fontSize, tournameTop, headerString;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            artist = stuff.artist, dates = stuff.dates, tourname = stuff.tourname;
                            canvasContext = current.canvasContext, configName = current.configName;
                            cfg = this.canvasConfig[configName];
                            fontSize = cfg.fontSize;
                            return [4 /*yield*/, (canvasContext.font = this.canvasFont(configName))];
                        case 1:
                            _a.sent();
                            console.log('fontshit . configName', configName, this.canvasFont(configName), canvasContext.font);
                            canvasContext.textAlign = 'left';
                            canvasContext.textBaseline = 'top';
                            tournameTop = cfg.top * 2;
                            headerString = "{#" + this.theme.artistColor + artist.toUpperCase() + "}\n{#" + this.theme.tournameColor + tourname.toUpperCase() + "}";
                            console.log('headerString ... RIGHT BEFORE DRAWTEXT', current.configName);
                            simpleTextStyler.setFont(canvasContext);
                            return [4 /*yield*/, simpleTextStyler.drawText(canvasContext, headerString, cfg.left * 2, tournameTop, fontSize)];
                        case 2:
                            _a.sent();
                            this.bannerName = artist.replace(/\s/g, '-') + "_" + tourname.replace(/\s/g, '-');
                            canvasContext.measureText(headerString).actualBoundingBoxAscent;
                            this.addDates(dates, configName, tournameTop + fontSize * 2, current);
                            return [2 /*return*/];
                    }
                });
            });
        };
        CanvasCreator.prototype.addDates = function (datesInfo, cfgName, top, current) {
            return __awaiter(this, void 0, void 0, function () {
                var cfg, dateTexts, canvasContext, _loop_1, this_1, dates, datestexting, textTop;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cfg = this.canvasConfig[cfgName];
                            dateTexts = [];
                            canvasContext = current.canvasContext;
                            canvasContext.textBaseline = 'alphabetic';
                            return [4 /*yield*/, (canvasContext.font = this.canvasFont(cfgName))];
                        case 1:
                            _a.sent();
                            console.log('addDates fontshit', cfgName, this.canvasFont(cfgName), canvasContext.font);
                            _loop_1 = function (dates) {
                                if (datesInfo[dates]) {
                                    var dateText_1, ticketText_1, venueText_1;
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
                                    dateTexts.push("{#" + this_1.theme.dateColor + dateText_1 + "} {#" + this_1.theme.venueColor + venueText_1 + " {-" + ticketText_1 + "}}");
                                }
                            };
                            this_1 = this;
                            for (dates in datesInfo) {
                                _loop_1(dates);
                            }
                            console.log('canvasContext.font', canvasContext.font);
                            simpleTextStyler.setFont(canvasContext);
                            datestexting = dateTexts.join('\n');
                            textTop = top + cfg.top + cfg.fontSize;
                            console.log('datetext', datestexting);
                            return [4 /*yield*/, simpleTextStyler.drawText(canvasContext, datestexting, cfg.left * 2, textTop, cfg.fontSize)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        CanvasCreator.prototype.canvasFont = function (cfgName) {
            return this.canvasConfig[cfgName].fontSize + "px " + this.theme.fontFamily;
        };
        CanvasCreator.prototype.resetCanvas = function (currentCfg) {
            console.log('RESET!!!', currentCfg);
            currentCfg.canvasContext.clearRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
            currentCfg.canvasContext.beginPath(); //ADD THIS LINE!<<<<<<<<<<<<<
            currentCfg.canvasContext.moveTo(0, 0);
            // currentCfg.canvasContext.lineTo(event.clientX, event.clientY);
            currentCfg.canvasContext.stroke();
            currentCfg.canvasContext.fillStyle = "#" + this.theme.bgColor + ";";
            currentCfg.canvasContext.fillRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
        };
        return CanvasCreator;
    }());

    var createLine = function (idx) { return "\n  <div class=\"flex-item line-item date\">\n    <input data-line=\"" + idx + "\" type=\"text\" name=\"date-" + idx + "\" id=\"bdDate-" + idx + "\" />\n  </div>\n  <div class=\"flex-item line-item venue\">\n    <input data-line=\"" + idx + "\" type=\"text\" name=\"venue-" + idx + "\" id=\"bdVenue-" + idx + "\" />\n  </div>\n  <div class=\"flex-item line-item radio\">\n    <input data-line=\"" + idx + "\" type=\"radio\" name=\"tickets-" + idx + "\" value=\"reg\" checked hidden />\n    <input data-line=\"" + idx + "\" type=\"radio\" name=\"tickets-" + idx + "\" value=\"few\" />\n  </div>\n  <div class=\"flex-item line-item radio\">\n    <input data-line=\"" + idx + "\" type=\"radio\" name=\"tickets-" + idx + "\" value=\"soldout\" />\n  </div>\n  "; };
    var createHeader = function () { return "\n  <div class=\"flex-item delete-item\"></div>\n  <div class=\"flex-item date\">Datoer</div>\n  <div class=\"flex-item venue\">Spillested</div>\n  <div class=\"flex-item radio fs--small\">F\u00E5 bil.</div>\n  <div class=\"flex-item radio fs--small\">Udsolgt</div>\n  "; };
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
            header.className = 'flex fs--small';
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

    /* modified version of: https://github.com/hongru/canvas2image/blob/master/canvas2image.js */

    /* based on version 1.0.5 */

    /**
     * covert canvas to image
     * and save the image file
     */
    // check if support sth.
    var $support = function () {
      var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');
      return {
        canvas: !!ctx,
        imageData: !!ctx.getImageData,
        dataURL: !!canvas.toDataURL,
        btoa: !!window.btoa
      };
    }();

    var downloadMime = 'image/octet-stream';

    function scaleCanvas(canvas, width, height) {
      var w = canvas.width,
          h = canvas.height;

      if (width == undefined) {
        width = w;
      }

      if (height == undefined) {
        height = h;
      }

      var retCanvas = document.createElement('canvas');
      var retCtx = retCanvas.getContext('2d');
      retCanvas.width = width;
      retCanvas.height = height;
      retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
      return retCanvas;
    }

    function getDataURL(canvas, type, width, height) {
      canvas = scaleCanvas(canvas, width, height);
      return canvas.toDataURL(type);
    } // eslint-disable-next-line


    function saveFile(strData, fileType, fileName = 'download') {
      let saveLink = document.createElement('a');
      saveLink.download = fileName + '.' + fileType;
      saveLink.href = strData;
      saveLink.click();
    }

    function fixType(type) {
      type = type.toLowerCase().replace(/jpg/i, 'jpeg');
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return 'image/' + r;
    }

    function encodeData(data) {
      if (!window.btoa) {
        throw 'btoa undefined';
      }

      var str = '';

      if (typeof data == 'string') {
        str = data;
      } else {
        for (var i = 0; i < data.length; i++) {
          str += String.fromCharCode(data[i]);
        }
      }

      return btoa(str);
    }

    function getImageData(canvas) {
      var w = canvas.width,
          h = canvas.height;
      return canvas.getContext('2d').getImageData(0, 0, w, h);
    }

    function makeURI(strData, type) {
      return 'data:' + type + ';base64,' + strData;
    }
    /**
     * create bitmap image
     * 按照规则生成图片响应头和响应体
     */


    var genBitmapImage = function (oData) {
      //
      // BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
      // BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
      //
      var biWidth = oData.width;
      var biHeight = oData.height;
      var biSizeImage = biWidth * biHeight * 3;
      var bfSize = biSizeImage + 54; // total header size = 54 bytes
      //
      //  typedef struct tagBITMAPFILEHEADER {
      //  	WORD bfType;
      //  	DWORD bfSize;
      //  	WORD bfReserved1;
      //  	WORD bfReserved2;
      //  	DWORD bfOffBits;
      //  } BITMAPFILEHEADER;
      //

      var BITMAPFILEHEADER = [// WORD bfType -- The file type signature; must be "BM"
      0x42, 0x4d, // DWORD bfSize -- The size, in bytes, of the bitmap file
      bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff, // WORD bfReserved1 -- Reserved; must be zero
      0, 0, // WORD bfReserved2 -- Reserved; must be zero
      0, 0, // DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
      54, 0, 0, 0]; //
      //  typedef struct tagBITMAPINFOHEADER {
      //  	DWORD biSize;
      //  	LONG  biWidth;
      //  	LONG  biHeight;
      //  	WORD  biPlanes;
      //  	WORD  biBitCount;
      //  	DWORD biCompression;
      //  	DWORD biSizeImage;
      //  	LONG  biXPelsPerMeter;
      //  	LONG  biYPelsPerMeter;
      //  	DWORD biClrUsed;
      //  	DWORD biClrImportant;
      //  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
      //

      var BITMAPINFOHEADER = [// DWORD biSize -- The number of bytes required by the structure
      40, 0, 0, 0, // LONG biWidth -- The width of the bitmap, in pixels
      biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff, // LONG biHeight -- The height of the bitmap, in pixels
      biHeight & 0xff, biHeight >> 8 & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff, // WORD biPlanes -- The number of planes for the target device. This value must be set to 1
      1, 0, // WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
      // has a maximum of 2^24 colors (16777216, Truecolor)
      24, 0, // DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
      0, 0, 0, 0, // DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
      biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff, // LONG biXPelsPerMeter, unused
      0, 0, 0, 0, // LONG biYPelsPerMeter, unused
      0, 0, 0, 0, // DWORD biClrUsed, the number of color indexes of palette, unused
      0, 0, 0, 0, // DWORD biClrImportant, unused
      0, 0, 0, 0];
      var iPadding = (4 - biWidth * 3 % 4) % 4;
      var aImgData = oData.data;
      var strPixelData = '';
      var biWidth4 = biWidth << 2;
      var y = biHeight;
      var fromCharCode = String.fromCharCode;

      do {
        var iOffsetY = biWidth4 * (y - 1);
        var strPixelRow = '';

        for (var x = 0; x < biWidth; x++) {
          var iOffsetX = x << 2;
          strPixelRow += fromCharCode(aImgData[iOffsetY + iOffsetX + 2]) + fromCharCode(aImgData[iOffsetY + iOffsetX + 1]) + fromCharCode(aImgData[iOffsetY + iOffsetX]);
        }

        for (var c = 0; c < iPadding; c++) {
          strPixelRow += String.fromCharCode(0);
        }

        strPixelData += strPixelRow;
      } while (--y);

      var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);
      return strEncoded;
    };
    /**
     * saveAsImage
     * @param canvasElement
     * @param {String} image type
     * @param {Number} [optional] png width
     * @param {Number} [optional] png height
     */


    var saveAsImage = function (canvas, width, height, fileType, fileName) {
      if ($support.canvas && $support.dataURL) {
        if (typeof canvas == 'string') {
          canvas = document.getElementById(canvas);
        }

        if (fileType == undefined) {
          fileType = 'png';
        }

        let type = fixType(fileType);

        if (/bmp/.test(type)) {
          var data = getImageData(scaleCanvas(canvas, width, height));
          let strData = genBitmapImage(data);
          saveFile(makeURI(strData, downloadMime), fileType, fileName);
        } else {
          let strData = getDataURL(canvas, type, width, height);
          saveFile(strData.replace(type, downloadMime), fileType, fileName);
        }
      }
    };

    var convertToImage = function (canvas, width, height, type) {
      if ($support.canvas && $support.dataURL) {
        if (typeof canvas == 'string') {
          canvas = document.getElementById(canvas);
        }

        if (type == undefined) {
          type = 'png';
        }

        type = fixType(type);

        if (/bmp/.test(type)) {
          var data = getImageData(scaleCanvas(canvas, width, height));
          let strData = genBitmapImage(data);
          return makeURI(strData, 'image/bmp');
        } else {
          let strData = getDataURL(canvas, type, width, height);
          return strData;
        }
      }
    };

    var canvas2image = {
      saveAsImage: saveAsImage,
      saveAsPNG: function (canvas, width, height) {
        return saveAsImage(canvas, width, height, 'png');
      },
      saveAsJPEG: function (canvas, width, height) {
        return saveAsImage(canvas, width, height, 'jpeg');
      },
      saveAsGIF: function (canvas, width, height) {
        return saveAsImage(canvas, width, height, 'gif');
      },
      saveAsBMP: function (canvas, width, height) {
        return saveAsImage(canvas, width, height, 'bmp');
      },
      convertToImage: convertToImage,
      convertToPNG: function (canvas, width, height) {
        return convertToImage(canvas, width, height, 'png');
      },
      convertToJPEG: function (canvas, width, height) {
        return convertToImage(canvas, width, height, 'jpeg');
      },
      convertToGIF: function (canvas, width, height) {
        return convertToImage(canvas, width, height, 'gif');
      },
      convertToBMP: function (canvas, width, height) {
        return convertToImage(canvas, width, height, 'bmp');
      }
    };

    function downloadFile(data, fileName, type) {
        if (type === void 0) { type = 'text/plain'; }
        // Create an invisible A element
        var a = document.createElement('a');
        a.style.display = 'none';
        document.body.appendChild(a);
        // Set the HREF to a Blob representation of the data to be downloaded
        a.href = window.URL.createObjectURL(new Blob([data], { type: type }));
        // Use download attribute to set set desired file name
        a.setAttribute('download', fileName);
        // Trigger the download by simulating click
        a.click();
        // Cleanup
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
    }
    function saveToDisk(currentArray, bannerName) {
        var zip = new window.JSZip();
        var img = zip.folder(bannerName);
        currentArray.forEach(function (current) {
            var _a;
            var canvas = current.canvas, height = current.height, type = current.type, width = current.width;
            var nameForFile = (_a = bannerName + "-" + type + ".png") !== null && _a !== void 0 ? _a : "bannermaker-" + type + ".png";
            var imgDataUrl = canvas2image.convertToImage(canvas, width, height, 'png');
            var imgData = imgDataUrl.replace(/^data:image\/(png|jpg);base64,/, '');
            img.file(nameForFile, imgData, { base64: true });
        });
        // Add a file to the directory, in this case an image with data URI as contents
        // Generate the zip file asynchronously
        zip.generateAsync({ type: 'blob' }).then(function (content) {
            // Force down of the Zip file
            downloadFile(content, "bannermaker-" + bannerName + ".zip");
        });
    }

    var canvascontainer = document.getElementById('canvascontainer');
    var canvasCreator = new CanvasCreator(canvascontainer);
    var bannerdesigner = document.getElementById('bannerdesigner');
    bannerdesigner.addEventListener('submit', function (ev) {
        ev.preventDefault();
        canvasCreator.update(bannerdesigner.elements);
    });
    bannerdesigner.addEventListener('change', function (ev) {
        console.log('it done changed', ev.target.value, ev);
        if (ev.target.nodeName === 'SELECT') {
            canvasCreator.setTheme(ev.target.value);
        }
    });
    var bdSave = document.getElementById('bdSave');
    bdSave.addEventListener('click', function () {
        saveToDisk(canvasCreator.getCanvas(), canvasCreator.bannerName);
    });
    var thing = document.getElementById('lineitems');
    var lineItems = new LineItems();
    thing.appendChild(lineItems.render());
    var fileElementBtn = document.getElementById('fileElementBtn');
    var fileElementValue = document.getElementById('fileElementValue');
    var bdFile = document.getElementById('bdFile');
    bdFile.addEventListener('change', function () {
        canvasCreator.imageChanged(true);
        var splitValue = bdFile.value.split('\\');
        fileElementValue.innerHTML = splitValue[splitValue.length - 1];
    });
    fileElementBtn.addEventListener('click', function (ev) {
        ev.preventDefault();
        bdFile.click();
    });
    for (var theme in themes) {
        if (theme) {
            console.log('theme', theme, themes[theme].fontFamily);
            var themeFont = document.createElement('div');
            themeFont.setAttribute('style', "font-family: \"" + themes[theme].fontFamily + "\";visibility: hidden;");
            themeFont.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ . abcdefghijklmnopqrstuvwxyzæøå . 0987654321';
            document.body.appendChild(themeFont);
        }
    }

}());
