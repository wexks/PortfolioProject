import { useState } from "react";

export default function Portfolio() {
  const items = [
    { id: 1, title: "Проект A", category: "Web" },
    { id: 2, title: "Проект B", category: "Design" },
    { id: 3, title: "Проект C", category: "Web" },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredItems = items
    .filter(item => category === "all" || item.category === category)
    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

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
            key={item.id}
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
