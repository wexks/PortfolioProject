import { useState, useEffect } from "react";
import axios from "axios";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // загрузка проектов с backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Ошибка загрузки проектов", err);
    }
  };

  // фильтрация
  const filteredItems = projects
    .filter(item => category === "all" || item.category === category)
    .filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <h2>Мои проекты</h2>

      <input
        type="text"
        placeholder="Поиск проекта"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setCategory("all")}>Все</button>
        <button onClick={() => setCategory("Web")}>Web</button>
        <button onClick={() => setCategory("Design")}>Design</button>
      </div>

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
            {item.title} — {item.category}
          </div>
        ))}
      </div>
    </div>
  );
}
