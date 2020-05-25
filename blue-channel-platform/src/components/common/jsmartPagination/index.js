import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Pagination = memo(({ currentPage, totalCount, onChange, pageSize = 10 }) => {
  const [totalPage, setTotalPage] = useState(1); // 총 페이지
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalCount) {
      return;
    }
    const tempTotalPage = Math.ceil(totalCount / pageSize);

    let tempStartPage;
    let tempEndPage;
    if (tempTotalPage <= 10) {
      tempStartPage = 1;
      tempEndPage = tempTotalPage;
    } else {
      if (currentPage <= 6) {
        tempStartPage = 1;
        tempEndPage = 10;
      } else if (currentPage + 4 >= tempTotalPage) {
        tempStartPage = tempTotalPage - 9;
        tempEndPage = tempTotalPage;
      } else {
        tempStartPage = currentPage - 5;
        tempEndPage = currentPage + 4;
      }
    }

    setTotalPage(tempTotalPage);
    setPages([...Array((tempEndPage + 1) - tempStartPage)
      .keys()].map((i) => tempStartPage + i));
  }, [currentPage, totalCount]);

  const onClickPage = useCallback((page) => () => {
    onChange(page);
  }, [onChange]);

  return (
    <>
      <div className="pagination pageCount">
        {totalPage === 1
          ? null
          : currentPage === 1
            ? <>
              <a className="btn_pagingFirst" style={{ cursor: 'not-allowed' }}>처음</a>
              <a className="btn_pagingPrev" style={{ cursor: 'not-allowed' }}>이전</a>
            </>
            : <>
              <a className="btn_pagingFirst" onClick={onClickPage(1)}>처음</a>
              <a className="btn_pagingPrev" onClick={onClickPage(currentPage - 1)}>이전</a>
            </>}
        {pages.map((page, index) => (currentPage === page)
          ? <span key={index} className="active">{page}</span>
          : <a key={index} onClick={onClickPage(page)}>{page}</a>)}
        {totalPage === 1
          ? null
          : currentPage === totalPage
            ? <>
              <a className="btn_pagingNext" style={{ cursor: 'not-allowed' }}>다음</a>
              <a className="btn_pagingLast" style={{ cursor: 'not-allowed' }}>마지막</a>
            </>
            : <>
              <a className="btn_pagingNext" onClick={onClickPage(currentPage + 1)}>다음</a>
              <a className="btn_pagingLast" onClick={onClickPage(totalPage)}>마지막</a>
            </>}
      </div>
    </>
  );
});

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  onChange: PropTypes.func
};

export default Pagination;
