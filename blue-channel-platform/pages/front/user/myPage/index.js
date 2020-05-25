import React, { useCallback, useState, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Location from '../../../../src/components/user/common/Location';
import { Overlay } from '../../../../static/css/globalStyle';
import { USER_LOG_IN_ACTION } from '../../../../src/reducers/user/userInfo/login';
import { USER_CONST } from '../../../../src/common/globalConst';

const dummyPassword = 'admin';

const Index = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordCount, setPasswordCount] = useState(0);
  const [inputPassword, setInputPassword] = useState('');
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isLoggedIn } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!isLoggedIn) {
      Router.push({
        pathname: `${USER_CONST.BASE_ROUTER_PATH}/main`,
      });
    }
  }, [isLoggedIn]);

  /** 비밀번호 확인 */
  const changeInput = useCallback((e) => {
    setInputPassword(e.target.value);
  }, []);

  /** 비밀번호 확인 */
  const confirmPassword = useCallback((e) => {
    e.preventDefault();
    if (inputPassword === dummyPassword) {
      // Router.push(`${USER_CONST.BASE_ROUTER_PATH}/myPage/myInfoManage`);
      Router.push({
        pathname: `${USER_CONST.BASE_ROUTER_PATH}/myPage/myInfoManage`,
      });
    } else {
      setPasswordCount((prev) => prev + 1);
      setInputPassword('');
    }
  }, [inputPassword]);

  /** 로그아웃 */
  useEffect(() => {
    if (passwordCount === 5) {
      dispatch({
        type: USER_LOG_IN_ACTION.USER_LOG_OUT,
      });
    }

  }, [passwordCount]);

  /** 모달 창 닫기  */
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setInputPassword('');
  }, []);

  /**  */
  const handleClick = useCallback((index) => () => {
    switch (index) {
      case 0:
        Router.push(`${USER_CONST.BASE_ROUTER_PATH}/myPage/facilityAirQuality`);
        break;
      case 1:
        Router.push(`${USER_CONST.BASE_ROUTER_PATH}/myPage/gaonnuriAirQuality`);
        break;
      case 2:
        Router.push(`${USER_CONST.BASE_ROUTER_PATH}/myPage/decrepitBuildingMonitor`);
        break;
      // case 3:
      //   Router.push('/myPage');
      //   break;
      case 4:
        setIsModalOpen(true);
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      <div id="contents">
        <div className="subTop">
          <Location />
          <h3>마이페이지</h3>
        </div>
        <div className="content">
          <ul className="mypageMain">
            { userInfo.userType === 'care_dirct'
              ? <li className="col1"><a onClick={handleClick(0)}>운영시설 공기질 정보</a></li>
              : null }
            { userInfo.userType === '공유등록된학부모계정Typecode'
              ? <li className="col2"><a onClick={handleClick(1)}>가온누리어린이집 공기질 정보 <span>공유된 정보</span></a></li>
              : null }
            { userInfo.userType === '노후건물관리자Typecode'
              ? <li className="col3"><a onClick={handleClick(2)}>나의 노후건물 모니터링</a></li>
              : null }
            {/* <li className="col4"><a onClick={handleClick(3)}>중랑구 미세먼지 예보문자 서비스 <span>문자 수신하기</span></a></li> */}
            <li className="col5"><a onClick={handleClick(4)}>나의 정보관리</a></li>
          </ul>
        </div>
      </div>
      <div id="modal_pwdConfirm" className={`modalWrap small pwdConfirm ${isModalOpen ? 'active' : null}`}>
        <div className="modalTitle">
          <h4>비밀번호 확인</h4>
          <a id='btn_modalCloseNew' onClick={closeModal}>창닫기</a>
        </div>
        <form onSubmit={confirmPassword}>
          <div className="modalContent" tabIndex="0">
            <p>소중한 개인정보 보호를 위하여 <br />비밀번호를 입력해주세요.</p>
            <input
              className="w100p"
              style={{height: '50px'}}
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={inputPassword}
              name='password'
              onChange={changeInput}
            />
            {/*<p className="colorRed">비밀번호가 틀렸습니다. ({passwordCount}/5) <br />5회이상 비밀번호 입력시 로그아웃 됩니다.</p>*/}
          </div>
          <div className="btnArea">
            <input type="submit" className="w160 btn_xl black" value="확인"/>
          </div>
        </form>

      </div>
      <Overlay show={isModalOpen} />
    </>
  );
};

export default Index;
