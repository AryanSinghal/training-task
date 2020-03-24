import * as mongoose from 'mongoose';

export default class Database {
  static open = (mongoUrl) => {
    const promise = new Promise((resolve, reject) => {
      mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          reject(err);
        }
        console.log('Database Connected at :', mongoUrl);
        resolve();
      });
    });
    return promise;
  }
  static disconnect = () => {
    mongoose.connection.close();
    console.log('Database disconnected');
  };
}
