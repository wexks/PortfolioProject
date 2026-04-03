const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// 🔥 Подключение к БД
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Логер
app.use((req, res, next) => {
  console.log(`Запрос: ${req.method} ${req.url}`);
  next();
});

// API роуты
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

// Тест
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// 🔥 СТАТИКА (ФРОНТ)
const distPath = path.resolve(__dirname, "../dist");

app.use(express.static(distPath));

// 👉 ВАЖНО: отдаём index.html для всех остальных запросов
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// PORT
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});