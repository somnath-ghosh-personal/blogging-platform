import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, selectComments } from './commentsSlice';

const CommentForm = ({ postId }) => {
  const [formData, setFormData] = useState({ name: '', content: '' });
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectComments);
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (user) setFormData((prev) => ({ ...prev, name: user.name }));
  }, [user]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ postId, commentData: formData }));
    setFormData((prev) => ({ ...prev, content: '' }));
  };

  return (
    <div className="card shadow-sm mb-4 border-0 p-3 bg-light rounded-4">
      <div className="card-body">
        <h5 className="fw-bold mb-3"><i className="bi bi-chat-dots text-primary me-2"></i>Post a Comment</h5>
        {error && <div className="alert alert-danger px-3 py-2 small">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="row g-2 mb-3">
            <div className="col-md-5">
              <input type="text" className="form-control form-control-sm" name="name" value={formData.name} onChange={onChange} readOnly={!!user} placeholder="Your Name" required />
            </div>
          </div>
          <div className="mb-3">
             <textarea className="form-control form-control-sm" name="content" value={formData.content} onChange={onChange} placeholder="Write your thoughts..." rows={2} required />
          </div>
          <button type="submit" className="btn btn-primary btn-sm px-4 fw-bold" disabled={status === 'loading'}>
            {status === 'loading' ? 'Posting...' : 'Send Comment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
