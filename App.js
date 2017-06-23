import React from 'react';
import App from './src';
import dva from 'dva/mobile';
import models from './src/models';
import createLoading from './src/utils/createLoading';

const app = dva();
app.use(createLoading());
models.map(m=>app.model(m));
app.router(() => <App />);

export default app.start();