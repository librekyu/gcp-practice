import React from 'react';
import CONST, { USER_CONST } from '../../../../common/globalConst';

const MarkerDetail = (selectedMapType, data) => {
  let markerDetail;

  switch (selectedMapType) {
    case CONST.MAP_TYPE.ATMOSPHERE.index: {
      markerDetail = `
          <b>${data.placeName}</b>
<!--          <p>주소 : </p>-->
          <div class="tableBox">
            <table class="view">
              <caption>${data.placeName} 측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">초미세먼지</th>
                <td><span class=${data.ultraFineDustStatus.color}>${data.ultraFineDustStatusName}</span> ${data.ultraFineDust} ㎍/m³</td>
              </tr>
              <tr>
                <th scope="row">미세먼지</th>
                <td><span class=${data.fineDustStatus.color}>${data.fineDustStatusName}</span> ${data.fineDust} ㎍/m³</td>
              </tr>
              <tr>
                <th scope="row">기온</th>
                <td>${data.temperature}℃</td>
              </tr>
              <tr>
                <th scope="row">습도</th>
                <td>${data.humidity}%</td>
              </tr>
              <tr>
                <th scope="row">이산화탄소</th>
                <td><span class=${data.co2Status.color}>${data.co2StatusName}</span> ${data.co2} ppm</td>
              </tr>
              <tr>
                <th scope="row">휘발성유기화합물</th>
                <td><span class=${data.vocStatus.color}>${data.vocStatusName}</span> ${data.voc} ppb</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tableMore">
            <a href='${USER_CONST.BASE_ROUTER_PATH}/atmosphere/data' class="btn_ss black w60">통계자료</a>
          </div>
      `;
      break;
    }
    case CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST: {
      markerDetail = `
          <b>${data.placeName}</b>
          <div class="tableBox">
            <table class="view">
              <caption>${data.placeName} 측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">초미세먼지</th>
                <td><span class=${data.ultraFineDustStatus.color}>${data.ultraFineDustStatusName}</span> ${data.ultraFineDust} ㎍/m³</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tableMore">
            <a href='${USER_CONST.BASE_ROUTER_PATH}/atmosphere/data' class="btn_ss black w60">통계자료</a>
          </div>
      `;
      break;
    }
    case CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST: {
      markerDetail = `
          <b>${data.placeName}</b>
          <div class="tableBox">
            <table class="view">
              <caption>${data.placeName} 측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">미세먼지</th>
                <td><span class=${data.fineDustStatus.color}>${data.fineDustStatusName}</span> ${data.fineDust} ㎍/m³</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tableMore">
            <a href='${USER_CONST.BASE_ROUTER_PATH}/atmosphere/data' class="btn_ss black w60">통계자료</a>
          </div>
      `;
      break;
    }
    case CONST.MAP_TYPE.ATMOSPHERE.VOC: {
      markerDetail = `
          <b>${data.placeName}</b>
          <div class="tableBox">
            <table class="view">
              <caption>${data.placeName} 측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">휘발성유기화합물</th>
                <td><span class=${data.vocStatus.color}>${data.vocStatusName}</span> ${data.voc} ppb</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tableMore">
            <a href='${USER_CONST.BASE_ROUTER_PATH}/atmosphere/data' class="btn_ss black w60">통계자료</a>
          </div>
      `;
      break;
    }
    case CONST.MAP_TYPE.ATMOSPHERE.CO2: {
      markerDetail = `
          <b>${data.placeName}</b>
          <div class="tableBox">
            <table class="view">
              <caption>${data.placeName} 측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">이산화탄소</th>
                <td><span class=${data.co2Status.color}>${data.co2StatusName}</span> ${data.co2} ppm</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tableMore">
            <a href='${USER_CONST.BASE_ROUTER_PATH}/atmosphere/data' class="btn_ss black w60">통계자료</a>
          </div>
      `;
      break;
    }
    case CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY: {
      markerDetail = `
          <b>${data.placeName}</b>
          <div class="tableBox">
            <table class="view">
              <caption>${data.placeName} 측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">습도</th>
                <td>${data.humidity} %</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tableMore">
            <a href='${USER_CONST.BASE_ROUTER_PATH}/atmosphere/data' class="btn_ss black w60">통계자료</a>
          </div>
      `;
      break;
    }
    case CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE: {
      markerDetail = `
          <b>${data.placeName}</b>
          <div class="tableBox">
            <table class="view">
              <caption>${data.placeName} 측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">기온</th>
                <td>${data.temperature} ℃</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tableMore">
            <a href='${USER_CONST.BASE_ROUTER_PATH}/atmosphere/data' class="btn_ss black w60">통계자료</a>
          </div>
      `;
      break;
    }
    case CONST.MAP_TYPE.BUILDING.GRADIENT: {
      markerDetail = `
          <b>기울기 측정 현황</b>
          <div class="tableBox">
            <table class="view">
              <caption>측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">시설구분</th>
                <td>건물</td>
              </tr>
              <tr>
                <th scope="row">설치된 센서</th>
                <td>3</td>
              </tr>
              <tr>
                <th scope="row">평균 기울기</th>
                <td>0.15℃</td>
              </tr>
              <tr>
                <th scope="row">오늘 평균</th>
                <td>0.13℃%</td>
              </tr>
              </tbody>
            </table>
          </div>
      `;
      break;
    }
    case CONST.MAP_TYPE.BUILDING.CRACK: {
      markerDetail = `
          <b>균열 측정 현황</b>
          <div class="tableBox">
            <table class="view">
              <caption>측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">시설구분</th>
                <td>건물</td>
              </tr>
              <tr>
                <th scope="row">설치된 센서</th>
                <td>3</td>
              </tr>
              <tr>
                <th scope="row">평균 균열</th>
                <td>0.15℃</td>
              </tr>
              <tr>
                <th scope="row">오늘 평균</th>
                <td>0.13℃%</td>
              </tr>
              </tbody>
            </table>
          </div>
        `;
      break;
    }
    case CONST.MAP_TYPE.CLEANING.VEHICLE: {
      markerDetail = `
          <b>운행 중인 청소차량</b>
          <div class="tableBox">
            <table class="view">
              <caption>측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">차량구분</th>
                <td><span class="blue">생활</span></td>
              </tr>
              <tr>
                <th scope="row">적재 용량</th>
                <td>1톤</td>
              </tr>
              </tbody>
            </table>
          </div>
       `;
      break;
    }
    case CONST.MAP_TYPE.CLEANING.RECYCLE_BIN: {
      markerDetail = `
          <b>스마트 분리수거함</b>
          <div class="tableBox">
            <table class="view">
              <caption>측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">분리수거함 구분</th>
                <td><span class="blue">생활</span></td>
              </tr>
              <tr>
                <th scope="row">최대 용량</th>
                <td>2톤</td>
              </tr>
              <tr>
                <th scope="row">현재 용량</th>
                <td>1톤</td>
              </tr>
              </tbody>
            </table>
          </div>
        `;
      break;
    }
    case CONST.MAP_TYPE.CCTV.index: {
      markerDetail = `
          <b>유동인구 측정 CCTV</b>
          <div class="tableBox">
            <table class="view">
              <caption>측정결과</caption>
              <colgroup>
                <col class="w140"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">측정 구역</th>
                <td>${data.installationPlaceCodeName}</td>
              </tr>
              <tr>
                <th scope="row">측정 주소</th>
                <td>${data.address} ${data.detailAddress}</td>
              </tr>
              <tr>
                <th scope="row">오늘의 유동인구 수</th>
                <td><span class=${data.personCountStatus.color}>${data.personCountStatusName}</span> ${data.personCount} 명</td>
              </tr>
              </tbody>
            </table>
          </div>
          `;
      break;
    }
    case CONST.MAP_TYPE.SECURITY_LIGHT: {
      markerDetail = `
          <b>스마트 보안등</b>
          <div class="tableBox">
            <table class="view">
              <caption>측정결과</caption>
              <colgroup>
                <col class="w120"/>
                <col/>
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">현재상태</th>
                <td><span class="blue">켜짐</span></td>
              </tr>
              <tr>
                <th scope="row">위치</th>
                <td>서울시 중랑구 중화2동 봉화산로 2길 10</td>
              </tr>
              <tr>
                <th scope="row">최근 점등 시간</th>
                <td>17:36</td>
              </tr>
              <tr>
                <th scope="row">최근 점멸 시간</th>
                <td>06:32</td>
              </tr>
              </tbody>
            </table>
          </div>
        `;
      break;
    }
    default: {
      break;
    }
  }
  return markerDetail;
};

export default MarkerDetail;
