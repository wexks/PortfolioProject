import Hero from '../components/Hero';

const infoData = [
  { id: 1, title: 'Мои навыки', text: 'React, JavaScript, HTML/CSS' },
  { id: 2, title: 'Проекты', text: 'Интернет-магазины, Портфолио' },
  { id: 3, title: 'Опыт', text: '2 года разработки интерфейсов' }
];

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="info-grid">
        {infoData.map(item => (
          <div key={item.id} className="info-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}