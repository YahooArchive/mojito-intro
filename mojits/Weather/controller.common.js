YUI.add('Weather', function(Y, NAME)
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
                zip = ac.params.url('zip') || '90025';
            
            ac.models.ModelYql.select({fields: {location: zip}}, function(err, res)
            {
                var channel = res.query.results.channel;
                ac.done({
                    title: channel.description,
                    content: channel.item.description.split(/(?:<br \/>\n*){2}/i).slice(0,2).join('<br><br>')
                });
            });
            
            // the latest version of Mojito will do this automagically
            ac.assets.addCss('./index.css');
        }
    };
}, '0.0.1', {requires: ['json', 'mojito', 'ModelYql']});
