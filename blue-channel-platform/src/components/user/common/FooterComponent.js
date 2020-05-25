import React, { useCallback } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../common/globalConst';
import window from 'global';
import GLOBAL_CONST from '../../../common/globalConstant';

/** 하단 Footer */
const Footer = () => {
  const handleGoHome = useCallback(() => {
    window.postMessage('JSMART_REMOVE_EVENT');
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
  }, []);

  return (
    <>
      <div id="footer">
        <div className='inner'>
          <li>
            <a
              onClick={handleGoHome}
              className="footerLogo">
              <img src={`${USER_CONST.BASE_IMAGE_PATH}/common/logo_footer.png`}
                   style={{width:'200px'}}
                   alt={"푸른새벽 " + GLOBAL_CONST.APP_NAME_NORMAL} />
            </a>
          </li>
          <p className='footerCopyright'>
            [07238] 서울 영등포구 은행로 29 정우빌딩 716호 푸른새벽<br />
            TEL : 010-9451-1110 <br />
            Copyright ©2020 All rights reserved Bluedawn
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
