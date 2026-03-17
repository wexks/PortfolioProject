const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Подключаем .env из папки env
dotenv.config({ path: __dirname + "/env/.env" });
console.log("dotenv loaded", process.env.MONGO_URI);

const connectDB = require("./config/db");
connectDB(); // подключаем MongoDB

const app = express();

app.use(cors());
app.use(express.json());

// Маршруты (временно заглушки)
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
