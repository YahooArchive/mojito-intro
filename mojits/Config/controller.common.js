YUI.add('mojit', function(Y, NAME)
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
                json = Y.JSON.stringify;
            
            self.config.foo = 'foo';
            
            ac.done({
                context: json(ac.context),
                config: json(self.config),
                yui: json(ac.app.config.yui)
            });
        }
    };
}, '0.0.1', {requires: ['json', 'mojito']});
