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
            var self = this;
            
            ac.models.ModelWeather.getData({zip: ac.params.url('zip') || '90025'}, function(err, res)
            {
                var channel = res.query.results.channel;
                ac.done(Y.merge(ac.context, {
                    title: channel.description,
                    content: channel.item.description,
                    config: Y.JSON.stringify(self.config)
                }));
            });
            
            ac.assets.addCss('./index.css');
        }
    };
}, '0.0.1', {requires: ['json', 'mojito', 'ModelWeather']});
