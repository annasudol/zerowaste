const mongoose = require('mongoose');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const connection = () => {
  // eslint-disable-next-line no-undef
  mongoose.connect(`mmongodb+srv://anna:LgfyaDTfqoPBCbWH@cluster0-zhsha.mongodb.net/test?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }).then(conn => console.log(`MangoDB connected: ${conn.connection.host}`).catch(error => console.warn(error))
  )
};

// eslint-disable-next-line no-undef
module.exports = connection;


// module.exports.isValidObjectId = (id) => {
//   return mongoose.Types.ObjectId.isValid(id);
// }

// const MongoClient = require('mongodb').MongoClient;
// module.exports.connection = async () => {
//   const uri = "mongodb+srv://anna:<password>@cluster0-l5vf9.mongodb.net/test?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true });
//   client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
//   });
// }

// module.exports.isValidObjectId = (id) => {
//   return mongoose.Types.ObjectId.isValid(id);
// }


