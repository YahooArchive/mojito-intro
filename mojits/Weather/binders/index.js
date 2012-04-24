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
        },
        
        updateTitle: function()
        {
            Y.one('title').setContent(Y.one('h1').getContent());
        }
    };
}, '0.0.1', {requires: ['mojito-client']});
