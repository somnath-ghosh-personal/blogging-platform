import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts, deletePost, clearPostSuccess } from './postsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReusableTable from '../../components/ReusableTable';
import ReusableFilter from '../../components/ReusableFilter';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, status, error, success } = useSelector(selectPosts);
  const { user } = useSelector((state) => state.auth);
  

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const debounceTimer = useRef(null);

  // Debounced 
  const fetchData = useCallback((params) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      dispatch(fetchPosts(params));
    }, 400); 
  }, [dispatch]);

  // Refetch when search term or sort order changes
  useEffect(() => {
    const params = {
      search: searchTerm,
      sortBy: sortBy
    };
    fetchData(params);
    
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchTerm, sortBy, fetchData]);

  useEffect(() => {
    if (success === 'Post deleted successfully') {
       toast.success(success);
       dispatch(clearPostSuccess());
    }
  }, [success, dispatch]);

  const openDeleteModal = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setPostToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      dispatch(deletePost(postToDelete._id));
      closeDeleteModal();
    }
  };

  const tableHeaders = [
    { label: '#', className: 'px-4 py-3', style: { width: '60px' } },
    { label: 'Title', className: 'py-3' },
    { label: 'Author', className: 'py-3' },
    { label: 'Posted On', className: 'py-3' },
    { label: 'Actions', className: 'py-3 text-end px-4' },
  ];

  const renderRow = (post, index) => (
    <tr key={post._id} className="border-bottom-0">
      <td className="px-4 text-muted small">{index + 1}</td>
      <td className="fw-bold text-dark">
        <div className="text-truncate" style={{ maxWidth: '300px' }} title={post.title}>
          {post.title}
        </div>
      </td>
      <td>
          <span className="badge rounded-pill bg-white text-primary border px-3 py-2 fw-semibold shadow-sm">
              <i className="bi bi-person-fill me-1"></i> {post.author ? post.author.name : 'Unknown Author'}
          </span>
      </td>
      <td className="text-secondary small">
        {new Date(post.createdAt).toLocaleDateString()}
      </td>
      <td className="text-end px-4">
        <div className="btn-group shadow-sm rounded-3 overflow-hidden">
          <Link to={`/posts/${post._id}`} className="btn btn-white btn-sm border-end px-3" title="View Article">
            <i className="bi bi-eye-fill text-muted"></i>
          </Link>
          {user && post.author?._id === user._id && (
            <>
              <Link to={`/edit/${post._id}`} className="btn btn-white btn-sm border-end px-3" title="Edit Article">
                <i className="bi bi-pencil-fill text-warning"></i>
              </Link>
              <button className="btn btn-white btn-sm px-3" onClick={() => openDeleteModal(post)} title="Remove Article">
                <i className="bi bi-trash3-fill text-danger"></i>
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h1 className="h3 mb-0 fw-bold text-dark">Blog Directory</h1>
          <p className="text-muted small mb-0">Discover and manage community insights</p>
        </div>
      </div>

      {error && <div className="alert alert-danger px-3 py-2 small border-0 shadow-sm mb-4">{error}</div>}

      <div className="card shadow-sm mb-4 border-0 rounded-4 overflow-hidden">
        <ReusableFilter 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          sortOptions={[
            { label: 'Newest First', value: 'date-desc' },
            { label: 'Oldest First', value: 'date-asc' },
          ]}
        />

        <ReusableTable 
           headers={tableHeaders} 
           data={posts} 
           renderRow={renderRow} 
           emptyMessage="No articles match your search criteria" 
        />
      </div>
      
      {status === 'loading' && (
        <div className="d-flex justify-content-center py-5">
           <div className="spinner-grow text-primary spinner-grow-sm me-2" role="status"></div>
           <div className="spinner-grow text-primary spinner-grow-sm me-2" role="status"></div>
           <div className="spinner-grow text-primary spinner-grow-sm" role="status"></div>
        </div>
      )}

      {/* Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-body p-4 text-center">
                <div className="bg-danger bg-opacity-10 text-danger rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                   <i className="bi bi-exclamation-triangle fs-2"></i>
                </div>
                <h5 className="fw-bold mb-2">Delete Article?</h5>
                <p className="text-muted small mb-4">
                  You are about to remove <strong className="d-block text-truncate mt-1 mx-auto" style={{ maxWidth: '200px' }} title={postToDelete?.title}>"{postToDelete?.title}"</strong>. 
                  This action is permanent and cannot be undone.
                </p>
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn-danger py-2 fw-bold" onClick={confirmDelete}>Confirm Delete</button>
                  <button type="button" className="btn btn-light py-2 fw-semibold" onClick={closeDeleteModal}>Keep Article</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
