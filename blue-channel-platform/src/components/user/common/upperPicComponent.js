import React from 'react';
import { mainMenus } from '../../../common/user/menu';
import { USER_CONST } from '../../../common/globalConst';
import GLOBAL_CONST from '../../../common/globalConstant';

const UpperPicComponent = ({ pageInfo }) => {
  let className = '';
  const pageArray = pageInfo.split('/');

  /**
   * example
   * 0/  1  /  2 /  3
   * /front/user/{3번째}
   * */
  let findIndex = 0;
  if (pageArray[pageArray.length - 1] === '') {
    findIndex = pageArray.length;
  } else {
    findIndex = pageArray.length - 1;
  }
  const menuKey = mainMenus
    .find((menu) => pageArray && pageArray[findIndex] && menu.key[0].replace(/_/g, '')
      .toLowerCase()
      .includes(pageArray[findIndex].toLowerCase()));

  console.log(mainMenus);
  console.log(pageArray[findIndex]);
  console.log(menuKey);
  if (menuKey) {
    className = menuKey.className;
  } else {
    switch (pageArray[2]) {
      case 'login': {
        className = 'login';
        break;
      }
      default: {
        break;
      }
    }
  }

  return (
    <>
      {(pageInfo && (pageInfo === USER_CONST.BASE_ROUTER_PATH)) || (pageInfo === `${USER_CONST.BASE_ROUTER_PATH}/`) || (pageInfo === `${USER_CONST.BASE_ROUTER_PATH}/main`)
        ? null
        : <div id='subVisual' className={className}>
          <div className='inner'>
            <p>
              <b>{GLOBAL_CONST.APP_NAME_NORMAL}</b>
            </p>
          </div>
        </div>}
    </>
  );
};

export default UpperPicComponent;
