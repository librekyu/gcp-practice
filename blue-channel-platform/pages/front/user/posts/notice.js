import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Location from '../../../../src/components/user/common/Location';
import Pagination from '../../../../src/components/common/jsmartPagination';
import TableComponent from '../../../../src/components/common/jsmartTable';
import { NoticeList } from '../../../../src/models/user/posts/Notice';
import JsmartSelect from '../../../../src/components/common/jsmartSelect';
import Util from '../../../../src/common/util';
import { useModalParam, usePage } from '../../../../src/common/customHooks';

/**
 * 공지사항 목록을 보여주는 페이지
 * */
const Notice = ({ pageProps, routerInfo }) => {
  const isInitPage = routerInfo.query.init || Object.entries(routerInfo.query).length === 0;
  const [searchFilter, setSearchFilter] = useState({});
  const [onChangePage] = usePage(isInitPage ? {} : routerInfo.query);

  /** input onchange handle */
  const handleChangeInputForm = useCallback((event) => {
    const { target } = event;
    const { value, name } = target;

    setSearchFilter((prev) => ({
      ...prev,
      // 전체면 빈 값
      [name]: value === 'all' ? '' : value
    }));
  }, []);

  /** 검색 버튼 클릭 */
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    Util.pushWithEncodedQuery(searchFilter);
  }, [searchFilter]);

  const fileDownload = useCallback((articleId, attachment) => {
  }, []);

  return (
    <>
      <div id='contents'>
        <div className="subTop">
          <Location/>
          <h3>공지사항</h3>
        </div>
        <div className='content'>
          <div className="searchBar">
            <form>
              <JsmartSelect
                options={[{
                  code: '',
                  name: '전체'
                }]}
                selectedValue={searchFilter.articleCategory}
                onChange={handleChangeInputForm}
                name='articleCategory'
              />
              <div className="pinLock">
                <input
                  type="text"
                  placeholder="제목 검색"
                  value={searchFilter.articleTitle}
                  name={'articleTitle'}
                  onChange={handleChangeInputForm}
                  className="w210"/>
                <input type="submit" value="검색" className="btn_m blue" onClick={handleSearch}/>
              </div>
            </form>
          </div>
          <TableComponent
            dataProps={(new NoticeList()).getMapToNoticeListData()}
            handleAttachmentClick={fileDownload}
            totalCount={1}
          />
          {
            <Pagination currentPage={parseInt(searchFilter.pageNumber)} totalCount={1} onChange={onChangePage}/>
          }

        </div>
      </div>
    </>
  );
};

Notice.getInitialProps = async (context) => {
};

export default Notice;
