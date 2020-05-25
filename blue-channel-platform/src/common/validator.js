class Validator {
  /**
   * 띄어 쓰기가 포함되어 있는지 아닌지 나타내는 함수.
   * @static
   * @param {string} value
   * @returns {boolean} true/false
   * */
  static isContainedSpace = (value) => /\s/.test(value);

  /**
   * 한글,영문,숫자 최소 min자 이상 ~ 최대 max자
   * @static
   * @param {string} value, {int} min, {int} max
   * @returns {boolean} true/false
   */
  // static isValidKrEngNum = (value, min, max) => {
  //   const regExp = new RegExp(`^(?=.*[가-힣])|(?=.*[a-z])|(?=.*[A-Z])|(?=.*[\d]){${min},${max}}$`);
  //   return regExp.test(value);
  // };
  static isValidKrEngNum = (value, min, max) => {
    const regExp = new RegExp(`^[가-힣|a-z|A-Z|0-9|]{${min},${max}}$`);
    const regExp2 = new RegExp(/\s/);
    return regExp.test(value) && !regExp2.test(value);
  };

  /**
   * 영문,숫자 최소 min자 이상 ~ 최대 max자
   * @static
   * @param {string} value, {int} min, {int} max
   * @returns {boolean} true/false
   */
  static isValidEngNum = (value, min, max) => {
    const regExp = new RegExp(`^[a-z|A-Z|0-9]{${min},${max}}$`);
    return regExp.test(value);
  };

  /**
   * 날짜 형식 0000-00-00
   * @static
   * @param {string} value
   * @returns {boolean} true/false
   * @todo 숫자 8자리로 할 지, '0000-00-00'으로 할 지 정확히 해야 함. 정책 상 숫자 8자리, 실제론 '0000-00-00'
   *       후자면 아래 regExp로 변경하면 됨.
   */
  static isValidDate = (value) => {
    const regExp = new RegExp(/^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/);
    // const regExp = new RegExp(/^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/);

    return regExp.test(value);
  };

  /**
   * 한글, 숫자로 이루어진 2~5글자의 관리자 이름 정규식
   * @static
   * @param {string} value
   * @returns {boolean} 참 거짓
   */
  // static managerName = (value) => {
  //   const regExp = /^(?=.*[가-힣])|(?=.*[\d]).{2,5}$/;
  //   return regExp.test(value);
  // };
  static managerName = (value) => {
    const regExp = /^[가-힣|0-9]{2,5}$/;
    return regExp.test(value);
  }

  /**
   * 숫자만을 허용하는 10~11자리 숫자의 연락처, 휴대폰 번호 정규식
   * @static
   * @param {string} value
   * @returns {boolean} 참 거짓
   */
  static validationNumber = (value) => {
    const regExp = /^[0-9]{10,11}$/;
    return regExp.test(value);
  };

  /**
   * 숫자만을 허용하는 최대 15자리 숫자의 연락처, 휴대폰 번호 정규식
   * @static
   * @param {string} value
   * @returns {boolean} 참 거짓
   */
  static validationNumberMax15 = (value) => {
    const regExp = /^[0-9]{0,15}$/;
    return regExp.test(value);
  };

  /**
   * 한글, 영문, 숫자 최대 20자의 설치장소이름 정규식
   * @static
   * @param {string} value
   * @returns {boolean} 참 거짓
   */
  static installationPlaceName(value) {
    const regExp = /^(?=.*[가-힣])|(?=.*[a-z])|(?=.*[A-Z])|(?=.*[\d]).{1,20}$/;
    return regExp.test(value);
  }

  /**
   * 한글, 영문, 숫자, 띄어쓰기 최대 2000자의 기타 데이터 정규식
   * @static
   * @param {string} value
   * @returns {boolean} 참 거짓
   */
  // static installationPlaceDescription(value) {
  //   const regExp = new RegExp(`^(?=.*[가-힣\s])|(?=.*[a-z\s])|(?=.*[A-Z\s])|(?=.*[\d\s]){${1},${2000}}$`);
  //   return regExp.test(value);
  // };
  static installationPlaceDescription(value) {
    //const regExp = new RegExp(`^[ㄱ-힣|a-z|A-z|0-9|\\s|]{${1},${2000}}$`); // 자음,모음 허용
    const regExp = new RegExp(`^[가-힣|a-z|A-z|0-9|\\s|]{${1},${2000}}$`);
    return regExp.test(value);
  }

  /**
   * 차량 번호 validate 00가0000 ~ 000가0000
   * @static
   * @param {string} value
   * @returns {boolean} 참 거짓
   */
  static validVehicleNumber(value) {
    const regExp = new RegExp(`^[가-힣|0-9|\\s]{4,8}$`);
    return regExp.test(value);
  }

  /**
   * 적재용량 validate 숫자, Dot 최대 3자리
   * @static
   * @param {string} value
   * @returns {boolean} 참 거짓
   */
  static carryingCapacity(value) {
    const regExp = new RegExp(`^[0-9]+(.[0-9]{1,3})?$`);
    return regExp.test(value);
  }

  /**
   * 영문,숫자 포함 최소 min자 이상 ~ 최대 max자
   * @static
   * @param {string} value
   * @param {int} min
   * @param {int} max
   * @returns {boolean} true/false
   */
  static isValidEngNumPw = (value, min, max) => {
    const regExp = new RegExp(`^[a-z]|[0-9](?=.*[0-9])[0-9a-z]{${min},${max}}$`); // 영문 소문자+숫자 포함 일반 정규식
    const chk2 = new RegExp(/[a-z]/i); // 영문 소문자 포함 체크
    const chk3 = new RegExp(/\d/); // 숫자 포함 체크
    const chk4 = new RegExp(/[`~!@#$%^&*|\\\'\";:\/?]/gi); // 특수문자 체크
    return regExp.test(value) && chk2.test(value) && chk3.test(value) && !chk4.test(value);
    // return regExp.test(value);
  }

  static isValidScheduleTime = (value) => {
    const regExp = new RegExp(/^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9]):[0-5][0-9]$/);
    return regExp.test(value);
  }
}

export default Validator;
