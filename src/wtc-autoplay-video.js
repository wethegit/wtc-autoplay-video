
import { default as ElementController, ExecuteControllers } from './ElementController.js';
import Viewport from './ViewportController.js';

const defaults = {
  fullWidth: false,
  vpOn: 0,
  startAt: null,
  loopFrom: null,
  loopTo: null
};

/**
 * The AutoplayVideo class expects an element (as all wtc-element-controllers do) and can take an optional options argument
 * ## Install
 * ```sh
 * $ npm install wtc-autoplay-video
 * ```
 * ## Usage
 * Import it in your project.
 * ```javascript
 * import AutoplayVideo from 'wtc-autoplay-video';
 * ```
 * Add the markup.
 * ```html
 * <div class="autoplay-video">
 *   <video
 *     class="autoplay-video__video"
 *     autoplay
 *     playsinline
 *     muted
 *     loop
 *   >
 *     <source
 *       src="video.mp4"
 *       type="video/mp4"
 *     />
 *   </video>
 *   <!-- REQUIRED -->
 *   <img
 *     class="autoplay-video__fallback"
 *     src="fallback.png"
 *     alt="Fallback"
 *   />
 *   <!-- OPTIONAL -->
 *   <img
 *     class="autoplay-video__preloader"
 *     src="preloader.png"
 *     alt="Preloader"
 *   />
 * </div>
 * ```

 * ### 1. Using ExecuteControllers
 * If you are using [wtc-controller-element] just **data-controller="AutoplayVideo"** to your markup.
 * ```html
 * <div data-controller="AutoplayVideo" class="autoplay-video">
 * ...
 * ```
 * You can also instanciate explicitly:
 * ```javascript
 * ExecuteControllers.instanciate(document.getElementById('autoplay-video'), AutoplayVideo);
 * ```
 * ### 2. Default JS
 * With the default js version, you have the option to pass the options as an object, or use data-attributes, they both work.
 * ```javascript
 * let gallery = new AutoplayVideo(document.getElementById('autoplay-video'), {
 *   fullWidth: false,
 *   vpOn: 30
 * });
 * ```
 * ### 3. ES5 version
 * There's also an ES5 version to be used in browser anywhere. It's also really simple.
 * Add you markup, then add the script:
 * ```html
 * <script src="dist/wtc-autoplay-video.es5.js"></script>
 * ```
 * And for last, instanciate the videos:
 * ```javascript
 * <script>
 *   var videos = document.querySelectorAll('.autoplay-video');
 *   for (var i = 0; i < videos.length; i++) {
 *     new WTCAutoplayVideo.default(videos[i], { fullWidth: false, vpOn: 0 });
 *   }
 * </script>
 * 
 * @class AutoplayVideo
 * @augments Viewport
 * @returns A new instance of the AutoplayVideo class
 * @author Liam Egan <liam@wethecollective.com>
 * @version 1.0.0
 * @created May 7, 2019
 */
class AutoplayVideo extends Viewport {
  /**
   * Creates an instance of AutoplayVideo.
   * 
   * Options object is comprised of the following:
   * | Name | Type | Description | Default |
   * | ---- | ---- | ----------- | _______ |
   * | fullWidth | `Boolean`  | Whether the video should display fullscreen | false |
   * | vpOn | `Number`  | The point at which the video should start playing after havign scrolled on the screen. | 0 |
   * | startAt | `Number`  | When the video starts playing again, start at this point, in seconds. | null |
   * | loopFrom | `Number`  | When the video reaches this part, loop. If this isn't provided, the end of the video will be the loop point. | null |
   * | loopTo | `Number`  | When the video loops, this is the point that it will start the loop from. | null |
   * 
   * @constructor
   * @param {DOMElement} element 
   * @param {Object} options 
   * @memberOf AutoplayVideo
   */
  constructor(element, options) {
    super(element);

    this.onLoopCheck = this.onLoopCheck.bind(this);

    options = Object.assign({}, defaults, options);

    this.hasStarted = false;
    this.initiated = false;
    this.options = {
      fullWidth: this.element.classList.contains('autoplay-video--fullscreen') || options.fullWidth,
      vpOn: this.element.hasAttribute('data-vp-on') ? parseInt(this.element.getAttribute('data-vp-on')) : options.vpOn,
      startAt: this.element.hasAttribute('data-autoplay-video--start-at') ? parseFloat(this.element.getAttribute('data-autoplay-video--start-at')) : options.startAt,
      loopFrom: this.element.hasAttribute('data-autoplay-video--loop-from') ? parseFloat(this.element.getAttribute('data-autoplay-video--loop-from')) : options.loopFrom,
      loopTo: this.element.hasAttribute('data-autoplay-video--loop-to') ? parseFloat(this.element.getAttribute('data-autoplay-video--loop-to')) : options.loopTo
    }

    if (this.options.fullWidth && !this.element.classList.contains('autoplay-video--fullscreen')) {
      this.element.classList.add('autoplay-video--fullscreen');
    }

    this._video = this.element.querySelector('.autoplay-video__video');
    this._fallback = this.element.querySelector('.autoplay-video__fallback');

    this._video.muted = true;
    this._video.setAttribute('playsinline', '');
    this._video.setAttribute('muted', '');
    
    if(!isNaN(this.options.startAt) && this.options.startAt != null ) {
      this._video.currentTime = this.options.startAt;
    }

    if (navigator && navigator.connection) {
      if (navigator.connection.saveData) {
        this.onFrozen(this);
      } else {
        if (this._video.readyState >= 2) {
          this.init();
        } else {
          this._video.addEventListener('canplay', this.init.bind(this), false);
        }
      }
    } else if (this._video.readyState >= 2) {
      this.init();
    } else {
      this.init();
    }
    
    if(this.options.loopTo) {
      this._video.loop = false;
      if(this.options.loopFrom) {
        this.loopPeriod = true;
      } else {
        this._video.addEventListener('ended', this.onEnded.bind(this), true);
      }
    }

    this._video.addEventListener('error', this.onFrozen.bind(this), true);
    this.animationCallback = this.viewportAnimationCallback.bind(this);
  }

  /**
   * This method initialises the loaded video, sets up our ratios and attaches the 
   * relevant event listeners.
   * 
   * @public
   * @memberOf AutoplayVideo
   */
  init() {
    if (!this.initiated) {
      this.initiated = true;
      this.ratio = this._video.videoWidth / this._video.videoHeight;

      if (this.options.fullWidth) {
        let resizeTimer = null;
        const resizeDebounce = () => {
          clearTimeout(resizeTimer);

          resizeTimer = setTimeout(() => {
            this.videoResize();
          }, 300);
        }

        resizeDebounce();
        window.addEventListener('resize', resizeDebounce);
      }

      if (this.isOnScreen) {
        this.playVideo();
      }
    }
  }

  /**
   * Resize the video to the size of its parent. This is normally called as a part 
   * of the window resize handler but can also be called programatically.
   * 
   * @public
   * @memberOf AutoplayVideo
   */
  videoResize() {
    let targetW = this._video.parentNode.offsetWidth,
      targetH = this._video.parentNode.offsetHeight,
      targetRatio = targetW / targetH,
      newW = 0,
      newH = 0;

    if (targetRatio > this.ratio) {
      newW = targetW;
      newH = newW * this.ratio;
    }
    else {
      newH = targetH;
      newW = newH * this.ratio;
    }

    this._video.style.height = newH + "px";
    this._video.style.width = newW + "px";
  }

  /**
   * Responds to the videos playing method. This is responsible for setting the various 
   * state properties and starting up the run loop, if we need internal video looping.
   * 
   * @public
   * @memberOf AutoplayVideo
   */
  onPlay() {
    this.element.classList.add('is-playing');
    this.hasStarted = true;
    if(this.videoPlaying !== true && this.loopPeriod === true) {
      this.videoPlaying = true;
      requestAnimationFrame(this.onLoopCheck);
    }
  }

  /**
   * If for some reason the video fails to play, this method will be called.
   * This adds an `is-frozen` class name to the element and sets `videoPlaying`
   * property to false.
   * 
   * @public
   * @memberOf AutoplayVideo
   */
  onFrozen() {
    this.element.classList.add('is-frozen');
    this.videoPlaying = false;
  }

  /**
   * When the video is paused this method is called.
   * This adds the `is-paused` class name to the element, sets the `hasStarted`
   * and `videoPlaying` properties to false.
   * 
   * @public
   * @memberOf AutoplayVideo
   */
  onPause() {
    this.element.classList.add('is-paused');
    this.hasStarted = false;
    this.videoPlaying = false;
  }

  /**
   * This responds to the videos `ended` event and is responsible for looping
   * the video only when a both a `loopTo` property is provided and a `loopFrom`
   * property is *not*.
   * 
   * @public
   * @memberOf AutoplayVideo
   */
  onEnded() {
    this._video.currentTime = this.options.loopTo;
    this._video.play();
  }

  /**
   * This method is a part of the run loop for the video. It will only run when
   * the video is playing (on screen) and when both the `loopTo` and `loopFrom`
   * properties are provided
   * 
   * @public
   * @param {Number} delta 
   * @memberOf AutoplayVideo
   */
  onLoopCheck(delta) {
    if(this.videoPlaying === true && this.loopPeriod === true) {
      requestAnimationFrame(this.onLoopCheck);
    }

    if(this._video.currentTime >= this.options.loopFrom) {
      this._video.currentTime = this.options.loopTo;
    }
  }

  /**
   * This method pauses the video and is intended to be called programatically.
   * 
   * @public
   * @memberOf AutoplayVideo
   */
  pauseVideo() {
    this._video.pause();
    this.onPause();
  }

  /**
   * This method plays the video and is intended to be called programatically.
   * 
   * @public
   * @memberOf AutoplayVideo
   */
  playVideo() {
    if (this._video.readyState >= 2) {
      if (this._video.paused) {
        let testPlay = this._video.play();

        try {
          if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1 && testPlay && testPlay instanceof Promise) {
            testPlay.then(this.onPlay.bind(this), this.onFrozen.bind(this));
          } else if (!this._video.paused) {
            this.onPlay();
          } else {
            this.onFrozen();
          }
        } catch(error) {
          this.onFrozen();
        }
      } else {
        this.onPlay();
      }
    } else {
      setTimeout(this.playVideo.bind(this), 500);
    }
  }

  /**
   * This method overrides the parent class' viewportAnimationCallback
   * method and provides play/pause functionality based on the viewport
   * position. Basically this stops the video from playing unless it's
   * on-screen. 
   * 
   * @override Viewport.viewportAnimationCallback
   * @param {any} topPercent 
   * @memberOf AutoplayVideo
   */
  viewportAnimationCallback(topPercent) {
    if (!this.isOnScreen && this.hasStarted && !this._video.paused) {
      this.pauseVideo();
      if(!isNaN(this.options.startAt) && this.options.startAt != null ) {
        this._video.currentTime = this.options.startAt;
      }
    } else {
      if (topPercent > this.options.vpOn && this.initiated) {
        if (!this.hasStarted && this._video.paused) {
          this.playVideo();
        }
      }
    }
  }


  get video() {
    return this._video;
  }
}

ExecuteControllers.registerController(AutoplayVideo, 'AutoplayVideo');

export default AutoplayVideo;
