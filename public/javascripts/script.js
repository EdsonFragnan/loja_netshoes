const sacolaControle = [];
const sacolaObjeto = [];
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
  const div = document.getElementById('produtosSacola');
  const divContador = document.getElementById('contador');
  const objeto = formataSacola(objetoProduto);
  sacolaObjeto.push(objetoProduto);
  if (objeto === 0) {
    sessionStorage.setItem('mensagemSacola', 'Carrinho vazio.');
    divContador.innerHTML = 0;
    div.innerHTML = sessionStorage.getItem('mensagemSacola');
  } else {
    div.innerHTML+= trataObjeto(objeto);
    sessionStorage.setItem('contador', objeto.length);
    divContador.innerHTML = sessionStorage.getItem('contador');
    sessionStorage.setItem('storage', JSON.stringify(sacolaObjeto));
  }
};

const SessionCarrinho = () => {
  const objeto = formataSacola(JSON.parse(sessionStorage.getItem('storage')));
  const div = document.getElementById('produtosSacola');
  const divCarrinho = document.getElementById('contador');
  const divContador = sessionStorage.getItem('contador');
  if (objeto.length === 0) {
    divCarrinho.innerHTML = 0;
    div.innerHTML = 'Carrinho vazio.';
  } else {
    divCarrinho.innerHTML = divContador;
    div.innerHTML = objeto;
  }
};


const formataSacola = (produto) => {
  const sacola = [];
  if (!produto) {
    return 0;
  } else if (produto.length > 0) {
    for (const i in produto) {
      sacola.push(
        '<div class="col-xs-12 col-md-12 col-lg-12" id="'+ produto[i].sku +'">' +
          '<div class="thumbnail thumb2">' +
            '<img src="images/corinthians.jpg" class="" alt="Corinthians" style="width:100%">' +
          '</div>'+
          '<div class="descPedido">' +
            '<p class="descProduto">' + produto[i].title + '<span class="glyphicon glyphicon-remove" aria-hidden="true" onclick="RemoveProduto('+ produto[i].sku +');"><strong>X</strong></span></p>' +
            '<p class="tamanhoProduto">' + produto[i].availableSizes + ' | ' + produto[i].style + '</p>' +
            '<p class="quantidade">Quantidade: 2 <span class="precProdutoCarrinho">' + produto[i].price + '</span></p>' +
          '</div>' +
        '</div>'
      );
    }
    return sacola;
  } else {
    sacolaControle.push(
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
    );
    return sacolaControle;
  }
};

const trataObjeto = (produto) => {
  for (const i in produto) {
    return produto[i];
  }
};

/*

const sacolaControle = [];
const AddCarrinho = (produto) => {
  const novaSacola = [];
  const objetProduto = {
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
  const sacola = formataSacola(objetProduto);
  const divContador = document.getElementById('contador');
  const div = document.getElementById('produtosSacola');
  const divContadorSacola = document.getElementById('quantidade');
  sacolaControle.push(objetProduto);
  sessionStorage.setItem('storage', JSON.stringify(sacola));
  divContador.innerHTML = sacolaControle.length;
  sessionStorage.setItem('contador',  sacolaControle.length);
  const parseStorage = JSON.parse(sessionStorage.getItem('storage'));
  if (parseStorage === 0) {
    divContadorSacola.innerHTML = 'Carrinho vazio.';
  }
  divContadorSacola.innerHTML+= '';
  div.innerHTML+= sacola;
};

const RemoveProduto = (idProduto) => {
  const parseStorage = JSON.parse(sessionStorage.getItem('storage'));
  const produtosSessao = sessionStorage.getItem('storage');
  const div = document.getElementById('produtosSacola');
  const divContador = document.getElementById('contador');
  const divContadorSacola = document.getElementById('quantidade');
  for (const i in parseStorage) {
    if (parseStorage[i].sku === idProduto) {
      parseStorage.splice(i, idProduto);
    }
  };
  const sacola = formataSacola(produtosSessao);
  if (sessionStorage.getItem('contador') <= 0) {
    divContador.innerHTML = sacolaControle.length;
    div.innerHTML = sacola;
    divContadorSacola.innerHTML = 'Carrinho vazio.';
  } else {
    divContador.innerHTML = sessionStorage.getItem('contador');
    div.innerHTML = sacola;
  }
  sessionStorage.setItem('storage', parseStorage)
  div.innerHTML = sacola;
};

const SessionCarrinho = () => {
  const div = document.getElementById('produtosSacola');
  const divContador = document.getElementById('contador');
  const divContadorSacola = document.getElementById('quantidade');
  divContador.innerHTML = sessionStorage.getItem('contador');
  if (sessionStorage.getItem('contador') <= 0) {
    divContador.innerHTML = sacolaControle.length;
    divContadorSacola.innerHTML = 'Carrinho vazio.';
  } else {
    const produtosSessao = sessionStorage.getItem('storage');
    const sacola = formataSacola(produtosSessao);
    divContador.innerHTML = sessionStorage.getItem('contador');
    if (sessionStorage.getItem('contador') <= 0) {
      divContador.innerHTML = sacolaControle.length;
      divContadorSacola.innerHTML = 'Carrinho vazio.';
    } else {
      divContador.innerHTML = sessionStorage.getItem('contador');
      div.innerHTML = sacola;
    }
  }
};

const FechaCompra = () => {
  alert('Obrigado pela compra no valor de R$ 100,00! A NetShoes Agradece. :)')
};

const Preco = () => {};

const formataSacola = (produto) => {
  const sacola = [];
  if (!produto) {
    return sessionStorage.setItem('contador', 0);
  } else {
    if (typeof produto === 'string') {
      produto = JSON.parse(produto);
    } else if (typeof produto === 'object'){
      sacola.push(
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
      );
      return sacola;
    } else {
      for (const i in produto) {
        sacola.push(
          '<div class="col-xs-12 col-md-12 col-lg-12" id="'+ produto[i].sku +'">' +
            '<div class="thumbnail thumb2">' +
              '<img src="images/corinthians.jpg" class="" alt="Corinthians" style="width:100%">' +
            '</div>'+
            '<div class="descPedido">' +
              '<p class="descProduto">' + produto[i].title + '<span class="glyphicon glyphicon-remove" aria-hidden="true" onclick="RemoveProduto('+ produto[i].sku +');"><strong>X</strong></span></p>' +
              '<p class="tamanhoProduto">' + produto[i].availableSizes + ' | ' + produto[i].style + '</p>' +
              '<p class="quantidade">Quantidade: 2 <span class="precProdutoCarrinho">' + produto[i].price + '</span></p>' +
            '</div>' +
          '</div>'
        );
      }
      return sacola;
    }
  }
};
*/
