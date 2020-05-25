/**
 * svg map marker model
 * */
import Backbone from 'backbone';
import Util from '../../common/util';
import CONST, {USER_CONST} from '../../common/globalConst';
import markerDetail from '../../../src/components/user/common/map/markerDetail';

const _ = require('underscore');

const MarkerModel = Backbone.Model.extend(
  {
    defaults: {
      placeId: 0,
      placeName: '',
      address: '',
      detailAddress: '',
      latitude: 0,
      longitude: 0,
    },
    initialize() {
    },
  },
  {
    createModelFromServerData: (json) => new MarkerModel(json)
  }
);

const AtmosphereMarkerModel = MarkerModel.extend({
  defaults: _.extend({}, MarkerModel.prototype.defaults,
    {
      ultraFineDust: 0,
      ultraFineDustStatusName: '',
      fineDust: 0,
      fineDustStatusName: '',
      temperature: 0,
      humidity: 0,
      voc: 0,
      vocStatusName: '',
      co2: 0,
      co2StatusName: '',
    }),
  initialize() {
  },

}, {
  createModelFromServerData: (json) => new AtmosphereMarkerModel(json),
});

const AtmosphereMarkerList = Backbone.Collection.extend({
  model: AtmosphereMarkerModel,

  // map 데이터를 테이블 데이터 형식으로 변환
  getMapToData() {
    const {models} = this;
    return (models && models.map((model) => ({
      placeId: model.get('installationPlaceId'),
      placeName: model.get('installationPlaceName'),
      address: model.get('address'),
      detailAddress: model.get('detailAddress'),
      latitude: model.get('latitude'),
      longitude: model.get('longitude'),
      // longitude: `127.0${Math.floor(Math.random() * (999))}0`,
      ultraFineDust: model.get('ultraFineDust'),
      ultraFineDustStatusName: model.get('ultraFineDustStatusName'),
      fineDust: model.get('fineDust'),
      fineDustStatusName: model.get('fineDustStatusName'),
      temperature: model.get('temperature'),
      humidity: model.get('humidity'),
      voc: model.get('voc'),
      vocStatusName: model.get('vocStatusName'),
      co2: model.get('co2'),
      co2StatusName: model.get('co2StatusName'),
    }))) || [];
  },
  getAtmosphereMeasurementMarkerForSvg(){
    const {models} = this;
    const markerList = [];
    models && models.map((model, index) => {
      const placeId = model.get('installationPlaceId');
      const placeName = model.get('installationPlaceName');
      const latitude = model.get('latitude');
      const longitude = model.get('longitude');
      const measurementValue = model.get('measurementValue');
      const measurementStatusName = model.get('measurementStatusName');
      const measurementStatus = Util.conversionAtmosphereDataToColorNImg(measurementStatusName);
      markerList.push({
        placeId,
        placeName,
        latitude,
        longitude,
        measurementValue,
        measurementStatusName,
        measurementStatus
      });
    });

    return markerList;

  },
  getAtmosphereMarkerForMap(atmosphereType) {
    const {models} = this;
    const markerList = [];
    switch (atmosphereType) {
      case CONST.MAP_TYPE.ATMOSPHERE.index: {
        models && models.map((model, index) => {
          const placeId = model.get('installationPlaceId');
          const placeName = model.get('installationPlaceName');
          const latitude = model.get('latitude');
          const longitude = model.get('longitude');
          // const longitude = `127.0${Math.floor(Math.random() * (999))}0`;
          const ultraFineDust = model.get('ultraFineDust');
          const ultraFineDustStatusName = model.get('ultraFineDustStatusName');
          const ultraFineDustStatus = Util.conversionAtmosphereDataToColorNImg(ultraFineDustStatusName);
          const fineDust = model.get('fineDust');
          const fineDustStatusName = model.get('fineDustStatusName');
          const fineDustStatus = Util.conversionAtmosphereDataToColorNImg(fineDustStatusName);
          const voc = model.get('voc');
          const vocStatusName = model.get('vocStatusName');
          const vocStatus = Util.conversionAtmosphereDataToColorNImg(vocStatusName);
          const co2 = model.get('co2');
          const co2StatusName = model.get('co2StatusName');
          const co2Status = Util.conversionAtmosphereDataToColorNImg(co2StatusName);
          const temperature = model.get('temperature');
          const temperatureStatusName = model.get('temperatureStatusName');
          const humidity = model.get('humidity');
          const humidityStatusName = model.get('humidityStatusName');

          const infoObject = {
            placeId,
            placeName,
            latitude,
            longitude,
            ultraFineDust,
            ultraFineDustStatusName,
            ultraFineDustStatus,
            fineDust,
            fineDustStatusName,
            fineDustStatus,
            voc,
            vocStatus,
            vocStatusName,
            co2,
            co2StatusName,
            co2Status,
            temperature,
            temperatureStatusName,
            humidity,
            humidityStatusName
          };

          const contents = markerDetail(atmosphereType, infoObject);

          markerList.push({
            ...infoObject,
            contents
          });
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST: {
        models && models.map((model) => {
          const placeId = model.get('installationPlaceId');
          const placeName = model.get('installationPlaceName');
          const latitude = model.get('latitude');
          const longitude = model.get('longitude');
          // const longitude = `127.0${Math.floor(Math.random() * (999))}0`;
          const ultraFineDust = model.get('ultraFineDust');
          const ultraFineDustStatusName = model.get('ultraFineDustStatusName');
          const ultraFineDustStatus = Util.conversionAtmosphereDataToColorNImg(ultraFineDustStatusName);
          const image = ultraFineDustStatus.marker;

          const infoObject = {
            placeId,
            placeName,
            latitude,
            longitude,
            ultraFineDust,
            ultraFineDustStatusName,
            ultraFineDustStatus,
            image
          };

          const contents = markerDetail(atmosphereType, infoObject);

          markerList.push({
            ...infoObject,
            contents
          });
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST: {
        models && models.map((model) => {
          const placeId = model.get('installationPlaceId');
          const placeName = model.get('installationPlaceName');
          const latitude = model.get('latitude');
          const longitude = model.get('longitude');
          // const longitude = `127.0${Math.floor(Math.random() * (999))}0`;
          const fineDust = model.get('fineDust');
          const fineDustStatusName = model.get('fineDustStatusName');
          const fineDustStatus = Util.conversionAtmosphereDataToColorNImg(fineDustStatusName);
          const image = fineDustStatus.marker;

          const infoObject = {
            placeId,
            placeName,
            latitude,
            longitude,
            fineDust,
            fineDustStatusName,
            fineDustStatus,
            image
          };

          const contents = markerDetail(atmosphereType, infoObject);

          markerList.push({
            ...infoObject,
            contents
          });
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.VOC: {
        models && models.map((model) => {
          const placeId = model.get('installationPlaceId');
          const placeName = model.get('installationPlaceName');
          const latitude = model.get('latitude');
          const longitude = model.get('longitude');
          // const longitude = `127.0${Math.floor(Math.random() * (999))}0`;
          const voc = model.get('voc');
          const vocStatusName = model.get('vocStatusName');
          const vocStatus = Util.conversionAtmosphereDataToColorNImg(vocStatusName);
          const image = vocStatus.marker;

          const infoObject = {
            placeId,
            placeName,
            latitude,
            longitude,
            voc,
            vocStatusName,
            vocStatus,
            image
          };

          const contents = markerDetail(atmosphereType, infoObject);

          markerList.push({
            ...infoObject,
            contents
          });
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.CO2: {
        models && models.map((model) => {
          const placeId = model.get('installationPlaceId');
          const placeName = model.get('installationPlaceName');
          const latitude = model.get('latitude');
          const longitude = model.get('longitude');
          // const longitude = `127.0${Math.floor(Math.random() * (999))}0`;
          const co2 = model.get('co2');
          const co2StatusName = model.get('co2StatusName');
          const co2Status = Util.conversionAtmosphereDataToColorNImg(co2StatusName);
          const image = co2Status.marker;

          const infoObject = {
            placeId,
            placeName,
            latitude,
            longitude,
            co2,
            co2StatusName,
            co2Status,
            image
          };

          const contents = markerDetail(atmosphereType, infoObject);

          markerList.push({
            ...infoObject,
            contents
          });
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE: {
        models && models.map((model) => {
          const placeId = model.get('installationPlaceId');
          const placeName = model.get('installationPlaceName');
          const latitude = model.get('latitude');
          const longitude = model.get('longitude');
          // const longitude = `127.0${Math.floor(Math.random() * (999))}0`;
          const temperature = model.get('temperature');

          const infoObject = {
            placeId,
            placeName,
            latitude,
            longitude,
            temperature,
          };

          const contents = markerDetail(atmosphereType, infoObject);

          markerList.push({
            ...infoObject,
            contents
          });
        });
        break;
      }
      case CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY: {
        models && models.map((model) => {
          const placeId = model.get('installationPlaceId');
          const placeName = model.get('installationPlaceName');
          const latitude = model.get('latitude');
          const longitude = model.get('longitude');
          // const longitude = `127.0${Math.floor(Math.random() * (999))}0`;
          const humidity = model.get('temperature');

          const infoObject = {
            placeId,
            placeName,
            latitude,
            longitude,
            humidity,
          };

          const contents = markerDetail(atmosphereType, infoObject);

          markerList.push({
            ...infoObject,
            contents
          });
        });
        break;
      }
      default:
        break;
    }

    return markerList.length > 0 ? markerList : [];
  },
});

const CctvMarkerModel = MarkerModel.extend({
  defaults: _.extend({}, MarkerModel.prototype.defaults,
    {
      installationPlaceCode: '',
      installationPlaceCodeName: '',
      personCount: 0,
      personCountStatusName: ''
    }),
  initialize() {
  },

}, {
  createModelFromServerData: (json) => new CctvMarkerModel(json),
});

const CctvMarkerList = Backbone.Collection.extend({
  model: CctvMarkerModel,

  // map 데이터를 테이블 데이터 형식으로 변환
  getMapToData() {
    const {models} = this;
    return (models && models.map((model) => {

      const installationPlaceCode = model.get('installationPlaceCode');
      const installationPlaceCodeName = model.get('installationPlaceCodeName');
      const address = model.get('address');
      const detailAddress = model.get('detailAddress');
      const latitude = model.get('latitude');
      const longitude = model.get('longitude');
      const personCount = Util.numberWithCommas(model.get('personCount'));
      const personCountStatusName = model.get('personCountStatusName');
      const personCountStatus = Util.conversionAtmosphereDataToColorNImg(personCountStatusName);
      const image = personCountStatus.marker;

      const infoObject = {
        installationPlaceCode,
        installationPlaceCodeName,
        address,
        detailAddress,
        latitude,
        longitude,
        personCount,
        personCountStatusName,
        personCountStatus,
        image
      };
      const contents = markerDetail(CONST.MAP_TYPE.CCTV.index, infoObject);

      return {
        ...infoObject,
        contents
      };
    })) || [];
  }
});

const LightMarkerModel = MarkerModel.extend({
  defaults: _.extend({}, MarkerModel.prototype.defaults,
    {
      onTime: '',
      outTime: '',
    }),
  initialize() {
  },

}, {
  createModelFromServerData: (json) => new LightMarkerModel(json),
});

const LightMarkerList = Backbone.Collection.extend({
  model: LightMarkerModel,

  // map 데이터를 테이블 데이터 형식으로 변환
  getMapToData() {
    const {models} = this;
    return (models && models.map((model) => ({
      placeId: model.get('installationPlaceId'),
      placeName: model.get('installationPlaceName'),
      address: model.get('address'),
      detailAddress: model.get('detailAddress'),
      latitude: model.get('latitude'),
      longitude: model.get('longitude'),
    }))) || [];
  }
});

const CleanMarkerModel = MarkerModel.extend({
  defaults: _.extend({}, MarkerModel.prototype.defaults,
    {
      vehicleId: '',
      vehicleNumber: '',
    }),
  initialize() {
  },

}, {
  createModelFromServerData: (json) => new CleanMarkerModel(json),
});

const CleanMarkerList = Backbone.Collection.extend({
  model: CleanMarkerModel,

  // map 데이터를 테이블 데이터 형식으로 변환
  getMapToData() {
    const {models} = this;
    return (models && models.map((model) => ({
      placeId: model.get('installationPlaceId'),
      placeName: model.get('installationPlaceName'),
      address: model.get('address'),
      detailAddress: model.get('detailAddress'),
      latitude: model.get('latitude'),
      longitude: model.get('longitude'),
    }))) || [];
  }
});

const GradientMarkerModel = MarkerModel.extend({
  defaults: _.extend({}, MarkerModel.prototype.defaults,
    {
      inCount: 0,
      outCount: 0,
    }),
  initialize() {
  },

}, {
  createModelFromServerData: (json) => new GradientMarkerModel(json),
});

const GradientMarkerList = Backbone.Collection.extend({
  model: GradientMarkerModel,

  // map 데이터를 테이블 데이터 형식으로 변환
  getMapToData() {
    const {models} = this;
    return (models && models.map((model) => ({
      placeId: model.get('installationPlaceId'),
      placeName: model.get('installationPlaceName'),
      address: model.get('address'),
      detailAddress: model.get('detailAddress'),
      latitude: model.get('latitude'),
      longitude: model.get('longitude'),
    }))) || [];
  }
});

const CrackMarkerModel = MarkerModel.extend({
  defaults: _.extend({}, MarkerModel.prototype.defaults,
    {
      inCount: 0,
      outCount: 0,
    }),
  initialize() {
  },

}, {
  createModelFromServerData: (json) => new CrackMarkerModel(json),
});

const CrackMarkerList = Backbone.Collection.extend({
  model: CrackMarkerModel,

  // map 데이터를 테이블 데이터 형식으로 변환
  getMapToData() {
    const {models} = this;
    return (models && models.map((model) => ({
      placeId: model.get('installationPlaceId'),
      placeName: model.get('installationPlaceName'),
      address: model.get('address'),
      detailAddress: model.get('detailAddress'),
      latitude: model.get('latitude'),
      longitude: model.get('longitude'),
    }))) || [];
  }
});

export {
  AtmosphereMarkerList,
  CctvMarkerList,
  GradientMarkerList,
  CrackMarkerList,
  CleanMarkerList,
  LightMarkerList
};
