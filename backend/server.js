const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// 🔥 Подключение к БД
connectDB();

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

// Тестовый эндпоинт
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// ✅ ВАЖНО: PORT с fallback
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
const path = require("path");

app.use(express.static(path.join(__dirname, "../dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
app.use(express.static(path.join(__dirname, "../dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});