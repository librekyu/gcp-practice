/**
 * props
 @className String css class 이름
 @mapOption Object kakao map option
 {
        @installationInfo Object  설치장소 정보
        {
            @address  String  주소
            @latitude double  위도
            @longitude  double  경도
        }
      }
 @handleMarkerDrag function marker drag event handle
 @hasControl 확대/축소에 대한 컨트롤 생성 여부
 @
 * */

import React, { Component } from 'react';

/* global kakao */

export default class KakaoMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadJsmartKakaoMap();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.mapOption) {
      return false;
    }
    // 설치장소 변경 확인
    if (!nextProps.mapOption.installationInfo) {
      return false;
    }
    if(nextProps.mapOption.installationInfo !== this.props.mapOption.installationInfo) {
      return true;
    }
    return false;
  }

  gMap; // 지도
  gMarker; // 마커

  /**
   * 카카오 지도를 로드한다.
   * */
  loadJsmartKakaoMap = () => {
    const _this = this;
    const el = document.getElementById('JSmartKakaoMap');

    this.gMap = new kakao.maps.Map(el, {
      center: new kakao.maps.LatLng(37.5971, 127.09742),
      //level: option.level // 지도의 확대 레벨
    });

    if (this.props.hasControl) {
      // this.gMap.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
      this.gMap.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    }

    kakao.maps.event.addListener(this.gMap, 'drag', function() {
      _this.handleMapDrag();

    });
    kakao.maps.event.addListener(this.gMap, 'dragend', function() {
      _this.handleMapDragEnd();
    });
  };

  handleMapDrag = () => {
    const { mapOption: {installationInfo} } = this.props;
    const centerPosition = this.gMap.getCenter(); // 지도 중심좌표

    // 위도
    if ((!installationInfo ) || (!this.isValidLatitude(installationInfo.latitude)) || (!this.isValildLongitude(installationInfo.longitude))) {
      return;
    }
    this.gMarker.setPosition(centerPosition);
  }
  /**
   * 지도 이동완료
   * */
  handleMapDragEnd = () => {
    const { handleMarkerDrag, mapOption: {installationInfo} } = this.props;
    const centerPosition = this.gMap.getCenter(); // 지도 중심좌표

    // 위도
    if ((!installationInfo ) || (!this.isValidLatitude(installationInfo.latitude)) || (!this.isValildLongitude(installationInfo.longitude))) {
     return;
    }

    handleMarkerDrag(centerPosition.Ha, centerPosition.Ga);
  }

  /**
   * props로 전달 받은 mapOpton을 셋팅한다.
   * */
  setMapOptions = () => {
    const {mapOption} = this.props;
    let latitude = 37.5971; // 위도
    let longitude = 127.09742; // 경도
    let setFlag = false;

    // 설치장소정보로 위치를 표시한다.
    if (mapOption.installationInfo) {
      // 위도
      if (mapOption.installationInfo.latitude && this.isValidLatitude(mapOption.installationInfo.latitude)) {
        latitude = mapOption.installationInfo.latitude;
        setFlag = true;
      } else {

        setFlag = false;
      }
      // 경도
      if (setFlag && mapOption.installationInfo.longitude && this.isValildLongitude(mapOption.installationInfo.longitude)) {
        longitude = mapOption.installationInfo.longitude;
      } else {
        setFlag = false;
      }

      if (setFlag) {
        this.setInstallationMarker(latitude, longitude);
      }
    }
  };

  /**
   * 설치장소를 마커로 표시한다.
   * */
  setInstallationMarker = (latitude, longitude) => {
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);

    this.gMap.setCenter(markerPosition);
    // 결과값으로 받은 위치를 마커로 표시합니다
    if(!this.gMarker) {
      this.gMarker = new kakao.maps.Marker({
        map: this.gMap,
        position: markerPosition,
        draggable: false,
      });
    } else {
      this.gMarker.setPosition(markerPosition);
    }
    this.gMap.setLevel(3);


    // kakao.maps.event.addListener(marker, 'dragend', function () {
    //   const markerInfo = marker.getPosition();
    //   /**
    //    * @todo 20.02.03 기준으로 드래그 했을 때, 주소는 안바뀌고 위/경도 값만 변하는데 추후에 주소 변경이 필요할 경우를 대비하여 좌표 값으로 주소정보 얻어오는 코드 주석처리 해놓음.
    //    * geocoder 내에서 REST API를 요청하기 때문에 콜백함수로 결과 값과 상태 값을 받는다.
    //    *
    //    * @ref https://developers.kakao.com/docs/restapi/local#좌표-주소-변환
    //    * @ref http://apis.map.kakao.com/web/documentation/#services_Geocoder
    //    * @ref http://apis.map.kakao.com/web/sample/coord2addr/
    //    * */
    //   // const geocoder = new kakao.maps.services.Geocoder();
    //   // /**
    //   //  * coord2Address - 좌표에 따른 주소 반환
    //   //  *  result: [] - 좌표에 따른 주소 결과 목록
    //   //  *    {
    //   //  *      road_address: {
    //   //  *
    //   //  *      }, - 신주소
    //   //  *      address: {
    //   //  *
    //   //  *      } - 구주소
    //   //  *    }
    //   //  *  status: String - 조회 상태
    //   //  * */
    //   // geocoder.coord2Address(markerInfo.Ga, markerInfo.Ha, (result, status) => {
    //   //   console.log(result, status);
    //   //   if (status === kakao.maps.services.Status.OK) {
    //   //     const roadAddress = result[0].road_address.address_name;
    //   //     const zoneNumber = result[0].road_address.zone_no;
    //   //     const address = result[0].address.address_name;
    //   //     const zipCode = result[0].address.zip_code;
    //   //
    //   //     console.log('도로명 주소 > ', roadAddress, zoneNumber);
    //   //     console.log('주소 > ', address, zipCode);
    //   //   }
    //   // });
    //   //
    //   // geocoder.coord2RegionCode(markerInfo.Ga, markerInfo.Ha, (result, status) => {
    //   //   status === kakao.maps.services.Status.OK
    //   //   && result.map((region) => {
    //   //     region.region_type === 'H' ?
    //   //       console.log('행정동', region.region_3depth_name)
    //   //       : console.log('법정동', region.region_3depth_name);
    //   //   })
    //   // });
    //
    //   handleMarkerDrag(markerInfo.Ha, markerInfo.Ga);
    // });

  };
  /**
   * 위도 유효성 검사
   * */
  isValidLatitude = (latitude) => {
    return 33.0 <= latitude && latitude <= 38.9;
  };

  /**
   * 경도 유효성 검사
   * */
  isValildLongitude = (longitude) => {
    return 124.5 <= longitude && longitude <= 132.0;
  };

  render() {
    const {option} = this.props;
    let className = 'mapArea h300';
    if (this.props.className) {
      className = this.props.className;
    }
    this.setMapOptions();

    return (
      <div id='JSmartKakaoMap' className={className} style={this.props.style}/>
    );
  }
}
