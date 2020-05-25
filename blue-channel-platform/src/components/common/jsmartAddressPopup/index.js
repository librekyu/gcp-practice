/**
 * 주소검색 팝업창
 * */
import React, { useCallback } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Overlay } from '../../../../static/css/globalStyle';

/** global kakao */
const jsmartAddressPopup = (props) => {
  const { active } = props;

  /** 취소, X 클릭 */
  const handleClosePopup = useCallback((e) => {
    props.onClose();
  }, []);

  /** 확인 클릭 */
  const handleComplete = useCallback((e) => {
    props.onComplete('입력 데이터 전달');
  }, []);

  const searchComplete = useCallback((data, result) => {
    const returnData = {
      ...data,
      latitude: result[0].y,
      longitude: result[0].x,
      dongName: result[0].address.region_3depth_h_name
    };
    props.onComplete(returnData);
  }, []);

  /** 주소 -> 위도,경도 변환 */
  const convertAddressToLatLng = useCallback((data) => {
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(data.address, (result, status) => {
      // 정상적으로 검색이 완료됐으면
      searchComplete(data, result);
    });
  }, []);

  /** 주소검색 관련 START */
  const handleAddress = useCallback((data) => {
    convertAddressToLatLng(data);
  }, []);

  return (
    <>
      <div id="modal_placeForm" className={`modalWrap ${active ? 'active' : ''} small`}>
        <div className="modalTitle">
          <h4>주소 검색</h4>
          <a className="btn_modalClose" onClick={handleClosePopup}>창닫기</a>
        </div>
        <div className="modalContent">
          <DaumPostcode
            onComplete={handleAddress}
          />
        </div>
      </div>
      <Overlay show={active} />
    </>
  );
};

export default jsmartAddressPopup;
