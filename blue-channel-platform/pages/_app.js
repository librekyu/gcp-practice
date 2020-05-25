import { ADMIN_CONST, USER_CONST } from '../src/common/globalConst';

import React from 'react';
import Util from '../src/common/util';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Helmet from 'react-helmet';
import UserJsmartLayout from '../src/components/user/common/JsmartLayout';
import rootReducer from '../src/reducers';
import rootSaga from '../src/sagas';
import GlobalStyle from '../static/css/globalStyle';
import GLOBAL_CONST from '../src/common/globalConstant';

const _ = require('underscore');

const Jsmart = ({ Component, store, pageProps, routerInfo }) => {

  /** router query decoding start */
  const decodeRouterObj = {
    ...routerInfo,
    query: Object.entries(routerInfo.query).length > 0 && !routerInfo.query.init && Util.getRouterDecodedQuery(routerInfo.query) || {}
  };
  const includeRouterInfoPageProps = {
    ...pageProps,
    routerInfo: decodeRouterObj
  };
  /** router query decoding end */

  return (
    <Provider store={store}>
      <Helmet
        title={GLOBAL_CONST.APP_NAME_NORMAL}
        htmlAttributes={{ lang: 'ko' }}
        meta={[{
          charSet: 'UTF-8',
        }, {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover'
          // content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }, {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
        }, {
          name: 'description',
          content: GLOBAL_CONST.APP_NAME_NORMAL,
        }, {
          name: 'og:title',
          content: 'Jsmart'
        }, {
          name: 'og:description',
          content: GLOBAL_CONST.APP_NAME_NORMAL
        }, {
          property: 'og:type',
          content: 'website',
        }, {
          'http-equiv': 'content-Type',
          content: 'text/html;charset=utf-8',
        }]}
        // link={[{
        //   rel: 'shortcut icon',
        //   href: '/favicon.ico',
        // }]}
      >
      </Helmet>
      <GlobalStyle />
      <UserJsmartLayout pageInfo={routerInfo.asPath}>
        <Component {...includeRouterInfoPageProps} />
      </UserJsmartLayout>
    </Provider>
  );
};

Jsmart.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired
};

Jsmart.getInitialProps = async (context) => {
  const { ctx, Component } = context;

  let pageProps = {};
  const routerInfo = context.router;
  // const state = ctx.store.getState();
  // const cookie = ctx.isServer ? ctx.req.headers.cookie : '';

  // 각 페이지 별로 컴포넌트들이 getInitialProps를 선언하면 ctx인 컨텍스트를 컴포넌트들이 받게된다.
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }

  return {
    pageProps,
    routerInfo,
  };
};

// redux, redux-saga 설정
const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  // const persistRootReducer = persistReducer({
  //   key: 'root',
  //   storage
  // }, rootReducer)

  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f,
    );
  // const store = createStore(persistRootReducer, initialState, enhancer);
  const store = createStore(rootReducer, initialState, enhancer);
  // store.__PERSISTOR = persistStore(store, enhancer);
  // store.sagaTask = sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(rootSaga);

  return store;
};

export default withRedux(configureStore)(Jsmart);
