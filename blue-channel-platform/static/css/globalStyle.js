/**
 * @keyword  사용자 CSS
 * */
import styled, { createGlobalStyle } from 'styled-components';
import { ADMIN_CONST, USER_CONST } from '../../src/common/globalConst';

export const Overlay = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:${props => props.zIndex ? props.zIndex : 1000};
  @media all and (max-width:768px){
    z-index: 1000;
  }
`;

const GlobalStyle = createGlobalStyle`
  @charset "utf-8";
  
  /* ======================================== Font ======================================== */
  @font-face{
  
    font-family: 'Nanum Gothic';
    font-style: normal;
    font-weight: 400;
    src: url(/static/fonts/NanumGothic-Regular.eot);
    src: url(/static/fonts/NanumGothic-Regular.eot?#iefix) format('embedded-opentype'),
         url(/static/fonts/NanumGothic-Regular.woff) format('woff');
  }
  @font-face{
    font-family: 'Nanum Gothic';
    font-style: normal;
    font-weight: 700;
    src: url(/static/fonts/NanumGothic-Bold.eot);
    src: url(/static/fonts/NanumGothic-Bold.eot?#iefix) format('embedded-opentype'),
         url(/static/fonts/NanumGothic-Bold.woff) format('woff');
  }
  @font-face{
    font-family: 'Nanum Gothic';
    font-style: normal;
    font-weight: 800;
    src: url(/static/fonts/NanumGothic-ExtraBold.eot);
    src: url(/static/fonts/NanumGothic-ExtraBold.eot?#iefix) format('embedded-opentype'),
         url(/static/fonts/NanumGothic-ExtraBold.woff) format('woff');
  }
  body,input,textarea,select,button,table{font-family:'Nanum Gothic';}

  /*======================================== Reset ======================================== */
  *{-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(255,255,255,0);}
  html,body{width:100%;height:100%;-webkit-font-smoothing:antialiased;box-sizing:border-box;}
  body,p,h1,h2,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textarea,button,select,pre{margin:0;padding:0;}
  body{font-size:14px;font-weight:400;color:#111;}
  input,textarea,select,button,table,pre{}
  ul,ol,li{display:block;list-style:none;}
  img{border:0px none;}
  img,input,button,label,select{vertical-align:middle;}
  input[type='text'],input[type='password'],input[type='number']{text-indent:5px;}
  input[type='submit'],input[type='button'],button{cursor:pointer;}
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
  i,em,address{font-style:normal;}
  a{text-decoration:none;color:#111;}
  a:hover{text-decoration:none;cursor: pointer;}
  table{border-spacing:0;table-layout:fixed;}
  article,aside,hgroup,header,footer,figure,figcaption,nav,section{display:block;}
  .clear{display:block;height:0px;font-size:0px;font-size:0em;line-height:0px;content:'';overflow:hidden;clear:both;}
  .inner{display:block;position:relative;margin:0 auto;width:800px;box-sizing:border-box;}
  .inner:after{display:block;content:'';clear:both;}
  caption, .soundOnly{display:block !important;position:absolute !important;top:-9999px !important;}
  .alignCenter{text-align:center !important;}

  /*!* ==============================================================================================================*/
  /*= 너비, 높이 사이즈를 공통으로 사용하기 위한 클래스 부여*/
  /*============================================================================================================== *!*/
  .w10{width:10px}.w20{width:20px}.w30{width:30px}.w40{width:40px}.w50{width:50px}.w60{width:60px}.w70{width:70px}.w80{width:80px}.w90{width:90px}.w100{width:100px}.w110{width:110px}.w120{width:120px}.w130{width:130px}.w140{width:140px}.w150{width:150px}.w160{width:160px}.w170{width:170px}.w180{width:180px}.w190{width:190px}.w200{width:200px}.w210{width:210px}.w220{width:220px}.w230{width:230px}.w240{width:240px}.w250{width:250px}.w260{width:260px}.w270{width:270px}.w280{width:280px}.w290{width:290px}.w300{width:300px}.w310{width:310px}.w320{width:320px}.w330{width:330px}.w340{width:340px}.w350{width:350px}.w360{width:360px}.w370{width:370px}.w380{width:380px}.w390{width:390px}.w400{width:400px}.w410{width:410px}.w420{width:420px}.w430{width:430px}.w440{width:440px}.w450{width:450px}.w460{width:460px}.w470{width:470px}.w480{width:480px}.w490{width:490px}.w500{width:500px}.w510{width:510px}.w520{width:520px}.w530{width:530px}.w540{width:540px}.w550{width:550px}.w560{width:560px}.w570{width:570px}.w580{width:580px}.w590{width:590px}.w600{width:600px}.w610{width:610px}.w620{width:620px}.w630{width:630px}.w640{width:640px}.w650{width:650px}.w660{width:660px}.w670{width:670px}.w680{width:680px}.w690{width:690px}.w700{width:700px}.w2000{width:2000px !important;}
  .w15{width:15px}.w25{width:25px}.w35{width:35px}.w45{width:45px}.w55{width:55px}.w65{width:65px}.w75{width:75px}.w85{width:85px}.w90{width:95px}
  .w5p{width:5%}.w8p{width:8%}.w10p{width:10%}.w12p{width:12%}.w15p{width:15%}.w18p{width:18%}.w20p{width:20%}.w25p{width:25%}.w30p{width:30%}.w35p{width:35%}.w40p{width:40%}.w45p{width:45%}.w48p{width:48%}.w49p{width:49%}.w50p{width:50%}.w55p{width:55%}.w60p{width:60%}.w65p{width:65%}.w70p{width:70%}.w75p{width:75%}.w80p{width:80%}.w85p{width:85%}.w90p{width:90%}.w95p{width:95%}.w100p{width:99.9%}
  .h10{height:10px}.h20{height:20px}.h20{height:30px}.h30{height:40px}.h40{height:50px}.h60{height:60px}.h70{height:70px}.h80{height:80px}.h90{height:90px}.h100{height:100px}.h110{height:110px}.h120{height:120px}.h130{height:130px}.h140{height:140px}.h150{height:150px}.h160{height:160px}.h170{height:170px}.h180{height:180px}.h190{height:190px}.h200{height:200px}.h210{height:210px}.h220{height:220px}.h230{height:230px}.h240{height:240px}.h250{height:250px}.h260{height:260px}.h270{height:270px}.h280{height:280px}.h290{height:290px}.h300{height:300px}.h300{height:300px}.h310{height:310px}.h320{height:320px}.h330{height:330px}.h340{height:340px}.h350{height:350px}.h360{height:360px}.h370{height:370px}.h380{height:380px}.h390{height:390px}.h400{height:400px}.h410{height:410px}.h420{height:420px}.h430{height:430px}.h440{height:440px}.h450{height:450px}.h460{height:460px}.h470{height:470px}.h480{height:480px}.h490{height:490px}.h500{height:500px}.h510{height:510px}.h520{height:520px}.h530{height:530px}.h540{height:540px}.h550{height:550px}.h560{height:560px}.h570{height:570px}.h580{height:580px}.h590{height:590px}.h600{height:600px}.h610{height:610px}.h620{height:620px}.h630{height:630px}.h640{height:640px}.h650{height:650px}.h660{height:660px}.h670{height:670px}.h680{height:680px}.h690{height:690px}.h700{height:700px}
  
  html{${props => props.admin ? 'background:#e2e2e2;' : ''}}
  body{${props => props.admin ? 'padding-top:60px;' : ''}}
  .marginLine{width: 100%; margin-top:3px;background:#c1c1c1; height: 2px; margin-bottom:7px;}
  .marginLine2{width: 100%; margin-top:5px;background:#c1c1c1; height: 2px; margin-bottom:5px;}
  
  /* 사용자 CSS */
  /* ==============================================================================================================
= Div Group
= 화면 분할을 위해서 사용함
= 사용방법 : cols2(개수) 클래스를 통해서 개수만큼 균등분할하거나 w20(%)p 클래스를 통해서 분할 사이즈 조정
============================================================================================================== */
.divGroup{margin:0 -5px -10px;clear:both;}
.divGroup:after{display:block;content:'';clear:both;}
.divGroup > div{float:left;padding:0 5px 10px;min-height:1px;box-sizing:border-box;}
.divGroup.cols2 > div{width:50%;}
.divGroup.cols3 > div{width:33.3333%;}
.divGroup.cols4 > div{width:25%;}
.divGroup.cols5 > div{width:20%;}
.divGroup.noMargin{margin:0;}
.divGroup.noMargin > div{padding:0;}


/* ==============================================================================================================
= 폼 아이템별 기본스타일 지정
============================================================================================================== */
input[type='text'],
input[type='password'],
input[type='number'],
select{height:30px;max-width:100%;font-size:13px;text-indent:5px;border:1px #e1e1e1 solid;box-sizing:border-box;}
select{padding-left:5px;text-indent:0;}
textarea{padding:5px;border:1px #ddd solid;box-sizing:border-box;resize:vertical;}
*:disabled,*:readonly{color:#777 !important;background:#eee !important;}
input[type='checkbox'],input[type='radio']{margin-right:5px;}
.inputBtn{display:inline-block;position:relative;margin-right:5px;padding-right:53px;box-sizing:border-box;vertical-align:middle;}
.inputBtn > *{vertical-align:top;}
.inputBtn .btn_inline{position:absolute;top:0;right:0;width:50px;text-align:center;}
.radioGroup{display:inline-block;position:relative;margin-left:10px;height:36px;border:1px #e1e1e1 solid;border-right:0px none;vertical-align:middle;box-sizing:border-box;overflow:hidden;}
.radioGroup input[type='radio']{position:absolute;top:-9999px;}
.radioGroup label{display:block;float:left;padding:0 5px;height:28px;color:#333;line-height:34px;text-align:center;background:#fff;border-right:1px #e1e1e1 solid;cursor:pointer;box-sizing:border-box;}
.radioGroup.cols2 label{width:50%;}
.radioGroup input:checked + label{color:#fff;background:#aaa;}
input[type='radio'] + label,
input[type='checkbox'] + label{display:inline-block;margin-right:20px;}
input[readonly]{background-color:#ececec;}
.money{direction:rtl;}
img{margin-bottom:15px}

/* ==============================================================================================================
= Text
= 
============================================================================================================== */
text{font-size:20px;}
.empha{font-size:30px;}

/* ==============================================================================================================
= Button 기본스타일 지정
= 사이즈 : btn_ss < btn_s < btn_inline < btn_m < btn_l
============================================================================================================== */
.btnArea{margin:20px 0;text-align:center;}
.btnArea.right{text-align:right;}
.btnArea.right.mb0{margin-bottom:0;}
.btnArea.left{text-align:left;}
.btn_ss,
.btn_s,
.btn_m,
.btn_l,
.btn_b,
.btn_inline{display:inline-block;color:#000;text-align:center;background-color:#fff;border:1px #e1e1e1 solid;vertical-align:middle;box-sizing:border-box;}
.btn_ss.on,
.btn_s.on,
.btn_m.on,
.btn_l.on,
.btn_b.on,
.btn_inline.on{color:#fff;background-color:#0072bc;border:1px #0072bc solid;}
.btn_ss.black,
.btn_s.black,
.btn_m.black,
.btn_l.black,
.btn_b.black,
.btn_inline.black{color:#fff;background-color:#363636;border:1px #363636 solid;}
.btn_ss{padding:0 6px;height:20px;font-size:11px;line-height:18px;border-radius:4px;}
.btn_s{padding:0 8px;height:24px;font-size:12px;line-height:22px;border-radius:4px;}
.btn_m{padding:0 14px;height:30px;font-size:12px;line-height:28px;border-radius:4px;}
.btn_l{padding:0 18px;height:40px;font-size:15px;line-height:38px;border-radius:4px;}
.btn_b{padding:0 24px;min-width:150px;height:50px;font-size:16px;line-height:48px;border-radius:4px;}
.btn_inline{padding:0 14px;height:30px;font-size:13px;line-height:28px;border-radius:4px;}
table .btn_inline{padding:0 8px;}

/* ====== 
= 대시보드
========*/
/* 공통 */
.colorPlus1{color:#24aae1 !important;}/*좋음*/
.colorZero{color:#8bc642 !important;}/*보통*/
.colorMinus1{color:#f47d2c !important;}/*나쁨*/
.colorMinus2{color:#ee1d23 !important;}/*매우나쁨*/

.bgColorPlus1{background-color:#24aae1;}/*좋음*/
.bgColorZero{background-color:#8bc642;}/*보통*/
.bgColorMinus1{background-color:#f47d2c;}/*나쁨*/
.bgColorMinus2{background-color:#ee1d23;}/*매우나쁨*/
.bgColorNodata{background-color:#252525;}/*데이터없음*/

.h4Section{position:relative;}
.h4Section > h4{display:inline-block;padding:10px 0;font-size:18px;color:#111;font-weight:bold;}
.h4Section > h4.fs16{font-size:16px;}
.h4Section > h4 + .explan{display:inline-block;vertical-align:middle;padding-left:5px;font-size:12px;color:#959595;}

.mapArea{position:relative;}
.mapArea > .btnSearch{display:block;width:50px;height:50px;position:absolute;bottom:20px;left:0;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_search.png) no-repeat center center;text-indent:-9999px;}
.mapArea > select{display:block;width:180px;height:30px;position:absolute;bottom:20px;right:0;border:1px #e1e1e1 solid;}
.mapArea .modalWrap{width:370px;padding:10px;margin-left:-165px;border:1px #e1e1e1 solid;border-radius:5px;}
.mapArea .modalWrap.active{top:100px;position:fixed;}
.mapArea .modalWrap.active.svg{position:absolute;}
.mapArea .modalWrap .modalTitle{height:auto;padding:0 40px 0 0;background:none;}
.mapArea .modalWrap .modalTitle h3{height:30px;line-height:30px;font-size:14px;color:#363636;}
.mapArea .modalWrap .modalTitle .btn_modalClose{width:30px;height:30px;top:-5px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;}
.mapArea .tableBox{margin-bottom:0;}
.mapArea .btnArea{margin:10px 0 0;text-align:right;}

.btnSMS{position:absolute;top:40px;right:0;}

.airForecast .dayBox{display:inline-block;width:140px;padding-top:20px;margin-right:62px;text-align:center;border:1px #e1e1e1 solid;border-radius:5px;}
.airForecast .dayBox.last{margin-right:0px;}
.airForecast .dayBox:after{display:block;content:'';clear:both;}
.airForecast .dayBox .am,
.airForecast .dayBox .pm{float:left;padding:22px 0 10px;width:50%;text-align:center;}
.airForecast .dayBox .am span,
.airForecast .dayBox .pm span{display:table-cell;vertical-align:middle;height:60px;padding:0 10px;font-size:20px;word-break:keep-all;}
.airForecast .dayBox .dayInfo{font-size:12px;letter-spacing:-1px;}
.airForecast .dayBox .dayInfo em{display:inline-block;margin-right:5px;}
.airForecast .dayBox em{display:block;font-size:14px;}

/* ==============================================================================================================
= Datepicker를 사용중인 입력박스, 달력형태 스타일 지정
= 사용방법 : 입력박스에 useDatepicker / useMonthpicker 클래스를 추가하여 사용함
============================================================================================================== */
input.useDatepicker{width:105px;background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_inputDate.png) no-repeat 95% center;}
input.useMonthpicker{width:90px;background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_inputDate.png) no-repeat 95% center;}
#ui-datepicker-div{display:none;width:180px;background:#fff;border:1px #ccc solid;z-index:102 !important;}
.ui-datepicker{position:relative;padding:5px;}
.ui-datepicker table{width:100%;font-size:12px;}
.ui-datepicker table thead th{height:24px;color:#777;line-height:24px;text-align:center;}
.ui-datepicker table tbody td{width:14.2857%;text-align:center;height:22px;}
.ui-datepicker table tbody td a{display:block;height:22px;color:#4b4b4b;line-height:22px;text-align:center;}
.ui-datepicker table tbody td span{color:#aaa;}
.ui-datepicker table tbody td.date-holiday a{color:#eb3c3c;}
.ui-datepicker tr td:first-child *{color:#eb3c3c;}
.ui-datepicker tr td:last-child *{color:#4084d2;}
.ui-datepicker th{padding:0;}
.ui-datepicker td a.ui-state-active{color:#fff;background:#4b4b4b;}
.ui-datepicker td a.ui-state-highlight{color:#4b4b4b;background:#dfdfdf;}
.ui-datepicker .ui-datepicker-header{position:relative;padding:0;}
.ui-datepicker .ui-datepicker-title{margin:0;height:30px;line-height:30px;font-size:14px;font-weight:normal;color:#242424;letter-spacing:-1px;text-align:center;}
.ui-datepicker .ui-datepicker-prev,
.ui-datepicker .ui-datepicker-next{position:absolute;left:50%;top:5px;width:20px;height:20px;line-height:26px;border-radius:2px;border:1px solid #d9d9d9;text-indent:-9999em;cursor:pointer;}
.ui-datepicker .ui-datepicker-prev{margin-left:-66px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_calendarPrev.png) no-repeat center center;}
.ui-datepicker .ui-datepicker-next{margin-left:44px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_calendarNext.png) no-repeat center center;}
#ui-monthpicker-div.ui-datepicker{display:none;width:200px;background:#fff;border:1px #ccc solid;z-index:10 !important;box-sizing:border-box;}
#ui-monthpicker-div.ui-datepicker td{height:28px;}
#ui-monthpicker-div.ui-datepicker td a{cursor:pointer;}
#ui-monthpicker-div.ui-datepicker td a.ui-state-active{background:#4b4b4b;color:#fff;}
#ui-monthpicker-div.ui-datepicker tr td:first-child *{color:#4b4b4b;}
#ui-monthpicker-div.ui-datepicker tr td:last-child *{color:#4b4b4b;}
#ui-monthpicker-div.ui-datepicker .ui-datepicker-header{margin-bottom:8px;}
#ui-monthpicker-div.ui-datepicker .ui-datepicker-title select::-ms-expand{display:none;}
#ui-monthpicker-div.ui-datepicker .ui-datepicker-title .ui-datepicker-year{min-width:75px;padding:0 0 0 10px;}


/* ==============================================================================================================
= Table 기본스타일 지정
= 테이블을 크게 목록형(list), 입력형(form), 상세형(view)으로 나눔
============================================================================================================== */
.tableBox{margin-bottom:20px;clear:both;overflow:hidden;}
.tableBox.scrolled{overflow-y:auto;border:1px #e1e1e1 solid;border-top:1px #e1e1e1 solid;}
.tableBox.scrolledx{overflow-x:auto;border:1px #e1e1e1 solid;border-top:1px #e1e1e1 solid;}
.tableBox.scrolled table{margin:0 -1px;}
.tableBox table{width:100%;font-size:13px;border-top:0px #e1e1e1 solid;border-left:0px #e1e1e1 solid;}
// 0211수정
.tableBox table .listTit{font-size:12px;}
.tableBox table .listCont{font-size:12px;}
// 0211수정끝
.tableBox table.noFixed{table-layout:inherit;}
.tableBox table.noFixed th,
.tableBox table.noFixed td{word-break:break-all;}
.tableBox table.noFixed.list th,
.tableBox table.noFixed.list td{padding:10px 5px;}
.tableBox table table{width:auto;table-layout:auto;}
.tableBox table .tableBox{margin-bottom:0;}
.tableBox table th,
.tableBox table td{border-bottom:0px #e1e1e1 solid;border-right:0px #e1e1e1 solid;box-sizing:border-box;}
.tableBox table td select{padding-left:5px;}
.tableBox table th{font-weight:bold;}
.tableBox table th.noBg{background:none;}
.tableBox table.list.bordered{border-left:0px #e1e1e1 solid;}
.tableBox table.list.bordered th,
.tableBox table.list.bordered td{border-right:0px #e1e1e1 solid;}
.tableBox table.list{text-align:center;border-left:0px none;}
.tableBox table.list thead th{background:#ececec;}
.tableBox table.list th,
.tableBox table.list td{padding:10px;height:40px;border-right:0px none;}
.tableBox table.list th.center,
.tableBox table.list td.center{text-align:center;}
.tableBox table.list th.left,
.tableBox table.list td.left{text-align:left;}
.tableBox table.list th.right,
.tableBox table.list td.right{text-align:right;}
.tableBox table.list td.empty{padding:50px 0;text-align:center;}
.tableBox table.form th{padding:10px;height:40px;text-align:center;}
.tableBox table.form td{padding:10px;height:40px;text-align:left;}
.tableBox table.form td *{max-width:100%;}
.tableBox table.view th{background:#ececec;}
.tableBox table.view th,
.tableBox table.view td{padding:10px 20px;line-height:20px;text-align:left;}
.tableBox table.view td *{max-width:100%;}
.tableBox .totalCount{text-align:right; padding:10px;font-size:13px;}
.tableTitle{display:block;position:relative;height:40px;font-size:13px;font-weight:bold;line-height:40px;background:#ececec;border:1px #e1e1e1 solid;border-bottom:0px none;}
.tableTitle .unit{display:block;position:absolute;top:10px;right:15px;font-size:12px;font-weight:normal;line-height:20px;}
.tableTitle .right{display:block;position:absolute;top:0;right:15px;}
.tableControl{display:block;position:relative;height:40px;font-size:13px;font-weight:bold;line-height:40px;text-align:center;background:#ececec;border:1px #e1e1e1 solid;border-bottom:0px none;}
.tableControl a{display:inline-block;width:20px;height:20px;vertical-align:middle;}
.tableControl a.btn_prev{position:relative;margin-right:30px;text-indent:-9999em;}
.tableControl a.btn_prev:after{display:block;content:'◀';position:absolute;top:0;left:0;width:20px;height:20px;line-height:18px;text-indent:0;text-align:center;}
.tableControl a.btn_next{position:relative;margin-left:30px;text-indent:-9999em;}
.tableControl a.btn_next:after{display:block;content:'▶';position:absolute;top:0;left:0;width:20px;height:20px;line-height:18px;text-indent:0;text-align:center;}
span.tableControl{display:inline-block;margin-left:20px;height:30px;line-height:30px;background:none;border:0px none;}
span.tableControl a{vertical-align:middle !important;}
span.tableControl a.btn_prev{margin-right:20px;}
span.tableControl a.btn_next{margin-left:20px;}
.tableMore{display:block;position:relative;height:30px;font-size:13px;font-weight:bold;line-height:30px;text-align:right;}

/* ==============================================================================================================
= Paging 기본스타일 지정
============================================================================================================== */
.paging{position:relative;margin:20px 0;text-align:center;line-height:20px;}
.paging a{display:inline-block;width:20px;height:20px;vertical-align:middle;}
.paging a.btn_pagingPrev{position:relative;margin-right:30px;text-indent:-9999em;}
.paging a.btn_pagingPrev:after{display:block;content:'◀';position:absolute;top:0;left:0;width:20px;height:20px;line-height:18px;text-indent:0;text-align:center;}
.paging a.btn_pagingNext{position:relative;margin-left:30px;text-indent:-9999em;}
.paging a.btn_pagingNext:after{display:block;content:'▶';position:absolute;top:0;left:0;width:20px;height:20px;line-height:18px;text-indent:0;text-align:center;}
.paging .pagingCount{display:block;position:absolute;top:0;left:0;}
.pagination{position:relative;margin:20px 0;text-align:center;line-height:20px;}
.pagination a,
.pagination span{display:inline-block;margin:0 5px;width:20px;height:20px;line-height:18px;text-align:center;border:1px #e1e1e1 solid;vertical-align:middle;box-sizing:border-box;}
.pagination span{color:#fff;background:#227c39;border-color:#227c39;}
.pagination a.btn_pagingFirst{text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_pagingFirst.png) no-repeat center center;}
.pagination a.btn_pagingPrev{text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_pagingPrev.png) no-repeat center center;}
.pagination a.btn_pagingNext{text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_pagingNext.png) no-repeat center center;}
.pagination a.btn_pagingLast{text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_pagingLast.png) no-repeat center center;}

/* ==============================================================================================================
= Modal 기본스타일 지정
============================================================================================================== */
.modalWrap{position:absolute;top:150px;left:50%;margin-left:-350px;width:700px;background:#fff;opacity:0;z-index:-1;transition-duration:0.5s;}
.modalWrap.active{top:180px;opacity:1;z-index:99;position:fixed;}
.modalWrap.union{left:80%;top:50%;border:black;border-style:outset;position:absolute;opacity:1;z-index:99;width:500px;}

.modalWrap.active.svg{position:absolute;}
.modalWrap.small{margin-left:-250px;width:500px;}
.modalWrap.wide{margin-left:-450px;width:900px;}
.modalWrap .modalTitle{position:relative;padding:0 65px 0 20px;height:50px;background:#0050a5;}
.modalWrap .modalTitle h2,
.modalWrap .modalTitle h3{display:block;font-size:20px;font-weight:bold;color:#fff;line-height:50px;}
.modalWrap .modalTitle .btn_modalClose{display:block;position:absolute;top:0;right:0;width:46px;height:46px;text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;}
.modalWrap .modalContent{padding:20px;max-height:700px;overflow-y:auto;}
.modalWrap .modalContent .btnArea{margin:0;}
.modalWrap .modalContent .btnArea + *{margin-top:10px;}
.modalWrap .modalContent .divGroup{margin:0 -5px;max-width:inherit;}
.modalWrap .modalContent .divGroup > div{padding:0 5px;}
.demo {float:right; color:#fff; border:0px;}
//{visibility:hidden; float:right;}

// /* ==============================================================================================================
// = Overlay 효과 배경 기본스타일 지정
// ============================================================================================================== */
// #overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:10;}


/* ==============================================================================================================
= 레이아웃
============================================================================================================== */
html{}
body{}
body::-webkit-scrollbar{width:0}
#wrap{min-width:560px;}
#wrap.main{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_mainVisual.jpg) no-repeat center top;background-size:contain;}
#wrap.main:before{display:block;content:'';position:absolute;top:0;left:0;right:0;height:560px;background:#fff;z-index:-1;}
#wrap.main #header *{color:#000;}
#wrap.main #header .topNav li:after{border-color:#fff;}
#header{height:70px;padding-top:50px;}
#header h1{position:absolute;top:30px;left:30px;}
#header .topNav{display:block;position:absolute;top:0;right:0;overflow:hidden;}
#header .topNav li{display:block;position:relative;float:left;padding:0 20px;line-height:35px;}
#header .topNav li:after{display:block;content:'';position:absolute;top:50%;right:-1px;margin-top:-5px;height:10px;border-right:1px #252525 solid;}
#header .topNav li a{display:block;float:left;font-size:13px;line-height:35px;}
#header #gnb{display:block;position:absolute;top:30px;right:0;}
#header #gnb ul,
#header #gnb ul li,
#header #gnb ul li a{display:block;}
#header #gnb > ul > li{position:relative;float:left;padding:0 10px;}
#header #gnb > ul > li > a{font-size:18px;font-weight:bold;line-height:40px;}
#header #gnb > ul > li > ul{display:none;position:absolute;top:40px;left:50%;margin-left:-80px;padding:5px 0;width:160px;background:#fff;border-top:2px #00bff3 solid;box-shadow:3px 3px 6px rgba(0,0,0,0.1);z-index:99;}
#header #gnb > ul > li > ul > li{padding:10px 0 10px 10px;}
#header #gnb > ul > li > ul > li > a{padding:5px;font-size:13px;color:#252525 !important;}
#header #gnb > ul > li > ul > li > a:hover{color:#00bff3 !important;}
#header #gnb > ul > li > a:hover,
#header #gnb > ul > li.hover > a{color:#00bff3 !important;}
#header #gnb > ul > li.hover > ul{display:block;}
#header #gnb .gnbUser{display:none;}
#header #gnb .btn_gnbToggle{display:none;position:fixed;top:15px;right:10px;width:40px;height:40px;text-indent:-9999em;background:#252525 url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_gnbOpen.png) no-repeat center center;}

#container{min-height:400px;}
#container #subVisual{height:270px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_subVisual1.jpg) center top;}
#container #subVisual.login{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_subLogin.jpg) center top;}
#container #subVisual.bg1{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_subVisual1.jpg) center top;}
#container #subVisual.bg2{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_subVisual2.jpg) center top;}
#container #subVisual.bg3{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_subVisual3.jpg) center top;}
#container #subVisual.bg4{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_subVisual4.jpg) center top;}
#container #subVisual.bg5{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_subVisual5.jpg) center top;}
#container #subVisual.bg6{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_subVisual6.jpg) center top;}
#container #subVisual.bg7{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_subVisual7.jpg) center top;}
#container #subVisual > .inner{height:270px;}
#container #subVisual p{position:absolute;top:50%;left:18px;margin-top:-36px;font-size:22px;color:#fff;line-height:24px;opacity:0.4;}
#lnb{position:absolute;top:-50px;left:0;width:210px;background:#fff;}
#lnb h2{display:block;margin-bottom:10px;height:120px;font-size:30px;font-weight:bold;color:#fff;text-align:center;line-height:120px;background:#0072bc;}
#lnb ul,
#lnb ul li,
#lnb ul li a{display:block;}
#lnb > ul{border:1px #e1e1e1 solid;border-bottom:0px none;}
#lnb > ul > li{border-bottom:1px #e1e1e1 solid;}
#lnb > ul > li > a{padding:20px 25px;font-size:15px;line-height:20px;}
#lnb > ul > li.active > a{color:#fff;background:#363636;}

.subLnb > li {border-bottom:1px #e1e1e1 solid;}
.subLnb > li:last-child {border-bottom:0px;}
.subLnb > li > a{padding:20px 10px 20px 40px;font-size:15px;line-height:20px; background:#f2f3f5;}
.subLnb > li > a.active{background: #73839B;color: #fff;}

.boxLine{box-sizing: border-box; border: 3px solid #e7e7e7;}

/*서브공통*/
#contents{margin-left:245px;}
#contents.noLnb{margin-left:0;}
/* ======================================== Footer - 20200106 ======================================== */
#footer{font-size:13px;color:#959595;background:#252525;bottom:0;position:absolute;width:100%;}
#footer .footerLogo{display:block;position:absolute;top:30px;left:0;}
#footer .footerCopyright{margin-left:250px;padding:20px 0 25px;font-size:12px;line-height:160%;}
#footer .footerBar{border-bottom:1px solid rgba(255,255,255,0.15);}
#footer .footerBar:after{display:block;content:'';clear:both;}
#footer .footerNav{display:block;float:left;padding:10px 0;margin:0 -17px;overflow:hidden;}
#footer .footerNav:after{display:block;content:'';clear:both;}
#footer .footerNav li{display:block;position:relative;float:left;padding:0 17px;}
#footer .footerNav li a{display:block;font-size:13px;color:#fff;line-height:35px;}
#footer .footerNav li:after{display:block;content:'';position:absolute;top:50%;left:-1px;margin-top:-5px;height:11px;border-left:1px rgba(255,255,255,0.5) solid;}
#footer .footerNav li a b{font-weight:normal;color:#ff9900;}
#footer .footerOption{display:block;float:right;padding:10px 0;}
#footer .footerOption:after{display:block;content:'';clear:both;}
#footer .footerOption li{display:block;float:left;margin-left:20px;}
#footer .footerOption li a{display:block;font-size:13px;color:#fff;line-height:35px;}
#footer .footerOption li a img{margin-right:5px;}
#footer .footerMark{display:block;position:absolute;top:20px;right:0;}
#footer .footerMark:after{display:block;content:'';clear:both;}
#footer .footerMark li{display:block;float:left;margin-left:20px;line-height:60px;}
#footer .footerMark li a{display:block;}
#footer .footerMark li a img{max-height:63px;}

.onlyPhone{display:none;}

/* ==============================================================================================================
= 반응형
============================================================================================================== */
/*Mobile*/
@media all and (max-width:768px){
  body{font-size:13px;}
  #wrap{padding-top:70px;min-width:inherit;} 
  
  .inner{width:auto;}
  
  #wrap.main{background-size:auto 390px;}
  #wrap.main #header *{color:#111; font-size:15px; margin-top:-5px;}
  #wrap.main:before{height:560px;}
  #header{position:fixed;top:0;left:0;right:0;height:70px;background:#fff;box-shadow:0 0 5px rgba(0,0,0,0.2);z-index:999;}
  #header h1{top:20px;left:10px;width:150px;height:30px; no-repeat left center;background-size:auto 30px;}
  #header h1 img{display:none;}
  #header .topNav{display:none;}
  #header #gnb{position:fixed;top:65px;right:-430px;padding-top:5px;max-width:100%;width:420px;background:#fff;transition-duration:0.5s;z-index:9999;}
  #header #gnb > ul{padding:0 10px;}
  #header #gnb > ul > li{float:none;padding:0;}
  #header #gnb > ul > li > a{padding:0 10px;font-size:14px;line-height:50px;border-bottom:1px #e1e1e1 solid;}
  #header #gnb > ul > li > ul{position:static;top:0;left:0;margin-left:0;width:auto;border:0px none;border-bottom:1px #e1e1e1 solid;box-shadow:none;}
  #header #gnb > ul > li > a:hover,
  #header #gnb > ul > li.hover > a{color:#111 !important;}
  #header #gnb > ul > li.hover > ul{display:none;}
  #header #gnb > ul > li > a:active,
  #header #gnb > ul > li.active > a{padding:0 10px;font-size:14px;color:#0072bc !important;}
  #header #gnb > ul > li.active > ul{display:block;}
  #header #gnb > ul.gnbUser{display:block;margin:30px 0}
  #header #gnb > ul.gnbUser:after{display:block;content:'';clear:both;}
  #header #gnb > ul.gnbUser > li{float:left;padding:0;width:50%;}
  #header #gnb > ul.gnbUser > li > a{margin:0 10px;height:40px;font-size:14px;line-height:40px;text-align:center;border:1px #e1e1e1 solid;border-radius:3px;}
  #header #gnb .btn_gnbToggle{display:block;}
  #header #gnb.active{right:0;}
  #header #gnb.active .btn_gnbToggle{background:#252525 url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_gnbClose.png) no-repeat center center;z-index:999;}
  #container #subVisual,
  #container #subVisual > .inner{height:120px;}
  #container #subVisual p{margin-top:-27px;font-size:11px;line-height:18px;}
  #contents{margin-left:0;padding:0 10px;}
  
  #lnb .subLnb{display: none;}
  #contents .selectWrapMb{display: block;}
  .mapLegend2{display: none;}
  .divGroup .mapLegendMb{display: block;}
  
  /* ======================================== Footer - 20200106 ======================================== */
  #footer .footerOption{display:none;}
  #footer .footerNav{margin:0;}
  #footer .footerNav li a{line-height:25px;}
  #footer .footerLogo{position:static;margin:15px;top:inherit;}
  #footer .footerCopyright{margin-left:15px;padding:10px 0;}
  #footer .footerMark{position:static;margin:0 15px 15px;top:inherit;}
  #footer .footerMark li{margin-left:0;padding:0 10px;max-width:33.3333%;box-sizing:border-box;}
  #footer .footerMark li a img{max-width:100%;max-height:45px;}
  
  /* ======================================== LNB - 20191231 ======================================== */
  #lnb{position:relative;top:inherit;left:inherit;margin-bottom:10px;width:auto;}
  #lnb h2{display:none;}
  #lnb > ul:after{display:block;content:'';clear:both;}
  #lnb > ul > li{float:left;width:25%;box-sizing:border-box;}
  #lnb > ul.cols2 > li{width:50%;}
  #lnb > ul.cols3 > li{width:33.3333%;}
  #lnb > ul > li > a{padding:0 10px;font-size:13px;line-height:40px;height:40px;text-align:center;border-right:1px #e1e1e1 solid;}
  /* ======================================== //지도 - 20191231 ======================================== */
}
@media all and (max-width:767px){
  .divGroup > div{float:none !important;width:auto !important;}
}
@media all and (max-width:480px){
  body{font-size:12px;}

  .btnArea a,
  .btnArea button{display:block !important;margin:0 auto 10px !important;width:auto !important;}
  
  .btn_m{padding:0 8px;}
  
  .tableBox table{font-size:12px;table-layout:inherit;}
  .tableBox table colgroup{display:none;}
  .tableBox table th,
  .tableBox table td{min-width:40px;word-break:break-all;}
  .tableBox table.list th,
  .tableBox table.list td,
  .tableBox table.view th,
  .tableBox table.view td{padding:5px;}
  .tableBox table.view th{min-width:60px;}
  
  .mScrolled{overflow-x:auto !important;border:1px #bbb solid;}
  .mScrolled > table{margin:-1px -1px 0;width:500px !important;border-top:0px none !important;}
  .mScrolled > table.mw600{width:600px !important;}
  .mScrolled > table.mw700{width:700px !important;}
  .mScrolled > table.mw800{width:800px !important;}
  
  .onlyPhone{display:block;}
  /* ======================================== LNB - 20191231 ======================================== */
  #lnb > ul > li{width:50%;}
  /* ======================================== //지도 - 20191231 ======================================== */
}

/* base */
/*탭바*/
.tabBar{height:51px;margin-bottom:20px;border-bottom:1px #0072bc solid;}
.tabBar:after{display:block;content:"";clear:both;}
.tabBar > li{position:relative;float:left;margin-right:-1px;z-index:1;}
.tabBar > li > a{display:block;height:50px;line-height:50px;padding:0 50px;color:#777;font-size:16px;border:1px #e1e1e1 solid;border-bottom:1px #0072bc solid;color:#363636;background-color:#fff;}
.tabBar > li.active{z-index:2;}
.tabBar > li.active > a{color:#111;font-weight:bold;border:1px #0072bc solid;border-bottom:1px #fff solid;color:#0072bc;}
.tabBar2{height: 33px;}
.tabBar2 > li > a{display:block;height:32px;line-height:32px;padding:0 13px;color:#777;font-size:14px;border:1px #e1e1e1 solid;border-bottom:1px #0072bc solid;color:#363636;background-color:#fff;}
.tabPage{display:none;}
// 0207수정
.tabPage2{display: block;}
// 0207수정끝
.tabPage.active{display:block;}

.pageCount{position:relative;margin:20px 0;text-align:center;line-height:20px;}
.pageCount a,
.pageCount span{display:inline-block;margin:0 5px;width:30px;height:30px;line-height:28px;color:#252525;text-align:center;border:1px #e1e1e1 solid;vertical-align:middle;box-sizing:border-box;}
.pageCount span{border:1px #ebebeb solid;background-color:#ebebeb;}
.pageCount a.btn_pagingFirst{text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_pagingFirst.png) no-repeat center center;}
.pageCount a.btn_pagingPrev{text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_pagingPrev.png) no-repeat center center;}
.pageCount a.btn_pagingNext{text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_pagingNext.png) no-repeat center center;}
.pageCount a.btn_pagingLast{text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_pagingLast.png) no-repeat center center;}

.tableBox.overHasItem{position:relative;overflow:initial;}
.tableBox .mapLegend{width:210px;position:absolute;left:-220px;}
.tableBox table.list .person{display:inline-block;vertical-align:top;width:60px;}
.tableBox table.list.notice{border-left:0px #e1e1e1 solid;border-right:0px #e1e1e1 solid;}
.tableBox table.list.notice th{height:40px;}
.tableBox table.list.notice td{height:60px;}
.tableBox table.form th.left{text-align:left;}
.tableBox table.view td.subject{padding:20px;}
.tableBox .textContent{min-height:480px;padding:30px 15px;line-height:150%;}

.btn_xl{display:inline-block;padding:0 18px;height:50px;font-size:15px;line-height:48px;border-radius:4px;color:#000;text-align:center;background-color:#fff;border:1px #e1e1e1 solid;vertical-align:middle;box-sizing:border-box;}
.btn_xl.btn_prev{padding-left:40px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_pagingPrev.png) no-repeat 10% center;}
.btn_xl.btn_next{padding-right:40px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_pagingNext.png) no-repeat 90% center;}

.btn_m.red{color:#fff;border:1px #d80e0e solid;background-color:#d80e0e;}
.btn_m.green{color:#fff;border:1px #30991c solid;background-color:#30991c;}
.btn_m.blue{color:#fff;border:1px #0072bc solid;background-color:#0072bc;}
.btn_m.purple{color:#fff;border:1px #92278f solid;background-color:#92278f;}
.btn_xl.black{color:#fff;border:1px #363636 solid;background-color:#363636;}
input + .btn_m, .btn_m + .btn_m{margin-left:5px;}

.colorRed{color:#ed1c24;}
.colorBlue{color:#0072bc;}

/*subTop*/
.subTop{min-height:155px;}
.subTop .subLocation{padding:15px 0;text-align:right;}
.subTop .subLocation > span{display:inline-block;vertical-align:middle;height:20px;line-height:20px;}
.subTop .subLocation > span.last{background:none;}
.subTop .subLocation > span > img{display:inline-block;vertical-align:top;margin-top:4px;}
.subTop .contentHead{padding:30px 0 15px;}
.subTop h3{display:block;padding:30px 0 10px;font-size:30px;}
.subTop h3 + p{padding:0 0 10px;line-height:130%;color:#252525;font-size:16px;}

#contents.noLnb .subTop{min-height:auto;}
#contents.noLnb .subTop h3{padding:30px 0 20px;text-align:center;}
#contents.noLnb .subTop h3 + p{text-align:center;}

.content{padding-bottom:100px;}
/* //base */

/*main*/
.slick-slider{position:relative;display:block;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-webkit-touch-callout:none;-khtml-user-select:none;-ms-touch-action:pan-y;touch-action:pan-y;-webkit-tap-highlight-color:transparent;}
.slick-list{position:relative;display:block;overflow:hidden;margin:0;padding:0;}
.slick-list:focus{outline:none;}
.slick-list.dragging{cursor:pointer;}
.slick-slider .slick-track,
.slick-slider .slick-list{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);}
.slick-track{position:relative;top:0;left:0;display:block;}
.slick-track:before,.slick-track:after{display:table;content:'';}
.slick-track:after{clear:both;}
.slick-loading .slick-track{visibility:hidden;}
.slick-slide{display:none;float:left;height:100%;min-height:1px;box-sizing:border-box;}
.slick-slide img{display:block;width:100%;}
.slick-slide.slick-loading img{display:none;}
.slick-initialized .slick-slide{display:block;}
.slick-loading .slick-slide{visibility:hidden;}
.slick-vertical .slick-slide{display:block;height:auto;border:1px solid transparent;}
.slick-arrow.slick-hidden{display:none;}

.mainSection h2{display:block;padding:50px 0;font-size:40px;color:#0072bc;text-align:center;font-weight:normal;}
.mainSection.section1{height:484px;}
.mainSection.section1 .text1{padding-top:128px;line-height:110%;color:#fff;font-weight:normal;font-size:60px;}
.mainSection.section1 .text2{padding:0px 0;line-height:110%;color:#000;font-weight:normal;font-size:22px;}
.mainSection.section1 .btn{display:inline-block;width:150px;height:50px;line-height:50px;text-align:center;color:#fff;border-radius:5px;border:1px solid #fff;background-color:rgba(0,0,0,0.4);margin:10px;}
.mainSection.section2 h2{padding:65px 0;}z
.mainSection.section2{height:470px;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/bg_main_section2.jpg) no-repeat center top;}
.mainSection.section2 ul.service{justify-content:space-between;display:flex;}
.mainSection.section2 ul.service:after{content:'';clear:both;}
.mainSection.section2 ul.service > li{width:100%;}
.mainSection.section2 ul.service > li > a{display:block;width:160px;height:160px;margin:0 auto;}
.mainSection.section2 .btn_apply{display:inline-block;padding:20px;}
.mainSection.section3{height:460px;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/bg_main_section3.jpg) no-repeat center top;}
.mainSection.section3 h2{color:#fff;}
.mainSection.section3 .placeGroup .slick-prev,
.mainSection.section3 .placeGroup .slick-next{width:40px;height:40px;margin-top:-20px;position:absolute;top:50%;border:0;text-indent:-9999px;z-index:1;}
.mainSection.section3 .placeGroup .slick-prev{left:-50px;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mainSection3_prev.png) no-repeat center center;}
.mainSection.section3 .placeGroup .slick-next{right:-60px;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mainSection3_next.png) no-repeat center center;}
.mainSection.section3 .placeGroup .slick-dots{display:block;position:absolute;bottom:-40px;left:0;right:0;text-align:center;}
.mainSection.section3 .placeGroup .slick-dots li{display:inline-block;}
.mainSection.section3 .placeGroup .slick-dots li button{display:inline-block;width:10px;height:10px;margin:0 5px;border-radius:5px;border:0;background-color:#fff;text-indent:-9999em;}
.mainSection.section3 .placeGroup .slick-dots li.slick-active button{width:30px;}
.mainSection.section3 .place{width:340px;height:210px;padding:20px 20px 0 20px;margin:0 15px;position:relative;background-color:#fff;border-radius:20px;}
.mainSection.section3 .place strong{display:block;height:20px;line-height:20px;font-size:18px;}
.mainSection.section3 .place .btn_close{display:block;width:20px;height:20px;position:absolute;top:20px;right:20px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;text-indent:-9999px;}
.mainSection.section3 .place > ul{margin-top:10px;}
.mainSection.section3 .place > ul:after{display:block;content:'';clear:both;}
.mainSection.section3 .place > ul > li{float:left;width:170px;height:60px;padding-left:70px;position:relative;border-bottom:1px #e1e1e1 solid;box-sizing:border-box;}
.mainSection.section3 .place > ul > li:nth-child(odd){float:left;}
.mainSection.section3 .place > ul > li:nth-child(even){float:right;}
.mainSection.section3 .place > ul > li > span{display:block;line-height:100%;position:absolute;}
.mainSection.section3 .place .kinds{width:75px;height:60px;line-height:60px;top:0;left:0;}
.mainSection.section3 .place .row2{line-height:120%;padding-top:15px;}
.mainSection.section3 .place .state{width:90px;height:25px;top:10px;right:0;font-size:20px;}
.mainSection.section3 .place .data{width:90px;height:25px;top:35px;right:0;font-size:12px;color:#898989;}
.mainSection.section3 .place .temperature,
.mainSection.section3 .place .humidity{border-bottom:0;}
.mainSection.section3 .place .temperature .kinds,
.mainSection.section3 .place .humidity .kinds{height:50px;line-height:50px;}
.mainSection.section3 .place .temperature .data,
.mainSection.section3 .place .humidity .data{height:50px;line-height:50px;top:0;bottom:0;font-size:20px;color:#252525;}
.mainSection.section4{height:400px;background-color:#ebebeb;}
.mainSection.section4 ul{margin:0 -25px;}
.mainSection.section4 ul:after{display:block;content:'';clear:both;}
.mainSection.section4 ul > li{float:left;width:33.3333%;}
.mainSection.section4 ul > li > a{display:block;padding:50px 30px;margin:0 25px;font-size:24px;color:#0072bc;background-color:#fff;border-radius:20px;box-shadow:0 3px 5px #d3d3d3;}
.mainSection.section4 ul > li.col1 > a{background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mainSection4_1.png) no-repeat 90% center;}
.mainSection.section4 ul > li.col2 > a{background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mainSection4_2.png) no-repeat 90% center;}
.mainSection.section4 ul > li.col3 > a{background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mainSection4_3.png) no-repeat 90% center;}

/*Login*/
.loginForm{width:540px;height:120px;margin:20px auto 60px;position:relative;}
.loginForm input{position:absolute;}
.loginForm input::placeholder{color:#c1c1c1;}
.loginForm input[type='text'],
.loginForm input[type='password']{display:block;width:378px;height:48px;text-indent:20px;font-size:16px;border:1px #e1e1e1 solid;}
.loginForm input[type='text']{top:0;left:0;}
.loginForm input[type='password']{bottom:0;left:0;}
.loginForm input[type='submit']{width:140px;height:120px;top:0;right:0;font-size:18px;font-weight:bold;color:#fff;text-align:center;border:0px none;border-radius:5px;background:#0072bc;}
.loginForm + .btnArea{padding:0;text-align:center;}
.loginForm + .btnArea:after{display:block;content:'';clear:both;}
.loginForm + .btnArea .btn_l{width:160px;height:50px;line-height:48px;text-align:center;color:#fff;border-radius:5px;background-color:#363636;}
.loginForm + .btnArea .btn-findId{margin:0 30px;}

/*Join*/
.joinForm .explanHead{padding:30px 0;letter-spacing:-1px;}
.joinForm .explanHead > strong{display:block;padding-bottom:10px;line-height:150%;font-size:25px;color:#0072bc;font-weight:normal;text-align:center;}
.joinForm .explanHead > p{line-height:130%;font-size:16px;}
.joinForm .joinFormTitle .explanRequire{font-size:14px;color:#363636;text-align:right;}
.joinForm .joinFormTitle h3{display:inline-block;vertical-align:top;height:40px;line-height:40px;margin-right:20px;font-size:20px;color:#363636;}
.joinForm .joinFormTitle .explanForm{display:inline-block;vertical-align:bottom;height:40px;line-height:40px;font-size:14px;color:#959595;}
.joinForm .explanFoot{padding:20px 0;}
.joinForm .explanFoot > strong{display:block;padding-bottom:20px;font-size:25px;}
.joinForm .explanFoot > p{line-height:130%;font-size:16px;letter-spacing:-0.5px;}
.joinForm .explanHead .taCenter,
.joinForm .explanFoot .taCenter{text-align:center;}
.joinForm .btn_l{display:inline-block;min-width:180px;height:60px;line-height:58px;margin:0 5px;color:#252525;text-align:center;font-size:17px;border:1px #e1e1e1 solid;border-radius:5px;background-color:#fff;letter-spacing:-1px;}
.joinForm .btn_l.on{color:#fff;background-color:#0072bc;border:1px #0072bc solid;}
.joinForm .btn_m{height:28px;line-height:26px;border-radius:4px;color:#fff;border:1px solid #252525;background-color:#252525;}
.joinForm.memberGroup{width:990px;margin:0 auto 100px;}
.joinForm.memberGroup ul:after{display:block;content:'';clear:both;}
.joinForm.memberGroup ul > li{float:left;width:300px;height:330px;padding:30px 0 0;border:1px #e1e1e1 solid;box-sizing:border-box;}
.joinForm.memberGroup ul > li.public{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/img-join-public.png) no-repeat center bottom;}
.joinForm.memberGroup ul > li.child{margin:0 40px;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/img-join-child.png) no-repeat center bottom;}
.joinForm.memberGroup ul > li.foreigner{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/img-join-foreigner.png) no-repeat center bottom;}
.joinForm.memberGroup ul > li > strong{display:block;font-size:20px;text-align:center;}
.joinForm.memberGroup ul > li > span{display:block;margin-bottom:20px;font-size:16px;text-align:center;}
.joinForm.memberGroup ul > li > .btn-join{display:block;width:160px;height:50px;line-height:50px;margin:0 auto;text-align:center;color:#fff;border-radius:4px;background-color:#363636;}
.joinForm.memberGroup .explanFoot{padding-left:20px;padding-right:70px;}
.joinForm.auth{width:640px;margin:0 auto 100px;}
.joinForm.auth .authArea{width:430px;margin:10px auto 0;position:relative;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/img-join-mobile.png) no-repeat left top;word-break:keep-all;}
.joinForm.auth .authArea .btn_auth{position:absolute;top:80px;right:0;}
.joinForm.auth .authArea .explanFoot{padding-top:270px;}
.joinForm.auth .authArea .explanFoot > p{padding-bottom:20px;}
.joinForm.auth .authArea .btnArea{padding:0;margin:0;}
.joinForm .joinAgree{position:relative;padding:10px 0 0;}
.joinForm .joinAgree h3{display:block;padding:10px 0;font-size:20px;}
.joinForm .joinAgree .terms{padding:18px;height:160px;line-height:160%;border-bottom:1px #e5e5e5 solid;font-size:16px;color:#111;border:1px #e1e1e1 solid;white-space:pre-line;overflow-y:auto;}
.joinForm .joinAgree .checkArea{padding:10px 0;text-align:right;}
.joinForm .joinAgree .checkArea input[type='checkbox']{display:block;position:absolute;right:-9999px;}
.joinForm .joinAgree .checkArea label{display:inline-block;vertical-align:middle;height:32px;line-height:32px;padding-left:42px;margin-left:-42px;font-size:16px;color:#111;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_agree.png) no-repeat left center;cursor:pointer;}
.joinForm .joinAgree .checkArea label.active{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_agree_active.png) no-repeat left center;}
.joinForm .statusBar{display:block;border:1px #e1e1e1 solid;}
.joinForm .statusBar:after{display:block;content:'';clear:both;}
.joinForm .statusBar li{display:block;position:relative;float:left;width:33.3333%;height:50px;line-height:50px;font-size:20px;font-weight:bold;color:#959595;text-align:center;border-right:1px #e1e1e1 solid;background-color:#fff;box-sizing:border-box;}
.joinForm .statusBar li:after{display:block;content:'';width:60px;height:50px;position:absolute;top:0;right:0;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_statusBar.png) no-repeat center center;}
.joinForm .statusBar li.last{border-right:0;}
.joinForm .statusBar li.last:after{display:none;}
.joinForm .statusBar li.active{color:#fff;background-color:#0072bc;}
.joinForm .statusBar li.active:after{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_statusBar_active.png) no-repeat center center;}
.joinForm .tableBox input[type='text'],
.joinForm .tableBox input[type='password'],
.joinForm .tableBox select{height:28px;border:1px #e1e1e1 solid;}
.joinForm .tableBox .explanEx{margin-left:20px;font-size:14px;}
.joinForm .tableBox .explanNotice{padding:15px 0;font-size:14px;color:#959595;}
.joinForm .tableBox table.form{border-top:1px #e1e1e1 solid;border-left:1px #e5e5e5 solid;}
.joinForm .tableBox table.form th,
.joinForm .tableBox table.form td{vertical-align:top;padding:10px 0 10px 30px;font-size:14px;color:#363636;border-right:1px #e1e1e1 solid;border-bottom:1px #e1e1e1 solid;}
.joinForm .tableBox table.form th{border-right:0;}
.joinForm .tableBox table.form th.noLine,
.joinForm .tableBox table.form td.noLine{padding-bottom:0;border-bottom:0;}
.joinForm .tableBox table.form th{position:relative;background-color:#fff;}
.joinForm .tableBox table.form th .require{position:absolute;top:15px;left:15px;}
.joinForm .require{display:inline-block;vertical-align:middle;width:10px;height:10px;margin-right:5px;border-radius:5px;background-color:#ff0000;text-indent:9999px;overflow:hidden;}
.joinForm.step1,
.joinForm.step2{margin-bottom:100px;}
.joinForm.step1 .explanHead > strong{text-align:left;}
.joinForm.step2 .explanHead > strong{text-align:left;}
.joinForm.step2 .explanFoot > strong{padding-top:10px;font-size:18px;}
.joinForm.step2 .tableBox table.form th{text-align:left;}
.joinForm.step2 input[type='radio']{margin-left:20px;}
.joinForm.findpw{width:900px;margin:0 auto;}

/*content*/
.divGroup > .right{float:right;}

.borderBox{padding:10px 20px 20px;border:1px #e1e1e1 solid;box-sizing:border-box;}
.pinLock{position:absolute;top:0;right:0;}
.fs26{font-size:26px;}

span.blue{color:#24aae1;}
span.green{color:#a9d572;}
span.orange{color:#f47d2c;}
span.red{color:#ee1d23;}
span.purple{color:#8400ff;}
span.black{color:#252525;}
span.yellow{color:#f59a23;}
span.gray{color:#898989;}

.titleBar{min-height:30px;line-height:30px;margin:15px 0 10px;position:relative;}
.titleBar h3{display:inline-block;font-size:18px;color:#111;font-weight:bold;}
.titleBar h4{display:inline-block;font-size:16px;color:#111;font-weight:bold;}
.titleBar h5{display:inline-block;font-size:14px;color:#111;font-weight:bold;}
.titleBar .unit{display:inline-block;vertical-align:middle;padding-left:5px;font-size:12px;color:#959595;letter-spacing:-0.5px;}
.titleBar .explan{display:inline-block;vertical-align:top;height:30px;line-height:30px;margin-right:10px;}
.titleBar2{min-height:30px;line-height:30px;margin:0 0 10px;position:relative;}

.atmosphereTitleBar{min-height:30px;line-height:30px;margin:0px 0 10px;position:relative;}
.atmosphereTitleBar h3{display:inline-block;font-size:18px;color:#111;font-weight:bold;}
.atmosphereTitleBar h4{display:inline-block;font-size:16px;color:#111;font-weight:bold;}
.atmosphereTitleBar h5{display:inline-block;font-size:14px;color:#111;font-weight:bold;}
.atmosphereTitleBar .unit{display:inline-block;vertical-align:middle;padding-left:5px;font-size:12px;color:#959595;letter-spacing:-0.5px;}
.atmosphereTitleBar .explan{display:inline-block;vertical-align:top;height:30px;line-height:30px;margin-right:10px;}

.searchBar{min-height:30px;margin:15px 0;position:relative;}
.searchBar input[type="text"].useDatepicker{width:120px;}
.searchBar select{display:inline-block;vertical-align:top;min-width:130px;margin-right:5px;}
.searchBar label,
.searchBar .explan{display:inline-block;vertical-align:top;height:30px;line-height:30px;margin-right:5px;}
.searchBar .explan.bgGray{padding:0 10px;background-color:#ebebeb;}

.searchResult > .unit{display:block;color:#959595;top:10px;right:15px;font-size:12px;font-weight:normal;line-height:20px;}

.tableBox + .searchBar,
.tableBox + .titleBar,
.borderBox + .titleBar{margin-top:40px;}
.borderBox + .borderBox,
.borderBox + .tableBox{margin-top:20px;}

.tabContent{position:relative;}
.tabContent > .pinLock{top:-30px;}

.mapBox{position:relative;max-width:100%;}
.mapBox .mapImg{width:500px;height:660px;}
.mapBox .point{display:block;position:absolute;width:10px;height:10px;border-radius:50%;}
.mapBox .point.blue{background:#24aae1;}
.mapBox .point.green{background:#a9d572;}
.mapBox .point.orange{background:#f47d2c;}
.mapBox .point.red{background:#ee1d23;}
.mapBox .point.purple{background:#8400ff;}
.mapBox .point.black{background:#252525;}
.mapBox .point.yellow{background:#f59a23;}
.mapBox .point.gray{background:#898989;}
.mapBox .modalWrap{width:370px;padding:10px;margin-left:-165px;border:1px #e1e1e1 solid;border-radius:5px;}
.mapBox .modalWrap.active{top:100px;}
.mapBox .modalWrap .modalTitle{height:30px;line-height:30px;padding:0 40px 0 0;background:none;}
.mapBox .modalWrap .modalTitle h4{height:30px;line-height:30px;padding-left:5px;font-size:14px;color:#363636;}
.mapBox .modalWrap .modalTitle .btn_modalClose{width:30px;height:30px;top:-5px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;}
.mapBox .modalWrap .modalContent{padding:0;}
.mapBox .tableBox{margin-bottom:0;}
.mapBox .tableMore{padding-top:10px;height:auto;line-height:normal;}
.mapBox .mapLegendSearch{position:relative;}
.mapBox .mapLegendSearch > .btnSearch{display:block;width:50px;height:50px;position:absolute;bottom:580px;left:10px;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_search.png) no-repeat center center;text-indent:-9999px;}
.mapBox .mapLegendSearch > select{display:block;width:180px;height:30px;position:absolute;bottom:20px;right:0;border:1px #e1e1e1 solid;}

.mapLegend{padding:10px 20px;margin-bottom:20px;border:1px #e1e1e1 solid;box-sizing:border-box;border-radius:5px;}
.mapLegend b{display:inline-block;padding:10px 0;font-size:16px;color:#111;font-weight:bold;}
.mapLegend select{display:block;width:100%;padding:0;margin-bottom:20px;}
.mapLegend ul li{display:block;position:relative;padding:2px 0 2px 15px;font-size:13px;}
.mapLegend ul.horizontal li{float:left;box-sizing:border-box;}
.mapLegend ul.horizontal:after{display:block;content:'';clear:both;}
.mapLegend ul.horizontal.cols2 li{width:50%;}
.mapLegend ul.horizontal.cols3 li{width:33.3333%;}
.mapLegend ul.horizontal.free li{display:inline-block;vertical-align:top;}
.mapLegend ul li:before{display:block;content:'';position:absolute;top:50%;left:0;margin-top:-5px;width:10px;height:10px;border-radius:50%;}
.mapLegend ul li span{display:inline-block;padding-right:15px;vertical-align:middle;}
.mapLegend ul li.blue:before{background:#24aae1;}
.mapLegend ul li.green:before{background:#a9d572;}
.mapLegend ul li.orange:before{background:#f47d2c;}
.mapLegend ul li.red:before{background:#ee1d23;}
.mapLegend ul li.purple:before{background:#8400ff;}
.mapLegend ul li.black:before{background:#252525;}
.mapLegend ul li.yellow:before{background:#f59a23;}
.mapLegend ul li.gray:before{background:#898989;}
.mapLegend.mapLegendMb ul.horizontal.cols1 li{width:33.3333%;}

.airQuality > ul{margin:0px -10px;}
// 0207수정
.airQuality2 > ul{margin:10px -5px;}
// 0207수정끝
.airQuality > ul:after{display:block;content:'';clear:both;}
.airQuality > ul > li{float:left;padding:0 5px;box-sizing:border-box;}
.airQuality > ul.cols2 > li{width:50%;}
.airQuality > ul.cols6 > li{width:16.6666%;}
.airQuality .airState{width:150px;height:80px;position:relative;}
.airQuality .airState > span{display:block;position:absolute;letter-spacing:-0.5px;}
.airQuality .airState > .kinds{width:70px;top:20px;left:20px;}
.airQuality .airState > .state{width:100px;height:40px;line-height:100%;top:20px;left:90px;font-size:20px;}
.airQuality .airState > .data{width:70px;position:absolute;top:40px;left:20px;font-size:12px;color:#898989;}
.airQuality .airState.row2 > .kinds{top:15px;}
.airQuality .airState.row2 > .data{top:50px;}
.airQuality .airState.temperature,
.airQuality .airState.humidity{height:25px;line-height:40px;}
.airQuality .airState.temperature > .kinds,
.airQuality .airState.humidity > .kinds{height:40px;line-height:40px;top:0;}
.airQuality .airState.temperature > .data,
.airQuality .airState.humidity > .data{width:40px;height:40px;line-height:30px;top:5px;left:90px;font-size:20px;color:#252525;}

.airQuality .airStateDong{width:100px;height:60px;position:relative;}
.airQuality .airStateDong > span{display:block;position:absolute;letter-spacing:-0.5px;}
.airQuality .airStateDong > .kinds{width:70px;top:20px;left:20px;}
.airQuality .airStateDong > .state{width:100px;height:40px;line-height:100%;top:20px;left:90px;font-size:20px;}
.airQuality .airStateDong > .data{width:70px;position:absolute;top:40px;left:20px;font-size:12px;color:#898989;}
.airQuality .airStateDong.row2 > .kinds{top:15px;}
.airQuality .airStateDong.row2 > .data{top:50px;}
.airQuality .airStateDong.temperature,
.airQuality .airStateDong.humidity{height:25px;line-height:40px;margin-top:10px;}
.airQuality .airStateDong.temperature > .kinds,
.airQuality .airStateDong.humidity > .kinds{height:40px;line-height:40px;top:0;}
.airQuality .airStateDong.temperature > .data,
.airQuality .airStateDong.humidity > .data{width:40px;height:40px;line-height:30px;top:5px;left:90px;font-size:20px;color:#252525;}


.airQuality > ul.hasBorder .airState{border:1px #e1e1e1 solid;border-radius:5px;}
.airQuality > ul.hasBorder .airState.temperature,
.airQuality > ul.hasBorder .airState.humidity{height:80px;line-height:80px;}
.airQuality > ul.hasBorder .airState.temperature > .kinds,
.airQuality > ul.hasBorder .airState.humidity > .kinds{top:20px;}
.airQuality > ul.hasBorder .airState.temperature > .data,
.airQuality > ul.hasBorder .airState.humidity > .data{top:25px;}


.airForecastWrap{padding-left:300px;position:relative;}
.airForecastWrap > div{}
.airForecastWrap > .left{width:280px;position:absolute;top:0;left:-5px;}
.airForecastWrap > .left > .mapLegend{height:320px;}
.airForecastWrap > .right{padding:20px;border:1px #e1e1e1 solid;border-radius:5px;box-sizing:border-box;}
.airForecast{display:block;margin:-7px -7px 0;}
.airForecast:after{display:block;content:'';clear:both;}
.airForecast > li{display:block;position:relative;float:left;padding:17px 7px;height:140px;font-size:13px;text-align:center;box-sizing:border-box;}
.airForecast.cols3 > li{width:33.3333%;}
.airForecast.cols5 > li{width:20%;}
.airForecast > li:before{display:block;content:'';position:absolute;top:7px;bottom:7px;left:7px;right:7px;border:1px #e1e1e1 solid;border-radius:4px;box-sizing:border-box;}
.airForecast > li .label{display:block;padding:10px;}
.airForecast > li .label b{display:inline-block;margin-right:5px;font-size:14px;}
.airForecast > li > ul{display:block;overflow:hidden;}
.airForecast > li > ul:after{display:block;content:'';clear:both;}
.airForecast > li > ul li{display:block;position:relative;float:left;width:50%;}
.airForecast > li > ul li:before{display:block;content:'';position:absolute;top:10px;bottom:10px;right:-1px;border-right:1px #e1e1e1 solid;}
.airForecast > li > ul li > em{display:block;text-align:center;}
.airForecast > li > ul li > span{display:table-cell;vertical-align:middle;height:50px;padding:0 25px;font-size:20px;word-break:keep-all;}
.airForecast2 > li{height: 145px;}
.airForecast2 > li > .label{padding-top:0px;}
.airQuality .airState2{height: 60px;}
.airForecast > li > .icon{display:block; padding-bottom: 2px;}
.airForecast > li > ul li > .icon > img{width:90%; height: auto}

.categoryArea{padding:15px 40px;}
.categoryArea li{display:inline-block;padding:0 5px;}
.categoryArea li a{display:block;height:40px;line-height:40px;padding:0 px;color:#111;text-align:center;border:1px #e1e1e1 solid;border-radius:5px;}
.categoryArea li.active a{background-color:#0072bc;color:#fff;}
.categoryArea .slick-arrow{width:40px;height:40px;position:absolute;top:0;border:0;text-indent:-9999px;}
.categoryArea .slick-prev{left:-40px;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/btn_arrow_prev.png) no-repeat center center;}
.categoryArea .slick-next{right:-40px;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/btn_arrow_next.png) no-repeat center center;}

.dustArea{height:45px;margin-top:3px;position:relative;}
.dustArea > b{display:inline-block;height:45px;line-height:45px;font-size:16px;color:#111;font-weight:bold;}
.dustArea > div{display:inline-block;height:45px;margin-left:10px;position:absolute;top:0;}
.dustArea > div > .icon{display:block;width:120px;height:45px;}
.dustArea > div > .state{width:65px;height:20px;position:absolute;top:0;right:0;}
.dustArea > div > .data{width:65px;height:25px;position:absolute;bottom:0;right:0;}
.dustArea > a{display:inline-block;position:absolute;top:7px;right:0;}

.airSearchList{overflow-y: scroll; height: 110px; margin: 10px -20px;border-top:1px #e1e1e1 solid;border-bottom:1px #e1e1e1 solid;}
// .airSearchList > a{display:block;padding:10px 20px;border-bottom:1px #e1e1e1 solid; box-sizing: border-box;}
.airSearchList > a{display:block;padding:10px 20px; box-sizing: border-box;}
.airSearchList > a:last-child{border-bottom:0px;}
.airSearchList > a > em{float: right; width:50%; text-align: right; font-size: 12px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
.airSearchList > a.active{background-color:#0072bc;color:#fff;}

.averageArea:after{display:block;content:'';clear:both;}
.averageArea > li{padding:5px 0 5px 40px;}

.averageArea > li.buildingCount{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_angle_count.png) no-repeat left 2px;}

.averageArea > li.angle{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_angle.png) no-repeat left 2px;}

.averageArea > li.crack{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_crack.png) no-repeat left 2px;}
.averageArea > li.crackAverage{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_crack_av.png) no-repeat left 2px;}

.averageArea > li.video{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_video.png) no-repeat left 2px;}
.averageArea > li.videoCount{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_video_count.png) no-repeat left 2px;}

.averageArea > li.clean{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_clean.png) no-repeat left 2px;}
.averageArea > li.cleanTon{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_clean_ton.png) no-repeat left 2px;}


.averageArea > li.light{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_light.png) no-repeat left 2px;}

/*사이트맵*/
.sitemap .deaph1:after{display:block;content:'';clear:both;}
.sitemap .deaph1 > li{float:left;width:200px;height:240px;margin-right:45px;margin-bottom:60px;}
.sitemap .deaph1 > li:nth-child(4n){margin-right:0;}
.sitemap .deaph1 > li > b,
.sitemap .deaph2 > li > a{display:block;padding-left:15px;font-size:16px;color:#252525;}
.sitemap .deaph1 > li > b{height:60px;line-height:60px;background-color:#d7d7d7;}
.sitemap .deaph2 > li > a{height:40px;line-height:40px;}
.sitemap .deaph2{margin:10px 0;}

/* ======================================== 플랫폼소개 - 20191224 ======================================== */
.document{padding:10px 20px;font-size:16px;line-height:2em;}
.document h5{display:block;margin-bottom:20px;font-size:2.1em;font-weight:normal;color:#0072bc;line-height:1.4em;}
.document h6{display:block;margin-bottom:10px;font-size:1.1em;font-weight:bold;line-height:1.4em;}
.document .imgArea{display:block;margin:10px 0;text-align:center;}
.document .imgArea img{max-width:100%;}

.productDetail{position:relative;padding-left:340px;background:#fbfbfb;border:1px #e1e1e1 solid;}
.productDetail .thumb{display:block;position:absolute;top:50%;left:70px;margin-top:-100px;width:200px;height:200px;text-align:center;line-height:200px;}
.productDetail .tableBox{margin:-1px;}
.productDetail .tableBox table.view thead th{text-align:center;background:#d2effa;}
.productDetail .tableBox table.view tbody th{text-align:center;}
.productDetail .tableBox table.view td ul{display:block;}
.productDetail .tableBox table.view td ul li{display:block;position:relative;padding-left:12px;}
.productDetail .tableBox table.view td ul li em{position:absolute;top:0;left:0;}
.productDetail .tableBox table.view th,
.productDetail .tableBox table.view td{padding:10px;}
/* ======================================== //플랫폼소개 - 20191224 ======================================== */

/* ======================================== 서비스구성 - 20200115 ======================================== */
.configMap{position:relative;padding:30px;margin-bottom:10px;border:1px #e1e1e1 solid;}
.configMap .imgArea{display:block;text-align:center;}
.configMap .imgArea img{max-width:100%;}
.configMap .mapBtn{position:absolute;top:25px;left:25px;}
.configMap .mapBtn a{display:block;margin-bottom:10px;padding-left:50px;width:130px;height:40px;font-size:15px;line-height:38px;}
.configMap .mapBtn a.btn_mapZoom{color:#fff;background:#0072bc url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_mapZoom.png) no-repeat 10px center;border-color:#0072bc;}
.configMap .mapBtn a.btn_mapDown{background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_mapDown.png) no-repeat 10px center;}
.configMap .mapCopyright{position:absolute;bottom:15px;left:20px;font-size:12px;color:#acacac;}
.modalWrap.mapZoom{padding:0 0 20px;margin-left:-650px;width:1300px;border-radius:20px;overflow:hidden;}
.modalWrap.mapZoom .modalTitle{margin:10px;background-color:#fff;}
.modalWrap.mapZoom .modalTitle h4{font-size:18px;color:#363636;}
.modalWrap.mapZoom .modalTitle .btn_modalClose{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;}
.modalWrap.mapZoom .modalContent{padding:0 40px;max-height:inherit;}
/* ======================================== //서비스구성 - 20200115 ======================================== */

/* 대기환경 */
.rightText{text-align: right;}
.mapLegendMb{display: none;}
.mapLegendSearch{position: relative; margin-top:10px; width: 100%; height: 50px; padding: 0 10px; box-sizing: border-box;}
.mapBtBox{position: relative; width: 50%; height: 40px; background: #eee; border-radius: 10px; border: 2px solid #ddd;}
.mapBtBox > li{position: relative; float: left; width: 50%; height: 100%; padding:2px ;box-sizing: border-box; border-radius: 10px; overflow: hidden;}
.mapBtBox > li > a{position: absolute; top:0; left: 0; width: 100%; height: 100%; text-align: center; line-height: 40px;}
.mapBtBox > li > .active{background:#57b0cd; color:#fff; font-weight: 600;}
.mapLegendSearch > .btnSearch{display: block;width: 40px;height: 40px;\tposition: absolute;top: 0px;right: 10px;background: url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_search.png) no-repeat center center;text-indent: -9999px;background-size: 100%;}
.noticeWrap{position: relative; width: 100%; height: 40px; border:1px solid #e1e1e1 ; padding:5px 10px; box-sizing: border-box; background:#f6f6fb;}
.noticeWrap > li{float: left;}
.noticeWrap > .noticeTit{display: inline-block; width: 10%; }
.noticeWrap > .noticeTit::after{width: 2px; height: 10px; background:red;}
.noticeWrap > .noticeTit > p {line-height: 30px; font-weight: 600; color: #555;}
// 0208수정
.noticeWrap > .noticeCont{position: relative; display: inline-block; max-width: 80%; width:80%; height: 100%; overflow: hidden; top:6px;}
// 0208수정끝
.noticeWrap > .noticeCont > p{line-height:30px;color:#222;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.noticeBtWrap{position:absolute;top:0;right:0; width: 10%;height: 100%; }
.noticeBtBox{float: right;width: 100%;height: 100%; padding: 5px 0px; box-sizing: border-box;}
.noticeBtBox > li{position:relative;width: 100%; height: 50%; text-align: center;}
.noticeBtBox > li > a > img{width: 30%; height: 50%;}
.selectWrapMb{display:none;position: relative; width: 100%; height: 40px; }
.selectWrapMb > select{width: 45%; height: 100%;}
.smsWrap{display:block; position: relative; width: 100%; text-align: right; }
// 0207수정
.condition{display: block; padding:10px;font-size: 20px;height: 40px;line-height: 40px;}
// 0207수정끝
// 0208수정
.noticeText{cursor:pointer;}
.noticeTextBox{width:100%; height: 100%;}
.noticeTextBox > li{position:absolute; top:0; left:0; width:100%; height: 100%; line-height: 28px;}
.noticeTextBox > li:nth-child(2){top:100%;}
.noticeTextBox > li:nth-child(3){top:200%;}
// 0208수정끝

/*공지사항*/
// 0207수정
.icon_file{display:inline-block;vertical-align:middle;width:14px;height:20px;background-repeat:no-repeat;background-position:left top;text-indent:-9999px;background-size: 100%; margin-right: 5px;}
.icon_file.hwp{background-image:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_file_hwp2.png);}
.icon_file.ppt{background-image:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_file_ppt2.png);}
.icon_file.doc{background-image:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_file_doc2.png);}
.icon_file.pdf{background-image:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_file_pdf2.png);}
.icon_file.xls{background-image:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_file_xls2.png);}
.icon_file.img{background-image:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_file_img2.png);}
// 0207수정끝

/*마이페이지*/
ul.mypageMain{margin:0 -10px;}
ul.mypageMain:after{display:block;content:'';clear:both;}
ul.mypageMain > li{float:left;width:33.3333%;padding:10px 15px;box-sizing:border-box;}
ul.mypageMain > li > a{display:block;height:80px;padding-top:115px;border:1px #e1e1e1 solid;border-radius:5px;text-align:center;font-size:20px;color:#252525;letter-spacing:-1px;}
ul.mypageMain > li.col1 > a{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mypage1.png) no-repeat center 35px;}
ul.mypageMain > li.col2 > a{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mypage2.png) no-repeat center 35px;}
ul.mypageMain > li.col3 > a{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mypage3.png) no-repeat center 35px;}
ul.mypageMain > li.col4 > a{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mypage4.png) no-repeat center 35px;}
ul.mypageMain > li.col5 > a{background:url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mypage5.png) no-repeat center 35px;}
ul.mypageMain > li > a > span{display:block;padding:10px 0;font-size:16px;color:#0072bc;}

.mypageForm .tableBox table.form{border-top:1px #e1e1e1 solid;border-left:1px #e5e5e5 solid;}
.mypageForm .tableBox table.form th,
.mypageForm .tableBox table.form td{vertical-align:middle;padding:10px 0 10px 30px;font-size:14px;color:#363636;border-right:1px #e1e1e1 solid;border-bottom:1px #e1e1e1 solid;}
.mypageForm .tableBox table.form th{border-right:0;text-align:left;}
.mypageForm .tableBox table.form th.noLine,
.mypageForm .tableBox table.form td.noLine{padding-bottom:0;border-bottom:0;}
.mypageForm .tableBox table.form th{position:relative;background-color:#fff;}
.mypageForm .tableBox table.form th .require{display:inline-block;vertical-align:middle;width:10px;height:10px;margin-right:5px;position:absolute;top:15px;left:15px;border-radius:5px;background-color:#ff0000;text-indent:9999px;overflow:hidden;}

.modalWrap.pwdConfirm{padding:0 0 20px;border-radius:20px;overflow:hidden;}
.modalWrap.pwdConfirm .modalTitle{padding:45px 0 20px;font-size:30px;text-align:center;}
.modalWrap.pwdConfirm .modalTitle .btn_modalClose{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;}
#btn_modalCloseNew{display:block;position:absolute;top:0;right:0;width:40px;height:40px;text-indent:-9999em;background:url(${ADMIN_CONST.BASE_IMAGE_PATH}/common/btn_modalClose.png) no-repeat center center;}
.modalWrap.pwdConfirm .modalContent{padding:0 45px;}
.modalWrap.pwdConfirm .modalContent input[type="text"]{display:block;width:100%;height:50px;margin:10px 0;font-size:16px;}
.modalWrap.pwdConfirm .modalContent input[type="password"]{display:block;width:100%;height:50px;margin-top:10px;font-size:16px;}
.modalWrap.pwdConfirm .modalContent p{padding:10px 0;line-height:150%;font-size:16px;text-align:center;}

/* Map */
#aside{position:fixed;top:0;bottom:0;left:0;width:300px;box-shadow:0 0 5px rgba(0,0,0,0.2);background:#fff;z-index:10;transition-duration:0.5s;}
.asideHeader{position:absolute;top:0;left:0;right:0;}
.asideHeader h1{display:block;padding:0 10px;height:100px;text-align:center;line-height:100px;}
.asideSearch{padding:0 10px;}
.asideSearch div{margin-bottom:10px;}
.asideSearch .divGroup{margin-bottom:0;}
.asideSearch .divGroup > div{padding:0 5px;}
.asideSearch .btn_l{padding:0 10px;font-size:13px;}
.asideContent{padding:10px;box-sizing:border-box;overflow-y:auto;}
.asideLegend{position:absolute;bottom:10px;left:10px;right:10px;padding:20px 25px;border:1px #e1e1e1 solid;border-radius:4px;z-index:4}
.asideLegend b{display:inline-block;font-size:16px;font-weight:800;vertical-align:middle;}
.asideLegend input[type='text'],
.asideLegend select{margin-top:10px;}
.asideLegend .unit{display:inline-block;margin-left:10px;font-size:12px;color:#959595;vertical-align:middle;}
.asideLegend ul{display:block;margin-top:15px;}
.asideLegend ul li{display:block;position:relative;margin-top:10px;padding-left:15px;font-size:13px;}
.asideLegend ul li:before{display:block;content:'';position:absolute;top:50%;left:0;margin-top:-5px;width:10px;height:10px;border-radius:50%;}
.asideLegend ul li span{display:inline-block;min-width:60px;vertical-align:middle;}
.asideLegend ul li.blue:before{background:#24aae1;}
.asideLegend ul li.green:before{background:#a9d572;}
.asideLegend ul li.orange:before{background:#f47d2c;}
.asideLegend ul li.red:before{background:#ee1d23;}
.asideLegend ul li.purple:before{background:#8400ff;}
.asideLegend ul li.black:before{background:#252525;}
.asideLegend ul li.yellow:before{background:#f59a23;}
.asideLegend ul li.gray:before{background:#898989;}

#aside .btn_asideToggle{display:block;position:absolute;top:50%;right:-35px;margin-top:-30px;width:40px;height:65px;text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_asideToggle.png) no-repeat;}
#aside .btn_asideToggle_on{display:block;position:absolute;top:50%;right:-35px;margin-top:-30px;width:40px;height:65px;text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_asideToggle_on.png) no-repeat;}

.mapWrap{position:absolute;top:0;bottom:0;left:300px;right:0;transition-duration:0.5s;width:;}
.mapWrap .marker{display:block;position:absolute;}
.mapWrap .markerDetail{display:block;position:absolute;width:370px;padding:10px 10px;font-size:12px;line-height:150%;text-align:left;background:#fff;border:1px #e1e1e1 solid;border-radius:4px;box-sizing:border-box;left:14px;top:-20px;}
// .mapWrap .markerDetail:after{display:block;content:'';position:absolute;top:15px;left:-15px;width:15px;height:15px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_marker_arrow.png) no-repeat;}
.mapWrap .markerDetail > b{display:block;margin:5px 0;font-size:13px;}
.mapWrap .markerDetail > p{display:block;margin:5px 0;}
.mapWrap .markerDetail .tableBox{margin:5px 0;}
.mapWrap .markerDetail .tableBox table.view th,
.mapWrap .markerDetail .tableBox table.view td{padding:10px;}
.mapWrap .markerDetail .btn_detailClose{display:block;position:absolute;top:10px;right:10px;width:20px;height:20px;text-indent:-9999em;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;}
.mapWrap .zoomBox{position:fixed;top:30px;right:10px;width:40px;border-radius:4px;box-shadow:0 5px 5px rgba(0,0,0,0.2);overflow:hidden;z-index:2;}
.mapWrap .zoomBox a{display:block;margin-bottom:1px;height:40px;text-indent:-9999em;}
.mapWrap .zoomBox a.btn_close{background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;}
.mapWrap .zoomBox a.btn_zoomPlus{background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_zoom_plus.png) no-repeat center center;}
.mapWrap .zoomBox a.btn_zoomMinus{background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_zoom_minus.png) no-repeat center center;}
.mapWrap .point{display:block;position:absolute;width:10px;height:10px;border-radius:50%;}
.mapWrap .point.blue{background:#24aae1;}
.mapWrap .point.green{background:#a9d572;}
.mapWrap .point.orange{background:#f47d2c;}
.mapWrap .point.red{background:#ee1d23;}
.mapWrap .point.purple{background:#8400ff;}
.mapWrap .point.black{background:#252525;}
.mapWrap .markerDetail .point{display:inline-block;position:static;}
.mapWrap .markerDetail .marker{display:inline-block;position:static;}

#wrap.mapBody{min-width:300px;}
.asideHidden #aside{left:-300px;}
.asideHidden .mapWrap{left:0;}

#wrap .asideHidden #aside{left:-300px;}
#wrap .asideHidden .mapWrap{left:0px;}

.content .mapWrap{position:relative;left:0;height:900px;}
.content .mapWrap .zoomBox{position:absolute;}
.content .mapWrap .asideLegend{position:absolute;bottom:10px;left:10px;width:280px;background:#fff;box-sizing:border-box;}

/* ======================================== 경고창 - 20191224 ======================================== */
#loading{display:none;position:absolute;top:50%;left:50%;width:400px;margin:-70px 0 0 -200px;z-index:1000;}
#loading:after{display:block;content:'';position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1;}
#loading > div{width:100px;height:100px;border-radius:100%;position:relative;margin:0 auto;z-index:2;}
#loading > div:before,
#loading > div:after{content:"";position:absolute;top:-10px;left:-10px;width:100%;height:100%;border-radius:100%;border:10px solid transparent;border-top-color:#3498db;}
#loading > div:before{z-index:1001;animation:spin 0.8s infinite linear;}
#loading > div:after{border:10px solid #ccc;}
#loading p.loadingCon{position:relative;margin-top:20px;line-height:30px;font-size:18px;color:#ccc;text-align:center;z-index:1001;}

.imgInsertBox{margin-left:0px; position:relative;min-width:120px;min-height:70px;text-align:center;border:1px #e1e1e1 solid;box-sizing:border-box;}
.imgInsertBox .bg{display:block;position:absolute;top:50%;left:10px;right:10px;margin-top:-35px;padding-top:50px;font-size:13px;text-align:center;line-height:120%;background:url(/static/images/admin/common/icon_img.png) no-repeat center top;}
@keyframes spin{
  0%{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}
  100%{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}
}

.modalWrap{border-radius:5px;overflow:hidden;}
.modalWrap.active{top:100px;z-index:1001;}
.modalWrap .modalTitle{height:40px;line-height:40px;padding:0 40px 0 0;background:#363636;}
.modalWrap .modalTitle h4{height:40px;line-height:40px;padding-left:20px;font-size:14px;color:#fff;}
.modalWrap .modalTitle .btn_modalClose{width:40px;height:40px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_modalClose.png) no-repeat center center;}

.modalWrap.loading{margin-left:-290px;width:580px;background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_loading.jpg) repeat-x -70px bottom;}
.modalWrap.loading .modalTitle{padding:50px 0 10px;height:auto;line-height:auto;text-align:center;background:none;}
.modalWrap.loading .modalTitle h4{padding-left:0;height:auto;font-size:28px;color:#252525;}
.modalWrap.loading .loadingText{margin-bottom:70px;font-size:15px;line-height:200%;text-align:center;}
.modalWrap.loading #loadingAction{margin:0 auto 70px;width:100px;height:100px;border-radius:100%;position:relative;z-index:2;}
.modalWrap.loading #loadingAction:before,
.modalWrap.loading #loadingAction:after{content:"";position:absolute;top:-10px;left:-10px;width:100%;height:100%;border-radius:100%;border:10px solid transparent;border-top-color:#3498db;}
.modalWrap.loading #loadingAction:before{z-index:1001;animation:spin 0.8s infinite linear;}
.modalWrap.loading #loadingAction:after{border:10px solid #ccc;}

.modalWrap.alert{margin-left:-230px;width:460px;position:fixed;}
.modalWrap.alert .modalTitle{padding:50px 0 30px;height:auto;line-height:auto;text-align:center;background:none;}
.modalWrap.alert .modalTitle h4{padding-left:0;height:auto;font-size:28px;color:#252525;}
.modalWrap.alert .modalTitle .btn_modalClose{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;}
.modalWrap.alert .modalContent{padding-bottom:50px;}

.alertText{padding:110px 0 50px;font-size:15px;color:#ed1c24;line-height:200%;text-align:center;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_alertText.png) no-repeat center top;}
.infoText{padding:30px 0 80px;font-size:15px;line-height:200%;text-align:center;}

.d3{padding:30px; text-align:center;}
.upperD3{width:100%;height:auto;}

@media all and (max-width:640px){
    .modalWrap.loading,
    .modalWrap.alert{margin-left:-150px;width:300px;background:#fff;}
    .modalWrap.loading .modalTitle{padding:30px 0 0;}
    .modalWrap.loading .modalTitle h4{font-size:20px;}
    .modalWrap.loading .loadingText{margin-bottom:30px;font-size:14px;line-height:160%;}
    .modalWrap.loading #loadingAction{margin:0 auto 30px;width:60px;height:60px;}
    .modalWrap.alert .modalTitle{padding:30px 0 0;}
    .modalWrap.alert .modalTitle h4{font-size:20px;}
    .modalWrap.alert .modalContent{padding-bottom:30px;}
    .alertText{padding:60px 0 30px;font-size:14px;line-height:160%;background-size:auto 50px !important;}
    .infoText{padding:0 0 30px;font-size:14px;line-height:160%;}
}
/* ======================================== //경고창 - 20191224 ======================================== */

/* ==============================================================================================================
= 반응형
============================================================================================================== */
/*Mobile*/
@media all and (max-width:768px){
  .fs26{font-size:20px;}
  
  .subTop{min-height:inherit;}
  .subTop h3{padding:20px 0 10px;font-size:22px;}
  .subTop .subLocation > span{font-size:12px;}
  .subTop h3 + p{font-size:13px;}
  
  .tabBar{height:41px;}
  .tabBar > li > a{padding:0 15px;height:40px;font-size:14px;line-height:40px;}
  
  .searchBar select,
  .searchBar input,
  .searchBar a{margin-bottom:5px;max-width:120px;}
  .searchBar .pinLock{display:block;position:static;}
  .searchBar input[type="text"].useDatepicker{width:105px;}
  
  .titleBar .pinLock{display:block;position:static;float:right;}
  .titleBar .excel{display:none;}
  
  .pageCount a,
  .pageCount span{margin:0;width:20px;height:20px;font-size:12px;line-height:18px;}
  
  .loginForm{max-width:100%;height:auto;}
  .loginForm input{position:static;margin-bottom:20px;}
  .loginForm input[type='text'],
  .loginForm input[type='password'],
  .loginForm input[type='submit']{width:100%;height:48px;}
  
  .joinForm .statusBar{margin-bottom:20px;}
  .joinForm .statusBar li{font-size:14px;}
  .joinForm .statusBar li:after{display:none;}
  .joinForm .explanHead{padding:0 0 20px;}
  .joinForm .explanHead > p{font-size:14px;line-height:150%;}
  .joinForm .explanHead > strong{font-size:17px;}
  .joinForm .explanFoot > p{font-size:14px;line-height:150%;}
  .joinForm .joinAgree h3{font-size:17px;}
  .joinForm .joinAgree .terms{padding:15px;height:150px;font-size:14px;line-height:150%;}
  .joinForm .joinAgree .checkArea{text-align:left;}
  .joinForm .joinAgree .checkArea label{margin-left:0;}
  .joinForm.memberGroup{max-width:100%;}
  .joinForm.memberGroup ul{border-top:1px #e1e1e1 solid;}
  .joinForm.memberGroup ul > li{float:none;padding:20px;width:auto;height:auto;background:none !important;border-top:0px none;}
  .joinForm.memberGroup ul > li.child{margin:0;}
  .joinForm.memberGroup .explanFoot{padding:20px 0;}
  .joinForm.auth{max-width:100%;}
  .joinForm.auth .authArea{max-width:100%;background:url(${USER_CONST.BASE_IMAGE_PATH}/content/img-join-mobile.png) no-repeat center top;}
  .joinForm.auth .authArea .btn_auth{top:260px;right:50%;margin-right:-90px;}
  .joinForm.auth .authArea .explanFoot{padding-top:350px;}
  .joinForm.step2 .explanFoot > strong{font-size:17px;}
  .joinForm.findpw{max-width:100%;}
  
  .joinForm .tableBox{overflow:inherit;}
  .joinForm .tableBox table.form{display:block !important;border:1px #e1e1e1 solid !important;border-bottom:0px none !important;}
  .joinForm .tableBox table.form colgroup{display:none !important;}
  .joinForm .tableBox table.form tbody,
  .joinForm .tableBox table.form tr{display:block !important;}
  .joinForm .tableBox table.form th{display:block !important;padding:10px 10px 0 30px !important;width:auto !important;height:auto !important;text-align:left !important;border:0px none !important;}
  .joinForm .tableBox table.form td{display:block !important;padding:10px !important;width:auto !important;line-height:150%;height:auto !important;border:0px none !important;border-bottom:1px #e1e1e1 solid !important;}
  .joinForm .tableBox .explanEx{display:block;margin-left:0;margin:5px 0;}
  
  .mypageForm .tableBox{overflow:inherit;}
  .mypageForm .tableBox table.form{display:block !important;border:1px #e1e1e1 solid !important;border-bottom:0px none !important;}
  .mypageForm .tableBox table.form colgroup{display:none !important;}
  .mypageForm .tableBox table.form tbody,
  .mypageForm .tableBox table.form tr{display:block !important;}
  .mypageForm .tableBox table.form th{display:block !important;padding:10px 10px 0 10px !important;width:auto !important;height:auto !important;text-align:left !important;border:0px none !important;}
  .mypageForm .tableBox table.form td{display:block !important;padding:10px !important;width:auto !important;line-height:150%;height:auto !important;border:0px none !important;border-bottom:1px #e1e1e1 solid !important;}
  .mypageForm .tableBox .explanEx{display:block;margin-left:0;margin:5px 0;}
  
  .mainSection.section1{height:0px;}
  .mainSection.section1 .text1{margin:0 15px;padding-top:60px;font-size:26px;line-height:120%;letter-spacing:-1px;}
  .mainSection.section1 .text1 b{font-size:30px;}
  .mainSection.section1 .text2{margin:0 15px;padding:10px 0;font-size:13px;line-height:140%;letter-spacing:-1px;}
  .mainSection.section1 .btn{margin-left:15px;width:120px;height:0px;font-size:14px;line-height:40px;}
  
  .mainSection.section2 h2{padding:30px 0 15px;font-size:25px;}
  .mainSection.section2 ul.service{padding:0 20px;}
  .mainSection.section2 ul.service > li{margin:15px 0;width:33.3333%;text-align:center;}
  .mainSection.section2 ul.service > li > a{width:auto;height:auto;}
  .mainSection.section2 ul.service > li img{max-width:80%;}
  
  .mainSection.section3{padding-bottom:60px;height:auto;background-size:cover;}
  .mainSection.section3 h2{padding:30px 0 15px;font-size:25px;}
  .mainSection.section3 .slick-list li{width:320px;}
  .mainSection.section3 .place{padding:10px 15px;width:auto;}
  .mainSection.section3 .place .kinds{padding-top:15px;width:55px;height:auto;font-size:11px;line-height:120%;word-break:break-all;}
  .mainSection.section3 .place .state{right:0;left:60px;width:auto;height:auto;font-size:15px;}
  .mainSection.section3 .place .data{right:0;left:60px;width:auto;height:auto;}
  .mainSection.section3 .place > ul > li{padding-left:60px;width:50%;}
  .mainSection.section3 .placeGroup .slick-prev{left:0;background:rgba(255,255,255,0.5) url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mainSection3_prev.png) no-repeat center center;border:1px #ccc solid;}
  .mainSection.section3 .placeGroup .slick-next{right:0;background:rgba(255,255,255,0.5) url(${USER_CONST.BASE_IMAGE_PATH}/content/icon_mainSection3_next.png) no-repeat center center;border:1px #ccc solid;}
  
  .mainSection.section4{padding:0 20px 20px;height:auto;}
  .mainSection.section4 h2{padding:30px 0 15px;font-size:25px;}
  .mainSection.section4 ul > li{padding:0 10px;box-sizing:border-box;}
  .mainSection.section4 ul > li > a{display:table-cell;margin:0 10px;padding:0 45px 0 15px;width:999px;height:100px;font-size:16px;background-size:auto 40px !important;background-position:95% center !important;vertical-align:middle;box-sizing:border-box;}
  
  .mapBox{margin:0 auto;}
  .mapBox .mapImg{max-width:100%;height:auto;}
  
  .airForecast > li > ul li > span{padding:0 10px;width:999px;font-size:15px;text-align:center;}
  
  .airQuality > ul.cols6 > li{margin-bottom:10px;width:33.3333%;}
  .airQuality .airState{width:auto;}
  
  .airForecastWrap{padding-left:290px;}
  .airForecastWrap > .right{padding:10px;height:320px;box-sizing:border-box;}
  // 0207수정
	.airForecastWrap2{padding-left: 245px;}
	.airForecastWrap2 > .left{left:0px; width:234px}
	.airForecast3 > li{height: 114px;}
	.condition {height: auto; line-height: 100%; padding: 0px;}
	.airForecastWrap .predictTit br{display: none;}  
  // 0207수정끝
  
  .sitemap .deaph1 > li{margin:0;padding:0 10px;width:33.3333%;box-sizing:border-box;}
  .sitemap .deaph1 > li > b,
  .sitemap .deaph2 > li > a{font-size:14px;}
  .sitemap .deaph2 > li > a{padding:10px 0;height:auto;line-height:130%;}
  
  /* ======================================== 플랫폼소개 - 20191224 ======================================== */
  .document{padding:10px;font-size:14px;}
  .document .tableBox table.view th{min-width:inherit;}

  .productDetail{padding-left:0;}
  .productDetail .thumb{position:static;top:0;left:0;margin-top:0;padding:40px 0;width:auto;height:200px;text-align:center;line-height:200px;}
  /* ======================================== //플랫폼소개 - 20191224 ======================================== */

  .titleBar h3{margin:5px 0;}
  .pinLock{position:static;}

  .categoryArea{padding:10px 20px;}
  .categoryArea li{padding:0 1px;}
  .categoryArea li a{padding:0 2px;}
  .dustArea > b{width:100px;line-height:22px;word-break:keep-all;}
  .dustArea > div{margin-left:10px;}
  .airForecast{margin:0 -7px;}
  
  /* ======================================== 지도 - 20191231 ======================================== */
  #aside{position:static;top:inherit;bottom:inherit;left:inherit;width:auto;background:none;}
  .asideHeader{position:fixed;top:0;left:0;right:0;background:#fff;z-index:10;}
  .asideHeader h1{height:50px;line-height:50px;}
  .asideHeader h1 img{height:30px;}
  .asideHeader .divGroup > div{float:left !important;width:50% !important;box-sizing:border-box;}
  .asideSearch .btn_l{height:30px;line-height:28px;}
  .asideSearch div{margin-bottom:5px;}
  .asideLegend{position:fixed;bottom:0;left:0;right:0;padding:15px 10px;background:#fff;z-index:10;}
  .asideLegend ul{margin-top:10px;}
  .asideLegend ul:after{display:block;content:'';clear:both;}
  .asideLegend ul li{float:left;margin-top:5px;min-width:50%;box-sizing:border-box;}
  #aside .btn_asideToggle{display:none;}
  .mapWrap{left:0;}
  .mapWrap .zoomBox{position:absolute; top:650px;}
  /* ======================================== //지도 - 20191231 ======================================== */
  /* ======================================== 서비스구성 - 20200115 ======================================== */
  .configMap{padding:10px;}
  .configMap .mapBtn{position:static;top:inherit;left:inherit;margin-bottom:20px;}
  .configMap .mapBtn a{display:inline-block;margin-right:10px;padding-left:30px;width:100px;height:30px;font-size:13px;line-height:28px;background-size:auto 50% !important;}
  .configMap .mapCopyright{position:static;bottom:inherit;left:inherit;margin-top:20px;}
  .modalWrap.mapZoom{padding:0 0 20px;margin-left:0;left:10px;right:10px;width:auto;}
  .modalWrap.mapZoom .modalTitle{margin:0;}
  .modalWrap.mapZoom .modalTitle h4{padding-top:10px;padding-left:10px;font-size:15px;color:#363636;letter-spacing:-1px;line-height:140%;}
  .modalWrap.mapZoom .modalTitle .btn_modalClose{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;}
  .modalWrap.mapZoom .modalContent{padding:0 10px;}
  .modalWrap.mapZoom .modalContent .imgZoom{padding:10px;max-height:350px;overflow:auto;border:1px #e1e1e1 solid;box-sizing:border-box;}
  .modalWrap.mapZoom .modalContent .imgZoom img{max-width:300%;}
  /* ======================================== //서비스구성 - 20200115 ======================================== */
  
  .d3{padding: 20px}
}
// 0207수정
@media all and (max-width:548px){
	.airForecast > li .conditionDate{font-size: 12px;}
	.noticeFiletxt{display: none;}
	.noticeFileWrap > li {border-bottom: 0px;}
}
// 0207수정끝
@media all and (max-width:480px){

  .tabBar{margin-bottom:10px;}
  .tabPage{position:relative;padding-top:40px;}
  
  .mainSection.section2 ul.service{display:block;}
  .mainSection.section2 ul.service > li{float:left;width:50%;}
  .mainSection.section4 ul > li{float:none;margin-bottom:20px;padding:0 40px;width:auto;}
  .mainSection.section4 ul > li > a{height:80px;background-size:auto 50px !important;}
  
  .mapBox .modalWrap{left:10px;right:10px;margin-left:0;width:auto;}
  .mapLegend ul.horizontal li{float:none;width:auto !important;}
  
  .borderBox{padding:10px;}
  
  .airSearchList{margin:10px -10px 10px;}
  
  .dustArea > b{font-size:14px;}
  
  .airForecast > li{width:50% !important;}
  
  .airQuality > ul > li{width:50% !important;}
  
  .airForecastWrap{padding-left:0;}
  .airForecastWrap > .left{position:static;left:0;width:auto;}
  .airForecastWrap .fs26 br{display:none;}
  
  .airForecastWrap > .left > .mapLegend{height:auto;}
  .airForecastWrap > .right{height:auto;}
  
  .titleBar:after{display:block;content:'';clear:both;}
  .titleBar h3,
  .titleBar .unit{margin-bottom:5px;}
  .titleBar .pinLock{display:block;position:static;float:right;}
  .titleBar .excel{display:none;}
  
  .tableBox table.list.notice th:nth-child(1),
  .tableBox table.list.notice td:nth-child(1),
  .tableBox table.list.notice th:nth-child(3),
  .tableBox table.list.notice td:nth-child(3){width:40px;}
  .tableBox table.list.notice th:nth-child(4),
  .tableBox table.list.notice td:nth-child(4){width:80px;}
  
  .tableBox table.view td.subject{padding:5px;}
  .tableBox .textContent{min-height:300px;padding:20px 0;}
  
  .icon_file{width:20px;height:25px;background-size:cover;}
  
  .sitemap .deaph1 > li{width:50%;}
  
  ul.mypageMain > li{padding:10px;width:50%;}
  ul.mypageMain > li > a{padding:115px 15px 0 15px;font-size:15px;}
  
  .tableBox .mapLegend{display:none;}
  
  /* ======================================== 플랫폼소개 - 20191224 ======================================== */
  .productDetail .thumb{padding:0;}
  .productDetail .tableBox colgroup{display:none;}
  /* ======================================== //플랫폼소개 - 20191224 ======================================== */
  // 0207수정
  .condition {padding:10px; line-height: 23px;}
	.airForecast > li .conditionDate{font-size: 13px;}
  // 0207수정끝
}

/* ======================================== 경고창 - 20191224 ======================================== */
#loading{display:block;position:absolute;top:50%;left:50%;width:400px;margin:-70px 0 0 -200px;z-index:1000;}
#loading:after{display:block;content:'';position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1;}
#loading > div{width:100px;height:100px;border-radius:100%;position:relative;margin:0 auto;z-index:2;}
#loading > div:before,
#loading > div:after{content:"";position:absolute;top:-10px;left:-10px;width:100%;height:100%;border-radius:100%;border:10px solid transparent;border-top-color:#3498db;}
#loading > div:before{z-index:1001;animation:spin 0.8s infinite linear;}
#loading > div:after{border:10px solid #ccc;}
#loading p.loadingCon{position:relative;margin-top:20px;line-height:30px;font-size:18px;color:#ccc;text-align:center;z-index:1001;}
@keyframes spin{
    0%{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}
    100%{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}
}

.modalWrap{border-radius:5px;overflow:hidden;}
.modalWrap.active{top:100px;z-index:1001}
.modalWrap .modalTitle{height:40px;line-height:40px;padding:0 40px 0 0;background:#363636;}
.modalWrap .modalTitle h4{height:40px;line-height:40px;padding-left:20px;font-size:14px;color:#fff;}
.modalWrap .modalTitle .btn_modalClose{width:40px;height:40px;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/btn_modalClose.png) no-repeat center center;}

.modalWrap.loading{margin-left:-290px;width:580px;background:#fff url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_loading.jpg) repeat-x -70px bottom;}
.modalWrap.loading .modalTitle{padding:50px 0 10px;height:auto;line-height:auto;text-align:center;background:none;}
.modalWrap.loading .modalTitle h4{padding-left:0;height:auto;font-size:28px;color:#252525;}
.modalWrap.loading .loadingText{margin-bottom:70px;font-size:15px;line-height:200%;text-align:center;}
.modalWrap.loading #loadingAction{margin:0 auto 70px;width:100px;height:100px;border-radius:100%;position:relative;z-index:2;}
.modalWrap.loading #loadingAction:before,
.modalWrap.loading #loadingAction:after{content:"";position:absolute;top:-10px;left:-10px;width:100%;height:100%;border-radius:100%;border:10px solid transparent;border-top-color:#3498db;}
.modalWrap.loading #loadingAction:before{z-index:1001;animation:spin 0.8s infinite linear;}
.modalWrap.loading #loadingAction:after{border:10px solid #ccc;}

.modalWrap.alert{margin-left:-230px;width:460px;}
.modalWrap.alert .modalTitle{padding:50px 0 30px;height:auto;line-height:auto;text-align:center;background:none;}
.modalWrap.alert .modalTitle h4{padding-left:0;height:auto;font-size:28px;color:#252525;}
.modalWrap.alert .modalTitle .btn_modalClose{background:url(${USER_CONST.BASE_IMAGE_PATH}/common/icon_close.png) no-repeat center center;}
.modalWrap.alert .modalContent{padding-bottom:50px;}

.alertText{padding:110px 0 50px;font-size:15px;color:#ed1c24;line-height:200%;text-align:center;background:url(${USER_CONST.BASE_IMAGE_PATH}/common/bg_alertText.png) no-repeat center top;}
.infoText{padding:30px 0 80px;font-size:15px;line-height:200%;text-align:center;}

@media all and (max-width:640px){
    .modalWrap.loading,
    .modalWrap.alert{margin-left:-150px;width:300px;background:#fff;}
    .modalWrap.loading .modalTitle{padding:30px 0 0;}
    .modalWrap.loading .modalTitle h4{font-size:20px;}
    .modalWrap.loading .loadingText{margin-bottom:30px;font-size:14px;line-height:160%;}
    .modalWrap.loading #loadingAction{margin:0 auto 30px;width:60px;height:60px;}
    .modalWrap.alert .modalTitle{padding:30px 0 0;}
    .modalWrap.alert .modalTitle h4{font-size:20px;}
    .modalWrap.alert .modalContent{padding-bottom:30px;}
    .alertText{padding:60px 0 30px;font-size:14px;line-height:160%;background-size:auto 50px !important;}
    .infoText{padding:0 0 30px;font-size:14px;line-height:160%;}
    
    
   
}
}`;

export default GlobalStyle;
