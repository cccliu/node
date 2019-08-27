const http = require('http');
const PORT = 3100
const severHandle = require('../app');

http.createServer(severHandle).listen(PORT)