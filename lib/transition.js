define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var css             = require('bower_components/text/text!./transition.css');

  /**
   * Module exports
   */

  return defineComponent(transition);

  /**
   * Module function
   */

  function transition() {
      
    this.defaultAttrs({
        defaultInSelector: '#page2'
    });
    
    var animationEndEvent = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';
    
    this.lookupAnimationClasses = function(animation) {
        
        var inClass  = 'pt-page-moveFromLeft'
          , outClass = 'pt-page-moveToRight'
        
        switch (animation) {

        	case 'slideFromRight':
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
                
			case 'slideFromLeft':
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
                
			case 'slideFromBottom':
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
                
			case 'slideFromTop':
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
            
        }
        
        return {
            in : inClass,
            out: outClass
        }
        
    }

    this.transition = function (e, data) {
        
        var _self = this
          , currentPageIndex = parseInt(this.$node.attr('data-current-page'))
          , $currPage        = this.$node.children().eq(currentPageIndex)
          , $nextPage        = this.$node.children().eq((currentPageIndex + 1) % 2)
          , animationClasses = this.lookupAnimationClasses(data.animation) 

        /* check animating status */
        if(this.$node.attr('data-animating')) {
            return false;
        }

        this.trigger('uiTransitionStart', {
            inSelector: data.selector
        });

        /* update animating statuses */
        this.$node.attr('data-animating'     , '');
        this.$node.attr('data-animating-curr', '');
        this.$node.attr('data-animating-next', '');
        
        /* load next page content in page */
        this.loadSelector(data.inSelector, $nextPage);
        $nextPage.addClass('pt-page-current');

    	$currPage
          .addClass(animationClasses.out)
          .on(animationEndEvent, function() {
			$currPage.off(animationEndEvent);
			_self.$node.removeAttr('data-animating-curr');
			if(!_self.$node.attr('data-animating-curr')) {
				_self.onEndAnimation($currPage, $nextPage, data.Selector);
			}
		});

		$nextPage
          .addClass(animationClasses.in)
          .on(animationEndEvent, function() {
			$nextPage.off(animationEndEvent);
    		_self.$node.removeAttr('data-animating-next');
			if(!_self.$node.attr('data-animating-next')) {
				_self.onEndAnimation($currPage, $nextPage, data.Selector);
			}
		});                
        
    };
    
    this.onEndAnimation = function($currPage, $nextPage, selector) {
        
        /* update current page */
        $currPage.attr('class', 'pt-page'                );
		$nextPage.attr('class', 'pt-page pt-page-current');
        this.$node.attr('data-current-page', $nextPage.index());
        
        /* cache old content */
        this.cachePage($currPage);
        
        this.trigger('uiTransitionEnd', {
            inSelector: selector
        });
        
        /* update animating status */
        this.$node.removeAttr('data-animating');        
        
    };
    
    /* append selector to page container */
    this.loadSelector = function(selector, $page) {
        $(selector).appendTo($page);
    };
    
    this.cacheSelector = function(selector) {
        this.loadSelector(selector, this.$node.find('.pt-page-cache'));
    };
    
    /* append page content to cache container */
    this.cachePage = function($page) {
        $page.children().appendTo(this.$node.find('.pt-page-cache'));
    };
        
    this.after('initialize', function () {
        
        var _self = this;
        
        /* inject css */
        $("<div />", {
            html: '&shy;<style>' + css + '</style>'
        }).children().appendTo("body"); 
        
        /* set up node classes */
        this.$node
          .addClass('pt-perspective')
          .attr('data-current-page', 0)
          .html('');
                
        /* set up pages classes */
        $("<div>", {class: "pt-page pt-page-current"}).append($('#page1'))
          .appendTo(this.$node);
        $("<div>", {class: "pt-page"})
          .appendTo(this.$node);
        $("<div>", {class: "pt-page-cache"})
          .appendTo(this.$node);
        
        /* load initial page content if provided */
        if(this.attr.defaultInSelector) {
            this.cacheSelector(this.attr.defaultInSelector);
            this.trigger('uiTransitionEnd', {
                inSelector: this.attr.defaultInSelector
            });
        }
        
        /* listen events */
        this.on(document, 'dataTransition', this.transition);

    });
    
  }

});
