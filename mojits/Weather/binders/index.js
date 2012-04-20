YUI.add('WeatherBinder', function(Y, NAME)
{
    Y.namespace('mojito.binders')[NAME] =
    {
        init: function(proxy) 
        {
            var self = this,
                form = Y.Node.create('<form><label for=zip>zip</label><input type=text name=zip></form>');
            
            Y.one('body').append(form);
            form.on('submit', self.handleForm, self);
            
            console.log(proxy._mojito, 'warn')
            
            self.proxy = proxy;
        },
        
        handleForm: function(e)
        {
            e.halt();
            
            var self = this,
                form = e.target,
                zip = form.get('zip').get('value');
            
            if(zip)
            {
                self.proxy.refreshView({params:{url:{zip: zip}}});
            }
        },
        
        bind: function(node)
        {
            this.updateTitle();
        },
        
        onRefreshView: function(node, domNode)
        {
            var self = this,
                proxy = self.proxy,
                context = proxy.context;
            
            self.updateTitle();
            /*
            proxy.render('fragment', {
                type: proxy.type,
                config: Y.JSON.stringify(proxy.config),
                lang: context.lang,
                device: context.device
            }, function(err){Y.log(arguments, 'warn')});
            */
            //console.log('refreshed', arguments);
        },
        
        updateTitle: function()
        {
            Y.one('title').setContent(Y.one('h1').getContent());
        }
    };
}, '0.0.1', {requires: ['mojito-client']});
