/* SERVER.JS */
const http = require('http');

const hostname = '127.0.0.1'
const port = 2020;

cosnt server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('HELLO WORLD !!!\n');
});

server.listen(port, hostname, () => {
	console.log('Server running at http://' + hostname + ':' + port + '/');
});