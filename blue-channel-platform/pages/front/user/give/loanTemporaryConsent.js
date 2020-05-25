import React, { useCallback, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import DUMMY from '../../../../src/common/dummyConst';
import Util from '../../../../src/common/util';
import LOADING_CONSTANT from '../../../../src/common/constantLoading';

const LoanTemporaryConsent = () => {

  const loanTemporaryConsentInfoMap = {
    identification: {
      name: 'identification',
      label: 'Identification'
    },
    attachment: {
      name: 'attachment',
      label: 'Application'
    },
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Mobile Phone Number'
    },
    inputAccountNumber: {
      name: 'inputAccountNumber',
      label: 'Deposit Account Number'
    },
    loanMoney: {
      name: 'loanMoney',
      label: 'Loan Amount'
    },
    maturity: {
      name: 'maturity',
      label: 'Maturity'
    },
    agent: {
      name: 'agent',
      label: 'Agent'
    },
    agentOTP: {
      name: 'Agent OTP',
      label: 'Agent OTP'
    },
    customerPIN: {
      name: 'customerPIN',
      label: 'Customer Approval Callback URL'
    }
  };

  const initialLoanTemporaryConsentInfo = {
    identification: '',
    attachment: '',
    mobileNumber: '',
    inputAccountNumber: '',
    loanMoney: '',
    maturity: '',
    agent: DUMMY.AGENT,
    agentOTP: '',
    customerPIN: '',
  };

  const fileRef = useRef();
  const imageRef = useRef();

  const [phase, setPhase] = useState(0);
  const [loanTempConsentInfo, setLoanTempConsentInfo] = useState(initialLoanTemporaryConsentInfo);              // 회원입력정보
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');

  useEffect(() => {
    scrollTo(0,0);
  }, [phase]);

  useEffect(() => {
    return () => {
      setPhase(0);
      setLoadingStatement('');
      setLoanTempConsentInfo(initialLoanTemporaryConsentInfo);
    };
  }, []);

  const handleInputJoinInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setLoanTempConsentInfo((prev) => ({
      ...prev,
      [name]:
        (name === loanTemporaryConsentInfoMap.mobileNumber.name)
          ? Util.numberWithoutSpace(value)
          : (name === loanTemporaryConsentInfoMap.loanMoney.name)
          ? Util.numberWithoutCommas(value)
          : value
    }));
  }, [loanTempConsentInfo]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(LOADING_CONSTANT.SIGNING_UP_LOAN);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 3000);
    }
  }, [loanTempConsentInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setLoanTempConsentInfo(initialLoanTemporaryConsentInfo);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if (phase === 0) {
      setLoanTempConsentInfo((prev) => ({
        ...prev,
        identification: DUMMY.IDENTIFICATION_IMG,
        attachment: DUMMY.FILE_NAME,
        mobileNumber: DUMMY.PHONE_NUMBER,
        inputAccountNumber: DUMMY.IN_ACCOUNT_BANK_NUMBER,
        loanMoney: DUMMY.PRINCIPAL_PAY_MONEY,
        maturity: DUMMY.MATURITY,
      }));
    }

    phase === 1 && setLoanTempConsentInfo((prev) => ({
      ...prev,
      agentOTP: DUMMY.AGENT_OTP,
      customerPIN: DUMMY.CLIENT_PIN,
    }));
  }, [phase]);

  const onClickAddIdentification = useCallback((e) => {
    e.preventDefault();
    imageRef.current.click();
  }, []);

  const onChangeImageFile = useCallback((e) => {
    const reader = new FileReader();
    const image = e.target.files[0];

    if (!image) return;

    reader.onloadend = (e) => {
      handleInputJoinInfoChange({
        target: {
          name: loanTemporaryConsentInfoMap.identification.name,
          value: e.target.result
        }
      });
    };

    reader.readAsDataURL(image);

  }, []);

  const onClickAddAttachment = useCallback((e) => {
    e.preventDefault();
    fileRef.current.click();
  }, []);

  const onChangeFileList = useCallback((e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (!file) return;

    reader.onloadend = (e) => {
      handleInputJoinInfoChange({
        target: {
          name: loanTemporaryConsentInfoMap.attachment.name,
          value: file.name
        }
      });
    };

    reader.readAsDataURL(file);

  }, []);

  const renderFileList = useCallback(() => {
    return (
      <label>{loanTempConsentInfo.attachment}&nbsp;</label>);
  }, [loanTempConsentInfo.attachment]);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>Loan Temporary Consent</h3>
          </div>
          <form>
            {phase !== 2 &&
            <button
              className={'btn_l demo'}
              onClick={onClickDemo}>demo
            </button>
            }

            <br/>
            {phase === 0 ?
              <><div className='tableBox'>
                <table className='form'>
                  <colgroup>
                    <col style={{ width: '180px' }}/>
                  </colgroup>
                  <tbody>
                  <tr>
                    <th scope='row'><span className='required'
                                          style={requireStyle}>*</span>&nbsp;{loanTemporaryConsentInfoMap.identification.label}
                    </th>
                    <td>
                      <input type={'file'} style={{ display: 'none' }} ref={imageRef} onChange={onChangeImageFile}
                             accept={'image/png, image/jpeg, image/jpg'}/>
                      {loanTempConsentInfo.identification ? <img src={loanTempConsentInfo.identification} alt={''}/> :
                        <div className="imgInsertBox w50p h300" onClick={onClickAddIdentification}><span
                          className="bg">Identification</span></div>}&nbsp;
                      <br/>
                      <button className={'btn_l'} onClick={onClickAddIdentification}>Select Identification File</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required'
                                          style={requireStyle}>*</span>&nbsp;{loanTemporaryConsentInfoMap.attachment.label}
                    </th>
                    <td>
                      <input type={'file'} style={{ display: 'none' }} ref={fileRef} onChange={onChangeFileList} accept={'application/pdf'}/>
                      {renderFileList()}
                      <button className={'btn_l'} onClick={onClickAddAttachment}>Select Loan Application</button>
                    </td>
                  </tr>
                  <tr>
                    <th><span className='required' style={requireStyle}>*</span>&nbsp;{loanTemporaryConsentInfoMap.mobileNumber.label}</th>
                    <td><input type='text' name={loanTemporaryConsentInfoMap.mobileNumber.name}
                               value={Util.numberWithSpace(loanTempConsentInfo.mobileNumber) || ''}
                               onChange={handleInputJoinInfoChange} className='w50p'/></td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required'
                                          style={requireStyle}>*</span>&nbsp;{loanTemporaryConsentInfoMap.inputAccountNumber.label}</th>
                    <td>
                      <input type='text' name={loanTemporaryConsentInfoMap.inputAccountNumber.name}
                             value={loanTempConsentInfo.inputAccountNumber || ''}
                             onChange={handleInputJoinInfoChange}
                             className='w50p'/>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required'
                                          style={requireStyle}>*</span>&nbsp;{loanTemporaryConsentInfoMap.loanMoney.label}</th>
                    <td><input type='text' name={loanTemporaryConsentInfoMap.loanMoney.name}
                               value={Util.numberWithCommas(loanTempConsentInfo.loanMoney) || ''}
                               onChange={handleInputJoinInfoChange} className='w50p money'/>&nbsp;&nbsp;d&nbsp;&nbsp;&nbsp;&nbsp;
                      <span className='explanEx'>Only Digit</span>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required'
                                          style={requireStyle}>*</span>&nbsp;{loanTemporaryConsentInfoMap.maturity.label}
                    </th>
                    <td>
                      <select className={'w20p'} onChange={handleInputJoinInfoChange} name={loanTemporaryConsentInfoMap.maturity.name}
                              value={loanTempConsentInfo.maturity || ''}>
                        <option value={1}>1 year</option>
                        <option value={2}>2 years</option>
                        <option value={3}>3 years</option>
                        <option value={5}>5 years</option>
                        <option value={10}>10 years</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Agent</th>
                    <td><b>{DUMMY.AGENT}</b></td>
                  </tr>
                  </tbody>
                </table>
              </div>
                <div className={'subTop'}>
                  <h3>Apply for a loan.</h3>
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
                      <th scope='row'>Agent</th>
                      <td><b>{DUMMY.AGENT}</b></td>
                    </tr>
                    <tr>
                      <th scope='row'><span className='required'
                                            style={requireStyle}>*</span>&nbsp;{loanTemporaryConsentInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={loanTemporaryConsentInfoMap.agentOTP.name} value={loanTempConsentInfo.agentOTP || ''}
                               onChange={handleInputJoinInfoChange}
                               className='w50p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{loanTemporaryConsentInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={loanTemporaryConsentInfoMap.customerPIN.name}
                                 value={loanTempConsentInfo.customerPIN || ''}
                                 onChange={handleInputJoinInfoChange} className='w50p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <div>
                  <text className={'empha'}>
                    Application loan has been completed.
                  </text>
                  <br/><br/>
                  <h3 style={{ color: '#0072bc' }}>Loan screening takes about 5~20 days.
                    <br/>The progress will be notified by SMS.</h3>
                </div>

            }

            {phase !== 2 ?
              <>
                <br/><br/>
                <div className='btnArea'>
                  <button onClick={handleSubmit} className='btn_l on'>Next</button>
                  &nbsp;
                  <button onClick={handleCancel} className='btn_l'>Cancel</button>
                </div>
              </>
              :
              <div className='btnArea'>
                <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Print Temporary Consent Result</button>&nbsp;
                <button onClick={(e) => {e.preventDefault()}} className='btn_l on'>Send Temporary Consent Result To Customer</button>&nbsp;
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

export default LoanTemporaryConsent;
