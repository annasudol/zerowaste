const mongoose = require('mongoose');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const connection = async () => {
  // eslint-disable-next-line no-undef
  const conn = await mongoose.connect("mongodb+srv://anna:IYtXNdOOGk0lvjUh@cluster0-l5vf9.mongodb.net/test?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  console.log(`MangoDB connected: ${conn.connection.host}`);
};

// eslint-disable-next-line no-undef
module.exports = connection;
