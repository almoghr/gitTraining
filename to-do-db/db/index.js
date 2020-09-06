const mongoose = require('mongoose');
const {mongoUri} = require('../config.js');

module.exports = function connect() {
    require('../models/todo.js');
    require('../models/user.js');
    mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(() =>{
        console.log('could not connect to mongo');
        process.exit(1);
    })


}
