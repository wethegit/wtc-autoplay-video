# [wtc-autoplay-video](https://github.com/wethegit/wtc-autoplay-video#readme) *2.0.4*

> Autoplaying video class


### src/wtc-autoplay-video.js


#### new AutoplayVideo() 

The AutoplayVideo class expects an element (as all wtc-element-controllers do) and can take an optional options argument
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
  vpOn: 30
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
    new WTCAutoplayVideo.default(videos[i], { vpOn: 0 });
  }
</script>
```

## Options

The options object is comprised of the following:

| Name | HTML Attribute | Type | Description | Default |
| ---- | -------------- | ---- | ----------- | ------- |
| vpOn | data-vp-on | `Number`  | The point at which the video should start playing after havign scrolled on the screen. | 0 |
| startAt | data-autoplay-video--start-at | `Number`  | When the video starts playing again, start at this point, in seconds. | null |
| loopFrom | data-autoplay-video--loop-from | `Number`  | When the video reaches this part, loop. If this isn't provided, the end of the video will be the loop point. | null |
| loopTo | data-autoplay-video--loop-to | `Number`  | When the video loops, this is the point that it will start the loop from. | null |

# Class Documentation






##### Returns


-  A new instance of the AutoplayVideo class



#### constructor(element, options) 

Creates an instance of AutoplayVideo.

Options object is comprised of the following:

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| vpOn | `Number`  | The point at which the video should start playing after havign scrolled on the screen. | 0 |
| startAt | `Number`  | When the video starts playing again, start at this point, in seconds. | null |
| loopFrom | `Number`  | When the video reaches this part, loop. If this isn't provided, the end of the video will be the loop point. | null |
| loopTo | `Number`  | When the video loops, this is the point that it will start the loop from. | null |




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| element | `DOMElement`  |  | &nbsp; |
| options | `Object`  |  | &nbsp; |




##### Returns


- `Void`



#### init() 

This method initialises the loaded video, sets up our ratios and attaches the 
relevant event listeners.






##### Returns


- `Void`



#### videoResize() 

Resize the video to the size of its parent. This is normally called as a part 
of the window resize handler but can also be called programatically.






##### Returns


- `Void`



#### onPlay() 

Responds to the videos playing method. This is responsible for setting the various 
state properties and starting up the run loop, if we need internal video looping.






##### Returns


- `Void`



#### onFrozen() 

If for some reason the video fails to play, this method will be called.
This adds an `is-frozen` class name to the element and sets `videoPlaying`
property to false.






##### Returns


- `Void`



#### onPause() 

When the video is paused this method is called.
This adds the `is-paused` class name to the element, sets the `hasStarted`
and `videoPlaying` properties to false.






##### Returns


- `Void`



#### onEnded() 

This responds to the videos `ended` event and is responsible for looping
the video only when a both a `loopTo` property is provided and a `loopFrom`
property is *not*.






##### Returns


- `Void`



#### onLoopCheck(delta) 

This method is a part of the run loop for the video. It will only run when
the video is playing (on screen) and when both the `loopTo` and `loopFrom`
properties are provided




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| delta | `Number`  |  | &nbsp; |




##### Returns


- `Void`



#### pauseVideo() 

This method pauses the video and is intended to be called programatically.






##### Returns


- `Void`



#### playVideo() 

This method plays the video and is intended to be called programatically.






##### Returns


- `Void`



#### viewportAnimationCallback(topPercent) 

This method overrides the parent class' viewportAnimationCallback
method and provides play/pause functionality based on the viewport
position. Basically this stops the video from playing unless it's
on-screen. 




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| topPercent | `any`  |  | &nbsp; |




##### Returns


- `Void`



#### video() 

(getter/setter) The video element itself






##### Returns


- `HTMLElement`  



#### fallback() 

(getter/setter) The fallback element






##### Returns


- `HTMLElement`  



#### hasStarted() 

(getter/setter) Whether the video has started playing






##### Returns


- `boolean`  



#### initiated() 

(getter/setter) Whether the instance has been initiated






##### Returns


- `boolean`  



#### loopPeriod() 

(getter/setter) Whether the instance is operating over a loop period






##### Returns


- `boolean`  



#### videoPlaying() 

(getter/setter) Whether the video has started playing.
This is specifically for the determination of the run loop.






##### Returns


- `boolean`  



#### ratio() 

(getter/setter) The video's aspect ratio.






##### Returns


- `number`  



#### startAt() 

(getter) The place in the video to start at, in seconds.
Set from the passed options.






##### Returns


- `number`  



#### loopFrom() 

(getter) The place in the video to loop from, in second.
This should be greater than loopTo (not sure what happens if not ^_^ ).
Set from the passed options.






##### Returns


- `number`  



#### loopTo() 

(getter) The place in the video to loop, in seconds.
Set from the passed options






##### Returns


- `number`  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
