import React from 'react';
import App from './src';
import dva from 'dva/mobile';
import models from './src/models';

const app = dva();
models.map(m=>app.model(m));
app.router(() => <App />);

export default app.start();