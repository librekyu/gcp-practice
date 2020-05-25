/**
 * =======================================================
 *
 * 유틸리티 메소드
 * 작성시 메소드의 정의 및 @param, @return, @author 필수로 작성하고,
 * 해당 내용을 팀원과 공유해주세요.(중복을 방지하기 위함)
 *
 * =======================================================
 */

import React from 'react';
import Router from 'next/router';
import moment from 'moment';
import { uid } from 'react-uid';
import CONST, { ADMIN_CONST, USER_CONST } from './globalConst';

const _ = require('underscore');

class Util {
  /**
   * Item을 가지고 unique ID 생성
   * @author
   * @param {any} item
   * @param {number} index
   * @return
   */
  static makeUID = (item, index) => uid(item, index);

  /**
   * 자릿수를 입력 받아 랜덤 id 생성
   * @author
   * @param {any} length
   * @return
   */
  static makeRandomID = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  /**
   * 데이터 조회시 시간 format 변경 2019-11-08 08:49:46 => <>2019-11-08 <br/> 08:49</>
   * @author redbeanv
   * @param {string} date
   * @return {string}
   */
  static deleteSecDate = (date) => {
    const deletedSecDate = typeof date === 'string' && date.length > 4 && date.substr(0, date.length - 3) || date;
    return Util.datetimeLineBreak(deletedSecDate);
  };

  static datetimeLineBreak = (datetime) => {
    const splitDatetime = typeof datetime === 'string' && datetime.trim()
      .split(' ');
    return Array.isArray(splitDatetime) && splitDatetime && <>{splitDatetime[0]}<br/>{splitDatetime[1]}</> || datetime;
  };

  /**
   * 데이터 조회시 시간 format 변경 2019-11-08 08:49:46 => 2019-11-08 08:49
   * @author redbeanv
   * @param {string} date
   * @return {string}
   */
  static changeDateDelSec = (date) => {
    const deletedSecDate = typeof date === 'string' && date.length > 4 && date.substr(0, date.length - 3) || date;
    return deletedSecDate;
  };

  /**
   * 현재 날짜 가져오기
   * @author
   * @return {Date}
   * */
  static getCurrentDate = () => new Date();

  /**
   * 현재 시간 가져오기
   * @author
   * @return {string}
   * */
  static getCurrentTime = () => moment()
    .format('YYYY년 MM월 DD일 HH시 mm분');

  /**
   * 이전 날짜 (1달전 등등)
   * @author
   * @param {number} ago
   * @param {string} format
   * @return
   */
  static getAgoDate = (ago, format = 'YYYY-MM-DD') => moment()
    .subtract(ago, 'months')
    .format(format);

  static getDayAgoDate = (ago, day, format = 'YYYY-MM-DD') => (day
    ? moment(day)
      .subtract(ago, 'days')
      .format(format)
    : moment()
      .subtract(ago, 'days')
      .format(format));

  static getDayAfterDate = (after, day, format = 'YYYY-MM-DD') => (day
    ? moment(day)
      .add(after, 'days')
      .format(format)
    : moment()
      .add(after, 'days')
      .format(format));

  /**
   * 날짜를 문자열로 변환
   * @author
   * @param {string} dateStr
   * @param {string} format
   * @return
   * */
  static dateStringFormat = (dateStr, format = 'YYYY-MM-DD') => {
    const date = moment(dateStr, format)
      .toDate();
    return moment(date)
      .format(format.toUpperCase());
  };

  static dateMonthStringFormat = (dateStr, format = 'YYYY-MM') => {
    const date = moment(dateStr, format)
      .toDate();
    return moment(date)
      .format(format.toUpperCase());
  };

  static dateMonthStartStringFormat = (dateStr, format = 'YYYY-MM-DD') => {
    const date = moment(dateStr, format)
      .toDate();
    return moment(date)
      .startOf('month')
      .format(format.toUpperCase());
  };

  static dateMonthEndStringFormat = (dateStr, format = 'YYYY-MM-DD') => {
    const date = moment(dateStr, format)
      .toDate();
    return moment(date)
      .endOf('month')
      .format(format.toUpperCase());
  };

  /**
   * string을 byte length로 환산
   * @author redbeanv
   * @param {string} s
   * @return {number}
   * */
  static strByteLength = (s, b, i, c) => {
    for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1) ;
    return b;
  };

  /**
   * 숫자의 3자리마다 콤마(,) 찍기
   * @author redbeanv
   * @param {Number} x
   * @return {string}
   * */
  static numberWithCommas = (x) => {
    if (x !== undefined && x !== 'undefined') {
      const value = typeof x !== 'string' ? x.toString() : x;
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else{
      return 0;
    }
  };

  /**
   * 숫자 콤마(,) 제거
   * @author kimhg
   * @param {Number} x
   * @return {string}
   * */
  static numberWithoutCommas = (x) => {
    if (x !== undefined && x !== 'undefined') {
      const value = typeof x !== 'string' ? x.toString() : x;
      return value.replace(/,/g, '');
    }
  };
  /**
   * 전화번호 자동 하이픈
   * @author kimhg
   * @param {String} x
   * @return {String}
   * */
  static numberWithSpace = (x) => {
    if(x){
      let value = '';
      if(x.length >= 4 && x.length < 7) {
        value += x.substr(0, 3);
        value += " ";
        value += x.substr(3);
      } else if(x.length < 11) {
        value += x.substr(0, 3);
        value += " ";
        value += x.substr(3, 3);
        value += " ";
        value += x.substr(6);
      } else {
        value += x.substr(0, 3);
        value += " ";
        value += x.substr(3, 4);
        value += " ";
        value += x.substr(7);
      }

      return value;
    }
  };
  /**
   * 전화번호 자동 하이픈
   * @author kimhg
   * @param {String} x
   * @return {String}
   * */
  static numberWithoutSpace = (x) => {
    if (x) {
      const value = typeof x !== 'string' ? x.toString() : x;
      return value.replace(/ /g, '');
    }
  }

  /**
   * 백분율 환산
   * @author redbeanv
   * @param {Number} x
   * @param {Number} total
   * @return {string}
   * */
  static percentage = (x, total) => (x / total) * 100;

  /**
   * device 상태값에 따른 정보 리턴
   * @author
   * @param {string} status
   * @return {Object}
   * */
  static conversionAtmosphereDataToColorNImg = (status) => {
    const trimmedStatus = (typeof status === 'string') && status.trim();
    switch (trimmedStatus) {
      case '적음':
      case '좋음': {
        return {
          color: 'blue',
          src: `${ADMIN_CONST.BASE_IMAGE_PATH}/common/icon_face_good.png`,
          marker: `${USER_CONST.BASE_IMAGE_PATH}/common/icon_marker_blue.png`
        };
      }
      case '보통': {
        return {
          color: 'green',
          src: `${ADMIN_CONST.BASE_IMAGE_PATH}/common/icon_face_normal.png`,
          marker: `${USER_CONST.BASE_IMAGE_PATH}/common/icon_marker_green.png`
        };
      }
      case '많음':
      case '나쁨': {
        return {
          color: 'orange',
          src: `${ADMIN_CONST.BASE_IMAGE_PATH}/common/icon_face_bad.png`,
          marker: `${USER_CONST.BASE_IMAGE_PATH}/common/icon_marker_orange.png`
        };
      }
      case '매우많음':
      case '매우나쁨': {
        return {
          color: 'red',
          src: `${ADMIN_CONST.BASE_IMAGE_PATH}/common/icon_face_verybad.png`,
          marker: `${USER_CONST.BASE_IMAGE_PATH}/common/icon_marker_red.png`
        };
      }
      case '점검':
      case '데이터없음':
      default: {
        return {
          color: 'black',
          src: `${ADMIN_CONST.BASE_IMAGE_PATH}/common/icon_face_none.png`,
          marker: `${USER_CONST.BASE_IMAGE_PATH}/common/icon_marker_black.png`
        };
      }
    }
  };

  /**
   * device 상태 이름에 따른 컬러 리턴
   * @author kimhg
   * @param status {string} : status name
   * @return {string} : color
   * */
  static getColorFromStringByContainsStatusName = (status) => {
    if (status.includes('적음') || status.includes('좋음')) {
      return '#32A1FF';
    } else if (status.includes('보통')) {
      return '#00C73C';
    } else if (status.includes('매우나쁨') || status.includes('매우많음')) {
      return '#FF5959';
    } else if (status.includes('나쁨') || status.includes('많음')) {
      return '#FD9B5A';
    } else if (status.includes('점검') || status.includes('데이터없음') || status.includes('데이터 없음')) {
      return 'black';
    } else {
      return '#24aae1';   // 기본색
    }
  };

  /**
   * 입력받은 10~11자리 숫자를 핸드폰 번호 표기로 변경. 01012345667 => 010-1234-5678
   * @author redbeanv
   * @param {string} str
   * @return {string}
   * */
  static autoHyphenPhone = (str) => {
    str = str.replace(/[^0-9]/g, '');
    let tmp = '';
    if (str.length < 4) {
      return str;
    }
    if (str.length < 7) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3);
      return tmp;
    }
    if (str.length < 11) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 3);
      tmp += '-';
      tmp += str.substr(6);
      return tmp;
    }
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  };

  /**
   * string color 정보를 hex 값으로 변경
   * @author redbeanv
   * @param {string} color
   * @return {string}
   * */
  static colorToHex = (color) => {
    switch (color) {
      case 'blue':
        return '#24aae1';
      case 'green':
        return '#a9d572';
      case 'orange':
        return '#f47d2c';
      case 'red':
        return '#ee1d23';
      case 'purple':
        return '#8400ff';
      case 'yellow':
        return '#f59a23';
      case 'gray':
        return '#898989';
      case 'black':
        return '#252525';
      default:
        return null;
    }
  };

  /**
   *
   * @author redbeanv
   * @param {string} state
   * @return {string}
   * */
  static deviceStateToStr = (state) => {
    switch (state) {
      case 'good':
        return {
          color: 'blue',
          state: '좋음'
        };
      case 'normal':
        return {
          color: 'green',
          state: '보통'
        };
      case 'bad':
        return {
          color: 'orange',
          state: '나쁨'
        };
      case 'veryBad':
        return {
          color: 'red',
          state: '매우 좋음'
        };
      default:
        return null;
    }
  };

  /**
   * element 의 형제를 반환
   * @author redbeanv
   * @param {string} el
   * @return {string}
   * */
  static sibling = (el) => [...el.parentElement.children].filter((e) => e != el);

  /**
   * 파일크기 계산
   * @author
   * @param {number} fileSize
   * @return
   * */
  static fileSizeCalculation(fileSize) {
    const metric = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const calculation = Math.floor(Math.log(fileSize) / Math.log(1024));
    if (calculation === '-Infinity') {
      return `0 ${metric[0]}`;
    }
    return `${(fileSize / Math.pow(1024, Math.floor(calculation))).toFixed(2)} ${metric[calculation]}`;
  }

  /**
   * 날짜 데이터를 받아 요일 정보와 함께 리턴
   * @author redbeanv
   * @param: 'YYYY-MM-DD'
   * @return: MM월 DD일 (${week})
   * */
  static getDayOfWeekDate = (date) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dow = week[new Date(date).getDay()];
    const splitDate = date.split('-');
    const MM = splitDate[1];
    const DD = splitDate[2];
    return `${MM}월 ${DD}일 (${dow})`;
  };

  /**
   * Router push with encoded query
   * @param pathname: String, query: {}
   * */
  static pushWithEncodedQuery = (query, pathname = '', asPath = '') => {
    /** 1. Query Object encoding */
    let convertedQuery = '';
    if (Object.entries(query).length > 0) {
      convertedQuery = convertToEncodedObject(query);
    }
    const routerPath = pathname === '' ? Router.pathname : pathname;
    /** 2. Push with encoded query */
    Router.push({
      pathname: routerPath,
      query: convertedQuery
    });
  };

  /**
   * Router replace with encoded Query
   * @param query {Object}
   * @param pathname {String}
   * @author kimhg
   * @return {void}
   * */
  static replaceWithEncodedQuery = (query, pathname = '', asPath = '') => {
    let convertedQuery = '';          // 컨버팅 한 쿼리 객체
    let convertedQueryString = '';    // 컨버팅 한 쿼리 스트링
    const param = _.extend({}, query);// 쿼리를 복사한 객체

    // value 값 없는 것은 제거
    Object.entries(query)
      .map((([key, value], index) => {
        !value && delete param[key];
      }));

    // 컨버팅
    convertedQuery = convertToEncodedObject(param);

    // 컨버팅 한 객체를 쿼리스트링으로 변환
    Object.entries(convertedQuery)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        convertedQueryString += key + '=' + value + '&';
      });

    if (convertedQueryString.length > 0) {
      convertedQueryString = '?' + convertedQueryString.substring(0, convertedQueryString.length - 1);
    }
    const routerPath = !pathname ? Router.pathname : pathname;
    Router.replace(`${routerPath}${convertedQueryString}`);
  };

  /**
   * Get router path name and decoded query
   * @param query: {}
   * */
  static getRouterDecodedQuery = (query) => {
    /** 1. Query Object decoding */
    const decodedQuery = convertToDecodedObject(query);

    /** 2. Return with decoded query */
    return decodedQuery;
  };

  static convertDongCode = (dongCodeList, dongName) => {
    if (typeof dongName !== 'string') {
      return;
    }
    const convertedDongName = dongName.replace('.', ',');
    for (const dongCode of dongCodeList) {
      if (dongCode.attributes.name === convertedDongName) {
        return dongCode.attributes.code;
      }
    }
    return null;
  };

  static requireLoginAndDirect = () => {
    confirm('로그인이 필요한 기능입니다. 로그인 하시겠습니까?')
      ? Util.pushWithEncodedQuery(
      {
        redirect: true,
        pathname: Router.pathname
      },
      `${USER_CONST.BASE_ROUTER_PATH}/user/login`
      )
      : null;
  };

  /**
   * 상태에 따른 컬러 변환
   * @author kimhg
   * @param {Object} data
   * @return {string}
   * */

  static getMeasurementColor = (data) => {

  };

  /**
   * device 상태 (좋음, 나쁨 등)의 값에 따른 컬러를 반환
   * @author redbeanv
   * @param {Object} data
   * @param {string} popupType
   * @return {string}
   * */
  static getColor = (data, popupType, isAdmin = false) => {
    let state;
    if (!data) {
      return this.colorToHex(this.conversionAtmosphereDataToColorNImg(undefined).color);
    }
    switch (popupType) {
      case CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST:
        if (isAdmin) {
          state = this.conversionAtmosphereDataToColorNImg(data.ultraFineDustStatusName).color;
        } else {
          state = this.conversionAtmosphereDataToColorNImg(data.measurementStatusName).color;
        }
        break;
      case CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST:
        if (isAdmin) {
          state = this.conversionAtmosphereDataToColorNImg(data.fineDustStatusName).color;
        } else {
          state = this.conversionAtmosphereDataToColorNImg(data.measurementStatusName).color;
        }
        break;
      case CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE:
        if (isAdmin) {
          state = this.conversionAtmosphereDataToColorNImg(data).color;
        } else {
          state = this.conversionAtmosphereDataToColorNImg(data.measurementStatusName).color;
        }
        break;
      case CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY:
        if (isAdmin) {
          state = this.conversionAtmosphereDataToColorNImg(data).color;
        } else {
          state = this.conversionAtmosphereDataToColorNImg(data.measurementStatusName).color;
        }
        break;
      case CONST.MAP_TYPE.ATMOSPHERE.CO2:
        if (isAdmin) {
          state = this.conversionAtmosphereDataToColorNImg(data.co2StatusName).color;
        } else {
          state = this.conversionAtmosphereDataToColorNImg(data.measurementStatusName).color;
        }
        break;
      case CONST.MAP_TYPE.ATMOSPHERE.VOC:
        if (isAdmin) {
          state = this.conversionAtmosphereDataToColorNImg(data.vocStatusName).color;
        } else {
          state = this.conversionAtmosphereDataToColorNImg(data.measurementStatusName).color;
        }
        break;
      case CONST.MAP_TYPE.BUILDING.GRADIENT:
        //state = conversionDeviceData.gradient(data).color;
        break;
      case CONST.MAP_TYPE.BUILDING.CRACK:
        //state = conversionDeviceData.crack(data).color;
        break;
      case CONST.MAP_TYPE.CLEANING:
        state = conversionDeviceData.clean(data).color;
        break;
      case CONST.MAP_TYPE.CCTV.index:
        state = this.conversionAtmosphereDataToColorNImg(data.avgPersonCountStatusName).color;
        break;
      case CONST.MAP_TYPE.SECURITY_LIGHT:
        state = conversionDeviceData.light(data).color;
        break;
      default:
        state = this.conversionAtmosphereDataToColorNImg(data.measurementValue).color;
        break;
    }
    return this.colorToHex(state);
  };

  /**
   * 차트 내의 최대 값을 구한다.
   * @param {Array} dataArray
   * */
  static getMaxValueInChart = (dataArray) => {
    const maxChartData
      = dataArray.length > 0 && Math.max.apply(null, dataArray) > 100 && Math.max.apply(null, dataArray)
      || dataArray.length > 0 && Math.max.apply(null, dataArray);
    // 자릿수 구함
    const maxChartDataLength = maxChartData.toString().length;
    const roundsNum = Math.pow(10, maxChartDataLength - 1);

    const maxValue = Math.ceil(maxChartData / (roundsNum)) * (roundsNum);

    const stepSize = maxValue / 4;

    return {
      maxValue: maxChartData,
      stepSize
    };
  };

  /**
   * YYYY-MM-DD 형태의 스트링 날짜값을 받아 일(day)정보를 해당 달의 첫번째 날로 변경하여 리턴
   * @author redbeanv
   * @param {string} currentDate
   * @return {Object}
   * */
  static getStartDayOfMonth = (currentDate) => {
    const splitDate = currentDate.split('-');
    return moment([splitDate[0], splitDate[1] - 1, '01']).format('YYYY-MM-DD');
  };

  /**
   * YYYY-MM-DD 형태의 스트링 날짜값을 받아 일(day)정보를 해당 달의 마지말 날로 변경하여 리턴
   * @author redbeanv
   * @param {string} currentDate
   * @return {string}
   * */
  static getEndDayOfMonth = (currentDate) => {
    const splitDate = currentDate.split('-');
    return moment([splitDate[0], splitDate[1] - 1]).add(-1).add(1, 'month').format('YYYY-MM-DD');
  };

  static getUnitByMeasurementType(type) {
    switch (type) {
      case CONST.MEASUREMENT_TYPE.FINE_DUST:
      case CONST.MEASUREMENT_TYPE.ULTRA_FINE_DUST: {
        return '㎍/m³';
      }
      case CONST.MEASUREMENT_TYPE.CO2: {
        return 'ppm';
      }
      case CONST.MEASUREMENT_TYPE.VOC: {
        return 'ppb';
      }
      case CONST.MEASUREMENT_TYPE.TEMPERATURE: {
        return '°C';
      }
      case CONST.MEASUREMENT_TYPE.HUMIDITY: {
        return '%';
      }
      case CONST.MEASUREMENT_TYPE.PERSON: {
        return '명';
      }
      case CONST.MEASUREMENT_TYPE.CAR: {
        return '대';
      }
      case CONST.MEASUREMENT_TYPE.CRACK: {
        return 'mm';
      }
      case CONST.MEASUREMENT_TYPE.GRADIENT: {
        return '°';
      }
      default: {
        return '';
      }
    }
  };

  /**
   * 모바일 접속 확인
   * @return boolean
   * @author kji
   * */
  static isMobileConnect = () => {
    const UserAgent = navigator.userAgent;
    // 모바일일 경우 (변동사항 있을경우 추가 필요)
    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
      || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * 파일 다운로드
   * @author kimji
   * @param {json}  fileInfo
       fileInfo = {
          fileName: '', // 파일명
          blobData: Blob,  // file blob data

   * mimetype 정보
   * https://docs.microsoft.com/ko-kr/archive/blogs/vsofficedeveloper/office-2007-file-format-mime-types-for-http-content-streaming-2
   * */
  static fileDownload = (fileInfo) => {
    const { fileName, blobData } = fileInfo;
    const blob = new Blob([blobData], {type: blobData.type});

    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
      window.navigator.msSaveBlob(blob, fileName);
    } else {
      const url = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = url;
      tempLink.setAttribute('download', fileName);
      // Safari thinks _blank anchor are pop ups. We only want to set _blank
      // target if the browser does not support the HTML5 download attribute.
      // This allows you to download files in desktop safari if pop up blocking
      // is enabled.
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    }
  }
}

const conversionDeviceData = {
  /**
   * 초미세먼지 상태
   * */
  ultraFineDust: (state) => {
    if (state === '' || state === null || state === undefined) {
      return {
        color: 'black',
        state: '점검'
      };
    }
    if (state >= 0 && state <= 15) {
      return {
        color: 'blue',
        state: '좋음'
      };
    }
    if (state >= 16 && state <= 35) {
      return {
        color: 'green',
        state: '보통'
      };
    }
    if (state >= 36 && state <= 75) {
      return {
        color: 'orange',
        state: '나쁨'
      };
    }
    if (state >= 76) {
      return {
        color: 'red',
        state: '매우나쁨'
      };
    }
  },
  /**
   * 미세먼지 상태
   * */
  fineDust: (state) => {
    if (state === '' || state === null || state === undefined) {
      return {
        color: 'black',
        state: '점검'
      };
    }
    if (state >= 0 && state <= 30) {
      return {
        color: 'blue',
        state: '좋음'
      };
    }
    if (state >= 31 && state <= 80) {
      return {
        color: 'green',
        state: '보통'
      };
    }
    if (state >= 81 && state <= 150) {
      return {
        color: 'orange',
        state: '나쁨'
      };
    }
    if (state >= 151) {
      return {
        color: 'red',
        state: '매우나쁨'
      };
    }
  },
  /** 기온 상태 */
  temperature: (state) => {
    if (state === '' || state === null || state === undefined) {
      return {
        color: 'black',
        state: '점검'
      };
    }
    return {
      color: 'blue',
      state: '좋음'
    };
  },
  /** 습도 상태 */
  humidityState: (state) => {
    if (state === '' || state === null || state === undefined) {
      return {
        color: 'black',
        state: '점검'
      };
    }
    return {
      color: 'blue',
      state: '좋음'
    };
  },
  /** 이산화탄소 상태 */
  co2: (state) => {
    if (state === '' || state === null || state === undefined) {
      return {
        color: 'black',
        state: '점검'
      };
    }
    if (state >= 0 && state <= 500) {
      return {
        color: 'blue',
        state: '좋음'
      };
    }
    if (state >= 501 && state <= 1000) {
      return {
        color: 'green',
        state: '보통'
      };
    }
    if (state >= 1001 && state <= 2000) {
      return {
        color: 'orange',
        state: '나쁨'
      };
    }
    if (state >= 2001) {
      return {
        color: 'red',
        state: '매우나쁨'
      };
    }
  },
  /** 이산화탄소 상태 */
  voc: (state) => {
    if (state === '' || state === null || state === undefined) {
      return {
        color: 'black',
        state: '점검'
      };
    }
    if (state >= 0 && state <= 200) {
      return {
        color: 'blue',
        state: '좋음'
      };
    }
    if (state >= 201 && state <= 400) {
      return {
        color: 'green',
        state: '보통'
      };
    }
    if (state >= 401 && state <= 1000) {
      return {
        color: 'orange',
        state: '나쁨'
      };
    }
    if (state >= 1001) {
      return {
        color: 'red',
        state: '매우나쁨'
      };
    }
  },
  /** 기울기 상태 */
  gradient: (state) => {
    console.log('정책이 정해지지 않음');
    if (state === '' || state === null || state === undefined) {
      return {
        color: 'black',
        state: '점검'
      };
    }
    if (state >= 0 && state <= 1.1) {
      return {
        color: 'blue',
        state: '관심'
      };
    }
    if (state > 1.1) {
      return {
        color: 'green',
        state: '주의'
      };
    }
  },
  /** 크랙 상태 */
  crack: (state) => {
    if (state === '' || state === null || state === undefined) {
      return {
        color: 'black',
        state: '점검'
      };
    }
    if (state >= 0 && state <= 0.19) {
      return {
        color: 'blue',
        state: '좋음'
      };
    }
    if (state >= 0.2 && state <= 0.29) {
      return {
        color: 'green',
        state: '보통'
      };
    }
    if (state >= 0.3 && state <= 0.49) {
      return {
        color: 'orange',
        state: '나쁨'
      };
    }
    if (state >= 0.5) {
      return {
        color: 'red',
        state: '매우나쁨'
      };
    }
  },
  /** 청소 상태 */
  clean: (state) =>
    // if (state === '' || state === null || state === undefined) {
    //   return { color: 'black', state: '점검' };
    // }
    // if (state === 0) {
    //   return { color: 'blue', state: '생활' };
    // } else if (state === 1) {
    //   return { color: 'green', state: '재활' };
    // } else if (state === 2) {
    //   return { color: 'orange', state: '음식' };
    // } else if (state === 3) {
    //   return { color: 'purple', state: '수공' };
    // } else if (state === 4) {
    //   return { color: 'red', state: '기동' };
    // }
    ({
      color: 'black',
      state: '점검'
    }),
  /** cctv 상태 */
  cctv: (state) => {
    if (state === '' || state === null || state === undefined) {
      return {
        color: 'black',
        state: '점검'
      };
    }
    if (state >= 1 && state <= 150) {
      return {
        color: 'blue',
        state: '적음'
      };
    }
    if (state >= 151 && state <= 500) {
      return {
        color: 'green',
        state: '보통'
      };
    }
    if (state >= 501 && state <= 850) {
      return {
        color: 'orange',
        state: '많음'
      };
    }
    if (state >= 851) {
      return {
        color: 'red',
        state: '매우많음'
      };
    }
  },
  /** light 상태 */
  light: (state) => {
    if (state === '' || state === null || state === undefined) {
      return {
        color: 'gray',
        state: '멸등'
      };
    }
    return {
      color: 'yellow',
      state: '점등'
    };
  },
};

const convertToEncodedObject = (obj) => {
  const encodedObject = {};
  for (const [key, value] of Object.entries(obj)) {
    encodedObject[Buffer.from(encodeURI(key))
      .toString('base64')] = value ? Buffer.from(encodeURI(value))
      .toString('base64') : '';
  }
  return encodedObject;
};

const convertToDecodedObject = (obj) => {
  const decodedObject = {};
  for (const [key, value] of Object.entries(obj)) {
    decodedObject[decodeURI(Buffer.from(key, 'base64')
      .toString())] = value ? decodeURI(Buffer.from(value, 'base64')
      .toString()) : '';
  }
  return decodedObject;
};


export { conversionDeviceData };
export default Util;
