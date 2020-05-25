import React from 'react';
import Styled from 'styled-components';

export const StyledTable = Styled.div`
  
  .scrolled {overflow-y:auto;border:1px #e1e1e1 solid;border-top:1px #e1e1e1 solid;}
  .scrolledx {overflow-x:auto;border:1px #e1e1e1 solid;border-top:1px #e1e1e1 solid;}
  .scrolled { & table {margin:0 -1px;}}

  
  width:100%;
  font-size:13px;
  border-top:1px #e1e1e1 solid;
  border-left:1px #e1e1e1 solid;
  
  & table {
    width:auto;
    table-layout:auto;
    
    & th {
        border-bottom:1px #e1e1e1 solid;
        border-right:1px #e1e1e1 solid;
        box-sizing:border-box;
        background:#ececec;
        font-weight:bold;
      
        .noBg{
          background: none;
        }
    }
    
    & td {
        border-bottom:1px #e1e1e1 solid;
        border-right:1px #e1e1e1 solid;
        box-sizing:border-box;
      
        & select{
          padding-left:5px;
        }
    }
    
  .list{
  
    text-align:center;
    border-left:0px none;
    
    & td {
      padding:10px;
      height:48px;
      border-right:0px none;
      
      .center {text-align:center;}
      .left {text-align:left;}
      .right {text-align:right;}
    }
    
    & th {
      .center {
      }
      .left {
      }
      .right { 
      }
    }
    
    .bordered{
      border-left:1px #e1e1e1 solid;
      & th {border-right:1px #e1e1e1 solid;}
      & td {border-right:1px #e1e1e1 solid;}
    }
  }
  
  .form{
    & th{padding:10px;height:30px;text-align:center;}
    & td {padding:10px;height:30px;text-align:left; & *{max-width:100%;}}
  }
  
  .view {
    & td {
      padding:10px 20px;line-height:20px;
      & * {max-width:100%;}
    }
  }
`;
