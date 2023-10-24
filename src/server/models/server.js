
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const routerAuthAdmin = require('../routes/security/auth-admin.routes');
const routerUser = require('../routes/security/user.routes');
const routerLocation = require('../routes/student/location/location.routes');
const routerCompanySize = require('../routes/student/company-size/company-size.routes');
const routerUpload = require('../routes/security/upload.routes');
const routerRole = require('../routes/security/role.routes');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Routes
        this.apiRoutes = {
            //Security
            auth:       '/auth',
            user:       '/user',
            upload:     '/upload',
            role:       '/role',

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
        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '../photos'
        }));
    }

    routes() {
        //Security
        this.app.use(this.apiRoutes.auth, routerAuthAdmin);
        this.app.use(this.apiRoutes.register, routerUser);
        this.app.use(this.apiRoutes.user, routerUser);
        this.app.use(this.apiRoutes.upload, routerUpload);
        this.app.use(this.apiRoutes.role, routerRole);

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