import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login user={userInfo} />} />
        <Route path='/register' element={<Register user={userInfo} />} />
        <Route
          path='/'
          element={
            <ProtectedRoute userInfo={userInfo}>
              <Home user={userInfo} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
