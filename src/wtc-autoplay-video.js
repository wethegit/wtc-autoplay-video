
import { default as ElementController, ExecuteControllers } from './ElementController.js';
import Viewport from './ViewportController.js';

const defaults = {
  fullWidth: false,
  vpOn: 0,
  startAt: null,
  loopFrom: null,
  loopTo: null
};

class AutoplayVideo extends Viewport {
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
    
    console.log(this.options);

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
      // this._video.addEventListener('canplay', this.init.bind(this), false);
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
    if(this.videoPlaying !== true && this.loopPeriod === true) {
      this.videoPlaying = true;
      requestAnimationFrame(this.onLoopCheck);
    }
    if(!isNaN(this.options.startAt)) {
      this._video.currentTime = this.options.startAt;
    }
  }

  onFrozen() {
    this.element.classList.add('is-frozen');
    this.videoPlaying = false;
  }

  onPause() {
    this.element.classList.add('is-paused');
    this.hasStarted = false;
    this.videoPlaying = false;
  }

  onEnded() {
    this._video.currentTime = this.options.loopTo;
    this._video.play();
  }

  onLoopCheck(delta) {
    if(this.videoPlaying === true && this.loopPeriod === true) {
      requestAnimationFrame(this.onLoopCheck);
    }

    if(this._video.currentTime >= this.options.loopFrom) {
      this._video.currentTime = this.options.loopTo;
    }
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

  viewportAnimationCallback(topPercent) {
    if (!this.isOnScreen && this.hasStarted && !this._video.paused) {
      this.pauseVideo();
      if(!isNaN(this.options.startAt)) {
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
