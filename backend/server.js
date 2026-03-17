const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Подключаем .env
dotenv.config({ path: __dirname + "/env/.env" });
console.log("dotenv loaded", process.env.MONGO_URI);

const connectDB = require("./config/db");
connectDB(); 

const app = express();

// 1. Настройка CORS (разрешаем всё для тестов)
app.use(cors());
app.use(express.json());

// 2. ЛОГЕР: Ты увидишь в консоли, когда нажмешь Send в Postman
app.use((req, res, next) => {
  console.log(`Запрос: ${req.method} ${req.url}`);
  next();
});

// Маршруты
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

// Тестовые эндпоинты (проверь их в Postman, если 403 останется)
app.post("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));