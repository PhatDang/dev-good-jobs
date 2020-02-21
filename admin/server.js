/* SERVER.JS */
import { createServer } from "http";

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Print test something, or todo something.\n");
});

const hostname = "127.0.0.1";
const port = 2020;

server.listen(port, hostname, () => {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});
