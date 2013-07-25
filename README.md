# flight-transition

[![Build Status](https://secure.travis-ci.org/<username>/flight-transition.png)](http://travis-ci.org/olivierlesnicki/flight-transition)

A [Flight](https://github.com/flightjs/flight) component for [Codrops](http://tympanus.net/codrops/2013/05/07/a-collection-of-page-transitions/) page transitions. 

## Installation

```bash
bower install --save flight-transition
```

## Example

### HTML

``` html

<div id="transition"></div>

<div id="pages" style="diplay: none; visibility: hidden;">
 <div id="defaultPage">
    Hello ...
 </div>
 <div id="anOtherPage">
    ... world.
 </div>
</div>

```

### JS

``` javascript

define(['flight-transition'], function(Transition) {

  // Open a default page without any transition on component initialization
  Transition.attachTo('#transition', {
    defaultInSelector: '#defaultPage'
  });

  // Open a second page using animated transition 
  $(document).trigger('dataTransition', {
    inSelector: '#anOtherPage',
    animation : 'moveFromLeft' 
  });

});

```

## Development

Development of this component requires [Bower](http://bower.io), and preferably
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
