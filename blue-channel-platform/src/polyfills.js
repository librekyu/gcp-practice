import '@babel/polyfill';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import includes from 'core-js/library/fn/string/virtual/includes';
import repeat from 'core-js/library/fn/string/virtual/repeat';
import assign from 'core-js/library/fn/object/assign';

String.prototype.includes = includes;
String.prototype.repeat = repeat;
Object.assign = assign;
