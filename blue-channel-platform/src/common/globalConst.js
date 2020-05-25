import Util from './util';
import moment from 'moment';

/**
 * 사용자, 관리자 공통 전역 상수
 * */
const CONST = {

  API_URL: 'http://localhost:8080/bpass/v1/devices',

  CONST_NUMBER: {
    MAX_TRY_NUMBER: 5, //
  },

  /** HTTP 상태코드 */
  HTTP_STATUS_CODE: {
    OK: 200, // 요청을 성공적으로 처리함
    CREATE: 201, // 새 리소스를 성공적으로 생성함. 응답의 Location 헤더에 해당 리소스의 URI가 담겨있다.
    BAD_REQUEST: 400, // 잘못된 요청을 보낸 경우. 응답 본문에 더 오류에 대한 정보가 담겨있다.
    UNAUTHORIZED: 401, // 인증되지 않은 접근
    FORBIDDEN: 403, // 권한 때문에 거절되었다는 것을 의미한다.
    NOT_FOUND: 404, // 요청한 리소스가 없음.
    INTERNAL_SERVER_ERROR: 500 // 서버 내부 오류를 의미한다.
  },

  /** HTTP 응답 메세지 */
  HTTP_RESPONSE_MESSAGE: {
    SUCCESS: 'Success', // 성공
    UNAUTHORIZED: 'Unauthorized' // 인증되지 않은 접근
  },

  /** API request, success, fail constant */
  API_STATE_CODE: {
    REQUEST: 'request',
    SUCCESS: 'success',
    FAIL: 'fail',
  },

  /** DATE_PICKER 메세지 */
  DATE_PICKER_MESSAGE: {
    START_DATE_MORE_THAN_END_DATE: '시작일이 종료일보다 큽니다.',
    END_DATE_LESS_THAN_START_DATE: '종료일이 시작일보다 작습니다.',
    CANNOT_PICK_MORE_THAN_TODAY: '오늘 이후 날짜를 선택할 수 없습니다.',
    CANNOT_PICK_MORE_THAN_60DAY: '유동인구 정보자료 일간 통계 자료의 조회기간은 최대 60일입니다.',
    CANNOT_PICK_MORE_THAN_7DAY: '측정 통계자료의 최대 조회기간은 7일입니다.',
    CANNOT_PICK_MORE_THAN_3DAY: '대기정보 자료 일간 통계 자료의 조회기간은 최대 3일입니다.',
  },

  // 공통 메세지 관리
  COMMON_MESSAGE: {
    /** 공통 */
    EMPTY_MESSAGE: '결과가 없습니다.',
    EMPTY_CHART_DATA_MESSAGE: '통계 데이터가 없습니다.',
    SAVE_SUCCESS: <>저장이 완료되었습니다.<br /> 목록화면으로 이동하시겠습니까?</>,
    DELETE_CONFIRM: <>선택하신 장치를 정말 삭제하시겠습니까?<br/>삭제 후 복구할 수 없습니다.</>,
    PATCH_CONFIRM: <>선택하신 장치를 정말 수정하시겠습니까?</>,
    NO_SELECTED_CHECKED: '선택된 데이터가 없습니다.',
    CONFIRM_DELETE: <>선택하신 게시물을 정말 삭제하시겠습니까?<br />삭제 후 복구할 수 없습니다.</>,
    SUCCESS_POST: <>등록에 성공하였습니다.<br />리스트로 돌아가시겠습니까?</>,
    SUCCESS_PATCH: <>수정에 성공하였습니다. <br />리스트로 돌아가시겠습니까?</>,
    FAILURE_SAVE: '저장에 실패하였습니다.',
    FAILURE_POST: '등록에 실패하였습니다.',
    FAILURE_PATCH: '수정에 실패하였습니다.',
    FAILURE_DELETE: '삭제에 실패했습니다.',
    COMPLETE_POST: '저장이 완료되었습니다.',
    COMPLETE_DELETE: '삭제가 완료되었습니다.',
    SUCCESS_DEVICE_POST: '장치등록이 완료되었습니다.',
    SUCCESS_DEVICE_PATCH: '장치수정이 완료되었습니다.',
    FAILURE_DEVICE_GET: '장치정보 조회에 실패했습니다.',
    FAILURE_REQUEST: '요청에 실패 했습니다.',
    NO_ACCESS: '권한이 없어 사용할 수 없는 화면입니다.',

    /** 관리자 > 문자 관리 */
    SELECT_MODIFY_MESSAGE: '수정 할 메시지를 1개만 선택하십시오.',

    CONFIRM_MESSAGE_PATCH: '선택하신 문자를 수정하시겠습니까?',
    CONFIRM_MESSAGE_DELETE: <>선택하신 문자를 삭제하시겠습니까?<br/>삭제 후 복구할 수 없습니다.</>,

    /** 관리자 > 계정 관리 */
    SELECT_ACCOUNT_STATE: '변경할 계정 상태를 선택하세요.',

    /** 관리자 > 장치 관리 */
    CANNOT_DELETE_USING_DEVICE: '사용중인 장치가 있어 삭제할 수 없습니다.',
    NO_REGISTERED_DEVICE: '등록된 장치가 없습니다.',
    CHANGED_INSTALLATION_PLACE: <>장치의 위치가 입력하신 주소와 다르게 위치되었습니다.<br /> 해당 위치에 저장하시겠습니까?</>,

    /** 관리자 > 게시물 관리 > 팝업 관리 */
    CANNOT_SAVE_NO_IMAGE: '이미지가 등록되지 않아 저장할 수 없습니다.',
    CANNOT_SAVE_OVER_IMAGE_SIZE: '이미지 용량이 3MB 보다 큽니다.',

    /** 사용자 */
    ALERT_ALREADY_LOGGED_IN: '로그인상태입니다. 메인화면으로 이동합니다.',

    SUCCESS_FIND_PASSWORD: '성공하였습니다. 로그인 화면으로 돌아갑니다.',

    /** 사용자 > 회원가입 */
    ALERT_FOLLOW_PROPER_JOIN_ORDER: '올바른 회원구분에 따라 가입절차를 진행해주시기 바랍니다.',
    ALERT_HAVE_TO_AGREE_ALL_CLAUSE: '모든 약관에 동의하여 주시기 바랍니다.',
    ALERT_ALREADY_JOIN_INFO: '이미 가입되어있는 정보입니다. 로그인 후 서비스를 이용하시기 바랍니다. 메인화면으로 이동합니다.',
    ALERT_CLICK_DUPLICATE_CHECK: '중복확인버튼을 클릭하여 아이디 중복확인을 해주세요.',
    ALERT_INVALID_PASSWORD: '비밀번호 형식이 올바르지 않습니다.',

    CONFIRM_CANCEL_JOIN: '회원가입을 취소하시겠습니까? 확인을 누르시면 홈화면으로 이동합니다.',

    /** 사용자 > 비밀번호 찾기 */
    ALERT_EMPTY_PASSWORD: '저장할 비밀번호를 입력하십시오.',
    ALERT_EMPTY_CHECK_PASSWORD: '비밀번호 확인란을 입력하십시오.',
    ALERT_INVALID_REGEX_PASSWORD: '비밀번호 형식이 잘못되어 저장할 수 없습니다. (5~20자리의 영문 소문자, 숫자 조합)',
    ALERT_DIFFERENT_PW_WITH_CHECK_PW: '비밀번호가 다르거나 올바른 형식이 아닙니다.',

    /** 사용자 > 마이페이지 */
    ALERT_CHECK_DELETE_SHARE_ACCOUNT: '삭제할 공유회원을 선택해주세요.',

    CONFIRM_DELETE_SHARE_ACCOUNT: '선택하신 공유회원을 정말 삭제하시겠습니까? 삭제 후 복구할 수 없습니다.',
    CONFIRM_BE_WITHDRAWAL_ACCOUNT: <>회원탈퇴를 진행 하시겠습니까?<br />탈퇴 후 회원정보는 모두 삭제됩니다.</>,

    /** 사용자 > 비밀번호 변경 */
    DIFFERENCE_NEW_PASSWORD: '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.'
  },

  // 공통 문구
  COMMON_WORDS: {
    INFO: '안내',
    SUCCESS: '성공',
    FAILURE: '실패',
    WARNING: '경고',
    ERROR: '오류',
    NO_SELECTED_ITEM: '선택 없음',

    /** 관리자 > 계정 관리 */
    USING_SERVICE: '이용중인 서비스',
    USER_STATE_MODIFY: '사용자 상태 수정',
    ACCOUNT_STATE_MODIFY: '계정 상태 수정',
  },

  // 저장실패 메세지 관리
  SAVE_ERROR_MESSAGE: {

    COMMON: {
      ONE_MORE_THAN_CHECKED: '반드시 하나 이상을 선택하셔야 합니다.',

    },
    /** 장치관리 */
    DEVICE_MANAGE: {
      FACILITY_NAME: '시설군이 모두 선택되지 않아 저장할 수 없습니다.',

      MANAGEMENT_CODE_EMPTY: '관리번호가 입력되지 않아 저장할 수 없습니다.', // 관리번호 공백 불가
      MANAGEMENT_CODE_VALID: '관리번호에 한글, 영문, 숫자를 포함한 최소 1~30자를 입력하세요.', // 관리번호 평가

      MODEL_NAME_EMPTY: '모델 명이 입력되지 않아 저장할 수 없습니다.', // 모델 명 공백 불가
      MODEL_NAME_VALID: '모델 명에 한글, 영문, 숫자를 포함한 최소 1~30자를 입력하세요.', // 모델 명 평가

      VENDOR_ID_EMPTY: '총판을 선택하지 않아 저장할 수 없습니다.', // 총판명
      VENDOR_ID_VALID: '총판 명에 한글, 영문, 숫자를 포함한 최소 1~30자를 입력하세요.', // 총판명 평가

      DEV_EUI_EMPTY: 'DevEUI가 입력되지 않아 저장할 수 없습니다.', // DevEUI
      DEV_EUI_VALID: 'DevEUI에 영문, 숫자를 포함한 최소 1~50자를 입력하세요.', // DevEUI 평가

      INSTALLATION_DATE_EMPTY: '설치일이 입력되지 않아 저장할 수 없습니다.', // 설치일
      INSTALLATION_DATE_VALID: '설치일에 \'년도4자리-월2자리-일2자리\'로 입력해주세요.(예 : 2019-10-30)',

      INSTALLATION_LOCATION_EMPTY: '설치위치가 입력되지 않아 저장할 수 없습니다.', // 설치 위치
      INSTALLATION_LOCATION_VALID: '설치위치에 한글, 영문, 숫자를 포함한 최소 1~10자를 입력하세요.',

      INSTALLATION_PLACE_CODE_EMPTY: '설치 장소를 선택하지 않았습니다.',

      INSTALLATION_PLACE_NAME_EMPTY: '장소 명이 입력되지 않아 저장할 수 없습니다.',
      INSTALLATION_PLACE_NAME_VALID: '장소 명에는 한글,영문,숫자 최대 20자만 입력가능합니다.',

      INSTALL_ADDRESS_EMPTY: '주소가 입력되지 않아 저장할 수 없습니다.',
      INCORRECT_LAT_LNG_DONG_CODE: '선택된 위치 정보가 올바르지 않습니다. 중랑구의 관할지역인지 확인해 주십시오.',

      ADDRESS_EMPTY: '주소가 입력되지 않아 저장할 수 없습니다.',
      ADDRESS_DUPLICATE: '동일한 주소가 이미 등록되어 저장할 수 없습니다. (동일한 주소에 동일한 장치 정보 등록불가)', // 동일한 주소 입력

      CHARGE_NAME_VALID: <>잘못된 형식의 소유주(관리자) 명이라 저장할 수 없습니다. <br />(한글, 숫자 최소 2자, 최대 5자)</>,

      TELEPHONE_NUMBER: '연락처에는 숫자 10~11자만 입력가능합니다.',
      MOBILE_NUMBER: '잘못된 형식의 휴대폰 번호라 저장할 수 없습니다.(숫자 10~11자)',

      INSTALL_PLACE_DESCRIPTION_VALID: '기타에는 특수 문자를 제외한 최대 2000자까지만 입력가능 합니다.',

      NOT_CONTAINED_SECTION: '중랑구에 소속된 곳이 아닙니다.',

      VEHICLE_INSTALLATION_TYPE_EMPTY: '설치 유형을 선택하지 않았습니다.',

      VEHICLE_COMPANY_CODE_EMPTY: '차량의 소속을 선택하지 않았습니다.',

      VEHICLE_VEHICLE_NUMBER_EMPTY: '차량 번호를 입력하지 않았습니다.',
      VEHICLE_VEHICLE_NUMBER_VALID: '잘못된 형식의 차량 번호 입니다.(최소 4자, 최대8자)',

      VEHICLE_VEHICLE_TYPE_EMPTY: '차량 구분을 선택하지 않았습니다.',

      VEHICLE_CARRYING_CAPACITY_EMPTY: '적재 용량을 입력하지 않았습니다.',
      VEHICLE_CARRYING_CAPACITY_INVALID: '적재용량이 올바르지 않습니다. (소수점 포함 최대 3자리)',

      VEHICLE_GPS_SCHEDULE_TIME_EMPTY: '에서의 운행 시작 시간과 종료 시간을 입력해야 합니다.',
      VEHICLE_GPS_SCHEDULE_SINGLE_TIME_EMPTY: '출발 시간과 종료 시간을 모두 입력해야 합니다.',
      VEHICLE_GPS_SCHEDULE_TIME_INVALID: '올바른 형태의 운행시간을 입력해야 합니다. (예. 00:00:00 ~ 23:59:00)',
      VEHICLE_GPS_SCHEDULE_NO_SELECTED_DAY_WITH_TIME: '운행시간을 입력한 행정동의 운행 요일을 체크해야 합니다.',

      COMPLETION_DATE_VALID: '준공일자는 숫자 8자리만 입력 가능합니다.',

      BUILDING_STRUCTURE_VALID: '건축물 구조에 한글, 영문, 숫자를 포함한 최소 1~30자를 입력하세요.',

      BUILDING_GRADE_VALID: '시설 등급을 선택하지 않았습니다.',

      OWNER_NAME_EMPTY: '소유주명이 입력되지 않아 저장할 수 없습니다.',
      OWNER_MOBILE_NUMBER_EMPTY: '소유주 휴대폰번호가 입력되지 않아 저장할 수 없습니다.',
    },
    /**  */
    POST_MANAGE: {
      POPUP_TITLE_EMPTY: '팝업의 제목이 없어 저장할 수 없습니다.',
      NOTICE_TITLE_EMPTY: '공지사항의 제목이 없어 저장할 수 없습니다.',
      NOTICE_EDITOR_EMPTY: '내용이 입력되지 않아 저장할 수 없습니다.',
      IMAGE_EMPTY: '이미지가 등록되지 않아 저장할 수 없습니다.',
    },
    /** 계정관리 */
    ACCOUNT_MANAGE: {

      CHANGE_USER_STATE_CHECK_PASSWORD_FAILURE: '비밀번호가 틀렸습니다.',

      CHANGE_USER_STATE_SUCCESS: '회원탈퇴가 완료되었습니다.',
      CHANGE_USER_STATE_FAILURE: '회원탈퇴가 실패하였습니다.',

      USER_USING_SERVICE_PATCH_SUCCESS: '저장이 완료되었습니다.',
      USER_USING_SERVICE_PATCH_FAILURE: '저장을 실패하였습니다.',

      POST_AUTH_SUCCESS: '권한 생성에 성공하였습니다.',
      POST_AUTH_FAILURE: '권한 생성에 실패하였습니다.',
    },

    /** 문자 관리 */
    MESSAGE_MANAGEMENT: {
      NO_SELECT_DEVICE: '선택된 장치가 없습니다.',

      NO_MORE_5_PERSON: '최대 5명까지만 등록할 수 있습니다.',
      NO_MORE_2000_BYTES: '입력 할 수 있는 범위를 넘었습니다.(최대 2000 bytes)',

      NO_SELECT_MESSAGE_SENDING_STANDARD: '문자 발송 기준을 선택해야 합니다.',
      NEED_MORE_THAN_1_PERSON: '한 명 이상의 번호를 입력해야 합니다.',
      NO_MESSAGE_CONTENTS: '문자 내용을 입력해야 합니다.',
      NO_MESSAGE_RESERVATION_TYPE: '메시지 예약 유형을 선택해야 합니다.',

      NO_SEND_NUMBERS: '발신자 번호를 입력해야 합니다.',
      INVALID_SEND_NUMBERS: '잘못된 형식의 휴대폰 번호라 저장할 수 없습니다.(숫자 10~11자)',

      NO_MOBILE_NUMBER: '수신 번호를 하나 이상 입력해야 합니다.',
      INVALID_MOBILE_NUMBER: <>수신 번호에 올바르게 입력되지 않은 전화번호가 있습니다.<br/>(연락처에는 숫자 10~11자만 입력가능합니다.)</>,

      NO_FORECAST_TYPE: '측정 센서 선택해야 합니다.',
      NO_FORECAST_STANDARD: '문자 발송 기준을 선택해야 합니다.',
    }
  },

  /** 모달 타입 */
  MODAL_TYPE: {
    CONFIRM: 'confirm',
    SUCCESS: 'success',
    FAILURE: 'fail',
  },

  /** svg, kakao map type */
  MAP_TYPE: {
    ATMOSPHERE: { // 대기 환경
      index: 'ATMOSPHERE',
      ULTRA_FINE_DUST: 'ultra_fine_dust',
      FINE_DUST: 'fine_dust',
      CO2: 'co2',
      VOC: 'voc',
      TEMPERATURE: 'temperature',
      HUMIDITY: 'humidity'
    },
    BUILDING: { // 노후 건물
      index: 'BUILDING',
      GRADIENT: 'GRADIENT',
      CRACK: 'CRACK',
    },
    CLEANING: { // 청소 환경
      index: 'CLEANING',
      VEHICLE: 'VEHICLE',
      RECYCLE_BIN: 'RECYCLE_BIN'
    },
    SECURITY_LIGHT: 'SECURITY_LIGHT', // 스마트 보안등
    CCTV: { // 영상 분석
      index: 'CCTV',
      PERSON: 'PERSON',
      CAR: 'CAR'
    },
  },
  MEASUREMENT_TYPE: {
    ALL: 'all',
    ULTRA_FINE_DUST: 'ultra_fine_dust',
    FINE_DUST: 'fine_dust',
    CO2: 'co2',
    VOC: 'voc',
    TEMPERATURE: 'temperature',
    HUMIDITY: 'humidity',
    PERSON: 'person',
    CAR: 'car',
    CRACK: 'crack',
    GRADIENT: 'gradient',
  },
  EXCEL_TYPE: {
    ADMIN_DEVICE: {
      FINE_DUST_INSTALL_PLACE: 'fineDust',
      FINE_DUST_DEVICE: 'fineDustDevice',
      GRADIENT_INSTALL_PLACE: 'gradient',
      GRADIENT_DEVICE: 'gradientDevice',
      CRACK_INSTALL_PLACE: 'crack',
      CRACK_DEVICE: 'crackDevice',
      VEHICLE_GPS_INSTALL_PLACE: 'vehicleGPS',
      CCTV_INSTALL_PLACE: 'cctv',
      SECURITY_LIGHT_INSTALL_PLACE: 'smartSecurityLight',
      RECYCLE_BIN_INSTALL_PLACE: 'smartRecycleBin',
    },
    ADMIN_STATISTICS: {
      ATMOSPHERE: 'atmosphereStatistics',
      ATMOSPHERE_DETAIL: 'atmosphereStatisticsDetail',
      CCTV: 'cctvStatistics',
      CCTV_DETAIL: 'cctvStatisticsDetail',
    },
    USER_STATISTICS: {
      PLATFORM_IO: 'platformIO',
      SERVICE_USING: 'serviceUsing'
    },
    USER_DATA: {
      ATMOSPHERE_MEASUREMENT: 'atmosphereDataExcel',
      CCTV_MEASUREMENT: 'cctvDataExcel',
      MYPAGE_MEASURE_STATISTICS: 'mypageDataExcel',
      MYPAGE_SHARE_USER_DOCUMENT_FORM: 'shareUserDocumentExcel'
    },
  },
  /** 날짜 타입 */
  DATE_TYPE: {
    START: 'start',
    END: 'end',
  },
  /** 기간검색 범위 */
  DATE_RANGE: {
    A_YEAR_AGO: moment()
      .add(-1, 'year')
      .format('YYYY-MM-DD'),
    A_MONTH_AGO: moment()
      .add(-1, 'month')
      .format('YYYY-MM-DD'),
    A_WEEK_AGO: moment()
      .add(-7, 'day')
      .format('YYYY-MM-DD'),
    A_DAY_AGO: moment()
      .add(-1, 'day')
      .format('YYYY-MM-DD'),
    TODAY: moment()
      .format('YYYY-MM-DD'),
  },
  /** datetime type */
  DATETIME_TYPE: {
    HOUR: 'hour', // 시간
    DAY: 'day', // 일간
    MONTH: 'month', // 월간
  },
  /** datetime type */
  GROUP_TYPE: {
    DAILY: 'daily', // 일간
    MONTHLY: 'monthly', // 월간
  },
  STATUS_TYPE: {
    ATMOSPHERE: [
      {
        name: '매우좋음',
        value: 'very_good',
      },
      {
        name: '좋음',
        value: 'good',
      },
      {
        name: '보통',
        value: 'normal',
      },
      {
        name: '나쁨',
        value: 'bad',
      },
      {
        name: '매우나쁨',
        value: 'very_good',
      },
      {
        name: '점검',
        value: 'check',
      },
    ],
    BUILDING: [
      {
        name: '관심',
        value: 'interest',
      },
      {
        name: '주의',
        value: 'caution',
      },
      {
        name: '경계',
        value: 'warning',
      },
      {
        name: '심각',
        value: 'critical',
      },
      {
        name: '점검',
        value: 'check',
      },
    ]
  },
  /** 이미지 파일 확장자 */
  IMAGE_FILE_EXTENSIONS: ['bmp', 'rle', 'dib', 'jpeg', 'jpg', 'gif', 'png', 'tif', 'tiff']
}; // CONST

export const ADMIN_CONST = {
  BASE_ROUTER_PATH: process.env.BASE_ROUTER_PATH || '/front/admin',
  BASE_IMAGE_PATH: process.env.ADMIN_BASE_IMAGE_PATH || '/static/images/admin',
};

export const USER_CONST = {
  BASE_ROUTER_PATH: process.env.BASE_ROUTER_PATH || '/front/user',
  BASE_IMAGE_PATH: process.env.USER_BASE_IMAGE_PATH || '/static/images/user',

  EXCEPTION_OBJECT: {
    LOGIN_OUT: {
      FACILITY: {
        kindergarten: 'nurs_schl',
        coopInfantCare: 'coop_child'
      }
    }
  },
};

export const COMMON_CHART_OPTION = {
  maintainAspectRatio: false, // 차트 비율 유지
  responsive: true,
  elements: {
    line: {
      tension: 0,             // 차트 각지게
    },
  },
  layout: {
    padding: {
      right: 30,              // 맨 우측 데이터가 차트 영역밖으로 나가서 데이터 값 안보이는 것을 방지하기 위한 옵션
    },
  },
  plugins: {                  // chartjs-plugin-datalabels 플러그인 설치 (차트 데이터 표기 위한 플러그인)
    datalabels: {
      display: 'auto',
      color: 'black',
      anchor: 'end',
      align: 'start',
      offset: -18, // 그래프 위의 상단데이터 위치
    }
  },
  legend: {
    display: false, // 각 그래프에 대한 범례. 클릭에 따라 표시 될지 안될지가 결정된다.
    // align: 'start',
    position: 'top',
    margins: {
      top: -10
    }
  },
  tooltips: {
    // tooltip box 내부에 같은 x축에 있는 데이터를 모두 표시해주는 옵션. 이 옵션을 활성화 하면 여러개의 차트에 같은 x 축 선택시, 다른 차트 데이터를 구분할 수 있다.
    // mode: 'label',
    custom: function (tooltip) {
      if (!tooltip) return;
      tooltip.displayColors = false;    // tooltip 맨 앞에 컬러박스 보여지는 것 여부
    },
  },
  dataset: {
    maxBarThickness: 50
  },
  scales: {
    yAxes: [{
      scaleLabel: {
        display: false,
      },
      ticks: { // y축 간격
        beginAtZero: true,      // 데이터 0부터 시작하는지 여부
      },
      gridLines: {
        drawOnChartArea: false, // grid 선 보임, 안보임
      }
    }],
    xAxes: [
      {
        maxBarThickness: 50,
        afterTickToLabelConversion: function (scaleInstance) {
          // console.log(scaleInstance);
          // 첫번째 라벨 안보이도록 함.
          // scaleInstance.ticks[0] = null;
        },
        id: 'first-x-axis',
        ticks: {
          autoSkip: false,
          min: 30
          // display: false
        },
        // barPercentage: 0.3,
        gridLines: {
          display: false,
          drawOnChartArea: false,
          tickMarkLength: 20
        }
      }]
  }
};

export default CONST;
