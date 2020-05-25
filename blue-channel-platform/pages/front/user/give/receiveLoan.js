import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import Util from '../../../../src/common/util';
import DUMMY from '../../../../src/common/dummyConst';

const OutputCashScreen = () => {

  const receiveLoanInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Mobile Phone Number'
    },
    accountNumber: {
      name: 'accountNumber',
      label: 'Loan Account No.'
    },
    loan: {
      name: 'loan',
      label: 'Loan Amount'
    },
    outputCash: {
      name: 'outputCash',
      label: 'Withdrawal'
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
      label: 'Customer Approval Callback URL'
    }
  };

  const initialReceiveLoanInfo = {
    mobileNumber: '',
    accountNumber: '',
    loan: '',
    outputCash: '',
    charge: 1000,
    sum: '',
    agentName: DUMMY.AGENT,
    agentOTP: '',
    customerPIN: '',
  };

  const [phase, setPhase] = useState(0);
  const [receiveLoanInfo, setReceiveLoanInfo] = useState(initialReceiveLoanInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [afterAuth, setAfterAuth] = useState(false);

  useEffect(() => {
    scrollTo(0,0);
  }, [phase]);

  const handleOutputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setReceiveLoanInfo((prev) => ({
      ...prev,
      [name]: (name === receiveLoanInfoMap.outputCash.name || name === receiveLoanInfoMap.charge.name || name === receiveLoanInfoMap.sum.name) ? Util.numberWithoutCommas(value)
        : name === receiveLoanInfoMap.mobileNumber.name ? Util.numberWithoutSpace(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(<>
        Loan amount has been deposited to <br/>{receiveLoanInfo.accountNumber}
        </>);
      setTimeout((e)=> {
        setLoadingStatement(<>
          Transferring {Util.numberWithCommas(receiveLoanInfo.loan)} d
          <br/> to Agent ({DUMMY.AGENT}) account
        </>);
      }, 2000);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 4000);
    }
  }, [receiveLoanInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setReceiveLoanInfo(initialReceiveLoanInfo);
    setAfterAuth(false);
  }, []);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setAfterAuth(true);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if (!afterAuth) {
      setReceiveLoanInfo((prev) => ({
        ...prev,
        mobileNumber: DUMMY.PHONE_NUMBER,
      }));
    }

    if (phase === 0 && afterAuth) {
      setReceiveLoanInfo((prev) => ({
        ...prev,
        accountNumber: DUMMY.ACCOUNT_NUMBER,
        loan: DUMMY.LOAN,
        outputCash: DUMMY.LOAN,
      }));
    }

    if (phase === 1) {
      setReceiveLoanInfo((prev) => ({
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
            <h3>Loan Receive</h3>
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
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{receiveLoanInfoMap.mobileNumber.label}
                    </th>
                    <td>
                      <input type='text' name={receiveLoanInfoMap.mobileNumber.name} value={receiveLoanInfo.mobileNumber}
                             onChange={handleOutputCashInfoChange}
                             className='w50p'
                      />&nbsp;
                      <button onClick={handleShow} className='btn_l on'>Submit</button>
                    </td>

                  </tr>
                  {afterAuth &&
                  <>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{receiveLoanInfoMap.accountNumber.label}</th>
                      <td><input type='text' name={receiveLoanInfoMap.accountNumber.name} value={receiveLoanInfo.accountNumber}
                                 onChange={handleOutputCashInfoChange} className='w50p'/></td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{receiveLoanInfoMap.loan.label}</th>
                      <td><input type='text' name={receiveLoanInfoMap.loan.name}
                                 value={Util.numberWithCommas(receiveLoanInfo.loan)}
                                 onChange={handleOutputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className='explanEx'>Only Digit</span>
                      </td>

                    </tr>
                    <tr>
                      <th scope='row'>{receiveLoanInfoMap.outputCash.label}
                      </th>
                      <td><input readOnly={true}
                        type='text' name={receiveLoanInfoMap.outputCash.name}
                                 value={Util.numberWithCommas(receiveLoanInfo.loan)}
                                 onChange={handleOutputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                      </td>
                    </tr>

                    <tr>
                      <th scope='row'>{receiveLoanInfoMap.charge.label}</th>
                      <td><input type='text' readOnly={true} name={receiveLoanInfoMap.charge.name}
                                 value={Util.numberWithCommas(receiveLoanInfo.charge)}
                                 onChange={handleOutputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d

                      </td>
                    </tr>

                    <tr>
                      <th scope='row'>{receiveLoanInfoMap.sum.label}</th>
                      <td><input type='text' readOnly={true} name={receiveLoanInfoMap.sum.name}
                                 value={Util.numberWithCommas((parseInt(receiveLoanInfo.outputCash)||0) - parseInt(receiveLoanInfo.charge))}
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
                <div className='subTop'>
                  <h3>Start payment of loan cash.</h3>
                </div>
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
                      <th scope='row'>Agent</th>
                      <td><b>{DUMMY.AGENT}</b></td>
                    </tr>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{receiveLoanInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={receiveLoanInfoMap.agentOTP.name} value={receiveLoanInfo.agentOTP}
                               onChange={handleOutputCashInfoChange}
                               className='w50p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{receiveLoanInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={receiveLoanInfoMap.customerPIN.name} value={receiveLoanInfo.customerPIN}
                                 onChange={handleOutputCashInfoChange} className='w50p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <text>
                  Transferring of loan ammount has benn completed.
                  <br/><br/> Cash <text className={'empha'}>{Util.numberWithCommas(receiveLoanInfo.outputCash)} d</text> in cash
                  <br/><br/> to <text className={'empha'}>({receiveLoanInfo.accountNumber})</text>
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

                <div className='btnArea'>
                  <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Print Loan Result</button>&nbsp;
                  <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Send Loan Result</button>&nbsp;
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
