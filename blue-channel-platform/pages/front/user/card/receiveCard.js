import React, { useCallback, useEffect, useRef, useState } from 'react';
import AddressSearchInput from '../../../../src/components/common/userAddressSearchInput';
import Router from 'next/router';
import { USER_CONST } from '../../../../src/common/globalConst';
import Loading from '../../../../src/components/user/common/Loading';
import DUMMY from '../../../../src/common/dummyConst';
import Util from '../../../../src/common/util';
import LOADING_CONSTANT from '../../../../src/common/constantLoading';

const ReceiveCard = () => {

  const receiveCardInfoMap = {
    mobileNumber: {
      name: 'mobileNumber',
      label: 'Mobile Phone Number'
    },
    identification: {
      name: 'identification',
      label: 'Identification'
    },
    idPicture: {
      name: 'idPicture',
      label: 'Identification Picture'
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

  const initialReceiveCardInfo = {
    mobileNumber: '',
    identification: '',
    idPicture: '',
    agentOTP: '',
    customerPIN: '',
  };

  const imageRef = useRef();

  const [phase, setPhase] = useState(0);
  const [receiveCardInfo, setReceiveCardInfo] = useState(initialReceiveCardInfo);              // 회원입력정보
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState('');
  const [afterAuth, setAfterAuth] = useState(false);

  useEffect(() => {
    scrollTo(0,0);
  }, [phase]);

  const handleInputJoinInfoChange = useCallback((e) => {
    const { name, value } = e.target;

    setReceiveCardInfo((prev) => ({
      ...prev,
      [name]: name === receiveCardInfoMap.mobileNumber.name ? Util.numberWithoutSpace(value) : value
    }));
  }, [receiveCardInfo]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if(phase === 0 && afterAuth){
      setShowLoading(true);
      setLoadingStatement(LOADING_CONSTANT.SENDING_DATA_N_RECEIVE_CARD);
      setTimeout((e) => {
        setShowLoading(false);
        setPhase(1);
      }, 3000);
    }
  }, [receiveCardInfo, phase, afterAuth]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    Router.push(`${USER_CONST.BASE_ROUTER_PATH}/main`);
    setPhase(0);
    setLoadingStatement('');
    setReceiveCardInfo(initialReceiveCardInfo);
  }, []);

  const onClickDemo = useCallback((e) => {
    e.preventDefault();
    !afterAuth && setReceiveCardInfo((prev) => ({
      ...prev,
      mobileNumber: DUMMY.PHONE_NUMBER,
    }));
    if (afterAuth && phase === 0) {
      setReceiveCardInfo((prev) => ({
        ...prev,
        identification: DUMMY.IDENTIFICATION_IMG,
        idPicture: DUMMY.ID_PICTURE_IMG,
        agentOTP: DUMMY.AGENT_OTP,
        customerPIN: DUMMY.CLIENT_PIN,
      }));
    }
  }, [phase, afterAuth]);

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
          name: receiveCardInfoMap.identification.name,
          value: e.target.result
        }
      });
    };

    reader.readAsDataURL(image);

  }, []);

  const onClickAddAttachment = useCallback((e) => {
    e.preventDefault();
    setReceiveCardInfo((prev) => ({
      ...prev,
      idPicture: DUMMY.ID_PICTURE_IMG
    }));
  }, []);

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
            <h3>Receive Card</h3>
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
                  {!afterAuth && <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{receiveCardInfoMap.mobileNumber.label}
                    </th>
                      <td><input type='number' name={receiveCardInfoMap.mobileNumber.name} value={receiveCardInfo.mobileNumber}
                                 onChange={handleInputJoinInfoChange} className='w50p'/>&nbsp;&nbsp;
                        <button onClick={handleShow} className='btn_l on'>Submit</button>
                      </td>
                  </tr>}
                  {afterAuth && <><tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{receiveCardInfoMap.identification.label}
                    </th>
                    <td>
                      <input type={'file'} style={{ display: 'none' }} ref={imageRef} onChange={onChangeImageFile}
                             accept={'image/png, image/jpeg, image/jpg'}/>
                      {receiveCardInfo.identification ? <img src={receiveCardInfo.identification} alt={''}/> :
                        <div className="imgInsertBox w50p h200" onClick={onClickAddIdentification}><span
                          className="bg">Identification</span></div>}&nbsp;
                      <br/>
                      <button className={'btn_l'} onClick={onClickAddIdentification}>Select Identification File</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{receiveCardInfoMap.idPicture.label}
                    </th>
                    <td>
                      {receiveCardInfo.idPicture? <img src={receiveCardInfo.idPicture} alt={''} className={'h200'}/>
                        : <div className="imgInsertBox w50p h200" onClick={onClickAddIdentification}><span className={'bg'}>ID Picture</span></div> }&nbsp;
                      <br/>
                      <button className={'btn_l'} onClick={onClickAddAttachment}>Select ID Picture</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'><span className='required' style={requireStyle}>*</span>&nbsp;{receiveCardInfoMap.agentOTP.label}
                    </th>
                    <td>
                      <input type='password' name={receiveCardInfoMap.agentOTP.name} value={receiveCardInfo.agentOTP}
                             onChange={handleInputJoinInfoChange}
                             className='w50p'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th><span className='required' style={requireStyle}>*</span>&nbsp;{receiveCardInfoMap.customerPIN.label}</th>
                    <td><input type='password' name={receiveCardInfoMap.customerPIN.name} value={receiveCardInfo.customerPIN}
                               onChange={handleInputJoinInfoChange} className='w50p'/></td>
                  </tr></>}
                  </tbody>
                </table>
              </div>
              :
                <text>Card has been received to customer.
                </text>

            }

            {phase !== 1 ?
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

export default ReceiveCard;
