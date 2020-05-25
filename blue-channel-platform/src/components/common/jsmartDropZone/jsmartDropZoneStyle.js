import React from 'react';
import Styled from 'styled-components';

export const JsmartDropZoneStyle = Styled.div`
  ul {
    width: 100%;
    li{
      font-weight: bold;
      line-height: 20px;
    }
    
    li:nth-child(1) {
    width: '60%';
        background: 'yellow';
        borderRight: '1px #e1e1e1 solid';
        display: 'inline-block';
    }
  }
 
`;
