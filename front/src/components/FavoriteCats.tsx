import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CatCard from './CatCard';

interface Like {
  id: number;
  cat_id: string;
  created_at: string;
}

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

const FavoriteCats: React.FC = () => {
  const [likedCats, setLikedCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();

  useEffect(() => {
    fetchLikedCats();
  }, []);

  const fetchLikedCats = async () => {
    if (!authToken) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/likes', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const likes: Like[] = data.data;
        
        // Получаем данные о котиках из The Cat API
        const catsData = await Promise.all(
          likes.map(async (like) => {
            try {
              const catResponse = await fetch(`https://api.thecatapi.com/v1/images/${like.cat_id}`);
              if (catResponse.ok) {
                return await catResponse.json();
              }
            } catch (error) {
              console.error(`Error fetching cat ${like.cat_id}:`, error);
            }
            return null;
          })
        );
        
        const validCats = catsData.filter(cat => cat !== null);
        setLikedCats(validCats);
      }
    } catch (error) {
      console.error('Error fetching liked cats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Загрузка избранных котиков...</div>;
  }

  return (
    <div className="cats-container">
      <h2>Любимые котики</h2>
      {likedCats.length === 0 ? (
        <div className="no-cats">
          <p>У вас пока нет любимых котиков</p>
          <p>Добавьте котиков в избранное на главной странице!</p>
        </div>
      ) : (
        <div className="cats-grid">
          {likedCats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCats; 