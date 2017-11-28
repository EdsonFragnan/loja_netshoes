'use strict';

const fs = require('fs');
const path = require('path');
const produtos = require('./../db/products.json');

/* GET - Obtem todos os produtos */
module.exports.produtosCTRL = (req, res) => {

  const trataValores = (valor) => {
    const valMoeda = valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
    const valorProduto = valMoeda.replace('.', ',');
    return valorProduto;
  };

  const trataParcela = (parcela) => {
    if (typeof parcela === 'string') {
      const valorProduto = parcela.replace(',', '.');
      const valorSemCif = valorProduto.replace('R$', '');
      const valParcela = parseFloat(valorSemCif)/3;
      return trataValores(valParcela);
    } else {
      const valParcela = parseFloat(parcela)/3;
      return trataValores(valParcela);
    }
  };

  if (produtos === undefined) {
    res.status(404).send('Arquivo não encontrado');
  } else {
    const mercadorias = produtos.products;
    for (const i in mercadorias) {
      const valor = mercadorias[i].price;
      mercadorias[i].price = trataValores(valor);
      mercadorias[i].parcela = trataParcela(valor);
    }
    res.render('index', {vitrine: mercadorias});
  }
};
