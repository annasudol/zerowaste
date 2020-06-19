const mongoose = require('mongoose');

const connection = () => {
  mongoose.connect(`${process.env.MONGO_DB}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }).then(conn => console.log(`MangoDB connected: ${conn.connection.host}`))
    .catch(error => console.warn(error))
};

// eslint-disable-next-line no-undef
module.exports = connection;
