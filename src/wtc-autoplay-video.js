
import { default as ElementController, ExecuteControllers } from 'wtc-controller-element';
import Viewport from 'wtc-controller-viewports';

const defaults = {
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
 *     new WTCAutoplayVideo.default(videos[i], { vpOn: 0 });
 *   }
 * </script>
 * ```
 * 
 * ## Options
 * 
 * The options object is comprised of the following:
 * 
 * | Name | HTML Attribute | Type | Description | Default |
 * | ---- | -------------- | ---- | ----------- | ------- |
 * | vpOn | data-vp-on | `Number`  | The point at which the video should start playing after havign scrolled on the screen. | 0 |
 * | startAt | data-autoplay-video--start-at | `Number`  | When the video starts playing again, start at this point, in seconds. | null |
 * | loopFrom | data-autoplay-video--loop-from | `Number`  | When the video reaches this part, loop. If this isn't provided, the end of the video will be the loop point. | null |
 * | loopTo | data-autoplay-video--loop-to | `Number`  | When the video loops, this is the point that it will start the loop from. | null |
 * 
 * # Class Documentation
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
   * 
   * | Name | Type | Description | Default |
   * | ---- | ---- | ----------- | ------- |
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

    // Bind anything that will be used a sa listener
    this.onLoopCheck = this.onLoopCheck.bind(this);
    this.init = this.init.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.onFrozen = this.onFrozen.bind(this);
    this.animationCallback = this.viewportAnimationCallback.bind(this);

    // Assign the provided options and coerce and HTML element properties as well.
    options = Object.assign({}, defaults, options);
    this.options = {
      vpOn: this.element.hasAttribute('data-vp-on') ? parseInt(this.element.getAttribute('data-vp-on')) : options.vpOn,
      startAt: this.element.hasAttribute('data-autoplay-video--start-at') ? parseFloat(this.element.getAttribute('data-autoplay-video--start-at')) : options.startAt,
      loopFrom: this.element.hasAttribute('data-autoplay-video--loop-from') ? parseFloat(this.element.getAttribute('data-autoplay-video--loop-from')) : options.loopFrom,
      loopTo: this.element.hasAttribute('data-autoplay-video--loop-to') ? parseFloat(this.element.getAttribute('data-autoplay-video--loop-to')) : options.loopTo
    }

    // Find the video and the fallback
    this.video = this.element.querySelector('.autoplay-video__video');
    this.fallback = this.element.querySelector('.autoplay-video__fallback');

    // Set the required video properties for inline playing (thanks Chrome)
    this.video.muted = true;
    this.video.setAttribute('playsinline', '');
    this.video.setAttribute('muted', '');
    
    // If we have a startAt property, update the video's time to that.
    if(!isNaN(this.startAt) && this.startAt != null ) {
      this.video.currentTime = this.startAt;
    }

    // Assign the class initialisation when the video can play
    // @TODO clean this up. we have an else if with an init followed by an else with an init
    if (navigator && navigator.connection) {
      if (navigator.connection.saveData) {
        this.onFrozen(this);
      } else {
        if (this.video.readyState >= 2) {
          this.init();
        } else {
          this.video.addEventListener('canplay', this.init, false);
        }
      }
    } else if (this.video.readyState >= 2) {
      this.init();
    } else {
      this.init();
    }
    
    // If we have a loop from property and/or a loop to property set the video into the right states and add appriopriate functionality listeners
    if(this.loopTo) {
      this.video.loop = false;
      if(this.loopFrom) {
        this.loopPeriod = true;
      } else {
        this.video.addEventListener('ended', this.onEnded, true);
      }
    }

    // On error, set the video to frozen. This is kind of a final state fallback.
    this.video.addEventListener('error', this.onFrozen, true);
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
      this.ratio = this.video.videoWidth / this.video.videoHeight;

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
    let targetW = this.video.parentNode.offsetWidth,
      targetH = this.video.parentNode.offsetHeight,
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

    this.video.style.height = newH + "px";
    this.video.style.width = newW + "px";
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
    this.video.currentTime = this.loopTo;
    this.video.play();
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

    if(this.video.currentTime >= this.loopFrom) {
      this.video.currentTime = this.loopTo;
    }
  }

  /**
   * This method pauses the video and is intended to be called programatically.
   * 
   * @public
   * @memberOf AutoplayVideo
   */
  pauseVideo() {
    this.video.pause();
    this.onPause();
  }

  /**
   * This method plays the video and is intended to be called programatically.
   * 
   * @public
   * @memberOf AutoplayVideo
   */
  playVideo() {
    if (this.video.readyState >= 2) {
      if (this.video.paused) {
        let testPlay = this.video.play();

        try {
          if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1 && testPlay && testPlay instanceof Promise) {
            testPlay.then(this.onPlay.bind(this), this.onFrozen.bind(this));
          } else if (!this.video.paused) {
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
    if (!this.isOnScreen && this.hasStarted && !this.video.paused) {
      this.pauseVideo();
      if(!isNaN(this.startAt) && this.startAt != null ) {
        this.video.currentTime = this.startAt;
      }
    } else {
      if (topPercent > this.options.vpOn && this.initiated) {
        if (!this.hasStarted && this.video.paused) {
          this.playVideo();
        }
      }
    }
  }

  /**
   * Getters and setters
   */

  /**
   * (getter/setter) The video element itself
   *
   * @type {HTMLElement}
   * @default null
   * @returns {HTMLElement|null}
   */
  set video(value) {
    if(value instanceof HTMLElement) {
      this._video = value;
    }
  }
  get video() {
    return this._video || null;
  }
  /**
   * (getter/setter) The fallback element
   *
   * @type {HTMLElement}
   * @default null
   * @returns {HTMLElement|null}
   */
  set fallback(value) {
    if(value instanceof HTMLElement) {
      this._fallback = value;
    }
  }
  get fallback() {
    return this._fallback || null;
  }
  /**
   * (getter/setter) Whether the video has started playing
   *
   * @type {boolean}
   * @default false
   * @returns {boolean}
   */
  set hasStarted(value) {
    this._hasStarted = value === true;
  }
  get hasStarted() {
    return this._hasStarted || false;
  }
  /**
   * (getter/setter) Whether the instance has been initiated
   *
   * @type {boolean}
   * @default false
   * @returns {boolean}
   */
  set initiated(value) {
    this._initiated = value === true;
  }
  get initiated() {
    return this._initiated || false;
  }
  /**
   * (getter/setter) Whether the instance is operating over a loop period
   *
   * @type {boolean}
   * @default false
   * @returns {boolean}
   */
  set loopPeriod(value) {
    this._loopPeriod = value === true;
  }
  get loopPeriod() {
    return this._loopPeriod || false;
  }
  /**
   * (getter/setter) Whether the video has started playing.
   * This is specifically for the determination of the run loop.
   *
   * @type {boolean}
   * @default false
   * @returns {boolean}
   */
  set videoPlaying(value) {
    this._videoPlaying = value === true;
  }
  get videoPlaying() {
    return this._videoPlaying || false;
  }
  /**
   * (getter/setter) The video's aspect ratio.
   *
   * @type {number}
   * @default null
   * @returns {number}
   */
  set ratio(value) {
    if(!isNaN(value)) this._ratio = value;
  }
  get ratio() {
    return this._ratio || null;
  }
  /**
   * (getter) The place in the video to start at, in seconds.
   * Set from the passed options.
   *
   * @readonly
   * @type {number}
   * @default null
   * @returns {number}
   */
  get startAt() {
    return this.options.startAt || null;
  }
  /**
   * (getter) The place in the video to loop from, in second.
   * This should be greater than loopTo (not sure what happens if not ^_^ ).
   * Set from the passed options.
   *
   * @readonly
   * @type {number}
   * @default null
   * @returns {number}
   */
  get loopFrom() {
    return this.options.loopFrom || null;
  }
  /**
   * (getter) The place in the video to loop, in seconds.
   * Set from the passed options
   *
   * @readonly
   * @type {number}
   * @default null
   * @returns {number}
   */
  get loopTo() {
    return this.options.loopTo || null;
  }
}

ExecuteControllers.registerController(AutoplayVideo, 'AutoplayVideo');

export default AutoplayVideo;
