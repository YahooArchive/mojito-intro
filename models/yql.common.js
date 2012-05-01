// Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
// Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
YUI.add('ModelYql', function(Y, NAME)
{
    Y.mojito.models[NAME] =
    {
        init: function(config)
        {
            this.config = config;
        },
        
        select: function(args, cb)
        {
            var self = this,
                table = args.table || self.config.yqlTable,
                fields = args.where || self.buildWhere(args.fields);
            
            Y.YQL('select * from ' + table + ' where ' + fields, function(res)
            {
                cb(null, res);
            });
        },
        
        buildWhere: function(fields)
        {
            var where = '',
                field;
            
            for(field in fields)
            {
                where += (where ? ' AND ' : '') + field + '=' + fields[field];
            }
            
            return where;
        }
    };
}, '0.0.1', {requires: ['yql']});
