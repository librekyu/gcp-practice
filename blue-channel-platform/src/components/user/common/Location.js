/**
 * 게시판 우측 상단 페지이 위지 정보
 * common/menu 기반이므로 해당 파일 수정시 유의
 * */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { mainMenus } from '../../../common/user/menu';
import { USER_CONST } from '../../../common/globalConst';

const Location = ({ depths = '' }) => {
  const [depthLabels, setDepthLabels] = useState([]);
  const router = useRouter();
  const path = router.pathname;

  const camelToSnake = (str) => str.replace(/(?:^|\.?)([A-Z])/g, (x, y) => `_${y.toLowerCase()}`)
    .replace(/^_/, '');

  useEffect(() => {
    const pathSubString = USER_CONST.BASE_ROUTER_PATH.split('/');
    const findIndex = pathSubString.length;
    const pathArray = path.split('/');
    const result = [];

    /** 메뉴의 1뎁스 키와 현재 페이지 url의 첫 인자값이 같을 경우 해당 키의 label 정보 입력 */
    const depth1 = mainMenus.find((menu) => menu.key[0].toLowerCase() === `menu_${camelToSnake(pathArray[findIndex])}`);
    depth1 && result.push(depth1.label);
    const depth2 = depth1 && depth1.nodes && depth1.nodes.find((childMenu) => path.includes(childMenu.link.toLowerCase()));
    depth2 && result.push(depth2.label);

    depths !== '' ? result.push(depths) : null;

    setDepthLabels(result);
  }, [path]);

  const locationResult = () => {
    const depthExpress = depthLabels.map((depthLabel, index) => {
      if (depthLabel && depthLabels.length !== index + 1) {
        return (<span key={index}>{depthLabel}&nbsp;>&nbsp;</span>);
      }
      return (<span key={index}>{depthLabel}</span>);
    });
    return depthExpress;
  };

  return (
    <div className="subLocation">
      <span key='home'>
        <Link href={USER_CONST.BASE_ROUTER_PATH}>
          <a>
            <img src={`${USER_CONST.BASE_IMAGE_PATH}/common/icon_home.png`} alt="" />
            &nbsp;홈
          </a>
        </Link>
        &nbsp;&gt;&nbsp;
      </span>
      {locationResult()}
    </div>
  );
};

export default Location;
