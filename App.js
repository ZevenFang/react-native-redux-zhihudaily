import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import App from './src';
import dva from 'dva/mobile';
import models from './src/models';
import createLoading from './src/utils/createLoading';

moment.locale('zh-cn');
const app = dva();
app.use(createLoading());
models.map(m=>app.model(m));
app.router(() => <App />);

export default app.start();