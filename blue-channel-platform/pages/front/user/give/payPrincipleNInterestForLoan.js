import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import Util from '../../../../src/common/util';
import DUMMY from '../../../../src/common/dummyConst';

const PayPrincipleNInterestForLoan = () => {

  const payLoanInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Mobile Phone Number'
    },
    accountNumber: {
      name: 'accountNumber',
      label: 'Loan Account No.'
    },
    loanPrinciple: {
      name: 'loanPrinciple',
      label: 'Loan Principle'
    },
    loanBalance: {
      name: 'loanBalance',
      label: 'Loan Balance'
    },
    principlePayCash: {
      name: 'principlePayCash',
      label: 'Principle Payment Amount'
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
    }
  };

  const initialPayLoanInfo = {
    mobileNumber: '',
    accountNumber: '',
    loanPrinciple: '',
    loanBalance: 0,
    principlePayCash: '',
    charge: DUMMY.CHARGE,
    sum: '',
    agentName: DUMMY.AGENT,
  };

  const [phase, setPhase] = useState(0);
  const [payLoanInfo, setPayLoanInfo] = useState(initialPayLoanInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [afterAuth, setAfterAuth] = useState(false);

  const handleInputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setPayLoanInfo((prev) => ({
      ...prev,
      [name]: (name === payLoanInfoMap.loanPrinciple.name || name === payLoanInfoMap.loanBalance.name || name === payLoanInfoMap.sum.name || name === payLoanInfoMap.principlePayCash.name) ? Util.numberWithoutCommas(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (phase === 0) {

      setShowLoading(true);
      setLoadingStatement(<>
        Start payment of principal and interest
        <br/>of loan account {payLoanInfo.accountNumber}
      </>);
      setTimeout((e) => {
        setLoadingStatement(<>
          Payment of principal and interest
          <br/>({payLoanInfo.principlePayCash})
          <br/>of {payLoanInfo.accountNumber} account
          <br/> is in progress
        </>);
      }, 1000);
      setTimeout(() => {
        setPhase(1);
        setShowLoading(false);
      }, 3000);

    }
  }, [payLoanInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setPayLoanInfo(initialPayLoanInfo);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if (phase === 0) {
      setPayLoanInfo((prev) => ({
        ...prev,
        mobileNumber: DUMMY.PHONE_NUMBER
      }));
    }
    afterAuth && setPayLoanInfo((prev) => ({
      ...prev,
      accountNumber: DUMMY.ACCOUNT_NUMBER,
      loanPrinciple: DUMMY.LOAN_PRINCIPAL,
      loanBalance: DUMMY.LOAN_BALANCE,
      principlePayCash: DUMMY.PRINCIPAL_PAY_MONEY,
    }));

  }, [phase, afterAuth]);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setAfterAuth(true);
  }, []);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>Bank Transfer</h3>
            {phase !== 1 &&
            <button
              className={'btn_l demo'}
              onClick={onClickDemo}>demo
            </button>
            }
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
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{payLoanInfoMap.mobileNumber.label}
                    </th>
                    <td>
                      <input type='text' name={payLoanInfoMap.mobileNumber.name} value={payLoanInfo.mobileNumber}
                             onChange={handleInputCashInfoChange}
                             className='w50p'
                      />&nbsp;
                      <button onClick={handleShow} className='btn_l on'>Submit</button>
                    </td>
                  </tr>
                  {afterAuth && <>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{payLoanInfoMap.accountNumber.label}</th>
                      <td><input type='text' name={payLoanInfoMap.accountNumber.name} value={payLoanInfo.accountNumber}
                                 onChange={handleInputCashInfoChange} className='w50p'/></td>
                    </tr>
                    <tr>
                      <th scope='row'>{payLoanInfoMap.loanPrinciple.label}</th>
                      <td>
                        <input
                          readOnly={true}
                          type='text' name={payLoanInfoMap.loanPrinciple.name} value={Util.numberWithCommas(payLoanInfo.loanPrinciple)}
                          onChange={handleInputCashInfoChange} className='w50p money'/>
                        <br/>

                      </td>
                    </tr>

                    <tr>
                      <th scope='row'>{payLoanInfoMap.loanBalance.label}</th>
                      <td><input
                        readOnly={true} type='text' name={payLoanInfoMap.loanBalance.name}
                        value={Util.numberWithCommas(payLoanInfo.loanBalance)}
                        onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                      </td>
                    </tr>

                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{payLoanInfoMap.principlePayCash.label}
                      </th>
                      <td><input type='text' name={payLoanInfoMap.principlePayCash.name}
                                 value={Util.numberWithCommas(payLoanInfo.principlePayCash)}
                                 onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className='explanEx'>Only Digit</span>
                      </td>
                    </tr>

                    <tr>
                      <th scope='row'>{payLoanInfoMap.charge.label}</th>
                      <td><input type='text' readOnly={true} name={payLoanInfoMap.charge.name}
                                 value={Util.numberWithCommas(payLoanInfo.charge)}
                                 onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                      </td>
                    </tr>

                    <tr>
                      <th scope='row'>{payLoanInfoMap.sum.label}</th>
                      <td><input type='text' readOnly={true} name={payLoanInfoMap.sum.name}
                                 value={Util.numberWithCommas((parseInt(payLoanInfo.principlePayCash) || 0) + parseInt(payLoanInfo.charge))}
                                 onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>Agent</th>
                      <td><b>{payLoanInfo.agentName}</b></td>
                    </tr>
                  </>}
                  </tbody>
                </table>
                {afterAuth && <div className={'subTop'}><h3>
                  Start payment of principle and interest after receiving cash.
                </h3></div>}
              </div>
              :
              <text>
                Payment of principle and interest has been completed.
                <br/><br/> Loan balance is <text className={'empha'}>{Util.numberWithCommas(payLoanInfo.loanBalance)} d</text>.
              </text>

            }

            {phase !== 1 ?
              <>
                <div className='btnArea'>
                  <button onClick={handleSubmit} className='btn_l on'>Next</button>
                  &nbsp;
                  <button onClick={handleCancel} className='btn_l'>Cancel</button>
                </div>
              </>
              :
              <>
                <div className='btnArea'>
                  <button onClick={(e) => {
                    e.preventDefault();
                  }} className='btn_l on'>Print Result
                  </button>
                  &nbsp;
                  <button onClick={(e) => {
                    e.preventDefault();
                  }} className='btn_l on'>Send Result To Customer
                  </button>
                  &nbsp;
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

export default PayPrincipleNInterestForLoan;
