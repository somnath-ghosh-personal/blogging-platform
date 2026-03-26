import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, selectPosts } from './postsSlice';
import PostForm from './PostForm';

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPost, status, error } = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPostById(id));
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
      <PostForm post={currentPost} isEdit={true} />
    </div>
  );
};

export default EditPost;
