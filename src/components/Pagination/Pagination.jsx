import React from "react";
import PropTypes from "prop-types";

import "./Pagination.css";

const Pagination = ({ countPerPage, totalCount, currentPage, onChange }) => {
  const pageNumbers = [];
  console.log("currentPage", currentPage);
  for (let page = 1; page <= Math.ceil(totalCount / countPerPage); page++) {
    pageNumbers.push(
      <li
        key={page}
        className={`page-num ${currentPage === page ? "active" : ""}`}
        onClick={onChange}
        id={page}
      >
        {page}
      </li>
    );
  }
  return <ul className="pagination-cont">{pageNumbers}</ul>;
};

Pagination.propTypes = {
  countPerPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  onChange: () => {},
};

export default Pagination;
