import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import { useSelector } from 'react-redux';
import Util from '../../../../src/common/util';
import DUMMY from '../../../../src/common/dummyConst';
import { EXCHANGE_RATE } from '../../../../src/common/globalConstant';

const OtherSend = () => {

  const OtherSendInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Mobile Phone Number'
    },
    accountNumber: {
      name: 'accountNumber',
      label: '계좌 번호'
    },
    inputCash: {
      name: 'inputCash',
      label: '입금액'
    },
    balance: {
      name: 'balance',
      label: '잔액'
    },
    outputCash: {
      name: 'outputCash',
      label: '출금액'
    },
    charge: {
      name: 'charge',
      label: '수수료'
    },
    sum: {
      name: 'sum',
      label: '합계'
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

  const initialInputCashInfo = {
    mobileNumber: '',
    accountNumber: '',
    inputCash: '',
    inputCashVND: 0,
    charge: DUMMY.CHARGE,
    sum: '',
    agentName: DUMMY.AGENT,
    agentOTP: '',
    customerPIN: '',
    balance: '',
    outputCash: 0,
  };

  const [phase, setPhase] = useState(0);
  const [inputCashInfo, setInputCashInfo] = useState(initialInputCashInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');

  useEffect(() => {
    scrollTo(0,0);
  }, [phase]);

  const handleInputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setInputCashInfo((prev) => ({
      ...prev,
      [name]: (name === OtherSendInfoMap.inputCash.name || name === OtherSendInfoMap.charge.name || name === OtherSendInfoMap.sum.name || name === OtherSendInfoMap.outputCash.name) ? Util.numberWithoutCommas(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(<>{inputCashInfo.mobileNumber} 님 계좌에서<br/>Agent ({inputCashInfo.agentName})의 계좌로 이체중입니다.</>);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 3000);
    }
  }, [inputCashInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setInputCashInfo(initialInputCashInfo);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if (phase === 0) {
      setInputCashInfo((prev) => ({
        ...prev,
        mobileNumber: DUMMY.PHONE_NUMBER,
        accountNumber: DUMMY.ACCOUNT_NUMBER,
        inputCash: DUMMY.SEND_INPUT_MONEY,
        outputCash: DUMMY.SEND_OUTPUT_MONEY,
      }));
    }

    phase === 1 && setInputCashInfo((prev) => ({
      ...prev,
      agentOTP: DUMMY.AGENT_OTP,
      customerPIN: DUMMY.CLIENT_PIN,
    }));
  }, [phase]);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>타발 송금 지급</h3>
            {phase !==2 &&
            <button
              className={'btn_l demo'}
              onClick={onClickDemo}>demo
            </button>
            }
          </div>
          <form>
            {
              phase !== 2
              && <div className='joinFormTitle'>
                <p className='explanRequire'>
                  <span className='required' style={requireStyle}>*</span>&nbsp;가 표시된 필수 입력 항목입니다.
                </p>
                <br/><br/>
                <h3>송금 정보</h3>
              </div>
            }

            <br/>
            {phase === 0 ?
              <div className='tableBox'>
                <table className='form'>
                  <colgroup>
                    <col style={{ width: '180px' }}/>
                  </colgroup>
                  <tbody>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.mobileNumber.label}
                    </th>
                    <td>
                      <input type='text' name={OtherSendInfoMap.mobileNumber.name} value={inputCashInfo.mobileNumber}
                             onChange={handleInputCashInfoChange}
                             className='w50p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.accountNumber.label}</th>
                    <td><input type='text' name={OtherSendInfoMap.accountNumber.name} value={inputCashInfo.accountNumber}
                               onChange={handleInputCashInfoChange} className='w50p'/></td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.inputCash.label}</th>
                    <td><div><input type='text' name={OtherSendInfoMap.inputCash.name} value={Util.numberWithCommas(inputCashInfo.inputCash)}
                                    onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;<b>USD</b>&nbsp;&nbsp;
                      <span className='explanEx'>Only Digit</span></div>
                      <br/>
                      <div/>
                      <input
                        readOnly={true}
                        type='text' name={OtherSendInfoMap.inputCash.name + 'VND'}
                        value={Util.numberWithCommas(parseInt(inputCashInfo.inputCash * EXCHANGE_RATE.USD_TO_VND))}
                        onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;<b>d</b>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'>{OtherSendInfoMap.balance.label}</th>
                    <td><input
                      readOnly={true} type='text' name={OtherSendInfoMap.balance.name}
                               value={Util.numberWithCommas(parseInt(inputCashInfo.inputCash * EXCHANGE_RATE.USD_TO_VND))}
                               onChange={handleInputCashInfoChange} className='w50p money'/>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.outputCash.label}</th>
                    <td><input type='text' name={OtherSendInfoMap.outputCash.name}
                               value={Util.numberWithCommas(inputCashInfo.outputCash)}
                               onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;
                      <span className='explanEx'>Only Digit</span>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'>{OtherSendInfoMap.charge.label}</th>
                    <td><input type='text' readOnly={true} name={OtherSendInfoMap.charge.name}
                               value={Util.numberWithCommas(inputCashInfo.charge)}
                               onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'>{OtherSendInfoMap.sum.label}</th>
                    <td><input type='text' readOnly={true} name={OtherSendInfoMap.sum.name}
                               value={Util.numberWithCommas(parseInt(inputCashInfo.outputCash) + parseInt(inputCashInfo.charge))}
                               onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Agent</th>
                    <td><b>{inputCashInfo.agentName}</b></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              :
              phase === 1 ?
                <div className='tableBox'>
                  <table className='form'>
                    <colgroup>
                      <col style={{ width: '180px' }}/>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={OtherSendInfoMap.agentOTP.name} value={inputCashInfo.agentOTP}
                               onChange={handleInputCashInfoChange}
                               className='w50p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{OtherSendInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={OtherSendInfoMap.customerPIN.name} value={inputCashInfo.customerPIN}
                                 onChange={handleInputCashInfoChange} className='w50p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <text><text className={'empha'}>{inputCashInfo.accountNumber}</text>의 계좌에서
                  <br/><br/> <text className={'empha'}>Agent ({inputCashInfo.agentName})</text> 님의 계좌로
                  <br/><br/> <text className={'empha'}>{inputCashInfo.inputCash} 원</text> 입금이 완료 되었습니다.
                </text>

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
              <>
                <div className='subTop'>
                  <h3>Give cash to customer please.</h3>
                </div>
                <div className='btnArea'>
                  <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Print Transfer Result</button>&nbsp;
                  <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Send Transfer Result To Customer</button>&nbsp;
                  <button onClick={handleCancel} className='btn_l'>To Main</button>
                </div>
              </>
            }
          </form>
        </div>
      </div>
      <Loading isLoading={showLoading} label={loadingStatement}/>
    </>
  );
};

export default OtherSend;
