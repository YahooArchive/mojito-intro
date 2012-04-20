YUI.add('ModelWeather', function(Y, NAME)
{
    Y.mojito.models[NAME] =
    {
        init: function(config)
        {
            this.config = config;
        },
        
        getData: function(args, cb)
        {
            Y.YQL('select * from weather.forecast where location=' + args.zip, function(res)
            {
                cb(null, res);
            });
        }
    };
}, '0.0.1', {requires: ['yql']});
