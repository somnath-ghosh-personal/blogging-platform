import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, selectPosts, resetCurrentPost } from './postsSlice';
import { fetchComments, selectComments, clearComments } from '../comments/commentsSlice';
import { selectAuth } from '../auth/authSlice';
import CommentForm from '../comments/CommentForm';
import CommentList from '../comments/CommentList';

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPost, status, error } = useSelector(selectPosts);
  const { comments } = useSelector(selectComments);
  const { user } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchPostById(id));
    dispatch(fetchComments(id));
    return () => {
      dispatch(resetCurrentPost());
      dispatch(clearComments());
    };
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/home" className="btn btn-secondary mt-2">Go back to home</Link>
      </div>
    );
  }

  if (!currentPost) return null;

  return (
    <div className="container py-4">
      <nav className="mb-4">
        <Link to="/home" className="btn btn-link link-secondary text-decoration-none ps-0">
          <i className="bi bi-arrow-left me-1"></i> Back to all posts
        </Link>
      </nav>
      
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <article className="card shadow-sm border-0 mb-5 overflow-hidden">
            <div className="card-header bg-white py-3 border-0">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge rounded-pill bg-light text-primary border px-3 py-2 small fw-bold">
                  <i className="bi bi-calendar-event me-2"></i>
                  {new Date(currentPost.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </span>
              </div>
              <h1 className="display-4 fw-bold text-dark mt-2 mb-4 truncate-title" title={currentPost.title}>
                {currentPost.title}
              </h1>
              
              <div className="d-flex align-items-center mb-4">
                 <div className="avatar-placeholder me-3 bg-primary text-white d-flex align-items-center justify-content-center rounded-circle fw-bold shadow-sm" style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}>
                    {currentPost.author ? currentPost.author.name[0].toUpperCase() : 'U'}
                 </div>
                 <div>
                    <h5 className="mb-0 fw-bold">{currentPost.author ? currentPost.author.name : 'Unknown Author'}</h5>
                    <p className="text-muted small mb-0">Author • Verified</p>
                 </div>
              </div>
            </div>
            
            <div className="card-body py-4 bg-light px-4 px-md-5">
              <div className="post-content fs-5 text-dark lh-base" style={{ whiteSpace: 'pre-wrap' }}>
                {currentPost.content}
              </div>
            </div>
          </article>

          <div className="comments-module border-top pt-5">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                 <CommentForm postId={id} />
                 <CommentList comments={comments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
