import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, selectAuth, clearError } from './authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateForm } from '../../utils/validation';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useSelector(selectAuth);

  useEffect(() => {
    if (user) navigate('/home');
    if (status === 'succeeded' && !user) {
      toast.success('Registration successful! Please sign in to continue.');
      navigate('/login');
    }
    if (error) {
      const msg = error === 'technical' ? 'A network error occurred. Please try again later.' : error;
      toast.error(msg);
      dispatch(clearError());
    }
  }, [user, status, error, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, 'signup');
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.warning('Check your details again. Some fields need your attention.');
      return;
    }
    dispatch(signupUser(formData));
  };

  return (
    <div className="row justify-content-center align-items-center mt-5">
      <div className="col-md-5 col-lg-4">
        <div className="card shadow rounded-4 overflow-hidden border-0">
          <div className="card-header bg-primary text-white text-center py-4 border-0">
            <h2 className="h4 fw-bold mb-0">Create Account</h2>
          </div>
          <div className="card-body p-4">
            <form onSubmit={onSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label small fw-bold text-dark">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><i className="bi bi-person text-muted"></i></span>
                  <input
                    type="text"
                    className={`form-control border-start-0 ps-0 ${errors.name ? 'is-invalid' : ''}`}
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    placeholder="E.g. John Doe"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label small fw-bold text-dark">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope text-muted"></i></span>
                  <input
                    type="email"
                    className={`form-control border-start-0 ps-0 ${errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="name@example.com"
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
                    placeholder="Min 6 characters"
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
              
              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={status === 'loading'}>
                {status === 'loading' ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          </div>
          <div className="card-footer bg-light text-center py-3 border-0">
            <p className="mb-0 small text-muted">
              Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
