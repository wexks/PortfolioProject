import { useState, useEffect } from "react";
import axios from "axios";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5001/api/projects");
    setProjects(res.data);
  };

  // ➕ ДОБАВИТЬ
  const handleAdd = async () => {
    if (!newTitle) return;

    await axios.post(
      "http://localhost:5001/api/projects",
      { title: newTitle, category: newCategory },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setNewTitle("");
    setNewCategory("");
    fetchProjects();
  };

  // ❌ УДАЛИТЬ
  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5001/api/projects/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchProjects();
  };

  // ✏️ НАЧАТЬ РЕДАКТИРОВАНИЕ
  const startEdit = (project) => {
    setEditingId(project._id);
    setEditTitle(project.title);
  };

  // 💾 СОХРАНИТЬ
  const handleUpdate = async (id) => {
    await axios.put(
      `http://localhost:5001/api/projects/${id}`,
      { title: editTitle },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setEditingId(null);
    fetchProjects();
  };

  const filteredItems = projects
    .filter(item => category === "all" || item.category === category)
    .filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <h2>Мои проекты</h2>

      {/* ➕ Добавление */}
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Название проекта"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          placeholder="Категория"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>

      {/* 🔍 Поиск */}
      <input
        type="text"
        placeholder="Поиск проекта"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📂 Фильтр */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setCategory("all")}>Все</button>
        <button onClick={() => setCategory("Web")}>Web</button>
        <button onClick={() => setCategory("Design")}>Design</button>
      </div>

      {/* 📃 Список */}
      <div>
        {filteredItems.map(item => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              margin: "5px",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {editingId === item._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(item._id)}>Сохранить</button>
              </>
            ) : (
              <>
                {item.title} — {item.category}
                <br />
                <button onClick={() => startEdit(item)}>Изменить</button>
                <button onClick={() => handleDelete(item._id)}>Удалить</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
