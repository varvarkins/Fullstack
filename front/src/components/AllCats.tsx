import React, { useState, useEffect } from 'react';
import CatCard from './CatCard';

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

const AllCats: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchCats = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=20&page=${page}`);
      const newCats = await response.json();
      setCats(prev => [...prev, ...newCats]);
    } catch (error) {
      console.error('Error fetching cats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, [page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="cats-container">
      <h2>Все котики</h2>
      <div className="cats-grid">
        {cats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
      {loading && <div className="loading">Загрузка котиков...</div>}
      <div className="load-more">
        <button onClick={handleLoadMore} disabled={loading}>
          Загрузить еще котиков
        </button>
      </div>
    </div>
  );
};

export default AllCats; 