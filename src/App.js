import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { checkAuth } from './store/userSlice';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './AdminPanel';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isLoading = useSelector((state) => state.user.isLoading);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('Access token ', localStorage.getItem('token'));
      dispatch(checkAuth());
    }
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuth) {
    return (
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/*" element={<Login />}></Route>
      </Routes>
    );
  } else {
    return <h1>Успешная авторизация</h1>;
  }

  if (isAdmin)
    return (
      <Routes>
        <Route path="/admin/:param" element={<AdminPanel />}></Route>
        <Route
          path="/*"
          element={<Navigate to={'/admin/programs'} />}
        ></Route>
      </Routes>
    );
}

export default App;
