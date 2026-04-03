const express = require("express");
const cors = require("cors");
require("dotenv").config();

// УБРАЛИ кастомный путь
console.log("dotenv loaded", process.env.MONGO_URI);

const connectDB = require("./config/db");

// ❗ ВРЕМЕННО ОТКЛЮЧАЕМ БАЗУ
// connectDB();

const app = express();

// CORS
app.use(cors());
app.use(express.json());

// Логер
app.use((req, res, next) => {
  console.log(`Запрос: ${req.method} ${req.url}`);
  next();
});

// Роуты
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

// Тест
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// ❗ ТОЛЬКО PORT из Railway
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));