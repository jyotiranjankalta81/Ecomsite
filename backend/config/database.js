const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI
        // {useNewUrlParser: true, useUnifiedTopology: true,
        // { useCreateIndex: true }
        //  , useFindAndModify: false }
    ).then((data) => {
        console.log(`Mongodb connected with setver:${data.connection.host}`);

    })
    // i used unhandeled err so there is no need to catch block

}

module.exports = connectDatabase