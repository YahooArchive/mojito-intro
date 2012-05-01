// Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
// Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
YUI.add('PresoBinder', function(Y, NAME)
{
    Y.namespace('mojito.binders')[NAME] =
    {
        init: function(proxy) 
        {
            var self = this;
            
            // store proxy for access in other methods
            self.proxy = proxy;
            
            // the number of slides should be specified in application.json specs
            self.numSlides = proxy.config.numSlides;
        },
        
        bind: function(node)
        {
            var self = this,
                // sniff for proper key event
                keyEvent = Y.UA.webkit || Y.UA.ie ? 'keydown' : 'keypress';
            
            // listen for keypress
            Y.one('body').on(keyEvent, self.handleKey, self);
            
            // make sure current slide is set
            self.onRefreshView(node);
        },
        
        onRefreshView: function(node)
        {
            var self = this,
                nav = node.one('nav');
            
            // get the current slide numbers from a data atribute within the nav links
            self.currentSlide = self.getSlideAttr(nav, 'a.current');
            self.nextSlide    = self.getSlideAttr(nav, 'a.next');
            self.prevSlide    = self.getSlideAttr(nav, 'a.prev');
            
            // update page title
            Y.one('title').setContent(Y.one('h1').getContent());
        },
        
        getSlideAttr: function(node, selector)
        {
            return parseInt(node.one(selector).getAttribute('data-slide'), 10);
        },
        
        changeSlide: function(num)
        {
            this.proxy.refreshView({params:{url:{slide: num}}});
        },
        
        handleKey: function(e)
        {
            var self = this,
                key = e.keyCode,
                slideNum = 0;
            
            // don't change for tab navigation
            if(e.altKey || e.ctrlKey)
            {
                return;
            }
            
            // left, up, page up respectively
            if(key == 37 /*|| key == 38*/ || key == 33)
            {
                slideNum = self.prevSlide;
            }
            // right, down, page down respectively
            else if(key == 39 /*|| key == 40*/ || key == 34)
            {
                slideNum = self.nextSlide;
            }
            // home
            else if(key == 36)
            {
                slideNum = 1;
            }
            // end
            else if(key == 35)
            {
                slideNum = self.numSlides;
            }
            
            // change slide if we got an expected key
            if(slideNum)
            {
                e.preventDefault();
                self.changeSlide(slideNum);
            }
        }
    };
}, '0.0.1', {requires: ['mojito-client']});
