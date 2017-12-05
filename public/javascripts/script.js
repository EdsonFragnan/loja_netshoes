let carrinhoControle = [];
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
  let contador = trataContador(JSON.parse(localStorage.getItem('contador')));
  storage.push(objetoProduto);
  carrinhoControle = [objetoProduto];
  localStorage.setItem('carrinhoControle', JSON.stringify(concatArray(carrinhoControle, localStorage.getItem('carrinhoControle'))));
  localStorage.setItem('carrinho', JSON.stringify(storage));
  localStorage.setItem('contador', contador);
  montaCarrinho();
};

const SessionCarrinho = () => {
  let carrinho = localStorage.getItem('contador');
  let sacola = localStorage.getItem('carrinho');
  let valorFinal = 0;
  const contador = 0;
  const divValor = document.getElementById('valorTotal');
  const divContador = document.getElementById('contador');
  const divMensagemSacola = document.getElementById('mensagemSacola');
  const divSacola = document.getElementById('produtosSacola');
  if (JSON.parse(carrinho) === null || JSON.parse(carrinho).length === 0 || !localStorage.getItem('carrinhoControle') || localStorage.getItem('valorFinal') === '0') {
    localStorage.setItem('contador', '0');
    localStorage.setItem('carrinhoControle', '');
    localStorage.removeItem('valorFinal');
    divMensagemSacola.innerHTML = 'Sacola vazia!';
    divValor.innerHTML = 'R$0,00';
    divContador.innerHTML = '0';
  } else {
    sacola = formataSacola(localStorage.getItem('carrinhoControle'));
    valorFinal = localStorage.getItem('valorFinal');
    localStorage.setItem('valorSacola', valorFinal);
    const cifrao = valorFinal.replace('R$', '');
    const ponto = cifrao.replace(',', '.');
    valorFinal = parseFloat(ponto);
    divValor.innerHTML = valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
    divContador.innerHTML = carrinho;
    for (const i in sacola) {
      divSacola.innerHTML+= sacola[i];
    }
  }
};

const RemoveProduto = (idProduto) => {
  const divValor = document.getElementById('valorTotal');
  const divContador = document.getElementById('contador');
  const divSacola = document.getElementById('produtosSacola');
  const trataRemove = formataSacolaRemove(localStorage.getItem('carrinhoControle'), idProduto, localStorage.getItem('valorFinal'));
  const divValorTotal = document.getElementById('valorTotal');
  const divMensagemSacola = document.getElementById('mensagemSacola');
  localStorage.setItem('valorFinal', trataRemove.valorSub);
  localStorage.setItem('contador', JSON.parse(localStorage.getItem('contador') - 1));
  localStorage.setItem('carrinhoControle', JSON.stringify(trataRemove.produto));
  divContador.innerHTML = localStorage.getItem('contador');
  if (trataRemove.valorSub === 0 || trataRemove.produto.length === 0) {
    localStorage.setItem('valorSacola', 0);
    divValorTotal.innerHTML = 'R$0,00';
    divMensagemSacola.innerHTML = 'Sacola vazia!';
  } else {
    divValorTotal.innerHTML = trataRemove.valorSub.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
  }
};

const formataSacolaRemove = (sacola, id, valorTotal) => {
  const novaSacola = [];
  const divProduto = document.getElementById(id);
  sacola = JSON.parse(sacola);
  valorTotal = JSON.parse(valorTotal);
  for (const i in sacola) {
    if (id === sacola[i].sku) {
      const cifrao = sacola[i].price.replace('R$', '');
      const ponto = cifrao.replace(',', '.');
      const valSub = valorTotal - parseFloat(ponto);
      const objeto = {
        valorSub: valSub,
        produto: sacola
      };
      sacola.splice(i, 1);
      divProduto.parentElement.removeChild(divProduto);
      return objeto;
    } else {
      novaSacola.push();
    }
  }
  return novaSacola;
};

const formataSacola = (sacola) => {
  const novaSacola = [];
  sacola = JSON.parse(sacola);
  for (const i in sacola) {
    novaSacola.push(formataProduto(sacola[i]));
  }
  return novaSacola;
};

const concatArray = (array, stringArray) => {
  if (stringArray === null || stringArray === '') {
    return array;
  } else if (array === '') {
    return stringArray;
  } else {
    const novoArray = array.concat(JSON.parse(stringArray));
    return novoArray;
  }
};

const trataContador = (contador) => {
  if (contador === 0) {
    return 1;
  } else {
    return contador + 1;
  }
};

const precos = [];
const trataValorCarrinho = (sacola) => {
  let valor = 0;
  sacola = JSON.parse(sacola);
  precos.push(sacola[0]);
  if (precos.length === 1) {
    return sacola[0].price;
  } else {
    for (const i in precos) {
      const cifrao = precos[i].price.replace('R$', '');
      const ponto = cifrao.replace(',', '.');
      valor+= parseFloat(ponto);
    }
    return valor;
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
  return produtoHtml;
};

const montaCarrinho = (produto) => {
  const divSacola = document.getElementById('produtosSacola');
  const divContador = document.getElementById('contador');
  const divValorTotal = document.getElementById('valorTotal');
  const mensagemSacola = document.getElementById('mensagemSacola');
  const produtosSacola = produto === undefined || produto === null ? formataSacola(localStorage.getItem('carrinho')) : formataSacola(produto);
  let valorTotal = trataValorCarrinho(localStorage.getItem('carrinho'));
  localStorage.setItem('valorFinal', valorTotal);
  valorTotal = trataCifrao(valorTotal, localStorage.getItem('valorSacola'));
  localStorage.setItem('valorFinal', valorTotal);
  divSacola.innerHTML+= produtosSacola;
  divValorTotal.innerHTML = valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
  divContador.innerHTML = localStorage.getItem('contador');
  mensagemSacola.innerHTML = '';
};

const trataCifrao = (valor, valor2) => {
  let cifrao = '';
  let ponto = '';
  if (valor2 === null) {
    return valor
  } else {
    if (valor.indexOf('R$') != -1 && valor2.indexOf('R$') != -1) {
      cifrao = valor.replace('R$', '');
      ponto = cifrao.replace(',', '.');
      const cifrao2 = valor2.replace('R$', '');
      const ponto2 = cifrao.replace(',', '.');
      return parseFloat(ponto) + parseFloat(ponto2);
    } else if (valor.indexOf('R$') != -1) {
      cifrao = valor.replace('R$', '');
      ponto = cifrao.replace(',', '.');
      return parseFloat(ponto) + parseFloat(valor2);
    } else {
      cifrao = valor2.replace('R$', '');
      ponto = cifrao.replace(',', '.');
      return valor + parseFloat(ponto);
    }
  }
};

const Compra = () => {
  const envio = 'Compra no valor de ' + localStorage.getItem('preco') + ' feita com sucesso!';
  $.ajax({
      type: 'POST',
      url: '/venda',
      success: (retorno) => {
        location.href = 'http://localhost:5000/carrinho';
      }
  });
  localStorage.clear();
};
