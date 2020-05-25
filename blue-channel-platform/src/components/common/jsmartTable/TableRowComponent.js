import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TableDataComponent from './TableDataComponent';
//import {tableConstant} from './index';

class TableRowComponent extends Component {
  static propTypes = {
    dataProps: PropTypes.instanceOf(Object),
    // index: PropTypes.String
  };

  static defaultProps = {
    rowProps: {},
    index: '0',
    hasCheckBoxInFirstColumn: false,
    fromTableCallbackData: {},
    allChecked: false,
    emptyMessage: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      allCheck: false
    };
  }

  tdsData = {};

  thisRowId;

  rowHeaderInput;
  onRefHeaderInput = (c) => {
    this.rowHeaderInput = c;
  };

  handleHeaderCheckboxChange = (e) => {

    this.setState({ checked: e.target.checked });
    const { fromTableCallbackData } = this.props;
    if (fromTableCallbackData) {
      fromTableCallbackData(this.thisRowId, e.target.checked ? this.tdsData : undefined);
    }
  };

  /** tbody checkbox handle */
  handleCheckbox = (e) => {
    const { onChangeCheckbox, fromTableCallbackData } = this.props;

    this.setState({ checked: e.target.checked });

    if (onChangeCheckbox) {
      onChangeCheckbox(e.target.value, e.target.checked);
    }
    if (fromTableCallbackData) {
      fromTableCallbackData(this.thisRowId, e.target.checked ? this.tdsData : undefined);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { rowProps } = this.props;
    if (prevProps.rowProps.tableRowId !== rowProps.tableRowId) {
      this.setState({ checked: false });
    }
  }

  render() {
    const { rowProps, index, hasCheckBoxInFirstColumn, allChecked, allCheckHandle, fromTableCallbackData } = this.props;
    const { checked, allCheck } = this.state;

    const rowID = rowProps.tableRowId || ('tableRow_' + index);
    this.thisRowId = rowID;

    if (allChecked !== allCheck) {
      this.setState({
        allCheck: allChecked,
        checked: allChecked
      });
      allCheckHandle(rowID, allChecked);
      if (fromTableCallbackData) {
        fromTableCallbackData(this.thisRowId, allChecked ? this.tdsData : undefined);
      }
    }

    const getCallbackData = (id, data) => {
      this.tdsData[id] = data;
    };

    // 센서장치에서는 팝업사용해서 기능 추가
    const handlePopupRow = (data) => {
      const { handlePopup } = this.props;
      handlePopup(data);
    };

    /** 첨부파일 클릭 이벤트 */
    const handleAttachmentClick = (articleId, attachment) => {
      const { handleAttachmentClick } = this.props;
      handleAttachmentClick(articleId, attachment);
    };

    const tds =
      rowProps.tableData && rowProps.tableData.length > 0 ?
        rowProps.tableData.map(
          (td, index) =>
            <TableDataComponent
              key={index}
              dataProps={td}
              index={index}
              hasCheckBoxInFirstColumn={hasCheckBoxInFirstColumn}
              fromRowCallbackData={getCallbackData}
              handlePopup={handlePopupRow}
              handleAttachmentClick={handleAttachmentClick}
            />
        )
        :
        null;


    return (
      <Fragment>
        <tr
          id={rowID}
          key={rowID}
          style={rowProps.style || null}
        >
          {hasCheckBoxInFirstColumn ?
            <td>
              <input type='checkbox' ref={this.rowHeaderInput} value={rowID} checked={checked}
                     onChange={this.handleCheckbox} />
            </td>
            :
            null
          }
          {tds}
        </tr>
      </Fragment>
    );
  }
}

export default TableRowComponent;
