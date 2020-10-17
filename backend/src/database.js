const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/mean-employees',{
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useFindAndModify: true
})
        .then(db=>console.log('database is connected'))
        .catch(err=>console.error(err));