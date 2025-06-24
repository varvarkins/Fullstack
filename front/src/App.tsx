import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AllCats from './components/AllCats';
import FavoriteCats from './components/FavoriteCats';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [authToken]);

  const login = async (login: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.ok) {
        const token = response.headers.get('X-Auth-Token');
        const userData = await response.json();
        setAuthToken(token);
        setUser(userData);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  if (!authToken) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Войти в кошачий пинтерест</h2>
          <LoginForm onLogin={login} />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ authToken, user, logout }}>
      <Router>
        <div className="app">
          <header className="header">
            <h1>🐱 Кошачий пинтерест</h1>
            <nav className="nav">
              <Link to="/" className="nav-link">Все котики</Link>
              <Link to="/favorites" className="nav-link">Любимые котики</Link>
              <button onClick={logout} className="logout-btn">Выйти</button>
            </nav>
          </header>
          
          <main className="main">
            <Routes>
              <Route path="/" element={<AllCats />} />
              <Route path="/favorites" element={<FavoriteCats />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

function LoginForm({ onLogin }: { onLogin: (login: string, password: string) => Promise<{ success: boolean; error?: string }> }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await onLogin(login, password);
    if (!result.success) {
      setError(result.error || 'Ошибка входа');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form-content">
      <div className="form-group">
        <label htmlFor="login">Логин:</label>
        <input
          type="text"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
}

export default App;
