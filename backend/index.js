/* eslint-disable */

/**
 * created on 17.04.
 * @author John Waweru
 */

const http = require('http');
const debug = require('debug')('Hackerbay.io:Backend');
const app = require('./lib/app');

// setup server port
const port = normalizePort(process.env.PORT || 8080);
app.set('port', port);
app.set('env', process.env.ENV);

// bootstrap server from http module
const server = http.createServer(app);

// start server
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * provide the appropriate data type of the port which is number
 * @param {*} val
 * @return {*}
 */
function normalizePort(val) {
    const port = (typeof val === 'string') ? parseInt(val, 10) : val;

    if (isNaN(port)) {
        return val;
    } else if (port >= 0) {
        return port;
    } else {
        return false;
    }
}
/**
 * when the server errors out when it tries starting
 * @param {Error} error Http Server error object
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * log the port number after the server successfully starts
 */
function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
    console.log(`Listening on ${bind}`);
}

debug('Events254 Server');