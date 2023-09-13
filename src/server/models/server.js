
const express = require('express');
const cors = require('cors');

const routerAuth = require('../routes/security/auth.routes');
const routerUser = require('../routes/security/user.routes');
const routerStudent = require('../routes/student/student.routes');
const routerLocation = require('../routes/student/location/location.routes');
const routerCompanySize = require('../routes/student/company-size/company-size.routes');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Routes
        this.apiRoutes = {
            //Security
            auth:       '/auth',
            user:       '/user',

            //Register Student
            register:   '/register',

            //Location
            location: '/location',

            //Company size
            companysize: '/company-size',
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
        //Security
        this.app.use(this.apiRoutes.auth, routerAuth);
        this.app.use(this.apiRoutes.user, routerUser);

        //Student
        this.app.use(this.apiRoutes.register, routerStudent);

        //Location
        this.app.use(this.apiRoutes.location, routerLocation);

        //Company size
        this.app.use(this.apiRoutes.companysize, routerCompanySize);
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