import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface CatCardProps {
  cat: Cat;
}

const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useAuth();

  useEffect(() => {
    checkIfLiked();
  }, [cat.id]);

  const checkIfLiked = async () => {
    if (!authToken) return;
    
    try {
      const response = await fetch('http://localhost:8080/api/likes', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const liked = data.data.some((like: any) => like.cat_id === cat.id);
        setIsLiked(liked);
      }
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const toggleLike = async () => {
    if (!authToken) return;
    
    setIsLoading(true);
    try {
      if (isLiked) {
        // удалить из избранного
        const response = await fetch(`http://localhost:8080/api/likes/${cat.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        
        if (response.ok) {
          setIsLiked(false);
        }
      } else {
        // добавить
        const response = await fetch('http://localhost:8080/api/likes', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cat_id: cat.id }),
        });
        
        if (response.ok) {
          setIsLiked(true);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cat-card">
      <img src={cat.url} alt="Котик" className="cat-image" />
      <button
        onClick={toggleLike}
        disabled={isLoading}
        className={`like-button ${isLiked ? 'liked' : ''}`}
      >
        {isLiked ? '❤️' : '🤍'} {isLoading ? '...' : ''}
      </button>
    </div>
  );
};

export default CatCard; 