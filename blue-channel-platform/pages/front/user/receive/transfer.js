import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import { useSelector } from 'react-redux';
import Util from '../../../../src/common/util';
import DUMMY from '../../../../src/common/dummyConst';

const Transfer = () => {

  const transferInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Mobile Phone Number'
    },
    outAccountNumber: {
      name: 'outAccountNumber',
      label: 'Withdrawal Account Number'
    },
    inAccountNumber: {
      name: 'inAccountNumber',
      label: 'Deposit Account Number'
    },
    inAccountBank: {
      name: 'outAccountNumber',
      label: 'Deposit Bank'
    },
    inputCash: {
      name: 'inputCash',
      label: 'Transfer'
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

  const initialTransferInfo = {
    mobileNumber: '',
    outAccountNumber: '',
    inputCash: '',
    charge: 1000,
    inAccountBank: '',
    inAccountNumber: '',
    agentOTP: '',
    customerPIN: '',
  };

  const [phase, setPhase] = useState(0);
  const [transferInfo, setTransferInfo] = useState(initialTransferInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [accountList, setAccountList] = useState([]);
  const [afterAuth, setAfterAuth] = useState(false);

  useEffect(() => {
    scrollTo(0,0);
  }, [phase]);

  const handleInputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setTransferInfo((prev) => ({
      ...prev,
      [name]: (name === transferInfoMap.inputCash.name || name === transferInfoMap.charge.name || name === transferInfoMap.sum.name) ? Util.numberWithoutCommas(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(<>
        Transferring
        <br/>from {transferInfo.mobileNumber} account
        <br/>to {transferInfo.inAccountBank}({transferInfo.inAccountNumber}) account
      </>);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 3000);
    }
  }, [transferInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setTransferInfo(initialTransferInfo);
    setAccountList([]);
    setAfterAuth(false);
  }, []);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setAfterAuth(true);
    setAccountList([{ accountValue: '1111-1234-4321' }, { accountValue: DUMMY.ACCOUNT_NUMBER }]);
  }, []);

  const renderAccountList = useCallback(() => {
    const options = accountList.map((account, index) => <option key={index} value={account.accountValue}>{account.accountValue}</option>);
    return (
      <select name={transferInfoMap.outAccountNumber.name} value={transferInfo.outAccountNumber} onChange={handleInputCashInfoChange}>
        {options}
      </select>
    );
  }, [accountList]);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if (!afterAuth) {
      setTransferInfo((prev) => ({
        ...prev,
        mobileNumber: DUMMY.PHONE_NUMBER,
        outAccountNumber: DUMMY.ACCOUNT_NUMBER
      }));
    }

    if (phase === 0 && afterAuth) {
      setTransferInfo((prev) => ({
        ...prev,
        inputCash: DUMMY.INPUT_CASH,
        inAccountBank: DUMMY.IN_ACCOUNT_BANK,
        inAccountNumber: DUMMY.IN_ACCOUNT_BANK_NUMBER,
      }));
    }

    if (phase === 1) {
      setTransferInfo((prev) => ({
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
            <h3>Bank Transfer</h3>
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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.mobileNumber.label}
                      </th>
                      <td>
                        <input type='text' name={transferInfoMap.mobileNumber.name} value={transferInfo.mobileNumber}
                               onChange={handleInputCashInfoChange}
                               className='w50p'
                        />&nbsp;&nbsp;
                        <button onClick={handleShow} className='btn_l on'>Submit</button>
                      </td>
                    </tr>
                    {afterAuth && <>
                      <tr>
                        <th><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.outAccountNumber.label}</th>
                        <td>{renderAccountList()}</td>
                      </tr>
                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.inputCash.label}</th>
                        <td><input type='text' name={transferInfoMap.inputCash.name} value={Util.numberWithCommas(transferInfo.inputCash)}
                                   onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d&nbsp;&nbsp;&nbsp;&nbsp;
                          <span className='explanEx'>Only Digit</span>
                        </td>
                      </tr>

                      <tr>
                        <th scope='row'>{transferInfoMap.charge.label}</th>
                        <td><input type='text' readOnly={true} name={transferInfoMap.charge.name}
                                   value={Util.numberWithCommas(transferInfo.charge)}
                                   onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>{transferInfoMap.sum.label}</th>
                        <td><input type='text' readOnly={true} name={transferInfoMap.sum.name}
                                   value={Util.numberWithCommas((parseInt(transferInfo.inputCash) || 0) + parseInt(transferInfo.charge))}
                                   onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                        </td>
                      </tr>
                    </>}
                    </tbody>
                  </table>
                </div>
                <br/>
                {afterAuth && <div className='tableBox'>
                  <table className='form'>
                    <colgroup>
                      <col style={{ width: '180px' }}/>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.inAccountBank.label}
                      </th>
                      <td>
                        <select onChange={handleInputCashInfoChange} name={transferInfoMap.inAccountBank.name}
                                value={transferInfo.inAccountBank}>
                          <option value={''}>Bank</option>
                          <option value={'Vietcom'}>Vietcom Bank</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.inAccountNumber.label}
                      </th>
                      <td><input type='text' name={transferInfoMap.inAccountNumber.name} value={transferInfo.inAccountNumber}
                                 onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                      </td>
                    </tr>

                    <tr>
                      <th scope='row'>{transferInfoMap.inputCash.label}</th>
                      <td><input type='text' readOnly={true} name={transferInfoMap.inputCash.name}
                                 value={Util.numberWithCommas(transferInfo.inputCash)}
                                 onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>Agent</th>
                      <td><b>{DUMMY.AGENT}</b></td>
                    </tr>
                    </tbody>
                  </table>
                </div>}
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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={transferInfoMap.agentOTP.name} value={transferInfo.agentOTP}
                               onChange={handleInputCashInfoChange}
                               className='w50p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{transferInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={transferInfoMap.customerPIN.name} value={transferInfo.customerPIN}
                                 onChange={handleInputCashInfoChange} className='w50p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <text>
                  The <text className={'empha'}>{Util.numberWithCommas(transferInfo.inputCash)} d</text> transfer has been completed
                  <br/><br/>from <text className={'empha'}>{transferInfo.mobileNumber}</text> account
                  <br/><br/>to <text className={'empha'}>{transferInfo.inAccountBank} ({transferInfo.inAccountNumber})</text>
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
                <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Print Transfer Result</button>&nbsp;
                <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Send Transfer Result To SMS</button>&nbsp;
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

export default Transfer;
