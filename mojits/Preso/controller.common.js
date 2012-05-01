// Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
// Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
YUI.add('Preso', function(Y, NAME)
{
    Y.mojito.controllers[NAME] =
    {
        init: function(config)
        {
            this.config = config;
        },
        
        index: function(ac)
        {
            var self = this,
                // slide can come from routes or query params
                currentSlide = parseInt(ac.params.merged('slide') || '1', 10),
                children = null;
            
            // store slide info
            self.currentSlide = currentSlide;
            self.prevSlide = currentSlide > 1 ? currentSlide - 1 : self.config.numSlides;
            self.nextSlide = currentSlide < self.config.numSlides ? currentSlide + 1 : 1;
            
            // store ac for access in other methods and closure
            self.ac = ac;
            
            function done(meta)
            {
                var viewName = 'slide' + currentSlide,
                    meta = meta || {};
                
                // workaround for a diff view and binder
                self.populateBinder('index', viewName);
                
                // specify the curent slide as the view
                meta.view = {'name': viewName};
                
                // end execution
                self.ac.done({nav: self.genNav()}, meta);
            }
            
            // handle any children that the slide expects
            switch(currentSlide)
            {
                
            }
            
            done();
        },
        
        // use the binder from one view in another
        populateBinder: function(base, target)
        {
            var self = this,
                views = self.ac.command.instance.views;
            
            views[target] = Y.merge(views[base], views[target]);
        },
        
        genNav: function()
        {
            var self = this;
            
            return [
            '<nav>',
                '<a href="/' + self.prevSlide + '" data-slide="' + self.prevSlide + '" title="Previous Slide" class="prev">&lt;</a>',
                '<a href="/' + self.currentSlide + '" data-slide="' + self.currentSlide + '" title="Current Slide" class="current">#</a>',
                '<a href="/' + self.nextSlide + '" data-slide="' + self.nextSlide + '" title="Next Slide" class="next">&gt;</a>',
            '</nav>'
            ].join(' ');
        }
    };
}, '0.0.1', {requires: ['json', 'mojito']});
