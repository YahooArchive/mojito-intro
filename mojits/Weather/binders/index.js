// Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
// Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
YUI.add('WeatherBinder', function(Y, NAME)
{
    Y.namespace('mojito.binders')[NAME] =
    {
        init: function(proxy) 
        {
            var self = this;
            
            // attach a listener to the zipcode form
            Y.one('form').on('submit', self.handleForm, self);
            
            // story proxy for later use
            self.proxy = proxy;
        },
        
        handleForm: function(e)
        {
            e.halt();
            
            var self = this,
                zip  = e.target.get('zip').get('value');
            
            if(zip)
            {
                self.proxy.refreshView({params:{url:{zip: zip}}});
            }
        },
        
        bind: function(node)
        {
            this.onRefreshView(node);
        },
        
        onRefreshView: function(node, domNode)
        {
            this.updateTitle();
        },
        
        updateTitle: function()
        {
            Y.one('title').setContent(Y.one('h1').getContent());
        }
    };
}, '0.0.1', {requires: ['mojito-client']});
