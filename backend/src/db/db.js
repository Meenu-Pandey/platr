const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(process.env.MONGODB_URL).then(() => console.log('DATABASE CONNECTED')).catch(err => console.log(err))
}


module.exports = connectDB