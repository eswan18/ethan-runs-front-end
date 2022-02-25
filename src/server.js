const path = require('path');
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import app from './App';

const PUBLIC_PATH = 'public';
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(PUBLIC_PATH));

app.get('*', (req, res) => {
  res.render('layout', {
      content: ReactDOMServer.renderToString(<App />)
  });
});

server = app.listen(PORT, () => {
  console.log('Server is up!');
});
