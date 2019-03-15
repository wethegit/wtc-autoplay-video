
import { default as ElementController, ExecuteControllers } from 'wtc-controller-element';
import Viewport from './Viewport';

class AutoplayVideo extends Viewport {
  constructor(element, options) {
    super(element);

    const defaults = { fullWidth: false, vpOn: 0 };
    options = Object.assign({}, defaults, options);

    this.hasStarted = false;
    this.initiated = false;
    this.options = {
      fullWidth: this.element.classList.contains('autoplay-video--fullscreen') || options.fullWidth,
      vpOn: this.element.hasAttribute('data-vp-on') ? parseInt(this.element.getAttribute('data-vp-on')) : options.vpOn
    }

    if (this.options.fullWidth && !this.element.classList.contains('autoplay-video--fullscreen')) {
      this.element.classList.add('autoplay-video--fullscreen');
    }

    this._video = this.element.querySelector('.autoplay-video__video');
    this._fallback = this.element.querySelector('.autoplay-video__fallback');

    this._video.muted = true;
    this._video.setAttribute('playsinline', '');
    this._video.setAttribute('muted', '');

    if (navigator && navigator.connection) {
      if (navigator.connection.saveData) {
        this.onFrozen(this);
      }
      else {
        if (this._video.readyState >= 2) {
          this.init();
        } else {
          this._video.addEventListener('canplay', this.init.bind(this), false);
        }
      }
    }
    else if (this._video.readyState >= 2) {
      this.init();
    }
    else {
      // this._video.addEventListener('canplay', this.init.bind(this), false);
      this.init();
    }

    this._video.addEventListener('error', this.onFrozen.bind(this), true);
    this.animationCallback = this.viewportAnimationCallback.bind(this);
  }

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

  onPlay() {
    this.element.classList.add('is-playing');
    this.hasStarted = true;
  }

  onFrozen() {
    this.element.classList.add('is-frozen');
  }

  onPause() {
    this.element.classList.add('is-paused');
    this.hasStarted = false;
  }

  pauseVideo() {
    this._video.pause();
    this.onPause();
  }

  playVideo() {
    if (this._video.readyState >= 2) {
      if (this._video.paused) {
        let testPlay = this._video.play();

        try {
          if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1 && testPlay && testPlay instanceof Promise) {
            testPlay.then(this.onPlay.bind(this), this.onFrozen.bind(this));
          }
          else if (!this._video.paused) {
            this.onPlay();
          }
          else {
            this.onFrozen();
          }
        }
        catch (error) {
          this.onFrozen();
        }
      }
      else {
        this.onPlay();
      }
    }
    else {
      setTimeout(this.playVideo.bind(this), 500);
    }
  }

  viewportAnimationCallback(topPercent) {
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


  get video() {
    return this._video;
  }
}

ExecuteControllers.registerController(AutoplayVideo, 'AutoplayVideo');

export default AutoplayVideo;
