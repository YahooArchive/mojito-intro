// Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
// Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
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
                    // get rid of some unwanted content via regex hackery
                    content: channel.item.description.split(/(?:<br \/>\n*){2}/i).slice(0,2).join('<br><br>'),
                    // only include the form on the initial render
                    form: ac.context.runtime === 'server' ? '<form method="GET"><label for="zip">zip</label><input type="text" name="zip"></form>' : ''
                });
            });
            
            // the latest version of Mojito will do this automagically
            ac.assets.addCss('./index.css');
        }
    };
}, '0.0.1', {requires: ['json', 'mojito', 'ModelYql']});
