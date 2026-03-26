import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './features/posts/Home';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import PostDetail from './features/posts/PostDetail';
import CreatePost from './features/posts/CreatePost';
import EditPost from './features/posts/EditPost';
import ProtectedRoute from './middleware/ProtectedRoute';
import PublicRoute from './middleware/PublicRoute';
import { useSelector } from 'react-redux';
import { selectAuth } from './features/auth/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RootRedirect = () => {
    const { user, token } = useSelector(selectAuth);
    if (user && token) {
        return <Navigate to="/home" replace />;
    }
    return <Navigate to="/signup" replace />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <div className="container mt-4">
        <Routes>
          {/* Main Redirect Route */}
          <Route path="/" element={<RootRedirect />} />

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Routes (Blog Listing & Actions) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
