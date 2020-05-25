import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import { useSelector } from 'react-redux';
import Util from '../../../../src/common/util';
import DUMMY from '../../../../src/common/dummyConst';

const CardPay = () => {

  const cardPayInfoMap = {
    cardNumber: {
      name: 'cardNumber',
      label: 'Card No.'
    },
    statementBalance: {
      name: 'statementBalance',
      label: 'Statement Balance'
    },
    currentBalance: {
      name: 'currentBalance',
      label: 'Current Balance'
    },
    payMoney: {
      name: 'payMoney',
      label: 'Payment Amount'
    },
    payMethod: {
      name: 'payMethod',
      label: 'Payment Option'
    },
    accountNumber: {
      name: 'accountNumber',
      label: 'Account No.'
    },
    agentName: {
      name: 'agentName',
    },
    agentOTP: {
      name: 'agentOTP',
      label: 'Agent OTP'
    },
    customerPIN: {
      name: 'customerPIN',
      label: 'Customer Approval Callback URL'
    }
  };

  const initialCardPayInfo = {
    cardNumber: '',
    statementBalance: 0,
    currentBalance: 0,
    payMoney: 0,
    payMethod: '',
    accountNumber: '',
    agentName: '',
    agentOTP: '',
    customerPIN: '',
  };

  const [phase, setPhase] = useState(0);
  const [cardPayInfo, setTransferInfo] = useState(initialCardPayInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [accountList, setAccountList] = useState(['1111-1234-5432', DUMMY.ACCOUNT_NUMBER]);
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    scrollTo(0,0);
  }, [phase]);

  const handleInputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setTransferInfo((prev) => ({
      ...prev,
      [name]: (name === cardPayInfoMap.statementBalance.name || name === cardPayInfoMap.currentBalance.name) ? Util.numberWithoutCommas(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(<>Credit card payment is in progress.</>);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 3000);
    }
  }, [cardPayInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setTransferInfo(initialCardPayInfo);
    setShowAccount(false);
  }, []);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setShowAccount(true);
  }, []);

  const renderAccountList = useCallback(() => {
    const options = accountList.map((account, index) => <option key={index} value={account}>{account}</option>);
    return (
      <select name={cardPayInfoMap.accountNumber.name} value={cardPayInfo.accountNumber} onChange={handleInputCashInfoChange}>
        {options}
      </select>
    );
  }, [accountList]);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if (!showAccount) {
      setTransferInfo((prev) => ({
        ...prev,
        cardNumber: DUMMY.CARD_NUMBER,
      }));
    }

    if (phase === 0 && showAccount) {
      setTransferInfo((prev) => ({
        ...prev,
        statementBalance: DUMMY.STATEMENT_BALANCE,
        currentBalance: DUMMY.CURRENT_BALANCE,
        payMethod: DUMMY.PAY_METHOD,
        accountNumber: DUMMY.ACCOUNT_NUMBER,
        agentName: '',
      }));
    }

    if (phase === 1) {
      setTransferInfo((prev) => ({
        ...prev,
        customerPIN: DUMMY.CLIENT_PIN,
        agentOTP: DUMMY.AGENT_OTP
      }));
    }
  }, [phase, showAccount]);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>Credit Card Payment</h3>
            {phase !== 2 &&
            <button
              className={'btn_l demo'}
              onClick={onClickDemo}>demo
            </button>
            }
          </div>
          <form>
            <br/>
            {phase === 0 ?
              <>
                <div className='tableBox'>
                  <table className='form'>
                    <colgroup>
                      <col style={{ width: '180px' }}/>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.cardNumber.label}
                      </th>
                      <td>
                        <input type='text' name={cardPayInfoMap.cardNumber.name} value={cardPayInfo.cardNumber}
                               onChange={handleInputCashInfoChange}
                               className='w50p'
                        />&nbsp;&nbsp;
                        <button onClick={handleShow} className='btn_l on'>Submit</button>
                      </td>
                    </tr>
                    {showAccount && <>
                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.statementBalance.label}
                        </th>
                        <td><input type='text' name={cardPayInfoMap.statementBalance.name} readOnly={true}
                                   value={Util.numberWithCommas(cardPayInfo.statementBalance)}
                                   onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                          {/*<span className='explanEx'>VND</span>*/}
                        </td>
                      </tr>

                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.currentBalance.label}</th>
                        <td><input type='text' name={cardPayInfoMap.currentBalance.name} readOnly={true}
                                   value={Util.numberWithCommas(cardPayInfo.currentBalance)}
                                   onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>{cardPayInfoMap.payMoney.label}</th>
                        <td><input type='text' name={cardPayInfoMap.payMoney.name}
                                   value={cardPayInfo.payMoney}
                                   onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                          {/*<span className='explanEx'>VND</span>*/}
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.payMethod.label}</th>
                        <td><select name={cardPayInfoMap.payMethod.name}
                                    value={cardPayInfo.payMethod}
                                    onChange={handleInputCashInfoChange} className='w50p'>
                          <option value={''}>Payment Option</option>
                          <option value={'account'}>Account</option>
                          <option value={'cash'}>Cash</option>
                        </select>
                        </td>
                      </tr>
                      {cardPayInfo.payMethod === 'account' &&
                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.accountNumber.label}</th>
                        <td>{renderAccountList()}</td>
                      </tr>
                      }
                      <tr>
                        <th scope='row'>Agent</th>
                        <td><b>{DUMMY.AGENT}</b></td>
                      </tr>
                    </>}

                    </tbody>
                  </table>
                </div>
              </>
              :
              phase === 1 ?
                <div className='tableBox'>
                  <table className='form'>
                    <colgroup>
                      <col style={{ width: '180px' }}/>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={cardPayInfoMap.agentOTP.name} value={cardPayInfo.agentOTP}
                               onChange={handleInputCashInfoChange}
                               className='w50p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{cardPayInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={cardPayInfoMap.customerPIN.name} value={cardPayInfo.customerPIN}
                                 onChange={handleInputCashInfoChange} className='w50p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <text>Credit card payment has been completed.</text>

            }

            {phase !== 2 ?
              <>
                <div className='btnArea'>
                  <button onClick={handleSubmit} className='btn_l on'>Next</button>
                  &nbsp;
                  <button onClick={handleCancel} className='btn_l'>Cancel</button>
                </div>
              </>
              :
              <div className='btnArea'>
                <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Print Payment Result</button>&nbsp;
                <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Send Payment Result To SMS</button>&nbsp;
                <button onClick={handleCancel} className='btn_l'>To Main</button>
              </div>
            }
          </form>
        </div>
      </div>
      <Loading isLoading={showLoading} label={loadingStatement}/>
    </>
  );
};

export default CardPay;
