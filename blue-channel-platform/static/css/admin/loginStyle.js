import React from 'react';
import Styled, { css } from 'styled-components';


export const StyledInput = Styled.input`
      
  ${props => props.type === 'password' || props.type === 'text'
  ? `
     padding:0 12px;
      width:100%;
      height:40px;
      border-radius:6px;
      box-sizing:border-box;
      `
  : `
       width:100%;
        height:40px;
        font-size:15px;
        font-weight:800;
        color:#fff;
        background:#227c39;
        border-radius:6px;
        border:0px none;
        box-sizing:border-box;
        box-shadow:0 3px 3px rgba(0,0,0,0.1);
       `
}
`;

export const StyledLogin = Styled.div`
  margin:80px auto;
  padding:50px 0;
  width:410px;
  text-align:center;
  background:#fff;
  border-radius:10px;
  box-shadow:0 5px 5px rgba(0,0,0,0.1);
  
  & .loginLogo{margin-bottom:45px;}
  
  & ul.loginForm{
  
    display:block;
    margin:0 auto 40px;
    width:270px;
    
    & li {
      margin-bottom:10px;
      
      & ${StyledInput}
      
      & .btn_login {
        width:100%;
        height:40px;
        font-size:15px;
        font-weight:800;
        color:#fff;
        background:#227c39;
        border-radius:6px;
        border:0px none;
        box-sizing:border-box;
        box-shadow:0 3px 3px rgba(0,0,0,0.1);
      }
    }
  }
  
  & .loginMent{display:block;font-size:13px;line-height:150%;}
  
  & span.red {
      color:#ed1c24;
    }
  
`;

