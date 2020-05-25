import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import Util from '../../../../src/common/util';
import DUMMY from '../../../../src/common/dummyConst';

const InputCashScreen = () => {

  const InputCashInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Mobile Phone Number'
    },
    accountNumber: {
      name: 'accountNumber',
      label: 'Account No.'
    },
    inputCash: {
      name: 'inputCash',
      label: 'Deposit'
    },
    inputCashLimit: {
      name: 'inputCashLimit',
      label: 'Deposit Day Limit'
    },
    charge: {
      name: 'charge',
      label: 'Charge'
    },
    sum: {
      name: 'sum',
      label: 'Sum'
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
      label: 'Deposit Check Callback URL'
    }
  };

  const initialInputCashInfo = {
    mobileNumber: '',
    accountNumber: '',
    inputCash: 0,
    charge: 1000,
    sum: '',
    agentName: '',
    agentOTP: '',
    customerPIN: '',
  };

  const [phase, setPhase] = useState(0);
  const [inputCashInfo, setInputCashInfo] = useState(initialInputCashInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [afterAuth, setAfterAuth] = useState(false);

  useEffect(() => {
    scrollTo(0,0);
  }, [phase]);

  const handleInputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setInputCashInfo((prev) => ({
      ...prev,
      [name]: (name === InputCashInfoMap.inputCash.name || name === InputCashInfoMap.charge.name || name === InputCashInfoMap.sum.name) ? Util.numberWithoutCommas(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(
        <>Transferring
          from Agent ({DUMMY.AGENT}) account
          <br/>
          to {inputCashInfo.mobileNumber} account.</>);
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
    setAfterAuth(false);
  }, []);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setAfterAuth(true);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if (!afterAuth) {
      setInputCashInfo((prev) => ({
        ...prev,
        mobileNumber: DUMMY.PHONE_NUMBER,
        inputCashLimit: 20000000
      }));
    }

    if (phase === 0 && afterAuth) {
      setInputCashInfo((prev) => ({
        ...prev,
        accountNumber: DUMMY.ACCOUNT_NUMBER,
        inputCash: 650000,
        inputCashLimit: 20000000
      }));
    }

    if (phase === 1) {
      setInputCashInfo((prev) => ({
        ...prev,
        customerPIN: DUMMY.CLIENT_PIN,
        agentOTP: DUMMY.AGENT_OTP
      }));
    }
  }, [phase, afterAuth]);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>Deposit</h3>
            {phase !==2 && <button
              className={'btn_l demo'}
              onClick={onClickDemo}>demo
            </button>}
          </div>
          <form>
            <br/>
            {phase === 0 ?
              <div className='tableBox'>
                <table className='form'>
                  <colgroup>
                    <col style={{ width: '180px' }}/>
                  </colgroup>
                  <tbody>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.mobileNumber.label}
                    </th>
                    <td>
                      <input type='text' name={InputCashInfoMap.mobileNumber.name} value={inputCashInfo.mobileNumber}
                             onChange={handleInputCashInfoChange}
                             className='w50p'
                      />&nbsp;
                      <button onClick={handleShow} className='btn_l on'>Submit</button>
                    </td>
                  </tr>
                  {afterAuth && <>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.accountNumber.label}</th>
                      <td><input type='text' name={InputCashInfoMap.accountNumber.name} value={inputCashInfo.accountNumber}
                                 onChange={handleInputCashInfoChange} className='w50p'/></td>
                    </tr>
                    <tr>
                      <th scope='row'>{InputCashInfoMap.inputCashLimit.label}</th>
                      <td><input readOnly={true} type='text' name={InputCashInfoMap.inputCashLimit.name} value={Util.numberWithCommas(inputCashInfo.inputCashLimit)}
                                 onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.inputCash.label}</th>
                      <td><input type='text' name={InputCashInfoMap.inputCash.name} value={Util.numberWithCommas(inputCashInfo.inputCash)}
                                 onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className='explanEx'>Only Digit</span>
                      </td>
                    </tr>

                    <tr>
                      <th scope='row'>{InputCashInfoMap.charge.label}</th>
                      <td><input type='text' readOnly={true} name={InputCashInfoMap.charge.name}
                                 value={Util.numberWithCommas(inputCashInfo.charge)}
                                 onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                      </td>
                    </tr>

                    <tr>
                      <th scope='row'>{InputCashInfoMap.sum.label}</th>
                      <td><input type='text' readOnly={true} name={InputCashInfoMap.sum.name}
                                 value={Util.numberWithCommas(parseInt(inputCashInfo.inputCash) + parseInt(inputCashInfo.charge))}
                                 onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>Agent</th>
                      <td><b>{DUMMY.AGENT}</b></td>
                    </tr>
                  </>}
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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={InputCashInfoMap.agentOTP.name} value={inputCashInfo.agentOTP}
                               onChange={handleInputCashInfoChange}
                               className='w50p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{InputCashInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={InputCashInfoMap.customerPIN.name} value={inputCashInfo.customerPIN}
                                 onChange={handleInputCashInfoChange} className='w50p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <text>
                  The <text className={'empha'}>{Util.numberWithCommas(inputCashInfo.inputCash)} d</text> has been completed
                  <br/><br/>from <text className={'empha'}>Agent ({DUMMY.AGENT})</text> account
                  <br/><br/>to <text className={'empha'}>{inputCashInfo.accountNumber}</text> account
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
              <div className='btnArea'>
                <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Print Deposit Result</button>&nbsp;
                <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Send Deposit Result To Customer</button>&nbsp;
                <button onClick={handleCancel} className='btn_l on'>To Main</button>
              </div>
            }
          </form>
        </div>
      </div>
      <Loading isLoading={showLoading} label={loadingStatement}/>
    </>
  );
};

export default InputCashScreen;
