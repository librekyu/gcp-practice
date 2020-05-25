/**
 * 공지사항 model
 * */
import Backbone from 'backbone';
import React from 'react';
import Router from 'next/router';
import CONST, { USER_CONST } from '../../../common/globalConst';
import Util from '../../../common/util';

const dummy = [
  {
    datetime: <>{Util.getAgoDate(1)}<br/>16:32:43</>,
    type: 'input',
    cash: '520000',
    balance: '520000',
    etc: '',
  },
  {
    datetime: <>{Util.getAgoDate(1)}<br/>17:10:10</>,
    type: 'output',
    cash: '30000',
    balance: '490000',
    etc: '',
  },
  {
    datetime: <>{Util.getAgoDate(1)}<br/>18:20:55</>,
    type: 'output',
    cash: '35000',
    balance: '455000',
    etc: '',
  },
  {
    datetime: <>{Util.getAgoDate(1)}<br/>20:00:04</>,
    type: 'input',
    cash: '1000000',
    balance: '1455000',
    etc: '',
  },
];

const Notice = Backbone.Model.extend({
    // instance method
    defaults: {
      articleId: 0, // 게시글 ID
      bbsId: 1, // 게시판 ID
      articleTitle: '', // 게시글 제목
      registeredUserNumber: 0, // 등록사용자번호
      registeredUserId: '', // 등록 사용자 ID
      registeredDatetime: '', // 등록일시
      lastUpdatedUserNumber: '', // 최종변경사용자번호
      lastUpdatedUserId: '', // 최종변경사용자 ID
      lastUpdatedDatetime: '', // 최종변경일시
      isPublic: false, // 공개여부
      attachments: []
    },
    initialize() {

    },
  },
  {
    createModelFromServerData: (json) => new Notice(json)
  });

/** 공지사항 목록 */
const NoticeList = Backbone.Collection.extend({
  model: Notice,

  getNoticeListToArray(){
    const { models } = this;
    return models && models.map((model, index) => {
      const articleId = model.get('articleId');
      const articleTitle = model.get('articleTitle');
      const registeredDatetime = model.get('registeredDatetime');
      const cvtRegisteredDatetime = registeredDatetime && registeredDatetime.split(' ')[0];

      return {
        articleId,
        articleTitle,
        registeredDatetime,
        cvtRegisteredDatetime,
      }
    });
  },

  // map 데이터를 테이블 데이터 형식으로 변환
  getMapToNoticeListData(handleDownload) {

    const { models } = this;
    const datas = dummy.reverse().map((model, index) => {
      const datetime = model.datetime;
      const type = model.type;
      const cash = model.cash;
      const balance = model.balance;
      const etc = model.etc;

      return {
        tableRowId: index,
        tableData: [
          {
            data: {
              value: datetime
            },
          },
          {
            data: {
              value: <><label style={{color: type === 'input' ? '#3690EA' : '#F74141'}}>{type === 'input' ? 'Deposit' : 'Withdrawal'}</label> {Util.numberWithCommas(cash)}</>
            },
          },
          {
            data: {
              value: Util.numberWithCommas(balance)
            },
          },
          {
            data: {
              value: etc
            },
          },
        ]
      };
    });
    return {
      hasCheckBoxInFirstColumn: false,
      caption: {
        style: {},
        value: ''
      },
      colgroup: {
        cols: [
          { className: 'w40p' }, { className: 'w15p' }, { className: 'w25p' }, { className: 'w20p' }
        ]
      },
      tableHead: {
        cols: [{ data: 'Date' }, { data: 'Deposit and Withdrawal' }, { data: 'Balance' }, { data: 'Remark' }]
      },
      tableClassName: 'list notice',
      tableBody: {
        rows: datas
      },
      emptyMessage: {
        value: CONST.COMMON_MESSAGE.EMPTY_MESSAGE,
      }
    };
  }
});

const NoticeDetail = Backbone.Model.extend({
    defaults: {
      articleId: 0,
      bbsId: 1,
      articleTitle: '',
      articleContents: '',
      hitCount: 0,
      registeredUserNumber: 0,
      registeredDatetime: '',
      lastUpdatedUserNumber: 0,
      lastUpdatedDatetime: '',
      isPublic: false,
    },
    getNoticeDetailData() {
      const attr = this.attributes;

      return {
        articleId: attr.articleId,
        bbsId: attr.bbsId,
        articleTitle: attr.articleTitle,
        articleContents: attr.articleContents,
        hitCount: attr.hitCount,
        registeredUserNumber: attr.registeredUserNumber,
        registeredDatetime: attr.registeredDatetime,
        lastUpdatedUserNumber: attr.lastUpdatedUserNumber,
        lastUpdatedDatetime: attr.lastUpdatedDatetime,
        isPublic: attr.isPublic,
      };
    }
  },
  {
    createModel: (json) => new NoticeDetail(json)
  });

export { NoticeList, NoticeDetail };

export default Notice;
