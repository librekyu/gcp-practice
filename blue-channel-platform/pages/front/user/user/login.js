import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { USER_LOG_IN_ACTION } from '../../../../src/reducers/user/userInfo/login';
import { USER_CONST } from '../../../../src/common/globalConst';
import GLOBAL_CONST from '../../../../src/common/globalConstant';

/**
 * 로그인 페이지
 * */
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn, loginErrorMessage, isLoginError } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch({
      type: USER_LOG_IN_ACTION.USER_LOG_IN_INIT
    });
  }, []);

  /**
   *  로그인 실행
   *  */
  const handleLogin = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: USER_LOG_IN_ACTION.USER_LOG_IN_REQUEST,
      data: {
        userId,
        password
      }
    });
  }, [userId, password]);

  useEffect(() => {
    // if (isLoggedIn) {
    //   // alert('이미 로그인 된 상태 입니다.');
    //   Router.push({
    //     pathname: `${USER_CONST.BASE_ROUTER_PATH}/main`,
    //   });
    // }
  }, []);

  useEffect(() => {
    if (!isLoginError && isLoggedIn) {
      // alert('로그인에 성공 하였습니다.');
      !router.query.redirect
        ? Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`)
        : Router.push(router.query.pathname);
    }
  }, [isLoggedIn, isLoginError]);

  const handleChangeUserId = useCallback((event) => {
    setUserId(event.target.value);
  }, []);

  const handleChangePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  return (
    <div className="inner">
      <div id="contents" className="noLnb">
        <div className="subTop">
          <h3></h3>
          <p></p>
        </div>
        <div className="loginForm">
          <form onSubmit={handleLogin}>
            <ul className='loginForm'>
              <li>
                <input
                  type="text"
                  value={userId}
                  placeholder="Telephone Number"
                  onChange={handleChangeUserId}
                />
              </li>
              <li>
                <input
                  type="password"
                  value={password}
                  placeholder="OTP"
                  onChange={handleChangePassword}
                />
              </li>
              <li>
                <input
                  className='btn_login'
                  value='Login'
                  type='submit'
                  onClick={handleLogin}
                />
              </li>
            </ul>
          </form>

        </div>

        {/*<div className="btnArea">*/}
        {/*  <p className="loginMent">*/}
        {/*    {*/}
        {/*      loginErrorMessage !== '' ? <span className="red">{loginErrorMessage}</span> : null*/}
        {/*    }*/}
        {/*  </p>*/}
        {/*  <br/>*/}
        {/*  <a*/}
        {/*    className="btn_l btn-join" >*/}
        {/*    Sign Up*/}
        {/*  </a>*/}
        {/*  <a*/}
        {/*    className="btn_l btn-findId" >*/}
        {/*    Find ID*/}
        {/*  </a>*/}
        {/*  <a className="btn_l btn-findPw" >*/}
        {/*    Find P/W*/}
        {/*  </a>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default Login;
