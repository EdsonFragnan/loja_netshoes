'use strict';

module.exports = app => {
  /* GET produtos */
  const produto = app.controllers.produtos.produtosCTRL;
  app.get('/', produto);
};
