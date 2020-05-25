import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableRowComponent from './TableRowComponent';

/**
 * @description 기본 테이블 구조
 * */
const defaultTableStructure = {
  style: {},
  divClassName: '',
  tableClassName: '',
  colgroup: {
    cols: []
  },
  caption: {
    value: '',
    style: {}
  },
  hasCheckBoxInFirstColumn: false,
  tableHead: {
    cols: []
  },
  tableBody: {
    rows: []
  },
  emptyMessage: {}
};

const tableID = 'tableID';

const tableConstant = {

  LABEL_THEAD: 'thead',
  LABEL_TBODY: 'tbody',

  THEAD_ID: 'thead_id',
  TBODY_ID: 'tbody_id',

  THEAD_ROW_ID: 'thead_row_id',
  TROW_ID: 'tableRow_',
  TCOL_ID: 'tableColumn_',
  TDATA_ID: 'tableData_'

};

/**
 * @description body에 있는 row들에 대해 첫번째 td를 th로 변경하고자 할 때 type을 'head'로 준다.
 * */
const TYPE_TABLE_HEAD = 'head';

class JsmartTable extends Component {
  static propTypes = {
    dataProps: PropTypes.instanceOf(Object),
    // index: PropTypes.String
  };

  static defaultProps = {
    dataProps: {},
    totalCount: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAllChecked: false, // 전체선택 여부
      checked: false,
      checkedList: [],
    };
  }

  componentDidMount = () => {
    this.selectedCheckboxes = new Set();
    this.checkTest = new Set();
    this.rowsData = {};
  };


  headCheckboxInput;

  onRefHeadCheckBox = (c) => {
    this.headCheckboxInput = c;
  };

  /** 전체 선택 */
  handleAllRowCheck = (e) => {
    console.warn('all check ', e.target.checked);
    this.setState({ isAllChecked: e.target.checked });

    if (!e.target.checked) {
      this.selectedCheckboxes.clear();
    }
  };

  /** ckeckbox handle */
  getCheckedList = (data, isChecked) => {
    const checkedValue = `${data}`;
    const { onChangeCheckbox } = this.props;

    if (isChecked) {
      if (!this.selectedCheckboxes.has(checkedValue)) {
        this.selectedCheckboxes.add(checkedValue);
      }
    } else if (!isChecked) {
      if (this.selectedCheckboxes.has(checkedValue)) {
        this.selectedCheckboxes.delete(checkedValue);
      }
    }
    if (onChangeCheckbox) {
      onChangeCheckbox(this.selectedCheckboxes.toJSON());
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('componentDidUpdate');
    // console.log(prevProps.dataProps, this.props.dataProps);

    const prevProp = prevProps.dataProps;
    const thisProp = this.props.dataProps;

    if (prevProp && prevProp.tableBody && prevProp.tableBody.rows
      && thisProp && thisProp.tableBody && thisProp.tableBody.rows) {
      if (prevProp.tableBody.rows.length !== thisProp.tableBody.rows.length) {
        this.selectedCheckboxes.clear();
        this.rowsData = {};

        return;
      }

      thisProp.tableBody.rows
        .map((row, index) => {
          if (prevProp.tableBody.rows[index]
            && prevProp.tableBody.rows[index].tableRowId !== row.tableRowId) {
            this.selectedCheckboxes.clear();
            this.rowsData = {};
          }
        });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisProp = this.props.dataProps;
    const nextProp = nextProps.dataProps;

    if (nextProp && nextProp.tableBody && nextProp.tableBody.rows
      && thisProp && thisProp.tableBody && thisProp.tableBody.rows
      && Array.isArray(nextProp.tableBody.rows) && Array.isArray(thisProp.tableBody.rows)) {
      if (nextProp.tableBody.rows.length !== thisProp.tableBody.rows.length
        || nextProp.tableBody.rows.filter((nextPropRow, index) => (nextPropRow.tableRowId !== thisProp.tableBody.rows[index].tableRowId)).length > 0) {
        if(this.state.isAllChecked){
          this.state.isAllChecked = false;
        }
      }
    }
    return true;
  }

  // 센서장치에서는 팝업사용해서 기능 추가
  handlePopupTable = (data) => {
    const { handlePopup } = this.props;
    handlePopup(data);
  };

  /** 첨부파일 클릭 이벤트 */
  handleAttachmentClick = (articleId, attachment) => {
    const { handleAttachmentClick } = this.props;
    handleAttachmentClick(articleId, attachment);
  };

  render() {
    const { dataProps, fromParentCallbackData, totalCount } = this.props;
    const { checked, isAllChecked } = this.state;

    const fromTableCallbackData = (index, callbackData) => {
      // checkTest
      // this.selectedCheckboxes.add(checkedValue)
      // this.selectedCheckboxes.delete(checkedValue);

      if (callbackData) {
        this.rowsData[index] = callbackData;
      } else {
        delete this.rowsData[index];
      }
      if (fromParentCallbackData) {
        fromParentCallbackData(this.rowsData);
      }
    };

    const renderColgroup = (colgroup) => {
      const columns = [];
      colgroup.cols && colgroup.cols.map((col, index) => {
        columns.push(<col className={col && col.className} key={index}/>);
      });

      return (
        <colgroup>
          {columns}
        </colgroup>
      );
    };

    /**
     * @description 테이블의 헤더 부분을 그린다. table row는 한 줄만 들어간다.
     * @param tableHead: {Object} 테이블 헤더에 들어갈 데이터
     * @returns {<thead> <tr> <th></th> <th></th> ... <th></th> </tr> </thead>}
     * */
    const renderThead = (tableHead) => {
      const tableHeader = tableHead.cols && tableHead.cols.length > 0
        ? tableHead.cols.map(
          (tableColumn, index) => <th
            id={tableColumn.tableColumnId || `${tableConstant.TCOL_ID + index}`}
            key={tableColumn.tableColumnId || `${tableConstant.TCOL_ID + index}`}
            style={tableColumn.style || null}
            scope={'col'}
          >
            {tableColumn.data}
          </th>
        )
        : null;

      return (
        <thead id={tableConstant.THEAD_ID}>
        <tr id={tableConstant.THEAD_ROW_ID}>
          {dataProps.hasCheckBoxInFirstColumn
            ? <th scope='col'>
              <input
                type={'checkbox'}
                ref={this.onRefHeadCheckBox}
                onChange={this.handleAllRowCheck}
                value='all'
                checked={isAllChecked}
              />
            </th>
            : null}
          {tableHeader}
        </tr>
        </thead>
      );
    };

    /**
     * @description 테이블의 바디 부분을 그린다.
     * @param tableBody: {Object} 테이블 바디에 들어갈 데이터
     * @returns {<tbody> <tr></tr> ... </tbody>}
     * */
    const renderTbody = (tableBody) => {
      const emptyMessageColSpan = (dataProps.tableHead.cols.length) + (dataProps.hasCheckBoxInFirstColumn ? 1 : 0);

      const { onChangeCheckbox } = this.props;

      const rows = tableBody.rows && tableBody.rows.length > 0
        ? tableBody.rows.map(
          (rowItem, index) => <TableRowComponent
            rowProps={rowItem}
            index={index}
            hasCheckBoxInFirstColumn={dataProps.hasCheckBoxInFirstColumn}
            fromTableCallbackData={fromTableCallbackData}
            allChecked={isAllChecked}
            key={index}
            id={rowItem.tableRowId || index}
            onChangeCheckbox={onChangeCheckbox ? this.getCheckedList : null}
            allCheckHandle={this.getCheckedList}
            handlePopup={this.handlePopupTable}
            handleAttachmentClick={this.handleAttachmentClick}
          />
        )
        : <tr
          style={dataProps.emptyMessage.rowStyle || null}
          id={'empty_row_id'}
          key={'empty_row_id'}
        >
          <td style={dataProps.emptyMessage.tdStyle || null} colSpan={emptyMessageColSpan}>
            {dataProps.emptyMessage.value || '데이터가 존재하지 않습니다.'}
          </td>
        </tr>;
      return (
        <tbody id={`${tableID}_${tableConstant.TBODY_ID}`}>
        {rows}
        </tbody>
      );
    };

    return (
      <div className={dataProps.divClassName || 'tableBox'}>
        <table id={tableID} className={dataProps.tableClassName || 'list'} style={dataProps.style || null}>
          {dataProps.caption ? (
            <caption style={dataProps.caption.style || null}>{dataProps.caption.value}</caption>) : null}
          {dataProps.colgroup ? renderColgroup(dataProps.colgroup) : null}
          {dataProps.tableHead ? renderThead(dataProps.tableHead) : null}
          {dataProps.tableBody ? renderTbody(dataProps.tableBody) : null}
        </table>
        {totalCount !== 0
          ? <div className='totalCount'>
            <span>{`Total ${totalCount}`}</span>
          </div>
          : null}
      </div>
    );
  }
}


// export {defaultTableStructure, TYPE_TABLE_HEAD, tableConstant};
export default JsmartTable;
/**
 * @description 데이터 예시
 *
 * caption: 테이블 제목
 * tableHead: 테이블 맨 윗줄
 *   cols: header에 들어갈 컬럼들(한 줄만)
 *     col: 하나의 컬럼
 *      tableColumnId: column에 대한 key 값, data: column에 표시될 데이터
 * tableBody
 *   rows: body에 들어갈 테이블 줄들(여러줄)
 *     tableRowId: table row에 대한 key 값
 *     tableData: 한 줄에 들어갈 테이블 데이터들
 *       td: 하나의 테이블 셀
 *          tableDataId: 셀에 대한 key 값
 *          data: 한 셀에 표시될 데이터
 *          type: [head|] th, td 인지 구분하기 위한 타입
 *          onClickEvent: 한 셀에 대한
 *          colSpan, rowSpan, width: 크기 및 칸 관련 옵션
 * */
const tableDummy = {
  caption: '테이블 제목',
  hasCheckBoxInFirstColumn: true,
  option: {
    checkBox: true
  },
  tableHead: {
    cols: [
      {
        tableColumnId: 0,
        data: 'columns 0',
      },
      {
        tableColumnId: 1,
        data: 'columns 1',
      }
    ]
  },
  tableBody: {
    rows: [
      {
        tableRowId: 0,
        tableData: [
          {
            tableDataId: 'data_i_0',
            data: 'data 0',
            type: 'head'
          },
          {
            tableDataId: 'data_i_1',
            data: 'data 1',
            onClickEvent() {
              console.log('data 1');
            }
          }

        ]
      },
      {
        tableRowId: 1,
        height: 30,
        tableData: [
          {
            tableDataId: 'data_i2_0',
            data: 'data 01',
            type: 'head',
          },
          {
            tableDataId: 'data_i2_1',
            data: 'data 11',
            onClickEvent() {
              console.log('data 2');
            },
            rowSpan: '1',
            width: '10px',
            height: 10,
            colSpan: '1',
            type: 'text',
            style: {
              backgroundColor: 'black'
            }
          }
        ]
      },
      {
        tableRowId: 2,
        height: 100,
        width: 500,
        style: {
          backgroundColor: 'yellow'
        },
        tableData: [
          {
            tableDataId: 'data_i3_0',
            data: 'data 02',
            type: 'head'
          },
          {
            tableDataId: 'data_i3_1',
            data: 'data 11',
            onClickEvent() {
              console.log('data 2');
            },
            rowSpan: '2',
            width: '30px',
            type: 'checkbox',
            style: {
              backgroundColor: 'red'
            }
          }
        ]
      }
    ],
  }
};
