import React, { useCallback, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import DUMMY from '../../../../src/common/dummyConst';
import Util from '../../../../src/common/util';
import LOADING_CONSTANT from '../../../../src/common/constantLoading';

const CreateAccount = () => {

  const joinAccountInfoMap = {
    identification: {
      name: 'identification',
      label: 'Identification'
    },
    attachment: {
      name: 'attachment',
      label: 'Attachment'
    },
    id: {
      name: 'id',
      label: 'SO No'
    },
    userName: {
      name: 'userName',
      label: 'Name'
    },
    birth: {
      name: 'birth',
      label: 'Birthday'
    },
    expiration: {
      name: 'expiration',
      label: 'Exp day'
    },
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Tel No.'
    },
    address: {
      name: 'address',
      label: 'Address'
    },
    detailAddress: {
      name: 'detailAddress',
      label: 'Detail Address'
    },
    nationality: {
      name: 'nationality',
      label: 'Nationality'
    },
    agentOTP: {
      name: 'agentOTP',
      label: 'Agent OTP'
    },
    customerPIN: {
      name: 'customerPIN',
      label: 'Customer Mobile PIN(SMS)'
    }
  };

  const initialJoinAccountInfo = {
    identification: '',
    attachment: '',
    id: '',
    userName: '',
    mobileNumber: '',
    birth: '',
    address: '',
    detailAddress: '',
    nationality: '',
    agentOTP: '',
    customerPIN: '',
  };

  const fileRef = useRef();
  const imageRef = useRef();

  const [phase, setPhase] = useState(0);
  const [joinInfo, setJoinInfo] = useState(initialJoinAccountInfo);              // 회원입력정보
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');

  useEffect(() => {
    return () => {
      setPhase(0);
      setLoadingStatement('');
      setJoinInfo(initialJoinAccountInfo);
    };
  }, []);

  useEffect(() => {
    scrollTo(0,0);
  }, [phase]);

  const handleInputJoinInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setJoinInfo((prev) => ({
      ...prev,
      [name]: name === joinAccountInfoMap.mobileNumber.name ? Util.numberWithoutSpace(value) : value
    }));
  }, [joinInfo]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);
    if (phase === 1) {
      setShowLoading(true);
      setLoadingStatement(LOADING_CONSTANT.SENDING_IDENTIFICATION);
      setTimeout((e) => {
        setLoadingStatement(LOADING_CONSTANT.CREATING_ACCOUNT);
      }, 2500);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(2);
      }, 5000);
    }
  }, [joinInfo, phase]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setJoinInfo(initialJoinAccountInfo);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    if (phase === 0) {
      setJoinInfo((prev) => ({
        ...prev,
        identification: DUMMY.IDENTIFICATION_IMG,
        attachment: DUMMY.FILE_NAME,
        id: DUMMY.ID,
        userName: DUMMY.NAME,
        mobileNumber: DUMMY.PHONE_NUMBER,
        expiration: DUMMY.EXPIRATION,
        birth: DUMMY.BIRTH,
        address: DUMMY.ADDRESS,
        detailAddress: DUMMY.DETAIL_ADDRESS,
        nationality: DUMMY.NATIONALITY,
      }));
    }

    phase === 1 && setJoinInfo((prev) => ({
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
          name: joinAccountInfoMap.identification.name,
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
          name: joinAccountInfoMap.attachment.name,
          value: file.name
        }
      });
    };

    reader.readAsDataURL(file);

  }, []);

  const renderFileList = useCallback(() => {
    return (
      <label>{joinInfo.attachment}</label>);
  }, [joinInfo.attachment]);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>Open Account</h3>
          </div>
          <form>
            {
              phase !== 2
              &&
              <div className='joinFormTitle left'>
                {phase !== 2 &&
                <button
                  className={'btn_l demo'}
                  onClick={onClickDemo}>demo
                </button>
                }
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
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.identification.label}
                    </th>
                    <td>
                      <input type={'file'} style={{ display: 'none' }} ref={imageRef} onChange={onChangeImageFile}
                             accept={'image/png, image/jpeg, image/jpg'}/>
                      {joinInfo.identification ? <img src={joinInfo.identification} alt={''}/> :
                        <div className="imgInsertBox w50p h300" onClick={onClickAddIdentification}><span
                          className="bg">Identification</span></div>}&nbsp;
                      <br/>
                      <button className={'btn_l'} onClick={onClickAddIdentification}>Add Identification</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.attachment.label}
                    </th>
                    <td>
                      <input type={'file'} style={{ display: 'none' }} ref={fileRef} onChange={onChangeFileList} accept={'application/pdf'}/>
                      {renderFileList()}&nbsp;
                      <button className={'btn_l'} onClick={onClickAddAttachment}>Add attachment</button>
                    </td>
                  </tr>
                  <tr>
                    <th><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.userName.label}</th>
                    <td><input type='text' name={joinAccountInfoMap.userName.name} value={joinInfo.userName || ''}
                               onChange={handleInputJoinInfoChange} className='w50p'/></td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.id.label}</th>
                    <td>
                      <input type='text' name={joinAccountInfoMap.id.name} value={joinInfo.id || ''}
                             onChange={handleInputJoinInfoChange}
                             className='w50p'/>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.birth.label}</th>
                    <td><input type='text' name={joinAccountInfoMap.birth.name} value={joinInfo.birth || ''}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.expiration.label}</th>
                    <td><input type='text' name={joinAccountInfoMap.expiration.name} value={joinInfo.expiration || ''}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.nationality.label}
                    </th>
                    <td>
                      <select className={'w20p'} onChange={handleInputJoinInfoChange} name={joinAccountInfoMap.nationality.name}
                              value={joinInfo.nationality || ''}>
                        <option value={'viet'}>Vietnam</option>
                        <option value={'america'}>America</option>
                        <option value={'ch'}>China</option>
                        <option value={'kr'}>Korea</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.mobileNumber.label}
                    </th>
                    <td><input type='text' name={joinAccountInfoMap.mobileNumber.name}
                               value={Util.numberWithSpace(joinInfo.mobileNumber) || ''}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row' className='noLine'><span className='required'
                                                             style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.address.label}</th>
                    <td className='noLine'>
                      <input
                        type='text'
                        name={joinAccountInfoMap.address.name}
                        value={joinInfo.address || ''}
                        onChange={handleInputJoinInfoChange}
                        className='w70p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.detailAddress.label}
                    </th>
                    <td>
                      <input
                        type='text'
                        name={joinAccountInfoMap.detailAddress.name}
                        value={joinInfo.detailAddress || ''}
                        onChange={handleInputJoinInfoChange}
                        className='w70p'
                      />
                    </td>
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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={joinAccountInfoMap.agentOTP.name} value={joinInfo.agentOTP || ''}
                               onChange={handleInputJoinInfoChange}
                               className='w50p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{joinAccountInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={joinAccountInfoMap.customerPIN.name} value={joinInfo.customerPIN || ''}
                                 onChange={handleInputJoinInfoChange} className='w50p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <div>
                  <text>
                    Request open account for <text className={'empha'}>{joinInfo.userName}</text>&nbsp;has been complete.
                  </text>
                  <br/><br/>
                  <h1 style={{ color: '#0072bc' }}>
                    When opening account is complete,
                    <br/><br/>
                    Sms will be send to {joinInfo.userName}
                    </h1>
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

export default CreateAccount;
