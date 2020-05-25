import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { initialState, USER_INFO_ACTIONS } from '../../../src/reducers/user/userInfo/userInfo';
import CONST, { USER_CONST } from '../../../src/common/globalConst';

/**
 * 홈 화면.
 * */
const Main = (props) => {
  const { isLoggedIn } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: USER_INFO_ACTIONS.USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_REQUEST
    });
  }, [isLoggedIn]);

  return (
    <>
      <div className="mainSection section1">
        <div className="inner">
          <br/>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/receive/inputCash`}><a className="btn">Deposit</a></Link>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/receive/outputCash`}><a className="btn">Withdrawal</a></Link>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/receive/transfer`}><a className="btn">Bank Transfer</a></Link>
          <br/>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/give/payPrincipleNInterestForLoan`}><a className="btn">Loan Payment</a></Link>
          <br/>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/card/createCard`}><a className="btn">Card Application/New</a></Link>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/card/cardPay`}><a className="btn">Credit Card Payment</a></Link>
          <br/>
          <Link href={`${USER_CONST.BASE_ROUTER_PATH}/etc/utilityBill`}><a className="btn">Utility Bill Payment</a></Link>
        </div>
        {/*<div style={*/}
        {/*  {*/}
        {/*    position: 'absolute',*/}
        {/*    margin: '0% 35%',*/}
        {/*    top: '800px'*/}
        {/*  }}>*/}
        {/*  <img src={`${USER_CONST.BASE_IMAGE_PATH}/woori_bank.png`} style={{maxWidth: '270px'}} alt={''}/>&nbsp;&nbsp;&nbsp;&nbsp;*/}
        {/*  <img src={`${USER_CONST.BASE_IMAGE_PATH}/bluedawn_logo.png`} alt={''}/>*/}
        {/*</div>*/}
      </div>

    </>
  );
};

Main.getInitialProps = async (context) => {

};
export default Main;
