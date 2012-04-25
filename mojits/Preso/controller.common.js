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
                num = ac.params.url('slide') || '1',
                children = null;
            
            // store ac for access in other methods and closure
            self.ac = ac;
            
            function done(meta)
            {
                var viewName = 'slide' + num,
                    meta = meta || {};
                
                // workaround for a diff view and binder
                self.populateBinder('index', viewName);
                
                // specify the curent slide as the view
                meta.view = {'name': viewName};
                
                // end execution
                self.ac.done({}, meta);
            }
            
            // handle any children that the slide expects
            switch(num)
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
        }
    };
}, '0.0.1', {requires: ['json', 'mojito']});
