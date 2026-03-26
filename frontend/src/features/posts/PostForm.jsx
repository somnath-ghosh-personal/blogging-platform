import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, selectPosts, clearPostError, clearPostSuccess } from './postsSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateForm } from '../../utils/validation';

const PostForm = ({ post, isEdit = false }) => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, success } = useSelector(selectPosts);

  useEffect(() => {
    if (post && isEdit) setFormData({ title: post.title, content: post.content });
  }, [post, isEdit]);

  useEffect(() => {
    if (success) {
      toast.success(isEdit ? 'Post updated successfully!' : 'New post published!', {
        toastId: 'post-success'
      });
      dispatch(clearPostSuccess());
      navigate('/home');
    }
    if (error) {
      toast.error(error.includes('authorized') ? 'You are not authorized to edit this post.' : 'Something went wrong. Please try again.', {
        toastId: 'post-error'
      });
      dispatch(clearPostError());
    }
  }, [success, error, isEdit, dispatch, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, 'post');
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        toast.warning('Check your article details. Both title and content are needed.');
        return;
    }
    if (isEdit) dispatch(updatePost({ id: post._id, postData: formData }));
    else dispatch(createPost(formData));
  };

  return (
    <div className="card shadow border-0 col-md-8 mx-auto p-4 rounded-4 mt-4">
      <div className="card-header bg-white border-0 text-center py-3">
        <h2 className="fw-bold text-dark">{isEdit ? 'Update Your Story' : 'Share a New Story'}</h2>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-bold small text-muted">Post Title</label>
            <input 
                type="text" 
                className={`form-control ${errors.title ? 'is-invalid' : ''}`} 
                name="title" 
                value={formData.title} 
                onChange={onChange} 
                placeholder="E.g. The Future of AI"
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold small text-muted">Content</label>
            <textarea 
                className={`form-control ${errors.content ? 'is-invalid' : ''}`} 
                name="content" 
                value={formData.content} 
                onChange={onChange} 
                rows={10} 
                placeholder="Write your story here..."
            />
            {errors.content && <div className="invalid-feedback">{errors.content}</div>}
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary px-4 fw-bold shadow-sm" disabled={status === 'loading'}>
              {status === 'loading' ? 'Saving...' : (isEdit ? 'Update Post' : 'Publish Post')}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="btn btn-outline-secondary px-4 fw-bold shadow-sm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
