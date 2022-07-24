
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/wetSlip', {

    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Something went wrong when connecting to MongoDB', err));

