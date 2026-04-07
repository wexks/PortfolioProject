import { useState, useEffect } from "react";
import axios from "axios";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Поля для нового проекта
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState(""); // Новое поле!
  const [newCategory, setNewCategory] = useState("");

  // Поля для редактирования
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://https://portfolioproject-production-7c32.up.railway.app/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Ошибка при загрузке:", err);
    }
  };

  // ➕ ДОБАВИТЬ
  const handleAdd = async () => {
    if (!token) return alert("Войдите в систему!");
    
    try {
      await axios.post(
        "http://https://portfolioproject-production-7c32.up.railway.app/api/projects",
        { 
          title: newTitle, 
          description: newDescription, 
          category: newCategory 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Очистка полей
      setNewTitle("");
      setNewDescription("");
      setNewCategory("");
      fetchProjects();
    } catch (err) {
      // Выведет ошибку валидации от сервера (например, "Описание слишком короткое")
      alert(err.response?.data?.message || "Ошибка при добавлении");
    }
  };

  // ❌ УДАЛИТЬ
  const handleDelete = async (id) => {
    if (!window.confirm("Удалить проект?")) return;
    try {
      await axios.delete(`http://https://portfolioproject-production-7c32.up.railway.app/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (err) {
      alert("Ошибка при удалении");
    }
  };

  // ✏️ НАЧАТЬ РЕДАКТИРОВАНИЕ
  const startEdit = (project) => {
    setEditingId(project._id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditCategory(project.category);
  };

  // 💾 СОХРАНИТЬ
  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://https://portfolioproject-production-7c32.up.railway.app/api/projects/${id}`,
        { 
          title: editTitle, 
          description: editDescription, 
          category: editCategory 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || "Ошибка при обновлении");
    }
  };

  const filteredItems = projects.filter(item => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Мои проекты</h2>

      {/* ➕ Форма добавления */}
      <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input
          placeholder="Название (мин. 3 симв.)"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          placeholder="Описание (мин. 5 симв.)"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          placeholder="Категория"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAdd} style={{ backgroundColor: "#4CAF50", color: "white", cursor: "pointer" }}>
          Добавить проект
        </button>
      </div>

      <hr />

      {/* 🔍 Поиск и Фильтр */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={() => setCategory("all")}>Все</button>
        <button onClick={() => setCategory("Web")}>Web</button>
        <button onClick={() => setCategory("Design")}>Design</button>
      </div>

      {/* 📃 Список проектов */}
      <div style={{ display: "grid", gap: "15px" }}>
        {filteredItems.map(item => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9"
            }}
          >
            {editingId === item._id ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                <input value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
                <button onClick={() => handleUpdate(item._id)}>Сохранить</button>
                <button onClick={() => setEditingId(null)}>Отмена</button>
              </div>
            ) : (
              <>
                <h3>{item.title}</h3>
                <p><b>Категория:</b> {item.category}</p>
                <p>{item.description}</p>
                <button onClick={() => startEdit(item)}>Изменить</button>
                <button onClick={() => handleDelete(item._id)} style={{ color: "red", marginLeft: "10px" }}>Удалить</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
