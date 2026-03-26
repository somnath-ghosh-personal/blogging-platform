import React from 'react';

const ReusableTable = ({ headers, data, renderRow, emptyMessage }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0 align-middle">
        <thead className="table-light">
          <tr className="small text-uppercase text-secondary">
            {headers.map((header, index) => (
              <th key={index} className={header.className} style={header.style}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center py-5 text-muted">
                <div className="mb-2 opacity-25"><i className="bi bi-folder2-open fs-1"></i></div>
                <span className="small fw-medium">{emptyMessage || 'No data available'}</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
