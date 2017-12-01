const storage = [];
const AddCarrinho = (produto) => {
  const objetoProduto = {
    'id': produto.id,
    'sku': produto.sku,
    'title': produto.title,
    'description': produto.description,
    'availableSizes': produto.availableSizes,
    'style': produto.style,
    'price': produto.price,
    'installments': produto.installments,
    'currencyId': produto.currencyId,
    'currencyFormat': produto.currencyFormat,
    'isFreeShipping': produto.isFreeShipping
  };
  const produtos = formataProduto(objetoProduto);
  const divMsgSacola = document.getElementById('mensagemSacola');
  const div = document.getElementById('produtosSacola');
  storage.push(objetoProduto);
  divMsgSacola.innerHTML = '';
  const divContador = document.getElementById('contador');
  const cont = 1 + parseInt(sessionStorage.getItem('contador'));
  sessionStorage.setItem('storage', JSON.stringify(storage));
  sessionStorage.setItem('contador', cont);
  divContador.innerHTML = cont;
  div.innerHTML+= produtos[0];
};

const SessionCarrinho = () => {
  const divContador = document.getElementById('contador');
  const divMsgSacola = document.getElementById('mensagemSacola');
  if (!sessionStorage.getItem('contador') || sessionStorage.getItem('contador') === '0') {
    sessionStorage.setItem('contador', 0);
    divContador.innerHTML = 0;
    divMsgSacola.innerHTML = 'Carrinho vazio.';
  } else {
    const parseSacola = JSON.parse(sessionStorage.getItem('storage'));
    divContador.innerHTML = sessionStorage.getItem('contador');
    formataSacola(parseSacola);
  }
};

const RemoveProduto = (idProduto) => {
  const divContador = document.getElementById('contador');
  const divMsgSacola = document.getElementById('mensagemSacola');
  const sacola = document.getElementById('produtosSacola');
  const div = document.getElementById(idProduto);
  const cont = parseInt(sessionStorage.getItem('contador')) - 1;
  const parseSacola = JSON.parse(sessionStorage.getItem('storage'));
  for (const i in parseSacola) {
    if (idProduto === parseSacola[i].sku) {
      div.parentElement.removeChild(div);
      parseSacola.splice(i, 1);
      sessionStorage.setItem('storage', JSON.stringify(parseSacola));
    }
  }
  sessionStorage.setItem('contador', cont);
  if (parseInt(sessionStorage.getItem('contador')) === 0) {
    divMsgSacola.innerHTML = 'Carrinho vazio.';
    divContador.innerHTML = sessionStorage.getItem('contador');
    sacola.innerHTML = '';
  } else {
    divContador.innerHTML = sessionStorage.getItem('contador');
  }
};

const formataSacola = (sacola) => {
  const div = document.getElementById('produtosSacola');
  for (const i in sacola) {
    div.innerHTML+= formataProduto(sacola[i]);
  }
};

const formataProduto = (produto) => {
  const produtoHtml = [
    '<div class="col-xs-12 col-md-12 col-lg-12" id="'+ produto.sku +'">' +
      '<div class="thumbnail thumb2">' +
        '<img src="images/corinthians.jpg" class="" alt="Corinthians" style="width:100%">' +
      '</div>'+
      '<div class="descPedido">' +
        '<p class="descProduto">' + produto.title + '<span class="glyphicon glyphicon-remove" aria-hidden="true" onclick="RemoveProduto('+ produto.sku +');"><strong>X</strong></span></p>' +
        '<p class="tamanhoProduto">' + produto.availableSizes + ' | ' + produto.style + '</p>' +
        '<p class="quantidade">Quantidade: 2 <span class="precProdutoCarrinho">' + produto.price + '</span></p>' +
      '</div>' +
    '</div>'
  ];
  return produtoHtml;
};
