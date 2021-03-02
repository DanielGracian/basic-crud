const mongoose = require('mongoose');
const URI = require('./properties').Db;
mongoose.connect(URI,  {useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));


process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
        console.log('Mongo is desconected');
        process.exit(0);
    })
})

module.export = mongoose; 