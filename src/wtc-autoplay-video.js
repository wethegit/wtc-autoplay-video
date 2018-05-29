import { default as ElementController, ExecuteControllers } from 'wtc-controller-element';
import { default as ViewportManager, Viewport } from 'wtc-controller-viewports';

class AutoplayVideo extends Viewport {
  constructor(element, options = { fullWidth: false }) {
    super(element);

    this.initiated = false;
    this.options = {
      fullWidth: this.element.classList.contains('autoplay-video--fullscreen') || options.fullWidth
    }

    this._video = this.element.querySelector('.autoplay-video__video');
    this._fallback = this.element.querySelector('.autoplay-video__fallback');

    this._video.muted = true;
    this._video.setAttribute('playsinline', '');
    this._video.setAttribute('muted', '');

    if (this._video.readyState >= 2) {
      this.init();
    }
    else {
      this._video.addEventListener('canplay', this.init.bind(this), false);
    }

    this._video.addEventListener('error', this.onFrozen.bind(this), true);
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

      this.playVideo();
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
  }

  onFrozen() {
    this.element.classList.add('is-frozen');
  }

  onPause() {
    this.element.classList.add('is-paused');
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

  get video() {
    return this._video;
  }
}

ExecuteControllers.registerController(AutoplayVideo, 'AutoplayVideo');

export default AutoplayVideo;
