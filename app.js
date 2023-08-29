
require('dotenv').config();
const { Server } = require('./src/server/models/server');

const server = new Server();

server.listen();