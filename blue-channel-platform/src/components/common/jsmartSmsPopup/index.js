/** 문자 등록 팝업창 */
import React, { useCallback, useState } from 'react';
import { Overlay } from '../../../../static/css/globalStyle';
import JsmartSelect from '../jsmartSelect';
import { CommonCodeList } from '../../../models/admin/commonCode';
import CONST, { ADMIN_CONST } from '../../../common/globalConst';
import Util from '../../../common/util';
import { useModalParam } from '../../../common/customHooks';
import { useDispatch } from 'react-redux';

/**
 * @param active {boolean} : 해당 모달 창 활성화 여부
 * @param onClose {function} : 해당 모달 창 닫는 함수
 * @param deviceInfo {Object} : 문자 등록에 필요한 정보가 담겨진 객체
 *  {
 *    * deviceId {String} : 선택한 센서의 ID
 *    * sensorType {String}: 선택한 센서의 타입 (미세먼지, 기울기, 크랙)
 *    messageId {String} : 수정할 메시지 ID
 *    isPost {boolean} : 등록 여부. false 면 수정
 *  }
 * @author kimhg
 * */
const JsmartSmsPopup = ({ active, onClose, deviceInfo }) => {

  const isPost = deviceInfo.isPost;
  const dispatch = useDispatch();
  const [setModalParam] = useModalParam({});

  /** 취소, X 클릭 */
  const handleClosePopup = useCallback((e) => {
    onClose();
  }, []);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsPersonCount, setSmsPersonCount] = useState([]);

  const [messageLength, setMessageLength] = useState(0); // message length
  const [messageContent, setMessageContent] = useState('');

  const [forecastStandard, setForecastStandard] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeNumber = useCallback((e) => {
    setPhoneNumber(e.target.value);
  }, []);

  const addSmsPersonCount = useCallback((e) => {
    e.preventDefault();
    if(smsPersonCount.length >= 5){
      setErrorMessage(CONST.SAVE_ERROR_MESSAGE.MESSAGE_MANAGEMENT.NO_MORE_5_PERSON);
      return ;
    }

    setSmsPersonCount((prev) => {
      let returnArray = JSON.parse(JSON.stringify(prev));

      returnArray.push(({ number: phoneNumber }));
      return returnArray;

    });
    setPhoneNumber('');
  }, [smsPersonCount,phoneNumber]);

  const removeSmsPersonCount = useCallback((e, index) => {
    e.preventDefault();
    setSmsPersonCount((prev) => {
      let returnArray = JSON.parse(JSON.stringify(prev));

      returnArray.splice(index, 1);
      return returnArray;
    });
  }, []);

  const handleChangeForecastStandard = useCallback((e) => {
    const {name, value} = e.target;
    setForecastStandard(value);
  }, []);

  const renderSmsPersonMobileNumber = useCallback(() => {
    return smsPersonCount.map((person, index) => {
      return (
        <form key={index} onSubmit={(e) => removeSmsPersonCount(e, index)}>
          <div className="divGroup" style={{ padding: '2px' }}>
            <div className="w50p">
              <input
                type="text"
                name={`sendNumber${index}`}
                className="w100p"
                value={person.number}
                readOnly={true}
              />
            </div>
            <div className='w10p'>
              <input type='submit' className={'btn_inline black'} value={'-'}/>
            </div>
          </div>
        </form>
      );
    });
  }, [smsPersonCount]);

  /** 문자 입력 내용 변환 이벤트 */
  const onChangeMessage = useCallback((e) => {
    const { value } = e.target;
    const byteLength = Util.strByteLength(value);
    if (byteLength > 2000) {
      setErrorMessage(CONST.SAVE_ERROR_MESSAGE.MESSAGE_MANAGEMENT.NO_MORE_2000_BYTES);
      return;
    }
    setMessageLength(byteLength);
    setMessageContent(value);
  }, []);

  const handleOnClickSave = useCallback(() => {
    if(!forecastStandard) {
      setErrorMessage(CONST.SAVE_ERROR_MESSAGE.MESSAGE_MANAGEMENT.NO_SELECT_MESSAGE_SENDING_STANDARD);
    }
    else if(smsPersonCount.length < 1) {
      setErrorMessage(CONST.SAVE_ERROR_MESSAGE.MESSAGE_MANAGEMENT.NEED_MORE_THAN_1_PERSON);
    }
    else if(!messageContent) {
      setErrorMessage(CONST.SAVE_ERROR_MESSAGE.MESSAGE_MANAGEMENT.NO_MESSAGE_CONTENTS);
    }
    else{
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, ()=> setModalParam(false), null, CONST.COMMON_WORDS.ERROR, CONST.COMMON_MESSAGE.FAILURE_SAVE);
    }
  }, [forecastStandard, messageContent, smsPersonCount]);

  return (
    <>
      <div id="modal_placeForm" className={`modalWrap ${active ? 'active' : ''} small`}>
        <div className="modalTitle">
          <h4>문자 {isPost ? '등록' : '수정'}</h4>
          <a className="btn_modalClose" onClick={handleClosePopup}>창닫기</a>
        </div>
        <div className="modalContent">
          <div className="smsMessage dashboardItem">
            <div className={'divGroup'}>&nbsp;&nbsp;
              <b>문자발송 기준 선택</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <JsmartSelect
                name='forecastStandard'
                options={deviceInfo.sensorType === CONST.MEASUREMENT_TYPE.FINE_DUST ? CONST.STATUS_TYPE.ATMOSPHERE: CONST.STATUS_TYPE.BUILDING}
                onChange={handleChangeForecastStandard}
                selectedValue={forecastStandard}
                defaultSelect={{
                  name: '문자발송 기준 선택',
                  value: ''
                }}
              />
            </div>
            <br/>
            <div className="tableTitle">
              &nbsp;<img src={`${ADMIN_CONST.BASE_IMAGE_PATH}/common/icon_title_sms1.png`} alt=""/> 설정 문자 목록
            </div>
            <textarea
              name="messageContent"
              className="h200"
              placeholder="문자내용 입력"
              value={messageContent}
              onChange={onChangeMessage}
            >
                </textarea>
            {messageLength < 80
              ? <span className="byte">입력문자 용량 {messageLength}byte/80byte (SMS)</span>
              : <span className="byte">입력문자 용량 {messageLength}byte/2000byte (LMS)</span>}
            <br/>
            <div className="smsMacro">
              <form onSubmit={addSmsPersonCount}>
                <div className="divGroup">
                  <div className="w30p">
                    휴대폰 번호
                  </div>
                  <div className="w50p">
                    <input
                      type="text"
                      name='sendNumber'
                      className="w100p"
                      placeholder="숫자만 입력"
                      value={phoneNumber}
                      onChange={handleChangeNumber}
                    />
                  </div>
                  <div className='w10p'>
                    <input className={'btn_inline black'} type={'submit'} value={'+'}/>
                  </div>
                </div>
              </form>

              <div className='h100' style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: '2px'
              }}>
                {Array.isArray(smsPersonCount) && smsPersonCount.length > 0 && renderSmsPersonMobileNumber()}
              </div>
              {errorMessage && <div><span className={'red'}>{errorMessage}</span></div>}
              <a className="btn_inline black w100p" onClick={handleOnClickSave}>{isPost? '등록' : '수정'}</a>
            </div>
          </div>
        </div>
      </div>
      <Overlay show={active}/>
    </>
  );
};

export default JsmartSmsPopup;
