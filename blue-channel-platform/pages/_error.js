import React, { useEffect } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../src/common/globalConst';

function Error() {

  useEffect(() => {
    setTimeout(() => {
      Router.push(USER_CONST.BASE_ROUTER_PATH + '/main');
    }, 2000);
  }, []);

  return (
    <div style={{position: 'fixed', top: '30%', left: '40%'}}>
      <h2>잘못된 접근</h2>
      <div className="contentBox">
        <div className="titleBar bordered">
          <h4>요청하신 페이지를 찾을 수 없습니다.</h4>
          <br/>
          <h4>자동으로 메인화면으로 이동합니다.</h4>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
