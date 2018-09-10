var WTCAutoplayVideo =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ExecuteControllers
 * Simple static class to instanciate and register all the controllers.
 *
 * @static
 * @author Marlon Marcello <marlon@wethecollective.com>
 * @version 1
 * @requirements
 * @created Nov 23, 2016
 */

/**
 * Stores controllers.
 * @type {Object}
 */
var controllersList = new Map();

var ExecuteControllers = function () {
  function ExecuteControllers() {
    _classCallCheck(this, ExecuteControllers);
  }

  _createClass(ExecuteControllers, null, [{
    key: 'instanciateAll',

    /**
     * Instanciate all the elements with registered controllers.
     * @param {String|Object} query  - Can be a string, ex: '[data-controller]' or
     *                                 an object, ex: {el: DOMNode, query: '[data-controller]'}
     * @param {String} controllerAtt - Attribute with the name of the controller.
     */
    value: function instanciateAll() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[data-controller]';
      var controllerAtt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data-controller';
      var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var els = null;

      if (typeof query === 'string') {
        els = document.querySelectorAll(query);
      } else if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
        if (!query.hasOwnProperty('el')) {
          throw 'Instanciate all is missing the DOMNode. Ex: instanciateAll({el: DOMNode, query: "[data-controller]"})';
        }

        if (!query.hasOwnProperty('query')) {
          query.query = '[data-controller]';
        }

        els = query.el.querySelectorAll(query.query);
      }

      if (els.length > 0) {
        for (var i = 0; i < els.length; i++) {
          var op = els[i];
          var cont = op.getAttribute(controllerAtt);

          if (cont) {
            ExecuteControllers.instanciate(op, op.getAttribute(controllerAtt), debug);
          }
        }
      }
    }

    /**
     * Instanciate controller and saves it in the data attribute.
     * @param {DOMNode} el             - Element.
     * @param {string|class}  controllerName - Name of the registered controller, or a Class.
     *
     * @return {DOMNode} Element.
     */

  }, {
    key: 'instanciate',
    value: function instanciate() {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var controllerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var controller = controllerName;

      try {
        if (typeof controllerName === 'string') {
          if (el.data && el.data.instanciated) {
            throw new Error('The element with the controller \'' + controllerName + '\' has already been instanciated. This error is non-critical and just means that something has tried to instanciate it twice.');
          }

          if (controllersList.has(controllerName)) {
            controller = controllersList.get(controllerName);
          } else {
            throw new Error('The controller \'' + controllerName + '\' has not been registered. Please make sure the controller is registering itself using ExecuteController.registerController(CLASS, \'OPTIONAL-NAME\').');
          }

          if (!debug) {

            var instance = new controller(el);

            return el;
          }
        }
      } catch (_error) {
        console.warn("Error: " + _error.message, _error.stack);
      }

      if (debug) {
        var _instance = new controller(el);
        return el;
      }
    }

    /**
     * Registers controllers
     * @param {Class}  controller     - Controller.
     * @param {string} [controllerName=''] - Name of the controller
     */

  }, {
    key: 'registerController',
    value: function registerController(controller) {
      var controllerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      try {
        if (!controllerName) {
          throw 'Controller name is required. Ex: ExecuteControllers.registerController(TestController, \'TestController\');';
        }

        if (controllersList.has(controllerName)) {
          console.warn('Controller ' + controllerName + ' is already registered.');
        } else {
          controllersList.set(controllerName, controller);
        }
      } catch (e) {}
    }

    /**
     * Get list of registered controllers.
     * @return {Map} List
     */

  }, {
    key: 'controllersList',
    get: function get() {
      return controllersList;
    }
  }]);

  return ExecuteControllers;
}();

/**
 * Element Controller
 * Base class to be extended by controllers.
 * It saves the instance and information on the element data for future reference.
 *
 * @static
 * @author Marlon Marcello <marlon@wethecollective.com>
 * @version 1
 * @requirements
 * @created Nov 23, 2016
 */


var ElementController = function () {
  function ElementController(element) {
    _classCallCheck(this, ElementController);

    this.element = element;
    this.element.data = this.element.data || {};
    this.element.data.controller = this;
    this.element.data.instanciated = true;
  }

  /**
   * Check if element exists in the DOM.
   * @return {Bool} True/False.
   */


  _createClass(ElementController, [{
    key: 'elementExistsInDOM',
    value: function elementExistsInDOM() {
      var element = void 0,
          exists = void 0;
      exists = this.element || null;
      if (!exists) {
        return false;
      }
      element = this.element;
      while (element) {
        if (element === document) {
          return true;
        }
        element = element.parentNode;
      }
      return false;
    }
  }]);

  return ElementController;
}();

// Export ElementController as defaultl


exports.default = ElementController;
exports.ExecuteControllers = ExecuteControllers;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wtcControllerElement = __webpack_require__(0);

var _wtcControllerElement2 = _interopRequireDefault(_wtcControllerElement);

var _wtcControllerViewports = __webpack_require__(2);

var _wtcControllerViewports2 = _interopRequireDefault(_wtcControllerViewports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoplayVideo = function (_Viewport) {
  _inherits(AutoplayVideo, _Viewport);

  function AutoplayVideo(element, options) {
    _classCallCheck(this, AutoplayVideo);

    var _this = _possibleConstructorReturn(this, (AutoplayVideo.__proto__ || Object.getPrototypeOf(AutoplayVideo)).call(this, element));

    var defaults = { fullWidth: false, vpOn: 0 };
    options = Object.assign({}, defaults, options);

    _this.hasStarted = false;
    _this.initiated = false;
    _this.options = {
      fullWidth: _this.element.classList.contains('autoplay-video--fullscreen') || options.fullWidth,
      vpOn: _this.element.hasAttribute('data-vp-on') ? parseInt(_this.element.getAttribute('data-vp-on')) : options.vpOn
    };

    if (_this.options.fullWidth && !_this.element.classList.contains('autoplay-video--fullscreen')) {
      _this.element.classList.add('autoplay-video--fullscreen');
    }

    _this._video = _this.element.querySelector('.autoplay-video__video');
    _this._fallback = _this.element.querySelector('.autoplay-video__fallback');

    _this._video.muted = true;
    _this._video.setAttribute('playsinline', '');
    _this._video.setAttribute('muted', '');

    if (navigator && navigator.connection) {
      console.log(1);
      if (navigator.connection.saveData) {
        console.log(2);
        _this.onFrozen(_this);
      } else {
        console.log(3);
        _this._video.addEventListener('canplay', _this.init.bind(_this), false);
      }
    } else if (_this._video.readyState >= 2) {
      console.log(4);
      _this.init();
    } else {
      console.log(5);
      _this._video.addEventListener('canplay', _this.init.bind(_this), false);
    }

    _this._video.addEventListener('error', _this.onFrozen.bind(_this), true);
    return _this;
  }

  _createClass(AutoplayVideo, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      if (!this.initiated) {
        this.initiated = true;
        this.ratio = this._video.videoWidth / this._video.videoHeight;

        if (this.options.fullWidth) {
          var resizeTimer = null;
          var resizeDebounce = function resizeDebounce() {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(function () {
              _this2.videoResize();
            }, 300);
          };

          resizeDebounce();
          window.addEventListener('resize', resizeDebounce);
        }

        if (this._video.hasAttribute('autoplay')) {
          this.playVideo();
        }
      }
    }
  }, {
    key: 'videoResize',
    value: function videoResize() {
      var targetW = this._video.parentNode.offsetWidth,
          targetH = this._video.parentNode.offsetHeight,
          targetRatio = targetW / targetH,
          newW = 0,
          newH = 0;

      if (targetRatio > this.ratio) {
        newW = targetW;
        newH = newW * this.ratio;
      } else {
        newH = targetH;
        newW = newH * this.ratio;
      }

      this._video.style.height = newH + "px";
      this._video.style.width = newW + "px";
    }
  }, {
    key: 'onPlay',
    value: function onPlay() {
      this.element.classList.add('is-playing');
      this.hasStarted = true;
    }
  }, {
    key: 'onFrozen',
    value: function onFrozen() {
      console.log(3, 'frozen');
      this.element.classList.add('is-frozen');
    }
  }, {
    key: 'onPause',
    value: function onPause() {
      this.element.classList.add('is-paused');
      this.hasStarted = false;
    }
  }, {
    key: 'pauseVideo',
    value: function pauseVideo() {
      this._video.pause();
      this.onPause();
    }
  }, {
    key: 'playVideo',
    value: function playVideo() {
      if (this._video.readyState >= 2) {
        if (this._video.paused) {
          var testPlay = this._video.play();

          try {
            if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1 && testPlay && testPlay instanceof Promise) {
              testPlay.then(this.onPlay.bind(this), this.onFrozen.bind(this));
            } else if (!this._video.paused) {
              this.onPlay();
            } else {
              this.onFrozen();
            }
          } catch (error) {
            this.onFrozen();
          }
        } else {
          this.onPlay();
        }
      } else {
        setTimeout(this.playVideo.bind(this), 500);
      }
    }
  }, {
    key: 'runAnimation',
    value: function runAnimation(topPercent) {
      if (topPercent > this.options.vpOn && this.initiated) {
        if (!this.hasStarted) this.playVideo();
      }
    }
  }, {
    key: 'video',
    get: function get() {
      return this._video;
    }
  }]);

  return AutoplayVideo;
}(_wtcControllerViewports.Viewport);

_wtcControllerElement.ExecuteControllers.registerController(AutoplayVideo, 'AutoplayVideo');

exports.default = AutoplayVideo;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewport = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Viewports / ViewportManager
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       =======================================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - *Author*          liamegan
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - *email*           liam@wethecollective.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - *Created*         2015-10-07 10:33:20
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - *namespace*       com.wtc.utilities
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - *Requirements*    jquery   ElementController   wethecollective.utilities.Scroller
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - *Description*     These are two classes that are used for inserting and maintinaing viewports. This is useful for running code when the user scrolls a particular viewport into view.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - *Edited by*       liamegan
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - *Edited*          2017-10-05
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - *Version*         1.0.22
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _wtcScroller = __webpack_require__(3);

var _wtcScroller2 = _interopRequireDefault(_wtcScroller);

var _wtcControllerElement = __webpack_require__(0);

var _wtcControllerElement2 = _interopRequireDefault(_wtcControllerElement);

var _wtcUtilityHelpers = __webpack_require__(4);

var _wtcUtilityHelpers2 = _interopRequireDefault(_wtcUtilityHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var ViewportManager = function () {
  function ViewportManager() {
    var _this = this,
        _arguments = arguments;

    _classCallCheck(this, ViewportManager);

    if (!instance) {
      instance = this;
    } else {
      return instance;
    }

    this.VPs = [];

    window.addEventListener('resize', function (e) {
      _this.resize(e);
    });

    _wtcScroller2.default.instance.bind('scroll', function () {
      var args = 1 <= _arguments.length ? [].slice.call(_arguments, 0) : [];
      _this.onScroll.apply(_this, args);
    });

    _wtcScroller2.default.instance.trigger('scroll');
  }

  _createClass(ViewportManager, [{
    key: 'tidy',
    value: function tidy() {
      if (!this.VPs || !this.VPs.length) {
        return;
      }

      var ref = this.VPs;
      for (var i = 0; i < ref.length; i++) {
        var VP = ref[i];
        VP.tidy();
      }
    }
  }, {
    key: 'registerViewport',
    value: function registerViewport(VP) {
      var exists = false;
      exists = this.VPs.indexOf(VP) >= 0;

      if (!exists) {
        this.VPs.push(VP);
      }

      VP.ID = this.VPs.length - 1;

      // This triggers the scroll event after a time after every viewport add
      if (this.scrollTriggerTimeout) clearTimeout(this.scrollTriggerTimeout);
      this.scrollTriggerTimeout = setTimeout(function () {
        _wtcScroller2.default.instance.trigger('scroll');
      }, 500);

      return VP.ID;
    }
  }, {
    key: 'unregisterViewport',
    value: function unregisterViewport(VP) {
      var f = this.VPs.filter(function (el) {
        return el !== VP;
      });

      this.VPs = f;
    }
  }, {
    key: 'getNextVP',
    value: function getNextVP(ID) {
      return this.VPs[ID + 1];
    }
  }, {
    key: 'resize',
    value: function resize(e) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('scroll', true, false);
      window.dispatchEvent(event);

      this.VPs.forEach(function (item, i) {
        try {
          return item.resize();
        } catch (e) {}
      });
    }
  }, {
    key: 'onScroll',
    value: function onScroll(top, middle, bottom) {
      top = this.winTop;
      var win_height = window.innerHeight;
      bottom = win_height + top;
      middle = top + win_height / 2;
      var body = document.body;
      var html = document.documentElement;
      var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      var d = height;
      var per = top / (d - win_height);

      this.VPs.forEach(function (item, i) {
        var isOnScreen = item.isOnScreen({
          top: top,
          bottom: bottom
        });

        if (isOnScreen) {
          var topPercent = 0 - (item.top - bottom) / win_height * 100;
          var bottomPercent = (bottom - item.bottom) / win_height * 100;
          var middlePercent = middle / item.bottom * 100;

          try {
            item.runAnimation(topPercent, bottomPercent, middlePercent);
          } catch (e) {
            console.warn(item.element.getAttribute('id'), e.message, e.stack);
          }
        } else {
          try {
            item.reset(top < item.bottom);
          } catch (e) {
            console.warn(e);
          }
        }
      });
    }
  }, {
    key: 'navigateToNext',
    value: function navigateToNext(VP) {
      var nextVP = this.getNextVP(VP.ID);
      var now = window.pageYOffset;
      var point = nextVP.offsetMiddle();
      var duration = (now - point) * 1.5;

      if (duration < 0) {
        duration = duration * -1;
      }

      VP.element.scrollIntoView();
    }
  }, {
    key: 'winTop',
    get: function get() {
      var doc = document.documentElement;
      return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }
  }], [{
    key: 'instance',
    get: function get() {
      if (!instance) {
        instance = new ViewportManager();
      }
      return instance;
    }
  }]);

  return ViewportManager;
}();

var Viewport = function (_ElementController) {
  _inherits(Viewport, _ElementController);

  function Viewport(element) {
    _classCallCheck(this, Viewport);

    var _this2 = _possibleConstructorReturn(this, (Viewport.__proto__ || Object.getPrototypeOf(Viewport)).call(this, element));

    _this2.element = element;
    _this2.top = null;
    _this2.bottom = null;
    _this2.height = null;
    _this2.ID = null;
    _this2.reverse = _this2.element.getAttribute('data-reverse') && _this2.element.getAttribute('data-reverse') == 'true' ? true : false;

    ViewportManager.instance.registerViewport(_this2);
    return _this2;
  }

  _createClass(Viewport, [{
    key: 'tidy',
    value: function tidy() {
      var exists = this.elementExistsInDOM();
      if (!exists) {
        return ViewportManager.instance.unregisterViewport(this);
      }
    }
  }, {
    key: 'resize',
    value: function resize() {
      var set = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.top = this.absoluteTopPosition;
      this.height = this.element.offsetHeight;
      this.bottom = this.top + this.height;
    }
  }, {
    key: 'isOnScreen',
    value: function isOnScreen() {
      var screen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { top: 0, bottom: 500 };

      var display = this.element.currentStyle ? this.element.currentStyle.display : getComputedStyle(this.element, null).display;
      var pos = this.element.getBoundingClientRect();

      // when top and bottom are 0 the item is inside a wrapper with display none
      if (pos.bottom === 0 && pos.top === 0 || display == 'none') {
        return false;
      }

      this.resize();

      if (this.element.data.debug === true) {
        console.warn(' ');
        console.warn(this.element.getAttribute('id'));
        console.warn('-------------------');
        console.warn("Screen top: " + screen.top);
        console.warn("My top: " + this.top);
        console.warn(this.element.getBoundingClientRect().top);
        console.warn("Screen bottom: " + screen.bottom);
        console.warn("My bottom: " + this.bottom);
        console.warn(screen.top <= this.bottom && screen.bottom >= this.top);
        console.log(this.element);
      }

      if (screen.top <= this.bottom && screen.bottom >= this.top) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'runAnimation',
    value: function runAnimation(topPercent, bottomPercent, middlePercent) {
      var classString;
      if (topPercent > 0) {
        classString = 'vp-onscreen vp-on-10 vp-on-20 vp-on-30 vp-on-40 vp-on-50 vp-on-60 vp-on-70 vp-on-80 vp-on-90 vp-on-100';
        classString += ' vp-b-10 vp-b-20 vp-b-30 vp-b-40 vp-b-50 vp-b-60 vp-b-70 vp-b-80 vp-b-90 vp-b-100';

        if (this.reverse) {
          _wtcUtilityHelpers2.default.removeClass(classString, this.element);
        }

        _wtcUtilityHelpers2.default.addClass('vp-onscreen', this.element);

        if (topPercent >= 10) {
          _wtcUtilityHelpers2.default.addClass('vp-on-10 vp-onf-10', this.element);
          if (topPercent >= 20) {
            _wtcUtilityHelpers2.default.addClass('vp-on-20 vp-onf-20', this.element);
            if (topPercent >= 30) {
              _wtcUtilityHelpers2.default.addClass('vp-on-30 vp-onf-30', this.element);
              if (topPercent >= 40) {
                _wtcUtilityHelpers2.default.addClass('vp-on-40 vp-onf-40', this.element);
                if (topPercent >= 50) {
                  _wtcUtilityHelpers2.default.addClass('vp-on-50 vp-onf-50', this.element);
                  if (topPercent >= 60) {
                    _wtcUtilityHelpers2.default.addClass('vp-on-60 vp-onf-60', this.element);
                    if (topPercent >= 70) {
                      _wtcUtilityHelpers2.default.addClass('vp-on-70 vp-onf-70', this.element);
                      if (topPercent >= 80) {
                        _wtcUtilityHelpers2.default.addClass('vp-on-80 vp-onf-80', this.element);
                        if (topPercent >= 90) {
                          _wtcUtilityHelpers2.default.addClass('vp-on-90 vp-onf-90', this.element);
                          if (topPercent >= 100) {
                            _wtcUtilityHelpers2.default.addClass('vp-on-100 vp-onf-100', this.element);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (bottomPercent >= 10) {
          _wtcUtilityHelpers2.default.addClass('vp-b-10 vp-bf-10', this.element);
          if (bottomPercent >= 20) {
            _wtcUtilityHelpers2.default.addClass('vp-b-20 vp-bf-20', this.element);
            if (bottomPercent >= 30) {
              _wtcUtilityHelpers2.default.addClass('vp-b-30 vp-bf-30', this.element);
              if (bottomPercent >= 40) {
                _wtcUtilityHelpers2.default.addClass('vp-b-40 vp-bf-40', this.element);
                if (bottomPercent >= 50) {
                  _wtcUtilityHelpers2.default.addClass('vp-b-50 vp-bf-50', this.element);
                  if (bottomPercent >= 60) {
                    _wtcUtilityHelpers2.default.addClass('vp-b-60 vp-bf-60', this.element);
                    if (bottomPercent >= 70) {
                      _wtcUtilityHelpers2.default.addClass('vp-b-70 vp-bf-70', this.element);
                      if (bottomPercent >= 80) {
                        _wtcUtilityHelpers2.default.addClass('vp-b-80 vp-bf-80', this.element);
                        if (bottomPercent >= 90) {
                          _wtcUtilityHelpers2.default.addClass('vp-b-90 vp-bf-90', this.element);
                          if (bottomPercent >= 100) {
                            return _wtcUtilityHelpers2.default.addClass('vp-b-100 vp-bf-100', this.element);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: 'reset',
    value: function reset(fillDirection) {}
  }, {
    key: 'scrollY',
    get: function get() {
      var doc = document.documentElement;
      return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }
  }, {
    key: 'absoluteTopPosition',
    get: function get() {
      return this.element.getBoundingClientRect().top + this.scrollY;
    }
  }], [{
    key: 'middlePoint',
    get: function get() {
      return window.innerHeight / 2 + window.pageYOffset - this.absoluteTopPosition;
    }
  }, {
    key: 'top',
    get: function get() {
      return this.top;
    }
  }, {
    key: 'bottom',
    get: function get() {
      return this.bottom;
    }
  }, {
    key: 'offsetMiddle',
    get: function get() {
      return this.absoluteTopPosition + this.element.height() / 2;
    }
  }]);

  return Viewport;
}(_wtcControllerElement2.default);

// Register


_wtcControllerElement.ExecuteControllers.registerController(Viewport, 'Viewport');

exports.default = ViewportManager;
exports.Viewport = Viewport;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  Scroller
  =======================================
  Author      liamegan
  email       liam@wethecollective.com
  Created     2014-03-11 15:28:33
  namespace     wtc.utilities
  Requirements  jquery
  Description   This is a singleton class that is used for controlling and reporting on user scrolling.
  Edited by     liamegan
  Edited      2014-06-10 08:34:45
  Version     0.5
*/
var instance = null;

var Scroller = function () {
  function Scroller() {
    var _this = this;

    _classCallCheck(this, Scroller);

    if (!instance) {
      instance = this;
    } else {
      return instance;
    }

    this.events = {};

    window.addEventListener('scroll', function (e) {
      _this.onScroll(e);
    });

    return this;
  }

  _createClass(Scroller, [{
    key: 'getCanScroll',
    value: function getCanScroll() {
      return true;
    }
  }, {
    key: 'onScroll',
    value: function onScroll(e) {
      var bottom = void 0,
          middle = void 0,
          top = void 0,
          wHeight = void 0;

      if (!this.getCanScroll()) {
        return false;
      }

      wHeight = window.innerHeight;
      top = window.pageYOffset;
      bottom = wHeight + top;
      middle = top + wHeight / 2;

      this.trigger('scroll', top, bottom, middle);
      this.triggerPoints(this.oldTop, top, bottom, middle);
      this.oldTop = top;

      return this.oldTop;
    }
  }, {
    key: 'bind',
    value: function bind(topic, handler) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

      var ev = this.events[topic];
      if (!ev) {
        ev = this.events[topic] = [];
      }

      ev.push({
        handler: handler,
        context: context
      });

      return ev;
    }
  }, {
    key: 'bindTriggerPoint',
    value: function bindTriggerPoint(point, handler) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

      var tp = this.events.triggerpoint;
      if (!tp) {
        tp = this.events.triggerpoint = [];
      }

      return tp[point]({
        handler: handler,
        context: context
      });
    }
  }, {
    key: 'bindTriggerElement',
    value: function bindTriggerElement(element, handler) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

      var te = this.events.triggerelement;
      if (!te) {
        te = this.events.triggerelement = [];
      }

      te.push({
        element: element,
        handler: handler,
        context: context
      });

      return te;
    }
  }, {
    key: 'trigger',
    value: function trigger() {
      var results = [];
      var topic = arguments[0];
      var args = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];

      if (this.events[topic] !== null) {
        var ref = this.events[topic];
        for (var i = 0; i < ref.length; i++) {
          var event = ref[i];
          results.push(event.handler.apply(event.context, args));
        }

        return results;
      }
    }
  }, {
    key: 'triggerPoints',
    value: function triggerPoints(oldTop, top, bottom, middle) {
      var results = [];

      if (this.events.triggerpoint) {
        var events = this.events.triggerpoint.slice(oldTop, top);
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          results.push(event.handler.apply(event.context, args));
        }

        return results;
      }
    }
  }, {
    key: 'triggerElements',
    value: function triggerElements(oldTop, top, bottom, middle) {
      var results = [];
      if (this.events.triggerelement) {
        var ref = this.events.triggerelement;

        for (var i = 0; i < ref.length; i++) {
          var event = ref[i];
          var element_top = event.element.getBoundingClientRect().top;
          results.push(element_top >= oldTop && element_top < top ? event.handler.apply(event.context, args) : element_top <= oldTop && element_top > top ? event.handler.apply(event.context, args) : void 0);
        }

        return results;
      }
    }
  }], [{
    key: 'instance',
    get: function get() {
      if (!instance) {
        instance = new Scroller();
      }
      return instance;
    }
  }]);

  return Scroller;
}();

exports.default = Scroller;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utilities = {};

/**
 * floatRandomBetween
 * Generate a random float number max and min.
 * @min {number} Minimum value.
 * @max {number} Maximum value.
 * return {number} Random integer.
 */
utilities.floatRandomBetween = function (min, max) {
  return Math.random() * (max - min + 1) + min;
};

/**
 * randomBetween
 * Generate a random integer number max and min.
 * @min {number} Minimum value.
 * @max {number} Maximum value.
 * return {number} Random integer.
 */
utilities.randomBetween = function (min, max) {
  return Math.floor(utilities.floatRandomBetween(min, max));
};

/**
 * lerp
 * Linearly interpolate between two values by a unit interval
 * @param {number} x The lower value
 * @param {number} y The upper value
 * @param {number} amount the amount to interpolate. The expected value is a unit interval (a float between 0 and 1), but this *will* work with higher and lower values as well.
 * @return {number} The interpolated value
 */
utilities.lerp = function (x, y, amount) {
  return (1 - amount) * x + amount * y;
};

/**
 * getStyle
 * Get the current style value from an element.
 * @el {DOMNode} Target element.
 * @prop {string} CSS property name.
 * @stripUnit {boolean} Remove units.
 * return {string} Current CSS value WITH unit.
 */
utilities.getStyle = function (el, prop, stripUnit) {
  var strValue = "";

  if (window.getComputedStyle) {
    strValue = getComputedStyle(el).getPropertyValue(prop);
  }
  //IE
  else if (el.currentStyle) {
      try {
        strValue = el.currentStyle[prop];
      } catch (e) {}
    }

  if (stripUnit) {
    strValue = parseInt(strValue);
  }

  return strValue;
};

/**
 * Log
 * Simple log function to show different colors on the console.
 * @status {string} Status type.
 * @msg {string} Message to show.
 */
utilities.log = function (status, msg) {
  var bgc, color;

  switch (status) {
    case "success":
      color = "Green";
      bgc = "LimeGreen";
      break;
    case "info":
      color = "DodgerBlue";
      bgc = "Turquoise";
      break;
    case "error":
      color = "Black";
      bgc = "Red";
      break;
    case "warning":
      color = "Tomato";
      bgc = "Gold";
      break;
    default:
      color = "black";
      bgc = "White";
  }

  if ((typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object") {
    console.log(msg);
  } else {
    console.log("%c" + msg, "color:" + color + ";font-weight:bold; background-color: " + bgc + ";");
  }
};

/**
 * once
 * Fires an event only once and executes the callback.
 * @node {DOMElement} Dom element to attach event.
 * @type {String} Type of event.
 * @callback {function} Callback.
 */
utilities.once = function (node, type, callback) {
  node.addEventListener(type, function (e) {
    e.target.removeEventListener(e.type, arguments.callee);
    return callback(e);
  });
};

/**
 * shuffleArray
 * Shuffle an array.
 * @array Arrray to be shuffled.
 * return {array} Shuffled array.
 */
utilities.shuffleArray = function (array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/**
 * fireCustomEvent
 * Fire a custom event.
 * @name {string} Name of the event.
 * @data {object} Object to be passed to the event.
 */
utilities.fireCustomEvent = function (name, data, bubbles, cancelable) {
  var ev;
  var params = {
    bubbles: bubbles || true,
    cancelable: cancelable || true,
    detail: data || null
  };

  if (typeof window.CustomEvent === "function") {
    ev = new CustomEvent(name, params);
  } else {
    ev = document.createEvent('CustomEvent');
    ev.initCustomEvent(name, params.bubbles, params.cancelable, params.detail);
  }

  window.dispatchEvent(ev);
};

/**
 * forEachNode
 * Loop through and array of DOM elements.
 * @array {DOM Node List} List of elements.
 * @callback {function} Callback.
 * @scope *optional {function} Scope to pass to callback.
 */
utilities.forEachNode = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

/**
 * getElementPosition
 * Get the position of the element relative to document.
 * @element {DOM Node} Element.
 * returns Object with element coordinates.
 */
utilities.getElementPosition = function (element) {
  var positionToViewport = element.getBoundingClientRect();

  var scrollTop = window.pageYOffset;
  var scrollLeft = window.pageXOffset;

  var clientTop = document.body.clientTop || 0;
  var clientLeft = document.body.clientLeft || 0;

  var top = positionToViewport.top + scrollTop - clientTop;
  var left = positionToViewport.left + scrollLeft - clientLeft;

  return {
    top: Math.round(top),
    left: Math.round(left)
  };
};

/**
 * getViewportDimensions
 * Get the browser window size.
 * retuns Object with dimensions.
 */
utilities.getViewportDimensions = function () {
  return {
    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  };
};

/**
 * classExtend
 * Extends a parent class.
 * @child {function} Child class.
 * @parent {function} Parent class.
 * returns updated Child class;
 */
utilities.classExtend = function (child, parent) {
  var hasProp = {}.hasOwnProperty;

  for (var key in parent) {
    if (hasProp.call(parent, key)) child[key] = parent[key];
  }

  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;

  return child;
};

/**
 * HasClass
 * Checks for class on element.
 * @cl {string} Names. You can split the names with a space
 * @e {DOM Element} Element
 */
utilities.hasClass = function (cl, e) {

  var c, classes, i, j, len, len1;
  classes = cl.split(' ');

  if (e.classList) {
    for (i = 0, len = classes.length; i < len; i++) {
      c = classes[i];
      if (e.classList.contains(c) === true) {
        return true;
      }
    }
  } else {
    for (j = 0, len1 = classes.length; j < len1; j++) {
      c = classes[j];
      if (new RegExp('(^| )' + c + '( |$)', 'gi').test(e.c)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * RemoveClass
 * Remove class from element.
 * @c {string} name of the class
 * @e {DOM Element} Element
 */
utilities.removeClass = function (c, e) {

  var classes, i, j, len, len1;
  classes = c.split(' ');
  if (e.classList) {
    for (i = 0, len = classes.length; i < len; i++) {
      c = classes[i];
      e.classList.remove(c);
    }
  } else {
    for (j = 0, len1 = classes.length; j < len1; j++) {
      c = classes[j];
      e.className = e.className.replace(new RegExp('(^|\\b)' + c.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }
};

/**
 * AddClass
 * Add class to element.
 * @c {string} Name of the class
 * @e {DOM Element} Element
 */
utilities.addClass = function (c, e) {

  var classes, i, j, len, len1;
  classes = c.split(' ');

  if (e.classList) {
    for (i = 0, len = classes.length; i < len; i++) {
      c = classes[i];
      e.classList.add(c);
    }
  } else {
    for (j = 0, len1 = classes.length; j < len1; j++) {
      c = classes[j];
      e.className += ' ' + c;
    }
  }
};

/**
 * GetSiblings
 * Get siblings from element
 * @e {DOM Element} Element
 * @return Array of DOM Elements
 */
utilities.getSiblings = function (e) {

  return Array.prototype.filter.call(e.parentNode.children, function (child) {
    return child !== e;
  });
};

/**
 * Function to normalize the selctor 'matchesSelector' across browsers
 */
utilities.matches = function () {

  var doc, matches;
  doc = document.documentElement;
  matches = doc.matchesSelector || doc.webkitMatchesSelector || doc.mozMatchesSelector || doc.oMatchesSelector || doc.msMatchesSelector;

  return matches;
};

/**
 * Extend
 * Similar to jquery.extend, it appends the properties from 'options' to default and overwrite the ones that already exist in 'defaults'
 * @defaults {Object} Default values
 * @options {Object} New values
 */
utilities.extend = function (defaults, options) {

  var extended = {},
      key = null;

  for (key in defaults) {
    if (defaults.hasOwnProperty(key)) extended[key] = defaults[key];
  }

  for (key in options) {
    if (options.hasOwnProperty(key)) extended[key] = options[key];
  }

  return extended;
};

/**
 * Extends a base object with a series of other objects.
 *
 * @example
 * objA = {a: '1', b: '2', c: '3'};
 * objB = {d: {a: 'x', b: 'y', c: 'z'}};
 * objC = {b: 'foo'};

 * objD = utilities.deepExtend({}, objA, objB, objC);
 * // Outputs:
 * // [object Object] {
 * // a: "1",
 * // b: "foo",
 * // c: "3",
 * // d: [object Object] {
 * //   a: "x",
 * //   b: "y",
 * //   c: "z"
 * // }
}
 *
 * @static
 * @param  {...Object}   object      The objects to extend. The first object in the list will be the default.
 * @return {Object}                  The extended object in full.
 */
utilities.deepExtend = function () {

  if (Object.assign) {
    return Object.assign.apply(Object, arguments);
  }

  // This is here for older browsers
  var out = arguments[0] || {};
  var i = 0;
  var key = null;

  while (i++ < arguments.length) {
    var obj = arguments[i];
    if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) == 'object') {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (_typeof(obj[key]) == 'object' && obj[key] != null) {
            out[key] = utilities.deepExtend(out[key], obj[key]);
          } else {
            out[key] = obj[key];
          }
        }
      }
    }
  }

  return out;
};

/**
 * Returns the CSS selector for a provided element
 *
 * @static
 * @param  {DOMElement}   el         The DOM node to find a selector for
 * @return {String}                  The CSS selector the describes exactly where to find the element
 */
utilities.getSelectorForElement = function (el) {
  var particles = [];
  while (el.parentNode) {
    if (el.id) {
      particles.unshift('#' + el.id);
      break;
    } else {
      if (el == el.ownerDocument.documentElement) particles.unshift(el.tagName);else {
        for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++) {}
        particles.unshift(el.tagName + ":nth-child(" + c + ")");
      }
      el = el.parentNode;
    }
  }
  return particles.join(" > ");
};

/**
 * A singleton class that provides Framerate information for a website. When running, this will produce a 
 * number of useful internal properties.
 * 
 * - current
 *   The current framerate
 * - low
 *   The lowest overall framerate
 * - averageOverall
 *   The average overall framerate
 * - average60
 *   The average framerate in the last 60 frames (ideally this is a second)
 * 
 * ## Usage
 * ```
 * let fps = utilities.getFPSMeasure();
 * console.log(fps.current); // 60
 * ```
 * 
 * When using this class, it is often fortiuitous to cycle it down and back up after a big FPS dip:
 * ```
 * fps.stop();
 * fps.start();
 * ```
 * 
 * @private
 * @class MeasureFPS
 */

var MeasureFPS = function () {
  function MeasureFPS() {
    _classCallCheck(this, MeasureFPS);

    this.start();
  }

  _createClass(MeasureFPS, [{
    key: "start",
    value: function start() {
      if (this.running === true) return;

      this.elapsedTime = 0;
      this.lastTime = 0;

      this.current = 0;
      this.low = 60;
      this.averageOverall = 60;
      this.average60 = 60;
      this.ticks = 0;

      this.running = true;

      requestAnimationFrame(this.run.bind(this));
    }
  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
    }
  }, {
    key: "run",
    value: function run(now) {
      var tick60 = void 0;
      this.elapsedTime = (now - (this.lastTime || now)) / 1000;
      this.lastTime = now;
      this.ticks += 1;
      this.current = 1 / this.elapsedTime;
      if (this.current < this.low) {
        this.low = this.current;
      }
      if (!isNaN(parseInt(this.current))) {
        this.averageOverall = (this.ticks * this.averageOverall + this.current) / (this.ticks + 1);
        if (this.ticks % 60 === 0) {
          this.average60 = 60;
        }
        tick60 = this.ticks % 60 + 1;
        this.average60 = (tick60 * this.average60 + this.current) / (tick60 + 1);
      }

      if (this.running === true) {
        requestAnimationFrame(this.run.bind(this));
      }
    }
  }]);

  return MeasureFPS;
}();

var measureFPSInstance = null;

utilities.getFPSMeasure = function () {
  if (measureFPSInstance === null) measureFPSInstance = new MeasureFPS();
  return measureFPSInstance;
};

// Fix widows replaces the last space in a sentence with a non-breaking space
// This function is a little dangerous at the moment so we should revisit it at some point in the future
utilities.fixWidows = function (els) {
  _els = els;
  if (els instanceof Node) {
    _els = [els];
  }
  if (_els && _els.length) {
    for (var i = 0; i < _els.length; i++) {
      var el = _els[i];
      if (el instanceof Node) {
        el.innerHTML = el.innerHTML.replace(/\s(?=[^\s]*$)/g, "&nbsp;");
      }
    }
  }
};

exports.default = utilities;

/***/ })
/******/ ]);