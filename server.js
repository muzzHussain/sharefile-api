const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDb = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const seedUsers = require("./utils/seedUsers");

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

connectDb().then(() => {
  seedUsers();
});

app.use("/api", authRoutes);
app.use("/api", fileRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
