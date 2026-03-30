const Project = require("../models/Project");

// 1. Создание проекта (CREATE)
exports.createProject = async (req, res) => {
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

  try {
    const project = await Project.create({
      title,
      description,
      category,
      createdBy: req.user // middleware auth.js должен устанавливать req.user
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// 2. Получение всех проектов (READ)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// 3. Обновление проекта (UPDATE)
exports.updateProject = async (req, res) => {
  const { title, description, category } = req.body;

  // Валидация
  if (title && title.length < 3) {
    return res.status(400).json({ message: "Название слишком короткое" });
  }
  if (description && description.length < 5) {
    return res.status(400).json({ message: "Описание слишком короткое" });
  }

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

// 4. Удаление проекта (DELETE)
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Проект успешно удален" });
  } catch (err) {
    res.status(404).json({ message: "Проект не найден" });
  }
};
