// Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
// Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
var fs = require('fs'),
    pa = require('path'),
    parseUrl = require('url').parse,
    hl,
    highlight;

try {
    // https://github.com/andris9/highlight
    hl = require('highlight').Highlight;
    highlight = function (data)
    {
        var content = hl(data);
        return [
            '<html><head>',
            '<link rel="stylesheet" href="/static/assets/highlight.css">',
            '<style>body { font-size:150%; }</style>',
            '</head><body><pre><code>',
            content,
            '</code></pre></body></html>'
        ].join('');
    }
} catch(e) {
    highlight = function (c){ return c; };
}

function resolveMime (ext)
{
    switch(ext)
    {
        case 'js': mime = 'application/javascript'; break;
        case 'json': mime = 'application/json'; break;
        case 'html': mime = 'text/html'; break;
        default: mime = 'text/plain';
    }
    
    return mime;
}

module.exports =  function(req, res, next)
{
    if (req.method !== 'GET') {
        return next();
    }

    var url = parseUrl(req.url),
        path = url.pathname.substr(1),
        slash = path.indexOf('/'),
        basePath = slash !== -1 ? path.substr(0, slash) : null,
        filename,
        ext;
    
    if('src' === basePath)
    {
        filename = __dirname + '/..' + path.substr(slash);
        ext = path.substr(path.lastIndexOf('.')+1);
    }
    else
    {
        return next();
    }
    
    fs.stat(filename, function(err, stat)
    {
        if (err)
        {
            logger.log('err finding: ' + filename, 'warn', NAME);
            return next();
        }
        else if (stat.isDirectory())
        {
            fs.readdir(filename, function(err, files)
            {
                var data = '',
                    f, fl;
                
                for(f=0, fl=files.length; f<fl; f++)
                {
                    data += '<li><a href="' + url.pathname + 
                        (url.pathname.slice(-1) == '/' ? '' : '/') +
                        files[f] + '">' + files[f] + '</a></li>';
                }
                
                ext = 'html';
                serve(null, data);
            });
        }
        else
        {
            fs.readFile(filename, 'utf-8', serve);
        }

        function serve(err, data)
        {
            if (err) {
                logger.log('NOT FOUND: ' + filename, 'warn');
                return next(err);
            }
            
            var charset = 'utf-8',
                content = ext == 'js' || ext == 'json' ? highlight(data) : data,
                mimetype = data.length !== content.length ? 'text/html' : resolveMime(ext),
                headers = {
                    'Content-Type': mimetype + (charset ? '; charset=' + charset : ''),
                    'Content-Length': content.length,
                    'Cache-Control': 'public max-age=0',
                    'Last-Modified': stat.ctime.toUTCString()
                };

            res.writeHead(200, headers);
            res.end(content);
        }
    });
}
