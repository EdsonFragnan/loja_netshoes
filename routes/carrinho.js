'use strict';

module.exports = app => {
  /* GET produtos */
  app.get('/carrinho', (req, res, next) => {
    res.json({title: 'Carrinho de produtos.'});
  });
};
