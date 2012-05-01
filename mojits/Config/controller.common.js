// Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
// Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
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
            
            ac.done({
                context: json(ac.context),
                config: json(self.config),
                definition: json(ac.config.getDefinition('struct')),
                app: json(ac.app.config.yui)
            });
        }
    };
}, '0.0.1', {requires: ['mojito', 'json', 'mojito-config-addon']});
