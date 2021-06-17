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

    var EventBus = /** @class */ (function () {
        function EventBus(description) {
            if (description === void 0) { description = ''; }
            this.eventTarget = document.appendChild(document.createComment(description));
        }
        EventBus.prototype.on = function (type, listener) {
            this.eventTarget.addEventListener(type, listener);
        };
        EventBus.prototype.once = function (type, listener) {
            this.eventTarget.addEventListener(type, listener, { once: true });
        };
        EventBus.prototype.off = function (type, listener) {
            this.eventTarget.removeEventListener(type, listener);
        };
        EventBus.prototype.emit = function (type, detail) {
            return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail: detail }));
        };
        return EventBus;
    }());

    var _a;
    var STOREACTIONS;
    (function (STOREACTIONS) {
        STOREACTIONS["alterTheme"] = "alterTheme";
        STOREACTIONS["imageChange"] = "imageChange";
        STOREACTIONS["setImagePosition"] = "setImagePosition";
        STOREACTIONS["setImageScale"] = "setImageScale";
        STOREACTIONS["setLoginStatus"] = "setLoginStatus";
        STOREACTIONS["setTheme"] = "setTheme";
        STOREACTIONS["setThemeName"] = "setThemeName";
        STOREACTIONS["updateCanvases"] = "updateCanvases";
        STOREACTIONS["updateContent"] = "updateContent";
    })(STOREACTIONS || (STOREACTIONS = {}));
    var actions = (_a = {},
        _a[STOREACTIONS.alterTheme] = function (context, payload) {
            context.commit(STOREACTIONS.alterTheme, payload);
        },
        _a[STOREACTIONS.imageChange] = function (context, payload) {
            context.commit(STOREACTIONS.imageChange, payload);
        },
        _a[STOREACTIONS.setImagePosition] = function (context, payload) {
            context.commit(STOREACTIONS.setImagePosition, payload);
        },
        _a[STOREACTIONS.setImageScale] = function (context, payload) {
            context.commit(STOREACTIONS.setImageScale, payload);
        },
        _a[STOREACTIONS.setLoginStatus] = function (context, payload) {
            console.log('STOREACTIONS.setLoginStatus', context, payload);
            context.commit(STOREACTIONS.setLoginStatus, payload);
        },
        _a[STOREACTIONS.setTheme] = function (context, payload) {
            context.commit(STOREACTIONS.setTheme, payload);
        },
        _a[STOREACTIONS.setThemeName] = function (context, payload) {
            context.commit(STOREACTIONS.setThemeName, payload);
        },
        _a[STOREACTIONS.updateCanvases] = function (context, payload) {
            context.commit(STOREACTIONS.updateCanvases, payload);
        },
        _a[STOREACTIONS.updateContent] = function (context, payload) {
            console.log('updateContent', payload);
            var artist = payload.artist, image = payload.image, imageDidChange = payload.imageDidChange, tourname = payload.tourname, venueInfo = payload.venueInfo;
            if (imageDidChange) {
                context.commit(STOREACTIONS.imageChange, true);
            }
            var stateUpdate = {
                artist: artist,
                image: image,
                tourname: tourname,
                venueInfo: venueInfo,
            };
            context.commit(STOREACTIONS.updateContent, stateUpdate);
        },
        _a);

    var _a$1;
    var THEMENAMES;
    (function (THEMENAMES) {
        THEMENAMES["classic"] = "classic";
        THEMENAMES["modern"] = "modern";
        THEMENAMES["urban"] = "urban";
        THEMENAMES["writer"] = "writer";
    })(THEMENAMES || (THEMENAMES = {}));
    var themes = (_a$1 = {},
        _a$1[THEMENAMES.classic] = {
            artist: '#D9E4E1',
            bgColor: '#010E13',
            colorPicks: ['#D9E4E1', '#010E13', '#D96E2F', '#2F9FD9', '#A775B2'],
            date: '#D47843',
            fontFamily: 'Crimson Text',
            loaded: false,
            tourname: '#D47843',
            venue: '#D9E4E1',
        },
        _a$1[THEMENAMES.modern] = {
            artist: '#E5DADA',
            bgColor: '#000000',
            colorPicks: ['#E5DADA', '#010E13', '#015EB6', '#4FC546', '#EB5450'],
            date: '#015EB6',
            fontFamily: 'Bebas Neue',
            loaded: false,
            tourname: '#015EB6',
            venue: '#E5DADA',
        },
        _a$1[THEMENAMES.urban] = {
            artist: '#E8EFED',
            bgColor: '#000000',
            colorPicks: ['#E8EFED', '#010E13', '#F30000', '#F3C800', '#01EA85'],
            date: '#F30000',
            fontFamily: 'Roboto',
            loaded: false,
            tourname: '#F30000',
            venue: '#E8EFED',
        },
        _a$1[THEMENAMES.writer] = {
            artist: '#E8EFED',
            bgColor: '#000000',
            colorPicks: ['#E8EFED', '#010E13', '#0E467E', '#BF8F28', '#3F8597'],
            date: '#0E467E',
            fontFamily: 'Noto Serif',
            loaded: false,
            tourname: '#0E467E',
            venue: '#E8EFED',
        },
        _a$1);

    var _a$2, _b;
    var STATENAMES;
    (function (STATENAMES) {
        STATENAMES["canvases"] = "canvases";
        STATENAMES["imageChange"] = "imageChange";
        STATENAMES["imageScale"] = "imageScale";
        STATENAMES["imagePosition"] = "imagePosition";
        STATENAMES["loginStatus"] = "loginStatus";
        STATENAMES["theme"] = "theme";
        STATENAMES["themeName"] = "themeName";
        STATENAMES["userContent"] = "userContent";
    })(STATENAMES || (STATENAMES = {}));
    var ELoginStatus;
    (function (ELoginStatus) {
        ELoginStatus[ELoginStatus["loggedIn"] = 0] = "loggedIn";
        ELoginStatus[ELoginStatus["notLoggedIn"] = 1] = "notLoggedIn";
        ELoginStatus[ELoginStatus["expired"] = 2] = "expired";
    })(ELoginStatus || (ELoginStatus = {}));
    var defaultTheme = THEMENAMES.modern;
    var initialState = (_a$2 = {},
        _a$2[STATENAMES.canvases] = [],
        _a$2[STATENAMES.imageChange] = false,
        _a$2[STATENAMES.imageScale] = (_b = {},
            _b[RATIOTYPES.square] = 1,
            _b[RATIOTYPES.wide] = 1,
            _b),
        _a$2[STATENAMES.imagePosition] = 'topleft',
        _a$2[STATENAMES.loginStatus] = ELoginStatus.notLoggedIn,
        _a$2[STATENAMES.theme] = themes[defaultTheme],
        _a$2[STATENAMES.themeName] = defaultTheme,
        _a$2[STATENAMES.userContent] = {},
        _a$2);

    var _a$3;
    var mutations = (_a$3 = {},
        _a$3[STOREACTIONS.alterTheme] = function (state, payload) {
            state.theme = __assign(__assign({}, state.theme), payload);
            return state;
        },
        _a$3[STOREACTIONS.imageChange] = function (state, payload) {
            state[STATENAMES.imageChange] = payload;
            return state;
        },
        _a$3[STOREACTIONS.setImagePosition] = function (state, payload) {
            state[STATENAMES.imagePosition] = payload.val;
            return state;
        },
        _a$3[STOREACTIONS.setImageScale] = function (state, payload) {
            state[STATENAMES.imageScale] = __assign(__assign({}, state[STATENAMES.imageScale]), payload);
            return state;
        },
        _a$3[STOREACTIONS.setLoginStatus] = function (state, payload) {
            state[STATENAMES.loginStatus] = payload;
            return state;
        },
        _a$3[STOREACTIONS.setTheme] = function (state, payload) {
            state[STATENAMES.theme] = payload;
            return state;
        },
        _a$3[STOREACTIONS.setThemeName] = function (state, payload) {
            state[STATENAMES.themeName] = payload;
            return state;
        },
        _a$3[STOREACTIONS.updateCanvases] = function (state, payload) {
            var _a;
            (_a = state[STATENAMES.canvases]).push.apply(_a, payload);
            return state;
        },
        _a$3[STOREACTIONS.updateContent] = function (state, payload) {
            console.log('mutation updateContent', payload);
            state[STATENAMES.userContent] = payload;
            return state;
        },
        _a$3);

    var PubSub = /** @class */ (function () {
        function PubSub() {
            this.events = {};
        }
        PubSub.prototype.publish = function (event, data, key) {
            if (data === void 0) { data = {}; }
            var self = this;
            if (!self.events[event]) {
                return [];
            }
            return self.events[event].map(function (callback) { return callback(data, key); });
        };
        PubSub.prototype.subscribe = function (event, callback) {
            var self = this;
            if (!self.events[event]) {
                self.events[event] = [];
            }
            return self.events[event].push(callback);
        };
        return PubSub;
    }());

    var Store = /** @class */ (function () {
        function Store(params) {
            // Add some default objects to hold our actions, mutations and state
            var _this = this;
            this.state = {};
            this.actions = {};
            this.mutations = {};
            this.stateLibrary = [];
            // A status enum to set during actions and mutations
            this.status = 'resting';
            // Attach our PubSub module as an `events` element
            this.events = new PubSub();
            // Look in the passed params object for actions and mutations
            // that might have been passed in
            if (params.hasOwnProperty('actions')) {
                this.actions = params.actions;
            }
            if (params.hasOwnProperty('mutations')) {
                this.mutations = params.mutations;
            }
            // Set our state to be a Proxy. We are setting the default state by
            // checking the params and defaulting to an empty object if no default
            // state is passed in
            this.state = new Proxy(params.state || {}, {
                set: function (state, key, value) {
                    // Set the value as we would normally
                    state[key] = value;
                    // Trace out to the console. This will be grouped by the related action
                    // Publish the change event for the components that are listening
                    _this.events.publish('stateChange', _this.state, key);
                    // Give the user a little telling off if they set a value directly
                    if (_this.status !== 'mutation') {
                        console.warn("You should use a mutation to set " + String(key));
                    }
                    // Reset the status ready for the next operation
                    _this.status = 'resting';
                    return true;
                },
            });
        }
        /**
         * A dispatcher for actions that looks in the actions
         * collection and runs the action if it can find it
         *
         * @param {string} actionKey
         * @param {mixed} payload
         * @returns {boolean}
         * @memberof Store
         */
        Store.prototype.dispatch = function (actionKey, payload) {
            // Run a quick check to see if the action actually exists
            // before we try to run it
            if (typeof this.actions[actionKey] !== 'function') {
                console.error("Action \"" + actionKey + " doesn't exist.");
                return false;
            }
            // Create a console group which will contain the logs from our Proxy etc
            // console.groupCollapsed(`ACTION: ${actionKey}`);
            // Let anything that's watching the status know that we're dispatching an action
            this.status = 'action';
            // Actually call the action and pass it the Store context and whatever payload was passed
            this.actions[actionKey](this, payload);
            // Close our console group to keep things nice and neat
            // console.groupEnd();
            return true;
        };
        /**
         * Look for a mutation and modify the state object
         * if that mutation exists by calling it
         *
         * @param {string} mutationKey
         * @param {mixed} payload
         * @returns {boolean}
         * @memberof Store
         */
        Store.prototype.commit = function (mutationKey, payload) {
            // Run a quick check to see if this mutation actually exists
            // before trying to run it
            if (typeof this.mutations[mutationKey] !== 'function') {
                // console.log(`Mutation "${mutationKey}" doesn't exist`);
                return false;
            }
            // Let anything that's watching the status know that we're mutating state
            this.status = 'mutation';
            // Get a new version of the state by running the mutation and storing the result of it
            // this.mutations[mutationKey](this.state, payload);
            var newState = this.mutations[mutationKey](this.state, payload);
            // // Merge the old and new together to create a new state and set it
            // this.state = Object.assign(this.state, newState);
            this.stateLibrary.push(__assign({}, newState));
            return true;
        };
        return Store;
    }());

    var store = new Store({
        actions: actions,
        mutations: mutations,
        state: initialState,
    });

    var EVENTNAMES;
    (function (EVENTNAMES) {
        EVENTNAMES["dragstop"] = "dragstop";
    })(EVENTNAMES || (EVENTNAMES = {}));
    var DragHandler = /** @class */ (function () {
        function DragHandler(current, scaleFactor) {
            var _this = this;
            this.events = new EventBus('my-draghandler-eventbus');
            this.dragging = false;
            this.scaleFactor = scaleFactor;
            this.offsetX = current.canvas.offsetLeft;
            this.offsetY = current.canvas.offsetTop;
            this.current = current;
            this.setImage(current.image);
            // listen for mouse events
            current.canvas.addEventListener('mousedown', function (mouseEv) {
                _this.handleMouseDown(mouseEv);
            });
            current.canvas.addEventListener('mousemove', function (mouseEv) {
                _this.handleMouseMove(mouseEv);
            });
            current.canvas.addEventListener('mouseenter', function (mouseEv) {
                _this.handleMouseEnter(mouseEv);
            });
            current.canvas.addEventListener('mouseout', function (mouseEv) {
                _this.handleMouseOut(mouseEv);
            });
            current.canvas.addEventListener('mouseup', function (mouseEv) {
                _this.handleMouseUp(mouseEv);
            });
        }
        DragHandler.prototype.setImage = function (imageInfo) {
            this.imageInfo = imageInfo;
        };
        DragHandler.prototype.dragStopped = function () {
            var emitStopped = this.dragging;
            this.dragging = false;
            if (emitStopped) {
                this.events.emit(EVENTNAMES.dragstop, this.imageInfo);
                this.current.canvas.style.cursor = 'default';
                var _a = this.imageInfo, x = _a.x, y = _a.y;
                store.dispatch(STOREACTIONS.imageChange, { action: 'position', type: this.current.type, x: x, y: y });
            }
        };
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
        DragHandler.prototype.handleMouseEnter = function (ev) {
            ev.preventDefault();
            this.startX = ev.clientX - this.offsetX;
            this.startY = ev.clientY - this.offsetY;
            // Put your MouseEnter stuff here
            if (this.imageHittest(this.startX, this.startY)) {
                this.current.canvas.style.cursor = 'pointer';
            }
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
            var _b = this.current, canvas = _b.canvas, canvasContext = _b.canvasContext;
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);
            canvasContext.fillRect(x, y, x + w, y + h);
            this.imageInfo.x += dx;
            this.imageInfo.y += dy;
            canvasContext.drawImage(image, this.imageInfo.x, this.imageInfo.y, w, h);
        };
        // also done dragging
        DragHandler.prototype.handleMouseOut = function (ev) {
            ev.preventDefault();
            this.dragStopped();
        };
        // done dragging
        DragHandler.prototype.handleMouseUp = function (ev) {
            ev.preventDefault();
            this.dragStopped();
        };
        return DragHandler;
    }());

    function imageUploader(input) {
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

    var ContentHandler = /** @class */ (function () {
        function ContentHandler() {
            this.previousInfo = {};
        }
        /**
         * update
         */
        ContentHandler.prototype.update = function (formData, caller) {
            return __awaiter(this, void 0, void 0, function () {
                var info, dates, imageInput, imageReturn, _loop_1, date, imageDidChange;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.formElements = Array.from(formData);
                            info = {
                                venueInfo: [],
                            };
                            dates = {};
                            this.formElements.forEach(function (el) {
                                if (el.dataset.line) {
                                    dates[el.dataset.line] = dates[el.dataset.line] || [];
                                    dates[el.dataset.line].push(el);
                                }
                                else if (el.name) {
                                    info[el.name] = el.value;
                                }
                                else if (el.type === 'file') {
                                    imageInput = el.value ? el : null;
                                }
                            });
                            if (!imageInput) return [3 /*break*/, 2];
                            return [4 /*yield*/, imageUploader(imageInput)];
                        case 1:
                            imageReturn = _a.sent();
                            info.image = imageReturn;
                            _a.label = 2;
                        case 2:
                            _loop_1 = function (date) {
                                var dateText = '', venueText = '', ticketText = '';
                                dates[date].forEach(function (dateLineEl) {
                                    if (dateLineEl.name.indexOf(DATEINFOTYPES.date) !== -1) {
                                        dateText = dateLineEl.value.toUpperCase();
                                    }
                                    if (dateLineEl.name.indexOf(DATEINFOTYPES.venue) !== -1) {
                                        venueText = dateLineEl.value.toUpperCase();
                                    }
                                    if (dateLineEl.name.indexOf(DATEINFOTYPES.tickets) !== -1 && dateLineEl.checked) {
                                        switch (dateLineEl.value) {
                                            case 'few':
                                                ticketText = 'Få billetter'.toUpperCase();
                                                break;
                                            case 'soldout':
                                                ticketText = 'Udsolgt'.toUpperCase();
                                                break;
                                            default:
                                                ticketText = '';
                                                break;
                                        }
                                    }
                                });
                                info.venueInfo.push({
                                    dateText: dateText,
                                    ticketText: ticketText,
                                    venueText: venueText,
                                });
                            };
                            for (date in dates) {
                                _loop_1(date);
                            }
                            if (JSON.stringify(this.previousInfo) !== JSON.stringify(info)) {
                                console.log('contentHandler - we got new info - publish', info);
                                imageDidChange = false;
                                if (info.image) {
                                    if (!this.previousInfo.image) {
                                        imageDidChange = true;
                                    }
                                    else if (this.previousInfo.image && this.previousInfo.image.baseURI !== info.image.baseURI) {
                                        imageDidChange = true;
                                    }
                                }
                                console.log('imageDidChange?', imageDidChange);
                                this.previousInfo = info;
                                store.dispatch(STOREACTIONS.updateContent, __assign(__assign({}, info), { imageDidChange: imageDidChange }));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ContentHandler;
    }());
    var contentHandler = new ContentHandler();

    // import { ImagePlacementPicker } from './imageplacement';
    var ImageHandler = /** @class */ (function () {
        // TODO: VisualScaling
        // private scalers: {
        //   [RATIOTYPES.square]: ManualScaler;
        //   [RATIOTYPES.wide]: ManualScaler;
        // } = {
        //   [RATIOTYPES.square]: null,
        //   [RATIOTYPES.wide]: null,
        // };
        function ImageHandler(parentForm) {
            var _a, _b;
            this.containers = [];
            this.imagePickerFrag = document.createElement('div');
            this.imageFileElement = (function () {
                var imageFileElement = document.createElement('input');
                imageFileElement.type = 'file';
                imageFileElement.style.display = 'none';
                return imageFileElement;
            })();
            this.imageFileValue = (function () {
                var imageFileValue = document.createElement('small');
                imageFileValue.className = 'file-value';
                return imageFileValue;
            })();
            this.parents = (_a = {},
                _a[RATIOTYPES.square] = null,
                _a[RATIOTYPES.wide] = null,
                _a);
            this.prevScale = (_b = {},
                _b[RATIOTYPES.square] = 1,
                _b[RATIOTYPES.wide] = 1,
                _b);
            for (var key in store.state.imageScale) {
                if (key) {
                    this.prevScale[key] = store.state.imageScale[key];
                }
            }
            this.parentForm = parentForm;
            // TODO: VisualScaling
            // eventhandler.subscribe([STATENAMES.imageScale], (imageScale, state) => {
            //   let changed = '';
            //   for (const key in imageScale) {
            //     if (imageScale[key] !== this.prevScale[key]) {
            //       this.prevScale[key] = imageScale[key];
            //       changed = key;
            //     }
            //   }
            //   this.scalers[changed].scaleElement();
            // });
        }
        ImageHandler.prototype.render = function () {
            var _this = this;
            var fileElement = document.createElement('div');
            fileElement.className = 'form-element flex flex-align--center';
            /** Actual file picker  */
            fileElement.appendChild(this.imageFileElement);
            /** Button */
            var imageButton = document.createElement('button');
            imageButton.className = 'button button--file';
            imageButton.innerText = 'Vælg billede';
            fileElement.appendChild(imageButton);
            fileElement.appendChild(this.imageFileValue);
            /** eventlisteners */
            imageButton.addEventListener('click', function (ev) {
                ev.preventDefault();
                _this.imageFileElement.click();
            });
            this.imageFileElement.addEventListener('change', this.change.bind(this));
            this.imagePickerFrag.appendChild(fileElement);
            return this.imagePickerFrag;
        };
        ImageHandler.prototype.change = function () {
            var _this = this;
            var splitValue = this.imageFileElement.value.split('\\');
            this.imageFileValue.innerHTML = splitValue[splitValue.length - 1];
            contentHandler.update(this.parentForm.elements, 'imagepicker');
            this.clearHandlers();
            store.state.canvases.forEach(function (element) {
                _this.renderHandlers(element, element.configName);
            });
        };
        ImageHandler.prototype.clearHandlers = function () {
            var i = 0;
            while (i < this.containers.length) {
                this.containers[i].remove();
                i++;
            }
            this.containers.length = 0;
        };
        ImageHandler.prototype.debounce = function (imageScale, type) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(function () {
                var _a;
                store.dispatch(STOREACTIONS.setImageScale, (_a = {}, _a[type] = parseInt(imageScale, 10) / 100, _a));
                store.dispatch(STOREACTIONS.imageChange, { action: 'scale', type: type, scale: parseInt(imageScale, 10) / 100 });
            }, 250);
        };
        ImageHandler.prototype.renderHandlers = function (element, configName) {
            var _this = this;
            var handlingFieldset = document.createElement('fieldset');
            handlingFieldset.className = 'form-element margin-m--b';
            this.containers.push(handlingFieldset);
            var handlingLegend = document.createElement('legend');
            handlingLegend.className = 'legend';
            handlingLegend.innerHTML = element.header;
            handlingFieldset.appendChild(handlingLegend);
            var handlingElement = document.createElement('div');
            handlingElement.className = 'form-element flex flex-justify--between flex-align--center';
            handlingFieldset.appendChild(handlingElement);
            // TODO: VisualScaling
            // const { image, scaleFactor, type, wrapper } = element;
            var type = element.type;
            this.parents[type] = handlingElement;
            // TODO: VisualScaling
            // this.scalers[type] =
            //   this.scalers[type] || new ManualScaler({ image, parent: handlingElement, scaleFactor, type, wrapper });
            /**
             * Scaler button
             */
            var scaleImage = document.createElement('div');
            scaleImage.innerHTML = 'Skalér billede:';
            // TODO: VisualScaling
            // scaleImage.className = 'button';
            // scaleImage.addEventListener('click', () => {
            //   this.scalers[type].scaleElement();
            // });
            handlingElement.appendChild(scaleImage);
            /**
             * Scaler element
             */
            var scalerLabel = document.createElement('div');
            var scalerElement = document.createElement('input');
            scalerElement.style.textAlign = 'right';
            scalerElement.type = 'number';
            scalerElement.value = '100';
            scalerElement.addEventListener('keyup', function () {
                _this.debounce(scalerElement.value, element.type);
            });
            scalerLabel.appendChild(scalerElement);
            var textInput = document.createTextNode('%');
            scalerLabel.appendChild(textInput);
            handlingElement.appendChild(scalerLabel);
            // const cover = document.createElement('div');
            // cover.className = 'button';
            // cover.innerHTML = 'Cover';
            // handlingElement.appendChild(cover);
            // cover.addEventListener('click', () => {
            //   console.log('image COVER!');
            //   // store.dispatch(STOREACTIONS.imageChange, true);
            // });
            // const stretch = document.createElement('div');
            // stretch.className = 'button';
            // stretch.innerHTML = 'Stretch';
            // handlingElement.appendChild(stretch);
            // stretch.addEventListener('click', () => {
            //   console.log('image STRETCH!');
            //   // store.dispatch(STOREACTIONS.imageChange, true);
            // });
            /** Image placement */
            // const imagePlacement = new ImagePlacementPicker(element.configName);
            // handlingFieldset.appendChild(imagePlacement.render());
            this.imagePickerFrag.appendChild(handlingFieldset);
        };
        return ImageHandler;
    }());

    var PLACEMENTNAMES;
    (function (PLACEMENTNAMES) {
        PLACEMENTNAMES["bottom"] = "bottom";
        PLACEMENTNAMES["bottomleft"] = "bottomleft";
        PLACEMENTNAMES["bottomright"] = "bottomright";
        PLACEMENTNAMES["center"] = "center";
        PLACEMENTNAMES["left"] = "left";
        PLACEMENTNAMES["right"] = "right";
        PLACEMENTNAMES["top"] = "top";
        PLACEMENTNAMES["topleft"] = "topleft";
        PLACEMENTNAMES["topright"] = "topright";
    })(PLACEMENTNAMES || (PLACEMENTNAMES = {}));

    function bottomRight(options) {
        var cHeight = options.cHeight, cWidth = options.cWidth, h = options.h, w = options.w;
        var y = cHeight - h, x = cWidth - w;
        return { x: x, y: y };
    }

    function bottom(options) {
        var cHeight = options.cHeight, cWidth = options.cWidth, h = options.h, w = options.w;
        var y = cHeight - h, x = cWidth / 2 - w / 2;
        return { x: x, y: y };
    }

    function bottomLeft(options) {
        var cHeight = options.cHeight, h = options.h;
        var y = cHeight - h, x = 0;
        return { x: x, y: y };
    }

    function center(options) {
        var cHeight = options.cHeight, cWidth = options.cWidth, h = options.h, w = options.w;
        var y = cHeight / 2 - h / 2, x = cWidth / 2 - w / 2;
        return { x: x, y: y };
    }

    function left(options) {
        var cHeight = options.cHeight, h = options.h;
        var y = cHeight / 2 - h / 2, x = 0;
        return { x: x, y: y };
    }

    function right(options) {
        var cHeight = options.cHeight, cWidth = options.cWidth, h = options.h, w = options.w;
        var y = cHeight / 2 - h / 2, x = cWidth - w;
        return { x: x, y: y };
    }

    function top(options) {
        var cWidth = options.cWidth, w = options.w;
        var y = 0, x = cWidth / 2 - w / 2;
        return { x: x, y: y };
    }

    function topLeft() {
        var y = 0, x = 0;
        return { x: x, y: y };
    }

    function topRight(options) {
        var cWidth = options.cWidth, w = options.w;
        var y = 0, x = cWidth - w;
        return { x: x, y: y };
    }

    function imagePositioner(options, pos) {
        switch (pos) {
            case PLACEMENTNAMES.bottom:
                return bottom(options);
            case PLACEMENTNAMES.bottomleft:
                return bottomLeft(options);
            case PLACEMENTNAMES.bottomright:
                return bottomRight(options);
            case PLACEMENTNAMES.center:
                return center(options);
            case PLACEMENTNAMES.left:
                return left(options);
            case PLACEMENTNAMES.right:
                return right(options);
            case PLACEMENTNAMES.top:
                return top(options);
            case PLACEMENTNAMES.topleft:
                return topLeft();
            case PLACEMENTNAMES.topright:
                return topRight(options);
        }
    }

    function initialscaler(scalerOptions) {
        var cHeight = scalerOptions.cHeight, cWidth = scalerOptions.cWidth, iHeight = scalerOptions.iHeight, iWidth = scalerOptions.iWidth, type = scalerOptions.type;
        var w = cWidth > iWidth ? cWidth : iWidth;
        var h = cHeight > iHeight ? cHeight : iHeight;
        var ratio = 1;
        if (iWidth > iHeight) {
            ratio = iHeight / iWidth;
            if (type === RATIOTYPES.square) {
                ratio = iWidth / iHeight;
                h = cHeight;
                w = cWidth * ratio;
            }
            else if (type === RATIOTYPES.wide) {
                ratio = iHeight / iWidth;
                w = cWidth;
                h = cWidth * ratio;
            }
        }
        else if (iWidth < iHeight) {
            if (type === RATIOTYPES.square) {
                ratio = iHeight / iWidth;
                w = cWidth;
                h = cHeight * ratio;
            }
            else if (type === RATIOTYPES.wide) {
                ratio = iHeight / iWidth;
                w = cWidth;
                h = cWidth * ratio;
            }
        }
        else {
            if (type === RATIOTYPES.square) {
                w = cWidth;
                h = cHeight;
            }
            else if (type === RATIOTYPES.wide) {
                w = h = cWidth;
            }
        }
        h = h * store.state.imageScale[type];
        w = w * store.state.imageScale[type];
        return { h: h, w: w };
    }

    function getTabs() {
        var t = [];
        for (var i = 0; i < 100; i += 8) {
            t.push(i);
        }
        return t;
    }
    var simpleTextStyler = /** @class */ (function () {
        function simpleTextStyler() {
            this.sizes = [];
            this.baseSize = undefined;
            this.font = undefined;
            this.controlChars = '{}\n\t';
            this.spaceSize = 0;
            this.tabSize = 8; // in spaceSize units
            this.width = 0;
            this.tabs = getTabs();
        }
        simpleTextStyler.prototype.getNextTab = function (x) {
            var i = 0;
            while (i < this.tabs.length) {
                if (x < this.tabs[i] * this.tabSize * this.spaceSize) {
                    return this.tabs[i] * this.tabSize * this.spaceSize;
                }
                i++;
            }
            return this.tabs[i - 1] * this.tabSize * this.spaceSize;
        };
        simpleTextStyler.prototype.getFontSize = function (font) {
            var numFind = /[0-9]+/;
            var number = parseInt(numFind.exec(font)[0], 10);
            if (isNaN(number)) {
                throw Error('SimpleTextStyler Cant find font size');
            }
            return Number(number);
        };
        simpleTextStyler.prototype.setFont = function (context) {
            this.font = context.font;
            this.baseSize = this.getFontSize(this.font);
            for (var i = 32; i < 256; i++) {
                this.sizes[i - 32] = context.measureText(String.fromCharCode(i), 0, 0).width / this.baseSize;
            }
            this.spaceSize = this.sizes[0];
        };
        simpleTextStyler.prototype.drawText = function (context, text, x, y, size) {
            var _this = this;
            this.width = 0;
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
            var renderText = function (textToRender) {
                ctx.save();
                ctx.fillStyle = colour;
                ctx.translate(x, y);
                ctx.scale(scale, scale);
                ctx.fillText(textToRender, 0, 0);
                _this.width += ctx.measureText(textToRender).width;
                ctx.restore();
            };
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
            return this.width;
        };
        return simpleTextStyler;
    }());

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

    var eventhandler = new PubSub();
    var HandlingStateChange = /** @class */ (function () {
        function HandlingStateChange() {
            var _this = this;
            this.state = __assign({}, store.state);
            store.events.subscribe('stateChange', function (newState, key) {
                if (_this.state[key] !== newState[key] && JSON.stringify(_this.state[key]) !== JSON.stringify(newState[key])) {
                    eventhandler.publish(key, newState[key], newState);
                    _this.state = __assign({}, newState);
                }
            });
        }
        return HandlingStateChange;
    }());
    new HandlingStateChange();

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
        function CanvasCreator(container, type) {
            var _this = this;
            this.containerWidth = 640;
            this.canvasContainer = document.createElement('div');
            this.canvasConfig = {
                square: {
                    fontSize: 45,
                    header: 'Banner: Instagram',
                    height: 900,
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
                    left: 30,
                    ratio: 7 / 19,
                    top: 30,
                    type: RATIOTYPES.wide,
                    width: 1900,
                },
            };
            this.currentCanvas = [];
            this.imageHasChanged = false;
            this.simpleTextStyler = new simpleTextStyler();
            this.container = container;
            this.containerWidth = container.clientWidth;
            this.canvasContainer.className = 'flex flex-wrap flex-start';
            this.container.appendChild(this.canvasContainer);
            this.setTheme(store.state.theme, false);
            this.currentType = type;
            this.addAll(type);
            eventhandler.subscribe(STATENAMES.theme, function (theme, _state) {
                _this.setTheme(theme);
            });
            eventhandler.subscribe([STATENAMES.imageChange], function (imageChange, _state) {
                _this.imageHasChanged = imageChange;
                if (_this.imageHasChanged.type === _this.currentType) {
                    _this.handleContent();
                }
            });
            eventhandler.subscribe([STATENAMES.userContent], function (userContent) {
                _this.handleContent(userContent);
            });
        }
        CanvasCreator.prototype.setTheme = function (theme, update) {
            var _this = this;
            if (update === void 0) { update = true; }
            this.theme = theme;
            if (!this.theme.loaded) {
                var themeFont = document.createElement('div');
                themeFont.setAttribute('style', "font-family: \"" + this.theme.fontFamily + "\";visibility: hidden;");
                themeFont.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ . abcdefghijklmnopqrstuvwxyzæøå . 0987654321';
                document.body.appendChild(themeFont);
                setTimeout(function () {
                    if (update) {
                        _this.handleContent();
                    }
                    _this.theme.loaded = true;
                }, 200);
            }
            else if (update) {
                this.handleContent();
            }
        };
        CanvasCreator.prototype.addAll = function (type) {
            this.addCanvas(type);
            this.updateState();
        };
        CanvasCreator.prototype.addCanvas = function (configName) {
            var _a = this.canvasConfig[configName], header = _a.header, height = _a.height, type = _a.type, width = _a.width;
            var wrapper = document.createElement('div');
            wrapper.className = 'margin-l--b';
            wrapper.id = "wrapper" + type;
            this.canvasContainer.appendChild(wrapper);
            var containerThing = document.createElement('div');
            var head = document.createElement('h5');
            head.innerHTML = header;
            wrapper.appendChild(head);
            var canvaswrapper = document.createElement('div');
            canvaswrapper.className = 'canvaswrapper';
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
                scaleFactor: scaleFactor, wrapper: canvaswrapper });
            this.currentCanvas.push(curCanvas);
            canvas.height = height;
            canvas.width = width;
            canvaswrapper.appendChild(containerThing);
            canvaswrapper.appendChild(canvas);
            wrapper.appendChild(canvaswrapper);
            this.resetCanvas(curCanvas);
        };
        CanvasCreator.prototype.canvasFont = function (cfgName) {
            return this.canvasConfig[cfgName].fontSize + "px " + this.theme.fontFamily;
        };
        CanvasCreator.prototype.handleContent = function (clear) {
            if (clear === void 0) { clear = true; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, artist_1, image_1, tourname_1, venueInfo_1;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!store.state.userContent) return [3 /*break*/, 2];
                            _a = store.state.userContent, artist_1 = _a.artist, image_1 = _a.image, tourname_1 = _a.tourname, venueInfo_1 = _a.venueInfo;
                            return [4 /*yield*/, asyncForEach(this.currentCanvas, function (current) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (clear) {
                                                    this.resetCanvas(current);
                                                }
                                                if (!image_1) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.handleImage(image_1, current)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2:
                                                if (!(artist_1 || tourname_1)) return [3 /*break*/, 4];
                                                return [4 /*yield*/, this.handleText(artist_1, tourname_1, current)];
                                            case 3:
                                                _a.sent();
                                                _a.label = 4;
                                            case 4:
                                                if (!venueInfo_1) return [3 /*break*/, 6];
                                                return [4 /*yield*/, this.handleDates(venueInfo_1, current)];
                                            case 5:
                                                _a.sent();
                                                _a.label = 6;
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        CanvasCreator.prototype.handleDates = function (venueInfo, current) {
            return __awaiter(this, void 0, void 0, function () {
                var canvasContext, configName, cfg, dateTexts, baseTop, maxTop, counter, baseLeft, lefty, widest, _i, venueInfo_2, venueInf, dateText, ticketText, venueText, theTopPos, returnedStuff;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            canvasContext = current.canvasContext, configName = current.configName;
                            cfg = this.canvasConfig[configName];
                            dateTexts = [];
                            canvasContext.textBaseline = 'alphabetic';
                            return [4 /*yield*/, (canvasContext.font = this.canvasFont(configName))];
                        case 1:
                            _a.sent();
                            baseTop = cfg.top * 2 + cfg.fontSize * 2 + cfg.top + cfg.fontSize;
                            maxTop = canvasContext.canvas.height - this.currentCanvas[0].top;
                            counter = 0;
                            baseLeft = cfg.left * 2;
                            lefty = baseLeft;
                            widest = 0;
                            this.simpleTextStyler.setFont(canvasContext);
                            _i = 0, venueInfo_2 = venueInfo;
                            _a.label = 2;
                        case 2:
                            if (!(_i < venueInfo_2.length)) return [3 /*break*/, 5];
                            venueInf = venueInfo_2[_i];
                            dateText = venueInf.dateText, ticketText = venueInf.ticketText, venueText = venueInf.venueText;
                            if (!dateText) return [3 /*break*/, 4];
                            dateTexts.push("{" + this.theme.date + dateText + "} {" + this.theme.venue + venueText + " {-" + ticketText + "}}");
                            theTopPos = baseTop + cfg.fontSize * counter;
                            if (theTopPos > maxTop) {
                                // Reset topPos to base
                                theTopPos = baseTop;
                                // calculate new leftpos
                                lefty = Math.round(lefty + widest + baseLeft);
                                // Reset counter and widest
                                counter = 0;
                                widest = 0;
                            }
                            return [4 /*yield*/, this.simpleTextStyler.drawText(canvasContext, "{" + this.theme.date + dateText + "} {" + this.theme.venue + venueText + " {-" + ticketText + "}}", lefty, theTopPos, cfg.fontSize)];
                        case 3:
                            returnedStuff = _a.sent();
                            widest = returnedStuff > widest ? returnedStuff : widest;
                            // if (cfgName === 'wide') {
                            //   canvasContext.beginPath(); // Start a new path
                            //   canvasContext.moveTo(lefty, theTopPos); // Move the pen to (30, 50)
                            //   canvasContext.lineTo(lefty, theTopPos + 100); // Draw a line to (150, 100)
                            //   canvasContext.strokeStyle = '#ff0000';
                            //   canvasContext.lineWidth = 2;
                            //   canvasContext.stroke();
                            //   canvasContext.fillStyle = 'green';
                            //   canvasContext.fillRect(lefty, theTopPos - 70, widest, 20);
                            // }
                            counter++;
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        CanvasCreator.prototype.handleImage = function (image, current) {
            return __awaiter(this, void 0, void 0, function () {
                var canvas, canvasContext, type, imageHasChanged, options, imgSize, imgPos, _a, image_2, x, y, w, h;
                return __generator(this, function (_b) {
                    canvas = current.canvas, canvasContext = current.canvasContext, type = current.type;
                    imageHasChanged = this.imageHasChanged;
                    // let imageReturn;
                    if (imageHasChanged !== false) {
                        if (image && (imageHasChanged === true || imageHasChanged === type)) {
                            this.image = image;
                            if (current.image)
                                delete current.image;
                        }
                        options = {
                            cHeight: canvas.height,
                            cWidth: canvas.width,
                            iHeight: this.image.height,
                            iWidth: this.image.width,
                            type: type,
                        };
                        imgSize = initialscaler(options);
                        imgPos = current.image ? { x: current.image.x, y: current.image.y } : { x: 0, y: 0 };
                        if (imageHasChanged.type === type) {
                            switch (imageHasChanged.action) {
                                case 'scale':
                                    imgSize = initialscaler(options);
                                    break;
                                case 'position':
                                    imgPos = { x: imageHasChanged.x, y: imageHasChanged.y };
                                    break;
                                default:
                                    imgPos = imagePositioner(__assign({ options: options }, imgSize), store.state.imagePosition);
                            }
                        }
                        current.image = __assign(__assign({ image: this.image }, imgPos), imgSize);
                    }
                    if (current.image) {
                        _a = current.image, image_2 = _a.image, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
                        canvasContext.drawImage(image_2, x, y, w, h);
                        if (current.dragImage) {
                            current.dragImage.setImage(current.image);
                            return [2 /*return*/];
                        }
                        current.dragImage = new DragHandler(current, current.scaleFactor);
                        current.dragImage.events.on(EVENTNAMES.dragstop, function (getBack) {
                            var detail = getBack.detail;
                            current.image = __assign(__assign({}, current.image), detail);
                        });
                    }
                    return [2 /*return*/];
                });
            });
        };
        CanvasCreator.prototype.handleText = function (artist, tourname, current) {
            return __awaiter(this, void 0, void 0, function () {
                var canvasContext, configName, cfg, fontSize, tournameTop, headerString;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            canvasContext = current.canvasContext, configName = current.configName;
                            cfg = this.canvasConfig[configName];
                            fontSize = cfg.fontSize;
                            return [4 /*yield*/, (canvasContext.font = this.canvasFont(configName))];
                        case 1:
                            _a.sent();
                            canvasContext.textAlign = 'left';
                            canvasContext.textBaseline = 'top';
                            tournameTop = cfg.top * 2;
                            headerString = "{" + this.theme.artist + artist.toUpperCase() + "}\n{" + this.theme.tourname + tourname.toUpperCase() + "}";
                            this.simpleTextStyler.setFont(canvasContext);
                            if (!headerString) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.simpleTextStyler.drawText(canvasContext, headerString, cfg.left * 2, tournameTop, fontSize)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            this.bannerName = artist.replace(/\s/g, '-') + "_" + tourname.replace(/\s/g, '-');
                            canvasContext.measureText(headerString).actualBoundingBoxAscent;
                            return [2 /*return*/];
                    }
                });
            });
        };
        CanvasCreator.prototype.resetCanvas = function (currentCfg) {
            currentCfg.canvasContext.clearRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
            currentCfg.canvasContext.beginPath(); // ADD THIS LINE!<<<<<<<<<<<<<
            currentCfg.canvasContext.moveTo(0, 0);
            currentCfg.canvasContext.stroke();
            currentCfg.canvasContext.fillStyle = this.theme.bgColor + ";";
            currentCfg.canvasContext.fillRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
        };
        CanvasCreator.prototype.updateState = function () {
            store.dispatch(STOREACTIONS.updateCanvases, this.currentCanvas);
        };
        return CanvasCreator;
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
    function saveToDisk(bannerName) {
        var currentArray = store.state[STATENAMES.canvases];
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

    var Fuse = /** @class */ (function () {
        function Fuse() {
        }
        Fuse.prototype.light = function (el, timer) {
            var _this = this;
            if (timer === void 0) { timer = 500; }
            if (el)
                this.el = el;
            this.timer = setTimeout(function () {
                _this.el.remove();
            }, timer);
        };
        Fuse.prototype.off = function () {
            clearTimeout(this.timer);
        };
        return Fuse;
    }());
    var colorSquare = function (colorName) {
        return "<div class=\"colorsquare\" data-color=\"" + colorName + "\"><span style=\"background: " + colorName + ";\"></span></div>";
    };
    var ColorPicker = /** @class */ (function () {
        function ColorPicker(names) {
            var _this = this;
            this.colorPickerDiv = document.createElement('div');
            this.names = names;
            this.state = __assign({}, store.state);
            this.theme = this.state.theme;
            this.colorPickerDiv.className = 'form-element colorpicker-layout';
            eventhandler.subscribe('theme', function (theme, newState) {
                _this.state = newState;
                _this.theme = theme;
                _this.render();
            });
            this.fuse = new Fuse();
        }
        ColorPicker.prototype.colorPicking = function (theme, name) {
            var _this = this;
            var colorPickingEl = document.createElement('div');
            colorPickingEl.className = 'colorpicking';
            var colorSquares = [];
            theme.colorPicks.forEach(function (color) {
                colorSquares.push(colorSquare(color));
            });
            colorPickingEl.innerHTML = colorSquares.join('');
            var childrenArray = Array.from(colorPickingEl.children);
            childrenArray.forEach(function (child) {
                child.addEventListener('click', function (ev) {
                    var _a;
                    ev.preventDefault();
                    ev.stopPropagation();
                    store.dispatch(STOREACTIONS.alterTheme, (_a = {}, _a[name] = child.dataset.color, _a));
                    colorPickingEl.remove();
                });
            });
            this.fuse.light(colorPickingEl, 100000);
            colorPickingEl.addEventListener('mouseenter', function () {
                _this.fuse.off();
            });
            colorPickingEl.addEventListener('mouseleave', function () {
                _this.fuse.light();
            });
            return colorPickingEl;
        };
        ColorPicker.prototype.render = function () {
            var _this = this;
            while (this.colorPickerDiv.firstChild) {
                this.colorPickerDiv.firstChild.remove();
            }
            var theme = this.theme;
            this.names.forEach(function (name) {
                var colorPickerEl = document.createElement('div');
                colorPickerEl.className = "colorpicker colorpicker--" + name;
                colorPickerEl.innerHTML = colorSquare(theme[name]) + " " + name;
                colorPickerEl.addEventListener('click', function () {
                    colorPickerEl.appendChild(_this.colorPicking(theme, name));
                });
                _this.colorPickerDiv.appendChild(colorPickerEl);
            });
            return this.colorPickerDiv;
        };
        return ColorPicker;
    }());

    function themeList(themes, currentTheme) {
        var themeOption = [];
        for (var key in themes) {
            if (themes[key]) {
                themeOption.push("<option " + (key === currentTheme ? 'selected=true' : '') + " value=\"" + key + "\">" + key + "</option>");
            }
        }
        return themeOption.join('');
    }
    var themePicker = function (themes, currentTheme) { return "\n  <div class=\"form-element\">\n    <label class=\"form-label\">Tema</label>\n    <div class=\"form-input form-input--select\">\n      <select data-type=\"themepicker\">\n        " + themeList(themes, currentTheme) + "\n      </select>\n    </div>\n  </div>\n"; };
    var ThemePicker = /** @class */ (function () {
        function ThemePicker() {
            // eventhandler;
        }
        ThemePicker.prototype.render = function () {
            var themePickerDiv = document.createElement('div');
            themePickerDiv.className = 'form-element';
            themePickerDiv.innerHTML = themePicker(themes, 'modern');
            return themePickerDiv;
        };
        return ThemePicker;
    }());

    var createLine = function (idx) { return "\n  <div class=\"line-item date margin-s--r\">\n    <input class=\"form-input form-input--small\" data-line=\"" + idx + "\" type=\"text\" name=\"date-" + idx + "\" id=\"bdDate-" + idx + "\" />\n  </div>\n  <div class=\"line-item venue\">\n    <input class=\"form-input form-input--small\" data-line=\"" + idx + "\" type=\"text\" name=\"venue-" + idx + "\" id=\"bdVenue-" + idx + "\" />\n  </div>\n  <input data-line=\"" + idx + "\" type=\"radio\" name=\"tickets-" + idx + "\" value=\"reg\" checked hidden />\n  <label class=\"flex-item line-item radio\">\n    <input data-line=\"" + idx + "\" type=\"radio\" name=\"tickets-" + idx + "\" value=\"few\" />\n  </label>\n  <label class=\"flex-item line-item radio\">\n    <input data-line=\"" + idx + "\" type=\"radio\" name=\"tickets-" + idx + "\" value=\"soldout\" />\n  </label>\n  "; };
    var createHeader = function () { return "\n  <div class=\"flex width-1of1\">\n    <div class=\"form-label date margin-s--r\">Datoer</div>\n    <div class=\"form-label venue\">Spillested</div>\n    <div class=\"flex-item radio fs--smaller\">F\u00E5 bil.</div>\n    <div class=\"flex-item radio fs--smaller\">Udsolgt</div>\n  </div>\n  <div class=\"flex-item delete-item\"></div>\n  "; };
    var TourDates = /** @class */ (function () {
        function TourDates() {
            this.container = document.createElement('div');
            this.counter = 0;
            this.lineContainer = document.createElement('div');
        }
        TourDates.prototype.addItem = function () {
            var lineItem = document.createElement('div');
            lineItem.className = 'flex margin-s--b';
            lineItem.id = "line-" + this.counter;
            var lineItemInput = document.createElement('div');
            lineItemInput.className = 'flex width-1of1';
            lineItemInput.innerHTML = createLine(this.counter);
            lineItem.appendChild(lineItemInput);
            var deleteItem = document.createElement('div');
            deleteItem.className = 'flex-item line-item delete-item';
            if (this.counter !== 0) {
                deleteItem.innerHTML = '&times;';
                deleteItem.addEventListener('click', function () {
                    lineItem.remove();
                });
            }
            lineItem.appendChild(deleteItem);
            this.lineContainer.appendChild(lineItem);
            this.counter++;
        };
        // private deleteItem() {}
        TourDates.prototype.render = function () {
            var _this = this;
            this.addItem();
            var header = document.createElement('div');
            header.className = 'flex';
            header.innerHTML = createHeader();
            var addButton = document.createElement('div');
            addButton.className = 'button-add';
            addButton.innerHTML = '+';
            addButton.addEventListener('click', function () {
                _this.addItem();
            });
            this.container.className = 'form-element';
            this.container.appendChild(header);
            this.container.appendChild(this.lineContainer);
            this.container.appendChild(addButton);
            return this.container;
        };
        return TourDates;
    }());

    var formElement = function (name) { return "\n  <div class=\"form-element\">\n    <label class=\"form-label\">" + name + "</label>\n    <input class=\"form-input\" name=\"" + name.toLocaleLowerCase() + "\" type=\"text\" value=\"\" id=\"bdTourname\" placeholder=\"" + name + "\" />\n  </div>\n"; };
    function createForm() {
        var canvascontainer = document.getElementById('canvascontainer');
        var container = document.createDocumentFragment();
        var formEl = document.createElement('form');
        formEl.className = 'form-container';
        var canvasCreator = new CanvasCreator(canvascontainer, RATIOTYPES.wide);
        new CanvasCreator(canvascontainer, RATIOTYPES.square);
        formEl.addEventListener('change', function (ev) {
            var target = ev.target;
            if (target.nodeName === 'SELECT' && target.dataset.type === 'themepicker') {
                store.dispatch(STOREACTIONS.setThemeName, ev.target.value);
                store.dispatch(STOREACTIONS.setTheme, themes[ev.target.value]);
            }
        });
        /**
         * TEXT controls
         */
        var textContainer = document.createElement('div');
        textContainer.className = 'form-area';
        formEl.appendChild(textContainer);
        /** TourName */
        var tourNameContainer = document.createElement('div');
        tourNameContainer.innerHTML = formElement('Tourname');
        textContainer.appendChild(tourNameContainer);
        /** ArtistName */
        var artistNameContainer = document.createElement('div');
        artistNameContainer.innerHTML = formElement('Artist');
        textContainer.appendChild(artistNameContainer);
        /** TourDates */
        var tourDates = new TourDates();
        textContainer.appendChild(tourDates.render());
        /**
         * update button
         */
        var updateButton = document.createElement('button');
        updateButton.className = 'button';
        updateButton.value = 'submit';
        updateButton.innerText = 'Opdater';
        updateButton.addEventListener('click', function (ev) {
            ev.preventDefault();
            contentHandler.update(formEl.elements);
        });
        textContainer.appendChild(updateButton);
        /**
         * THEME controls
         */
        var themeContainer = document.createElement('div');
        themeContainer.className = 'form-area';
        formEl.appendChild(themeContainer);
        /** Themes */
        var themePicker = new ThemePicker();
        themeContainer.appendChild(themePicker.render());
        /** Colors */
        var colorPicker = new ColorPicker(['artist', 'date', 'tourname', 'venue']);
        themeContainer.appendChild(colorPicker.render());
        /**
         * IMAGE controls
         */
        var imageContainer = document.createElement('div');
        imageContainer.className = 'form-area';
        formEl.appendChild(imageContainer);
        /** Image */
        imageContainer.appendChild(new ImageHandler(formEl).render());
        /**
         * Add form element to container
         */
        container.appendChild(formEl);
        /** Buttons */
        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex flex-justify--between form-element';
        var saveButton = document.createElement('button');
        saveButton.className = 'button button--submit';
        saveButton.value = 'submit';
        saveButton.innerText = 'Gem';
        saveButton.addEventListener('click', function () {
            saveToDisk(canvasCreator.bannerName);
        });
        buttonContainer.appendChild(saveButton);
        container.appendChild(buttonContainer);
        return container;
    }

    var decode = function (hash) { return window.atob(hash); };
    var encode = function (str) { return window.btoa(str); };

    var DATES = [
        {
            expires: 'Jan 20 2022',
            username: 'signesvendsen',
        },
        {
            expires: 'Jan 20 2021',
            username: 'petersommer',
        },
    ];

    var TOKEN = 'bm_token';

    // const decodedData = window.atob(encodedData); // decode the string
    var NotLoggedIn = /** @class */ (function () {
        function NotLoggedIn() {
            this.toDay = new Date().getTime();
            console.log('not logged in');
        }
        /**
         * render
         */
        NotLoggedIn.prototype.render = function () {
            var _this = this;
            var loginForm = document.createElement('form');
            var userInput = document.createElement('input');
            loginForm.addEventListener('submit', function (ev) {
                ev.preventDefault();
                var val = userInput.value;
                var userData = DATES.find(function (el) { return el.username === val; });
                var expires = userData.expires;
                var userDate = new Date(expires);
                if (userDate && userDate.getTime() > _this.toDay) {
                    var encodedData = encode(JSON.stringify(userDate.getTime()));
                    localStorage.setItem(TOKEN, encodedData);
                    store.commit(STOREACTIONS.setLoginStatus, ELoginStatus.loggedIn);
                }
                else if (userDate && userDate.getTime() < _this.toDay) {
                    store.commit(STOREACTIONS.setLoginStatus, ELoginStatus.expired);
                }
                else {
                    store.commit(STOREACTIONS.setLoginStatus, ELoginStatus.notLoggedIn);
                }
            });
            loginForm.appendChild(userInput);
            return loginForm;
        };
        return NotLoggedIn;
    }());

    // import { eventhandler } from './util/eventhandler';
    // import { ELoginStatus, STATENAMES } from './util/initialstate';
    // import store from './util/store';
    // import store from './util/store';
    // import { STOREACTIONS } from './util/store/actions';
    var App = /** @class */ (function () {
        function App(elId) {
            var _this = this;
            this.body = document.body;
            this.appContainer = document.getElementById(elId);
            eventhandler.subscribe(STATENAMES.loginStatus, function (status, _state) {
                console.log('login status?', status);
                switch (status) {
                    case ELoginStatus.expired:
                        _this.tokenExpired();
                        break;
                    case ELoginStatus.loggedIn:
                        _this.renderForm();
                        break;
                    case ELoginStatus.notLoggedIn:
                    default:
                        _this.notLoggedIn();
                        break;
                }
            });
        }
        /**
         * init
         */
        App.prototype.init = function () {
            var token = localStorage.getItem(TOKEN);
            console.log('token', token);
            if (!token) {
                this.notLoggedIn();
            }
            else {
                var decodedToken = JSON.parse(decode(token));
                var decodedDate = new Date(decodedToken).getTime();
                if (decodedDate > new Date().getTime()) {
                    store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.loggedIn);
                }
                else {
                    store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.expired);
                }
            }
        };
        App.prototype.renderForm = function () {
            this.body.classList.remove('not-logged-in');
            this.appContainer.appendChild(createForm());
        };
        App.prototype.notLoggedIn = function () {
            this.body.classList.add('not-logged-in');
            var newLogin = new NotLoggedIn();
            this.appContainer.appendChild(newLogin.render());
        };
        App.prototype.tokenExpired = function () {
            this.body.classList.add('not-logged-in');
            console.log('tokenExpired');
        };
        return App;
    }());
    var APP = new App('app');

    APP.init();
    // window.addEventListener('beforeunload', (ev) => {
    //   console.log('beforeunload');
    //   ev.preventDefault();
    //   return (ev.returnValue = 'Did you remember to download your work?');
    // });

}());
