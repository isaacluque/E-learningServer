
const express = require('express');
const cors = require('cors');

const routerAuth = require('../routes/security/auth.routes');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Routes
        this.apiRoutes = {
            //Security
            auth:       '/auth'
        }

        //Middlewares
        this.middlewares();
        
        //Routes of my application
        this.routes();
    }

    middlewares() {
        //Public Directory
        this.app.use(express.static('./src/server/public'));
        //Cors
        this.app.use(cors())
        //Read end Parse of body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiRoutes.auth, routerAuth)
    }

    listen() {
        
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto: ${this.port}`)
        })

    }

}

module.exports = {
    Server
}