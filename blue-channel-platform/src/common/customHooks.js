/**
 * 관리자, 사용자 공통 커스텀 훅
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Util from './util';
import { FILE_PROCESS_ACTIONS } from '../reducers/common/fileProcess';
import { GLOBAL_ACTIONS } from '../reducers/common/global';
import CONST from './globalConst';
import moment from 'moment';

const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

/**
 * @param isOpen boolean(required)
 * @param modalType string(isOpen === true => required)
 * @param closeEvent func(isOpen === true => required)
 * @param title string
 * @param contents string
 * @param confirmEvent func
 */
const useModalParam = (initValue = {}) => {
  const dispatch = useDispatch();
  const [param, setParam] = useState(initValue);
  const typeArray = Object.values(CONST.MODAL_TYPE);

  useEffect(() => {
    dispatch({
      type: GLOBAL_ACTIONS.SETTING_MODAL,
      data: param
    });
  }, [param]);

  const handler = ((isOpen, modalType, closeEvent, confirmEvent, title, contents) => {
    // 초기화
    setParam({});

    // validation
    if (typeof isOpen !== 'boolean') {
      console.log('modal - isOpen type is boolean');
      return;
    }
    if (isOpen) {
      if (modalType === '' || !typeArray.includes(modalType)) {
        console.log('modal - modalType is wrong value');
        return;
      }
      if (!closeEvent && Object.keys(closeEvent).length === 0) {
        console.log('modal - closeEvent is required');
        return;
      }
    }

    // title, contents, confirmEvent의 값이 빈값이 아닐 경우 setting
    if (confirmEvent) {
      setParam((prev) => ({
        ...prev,
        confirmEvent
      }));
    }
    if (title) {
      setParam((prev) => ({
        ...prev,
        title
      }));
    }
    if (contents) {
      setParam((prev) => ({
        ...prev,
        contents
      }));
    }

    // open 상태에 따라 필수값 세팅
    if (!isOpen) {
      setParam((prev) => ({
        ...prev,
        isOpen,
      }));
    } else {
      setParam((prev) => ({
        ...prev,
        isOpen,
        modalType,
        closeEvent
      }));
    }
  });

  return [handler];
};

/**
 * 엑셀 다운로드
 * @param type: String - 화면 구분
 * @param searchFilter: Object - 검색 구분
 * @param totalCount: String or Int - 전체 데이터 개수(0개 인지 체크 )
 * @param options: Object - 옵션
 * @param isDevice: boolean - false 설치장소 엑셀다운로드, true 장치목록 엑셀다운로드
 * @param isUserStatistics: boolean - true: 사용자 측정통계자료 다운로드
 * */
const useExcelDownload = (type, searchFilter, totalCount, options, isDevice=false, isUserStatistics=false) => {
  const _ = require('underscore');
  const dispatch = useDispatch();
  const [isDownload, setIsDownload] = useState(false);
  const [setModalParam] = useModalParam({}); // modal setting
  const { excelDownloadState } = useSelector((state) => state.fileProcess);

  /** 엑셀 다운로드 실패 모달 생성  */
  useEffect(() => {
    if (excelDownloadState === CONST.API_STATE_CODE.FAIL) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, () => setModalParam(false), null, '실패', '문서가 생성되지 않아 다운로드를 실패하였습니다.');
      dispatch({
        type: FILE_PROCESS_ACTIONS.EXCEL_DOWNLOAD_STATE_INIT,
      });
    }
  }, [excelDownloadState]);

  useEffect(() => {
    if (isDownload) {
      // 초기화
      setIsDownload(false);

      // validation
      if (totalCount === 0) {
        if(!isDevice) {
          setModalParam(true, CONST.MODAL_TYPE.FAILURE, () => setModalParam(false), null, '실패', '등록된 장소가 없어 다운로드할 수 없습니다.');
        } else if(!isUserStatistics) {
          setModalParam(true, CONST.MODAL_TYPE.FAILURE, () => setModalParam(false), null, '실패', '등록된 장치가 없어 다운로드할 수 없습니다.');
        } else {
          setModalParam(true, CONST.MODAL_TYPE.FAILURE, () => setModalParam(false), null, '실패', '측정통계 자료가 없어 다운로드할 수 없습니다.');
        }
        return;
      }

      // dispatch
      /**
       * parameter 생성
       * 각 param에 필수값이 아닌 값이 ''일 경우 삭제
       * 필수값 pageNumber, pageSize는 변경 필요 없음, 최하단에서 날짜 데이터만 변경하여 다시 넣음
       * */

      let url;
      let fileName;
      const param = _.extend({}, searchFilter);

      switch (type) {
        /**
         * 관리자
         * */
        case CONST.EXCEL_TYPE.ADMIN_DEVICE.FINE_DUST_INSTALL_PLACE:
          url = '/admin/api/installation-place/fine-dusts/excelDownload';
          fileName = '미세먼지장치설치장소목록';
          !param.facilityType && delete param.facilityType; // 시설군
          !param.facilityDetailType && delete param.facilityDetailType; // 상세시설군 detailFacilityType
          !param.dongCode && delete param.dongCode; // 동코드
          break;
        case CONST.EXCEL_TYPE.ADMIN_DEVICE.FINE_DUST_DEVICE:
          url = `/admin/api/installation-place/${options.id}/device/fine-dusts/excelDownload`;
          fileName = '미세먼지장치목록';
          !param.vendorCode && delete param.vendorCode; // vendorCode
          !param.deviceStatus && delete param.deviceStatus;
          break;
        case CONST.EXCEL_TYPE.ADMIN_DEVICE.GRADIENT_INSTALL_PLACE:
          url = '/admin/api/installation-place/tilt/excelDownload';
          fileName = '기울기장치설치장소목록';
          !param.structureType && delete param.structureType; // 시설 구분
          !param.buildingGrade && delete param.buildingGrade; // 시설등급
          !param.dongCode && delete param.dongCode; // 동코드
          break;
        case CONST.EXCEL_TYPE.ADMIN_DEVICE.GRADIENT_DEVICE:
          url = `/admin/api/installation-place/${options.id}/device/tilt/excelDownload`;
          fileName = '기울기장치목록';
          !param.vendorCode && delete param.vendorCode; // vendorCode
          !param.deviceStatus && delete param.deviceStatus;
          break;
        case CONST.EXCEL_TYPE.ADMIN_DEVICE.CRACK_INSTALL_PLACE:
          url = '/admin/api/installation-place/crack/excelDownload';
          fileName = '크랙장치설치장소목록';
          !param.structureType && delete param.structureType; // 시설 구분
          !param.buildingGrade && delete param.buildingGrade; // 시설등급
          !param.dongCode && delete param.dongCode; // 동코드
          break;
        case CONST.EXCEL_TYPE.ADMIN_DEVICE.CRACK_DEVICE:
          url = `/admin/api/installation-place/${options.id}/device/crack/excelDownload`;
          fileName = '크랙장치목록';
          !param.vendorCode && delete param.vendorCode; // vendorCode
          !param.deviceStatus && delete param.deviceStatus;
          break;
        case CONST.EXCEL_TYPE.ADMIN_DEVICE.VEHICLE_GPS_INSTALL_PLACE:
          url = '/admin/api/installation/vehicle-gps/excelDownload';
          fileName = '차량GPS목록';
          !param.vehicleType && delete param.vehicleType; // 차량구분
          !param.vehicleCompanyCode && delete param.vehicleCompanyCode; // 차량소속
          !param.installationType && delete param.installationType; // 설치유형
          !param.vendorCode && delete param.vendorCode; // vendorCode
          break;
        case CONST.EXCEL_TYPE.ADMIN_DEVICE.CCTV_INSTALL_PLACE:
          url = '/admin/api/installation-place/cctv/excelDownload';
          fileName = '영상정보 목록';
          !param.dongCode && delete param.dongCode; // 동코드
          !param.installationPlaceCode && delete param.installationPlaceCode; // 설치장소코드
          break;
        case CONST.EXCEL_TYPE.ADMIN_DEVICE.SECURITY_LIGHT_INSTALL_PLACE:
          url = '/admin/api/installation-place/security-light/excelDownload';
          fileName = '스마트보안등목록';
          !param.dongCode && delete param.dongCode; // 동코드
          break;
        case CONST.EXCEL_TYPE.ADMIN_DEVICE.RECYCLE_BIN_INSTALL_PLACE:
          url = '/admin/api/installation-place/recycle-bin/excelDownload';
          fileName = '스마트분리수거함목록';
          !param.dongCode && delete param.dongCode; // 동코드
          break;
        case CONST.EXCEL_TYPE.ADMIN_STATISTICS.ATMOSPHERE:
          url = '/admin/api/statistics/air-quality/excelDownload';
          fileName = '대기측정통계목록';
          !param.keyword && delete param.keyword && delete param.searchType;
          !param.dongCode && delete param.dongCode;
          !param.isOutdoor && delete param.isOutdoor;
          !param.facilityType && delete param.facilityType;
          !param.detailFacilityType && delete param.detailFacilityType;
          param.type && delete param.type;
          break;
        case CONST.EXCEL_TYPE.ADMIN_STATISTICS.ATMOSPHERE_DETAIL:
          url = '/admin/api/statistics/air-quality/detail/excelDownload';
          fileName = '대기측정상세통계목록';
          !param.isOutdoor && delete param.isOutdoor;
          !param.installationLocation && delete param.installationLocation;
          break;
        case CONST.EXCEL_TYPE.ADMIN_STATISTICS.CCTV:
          url = '/admin/api/statistics/cctvs/excelDownload';
          fileName = '영상분석통계목록';
          !param.installationPlaceCode && delete param.installationPlaceCode;
          break;
        case CONST.EXCEL_TYPE.ADMIN_STATISTICS.CCTV_DETAIL:
          url = '/admin/api/statistics/cctvs/detail/excelDownload';
          fileName = '영상분석상세통계목록';
          !param.keyword && delete param.keyword && delete param.searchType;
          delete param.installationPlaceCodeName;
          break;
        case CONST.EXCEL_TYPE.USER_STATISTICS.PLATFORM_IO:
          url = '/admin/api/statistics/users/join-leave/excelDownload';
          fileName = '플랫폼가입탈퇴목록';
          delete param.pageNumber;
          delete param.pageSize;
          break;
        case CONST.EXCEL_TYPE.USER_STATISTICS.SERVICE_USING:
          // url = '/admin/api/statistics/users/join-leave/excelDownload';
          // fileName = '플랫폼가입탈퇴목록';
          // delete param.pageNumber;
          // delete param.pageSize;
          break;
        /**
         * 사용자
         * */
        case CONST.EXCEL_TYPE.USER_DATA.ATMOSPHERE_MEASUREMENT:
          url = `/api/air-quality/installation-place/${options.selectedPlaceId}/measurement/excelDownload`;
          fileName = '대기정보측통계자료';
          param.datetimeType === '' && delete param.datetimeType; // hour || day
          break;
        case CONST.EXCEL_TYPE.USER_DATA.CCTV_MEASUREMENT:
          url = '/api/cctv/statistics/excelDownload';
          fileName = '영상분석통계자료';
          param.datetimeType === '' && delete param.datetimeType; // day || month
          param.measurementType === '' && delete param.measurementType; // 시설군
          param.measurementSubType === '' && delete param.measurementSubType; // 상세시설군
          break;
        case CONST.EXCEL_TYPE.USER_DATA.MYPAGE_MEASURE_STATISTICS:
          url = 'api/mypage/operating-facility/air-quality/statistics/excelDownload';
          fileName = '운영시설측정통계자료';
          param.datetimeType === '' && delete param.datetimeType; // hour || day
          break;
        case CONST.EXCEL_TYPE.USER_DATA.MYPAGE_SHARE_USER_DOCUMENT_FORM:
          url = '/api/mypage/operating-facility/air-quality/sharedMember/template';
          fileName = '회원등록문서양식';
          break;
        default:
          break;
      }
      if (!param.keyword) {
        delete param.searchType;
        delete param.keyword;
      }
      // param.startDate = Util.dateStringFormat(new Date(searchFilter.startDate));
      // param.endDate = Util.dateStringFormat(new Date(searchFilter.endDate));

      dispatch({
        type: FILE_PROCESS_ACTIONS.EXCEL_DOWNLOAD_REQUEST,
        data: {
          url,
          fileName,
          param
        }
      });
    }
  }, [isDownload, searchFilter, _]);

  const handler = useCallback((isDown) => {
    setIsDownload(isDown);
  }, []);

  return [handler];
};

/** JsmartDateRangePicker component start, end date handler */
const useDate = (type, setter) => {
  const [newDate, setNewDate] = useState(moment()
    .format('YYYY-MM-DD'));

  useEffect(() => {
    if (type === CONST.DATE_TYPE.START) {
      setter((prev) => ({
        ...prev,
        startDate: newDate
      }));
    } else {
      setter((prev) => ({
        ...prev,
        endDate: newDate
      }));
    }
  }, [newDate]);

  const handleDate = useCallback((date) => {
    setNewDate(date);
  }, []);
  return [handleDate];
};

/** pagination change handler */
const usePage = (filter) => {
  const [query, setQuery] = useState({});

  useEffect(() => {
    setQuery(filter);
  }, [filter]);

  const handleQuery = useCallback((page) => {
    Util.pushWithEncodedQuery({
      ...query,
      pageNumber: page
    });
  }, [query]);
  return [handleQuery];
};

/** search button handler */
const useSearch = (filter) => {
  const [query, setQuery] = useState({});

  useEffect(() => {
    setQuery(filter);
  }, [filter]);

  const handleQuery = useCallback((e) => {
    e.preventDefault();
    Util.pushWithEncodedQuery({
      ...query,
      pageNumber: 1
    });
  }, [query]);
  return [handleQuery];
};


export { useInput, useModalParam, useExcelDownload, useDate, usePage, useSearch };
