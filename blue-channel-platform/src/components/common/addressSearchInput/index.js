import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import JsmartAddressPopup from '../jsmartAddressPopup';
import Util from '../../../common/util';
/**
 * return
 {
  address   주소
  zonecode  우편번호
  dongName  동이름
  dongCode  동코드
  latitude  위도
  longitude 경도
 }
 * */
/* global kakao */
const adressSearchInput = (props) => {
  const { dongCodeList } = useSelector((state) => state.deviceCommonCode);
  const [addressInput, setAddressInput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setAddressInput(props.searchAddress);
  }, [props.searchAddress]);

  /** 주소검색 팝업 open */
  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  /** 주소검색 팝업 취소 버튼 클릭 */
  const handleModalClose = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  /** 주소검색 완료 */
  const handleModalComplete = useCallback((data) => {
    // 1. 주소
    let address = data.address || data.jibunAddress;

    // 2. 우편번호
    const zonecode = data.zonecode;

    // 3. 동이름
    const dongName = data.dongName;
    // 4. 동코드
    const dongCode = data.dongName && Util.convertDongCode(dongCodeList, data.dongName);

    setModalIsOpen(false);
    props.handleAddressSearch({
      address,
      zonecode,
      dongName,
      dongCode,
      latitude: data.latitude,
      longitude: data.longitude
    });
  }, [dongCodeList, props]);

  return (
    <>
      <input type="text" name="address" value={addressInput || ''} className="w300" onClick={openModal} readOnly />&nbsp;
      <button onClick={openModal} className="btn_inline black">주소검색</button>
      {modalIsOpen
        ? <JsmartAddressPopup active={modalIsOpen} onClose={handleModalClose} onComplete={handleModalComplete} />
        : null}
    </>
  );
};

export default adressSearchInput;
