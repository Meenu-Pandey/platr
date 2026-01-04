const dotenv = require('dotenv')
dotenv.config();

const app = require('./src/app');
const connectDB = require('./src/db/db.js');

connectDB()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
