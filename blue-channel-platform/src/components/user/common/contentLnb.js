/**
 * 일반 화면 좌측 메뉴들
 * common/menu 기반이므로 해당 파일 수정시 유의
 * dong 페이지만 예외처리
 * */
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { mainMenus } from '../../../common/user/menu';
import CONST, { USER_CONST } from '../../../common/globalConst';
import MapLegend from '../svgmap/mapLegend';

const ContentLnb = () => {
  const [mainMenu, setMainMenu] = useState('');
  const [liList, setLiList] = useState([]);
  // 좌측 LnbMenu 포함 여부. dong 페이지는 예외
  const [hasLnbMenu, setHasLnbMenu] = useState(true);
  const router = useRouter();

  const camelToSnake = (str) => str && str.replace(/(?:^|\.?)([A-Z])/g, (x, y) => `_${y.toLowerCase()}`)
    .replace(/^_/, '');

  useEffect(() => {
    const path = router.pathname;
    if (path.includes('dong')) {
      setHasLnbMenu(false);
      return;
    } else if(path.includes('account/selfCertification')) {
      setHasLnbMenu(false);
      return;
    }
    setHasLnbMenu(true);


    const pathSubString = USER_CONST.BASE_ROUTER_PATH.toString()
      .split('/');
    const findIndex = pathSubString.length;
    const pathArray = path.split('/');
    const liLists = [];

    /** 메뉴의 1뎁스 키와 현재 페이지 url의 첫 인자값이 같을 경우 해당 키의 label 정보 입력 */
    const depth1 = mainMenus.find((menu) => menu.key[0].toLowerCase() === `menu_${camelToSnake(pathArray[findIndex])}`);

    depth1 && setMainMenu(depth1.label);

    depth1 && depth1.nodes
      ? depth1.nodes.map((childMenu, index) => {
        if (childMenu.link.toLowerCase()
          .includes(pathArray[pathArray.length - 1].toLowerCase())) {
          liLists.push(<li key={index} className='active'><Link
            href={`${USER_CONST.BASE_ROUTER_PATH}${childMenu.link}`}><a>{childMenu.label}</a></Link></li>);
        } else {
          liLists.push(<li key={index}><Link
            href={`${USER_CONST.BASE_ROUTER_PATH}${childMenu.link}`}><a>{childMenu.label}</a></Link></li>);
        }
      }) : depth1 && liLists.push(<li key='onlyOne' className='active'><Link
      href={`${USER_CONST.BASE_ROUTER_PATH}${depth1.link}`}><a>{depth1.label}</a></Link>
    </li>);

    setLiList(liLists);
  }, [router.pathname]);

  return (
    <>
      {
        hasLnbMenu
          ? <div id="lnb">
            <h2>{mainMenu}</h2>
            <ul className={`cols${liList.length}`}>
              {liList}
            </ul>
          </div>
          : null
      }
    </>
  );
};

export default ContentLnb;
