'use strict';

const express = require('express'),
      consign = require('consign'),
      path = require('path'),
      bodyParser = require('body-parser');

module.exports = () => {
    const app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.set('views', __dirname + './../views');
    app.set('view engine', 'ejs');
    app.set('view options', {layout: false});
    app.use(express.static(path.join(__dirname, './../public')));

    consign()
      .include('controllers')
      .then('routes')
      .then('db')
      .into(app);

    app.use((req, res, next) => {
      res.render('erro_404');
    });

    app.use((error, req, res, next) => {
      res.render('erro_500');
    });

    return app;
};
