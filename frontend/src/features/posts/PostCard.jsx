import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const { title, content, author, createdAt, _id } = post;
  
  const previewContent = content.length > 120 ? content.substring(0, 120) + '...' : content;
  
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="card shadow-sm h-100 border-0">
      <div className="card-body">
        <div className="d-flex align-items-center gap-1 mb-2 small text-primary">
          <i className="bi bi-calendar"></i>
          <span>{formattedDate}</span>
        </div>
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-muted">{previewContent}</p>
      </div>
      
      <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center pb-3">
        <div className="d-flex align-items-center gap-1 small">
          <i className="bi bi-person text-muted"></i>
          <span>{author.name || 'Author Name'}</span>
        </div>
        <Link to={`/posts/${_id}`} className="btn btn-link link-primary p-0 text-decoration-none fw-bold small">
          Read More
          <i className="bi bi-arrow-right ms-1"></i>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
