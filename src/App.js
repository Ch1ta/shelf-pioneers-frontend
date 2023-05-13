import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { checkAuth } from './store/authSlice';

import Login from './Auth/Login';
import Register from './Auth/Register';
import AdminPanel from './AdminPanel';

import './App.scss';
import Home from './Home';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
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
  }

  if (isAdmin)
    return (
      <Routes>
        <Route path="/admin/:param" element={<AdminPanel />}></Route>
        <Route path="/*" element={<Navigate to={'/admin/programs'} />}></Route>
      </Routes>
    );

  return (
    <Routes>
      <Route path="/session" element={<Home />}></Route>
      <Route path="/session/:link" element={<Home />}></Route>
      <Route path="/*" element={<Navigate to={'/session'} />}></Route>
    </Routes>
  );
}

export default App;
