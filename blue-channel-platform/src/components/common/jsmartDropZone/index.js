import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { JsmartDropZoneStyle } from './jsmartDropZoneStyle';
import Util from '../../../common/util';

/**
 * props
 *    @fileList Array 파일목록
 *    @addAttachFileList function  파일추가 event handle
 *    @removeAttachFileList function  파일삭제 event handle
 * */
const JsmartDropZone = (props) => {
  /** 파일 추가 handle */
  const onDrop = acceptedFiles => {
    // Do something with the files
    props.addAttachFileList(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  /** 파일 삭제 handle */
  const deleteAcceptedFile = (e) => {
    e.stopPropagation();
    props.removeAttachFileList(e.target.value);
  };

  return (
    <>
      <JsmartDropZoneStyle>
        <ul className="header" style={{ width: '100%' }}>
          <li style={{
            width: '60%',
            background: '#ececec',
            borderRight: '1px #e1e1e1 solid',
            display: 'inline-block'
          }}>파일이름
          </li>
          <li style={{
            width: '27%',
            background: '#ececec',
            borderRight: '1px #e1e1e1 solid',
            display: 'inline-block'
          }}>파일크기
          </li>
          <li style={{
            width: '12.6%',
            background: '#ececec',
            borderRight: '1px #e1e1e1 solid',
            display: 'inline-block'
          }}>삭제
          </li>
        </ul>

        <div {...getRootProps({ className: 'dropzone' })} style={{
          overflowY: 'scroll',
          height: '150px',
          border: '1.5px solid #e1e1e1',
          width: '99.6%'
        }} className={'fileContent'}>
          <input {...getInputProps()} />
          {
            isDragActive || props.fileList.length === 0
              ? <p style={{
                marginTop: '7%',
                textAlign: 'center'
              }}>파일을 이 곳으로 끌어오세요</p>
              : <>
                {
                  props.fileList && props.fileList.map((file, index) => (
                    <li key={file.path} style={{ lineHeight: '37px' }}>
                      <div style={{
                        width: '60%',
                        float: 'left'
                      }}>{file.path}</div>
                      <div style={{
                        width: '27%',
                        float: 'left'
                      }}>{Util.fileSizeCalculation(file.size)}</div>
                      <div style={{
                        width: '12.6%',
                        float: 'left'
                      }}>
                        <button className={'btn_inline w70'} value={index} onClick={deleteAcceptedFile}>삭제</button>
                      </div>
                    </li>
                  ))
                }
              </>
          }
        </div>
      </JsmartDropZoneStyle>
    </>
  );
};

export default JsmartDropZone;
