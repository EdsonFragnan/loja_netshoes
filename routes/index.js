'use strict';

module.exports = app => {
  /* GET produtos */
  const produto = app.controllers.produtos.produtosCTRL;
  app.get('/', produto);

  /* POST venda */
  app.post('/venda', (req, res) => {
		res.redirect(302, '/carrinho');
	});

  /* GET Tela de sucesso */
  app.get('/carrinho', (req, res) => {
    res.render('sucesso.ejs');
	});
};
