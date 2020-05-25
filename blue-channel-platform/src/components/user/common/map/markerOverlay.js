import React, { memo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import window from 'global';
import CONST, { USER_CONST } from '../../../../common/globalConst';
import CommonChart from '../../../common/jsmartChart/commonChart';
import { Overlay } from '../../../../../static/css/globalStyle';

const MarkerOverlay = memo(({ mapType, data, isPopupShow, setIsPopupShow }) => {
  const [typeLinkInfoState, setTypeLinkInfoState] = useState({
    measurementTypeName: '초미세먼지',
    statisticsLink: `${USER_CONST.BASE_ROUTER_PATH}/atmosphere/data`,
    unit: '㎍/m³',
  });
  const [style, setStyle] = useState({
    left: window.innerWidth - 200,
    top: 500,
  });
  const screenWidth = window.outerWidth; // 실제 화면 폭 사이즈

  useEffect(() => {
    switch (mapType) {
      case CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST: {
        setTypeLinkInfoState({
          measurementTypeName: '초미세먼지',
          unit: '㎍/m³',
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST: {
        setTypeLinkInfoState({
          measurementTypeName: '미세먼지',
          unit: '㎍/m³',
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.CO2: {
        setTypeLinkInfoState({
          measurementTypeName: '이산화탄소',
          unit: 'ppm',
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.VOC: {
        setTypeLinkInfoState({
          measurementTypeName: '휘발성 유기 화합물',
          unit: 'ppb',
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY: {
        setTypeLinkInfoState({
          measurementTypeName: '습도',
          unit: '%'
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE: {
        setTypeLinkInfoState({
          measurementTypeName: '기온',
          unit: '℃'
        });
        break;
      }
      case CONST.MAP_TYPE.CCTV.index:
      case CONST.MAP_TYPE.CCTV.CAR:
      case CONST.MAP_TYPE.CCTV.PERSON: {
        setTypeLinkInfoState({
          measurementTypeName: '유동인구',
          unit: '명'
        });
        break;
      }
      default: {
        break;
      }
    }
  }, [mapType]);

  const renderOverlayDetail = useCallback(() => {
    switch (mapType) {
      case CONST.MAP_TYPE.ATMOSPHERE.index:
      case CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST:
      case CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST:
      case CONST.MAP_TYPE.ATMOSPHERE.CO2:
      case CONST.MAP_TYPE.ATMOSPHERE.VOC:
      case CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE:
      case CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY: {
        return (
          <>
            <div className="tableBox">
              <table className="view">
                <caption>{data.installationPlaceName} 측정결과</caption>
                <colgroup>
                  <col className="w120" />
                  <col />
                </colgroup>
                <tbody>
                <tr>
                  <th scope="row">{typeLinkInfoState.measurementTypeName}</th>
                  <td><span
                    className={data.status && data.status.color}>{data.statusName}</span> {data.measurementValue} {typeLinkInfoState.unit}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="tableMore">
              <Link href={`${USER_CONST.BASE_ROUTER_PATH}/atmosphere/data`}><a
                className="btn_ss black w60">통계자료</a></Link>&nbsp;&nbsp;&nbsp;
            </div>
          </>
        );
      }
      case CONST.MAP_TYPE.CCTV.index:
      case CONST.MAP_TYPE.CCTV.CAR:
      case CONST.MAP_TYPE.CCTV.PERSON: {
        return (
          <>
            <div className="tableBox">
              <table className="view">
                <caption>{data.installationPlaceCodeName} 측정결과</caption>
                <colgroup>
                  <col className="w120" />
                  <col />
                </colgroup>
                <tbody>
                <tr>
                  <th scope="row">{typeLinkInfoState.measurementTypeName}</th>
                  <td><span
                    className={data.status && data.status.color}>{data.statusName}</span> {data.measurementValue} {typeLinkInfoState.unit}
                  </td>
                </tr>
                <tr>
                  <th scope="row">주소</th>
                  <td>{data.address}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="tableMore">
              <Link href={`${USER_CONST.BASE_ROUTER_PATH}/cctv/data`}><a className="btn_ss black w60">통계자료</a></Link>&nbsp;&nbsp;&nbsp;
            </div>
          </>
        );
      }
    }
  }, [data, mapType, typeLinkInfoState]);

  const handleClosePopup = useCallback(() => {
    setIsPopupShow(false);
  }, []);

  /** https://www.kirupa.com/html5/drag.htm */
  const draggable = useCallback((e) => {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
    const initialX = e.clientX - style.left;
    const initialY = e.clientY - style.top;

    /** 드래그 이벤트 */
    document.onmousemove = function (elmnt) {
      if (elmnt.preventDefault) {
        elmnt.preventDefault();
      } else {
        elmnt.returnValue = false;
      }

      const currentX = elmnt.clientX - initialX;
      const currentY = elmnt.clientY - initialY;

      setStyle((prev) => ({
        ...prev,
        left: currentX,
        top: currentY,
      }));
    };

    /** 드래그 종료 이벤트 */
    document.onmouseup = function () {
      document.onmousemove = null;
    };
  }, [style]);

  return (
    <>
      {isPopupShow
        ? screenWidth > 768
          ? <div
            id="modal_placeForm"
            className={'modalWrap union'}
            style={{
              left: style.left,
              top: style.top,
              transitionDuration: '0s'
            }}
            onMouseDown={draggable}
          >
            <div className="modalTitle">
              <h4>{data.installationPlaceName} 측정결과</h4>
              <a className="btn_modalClose" onClick={handleClosePopup}>창닫기</a>
            </div>
            {renderOverlayDetail()}
            <div className={'h200'}>
              <CommonChart height={200} chartData={data.chartData} />
            </div>
          </div>
          : <>
            <div
              id="modal_pointContent"
              className={'modalWrap small active svg'}
              style={{
                zIndex: isPopupShow ? 1001 : undefined,
                left: '10px',
                right: '10px',
                marginLeft: '0',
                width: 'auto'
              }}
            >
              <div className="modalTitle">
                <h4>{data.installationPlaceName} 측정결과</h4>
                <a className="btn_modalClose" onClick={handleClosePopup}>창닫기</a>
              </div>
              {renderOverlayDetail()}
              <div className={'h200'}>
                <CommonChart height={200} chartData={data.chartData} />
              </div>
            </div>
            <Overlay show={isPopupShow} />
          </>
        : <Overlay show={isPopupShow} />}
    </>
  );
});

export default MarkerOverlay;
