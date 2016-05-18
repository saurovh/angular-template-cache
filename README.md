# grunt-angular-template-cache

> For Angular directive template sometime we need to give the template in index file for `$templateCache` service to be cached. but our template remains in a seprate file. so there are two copies we needed to maintain. which slow down our development process. so by this grunt plugin you able to place your directive templateUrl contain inline in any file you want to use as ng-template.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-template-cache --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('angular-template-cache');
```

## The "angular-template-cache" task

### Overview
In your project's Gruntfile, add a section named `grunt-angular-template-cache` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'angular-template-cache': {
    default_options : {
        options: {
              startTag: '<!--TEMPLATE_START-->',
              endTag: '<!--TEMPLATE_END-->',
              appRoot: '',
              relative: true,
              fullName : false // test/fixtures/123.html  or 123.html   in script id 
          },
          files: {
            'index.html': ['test/fixtures/123.html','test/fixtures/testing.html']
           }
      }
  },
});
```

### Options

#### options.startTag
Type: `String`
Default value: `<!--TEMPLATE_START-->`

A string value that is start point of the template content in index file

#### options.endTag
Type: `String`
Default value: `<!--TEMPLATE_END-->`

A string value that is end point of the template content in index file

#### options.fullName
Type: `Bolean`
Default value: `false`

give the full url as script tag if or just the name

### Usage Examples

#### Default Options
In this example, the default options are used to copy and minify the html content of 123.html and testing.html into index.html file inline as ng-template

```js
grunt.initConfig({
  'angular-template-cache': {
    default_options : {
        options: {
              startTag: '<!--TEMPLATE_START-->',
              endTag: '<!--TEMPLATE_END-->',
              appRoot: '',
              relative: true,
              fullName : false // test/fixtures/123.html  or 123.html   in script id 
          },
          files: {
            'index.html': ['test/fixtures/123.html','test/fixtures/testing.html']
           }
      }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
