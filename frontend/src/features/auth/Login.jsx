import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectAuth, clearError } from './authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateForm } from '../../utils/validation';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useSelector(selectAuth);

  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/home');
    }
    if (error) {
      const userFriendlyMsg = error.includes('Invalid') ? 'Invalid email or password. Please try again.' : 'A system error occurred. Please try again later.';
      toast.error(userFriendlyMsg);
      dispatch(clearError());
    }
  }, [user, navigate, error, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, 'login');
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.warning('Check your login details again. Something is missing.');
      return;
    }
    dispatch(loginUser(formData));
  };

  return (
    <div className="row justify-content-center align-items-center mt-5">
      <div className="col-md-5 col-lg-4">
        <div className="card shadow rounded-4 overflow-hidden border-0">
          <div className="card-header bg-dark text-white text-center py-4 border-0">
            <h2 className="h4 fw-bold mb-0">Sign In</h2>
          </div>
          <div className="card-body p-4">
            <form onSubmit={onSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label small fw-bold text-dark">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-envelope"></i></span>
                  <input
                    type="email"
                    className={`form-control border-start-0 ps-0 ${errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="E.g. name@example.com"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="form-label small fw-bold text-dark">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-lock"></i></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control border-start-0 border-end-0 ps-0 ${errors.password ? 'is-invalid' : ''}`}
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    placeholder="Enter password"
                  />
                  <span 
                    className="input-group-text bg-light border-start-0 cursor-pointer" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </span>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
              </div>
              
              <button type="submit" className="btn btn-dark w-100 py-2 fw-bold" disabled={status === 'loading'}>
                {status === 'loading' ? 'Signing In...' : 'Login'}
              </button>
            </form>
          </div>
          <div className="card-footer bg-light text-center py-3 border-0">
            <p className="mb-0 small text-muted">
              Don't have an account? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
