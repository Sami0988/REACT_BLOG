import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './components/Layout/Layout';
import Home from'./pages/Home';
import { useAuthStore } from './store/authStore';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import AdminDashboard from './pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';



function App() {
  const { initAuth } = useAuthStore();
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
    initAuth();
  }, [initAuth]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<PostDetail />} /> 
          <Route path="/create-post" element={<CreatePost />} /> 
          <Route path="/edit-post/:id" element={<EditPost />} />
           <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
       <ToastContainer autoClose={3000} />
    </Router>

  );
}

export default App;