import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ADMIN_CONST } from '../../../common/globalConst';
import Util from '../../../common/util';

//import {TYPE_TABLE_HEAD, tableConstant} from "./index";

class TableDataComponent extends Component {
  static propTypes = {
    dataProps: PropTypes.instanceOf(Object),
    // index: PropTypes.String
  };

  static defaultProps = {
    dataProps: {},
    index: '0',
    hasCheckBoxInFirstColumn: false,
    fromRowCallbackData: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      labelContent: ''
    };
  }

  handleChange = (e) => {

    const { fromRowCallbackData, dataProps } = this.props;

    if (dataProps.option && dataProps.option.type === 'text') {
      this.setState({ labelContent: e.target.value });
      fromRowCallbackData(this.thisID, e.target.value);
    } else if (dataProps.option && dataProps.option.type === 'checkbox') {
      this.setState({ checked: e.target.checked });
      fromRowCallbackData(this.thisID, e.target.checked);
    }

  };

  checkboxInput;
  onRefCheckInput = (c) => {
    this.checkboxInput = c;
  };

  textInput;
  onRefTextInput = (c) => {
    this.textInput = c;
  };

  thisID;

  // 센서장치에서는 팝업사용해서 기능 추가
  handlePopup = () => {
    const { handlePopup, dataProps } = this.props;
    handlePopup(dataProps.data.id);
  };

  /** 첨부파일 클릭 이벤트 */
  handleAttachmentClick = (articleId, attachment) => {
    const { handleAttachmentClick } = this.props;
    handleAttachmentClick(articleId, attachment);
  }

  renderTd() {
    const { dataProps, fromRowCallbackData } = this.props;
    const { checked: selected, labelContent: contents } = this.state;
    let inTd;
    const type = dataProps.option ? dataProps.option.type : '';

    switch (type) {
      case 'checkbox':
        inTd = <input
          type={type}
          checked={selected}
          onChange={this.handleChange}
          ref={this.onRefCheckInput}
        />;
        break;

      case 'text':
        inTd = <input
          type={type}
          onChange={this.handleChange}
          ref={this.onRefTextInput}
          value={contents}
        />;
        break;
      case 'circle':
        inTd = <span className={type} style={{ backgroundColor: dataProps.option.color }} />;
        break;
      case 'button':
        inTd = <button
          onClick={(dataProps.option && dataProps.option.onClickEvent) || null}
          className={(dataProps.option && dataProps.option.className) || null}>{dataProps.data.value}</button>;
        break;
      case 'img': {
        // const imgSrcPathArray = dataProps.option && dataProps.option.src.split('/') || [];
        // const alt = imgSrcPathArray[imgSrcPathArray.length > 0 && imgSrcPathArray.length - 1];
        inTd = <img
          src={`${dataProps.option && dataProps.option.src}`}
          // src={`http://13.124.162.209:8080/admin/api/popup/1/attachements/${dataProps.option && dataProps.option.src}`}
          // alt={alt}
          onError={(e) => e.target.src = `${ADMIN_CONST.BASE_IMAGE_PATH}/common/icon_img.png`}
          className={(dataProps.option && dataProps.option.className) || null} />;
        break;
      }
      case 'popup':
        inTd = <button
          onClick={this.handlePopup}
          className={(dataProps.option && dataProps.option.className) || null}>{dataProps.data.value}</button>;
        break;
        // 파일목록 표시
      case 'attachment':
        inTd = dataProps.data.value.map((attachment, index) => {
          let fileName = `${attachment.attachedFileName}.${attachment.attachedFileExtension}`;
          if(fileName.length > 10 ) {
            fileName = fileName.substring(0, 10) + '...';
          }
          const key = Util.makeUID(attachment.bbsAttachedFileId + index);

          return (
            <label key={key || index}>
              <a key={key || index} onClick={() => this.handleAttachmentClick(dataProps.data.articleId, attachment)}>
                <span className={`icon_small_file ${attachment.attachedFileExtension}`} />
                {fileName}
              </a>
              {
                dataProps.data.value.length-1 > index ? <br/> : null
              }
            </label>
          );
        });
        break;
      default:
        fromRowCallbackData(this.thisID, dataProps.data.value);
        inTd = dataProps.data.value;
    }

    return inTd;
  }

  render() {
    const { dataProps, index, hasCheckBoxInFirstColumn } = this.props;

    const tdID = dataProps && dataProps.data && dataProps.data.tableDataId || 'tableData_' + index;
    this.thisID = tdID;
    const option = dataProps && dataProps.option;

    const tableData = this.renderTd();

    return (
      (dataProps.type)
      && !hasCheckBoxInFirstColumn
      && (dataProps.type) === 'head'
        ?
        <th id={tdID}
            key={tdID}
            width={(option && option.width) || null}
            height={(option && option.height) || null}
            rowSpan={(option && option.rowSpan) || null}
            colSpan={(option && option.colSpan) || null}
            style={(option && option.style) || null}
            className={(option && option.className) || null}
        >
          {dataProps.data.value}
        </th>
        :
        (option && option.type === 'button' || option && option.type === 'popup' ?
            <td id={tdID}
                key={tdID}
            >{tableData}</td>
            : (option && option.type === 'attachment') ?
            <td id={tdID}
                key={tdID}>
              {tableData}
            </td>
            : <td id={tdID}
                  key={tdID}
                  width={(option && option.width) || null}
                  height={(option && option.height) || null}
                  rowSpan={(option && option.rowSpan) || null}
                  colSpan={(option && option.colSpan) || null}
                  style={(option && option.style) || null}
                  onClick={(option && option.onClickEvent) || null}
                  className={(option && option.className) || null}
            >
              {tableData}
            </td>
        )
    );
  }
}

export default TableDataComponent;
