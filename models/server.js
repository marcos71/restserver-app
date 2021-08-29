const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.authRoute = "/api/auth";
        this.usersRoute = "/api/users";

        this.connectDb();

        this.middlewares();

        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.authRoute, require('../routes/auth'));
        this.app.use(this.usersRoute, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('App listening on port', this.port);
        });
    }

    middlewares() {
        // PUBLIC
        this.app.use( express.static('public'));

        // PARSE JSON
        this.app.use( express.json());
        
        // CORS
        this.app.use(cors());
    }
}

module.exports = { Server }