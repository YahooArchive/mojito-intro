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
