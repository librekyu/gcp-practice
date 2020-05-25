import React, { useCallback, useEffect, useRef, useState } from 'react';
import AddressSearchInput from '../../../../src/components/common/userAddressSearchInput';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import DUMMY from '../../../../src/common/dummyConst';
import Util from '../../../../src/common/util';
import LOADING_CONSTANT from '../../../../src/common/constantLoading';

const CreateCard = () => {

  const createCardInfoMap = {
    identification: {
      name: 'identification',
      label: 'Identification'
    },
    applicationSubmit: {
      name: 'applicationSubmit',
      label: 'Application'
    },
    userName: {
      name: 'userName',
      label: 'Name'
    },
    birth: {
      name: 'birth',
      label: 'Birth'
    },
    expiration: {
      name: 'expiration',
      label: 'Expiration'
    },
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Mobile Phone Number'
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
      name: 'Agent OTP',
      label: 'Agent OTP'
    },
    customerPIN: {
      name: 'customerPIN',
      label: 'Customer Approval Callback URL'
    }
  };

  const initialJoinAccountInfo = {
    identification: '',
    applicationSubmit: '',
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
    scrollTo(0,0);
  }, [phase]);

  const handleInputJoinInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setJoinInfo((prev) => ({
      ...prev,
      [name]: name === createCardInfoMap.mobileNumber.name ? Util.numberWithoutSpace(value) : value
    }));
  }, [joinInfo]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    phase === 0 && setPhase(1);

    if(phase === 1){
      setShowLoading(true);
      setLoadingStatement(LOADING_CONSTANT.SENDING_DATA_N_SIGN_UP_CARD);
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
        applicationSubmit: DUMMY.FILE_NAME,
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
          name: createCardInfoMap.identification.name,
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
          name: createCardInfoMap.applicationSubmit.name,
          value: file.name
        }
      });
    };

    reader.readAsDataURL(file);

  }, []);

  const renderFileList = useCallback(() => {
    return (
      <label>{joinInfo.applicationSubmit}</label>);
  }, [joinInfo.applicationSubmit]);

  const requireStyle = {
    fontWeight: 'bold',
    color: '#ed1c24'
  };

  return (
    <>
      <div className='inner'>
        <div id='contents' className='noLnb'>
          <div className='subTop'>
            <h3>Card Application/new</h3>
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
              <div className='tableBox'>
                <table className='form'>
                  <colgroup>
                    <col style={{ width: '180px' }}/>
                  </colgroup>
                  <tbody>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.identification.label}
                    </th>
                    <td>
                      <input type={'file'} style={{ display: 'none' }} ref={imageRef} onChange={onChangeImageFile}
                             accept={'image/png, image/jpeg, image/jpg'}/>
                      {joinInfo.identification ? <img src={joinInfo.identification} alt={''}/> :
                        <div className="imgInsertBox w50p h300" onClick={onClickAddIdentification}><span
                          className="bg">Identification</span></div>}&nbsp;
                      <br/>
                      <button className={'btn_l'} onClick={onClickAddIdentification}>Select Identification File</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.applicationSubmit.label}
                    </th>
                    <td>
                      <input type={'file'} style={{ display: 'none' }} ref={fileRef} onChange={onChangeFileList}/>
                      {renderFileList()}&nbsp;
                      <button className={'btn_l'} onClick={onClickAddAttachment}>Select Application File</button>
                    </td>
                  </tr>
                  <tr>
                    <th><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.userName.label}</th>
                    <td><input type='text' name={createCardInfoMap.userName.name} value={joinInfo.userName}
                               onChange={handleInputJoinInfoChange} className='w50p'/></td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.birth.label}</th>
                    <td><input type='text' name={createCardInfoMap.birth.name} value={joinInfo.birth}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.expiration.label}</th>
                    <td><input type='text' name={createCardInfoMap.expiration.name} value={joinInfo.expiration}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.nationality.label}
                    </th>
                    <td>
                      <select className={'w20p'} onChange={handleInputJoinInfoChange} name={createCardInfoMap.nationality.name}
                              value={joinInfo.nationality}>
                        <option value={''}>Pick Nationality</option>
                        <option value={'america'}>America</option>
                        <option value={'viet'}>Vietnam</option>
                        <option value={'china'}>China</option>
                        <option value={'kr'}>South Korea</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.mobileNumber.label}
                    </th>
                    <td><input type='text' name={createCardInfoMap.mobileNumber.name} value={Util.numberWithSpace(joinInfo.mobileNumber)}
                               onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                    </td>
                  </tr>

                  <tr>
                    <th scope='row' className='noLine'><span className='required'
                                                             style={requireStyle}>*</span>&nbsp;{createCardInfoMap.address.label}</th>
                    <td className='noLine'>
                      <input
                        type='text'
                        name={createCardInfoMap.address.name}
                        value={joinInfo.address || ''}
                        onChange={handleInputJoinInfoChange}
                        className='w70p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.detailAddress.label}
                    </th>
                    <td>
                      <input
                        type='text'
                        name={createCardInfoMap.detailAddress.name}
                        value={joinInfo.detailAddress}
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
                      <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.agentOTP.label}
                      </th>
                      <td>
                        <input type='password' name={createCardInfoMap.agentOTP.name} value={joinInfo.agentOTP}
                               onChange={handleInputJoinInfoChange}
                               className='w50p'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th><span className='required' style={requireStyle}>*</span>&nbsp;{createCardInfoMap.customerPIN.label}</th>
                      <td><input type='password' name={createCardInfoMap.customerPIN.name} value={joinInfo.customerPIN}
                                 onChange={handleInputJoinInfoChange} className='w50p'/></td>
                    </tr>
                    </tbody>
                  </table>
                </div> :
                <text>
                  Request card of <text className={'empha'}>{joinInfo.userName}</text> has been completed.
                  <br/><br/>Issuance will be notified via SMS after review.
                </text>

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

export default CreateCard;
