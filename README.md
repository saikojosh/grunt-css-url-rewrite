# Grunt CSS Url Rewrite

This task provides a way to rewrite all URL's found within a stylesheet (those within a url( ... ) declaration), to improve cache-invalidation or to reference a CDN or something like that.

## Getting Started

Install this plugin with the command:

```js
npm install grunt-css-url-rewrite
```

Next, add this line to your project's grunt file:

```js
grunt.loadNpmTasks("grunt-css-url-rewrite");
```

Lastly, add configuration settings to your grunt.js file (see below).

## Documentation

This task has two required properties, `src` and `dest`. `src` is the path to your stylesheet and `dest` is the file this task will write to (relative to the grunt.js file). If this file already exists **it will be overwritten**.

An example configuration looks like this:

```js
grunt.initConfig({
  cssUrlRewrite: {
    dist: {
      src: [ "css/styles.css" ],
      dest: "css/output.css",
      options: {
        deleteAfterEncoding: false,
        maxImageSize: 0,
        fetchExternal: false,
        warnDuplication: false,
        keepParams: true,
        rewriteUrl: function(url, options, dataURI) {
          var path = url.replace(options.baseDir, '');
          var hash = require('crypto').createHash('md5').update(dataURI).digest('hex');
          return '/v-' + hash + '/' + path;
        }
      }
    }
  }
});
```

### Optional Configuration Properties

CssUrlRewrite can be customized by specifying the following options:

* `maxImageSize`: The maximum size of the base64 string in bytes. This defaults to `32768`, or IE8's limit. Set this to `0` to remove the limit and allow any size string.
* `baseDir`: If you have absolute image paths in your stylesheet, the path specified in this option will be used as the base directory.
* `deleteAfterEncoding`: Set this to true to delete images after they've been encoded. You'll want to do this in a staging area, and not in your source directories.  Be careful.

### Skipping Images

Specify that an image should be skipped by adding the following querystring *after* the image:

```css
background: url(image.gif?gruntCssUrlRewrite=skip);
```

## Compatibility

Version >= 0.3.0 of this plugin is compatible with Grunt 0.4.x. Versions 0.0.1 through 0.2.0 are only compatible with Grunt 0.3.x.

## License

Copyright (c) 2013 Eric Hynds (@erichynds)
Licensed under the MIT License.
