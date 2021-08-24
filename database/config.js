const mongoose = require('mongoose');
const e = require('express');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Connected to DB');
    } catch(error) {
        console.log(error);
    }
}

module.exports = { dbConnection }