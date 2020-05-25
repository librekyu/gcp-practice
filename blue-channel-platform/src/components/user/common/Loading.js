import React from 'react';
import { Overlay } from '../../../../static/css/globalStyle';

const Loading = (props) => {
  const { isLoading, label } = props;

  return (
    <>
      <Overlay show={isLoading}>
        <div id="loading">
          <div/>
        </div>
        <div style={{
          fontSize: '30px',
          color: 'white',
          zIndex: 1002,
          position: 'absolute',
          top: '60%',
          margin: '0% 30%',
        }}>{label}</div>
      </Overlay>
    </>
  );
};

export default Loading;
