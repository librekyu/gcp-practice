import Backbone from 'backbone';
import Util from '../../../common/util';

const _ = require('underscore');

const BasicMarkerModel = Backbone.Model.extend({
    defaults: {
      installationPlaceId: 0,
      latitude: 0,
      longitude: 0,
    },
    initialize() {
    },
  },
  {
    createModelFromServerData: (json) => new BasicMarkerModel(json)
  }
);

const AtmosphereMarkerModel = BasicMarkerModel.extend({
  defaults: _.extend({}, BasicMarkerModel.prototype.defaults,
    {
      measurementValue: '',
      measurementStatusName : ''
    }
  )
});

const UnionMapAtmosphereMarkerListModel = Backbone.Collection.extend({
  model: AtmosphereMarkerModel,
  getAtmosphereMarkerListFromModel () {
    const { models } = this;

    const datas = (models && models.map((model, index) => {
      const measurementStatusName = model.get('measurementStatusName');
      const measurementStatus = Util.conversionAtmosphereDataToColorNImg(measurementStatusName);
      return {
        installationPlaceId: model.get('installationPlaceId'),
        latitude: model.get('latitude'),
        longitude: model.get('longitude'),
        measurementValue: model.get('measurementValue'),
        measurementStatusName: measurementStatusName,
        measurementStatus: measurementStatus,
        image: measurementStatus.marker,
      }
    }));

    return datas;
  }
});

const CctvMarkerModel = BasicMarkerModel.extend({
  defaults: _.extend({}, BasicMarkerModel.prototype.defaults,
    {
      personCount: '',
      personCountStatusName : ''
    }
  )
});

const UnionMapCctvMarkerListModel = Backbone.Collection.extend({
  model: CctvMarkerModel,
  getCctvMarkerListFromModel () {
    const { models } = this;
    const datas = (models && models.map((model, index) => {
      const personCountStatusName = model.get('personCountStatusName');
      const personCountStatus = Util.conversionAtmosphereDataToColorNImg(personCountStatusName);
      return {
        installationPlaceId: model.get('installationPlaceId'),
        latitude: model.get('latitude'),
        longitude: model.get('longitude'),
        personCount: model.get('personCount'),
        personCountStatusName: personCountStatusName,
        personCountStatus: personCountStatus,
        image: personCountStatus.marker,
      }
    }));

    return datas;
  }
});

export {UnionMapAtmosphereMarkerListModel, UnionMapCctvMarkerListModel};
