import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const activeClasses = 'bg-accent text-white border-accent';
  const defaultClasses = 'bg-card text-muted border-border hover:bg-[var(--bg-main)]';

  return (
    <div className="flex justify-center items-center py-4 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-md mx-1 disabled:opacity-50 ${defaultClasses}`}
      >
        <FiChevronLeft />
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 border rounded-md mx-1 ${currentPage === number ? activeClasses : defaultClasses}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
        className={`px-3 py-1 border rounded-md mx-1 disabled:opacity-50 ${defaultClasses}`}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;