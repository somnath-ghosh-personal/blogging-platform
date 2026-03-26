import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
    toast.info("Logged out successfully.");
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <i className="bi bi-journal-text text-primary me-2 fs-3"></i>
            <span className="ls-tight">BloggerHub</span>
          </Link>
          
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link py-2 px-3 fw-medium" to="/home">
                      <i className="bi bi-house-door me-1"></i> Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link py-2 px-3 fw-medium" to="/create">
                      <i className="bi bi-plus-circle me-1"></i> Create Post
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown ms-lg-3">
                    <button className="btn btn-outline-light btn-sm rounded-pill px-3 py-1 dropdown-toggle d-flex align-items-center" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
                      <div className="avatar-sm bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2" style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                        {user.name ? user.name[0].toUpperCase() : 'U'}
                      </div>
                      <span className="small fw-bold">{user.name}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2 rounded-3" aria-labelledby="userMenu">
                      <li><p className="dropdown-header text-muted border-bottom mb-2 pb-2">Account Settings</p></li>
                      <li>
                        <button className="dropdown-item d-flex align-items-center py-2 text-danger fw-bold rounded-2 transition-all" onClick={() => setShowLogoutModal(true)}>
                          <i className="bi bi-box-arrow-right me-2"></i> Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link px-3" to="/login">Sign In</NavLink>
                  </li>
                  <li className="nav-item ms-lg-2">
                    <NavLink className="btn btn-primary btn-sm px-4 rounded-pill fw-bold" to="/signup">Join Now</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-body p-4 text-center">
                <div className="icon-box mb-4 bg-danger bg-opacity-10 text-danger rounded-circle mx-auto d-inline-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                  <i className="bi bi-power fs-1"></i>
                </div>
                <h4 className="fw-bold text-dark mb-2">Final Step</h4>
                <p className="text-muted mb-4 small">Are you sure you want to end your session? You'll need to sign back in later.</p>
                <div className="row g-2">
                  <div className="col-12">
                    <button type="button" className="btn btn-danger w-100 py-2 fw-bold shadow-sm" onClick={handleLogout}>
                      Yes, Logout
                    </button>
                  </div>
                  <div className="col-12">
                     <button type="button" className="btn btn-light w-100 py-2 fw-medium border-0" onClick={() => setShowLogoutModal(false)}>
                      Not now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
