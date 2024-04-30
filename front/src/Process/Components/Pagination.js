import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;