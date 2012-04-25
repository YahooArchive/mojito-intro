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
            var self = this;
            
            // sniff for proper key event
            self.keyEvent = Y.UA.webkit || Y.UA.ie ? 'keydown' : 'keypress';
            
            // listen for keypress
            Y.one('body').on(self.keyEvent, self.handleKey, self);
            
            // make sure current slide is set
            self.onRefreshView(node);
        },
        
        onRefreshView: function(node)
        {
            // get the current slide number from a data atribute within the view
            this.currentSlide = parseInt(node.getAttribute('data-slide'), 10);
            
            // update page title
            Y.one('title').setContent(Y.one('h1').getContent());
        },
        
        changeSlide: function(num)
        {
            this.proxy.refreshView({params:{url:{slide: num}}});
        },
        
        handleKey: function(e)
        {
            var self = this,
                key = e.keyCode,
                numSlides = self.numSlides,
                currentSlide = self.currentSlide,
                nextSlide = 0;
            
            // left, up, page up respectively
            if(key == 37 || key == 38 || key == 33)
            {
                nextSlide = currentSlide > 1 ? currentSlide - 1 : numSlides;
            }
            // right, down, page down respectively
            else if(key == 39 || key == 40 || key == 34)
            {
                nextSlide = currentSlide < numSlides ? currentSlide + 1 : 1;
            }
            // home
            else if(key == 36)
            {
                nextSlide = 1;
            }
            // end
            else if(key == 35)
            {
                nextSlide = self.numSlides;
            }
            
            // change slide if we got an expected key
            if(nextSlide)
            {
                e.preventDefault();
                self.changeSlide(nextSlide);
            }
        }
    };
}, '0.0.1', {requires: ['mojito-client']});
