/**
 * 부서 목록
 * */

const treeDummy = {
  name: '중랑구',
  deptCode: '',
  toggled: true,
  children: [
    {
      name: '감사담당관',
      deptCode: '3060061'
    },
    {
      name: '구청장',
      deptCode: '3060059'
    },
    {
      name: '의회사무국',
      deptCode: '3060089'
    },
    {
      name: '중랑비전추진반',
      deptCode: '3060167'
    },
    {
      name: '홍보담당관',
      deptCode: '3060166'
    },
    {
      name: '기획재정국',
      deptCode: '3060173',
      toggled: true,
      children: [
        {
          name: '기업지원과',
          deptCode: '3060175'
        },
        {
          name: '기획예산과',
          deptCode: '3060174'
        },
        {
          name: '세무1과',
          deptCode: '3060178'
        },
        {
          name: '세무2과',
          deptCode: '3060189'
        },
        {
          name: '일자리창출과',
          deptCode: '3060176'
        },
        {
          name: '재무과',
          deptCode: '3060177'
        },
      ],
    },
    {
      name: '도시환경국',
      deptCode: '3060107',
      toggled: true,
      children: [
        {
          name: '건축과',
          deptCode: '3060180'
        },
        {
          name: '공원녹지과',
          deptCode: '3060118'
        },
        {
          name: '도시개발과',
          deptCode: '3060116'
        },
        {
          name: '도시계획과',
          deptCode: '3060190'
        },
        {
          name: '도시재생과',
          deptCode: '3060191'
        },
        {
          name: '맑은환경과',
          deptCode: '3060119'
        },
        {
          name: '부동산정보과',
          deptCode: '3060156'
        },
        {
          name: '주택과',
          deptCode: '3060115'
        },
      ],
    },
    {
      name: '동주민센터',
      deptCode: '',
      toggled: true,
      children: [
        {
          name: '망우3동',
          deptCode: '3060056'
        },
        {
          name: '망우본동',
          deptCode: '3060125'
        },
        {
          name: '면목2동',
          deptCode: '3060040'
        },
        {
          name: '면목4',
          deptCode: '3060042'
        },
        {
          name: '면목5동',
          deptCode: '3060043'
        },
        {
          name: '면목7동',
          deptCode: '3060045'
        },
        {
          name: '면목본동',
          deptCode: '3060123'
        },
        {
          name: '면목제3,8동',
          deptCode: '3060127'
        },
        {
          name: '묵1동',
          deptCode: '3060052'
        },
        {
          name: '묵2동',
          deptCode: '3060053'
        },
        {
          name: '상봉1동',
          deptCode: '3060047'
        },
        {
          name: '상봉2동',
          deptCode: '3060048'
        },
        {
          name: '신내1동',
          deptCode: '3060057'
        },
        {
          name: '신내2동',
          deptCode: '3060058'
        },
        {
          name: '중화1동',
          deptCode: '3060049'
        },
        {
          name: '중화2동',
          deptCode: '3060050'
        }
      ]
    },
    {
      name: '보건소',
      deptCode: '3060034',
      toggled: true,
      children: [
        {
          name: '건강증진과',
          deptCode: '3060163'
        },
        {
          name: '보건위생과',
          deptCode: '3060085'
        },
        {
          name: '보건행정과',
          deptCode: '3060035'
        },
        {
          name: '상봉보건지소',
          deptCode: '3060193'
        },
        {
          name: '위생과',
          deptCode: '3060182'
        },
        {
          name: '의약과',
          deptCode: '3060037'
        }
      ]
    },
    {
      name: '생활복지국',
      deptCode: '3060149',
      toggled: true,
      children: [
        {
          name: '복지정책과',
          deptCode: '3060150'
        },
        {
          name: '사회복지과',
          deptCode: '3060151'
        },
        {
          name: '어르신복지과',
          deptCode: '3060165'
        },
        {
          name: '여성가족과',
          deptCode: '3060152'
        },
        {
          name: '장애인복지과',
          deptCode: '3060179'
        },
        {
          name: '청소행정과',
          deptCode: '3060154'
        }
      ]
    },
    {
      name: '안전건설교통국',
      deptCode: '3060181',
      toggled: true,
      children: [
        {
          name: '건설관리과',
          deptCode: '3060184'
        },
        {
          name: '교통행정과',
          deptCode: '3060185'
        },
        {
          name: '도로과',
          deptCode: '3060187'
        },
        {
          name: '도시경관과',
          deptCode: '3060192'
        },
        {
          name: '도시안전과',
          deptCode: '3060183'
        },
        {
          name: '주차관리과',
          deptCode: '3060186'
        },
        {
          name: '치수과',
          deptCode: '3060188'
        }
      ]
    },
    {
      name: '행정국',
      deptCode: '3060106',
      toggled: true,
      children: [
        {
          name: '교육지원과',
          deptCode: '3060170'
        },
        {
          name: '마을협치과',
          deptCode: '3060169'
        },
        {
          name: '문화관광과',
          deptCode: '3060171'
        },
        {
          name: '민원여권과',
          deptCode: '3060114'
        },
        {
          name: '체육청소년과',
          deptCode: '3060172'
        },
        {
          name: '행정지원과',
          deptCode: '3060168'
        }
      ]
    },
  ]
};

/**
 * JsmartSelect Data props에 맞게 convert
 * */
const convertTreeDataToSelectData = (selectData, treeData) => {
  Object.entries(treeData).map(group => {
    if(group[1].deptCode && group[1].deptCode !== '') {
      selectData.push({
        name: group[1].name,
        value: group[1].deptCode
      });
    }
    if(group[1].children && group[1].children.length > 0 ) {
      convertTreeDataToSelectData(selectData, group[1].children);
    }
  });

  return selectData;
}
export { treeDummy, convertTreeDataToSelectData };
