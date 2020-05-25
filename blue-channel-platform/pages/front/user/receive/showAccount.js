import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Util from '../../../../src/common/util';
import TableComponent from '../../../../src/components/common/jsmartTable';
import { NoticeList } from '../../../../src/models/user/posts/Notice';
import Pagination from '../../../../src/components/common/jsmartPagination';
import DUMMY from '../../../../src/common/dummyConst';

const ShowAccount = () => {

  const accountInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Mobile Phone Number'
    },
    accountNumber: {
      name: 'accountNumber',
      label: 'Account Number'
    },
    customerPIN: {
      name: 'customerPIN',
      label: 'Customer Approval Callback URL'
    },
    balance: {
      name: 'balance',
      label: 'Balance'
    }
  };

  const initialAccountInfo = {
    mobileNumber: '',
    accountNumber: DUMMY.ACCOUNT_NUMBER,
    customerPIN: '',
    balance: 1455000
  };

  const [phase, setPhase] = useState(0);
  const [accountInfo, setAccountInfo] = useState(initialAccountInfo);
  const [afterAuth, setAfterAuth] = useState(false);

  useEffect(() => {
    scrollTo(0,0);
  }, [phase]);

  const handleInputJoinInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setAccountInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  }, [accountInfo]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
  }, [accountInfo, phase]);

  const handleShow = useCallback((e) => {
    e.preventDefault();
    setAfterAuth(true);
  }, [accountInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setAccountInfo(initialAccountInfo);
    setAfterAuth(false);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if(!afterAuth){
      setAccountInfo((prev) => ({
        ...prev,
        accountNumber: DUMMY.ACCOUNT_NUMBER,
        mobileNumber: DUMMY.PHONE_NUMBER,
      }));
    }

    if (phase === 0 && afterAuth) {
      setAccountInfo((prev) => ({
        ...prev,
        accountNumber: DUMMY.ACCOUNT_NUMBER,
        mobileNumber: DUMMY.PHONE_NUMBER,
        customerPIN: DUMMY.CLIENT_PIN
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
            <h3>Account Inquiry</h3>
            {phase !==1 &&
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
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{accountInfoMap.mobileNumber.label}
                    </th>
                    <td><input type='number' name={accountInfoMap.mobileNumber.name} value={accountInfo.mobileNumber}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                      <button onClick={handleShow} className='btn_l on'>Submit</button>
                    </td>
                  </tr>
                  {
                    afterAuth &&
                    <>
                      <tr>
                        <th scope='row' className='noLine'>{accountInfoMap.accountNumber.label}</th>
                        <td>
                          <select name={'accountNumber'} value={accountInfo.accountNumber}>
                            <option value={DUMMY.ACCOUNT_NUMBER}>{DUMMY.ACCOUNT_NUMBER}</option>
                            <option value={'1111-2222-1234'}>1111-2222-1234</option>
                            <option value={'2222-1111-4321'}>2222-1111-4321</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th scope='row' className='noLine'>Customer Approval Callback URL</th>
                        <td>
                          <input type='password' name={accountInfoMap.customerPIN.name} value={accountInfo.customerPIN}
                                 onChange={handleInputJoinInfoChange} className='w50p'/>
                        </td>
                      </tr>
                    </>
                  }

                  </tbody>
                </table>
              </div>
              :
              phase === 1 &&
              <>
              <div className='tableBox'>
                <table className='form'>
                  <colgroup>
                    <col style={{ width: '180px' }}/>
                  </colgroup>
                  <tbody>
                  <tr>
                    <th scope='row'>{accountInfoMap.accountNumber.label}</th>
                    <td>
                      <input type='text' name={accountInfoMap.accountNumber.name} value={accountInfo.accountNumber}
                             onChange={handleInputJoinInfoChange} readOnly={true}
                             className='w50p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>{accountInfoMap.balance.label}</th>
                    <td><input type='text' name={accountInfoMap.balance.name} value={Util.numberWithCommas(accountInfo.balance)}
                               onChange={handleInputJoinInfoChange} className='w50p money' readOnly={true}/>&nbsp;&nbsp;d</td>

                  </tr>
                  </tbody>
                </table>
              </div>
              <TableComponent
              dataProps={(new NoticeList()).getMapToNoticeListData()}
              totalCount={4}
              />

              <Pagination currentPage={1} totalCount={4} onChange={undefined}/>
              </>
            }
            <div className='btnArea'>
              {phase === 0 ?
                <button onClick={handleSubmit} className='btn_l on'>Inquiry Account</button>
                : <>
                  <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Send Inquiry Result To Customer</button>&nbsp;
                  <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Print Inquiry Result</button>&nbsp;
                  <button onClick={handleCancel} className='btn_l'>To Main</button>
                </>
              }
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default ShowAccount;
