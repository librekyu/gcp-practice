import React, { memo, useCallback, useState } from 'react';
import CONST from '../../../../common/globalConst';

/**
 * 좌측 메뉴 하단에 있는 구분 표
 * */
const AsideLowerLegendTable = memo(({ legendCategory }) => {
  let table;
  const [atmosphereLegend, setAtmosphereLegend] = useState(CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST);
  const handleChangeAtmosphereLegend = useCallback((e) => {
    setAtmosphereLegend(e.target.value);
  }, []);

  const renderAtmosphereLegend = useCallback(() => {
    switch (atmosphereLegend) {
      case CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST:
        return (
          <>
            <span className='unit'>단위: ㎍/m³</span>
            <ul>
              <li className="blue"><span>좋음</span> 0 ~ 15</li>
              <li className="green"><span>보통</span> 16 ~ 35</li>
              <li className="orange"><span>나쁨</span> 36 ~ 75</li>
              <li className="red"><span>매우나쁨</span> 76 ~</li>
              <li className="black"><span>점검</span> 데이터 없음</li>
            </ul>
          </>
        );
      case CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST:
        return (
          <>
            <span className='unit'>단위: ㎍/m³</span>
            <ul>
              <li className="blue"><span>좋음</span> 0 ~ 30</li>
              <li className="green"><span>보통</span> 31 ~ 80</li>
              <li className="orange"><span>나쁨</span> 81 ~ 150</li>
              <li className="red"><span>매우나쁨</span> 151 ~</li>
              <li className="black"><span>점검</span> 데이터 없음</li>
            </ul>
          </>
        );
      case CONST.MAP_TYPE.ATMOSPHERE.CO2:
        return (
          <>
            <span className='unit'>단위: ppm</span>
            <ul>
              <li className="blue"><span>좋음</span> 0 ~ 500</li>
              <li className="green"><span>보통</span> 501 ~ 1,000</li>
              <li className="orange"><span>나쁨</span> 1,001 ~ 2,000</li>
              <li className="red"><span>매우나쁨</span> 2,001 ~</li>
              <li className="black"><span>점검</span> 데이터 없음</li>
            </ul>
          </>
        );
      case CONST.MAP_TYPE.ATMOSPHERE.VOC:
        return (
          <>
            <span className='unit'>단위: ppb</span>
            <ul>
              <li className="blue"><span>좋음</span> 0 ~ 200</li>
              <li className="green"><span>보통</span> 201 ~ 400</li>
              <li className="orange"><span>나쁨</span> 400 ~ 1,000</li>
              <li className="red"><span>매우나쁨</span> 1,001 ~</li>
              <li className="black"><span>점검</span> 데이터 없음</li>
            </ul>
          </>
        );
      case CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE:
        return (
          <>
            <span className='unit'>단위: ℃</span>
          </>
        );
      case CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY:
        return (
          <>
            <span className='unit'>단위: %</span>
          </>
        );
      default:
        return (<></>);
    }
  }, [atmosphereLegend]);

  switch (legendCategory) {
    case CONST.MAP_TYPE.ATMOSPHERE.index: {
      table = (
        <div className="asideLegend">
          <b>공기질 지표</b>
          <select value={atmosphereLegend} onChange={handleChangeAtmosphereLegend} className='w100p'>
            <option value={CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST}>초미세먼지</option>
            <option value={CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST}>미세먼지</option>
            <option value={CONST.MAP_TYPE.ATMOSPHERE.CO2}>이산화탄소</option>
            <option value={CONST.MAP_TYPE.ATMOSPHERE.VOC}>휘발성 유기 화합물</option>
            <option value={CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE}>온도</option>
            <option value={CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY}>습도</option>
          </select>
          {renderAtmosphereLegend()}
        </div>
      );
      break;
    }

    case CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST: {
      table = (
        <div className="asideLegend">
          <b>초미세먼지(PM 2.5) 지표</b>
          <span className='unit'>단위: ㎍/m³</span>
          <ul>
            <li className="blue"><span>좋음</span> 0 ~ 15</li>
            <li className="green"><span>보통</span> 16 ~ 35</li>
            <li className="orange"><span>나쁨</span> 36 ~ 75</li>
            <li className="red"><span>매우나쁨</span> 76 ~</li>
            <li className="black"><span>점검</span> 데이터 없음</li>
          </ul>
        </div>
      );
      break;
    }
    case CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST: {
      table = (
        <div className="asideLegend">
          <b>미세먼지(PM 10) 지표</b>
          <span className='unit'>단위: ㎍/m³</span>
          <ul>
            <li className="blue"><span>좋음</span> 0 ~ 30</li>
            <li className="green"><span>보통</span> 31 ~ 80</li>
            <li className="orange"><span>나쁨</span> 81 ~ 150</li>
            <li className="red"><span>매우나쁨</span> 151 ~</li>
            <li className="black"><span>점검</span> 데이터 없음</li>
          </ul>
        </div>
      );
      break;
    }
    case CONST.MAP_TYPE.ATMOSPHERE.VOC: {
      table = (
        <div className="asideLegend">
          <b>휘발성 유기화합물 지표</b>
          <span className='unit'>단위: ppb</span>
          <ul>
            <li className="blue"><span>좋음</span> 0 ~ 200</li>
            <li className="green"><span>보통</span> 201 ~ 400</li>
            <li className="orange"><span>나쁨</span> 400 ~ 1,000</li>
            <li className="red"><span>매우나쁨</span> 1,001 ~</li>
            <li className="black"><span>점검</span> 데이터 없음</li>
          </ul>
        </div>
      );
      break;
    }

    case CONST.MAP_TYPE.ATMOSPHERE.CO2: {
      table = (
        <div className="asideLegend">
          <b>이산화탄소 지표</b>
          <span className='unit'>단위: ppm</span>
          <ul>
            <li className="blue"><span>좋음</span> 0 ~ 500</li>
            <li className="green"><span>보통</span> 501 ~ 1,000</li>
            <li className="orange"><span>나쁨</span> 1,001 ~ 2,000</li>
            <li className="red"><span>매우나쁨</span> 2,001 ~</li>
            <li className="black"><span>점검</span> 데이터 없음</li>
          </ul>
        </div>
      );
      break;
    }
    case CONST.MAP_TYPE.BUILDING.index:
    case CONST.MAP_TYPE.BUILDING.CRACK:
    case CONST.MAP_TYPE.BUILDING.GRADIENT: {
      table = (
        <div className="asideLegend">
          <b>{legendCategory === CONST.MAP_TYPE.BUILDING.GRADIENT ? '기울기' : '균열'} 변화</b>
          <ul>
            <li className="green">
              <span>주의</span>
              {legendCategory === CONST.MAP_TYPE.BUILDING.GRADIENT
                ?
                <>건축물 0 ~ 0.23
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  옹벽 1.15 ~ 1.71
                </>
                : '0.2 ~ 0.29'}
            </li>
            <li className="orange">
              <span>경계</span>
              {legendCategory === CONST.MAP_TYPE.BUILDING.GRADIENT
                ?
                <>건축물 0.24 ~ 0.38
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  옹벽 1.72 ~ 2.29
                </>
                : '0.5 ~ '}
            </li>
            <li className="red">
              <span>심각</span>
              {legendCategory === CONST.MAP_TYPE.BUILDING.GRADIENT
                ?
                <>건축물 0.39 ~
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  옹벽 2.29 ~
                </>
                : '0.39 ~'}
            </li>
            <li className="black">
              <span>점검중</span>
            </li>
          </ul>
        </div>);
      break;
    }
    case CONST.MAP_TYPE.CLEANING.index:
    case CONST.MAP_TYPE.CLEANING.RECYCLE_BIN:
    case CONST.MAP_TYPE.CLEANING.VEHICLE: {
      table = (
        <div className="asideLegend">
          <b>청소 차량 구분</b>
          <ul>
            <li className="blue"><span>생활</span></li>
            <li className="green"><span>재활</span></li>
            <li className="orange"><span>음식</span></li>
            <li className="purple"><span>수송</span></li>
            <li className="red"><span>기동</span></li>
            <li className="black"><span>스마트 분리수거함</span></li>
          </ul>
        </div>);
      break;
    }
    case CONST.MAP_TYPE.CCTV.index: {
      table = (
        <div className="asideLegend">
          <b>유동인구 수</b><span className="unit">단위: 명</span>
          <ul>
            <li className="blue"><span>적음</span>1 ~ 150명</li>
            <li className="green"><span>보통</span>151 ~ 500명</li>
            <li className="orange"><span>많음</span>501 ~ 850명</li>
            <li className="red"><span>매우많음</span>851명 ~</li>
            <li className="black"><span>점검중</span></li>
          </ul>
        </div>);
      break;
    }
    case CONST.MAP_TYPE.SECURITY_LIGHT: {
      table = (
        <div className="asideLegend">
          <b>스마트 보안등 구분</b>
          <ul>
            <li className="blue"><span>점등</span></li>
            <li className="black"><span>멸등</span></li>
          </ul>
        </div>);
      break;
    }
    default: {
      table = (<></>);
      break;
    }
  }

  return (
    <>
      {table}
    </>
  );
});

export default AsideLowerLegendTable;
