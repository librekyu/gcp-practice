import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import { useSelector } from 'react-redux';
import Util from '../../../../src/common/util';
import DUMMY from '../../../../src/common/dummyConst';

const OutputCashScreen = () => {

  const OutputCashInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Mobile Phone Number'
    },
    accountNumber: {
      name: 'accountNumber',
      label: 'Account No.'
    },
    outputCash: {
      name: 'outputCash',
      label: 'Withdrawal'
    },
    outputCashLimit: {
      name: 'outputCashLimit',
      label: 'Withdrawal Day Limt'
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
      label: 'Withdrawal Approval Callback URL'
    }
  };

  const initialOutputCashInfo = {
    mobileNumber: '',
    accountNumber: '',
    outputCash: '',
    charge: 1000,
    sum: '',
    agentName: '',
    agentOTP: '',
    customerPIN: '',
  };

  const { userInfo } = useSelector((state) => state.userLogin);

  const [phase, setPhase] = useState(0);
  const [outputCashInfo, setOutputCashInfo] = useState(initialOutputCashInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [afterAuth, setAfterAuth] = useState(false);

  const handleOutputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setOutputCashInfo((prev) => ({
      ...prev,
      [name]: (name === OutputCashInfoMap.outputCash.name || name === OutputCashInfoMap.charge.name || name === OutputCashInfoMap.sum.name) ? Util.numberWithoutCommas(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(<>{outputCashInfo.mobileNumber} is certifying.<br/>Waiting for approval of customer.</>);
      setTimeout(() => {
        setLoadingStatement(<>Certifying has been completed.</>);
      }, 5000);
      setTimeout(() => {
        setLoadingStatement(<>Transferring <br/> from {outputCashInfo.mobileNumber} account <br/> to Agent ({DUMMY.AGENT}) account.</>);
      }, 7000);
      setTimeout(() => {
        setShowLoading(false);
        setPhase(2);
      }, 10000);
    }
  }, [outputCashInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setOutputCashInfo(initialOutputCashInfo);
    setAfterAuth(false);
  }, []);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setAfterAuth(true);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if (!afterAuth) {
      setOutputCashInfo((prev) => ({
        ...prev,
        mobileNumber: DUMMY.PHONE_NUMBER,
        outputCashLimit: 50000000
      }));
    }

    if (phase === 0 && afterAuth) {
      setOutputCashInfo((prev) => ({
        ...prev,
        accountNumber: DUMMY.ACCOUNT_NUMBER,
        outputCashLimit: 50000000,
        outputCash: 450000,
      }));
    }

    if (phase === 1) {
      setOutputCashInfo((prev) => ({
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
            <h3>Withdrawal</h3>
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
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.mobileNumber.label}
                    </th>
                    <td>
                      <input type='text' name={OutputCashInfoMap.mobileNumber.name} value={outputCashInfo.mobileNumber}
                             onChange={handleOutputCashInfoChange}
                             className='w50p'
                      />&nbsp;
                      <button onClick={handleShow} className='btn_l on'>Submit</button>
                    </td>

                  </tr>
                  {afterAuth &&
                  <>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.accountNumber.label}</th>
                      <td><input type='text' name={OutputCashInfoMap.accountNumber.name} value={outputCashInfo.accountNumber}
                                 onChange={handleOutputCashInfoChange} className='w50p'/></td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.outputCashLimit.label}</th>
                      <td><input readOnly={true} type='text' name={OutputCashInfoMap.outputCashLimit.name}
                                 value={Util.numberWithCommas(outputCashInfo.outputCashLimit)}
                                 onChange={handleOutputCashInfoChange} className='w50p money'/></td>
                    </tr>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.outputCash.label}
                      </th>
                      <td><input type='text' name={OutputCashInfoMap.outputCash.name}
                                 value={Util.numberWithCommas(outputCashInfo.outputCash)}
                                 onChange={handleOutputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className='explanEx'>Only Digit</span>
                      </td>
                    </tr>

                    <tr>
                      <th scope='row'>{OutputCashInfoMap.charge.label}</th>
                      <td><input type='text' readOnly={true} name={OutputCashInfoMap.charge.name}
                                 value={Util.numberWithCommas(outputCashInfo.charge)}
                                 onChange={handleOutputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d

                      </td>
                    </tr>

                    <tr>
                      <th scope='row'>{OutputCashInfoMap.sum.label}</th>
                      <td><input type='text' readOnly={true} name={OutputCashInfoMap.sum.name}
                                 value={Util.numberWithCommas((parseInt(outputCashInfo.outputCash)||0) + parseInt(outputCashInfo.charge))}
                                 onChange={handleOutputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={OutputCashInfoMap.agentOTP.name} value={outputCashInfo.agentOTP}
                               onChange={handleOutputCashInfoChange}
                               className='w50p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{OutputCashInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={OutputCashInfoMap.customerPIN.name} value={outputCashInfo.customerPIN}
                                 onChange={handleOutputCashInfoChange} className='w50p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <text>
                  The <text className={'empha'}>{Util.numberWithCommas(outputCashInfo.outputCash)} d</text> withdrawal has been completed
                  <br/><br/> from <text className={'empha'}>{outputCashInfo.accountNumber}</text> account
                  <br/><br/> to <text className={'empha'}>Agent ({DUMMY.AGENT})</text> account.
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
              : <>
                <div className='subTop'>
                  <h3>Please pay cash.</h3>
                </div>
                <div className='btnArea'>
                  <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Print Withdrawal Result</button>&nbsp;
                  <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Send Withdrawal Result To Customer</button>&nbsp;
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

export default OutputCashScreen;
