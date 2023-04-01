const mongoose = require("mongoose");
const mongoUri = "mongodb://127.0.0.1:27017/inotebook?directConnection=true";

const connectToMongo = async () => {
  await mongoose.connect(mongoUri, () => {
    console.log("Connected to mongo");
  });
};

module.exports = connectToMongo;
