import React from 'react';
import Backbone from 'backbone';
import Util from '../../../common/util';

const _ = require('underscore');

const BasicMarkerDetailModel = Backbone.Model.extend({
    defaults: {
      installationPlace: {},
      statistics: {
        labels: [],
        datasets: [{
          tooltip: [],
          data: [],
        }]
      },
    },
    initialize() {
    },
  },
  {
    createModelFromServerData: (json) => new BasicMarkerDetailModel(json)
  }
);

const UnionMapAtmosphereMarkerDetailModel = BasicMarkerDetailModel.extend({
  defaults: _.extend({}, BasicMarkerDetailModel.prototype.defaults,
    {
      installationPlace: {
        measurementValue: '',
        installationPlaceName: '',
      },
    }
  ),
  getAtmosphereMarkerDetailFromModel () {
    const attrs = this.attributes;
    const splitMeasurementValue = attrs.installationPlace.measurementValue && attrs.installationPlace.measurementValue.split(' ');

    let atmosphereStatusName;
    let atmosphereMeasurementValue;
    let atmosphereStatus;

    if(Array.isArray(splitMeasurementValue) && splitMeasurementValue[0] && splitMeasurementValue[1]){
      atmosphereStatusName = splitMeasurementValue[0];
      atmosphereMeasurementValue = splitMeasurementValue[1];
    }
    atmosphereStatus = Util.conversionAtmosphereDataToColorNImg(atmosphereStatusName);

    return {
      statusName: atmosphereStatusName,
      measurementValue: atmosphereMeasurementValue || attrs.installationPlace.measurementValue,
      status: atmosphereStatus,
      installationPlaceName: attrs.installationPlace.installationPlaceName,
      chartData: attrs.statistics,
    }
  }
});


const UnionMapCctvMarkerDetailModel = BasicMarkerDetailModel.extend({
  defaults: _.extend({}, BasicMarkerDetailModel.prototype.defaults,
    {
      installationPlaceCode: '',
      installationPlaceCodeName: '',
      address: '',
      detailAddress: '',
      personCount: '',
      personCountStatusName: ''
    }
  ),
  getCctvMarkerDetailFromModel () {
    const attrs = this.attributes.installationPlace;
    const address = attrs.address;
    const detailAddress = attrs.detailAddress;
    const personCountStatusName = attrs.personCountStatusName;
    const personCountStatus = Util.conversionAtmosphereDataToColorNImg(personCountStatusName);
    const returnAddress = ((address || detailAddress) && address + ' ' + detailAddress) || '';

    return {
      measurementValue: attrs.personCount,
      status: personCountStatus,
      statusName: personCountStatusName,
      installationPlaceCode: attrs.installationPlaceCode,
      installationPlaceName: attrs.installationPlaceCodeName,
      address: returnAddress,
      chartData: this.attributes.statistics,
    };
  }
});


export { UnionMapAtmosphereMarkerDetailModel, UnionMapCctvMarkerDetailModel };
