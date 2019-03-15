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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wtcControllerElement = __webpack_require__(1);

var _wtcControllerElement2 = _interopRequireDefault(_wtcControllerElement);

var _wtcViewport = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"wtc-viewport\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _wtcViewport2 = _interopRequireDefault(_wtcViewport);

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
}(_wtcViewport2.default);

_wtcControllerElement.ExecuteControllers.registerController(AutoplayVideo, 'AutoplayVideo');

exports.default = AutoplayVideo;

/***/ }),
/* 1 */
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

/***/ })
/******/ ]);