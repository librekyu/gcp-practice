import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import Util from '../../../../src/common/util';
import DUMMY from '../../../../src/common/dummyConst';

const UtilityBill = () => {

  const utilityBillType = {
    electronic: 'Electronic Bill',
    water: 'Water Supply Bill',
    management: 'Management Bill'
  };

  const renderUtilityBillTypeButton = useCallback(() => {
    const typeButtons = [];
    Object.entries(utilityBillType)
      .map(([key, value], index) => {
        typeButtons.push(
          <React.Fragment key={index}>
            <button className={'btn_l on'} onClick={(e) => onClickUtilityBillType(e, key)}>
              {value}</button>
            &nbsp;
          </React.Fragment>);
      });
    return (
      <>{typeButtons}</>
    );
  }, []);

  const utilityBillInfoMap = {
    utilityBillType: {
      name: 'utilityBillType',
      label: 'Utility Bill Type'
    },
    payMethod: {
      name: 'payMethod',
      label: 'Payment Option'
    },
    accountNumber: {
      name: 'accountNumber',
      label: 'Account No.'
    },
    billMonth: {
      name: 'billMonth',
      label: 'Inquiry Year/Month'
    },
    utilityBill: {
      name: 'utilityBill',
      label: 'Utility Bill'
    },
    agentName: {
      name: 'agentName',
    },
    agentOTP: {
      name: 'agentOTP',
      label: 'Agent OTP'
    },
  };

  const initialUtilityBillInfo = {
    utilityBillType: '',
    payMethod: '',
    accountNumber: '',
    billMonth: '',
    utilityBill: '',
    agentName: '',
    agentOTP: '',
  };

  const [phase, setPhase] = useState(0);
  const [utilityBillInfo, setUtilityBillInfo] = useState(initialUtilityBillInfo);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [afterAuth, setAfterAuth] = useState(false);

  useEffect(() => {
    scrollTo(0,0);
  }, [phase]);

  const handleInputCashInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    name === utilityBillInfoMap.payMethod.name && value === 'cash' && setUtilityBillInfo((prev) => ({
      ...prev,
      accountNumber: ''
    }));
    setUtilityBillInfo((prev) => ({
      ...prev,
      [name]: (name === utilityBillInfoMap.utilityBill.name) ? Util.numberWithoutCommas(value)
        : (name === utilityBillInfoMap.accountNumber.name) ? Util.numberWithoutSpace(value) : value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(<>Payment is in progress.</>);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 2000);
    }
  }, [phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setUtilityBillInfo(initialUtilityBillInfo);
    setAfterAuth(false);
  }, []);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setAfterAuth(true);
    setUtilityBillInfo((prev) => ({
      ...prev,
      utilityBill: DUMMY.UTILITY_BILL
    }));
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if (phase === 1 && !afterAuth) {
      setUtilityBillInfo((prev) => ({
        ...prev,
        payMethod: 'accountPayment',
        accountNumber: DUMMY.ACCOUNT_NUMBER,
        billMonth: '02.20',
        utilityBill: DUMMY.UTILITY_BILL
      }));
      setAfterAuth(true);
    }

    if (phase === 1 && afterAuth) {
      setUtilityBillInfo((prev) => ({
        ...prev,
        agentOTP: DUMMY.AGENT_OTP
      }));
    }
  }, [phase, afterAuth]);

  const onClickUtilityBillType = useCallback((e, type) => {
    e.preventDefault();
    setUtilityBillInfo((prev)=>({
      ...prev,
      utilityBillType: type
    }));
    setPhase(1);
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
            <h3>Utility Bill Payment</h3>
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
              renderUtilityBillTypeButton()
              :
              phase === 1 ?
                <>

                  <div className='tableBox'>
                    <table className='form'>
                      <colgroup>
                        <col style={{ width: '180px' }}/>
                      </colgroup>
                      <tbody>
                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{utilityBillInfoMap.payMethod.label}
                        </th>
                        <td>
                          <select name={utilityBillInfoMap.payMethod.name} value={utilityBillInfo.payMethod}
                                  onChange={handleInputCashInfoChange}
                                  className='w50p'
                          >
                            <option value={''}>Payment Option</option>
                            <option value={'cash'}>Cash</option>
                            <option value={'accountPayment'}>Bank Transfer</option>
                          </select>
                        </td>
                      </tr>
                      {utilityBillInfo.payMethod === 'accountPayment' &&
                      <tr>
                        <th scope='row'><span className='required'
                                              style={requireStyle}>*</span>&nbsp;{utilityBillInfoMap.accountNumber.label}</th>
                        <td><input type='text' name={utilityBillInfoMap.accountNumber.name}
                                   value={utilityBillInfo.accountNumber}
                                   onChange={handleInputCashInfoChange} className='w50p'/>&nbsp;&nbsp;
                        </td>
                      </tr>

                      }
                      <tr>
                        <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{utilityBillInfoMap.billMonth.label}
                        </th>
                        <td><select name={utilityBillInfoMap.billMonth.name} value={Util.numberWithCommas(utilityBillInfo.billMonth)}
                                    onChange={handleInputCashInfoChange} className='w50p'>
                          <option value={'01.20'}>01/2020</option>
                          <option value={'02.20'}>02/2020</option>
                          <option value={'03.20'}>03/2020</option>
                        </select>&nbsp;&nbsp;
                          <button onClick={handleShow} className='btn_l on'>Submit</button>
                        </td>
                      </tr>
                      {afterAuth && <>
                        <tr>
                          <th scope='row'><span className='required'
                                                style={requireStyle}>*</span>&nbsp;{utilityBillInfoMap.utilityBill.label}</th>
                          <td><input readOnly={true} type='text' name={utilityBillInfoMap.utilityBill.name}
                                     value={Util.numberWithCommas(utilityBillInfo.utilityBill)}
                                     onChange={handleInputCashInfoChange} className='w50p money'/>&nbsp;&nbsp;d
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}/>
                        </tr>
                        <tr>
                          <th scope='row'>Agent</th>
                          <td><b>{DUMMY.AGENT}</b></td>
                        </tr>
                      </>}
                      </tbody>
                    </table>
                  </div>
                  <br/>
                  <br/>
                  {afterAuth
                  && <>
                    <div className={'subTop'}><h3>Utility bill payment starts after receiving cash.</h3></div>
                    <div className='tableBox'>
                      <table className='form'>
                        <colgroup>
                          <col style={{ width: '180px' }}/>
                        </colgroup>
                        <tbody>
                        <tr>
                          <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{utilityBillInfoMap.agentOTP.label}
                          </th>
                          <td>
                            <input type='password' name={utilityBillInfoMap.agentOTP.name} value={utilityBillInfo.agentOTP}
                                   onChange={handleInputCashInfoChange}
                                   className='w50p'
                            />
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </>}
                </>
                :
                <text>
                  Payment of {utilityBillType[utilityBillInfo.utilityBillType]} has been completed.
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
                <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Print Payment Result</button>&nbsp;
                <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Send Payment Result To Customer</button>&nbsp;
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

export default UtilityBill;
