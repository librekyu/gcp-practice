/**
 *
 * */

import React, { useState, useEffect, useCallback } from 'react';
import AsideLowerLegendTable from '../../user/common/map/asideLowerLegendTable';

/** 맵 설정 */
const MAP_CONFIG = {
  ID: 'JSmartKakaoMap',

  // 클릭한 마커의 정보중 유일한 값인 Id의 파라미터 이름 기본값
  defaultClickedIdParamName: 'installationPlaceId',

  // 지도 중앙 위치(중랑구청)
  POS_CENTER_LAT: 37.5971,
  POS_CENTER_LNG: 127.09742,

  // 정책상 기본 축적 500m
  DEFAULT_MAP_LEVEL: 6,

  // x:y = 5:7 비율 유지
  MARKER_SIZE_X: 20,
  MARKER_SIZE_Y: 28,

  // X는 마커의 X축 크기의 절반, Y는 마커의 Y축과 일치
  MARKER_POS_X: 10,
  MARKER_POS_Y: 28,

  // 강조된 마커 옵션
  EMPHASIZED_MARKER_SIZE_X: 35,
  EMPHASIZED_MARKER_SIZE_Y: 49,

  EMPHASIZED_MARKER_POS_X: 17.5,
  EMPHASIZED_MARKER_POS_Y: 49,

};

/**
 * @param asideId : String -
 * @param className : String -
 * @param style : String -
 * @param markerItems : Array - 마커 데이터 배열
 *            markerItem : Object - {
 *                latitude - 위도(y),
 *                longitude - 경도(x),
 *                contents - 보여줄 오버레이에 대한 string 타입의 html,
 *              image - 마커 이미지 경로
 *          }
 * @param legend : Object - 지도에 보여줄 범례
 * @param markerClickEvent : function - 클릭한 마커에 대한 정보를 상단 컴포넌트에게 넘겨주는 콜백 함수
 * @param additionalOptions : Object - 추가 옵션. {
 *                  activateEmphasis : boolean - 클릭한 마커 강조 옵션
 *                  clickedId : string - 클릭한 마커의 정보중 유일한 값인 Id의 파라미터 이름(강조 여부나 markerClickEvent 에 콜백으로 돌려줄 파라미터 명을 정한다. default: installationPlaceId )
 *                  isPopupShow: {boolean} - 오버레이가 꺼질 때, 강조효과 취소를 위한 구분 값
 *        }
 * */
const KakaoMapForUser = ({ asideId, className, style, markerItems, legend, markerClickEvent, additionalOptions }) => {

  const [kakaoMap, setKakaoMap] = useState({});

  // 마커들
  const [markers, setMarkers] = useState([]);
  // 클릭이벤트 등록을 위한 해당 위치에 대한 위치를 담는 객체
  const [positions, setPositions] = useState({});
  // 마커 자체 정보들
  const [markerInfos, setMarkerInfos] = useState([]);
  // 클릭된 마커 정보 (지도 상에서 강조하기 위함)
  const [clickedMarkerPrevInfo, setClickedMarkerPrevInfo] = useState(undefined);
  const [clickedMarkerInfo, setClickedMarkerInfo] = useState(undefined);

  let kakaoMapElement;
  let globalMap;

  useEffect(() => {
    kakaoMapElement = document.getElementById(MAP_CONFIG.ID);
    globalMap = new kakao.maps.Map(kakaoMapElement, {
      center: new kakao.maps.LatLng(MAP_CONFIG.POS_CENTER_LAT, MAP_CONFIG.POS_CENTER_LNG),
      level: MAP_CONFIG.DEFAULT_MAP_LEVEL
    });

    setKakaoMap(globalMap);
    return () => {
    };
  }, []);

  /** aside Menu 변경시 style 변경 */
  useEffect(() => {
    if (Object.entries(kakaoMap).length > 0) {
      if (asideId) {
        document.getElementById(MAP_CONFIG.ID).style.width = '100%';
      } else {
        document.getElementById(MAP_CONFIG.ID).style.width = '';
      }
      kakaoMap.relayout();
    }
  }, [asideId, kakaoMap]);

  /** 다중 마커 */
  useEffect(() => {
    /** 오버레이 및 마커 배열 초기화 START */
    markers.map((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
    setPositions({});
    setMarkerInfos([]);
    /** 오버레이 및 마커 배열 초기화 END */

    if (Object.entries(kakaoMap).length > 0
      && markerItems
      && markerItems.length > 0) {

      /**
       * 데이터 마다 마커 등록, 오버레이 추가, 각 마커에 대한 이벤트 추가
       * */
      markerItems.map((markerItem, index) => {
        const position = new kakao.maps.LatLng(markerItem.latitude, markerItem.longitude);
        const marker = new kakao.maps.Marker({
          map: kakaoMap,
          // TODO: 우측 하단으로 고정
          position,
        });

        setMarkerInfos((prev) => {
          let returnArray = JSON.parse(JSON.stringify(prev));

          returnArray.push(markerItem);
          return returnArray;
        });

        /** 마커 이미지 추가  */
        markerItem.image
        && marker.setImage(
          new kakao.maps.MarkerImage(
            markerItem.image,
            new kakao.maps.Size(MAP_CONFIG.MARKER_SIZE_X, MAP_CONFIG.MARKER_SIZE_Y),
            new kakao.maps.Point(MAP_CONFIG.MARKER_POS_X, MAP_CONFIG.MARKER_POS_Y)
          )
        );

        setMarkers(prev => [...prev, marker]);

        setPositions(prev => ({
          ...prev,
          [index]: {
            position
          }
        }));

        /** 지도 클릭 이벤트. 마커 외의 부분에 클릭 했을 때, 오버레이 꺼짐. */
        kakao.maps.event.addListener(kakaoMap, 'click', function () {
          markerClickEvent && markerClickEvent(false);
          handleEmphasizeMarker({});
        });
      });
    }
  }, [kakaoMap, markerItems]);

  /** 마커 강조 함수. additionalOptions의 activateEmphasis 값이 true가 아니면 활성화 되지 않음. */
  const handleEmphasizeMarker = useCallback((param) => {
    if(!additionalOptions || !additionalOptions.activateEmphasis) return;

    const id = additionalOptions.clickedId || MAP_CONFIG.defaultClickedIdParamName;

    if(!param || Object.entries(param).length < 1){
      setClickedMarkerInfo({});
    }
    else{
      setClickedMarkerInfo((prev) => {
        /** 같은 마커가 선택되면 그대로 둔다. */
        if(prev && prev.markerInfo && prev.markerInfo[id] === markerInfos[param.index][id]){
          return prev;
        }
        return {
          marker: param.marker,
          markerInfo: markerInfos[param.index]
        }
      });
    }
  }, [additionalOptions, markerInfos]);

  /** 마커 클릭 이벤트. 마커 클릭 했을 때, 다른 켜져있는 오버레이 모두 끄고 오버레이 보이면서 center 로 이동.  */
  useEffect(() => {
    markers.map((marker, index) => {
      kakao.maps.event.addListener(marker, 'click', function () {

        const clickedIdParamName = additionalOptions && additionalOptions.clickedId || MAP_CONFIG.defaultClickedIdParamName;
        handleEmphasizeMarker({marker, index});

        // setCenter -> panTo 로 변경 (부드럽게 이동)
        kakaoMap.panTo(positions[index].position);
        markerClickEvent && markerClickEvent(true, markerInfos[index][clickedIdParamName]);
      });
    });
  }, [markers, positions, markerInfos]);

  useEffect(() => {
    /** 선택된 마커가 취소 됐을 때, 원래의 이미지로 되돌린다. */
    if (!clickedMarkerInfo || Object.entries(clickedMarkerInfo).length < 1) {
      setClickedMarkerPrevInfo((prev) => {
        if (prev && prev.markerInfo && prev.marker ) {

          const imageSrc = prev.markerInfo.image;
          const imageSize = new kakao.maps.Size(MAP_CONFIG.MARKER_SIZE_X, MAP_CONFIG.MARKER_SIZE_Y);
          const imageOption = { offset: new kakao.maps.Point(MAP_CONFIG.MARKER_POS_X, MAP_CONFIG.MARKER_POS_Y) };
          const originImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          prev.marker.setImage(originImage);
          return {};
        }
      });
    }
    /** 마커가 선택 됐을 때, 전에 변경했던 이미지는 되돌리고 선택된 마커를 강조한다. */
    else {
      const imageSrc = clickedMarkerInfo.markerInfo.image;
      const imageSize = new kakao.maps.Size(MAP_CONFIG.EMPHASIZED_MARKER_SIZE_X, MAP_CONFIG.EMPHASIZED_MARKER_SIZE_Y);
      const imageOption = { offset: new kakao.maps.Point(MAP_CONFIG.EMPHASIZED_MARKER_POS_X, MAP_CONFIG.EMPHASIZED_MARKER_POS_Y) };
      const newMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      clickedMarkerInfo.marker.setImage(newMarkerImage);
      setClickedMarkerPrevInfo((prev) => {
        if (prev && prev.markerInfo && prev.marker) {
          const imageSrc = prev.markerInfo.image;
          const imageSize = new kakao.maps.Size(MAP_CONFIG.MARKER_SIZE_X, MAP_CONFIG.MARKER_SIZE_Y);
          const imageOption = { offset: new kakao.maps.Point(MAP_CONFIG.MARKER_POS_X, MAP_CONFIG.MARKER_POS_Y) };

          const originImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          prev.marker.setImage(originImage);
        }
        return clickedMarkerInfo;
      });
    }

  }, [clickedMarkerInfo]);

  /** 오버레이 꺼졌을 때, 강조효과 취소 */
  useEffect(() => {

    (additionalOptions && !additionalOptions.isPopupShow) && handleEmphasizeMarker({});
  }, [additionalOptions && additionalOptions.activateEmphasis && additionalOptions.isPopupShow]);

  /** 커스텀 줌 컨트롤 확대 */
  const zoomIn = useCallback(() => {
    kakaoMap.setLevel(kakaoMap.getLevel() - 1);
  }, [kakaoMap]);

  /** 커스텀 줌 컨트롤 축소 */
  const zoomOut = useCallback(() => {
    kakaoMap.setLevel(kakaoMap.getLevel() + 1);
  }, [kakaoMap]);

  return (
    <>
      <div id={MAP_CONFIG.ID} className={className} style={style}>
        <div className='zoomBox'>
          <a onClick={zoomIn} className='btn_zoomPlus'>확대</a>
          <a onClick={zoomOut} className='btn_zoomMinus'>축소</a>
        </div>
        {legend ?
          <AsideLowerLegendTable legendCategory={legend}/> : null}
      </div>
    </>
  );
};

export default KakaoMapForUser;
