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
 * @version 1.1.0
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

            var parameters = el.dataset;
            var instance = new controller(el, parameters);

            return el;
          }
        }
      } catch (_error) {
        console.warn("Error: " + _error.message, _error.stack);
      }

      if (debug) {
        var _parameters = el.dataset;
        var _instance = new controller(el, _parameters);
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
      if (navigator.connection.saveData) {
        _this.onFrozen(_this);
      } else {
        if (_this._video.readyState >= 2) {
          _this.init();
        } else {
          _this._video.addEventListener('canplay', _this.init.bind(_this), false);
        }
      }
    } else if (_this._video.readyState >= 2) {
      _this.init();
    } else {
      // this._video.addEventListener('canplay', this.init.bind(this), false);
      _this.init();
    }

    _this._video.addEventListener('error', _this.onFrozen.bind(_this), true);
    _this.animationCallback = _this.viewportAnimationCallback.bind(_this);
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

        if (this.isOnScreen) {
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
    key: 'viewportAnimationCallback',
    value: function viewportAnimationCallback(topPercent) {
      if (!this.isOnScreen && this.hasStarted && !this._video.paused) {
        this._video.pause();
      } else {
        if (topPercent > this.options.vpOn && this.initiated) {
          if (!this.hasStarted && this._video.paused) {
            this._video.play();
          }
        }
      }
    }
  }, {
    key: 'video',
    get: function get() {
      return this._video;
    }
  }]);

  return AutoplayVideo;
}(_wtcControllerViewports2.default);

_wtcControllerElement.ExecuteControllers.registerController(AutoplayVideo, 'AutoplayVideo');

exports.default = AutoplayVideo;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wtcControllerElement = _interopRequireWildcard(__webpack_require__(0));

var _wtcUtilityHelpers = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * The Viewport class is a controller that provides information on
 * the position of the element within the window. It does this through
 * a combination of IntersectionObserver and request animation frame.
 *
 * This class extends the element controller and requires registration
 * with the Execute controllers system in order to be instanciated as
 * a component (ie with <element data-controller="Viewport" />)
 *
 * @class Viewport
 * @augments ElementController
 * @author Liam Egan <liam@wethecollective.com>
 * @version 2.0.0
 * @created Jan 30, 2019
 */
var Viewport =
/*#__PURE__*/
function (_ElementController) {
  _inherits(Viewport, _ElementController);

  /**
   * The Viewport Class constructor
   *
   * @constructor
   * @param {HTMLElement} element 				The element to use
   * @param {object} settings             A settings object that allows settings to be passed to the raw class. These settings are:
   * - `vpprefix`           The prefix for the classnames
   * - `vpstoptopthreshold` The threshold to stop the execution of at
   * - `animationCallback`  The function to run on animation. Takes the same three parameters as the runAnimation method
   */
  function Viewport(element) {
    var _this;

    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Viewport);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Viewport).call(this, element)); // set up the class prefix either data-vppefix. Defaults to "vp"

    _this.classPrefix = settings.vpprefix || 'vp'; // Sets up the stop threshold for the element, if it exists

    _this.stopTopThreshold = settings.vpstoptopthreshold; // add the animation callback, if provided

    _this.animationCallback = settings.animationCallback; // Bing all of the callbacks

    _this._onObserve = _this._onObserve.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onPlay = _this._onPlay.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onResize = _this._onResize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onTidy = _this._onTidy.bind(_assertThisInitialized(_assertThisInitialized(_this))); // Check for tidy up every 5 seconds

    _this.tidyInterval = setInterval(_this._onTidy, 5000); // bind the resize handler

    window.addEventListener('resize', _this._onResize);

    _this._onResize();

    if ('IntersectionObserver' in window) {
      // create the intersection ovserver
      _this.observer = new IntersectionObserver(_this._onObserve, {
        rootMargin: '0%',
        threshold: [.1]
      });

      _this.observer.observe(_this.element);
    } else {
      console.log('%cIntersection Observers not supported', 'color: red');

      _this.runAnimation(100, 100, 100);
    } // debug element


    if (_this.element.querySelector('.vp-debug')) {
      _this._debugElement = _this.element.querySelector('.vp-debug');
    }

    _this.element.classList.add("".concat(_this.classPrefix, "--initialised"));

    return _this;
  }
  /**
   * Private methods
   */

  /**
   * Listener for the intersection observer callback
   *
   * @private
   * @param  {object} entries   the object that contains all of the elements being calculated by this observer
   * @param  {object} observer  the observer instance itself
   * @return void
   */


  _createClass(Viewport, [{
    key: "_onObserve",
    value: function _onObserve(entries, observer) {
      var _this2 = this;

      // Loop through the entries and set up the playing state based on whether the element is onscreen or not.
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          _this2.playing = true;
          _this2.isOnScreen = true;
        } else {
          _this2.playing = false;
          _this2.isOnScreen = false;
        }
      });
    }
    /**
     * Listener for the request animation frame loop. This just sets
     * the scroll position of the window.
     *
     * @private
     * @param  {delta} number   the number of ms that has passed since the RaF started
     * @return void
     */

  }, {
    key: "_onPlay",
    value: function _onPlay(delta) {
      if (this.playing === true) {
        requestAnimationFrame(this._onPlay);
      }

      this.scrollPos = window.scrollY || window.pageYOffset;
    }
    /**
     * Listener for the window resize event. Updates the window height
     * for the percentile calculations.
     *
     * @private
     * @param  {object} e   the event object from the resize event
     * @return void
     */

  }, {
    key: "_onResize",
    value: function _onResize(e) {
      this.windowHeight = window.innerHeight;
    }
    /**
     * Listener for the tidy timeout loop. This checks whether the
     * element exists in the dom and removes all of the necessary
     * traces of it if it doesn't
     *
     * @private
     * @return void
     */

  }, {
    key: "_onTidy",
    value: function _onTidy() {
      var exists = this.elementExistsInDOM();

      if (!exists) {
        this.tidy();
      }
    }
    /**
     * Getters and setters
     */

    /**
     * (getter/setter) Scroll position. This updates the scroll position
      * only if it's changed and then calculated the element's top
      * position based on that.
     *
     * @type {number}
      * @default -1
     */

  }, {
    key: "runAnimation",

    /**
     * Public methods
     */

    /**
     * This method is called from the run loop and updates the classes
     * based on the percentages provided to it. This is a public method
     * and so can be called programatically, but the use-cases for
     * doing so are limited.
     *
     * @param  {number} topPercent      The percentage distance between the top of the element and the bottom of the screen.
     * @param  {number} middlePercent   The percentage distance between the middle of the element and the bottom of the screen.
     * @param  {number} bottomPercent   The percentage distance between the bottom of the element and the top of the screen.
     */
    value: function runAnimation(topPercent, middlePercent, bottomPercent) {
      _wtcUtilityHelpers.default.removeClass(this.classes.join(' '), this.element);

      for (var i = 0; i <= 1; i += .1) {
        var perString = Math.round(i * 100);

        if (topPercent >= i) {
          _wtcUtilityHelpers.default.addClass("".concat(this.classPrefix, "--on-").concat(perString, " ").concat(this.classPrefix, "--onf-").concat(perString), this.element);
        }

        if (bottomPercent >= i) {
          _wtcUtilityHelpers.default.addClass("".concat(this.classPrefix, "--b-").concat(perString, " ").concat(this.classPrefix, "--bf-").concat(perString), this.element);
        }
      } // If we have an animation callback then call it here.


      if (this.animationCallback) {
        this.animationCallback(topPercent, middlePercent, bottomPercent);
      } // If we have stop threshold(s), and we've suprassed them, tidy up


      if (this.stopTopThreshold && topPercent >= this.stopTopThreshold) {
        this.tidy();
        this.element.classList.add("".concat(this.classPrefix, "--thresholdReached"));
      }

      if (this._debugElement) {
        this._debugElement.innerHTML = topPercent;
      }
    }
  }, {
    key: "tidy",
    value: function tidy() {
      this.playing = false;
      clearInterval(this.tidyInterval);
      window.removeEventListener('resize', this.onResize);
      this.element.data = null;
      this.observer.disconnect();
    }
  }, {
    key: "scrollPos",
    set: function set(value) {
      if (!isNaN(value) && value != this.scrollPos) {
        this._scrollPos = value;
        this.top = this.offsetTop - value;
      }
    },
    get: function get() {
      return this._scrollPos || -1;
    }
    /**
     * (getter) Find the offsetTop to the document top. Loop through the
      * offset parents of this element and add their tops to the
      * larger value.
     *
     * @type {number}
      * @readonly
      * @default 0
     */

  }, {
    key: "offsetTop",
    get: function get() {
      var el = this.element;
      var offsetTop = 0;

      while (el.offsetParent) {
        offsetTop += el.offsetTop;
        el = el.offsetParent;
      }

      return offsetTop;
    }
    /**
     * (getter/setter) Top position. This updates the element's top
      * position in pixels only if the value has changed and then
      * calculates the 3 positional percentages - top, middle and
      * bottom and then runs the runAnimation method to perform
      * actions based on these numbers.
     *
     * @type {number}
      * @default 0
     */

  }, {
    key: "top",
    set: function set(value) {
      if (!isNaN(value) && value != this.top) {
        this._top = value; // The percentage of the position of the top of the element from the bottom of the screen

        this._top_percentage = (this.windowHeight - value) / this.windowHeight; // The percentage of the position of the bottom of the element from the top of the sceen.

        this._bottom_percentage = (value + this.elementHeight) / this.windowHeight; // The percentage of the position of the middle of the element from the bottom of the sceeen

        this._middle_percentage = (this.windowHeight - (value + this.elementHeight * .5)) / this.windowHeight; // Run the animation with these calculated values

        this.runAnimation(this._top_percentage, this._middle_percentage, this._bottom_percentage);
      }
    },
    get: function get() {
      return this._top || 0;
    }
    /**
    * (getter/setter) Playing. This is set in response to a callback
     * on the intersection observer and sets up the RaF loop to
     * calculate the scroll position and run the animation.
    *
    * @type {boolean}
    * @default false
    */

  }, {
    key: "playing",
    set: function set(value) {
      if (this.playing === false && value === true) {
        requestAnimationFrame(this._onPlay);
        this._playing = true;
      } else if (value !== true) {
        this._playing = false;
      }
    },
    get: function get() {
      return this._playing === true;
    }
    /**
     * (getter/setter) The window height. Used to calculate the
      * positional percentages.
     *
     * @type {number}
      * @default 0
     */

  }, {
    key: "windowHeight",
    set: function set(value) {
      if (!isNaN(value)) {
        this._windowHeight = value;
      }
    },
    get: function get() {
      return this._windowHeight || 0;
    }
    /**
     * Element height.
     *
     * @readonly
     * @return {number}  The element's height in pixels
     */

  }, {
    key: "elementHeight",
    get: function get() {
      return this.element.offsetHeight || 0;
    }
    /**
     * (getter/setter) Sets whether the element is onscreen. This is
      * set from the intersection observer callback and updates the
      * classes of the element for use.
     *
     * @type {boolean}
      * @default false
     */

  }, {
    key: "isOnScreen",
    set: function set(value) {
      this._isOnScreen = value === true;

      if (value === true) {
        this.element.classList.add("".concat(this.classPrefix, "--onscreen"));
      } else {
        this.element.classList.remove("".concat(this.classPrefix, "--onscreen"));
      }
    },
    get: function get() {
      return this._isOnScreen === true;
    }
  }, {
    key: "stopTopThreshold",
    set: function set(value) {
      if (!isNaN(value)) {
        this._stopTopThreshold = Number(value);
      }
    },
    get: function get() {
      return this._stopTopThreshold || null;
    }
    /**
     * The array of classes to remove from the element on scroll.
     *
     * @readonly
     * @return {array}  The classes to remove each time the animation loop is run.
     */

  }, {
    key: "classes",
    get: function get() {
      return this._classList || [];
    }
    /**
     * (getter/setter) Sets the prefix for the css classes for the
      * element. Setting this will also set the class list.
     *
     * @type {string}
      * @default 'vp'
     */

  }, {
    key: "classPrefix",
    set: function set(value) {
      if (typeof value === 'string') this._classPrefix = value;
      this._classList = ["".concat(this.classPrefix, "--on-10"), "".concat(this.classPrefix, "--on-20"), "".concat(this.classPrefix, "--on-30"), "".concat(this.classPrefix, "--on-40"), "".concat(this.classPrefix, "--on-50"), "".concat(this.classPrefix, "--on-60"), "".concat(this.classPrefix, "--on-70"), "".concat(this.classPrefix, "--on-80"), "".concat(this.classPrefix, "--on-90"), "".concat(this.classPrefix, "--on-100"), "".concat(this.classPrefix, "--b-10"), "".concat(this.classPrefix, "--b-20"), "".concat(this.classPrefix, "--b-30"), "".concat(this.classPrefix, "--b-40"), "".concat(this.classPrefix, "--b-50"), "".concat(this.classPrefix, "--b-60"), "".concat(this.classPrefix, "--b-70"), "".concat(this.classPrefix, "--b-80"), "".concat(this.classPrefix, "--b-90"), "".concat(this.classPrefix, "--b-100")];
    },
    get: function get() {
      return this._classPrefix || 'vp';
    }
    /**
     * (getter/setter) Sets the animation callback for custom behaviour.
      * this function will be called each time the runAnimation function
      * is called. Any provide function will be bound to this instance
      * and takes three params:
      * - topPercent;
      * - middlePercent; and
      * - bottomPercent
     *
     * @type {function}
      * @default null
     */

  }, {
    key: "animationCallback",
    set: function set(value) {
      if (typeof value == 'function') {
        this._animationCallback = value.bind(this);
      }
    },
    get: function get() {
      return this._animationCallback || null;
    }
  }]);

  return Viewport;
}(_wtcControllerElement.default); // Register


_wtcControllerElement.ExecuteControllers.registerController(Viewport, 'Viewport');

var _default = Viewport;
exports.default = _default;

/***/ }),
/* 3 */
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