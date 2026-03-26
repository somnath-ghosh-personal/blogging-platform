import React from 'react';

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-5 rounded-4 bg-light text-muted border-0 card shadow-sm mb-5">
        <i className="bi bi-chat-left-dots fs-1 mb-2 d-block opacity-25"></i>
        <span>No comments yet. Be the first to join the conversation!</span>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 mb-5 rounded-4 bg-white">
      <div className="card-header bg-white py-3 border-0 border-bottom mx-4 px-0">
        <h5 className="mb-0 fw-bold"><i className="bi bi-chat-right-text text-primary me-2"></i>{comments.length} Comments</h5>
      </div>
      <div className="card-body px-4 py-2">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item py-3 mb-3 border-bottom-0 bg-light rounded-3 px-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="fw-bold text-dark"><i className="bi bi-person-circle me-1 text-primary"></i>{comment.name}</span>
              <span className="small text-muted">{new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <p className="text-dark mb-0 fs-6">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
