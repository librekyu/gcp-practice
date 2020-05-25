import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import JsmartSelect from '../../../common/jsmartSelect';
import { CommonCodeList } from '../../../../models/user/commonCode';
import AsideLowerTable from './asideLowerLegendTable';
import CONST, { USER_CONST } from '../../../../common/globalConst';
import { USER_DEVICE_COMMON_CODE_ACTIONS } from '../../../../reducers/user/common/deviceCommonCode';
import { initialState, UNION_MAP_LIST_ACTIONS } from '../../../../reducers/user/common/unionMap';

const AsideLnb = ({ asideId, showAside, selectedMapType, handleChangeMapType, legendCategory, setLegendCategory, mapType, atmosphereSearchFilter, setAtmosphereSearchFilter, setIsPopupShow }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.userLogin);

  /** 대기환경 관련 state */
  const [atmosphereType, setAtmosphereType] = useState(CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST);

  /** 노후건물 관련 state */
  const [isGradientOrCrack, setIsGradientOrCrack] = useState(true);

  /** 청소환경 관련 state */
  const [isVehicleOrRecycleBin, setIsVehicleOrRecycleBin] = useState(true);

  /** 영상정보 관련 state */
  /** 스마트 보안등 관련 state */

  /** 공통 코드 */
  const { facilityList, categoryDetailList } = useSelector((state) => state.userDeviceCommonCode); // 공통코드

  /**
   * 최상단에서 맵 타입에 따라 범례를 바꾸는데 노후건물 관련은 (기울기인지 균열인지),
   * 대기환경 관련은 (대기환경의 어떤 유형인지)에 따라 state 를 유지해야하기 때문에 조건 추가
   * */
  useEffect(() => {
    switch (legendCategory) {
      case CONST.MAP_TYPE.ATMOSPHERE.index: {
        setLegendCategory(atmosphereType);
        break;
      }
      case CONST.MAP_TYPE.BUILDING.index: {
        setLegendCategory(isGradientOrCrack ? CONST.MAP_TYPE.BUILDING.GRADIENT : CONST.MAP_TYPE.BUILDING.CRACK);
        break;
      }
      default: {
        break;
      }
    }
  }, [legendCategory, atmosphereType, isGradientOrCrack]);

  const renderSelectBoxByMapType = useCallback(() => {
    return (
      <div>
        <select
          className='w100p'
          name='mapType'
          value={selectedMapType}
          onChange={handleChangeMapType}
        >
          <option value={CONST.MAP_TYPE.ATMOSPHERE.index}>대기 환경</option>
          <option value={CONST.MAP_TYPE.BUILDING.index}>노후 건물</option>
          <option value={CONST.MAP_TYPE.CLEANING.index}>청소 환경</option>
          <option value={CONST.MAP_TYPE.CCTV.index}>영상 분석</option>
          <option value={CONST.MAP_TYPE.SECURITY_LIGHT}>스마트 보안등</option>
        </select>
      </div>
    );
  }, [selectedMapType]);

  /**
   * 대기환경 관련 메서드 START
   * 대기환경 카테고리 선택 할 때 시설군, 상세 시설군, 검색어를 유지한 상태로 검색하기 위해 filter를 포함한 dispatch를 여기서 한다.
   * */
  const handleChangeAtmosphereType = useCallback((e) => {
    const { name } = e.target;
    setAtmosphereType(name);
    setLegendCategory(name);

    switch (name) {
      case CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST:
      case CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST:
      case CONST.MAP_TYPE.ATMOSPHERE.VOC:
      case CONST.MAP_TYPE.ATMOSPHERE.CO2:
      case CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE:
      case CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY: {
        const param = {
          ...atmosphereSearchFilter,
          measurementType: name
        };
        dispatch({
          type: UNION_MAP_LIST_ACTIONS.UNION_MAP_ATMOSPHERE_LIST_REQUEST,
          data: param
        });
        break;
      }
      default:
        break;
    }
  }, [atmosphereSearchFilter]);

  const handleChangeAtmosphereSearchFilter = useCallback((e) => {
    const { name, value } = e.target;
    setAtmosphereSearchFilter((prev) => ({
      ...prev,
      [name]: value
    }));
    if (name && name === 'facilityType' && value) {
      dispatch({
        type: USER_DEVICE_COMMON_CODE_ACTIONS.USER_GET_CATEGORY_DETAIL_LIST_REQUEST,
        data: {
          categoryType: 'facility',
          parentCategoryCode: value
        }
      });
      setAtmosphereSearchFilter((prev) => ({
        ...prev,
        detailFacilityType: ''
      }));
    }

  }, [legendCategory]);

  /** 검색 버튼 누르면 데이터 요청과 오버레이를 꺼버린다. */
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: UNION_MAP_LIST_ACTIONS.UNION_MAP_ATMOSPHERE_LIST_REQUEST,
      data: {
        ...atmosphereSearchFilter,
        measurementType: legendCategory,
      }
    });

    setIsPopupShow(false);
  }, [legendCategory, atmosphereSearchFilter]);
  /** 대기환경 관련 메서드 END */

  /** 노후건물 관련 메서드 START */
  const onClickBuilding = useCallback((e) => {
    /** @todo 기울기냐 크랙이냐에 따라 dispatch 해야함. */
    if (e.target.name === CONST.MAP_TYPE.BUILDING.GRADIENT) {
      setIsGradientOrCrack(true);
      setLegendCategory(CONST.MAP_TYPE.BUILDING.GRADIENT);
      // dispatch({
//       type: ''
      // });
    } else {
      setIsGradientOrCrack(false);
      setLegendCategory(CONST.MAP_TYPE.BUILDING.CRACK);
      // dispatch({
      //       type: ''
      // });
    }
  }, []);
  /** 노후건물 관련 메서드 END */

  /** 청소환경 관련 메서드 START */
  const onClickCleaning = useCallback((e) => {
    /** @todo 차량이냐 분리수거함이냐에 따라 dispatch 해야함. */
    if (e.target.name === CONST.MAP_TYPE.CLEANING.VEHICLE) {
      setIsVehicleOrRecycleBin(true);
      setLegendCategory(CONST.MAP_TYPE.CLEANING.VEHICLE);
      // dispatch({
      //       type: ''
      // });
    } else {
      setIsVehicleOrRecycleBin(false);
      setLegendCategory(CONST.MAP_TYPE.CLEANING.RECYCLE_BIN);
      // dispatch({
      //       type: ''
      // });
    }

  }, []);
  /** 청소환경 관련 메서드 END */

  const renderAsideUpperPartByType = useCallback(() => {
    switch (mapType) {
      case CONST.MAP_TYPE.ATMOSPHERE.index:
      case CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST:
      case CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST:
      case CONST.MAP_TYPE.ATMOSPHERE.VOC:
      case CONST.MAP_TYPE.ATMOSPHERE.CO2:
      case CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY:
      case CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE: {
        return (
          <>
            <br/>
            {/*<div className='divGroup' style={{marginBottom:'10px'}}>*/}
            {/*    <a*/}
            {/*      name={CONST.MAP_TYPE.ATMOSPHERE.index}*/}
            {/*      className={atmosphereType === CONST.MAP_TYPE.ATMOSPHERE.index ? 'btn_l on w100p' : 'btn_l w100p'}*/}
            {/*      onClick={handleChangeAtmosphereType}>*/}
            {/*      전체보기*/}
            {/*    </a>*/}
            {/*</div>*/}
            <div className='divGroup cols2'>
              <div>
                <a
                  name={CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST}
                  className={atmosphereType === CONST.MAP_TYPE.ATMOSPHERE.ULTRA_FINE_DUST ? 'btn_l on w100p' : 'btn_l w100p'}
                  onClick={handleChangeAtmosphereType}>
                  초미세먼지
                </a>
              </div>
              <div>
                <a
                  name={CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST}
                  className={atmosphereType === CONST.MAP_TYPE.ATMOSPHERE.FINE_DUST ? 'btn_l on w100p' : 'btn_l w100p'}
                  onClick={handleChangeAtmosphereType}>
                  미세먼지
                </a>
              </div>

            </div>
            <div className='divGroup cols2'>
              <div>
                <a
                  name={CONST.MAP_TYPE.ATMOSPHERE.CO2}
                  className={atmosphereType === CONST.MAP_TYPE.ATMOSPHERE.CO2 ? 'btn_l on w100p' : 'btn_l w100p'}
                  onClick={handleChangeAtmosphereType}>
                  이산화탄소
                </a>
              </div>
              <div>
                <a
                  name={CONST.MAP_TYPE.ATMOSPHERE.VOC}
                  className={atmosphereType === CONST.MAP_TYPE.ATMOSPHERE.VOC ? 'btn_l on w100p' : 'btn_l w100p'}
                  onClick={handleChangeAtmosphereType}>
                  휘발성 유기 화합물
                </a>
              </div>
            </div>
            <div className='divGroup cols2'>
              <div>
                <a
                  name={CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE}
                  className={atmosphereType === CONST.MAP_TYPE.ATMOSPHERE.TEMPERATURE ? 'btn_l on w100p' : 'btn_l w100p'}
                  onClick={handleChangeAtmosphereType}>
                  기온
                </a>
              </div>
              <div>
                <a
                  name={CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY}
                  className={atmosphereType === CONST.MAP_TYPE.ATMOSPHERE.HUMIDITY ? 'btn_l on w100p' : 'btn_l w100p'}
                  onClick={handleChangeAtmosphereType}>
                  습도
                </a>
              </div>
            </div>
            <br/>
            <form onSubmit={onSubmit}>
              <div className="divGroup cols2">
                <div>
                  <JsmartSelect
                    options={(facilityList instanceof CommonCodeList && facilityList.getMapToSelectData(isLoggedIn)) || []}
                    selectedValue={atmosphereSearchFilter.facilityType}
                    defaultSelect={{
                      name: '시설군 정보',
                      value: ''
                    }}
                    onChange={handleChangeAtmosphereSearchFilter}
                    name='facilityType'
                    className="w100p"
                  />
                </div>
                <div>
                  <JsmartSelect
                    options={(categoryDetailList instanceof CommonCodeList
                      && categoryDetailList.getMapToSelectData()
                    ) || []}
                    selectedValue={atmosphereSearchFilter.detailFacilityType}
                    defaultSelect={{
                      name: '상세 시설군',
                      value: ''
                    }}
                    onChange={handleChangeAtmosphereSearchFilter}
                    name='detailFacilityType'
                    className="w100p"
                  />
                </div>
              </div>

              <div className="divGroup">
                <div className="w75p">
                  <input type="text" name="keyword" value={atmosphereSearchFilter.keyword || ''} className="w100p" placeholder="발생장소, 주소 검색"
                         onChange={handleChangeAtmosphereSearchFilter}/>
                </div>
                <div className="w25p">
                  <input type="submit" className="btn_inline on w100p" value="검색"/>
                </div>
              </div>
            </form>
          </>
        );
      }
      case CONST.MAP_TYPE.BUILDING.index: {
        return (
          <>
            <div className="divGroup cols2">
              <div><a name={CONST.MAP_TYPE.BUILDING.GRADIENT} className={isGradientOrCrack ? 'btn_l on w100p' : 'btn_l w100p'}
                      onClick={onClickBuilding}>기울기</a>
              </div>
              <div><a name={CONST.MAP_TYPE.BUILDING.CRACK} className={isGradientOrCrack ? 'btn_l w100p' : 'btn_l on w100p'}
                      onClick={onClickBuilding}>균열</a>
              </div>
            </div>
          </>
        );
      }
      case CONST.MAP_TYPE.CLEANING.index: {
        return (
          <>
            <div className="divGroup cols2">
              <div><a name={CONST.MAP_TYPE.CLEANING.VEHICLE}
                      className={isVehicleOrRecycleBin ? 'btn_l on w100p' : 'btn_l w100p'}
                      onClick={onClickCleaning}>청소차량</a></div>
              <div><a name={CONST.MAP_TYPE.CLEANING.RECYCLE_BIN}
                      className={isVehicleOrRecycleBin ? 'btn_l w100p' : 'btn_l on w100p'}
                      onClick={onClickCleaning}>스마트 분리수거함</a></div>
            </div>
          </>
        );
      }
      case CONST.MAP_TYPE.CCTV.index:
      case CONST.MAP_TYPE.SECURITY_LIGHT:
      default: {
        return (<></>);
      }
    }
  }, [mapType, isGradientOrCrack, isVehicleOrRecycleBin, atmosphereType, facilityList, categoryDetailList, atmosphereSearchFilter]);

  return (
    <>
      <div className='asideHeader'>
        <h1><Link href={`${USER_CONST.BASE_ROUTER_PATH}/main`}><a><img src={`${USER_CONST.BASE_IMAGE_PATH}/common/logo.png`}
                                                                       alt="중랑구 스마트시티"/></a></Link></h1>
        <div className="asideSearch">
          {renderSelectBoxByMapType()}
          {renderAsideUpperPartByType()}
        </div>
      </div>
      <AsideLowerTable legendCategory={legendCategory}/>
      <a
        className={asideId ? 'btn_asideToggle_on' : 'btn_asideToggle'}
        onClick={showAside}>
        사이드영역 열고/닫기
      </a>
    </>
  );
};

export default AsideLnb;
