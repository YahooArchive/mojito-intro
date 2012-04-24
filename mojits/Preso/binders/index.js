YUI.add('PresoBinder', function(Y, NAME)
{
    Y.namespace('mojito.binders')[NAME] =
    {
        init: function(proxy) 
        {
            var self = this;
            self.proxy = proxy;
        }
    };
}, '0.0.1', {requires: ['mojito-client']});
