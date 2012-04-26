YUI.add('ConfigBinder', function(Y, NAME)
{
    Y.namespace('mojito.binders')[NAME] =
    {
        init: function(proxy)
        {
            Y.log(proxy.context, 'warn');
            Y.log(proxy.config, 'warn');
        }
    };
}, '0.0.1', {requires: ['mojito-client']});
