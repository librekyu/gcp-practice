import React, { useCallback, useState } from 'react';
import JsmartAddressPopup from '../jsmartAddressPopup';

/* global kakao */
const addressSearchInput = (props) => {
  // const [addressInput, setAddressInput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addressInput, setAddressInput, setInfo } = props;

  /** 주소검색 팝업 open */
  const openModal = useCallback((e) => {
    e.preventDefault();
    setModalIsOpen(true);
  }, []);

  /** 주소검색 팝업 취소 버튼 클릭 */
  const handleModalClose = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  /** 주소검색 완료*/
  const handleModalComplete = useCallback((data) => {
    // console.warn(data);
    /**
     *  사용자가 선택한 (지번||도로명) 주소데이터 반환
     * */
    if (data.userSelectedType === 'R') {
      setAddressInput(data.roadAddress);
      // joinInfo.address = addressInput;
    } else {
      setAddressInput(data.jibunAddress);
      // joinInfo.address = addressInput;
    }
    setInfo((prev) => ({
      ...prev,
      address: data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress,
      zoneCode: data.zonecode
    }));
    setModalIsOpen(false);
  }, [setAddressInput, setInfo]);
  return (
    <>
      <input
        type="text"
        name="address"
        value={addressInput}
        placeholder='주소 검색 눌러 입력주세요.'
        className="w300"
        onClick={openModal}
        readOnly
      />&nbsp;&nbsp;
      <button onClick={openModal} className="btn_inline black">주소검색</button>
      {
        modalIsOpen ?
          <JsmartAddressPopup active={modalIsOpen} onClose={handleModalClose} onComplete={handleModalComplete} />
          : null
      }
    </>
  );
};

export default addressSearchInput;
