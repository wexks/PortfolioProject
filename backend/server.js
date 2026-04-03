const express = require("express");
const cors = require("cors");
const path = require("path");
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

// Роуты API
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

// Тест
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// 🔥 ПУТЬ К dist (ФИКС)
const distPath = path.join(process.cwd(), "dist");

// Отдаём фронт
app.use(express.static(distPath));

app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// PORT
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});