React Image Lazy Load ImageLoader
==================================
## Installation

```bash
# Yarn
$ yarn add react-lazyimg-dxy
# NPM
$ npm i --save react-lazyimg-dxy
```


## `ImageLoader` usage

```javascript
import React from 'react';
import Image from 'react-lazyimg-dxy';
const ImageDemo = () => (
  <Image
          width="420px"
          height="420px"
          rootMargin="10px"
          src={"https://source.unsplash.com/random/200x200"}
        />
);
export default ImageDemo;
```

### Props

| Prop | Type | Default | Description |
|:---|:---|:---|:---|
| src | `String` | | Image url |
| width | `String` | `auto` | Width of the image to provide, default is auto |
| height | `String` | `auto` | Height of the image to provide, default is auto |
| postVisible | `Function` |  | Function called right after the placeholder comes in the view port|
| postImgLoaded | `Function` |  | Function called right after the actual image is loaded |
| placeholderSrc | `String` | | Image src to display while the image is not visible or loaded. |
| root | Element | null(which is browser view port) | The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null |
| rootMargin | `String` | `100px` | Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros |
| threshold | `Number` | 0 | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible |
| wrapperClassName | `String` |  | Using this prop wrapper class name can be set |
| alt | `String` | `image` | Set alt tag of the image |
