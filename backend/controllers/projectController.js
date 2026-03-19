const Project = require("../models/Project");

// 1. Создание проекта (CREATE)
exports.createProject = async (req, res) => {
  try {
    // Используем spread оператор для тела запроса и добавляем ID создателя
    const project = await Project.create({ 
      ...req.body, 
      createdBy: req.user // Берем из middleware auth.js
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Ошибка при создании проекта" });
  }
};

// 2. Получение всех проектов (READ)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name email");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Обновление проекта (UPDATE)
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Чтобы вернулся уже обновленный объект
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: "Ошибка при обновлении" });
  }
};

// 4. Удаление проекта (DELETE)
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Проект успешно удален" });
  } catch (error) {
    res.status(404).json({ message: "Проект не найден" });
  }
};

// projectController.js
const createProject = async (req, res) => {
    const { title, description, category } = req.body;

    // === ВАЛИДАЦИЯ ===
    if (!title || title.length < 3) {
        return res.status(400).json({ message: "Название слишком короткое" });
    }
    if (!description || description.length < 5) {
        return res.status(400).json({ message: "Описание слишком короткое" });
    }
    if (!category) {
        return res.status(400).json({ message: "Категория обязательна" });
    }
    
    // === Дальше уже создание проекта ===
    try {
        const newProject = await Project.create({ title, description, category });
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
const updateProject = async (req, res) => {
    const { title, description, category } = req.body;

    // Валидация
    if (title && title.length < 3) {
        return res.status(400).json({ message: "Название слишком короткое" });
    }
    if (description && description.length < 5) {
        return res.status(400).json({ message: "Описание слишком короткое" });
    }

    // Обновление
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description, category },
            { new: true }
        );
        if (!updatedProject) return res.status(404).json({ message: "Проект не найден" });
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
