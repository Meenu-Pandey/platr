require("dotenv").config();


const app = require('./src/app');
const connectDB = require('./src/db/db');

if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
  throw new Error("Critical env vars missing");
}

connectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})