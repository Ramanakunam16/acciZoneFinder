const mongoose = require("mongoose");
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbConnection = () => {
  try {
    mongoose.connect(
      "mongodb+srv://ramanakunam16:NLUod9K4XRdTT74X@users.zot5b6u.mongodb.net/users",
      connectionParams
    );
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("failed to connect to database");
  }
};

module.exports = dbConnection;
