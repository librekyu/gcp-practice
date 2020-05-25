// import Backbone from 'backbone';
// import React from 'react';
//
// const MyfavoritesAirQuality = Backbone.Model.extend({
//
//     defaults: {
//       placeName: '',
//       placeId: '',
//       measureDatetime: '',
//       superFineDust: 0,
//       superFineDustState: '',
//       fineDust: 0,
//       fineDustState: '',
//       co2: 0,
//       co2State: '',
//       voc: 0,
//       vocState: '',
//       temperature: 0,
//       humidity: 0
//     },
//     initialize() {
//
//     },
//   },
//   {
//     createModelFromServerData: (json) => new MyfavoritesAirQuality(json)
//   });
//
// const MyfavoritesAirQualityList = Backbone.Collection.extend({
//   model: MyfavoritesAirQuality,
//
//   getMapToMyfavoritesAirQualityList(deleteFavorite) {
//     const { models } = this;
//     const datas = models && models.map((model, index) => {
//       console.log(MyfavoritesAirQuality);
//       console.log(model);
//       const { placeName } = model;
//       const { placeId } = model;
//       const { superFineDust } = model;
//       const { superFineDustState } = model;
//       const superFineDustClassName = getClassName(model.superFineDustState);
//       const { fineDust } = model;
//       const { fineDustState } = model;
//       const fineDustClassName = getClassName(model.fineDustState);
//       const { co2 } = model;
//       const { co2State } = model;
//       const co2ClassName = getClassName(model.co2State);
//       const { voc } = model;
//       const { vocState } = model;
//       const vocStateClassName = getClassName(model.vocState);
//       const { temperature } = model;
//       const { humidity } = model;
//
//       return (
//         <li className={index % 2 ? 'odd' : 'even'} key={index}>
//           <div className="place">
//             <strong>{placeName}</strong>
//             <a className="btn_close" onClick={(e) => deleteFavorite(e, placeId)}>닫기</a>
//             <ul>
//               <li>
//                 <span className="kinds">초미세먼지</span>
//                 <span className={superFineDustClassName}>{superFineDustState}</span>
//                 <span className="data">{superFineDust}㎍/㎥</span>
//               </li>
//               <li>
//                 <span className="kinds">미세먼지</span>
//                 <span className={fineDustClassName}>{fineDustState}</span>
//                 <span className="data">{fineDust}㎍/㎥</span>
//               </li>
//               <li>
//                 <span className="kinds">이산화탄소</span>
//                 <span className={co2ClassName}>{co2State}</span>
//                 <span className="data">{co2}㎍/㎥</span>
//               </li>
//               <li>
//                 <span className="kinds row2">휘발성 <br />유기화합물</span>
//                 <span className={vocStateClassName}>{vocState}</span>
//                 <span className="data">{voc}㎍/㎥</span>
//               </li>
//               <li className="temperature">
//                 <span className="kinds">기온</span>
//                 <span className="data">{temperature}℃</span>
//               </li>
//               <li className="humidity">
//                 <span className="kinds">습도</span>
//                 <span className="data">{humidity}%</span>
//               </li>
//             </ul>
//           </div>
//         </li>
//       );
//     });
//   }
// });
//
// export { MyfavoritesAirQualityList };
