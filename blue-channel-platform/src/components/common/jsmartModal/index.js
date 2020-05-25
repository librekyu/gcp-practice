import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay } from '../../../../static/css/globalStyle';
import CONST from '../../../common/globalConst';

/**
 * @param param
 *  {
 *  isOpen: boolean,
 *  modalType: '',
 *  title: '',
 *  contents: '',
 *  closeEvent: null || function,
 *  confirmEvent: null || function
 *  }
 */
const ModalComponent = ({ param }) => {
  const { isOpen, modalType, closeEvent } = param;

  const modal = useCallback((param) => {
    const { modalType, closeEvent, title, contents, confirmEvent } = param;

    switch (modalType) {
      case CONST.MODAL_TYPE.CONFIRM:
        return <div id="modal_confirm" className="modalWrap alert active">
          <div className="modalTitle">
            <h4>{title || CONST.COMMON_WORDS.INFO}</h4>
            <a className="btn_modalClose" onClick={closeEvent}>창닫기</a>
          </div>
          <div className="modalContent">
            <p className="infoText">
              {contents
              || CONST.COMMON_MESSAGE.SAVE_SUCCESS}
            </p>
            <div className="btnArea">
              <a className="btn_b on" onClick={confirmEvent}>확인</a> &nbsp;&nbsp;
              <a className="btn_b btn_modalClose" onClick={closeEvent}>취소</a>
            </div>
          </div>
        </div>;
      case CONST.MODAL_TYPE.SUCCESS:
        return <div id="modal_confirm" className="modalWrap alert active">
          <div className="modalTitle">
            <h4>{title || CONST.COMMON_WORDS.INFO}</h4>
            <a className="btn_modalClose" onClick={closeEvent}>창닫기</a>
          </div>
          <div className="modalContent">
            <p className="infoText">
              {contents
                || CONST.COMMON_MESSAGE.SAVE_SUCCESS}
            </p>
            <div className="btnArea">
              <a className="btn_b on" onClick={confirmEvent}>확인</a> &nbsp;&nbsp;
            </div>
          </div>
        </div>;
      case CONST.MODAL_TYPE.FAILURE:
        return <div id="modal_alert" className="modalWrap alert active">
          <div className="modalTitle">
            <h4>{title || CONST.COMMON_MESSAGE.EMPTY_MESSAGE}</h4>
            <a className="btn_modalClose" onClick={closeEvent}>창닫기</a>
          </div>
          <div className="modalContent">
            <p className="alertText">{contents || CONST.COMMON_MESSAGE.EMPTY_MESSAGE}</p>
            <div className="btnArea">
              <a className="btn_b black btn_modalClose" onClick={closeEvent}>닫기</a>
            </div>
          </div>
        </div>;
      default:
        break;
    }
  }, [modalType]);

  return (
    <>
      {isOpen
        ? <>{modal(param)}
          {/*<Overlay show={isOpen} onClick={closeEvent} />*/}
          <Overlay show={isOpen} />
        </>
        : null}
    </>
  );
};

ModalComponent.propType = {
  param: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    modalType: PropTypes.string,
    closeEvent: PropTypes.func,
    confirmEvent: PropTypes.func,
    title: PropTypes.string,
    contents: PropTypes.string,
  })
};

export default ModalComponent;
