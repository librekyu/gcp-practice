import Backbone from 'backbone';
import { USER_CONST } from '../../common/globalConst';

/**
 * 공통코드
 * */
const CommonCode = Backbone.Model.extend({
  // instance method
  defaults: {
    code: '',
    name: '',
  },
});

const CommonCodeList = Backbone.Collection.extend({
  model: CommonCode,

  getMapToSelectData(isLoggedIn) {
    const { models } = this;
    const datas = (models
      && models
      /**
       * 로그인 하지 않으면 어린이집(nurs_schl), 공동 육아방(coop_child)는 보여주지 않는다.
       * 로그인 상태면 모든 시설 목록을 보여주도록 한다.
       *  */
        .filter((model) => {
            const code = model.get('code');
            return isLoggedIn
              || (code !== USER_CONST.EXCEPTION_OBJECT.LOGIN_OUT.FACILITY.kindergarten
                && code !== USER_CONST.EXCEPTION_OBJECT.LOGIN_OUT.FACILITY.coopInfantCare);
          }
        )
        .map((model) => {
          return {
            name: model.get('name'),
            value: model.get('code')
          };
        }));

    return datas;
  },
  // vendorList는 좀 다름
  getVendorListData() {
    const { models } = this;
    const datas = (models
      && models.map((model) => {
        return {
          name: model.get('vendorCodeName'),
          value: model.get('vendorId')
        };
      }));
    return datas;
  }
});

/**
 * 벤더
 * */
export { CommonCodeList };
