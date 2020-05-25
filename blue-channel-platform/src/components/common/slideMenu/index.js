import React, {memo, useCallback, useState, useRef, useEffect} from 'react';
import Slider from 'react-slick';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { USER_CONST } from '../../../common/globalConst';
import { initialState as noticeInitialState, USER_NOTICE_ACTION } from '../../../reducers/user/notice/notice';
import { NoticeList } from '../../../models/user/posts/Notice';

/**
 *
 * 공지사항 카테고리별 게시글 출력
 * @author ki
 * @categoryType '전체', '대기환경', '노후건물', '청소환경', 'CCTV', '스마트보안등'
 * @Reference REDUX_STORE userDeviceCommonCode - articleCategoryList
 *
 * */

const SlideMenu = memo(({ categoryType, slideType, className, style }) => {
  const dispatch = useDispatch();
  const { noticesList, totalCount, currentPageNumber } = useSelector((state) => state.userNotice);
  const { articleCategoryList } = useSelector((state) => state.userDeviceCommonCode);
  const index = articleCategoryList.findIndex((i => i.name === categoryType));
  const typeToCode = articleCategoryList[index];
  const [categoryCode, setCategoryCode] = useState('');


  useEffect(() => {
    if (typeToCode) {
      setCategoryCode(typeToCode.code);
    }
  }, [typeToCode, categoryType]);

  /** categoryType에 해당되는 공지사항 목록 조회 */
  useEffect(() => {
    if (categoryCode) {
      dispatch({
        type: USER_NOTICE_ACTION.USER_NOTICE_TYPE_LIST_REQUEST,
        data: {
          articleCategory: categoryCode,
        }
      });
    }
  }, [categoryCode]);

  /** categoryType에 해당되는 공지사항 목록 조회 data model에 전달하여 데이터 변형 */
  const menuList = noticesList instanceof NoticeList && noticesList.getNoticeListToArray() || (new NoticeList()).getNoticeListToArray();

  /** slide.js 세팅값 */
  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplaySpeed: 3000,
    beforeChange: function (currentSlide, nextSlide) {
    },
    afterChange: function (currentSlide) {
    },
  };

  const slider = useRef();

  /** model data html output 용으로 ReModel */
  const renderSlideMenuList = useCallback(() => (
    menuList.map((menu, index) => {
      return (
        <li
          key={index}
          className={'noticeText'}
          onClick={() => onClickToDetail(menu.articleId)}
        >
          <a>{menu.articleTitle}</a>
        </li>);
    })
  ), [menuList]);

  /** 출력되는 공지사항 게시글 클릭 이벤트 */
  const onClickToDetail = useCallback((articleId) => {
    Router.push({
      pathname: `${USER_CONST.BASE_ROUTER_PATH}/posts/notice/[detail]`,
    }, `${USER_CONST.BASE_ROUTER_PATH}/posts/notice/${articleId}`);
  },[]);

  /** 출력되는 공지사항 이전버튼 이벤트 */
  const toPreviousSlide = useCallback(() => {
    slider.current.slickPrev();
  }, []);

  /** 출력되는 공지사항 다음버튼 이벤트 */
  const toNextSlide = useCallback(() => {
    slider.current.slickNext();
  }, []);

  return (
    <ul className='noticeWrap'>
      <li className='noticeTit'><p>{slideType || '공지'}</p></li>
      <li className='noticeCont'>
        <ul>
          <Slider {...settings} ref={slider} >
            {renderSlideMenuList()}
          </Slider>
        </ul>

      </li>
      <li className='noticeBtWrap'>
        <ul className='noticeBtBox'>
          <li className='arrowUpBt'><a onClick={toPreviousSlide}><img src={`${USER_CONST.BASE_IMAGE_PATH}/common/noticeup.png`} alt=''/></a></li>
          <li className='arrowDownBt'><a onClick={toNextSlide}><img src={`${USER_CONST.BASE_IMAGE_PATH}/common/noticedown.png`} alt=''/></a>
          </li>
        </ul>
      </li>
    </ul>

  );
});

export default SlideMenu;
