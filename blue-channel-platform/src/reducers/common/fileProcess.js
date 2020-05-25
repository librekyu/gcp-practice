/**
 * 파일 업로드 / 다운로드 공통
 * */

import produce from 'immer';
import CONST from '../../common/globalConst';

export const initialState = {
  excelDownloadState: CONST.API_STATE_CODE.REQUEST // 엑셀 다운로드 성공
};

export const FILE_PROCESS_ACTIONS = {
  EXCEL_DOWNLOAD_REQUEST: 'EXCEL_DOWNLOAD_REQUEST',
  EXCEL_DOWNLOAD_SUCCESS: 'EXCEL_DOWNLOAD_SUCCESS',
  EXCEL_DOWNLOAD_FAILURE: 'EXCEL_DOWNLOAD_FAILURE',
  EXCEL_DOWNLOAD_STATE_INIT: 'EXCEL_DOWNLOAD_STATE_INIT',
};

const fileProcessReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case FILE_PROCESS_ACTIONS.EXCEL_DOWNLOAD_REQUEST: {
      draft.excelDownloadState = CONST.API_STATE_CODE.REQUEST;
      break;
    }
    case FILE_PROCESS_ACTIONS.EXCEL_DOWNLOAD_SUCCESS: {
      draft.excelDownloadState = CONST.API_STATE_CODE.SUCCESS;
      break;
    }
    case FILE_PROCESS_ACTIONS.EXCEL_DOWNLOAD_FAILURE: {
      draft.excelDownloadState = CONST.API_STATE_CODE.FAIL;
      break;
    }
    case FILE_PROCESS_ACTIONS.EXCEL_DOWNLOAD_STATE_INIT: {
      draft.excelDownloadState = CONST.API_STATE_CODE.REQUEST;
      break;
    }
    default: {
      break;
    }
  }
});

export default fileProcessReducer;
