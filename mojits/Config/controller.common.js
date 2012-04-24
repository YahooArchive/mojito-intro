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
            ac.done(
                Y.merge(ac.context, {
                    config: Y.JSON.stringify(this.config)
                })
            );
        }
    };
}, '0.0.1', {requires: ['json', 'mojito']});
