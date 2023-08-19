const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Db online!');
    } catch (error) {
        console.log(error);
        throw new Error('The database has a problem.');
    }
}

module.exports = {
    dbConnection
};