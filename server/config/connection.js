const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `DB connection successfully! (${db.connection.host})`.magenta.underline
    );
  } catch (err) {
    console.log(`Error trying to connect with DB: ${err}`.red);
    process.exit();
  }
};

module.exports = connectDB;
