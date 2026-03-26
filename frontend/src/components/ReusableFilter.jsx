import React from 'react';

const ReusableFilter = ({ 
    searchTerm, setSearchTerm, 
    sortBy, setSortBy, 
    sortOptions = [] 
}) => {
  return (
    <div className="card-body bg-light border-bottom p-3">
      <div className="row g-3 justify-content-between align-items-center">
        <div className="col-md-5">
          <div className="input-group input-group-sm bg-white rounded-3 shadow-none border py-1">
            <span className="input-group-text border-0 bg-transparent ps-3"><i className="bi bi-search text-muted"></i></span>
            <input
              type="text"
              className="form-control border-0 bg-transparent text-dark shadow-none"
              placeholder="Search by article title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group input-group-sm bg-white rounded-3 shadow-none border py-1 px-2">
            <span className="input-group-text border-0 bg-transparent"><i className="bi bi-calendar-range text-muted me-1"></i></span>
            <select 
              className="form-select border-0 bg-transparent text-dark shadow-none fw-medium"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableFilter;
