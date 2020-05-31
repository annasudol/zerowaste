const mongoose = require('mongoose');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const connection = () => {
  // eslint-disable-next-line no-undef
  mongoose.connect(`mongodb+srv://anna:Anulka12@cluster0-ghvuy.mongodb.net/test?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }).then(conn => console.log(`MangoDB connected: ${conn.connection.host}`).catch(error => console.warn(error))
  )
};

// eslint-disable-next-line no-undef
module.exports = connection;