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
            var self = this;
            ac.done({}, {'view':{'name': 'slide1'}});
        }
    };
}, '0.0.1', {requires: ['json', 'mojito']});
