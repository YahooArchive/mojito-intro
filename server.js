// Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
// Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
try {
    module.exports = require('mojito').createServer();
} catch(e) {
    try {
        module.exports = require('/usr/local/lib/node_modules/mojito').createServer();
    } catch(e) {
        console.log(e.message);
        console.log('Please install mojito first via npm.');
    }
}
