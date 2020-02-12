/* eslint-disable prefer-template */
/* eslint-disable no-tabs */
/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable semi */
// ==========================
/* SERVER.JS */

// Need to change more to new upgrade from V8
import {
 createServer,
} from 'http';

const hostname = '127.0.0.1';
const port = 2020;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Print test something, or todo something.\n');
});

server.listen(port, hostname, () => {
    console.log('Server running at http://' + hostname + ':' + port + '/');
});
