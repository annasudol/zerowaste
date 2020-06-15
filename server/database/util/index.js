const mongoose = require('mongoose');

const connection = () => {
  mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_USER_PASSWORD}@cluster0-ghyqs.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }).then(conn => console.log(`MangoDB connected: ${conn.connection.host}`))
    .catch(error => console.warn(error))
};

// eslint-disable-next-line no-undef
module.exports = connection;