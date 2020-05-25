/**
 * 기간선택 검포넌트
 *  selectStartDate={} 시작일
 *  selectEndDate={} 종료일
 *  onChangeStartDate={} 시작일 change event
 *  onChangeEndDate={} 종료일 change event
 *  dateFormat='' return 형식 (예. YYYY-MM-DD) (default: 'yyyy-MM-dd', 형식 바꿀때만 값 넣어주면 됨.)
 *    => dateFormat 은 월별일 때만 넣어 놓음.
 * */
import React, { useEffect, useState, useCallback } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import moment from 'moment';
import { JsmartDatePickerStyle } from './jsmartDatePickerStyle';
import CONST from '../../../common/globalConst';
import Util from '../../../common/util';
import { useModalParam } from '../../../common/customHooks';

registerLocale('ko', ko);
/**
 * @Param
 * @selectStartDate 선택된 시작날짜 Date
 * @selectEndDate 선택된 끝날짜 Date
 * @isSelectDate switch case를 위한 값  string
 *  atmosphereData
 *  cctvData
 * @isSelectDay 일간 선택값 boolean
 * @isSelectMonth 월간 선택값 boolean
 * @maxSelectDate 선택가능 날자 범위 number
 * @isHour datetimeType 시간 선택시 변경
 * @isMonthType 월간 선택시 달력 표기방식 변경
 * */

const jsmartDateRangePicker = ({
                                 selectStartDate,
                                 selectEndDate,
                                 onChangeStartDate,
                                 onChangeEndDate,
                                 dateFormat = 'yyyy-MM-dd',
                                 isSelectDate,
                                 isSelectDay,
                                 isSelectMonth,
                                 maxSelectDate,
                                 isHour,
                                 isMonth,
                               }) => {
  const [setModalParam] = useModalParam({});

  useEffect(() => {
    onChangeStartDate(selectStartDate);
    onChangeEndDate(selectEndDate);
  }, []);

  /** 시간 일간, 월간이 변경될 경우 endDate 수정 */
  useEffect(() => {
    if (isMonth) {
      onChangeStartDate(Util.getStartDayOfMonth(selectStartDate));
      onChangeEndDate(Util.getEndDayOfMonth(selectEndDate));
    } else {
      // onChangeStartDate(Util.getStartDayOfMonth(selectStartDate));
      if (moment(selectEndDate) > moment()) {
        onChangeEndDate(moment()
          .format('YYYY-MM-DD'));
      }
    }
  }, [isMonth]);

  /** 모달 취소 버튼 이벤트  */
  const closeModal = useCallback(() => {
    setModalParam(false);
  }, []);

  /** 시작일 onChange */
  const handleStartDateChange = useCallback((date) => {
    const endDate = new Date(selectEndDate);
    if (date > new Date()) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.CANNOT_PICK_MORE_THAN_TODAY);
      return;
    } else if (isSelectDate === 'atmosphereData' && Util.dateStringFormat(date) <= Util.getDayAgoDate(maxSelectDate, endDate)) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.CANNOT_PICK_MORE_THAN_3DAY);
      return;
    } else if (isSelectDate === 'cctvData' && isSelectDay && Util.dateStringFormat(date) <= Util.getDayAgoDate(maxSelectDate, endDate)) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.CANNOT_PICK_MORE_THAN_60DAY);
      return;
    } else if (isSelectDate === 'mypageMeasure' && Util.dateStringFormat(date) <= Util.getDayAgoDate(maxSelectDate, endDate)) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.CANNOT_PICK_MORE_THAN_7DAY);
      return;
    } else if (date > endDate) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.START_DATE_MORE_THAN_END_DATE);
      return;
    }

    onChangeStartDate(moment(date)
      .format('YYYY-MM-DD')); // by Day
  }, [selectEndDate, isMonth]);

  /** 종료일 onChange */
  const handleEndDateChange = useCallback((date) => {
    const startDate = new Date(selectStartDate);
    if (date > new Date()) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.CANNOT_PICK_MORE_THAN_TODAY);
      return;
    } else if (isSelectDate === 'atmosphereData' && Util.dateStringFormat(date) >= Util.getDayAfterDate(maxSelectDate, startDate)) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.CANNOT_PICK_MORE_THAN_3DAY);
      return;
    } else if (isSelectDate === 'cctvData' && isSelectDay && Util.dateStringFormat(date) >= Util.getDayAfterDate(maxSelectDate, startDate)) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.CANNOT_PICK_MORE_THAN_60DAY);
      return;
    } else if (isSelectDate === 'mypageMeasure' && Util.dateStringFormat(date) >= Util.getDayAfterDate(maxSelectDate, startDate)) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.CANNOT_PICK_MORE_THAN_7DAY);
      return;
    } else if (date < startDate) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.END_DATE_LESS_THAN_START_DATE);
      return;
    }

    if (isMonth) {
      const lastDate = moment(date)
        .add(1, 'month')
        .add(-1, 'day')
        .format('YYYY-MM-DD');
      onChangeEndDate(lastDate);
    } else {
      onChangeEndDate(moment(date)
        .format('YYYY-MM-DD'));
    }
  }, [selectStartDate, isMonth]);

  /** isHour === true 일 경우, start, end date 동시변경 이벤트 */
  const handleStartAndEndDateChange = useCallback((date) => {
    if (date > new Date()) {
      setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, CONST.COMMON_WORDS.WARNING, CONST.DATE_PICKER_MESSAGE.CANNOT_PICK_MORE_THAN_TODAY);
      return;
    }

    onChangeStartDate(moment(date)
      .format('YYYY-MM-DD'));
    onChangeEndDate(moment(date)
      .format('YYYY-MM-DD'));
  }, [selectStartDate, selectEndDate]);

  /** datetimeType: 일간 월간에서 시간으로 변경 시 */
  useEffect(() => {
    if (isHour) {
      onChangeStartDate(selectStartDate);
      onChangeEndDate(selectStartDate);
    }
  }, [isHour]);

  return (
    <>
      <JsmartDatePickerStyle>
        기간선택&nbsp;
        <DatePicker
          locale='ko'
          className='useDatepicker'
          dateFormat={dateFormat}
          selected={new Date(selectStartDate)}
          onChange={isHour ? handleStartAndEndDateChange : handleStartDateChange}
          showMonthDropdown
          showYearDropdown
          showMonthYearPicker={isMonth || false}
        />&nbsp;~&nbsp;
        <DatePicker
          locale='ko'
          className='useDatepicker'
          dateFormat={dateFormat}
          selected={new Date(selectEndDate)}
          onChange={isHour ? handleStartAndEndDateChange : handleEndDateChange}
          showMonthDropdown
          showYearDropdown
          showMonthYearPicker={isMonth || false}
        />
      </JsmartDatePickerStyle>
    </>
  );
};

export default jsmartDateRangePicker;
