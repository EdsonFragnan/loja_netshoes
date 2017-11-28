'use strict';

const express = require('express'),
      consign = require('consign'),
      bodyParser = require('body-parser');

module.exports = () => {
    const app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static('public'));

    consign()
      .include('routes')
      .then('data')
      .into(app);

    app.use((req, res, next) => {
      res.status(404).json({mensagem: 'Rota não encontrada'});
    });

    app.use((error, req, res, next) => {
      res.status(500).json({mensagem: 'Erro interno no servidor.'});
    });

    return app;
};
