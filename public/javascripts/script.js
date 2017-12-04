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

  const storage = [];
  if (localStorage.getItem('storage') != null) {
    const item = localStorage.getItem('storage');
    storage.push(objetoProduto);
    const novoStorage = storage.concat(JSON.parse(item));
    const formataPreco = trataPreco(storage);
    const produtosUnico = formataProduto(objetoProduto);
    const divMsgSacola = document.getElementById('mensagemSacola');
    const div = document.getElementById('produtosSacola');
    const precoT = document.getElementById('valorTotal');
    localStorage.setItem('preco', formataPreco.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'}));
    divMsgSacola.innerHTML = '';
    const divContador = document.getElementById('contador');
    const cont = 1 + parseInt(localStorage.getItem('contador'));
    localStorage.setItem('storage', JSON.stringify(novoStorage));
    localStorage.setItem('contador', cont);
    if (localStorage.getItem('preco2') === null) {
      precoT.innerHTML = formataPreco.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
      divContador.innerHTML = cont;
      div.innerHTML+= produtosUnico;
    } else {
      const valorFinal = trataPrecoTotal(localStorage.getItem('preco2'), formataPreco);
      localStorage.setItem('preco', valorFinal);
      precoT.innerHTML = valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
      divContador.innerHTML = cont;
      div.innerHTML+= produtosUnico;
    }
  } else {
    const produtos = formataProduto(objetoProduto);
    const divMsgSacola = document.getElementById('mensagemSacola');
    const div = document.getElementById('produtosSacola');
    storage.push(objetoProduto);
    divMsgSacola.innerHTML = '';
    const divContador = document.getElementById('contador');
    const cont = 1 + parseInt(localStorage.getItem('contador'));
    localStorage.setItem('storage', JSON.stringify(storage));
    localStorage.setItem('contador', cont);
    divContador.innerHTML = cont;
    const formataPreco2 = trataPreco(storage);
    const precoT2 = document.getElementById('valorTotal');
    localStorage.setItem('preco', formataPreco2.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'}));
    precoT2.innerHTML = formataPreco2.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
    div.innerHTML+= produtos;
  }
};

const SessionCarrinho = () => {
  const divContador = document.getElementById('contador');
  const divMsgSacola = document.getElementById('mensagemSacola');
  if (!localStorage.getItem('contador') || localStorage.getItem('contador') === '0' || JSON.parse(localStorage.getItem('storage')).length === 0) {
    localStorage.setItem('contador', 0);
    divContador.innerHTML = 0;
    divMsgSacola.innerHTML = 'Carrinho vazio.';
    const precoT = document.getElementById('valorTotal');
    precoT.innerHTML = 'R$' + 0;
    localStorage.removeItem('storage');
  } else {
    const parseSacola = JSON.parse(localStorage.getItem('storage'));
    divContador.innerHTML = localStorage.getItem('contador');
    const precoT2 = document.getElementById('valorTotal');
    precoT2.innerHTML = localStorage.getItem('preco').indexOf('R$') === 0 ? localStorage.getItem('preco') : parseFloat(localStorage.getItem('preco')).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
    localStorage.setItem('preco2', localStorage.getItem('preco'));
    formataSacola(parseSacola);
  }
};

const RemoveProduto = (idProduto) => {
  const divContador = document.getElementById('contador');
  const divMsgSacola = document.getElementById('mensagemSacola');
  const sacola = document.getElementById('produtosSacola');
  const div = document.getElementById(idProduto);
  const cont = parseInt(localStorage.getItem('contador')) - 1;
  const parseSacola = JSON.parse(localStorage.getItem('storage'));
  for (const i in parseSacola) {
    if (idProduto === parseSacola[i].sku) {
      div.parentElement.removeChild(div);
      const valorRemove = trataPrecoRemove(localStorage.getItem('preco'), parseSacola[i].price);
      localStorage.setItem('preco', valorRemove.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'}));
      parseSacola.splice(i, 1);
      localStorage.setItem('storage', JSON.stringify(parseSacola));
    }
  }
  localStorage.setItem('contador', cont);
  if (parseInt(localStorage.getItem('contador')) === 0 || localStorage.getItem('preco') ==='R$0,00') {
    divMsgSacola.innerHTML = 'Carrinho vazio.';
    divContador.innerHTML = '0';
    localStorage.clear();
    sacola.innerHTML = '';
    const precoT2 = document.getElementById('valorTotal');
    precoT2.innerHTML = 'R$0';
  } else {
    const preco = document.getElementById('valorTotal');
    preco.innerHTML = localStorage.getItem('preco');
    divContador.innerHTML = localStorage.getItem('contador');
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
        '<p class="quantidade">Quantidade: 1 <span class="precProdutoCarrinho">' + produto.price + '</span></p>' +
      '</div>' +
    '</div>'
  ];
  return produtoHtml.toString();
};

let precos = 0;
const trataPreco = (valor) => {
  let preco = 0;
  for (const i in valor) {
    const cifrao = valor[i].price.replace('R$', '');
    const ponto = cifrao.replace(',', '.');
    preco = parseFloat(ponto);
    precos += preco;
  }
  return precos;
};

const trataPrecoRemove = (total, produto) => {
  const cifrao = total.replace('R$', '');
  const ponto = cifrao.replace(',', '.');
  const cifrao2 = produto.replace('R$', '');
  const ponto2 = cifrao2.replace(',', '.');
  const valorRemove = parseFloat(ponto) - parseFloat(ponto2);
  return valorRemove;
};

const trataPrecoTotal = (total, produto) => {
  const cifrao = total.replace('R$', '');
  const ponto = cifrao.replace(',', '.');
  const valorRemove = parseFloat(ponto) + produto;
  return valorRemove;
};

const Compra = () => {
  alert('Compra no valor de ' + localStorage.getItem('preco') + ' feita com sucesso!');
  localStorage.clear();
  location.reload();
};
