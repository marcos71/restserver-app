const express = require('express')
const cors = require('cors');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.use('/api/users', require('../routes/user'));
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