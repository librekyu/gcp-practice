import axios from 'axios';
import React, { useEffect, useState, useCallback, useRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';
import { NOTICE_ACTIONS } from '../../../reducers/admin/posts/notice';
import Loading from '../../admin/common/Loading';
import CONST from '../../../common/globalConst';
import { useModalParam } from '../../../common/customHooks';
// const jsmartDialog = require('./jsmartDialog');

/**
 *   CKEditor4 Documentation
 *   https://ckeditor.com/docs/ckeditor4/latest/guide/index.html
 * */

const JsmartEditor = ({ data, editable, onChangeData, readOnly, setEditor, isHide }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  // const [editor, setEditor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editorInst, setEditorInst] = useState({})
  const [imgSrc, setImgSrc] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [fileUploadContents, setFileUploadContents] = useState(null);
  const [setModalParam] = useModalParam({});

  const onChangeFile = (e) => {
    let reader = new FileReader();
    let imgFile = e.target.files[0];
    const fileName = e.target.files[0].name;
    reader.onloadend = (l) => {

      /// 이미지 크기
      // const imgPrev = URL.createObjectURL(reader.result);
      // console.log('imgPrev = ', imgPrev);
      ////
      //imgSrc.setValue(reader.result);

    };
    const formData = new FormData();
    formData.append('file', imgFile);

    setIsLoading(true);
    axios.post('http://13.124.162.209/api/articles/temp/attachments', formData)
      .then(response => {
        console.log("파일전송 성공");
        const tempFileUrl = 'http://13.124.162.209/api/articles/temp/attachments/' + response.data.body.filename;
        imgSrc.setValue(tempFileUrl);
        reader.readAsDataURL(imgFile);
        const testElm = dialog.getContentElement('Upload', 'fileName')
          .getElement();
        testElm.setHtml(`<span>${fileName}</span>`);
      }).catch(err => {
      console.log("파일전송 실패");
      console.log(err);
      //setModalParam(true, CONST.MODAL_TYPE.FAILURE, closeModal, null, null, '서버 전송에 실패했습니다.');
    });
    setIsLoading(false);
    //reader.readAsDataURL(imgFile);
    //axios.post('http://13.124.162.209:80/api/articles/temp/attachments', )
    //reader.readAsDataURL(imgFile);

    //console.log("editorInst instances = ", editorInst.instances);
    // const element = editorInst.dom.element.createFromHtml('<img src={${imgFile}}/>');
    // console.log("editorInst.instances.body = ", editorInst.instances.body);

    //editorInst.instances.body.insertElement(element);
    // var element = setEditor.dom.element.createFromHtml(`<img src={${imgFile}}/>`);
    // setEditor.instances.body.insertElement(element);

  }

  const closeModal = useCallback(() => {
    setModalParam(false);
  }, [])

  return (
    <>

      <input
        style={{ display: 'none' }}
        type='file'
        ref={inputRef}
        onChange={onChangeFile}
        accept='image/jpg,image/png'
        required
      />

      <CKEditor
        id={'JsmartEditor'}
        // onBeforeLoad => editor-element-conflict 버그로 작성. 삭제하지 마세요

        onBeforeLoad={(CKEDITOR) => {
          // https://github.com/ckeditor/ckeditor4/blob/411985373e833a0df76e4ebd0afb45f337612725/plugins/dialog/samples/dialog.html
          // CKEDITOR.on('instanceCreated', function(evt) {
          // });
          CKEDITOR.disableAutoInline = true;

          CKEDITOR.on('instanceReady', function (evt) {
            // console.log('====instanceReady====');
            if (readOnly) {
              const editorId = evt.editor.id;
              const editorName = evt.editor.name;
              const whole = document.getElementById(`cke_${editorName}`);
              const top = document.getElementById(`${editorId}_top`);
              const bottom = document.getElementById(`${editorId}_bottom`);
              whole.style.border = '0px';
              top.style.display = 'none';
              bottom.style.display = 'none';
            }
            isHide ? isHide(false) : null;

          });

          CKEDITOR.on('blur', function(evt){
            console.log("CKEDITOR blur");
            console.log(evt);
            console.log(evt.sender.name);
            console.log('blur');
          });

          setEditorInst(CKEDITOR);
          setEditor ? setEditor(CKEDITOR.instances) : null;

          CKEDITOR.on('dialogDefinition', function (dialogDefEvt) {

            var dialog = dialogDefEvt.data.definition.dialog;
            const dialogName = dialogDefEvt.data.name;
            const dialogDefinition = dialogDefEvt.data.definition;

            if (dialogName === 'image2') {
              dialog.on('show', function (obj) {
                // this.selectPage('Upload'); // 업로드텝으로 시작
              });
              dialog.on('cancel', function (obj) {
                //console.log('dialog close');
              });

              dialog.on('ok', function(obj) {
                // console.log('dialog ok');
                // console.log(obj);
                // const temp = dialog.getContentElement('info', 'src');
                // console.log("temp = ", temp);

              });

              dialog.on('hide', function (obj) {
                const fileNameElements = dialog.getContentElement('Upload', 'fileName')
                  .getElement();
                fileNameElements.setHtml('<span></span>');
              });


              const uploadContents = dialogDefinition.getContents('Upload');

              // 파일 선택, 파일전송 버튼 제거
              uploadContents.remove('uploadButton');
              uploadContents.remove('upload');
              uploadContents.remove('buttonId');
              uploadContents.remove('fileName');

              console.log("dialogDefinition = ", dialogDefinition);
              console.log("uploadContents = ", uploadContents);

              if(uploadContents.length > 0) {
                console.log("뭐자");
              } else {
                uploadContents.add({
                  type: 'button',
                  id: 'buttonId',
                  label: '파일선택',
                  title: 'file select',
                  onClick() {
                    setImgSrc(dialog.getContentElement('info', 'src'));
                    setFileUploadContents(uploadContents);
                    setDialog(dialog);
                    inputRef.current.click();
                  }
                });
                //
                uploadContents.add({
                  type: 'html',
                  id: 'fileName',
                  html: '<span></span>'
                });
              }
            }
          });
        }}

        data={data}
        onChange={onChangeData}
        readOnly={readOnly}

        // config url
        // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html
        config={{
          height: 600, // 초기 높이 값 default 200
          resize_maxHeight: 400, // 리사이즈 시에 최대 높이 값 default 3000
          width: '100%', // 90%도 사용 가능

          removePlugins: 'image:advanced;link:advanced',
          easyimage_toolbar: ['EasyImageAlignLeft', 'EasyImageAlignCenter', 'EasyImageAlignRight'],
          extraPlugins: ['image2'],
          // image2_alignClasses: ['align-left', 'align-center', 'align-right'],
          filebrowserUploadUrl: `${CONST.API_URL}/api/articles/temp/attachments`,
          filebrowserUploadMethod: 'form',
          image_removeLinkByEmptyURL: true,
        }}
      />
      <Loading isLoading={isLoading} />
    </>
  );
};

JsmartEditor.propTypes = {
  data: PropTypes.string,
  onChangeData: PropTypes.func
};

export default JsmartEditor;
