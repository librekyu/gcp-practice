import Backbone from 'backbone';

const JoinModel = Backbone.Model.extend({
    default: {
      zipCode: '',
      password: '',
      emailAddress: '',
      termsAgreesIds: '',
      address: '',
      mobileNumber: '',
      detailAddress: '',
      userType: '',
      userId: '',
      isForecastFineDust: '',
      username: ''
    },
    initialize() {
    },
  },
  {
    getJoinData: (data) => ({
      zipCode: data.joinInfo.zoneCode,
      password: data.joinInfo.password,
      emailAddress: `${data.joinInfo.emailId}@${data.joinInfo.emailAddress}`,
      termsAgreesIds:
        `${(data.agree.using) ? 1 : null},${(data.agree.privacy) ? 2 : null},${(data.agree.thirdProviding) ? 3 : null}`,
      address: data.joinInfo.address,
      mobileNumber: data.joinInfo.mobileNumber,
      detailAddress: data.joinInfo.detailAddress,
      userType: data.joinType,
      userId: data.joinInfo.id,
      isForecastFineDust: data.joinInfo.service,
      username: data.joinInfo.userName,
    }),
    createModel: (json) => new JoinModel(json)
  });

export default JoinModel;
