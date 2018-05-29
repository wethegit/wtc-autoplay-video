# wtc-autoplay-video
A simple class to deal with the vary different autoplaying video restrictions.

## Install
```sh
$ npm install wtc-autoplay-video
```

## Usage
Import it in your project.
```javascript
import AutoplayVideo from 'wtc-autoplay-video';
```

Add the markup.
```html
<div class="autoplay-video">
  <video
    class="autoplay-video__video"
    autoplay
    playsinline
    muted
    loop
  >
    <source
      src="video.mp4"
      type="video/mp4"
    />
  </video>
  <!-- REQUIRED -->
  <img
    class="autoplay-video__fallback"
    src="fallback.png"
    alt="Fallback"
  />
  <!-- OPTIONAL -->
  <img
    class="autoplay-video__preloader"
    src="preloader.png"
    alt="Preloader"
  />
</div>
```

### 1. Using ExecuteControllers
If you are using [wtc-controller-element] just **data-controller="AutoplayVideo"** to your markup.
```html
<div data-controller="AutoplayVideo" class="autoplay-video">
...
```
You can also instanciate explicitly:
```javascript
ExecuteControllers.instanciate(document.getElementById('autoplay-video'), AutoplayVideo);
```

### 2. Default JS
With the default js version, you have the option to pass the options as an object, or use data-attributes, they both work.
```javascript
let gallery = new AutoplayVideo(document.getElementById('autoplay-video'), {
  fullWidth: false
});
```

### 3. ES5 version
There's also an ES5 version to be used in browser anywhere. It's also really simple.
Add you markup, then add the script:
```html
<script src="dist/wtc-autoplay-video.es5.js"></script>
```
And for last, instanciate the videos:
```javascript
<script>
  var videos = document.querySelectorAll('.autoplay-video');
  for (var i = 0; i < videos.length; i++) {
    new WTCAutoplayVideo.default(videos[i]);
  }
</script>
```

## Options
  - fullWidth: this will add a resize event handler to deal with the video aspect ratio.

[wtc-controller-element]:https://github.com/wethegit/wtc-controller-element
