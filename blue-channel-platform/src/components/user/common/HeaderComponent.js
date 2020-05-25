import React, { useState, useCallback, memo, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import window from 'global';
import { useDispatch } from 'react-redux';
import { mainMenus } from '../../../common/user/menu';
import { USER_LOG_IN_ACTION } from '../../../reducers/user/userInfo/login';
import Util from '../../../common/util';
import { USER_CONST } from '../../../common/globalConst';
import GLOBAL_CONST from '../../../common/globalConstant';
import DUMMY from '../../../common/dummyConst';

// Hook
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.outerWidth : undefined,
      height: isClient ? window.outerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

/** 상단 Header */
const Header = memo(({ pageInfo, isLoggedIn, isOverlay, setIsOverlay }) => {
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState([]);
  const [gnbUseState, setGnbUseState] = useState('');
  // const [screenWidth, setScreenWidth] = useState(400);
  // const screenWidth = window.outerWidth; // 실제 화면 폭 사이즈
  const screenWidth = useWindowSize().width;
  const route = useRouter();
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setScreenWidth(window.outerWidth);
  //   }
  // }, [])
  /**
   * 로그인/로그아웃 인지를 구분하여 상단의 메뉴를 리턴.
   * */
  const findMenuByLoggedIn = useCallback((menu) => {
    if (!isLoggedIn && menu.key[0] === 'MENU_MY_PAGE') {
      return null;
    }
    return menu;
  }, [isLoggedIn]);

  /**
   * 메뉴에 해당하는 페이지의 path 링크를 달아준다.
   * */
  const toMenu = useCallback((event, menuInfo) => {
    event.preventDefault();
    if (!menuInfo.nodes) {
      setGnbUseState('');
      setIsOverlay(false);
      Router.push({
        pathname: `${USER_CONST.BASE_ROUTER_PATH}${menuInfo.link}`,
      });
      // window.postMessage('JSMART_REMOVE_EVENT');
    } else {
      if (screenWidth < 768) {
        const li = event.target.parentNode;
        Util.sibling(li)
          .map((v) => {
            v.classList.remove('active');
          });
        li.classList.add('active');
      }
    }
  }, []);

  /**
   * redux 로그아웃 요청
   * */
  const logOut = useCallback(() => {
    const catchMypage = 'myPage';
    const cathcResult = (route.pathname).indexOf(catchMypage);
    dispatch({
      type: USER_LOG_IN_ACTION.USER_LOG_OUT,
    });
    // 마이페이지 내에서 로그아웃시 main 으로 경로 푸쉬
    if (cathcResult !== -1) {
      Router.push({
        pathname: `${USER_CONST.BASE_ROUTER_PATH}/main`,
      });
    }
  }, [route.pathname]);

  /**
   * loggedIn에 따라 상단 메뉴에 로그인/로그아웃이 다르게 보임.
   * 로그인 상태면 마이페이지와 로그아웃 보이고 로그인 상태가 아니면 마이페이지가 보이지 않고 로그인이 보인다.
   * */
  const mainMenu = mainMenus
    .filter((args) => findMenuByLoggedIn(args))
    .map((menu) => {
      /** 웹에서 마우스 오버 이벤트 (모바일 x) */
      const handleOnMouseOver = (e) => {
        if (screenWidth > 768) {
          setMenuState((prev) => ({
            ...prev,
            [menu.key[0]]: 'hover'
          }));
        }
      };

      /** 웹에서 마우스 리브 이벤트 (모바일 x) */
      const handleOnMouseLeave = (e) => {
        if (screenWidth > 768) {
          setMenuState((prev) => ({
            ...prev,
            [menu.key[0]]: ''
          }));
        }
      };

      const handleOnClick = (e, childMenu) => {
        e.preventDefault();
        e.stopPropagation();
        setGnbUseState('');
        setIsOverlay(false);
        Router.push(`${USER_CONST.BASE_ROUTER_PATH}${childMenu.link}`);
        // window.postMessage('JSMART_REMOVE_EVENT');
      };

      const childMenus = menu.nodes && menu.nodes.map((childMenu) => {
        return (
          <li
            key={childMenu.key[0]}
            onClick={(e) => handleOnClick(e, childMenu)}
          >
            <a>{childMenu.label}</a>
          </li>);
      });

      let childMenu = <ul>{childMenus}</ul>;

      return (<li
        key={menu.key[0]}
        onClick={(e) => toMenu(e, menu)}
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
        className={menuState[menu.key[0]]}
        style={{ cursor: 'pointer' }}
      >
        <a>{menu.label}</a>
        {menu.nodes && childMenu}
      </li>);
    });

  const handleToggleButtonClick = useCallback(() => {

    setGnbUseState((prev) => {
      if (!prev) {
        setIsOverlay(true);
        return 'active';
      } else {
        setIsOverlay(false);
        return '';
      }
    });
  }, []);

  const handleClickJoin = useCallback(() => {
    setGnbUseState('');
    Util.pushWithEncodedQuery({ init: true }, `${USER_CONST.BASE_ROUTER_PATH}/account/join`);
    setIsOverlay(false);
  }, []);

  const handleClickLogin = useCallback(() => {
    setGnbUseState('');

    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/user/login`);
    setIsOverlay(false);
  }, []);

  const handleGoHome = useCallback(() => {
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    // window.postMessage('JSMART_REMOVE_EVENT');
  }, []);

  return (
    <>
      <div id="header">
        <div className="inner">
          <li>
            <h1>
              <a onClick={handleGoHome}>
                {GLOBAL_CONST.APP_NAME_NORMAL}
              </a>
            </h1>
          </li>
          <ul className="topNav">
            {!isLoggedIn
              ? <>
                {/* <li><a onClick={handleClickJoin}>회원가입</a></li> */}
                <li><a onClick={handleClickLogin}>Sign In</a></li>
              </>
              : <li><a onClick={logOut}>Agent (<b>{DUMMY.AGENT}</b>)</a></li>}
          </ul>
          <div id="gnb" className={gnbUseState}>
            <ul>
              {mainMenu}
            </ul>
            {screenWidth < 768
              ? <>
                <ul className='gnbUser'>
                  {!isLoggedIn
                    ? <>
                      <li><a onClick={handleClickJoin}>Sign Up</a></li>
                      <li><a onClick={handleClickLogin}>Sign In</a></li>
                    </>
                    : <li><a onClick={logOut}>Sign Out</a></li>}
                </ul>
                <a className='btn_gnbToggle' onClick={handleToggleButtonClick}>메뉴토글버튼</a>
              </>
              : null}
          </div>
        </div>
      </div>
    </>
  );
});

export default Header;
