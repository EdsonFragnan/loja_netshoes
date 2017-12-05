let carrinhoControle = [];
let precos = [];
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
    carrinhoControle = [];
    localStorage.setItem('contador', '0');
    localStorage.setItem('carrinhoControle', '');
    localStorage.removeItem('valorFinal');
    localStorage.removeItem('valorSacola');
    divMensagemSacola.innerHTML = 'Sacola vazia!';
    divValor.innerHTML = 'R$0,00';
    divContador.innerHTML = '0';
  } else {
    sacola = formataSacola(localStorage.getItem('carrinhoControle'));
    valorFinal = localStorage.getItem('valorFinal');
    valorFinal = parseFloat(valorFinal);
    localStorage.setItem('valorSacola', valorFinal);
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
  divContador.innerHTML = JSON.parse(localStorage.getItem('contador') - 1);
  localStorage.setItem('contador', JSON.parse(localStorage.getItem('contador') - 1));
  if (trataRemove.valorSub === 0 || trataRemove.produto.length === 0 || localStorage.getItem('contador') === '0') {
    carrinhoControle = [];
    precos = [];
    localStorage.removeItem('contador');
    localStorage.setItem('valorSacola', '0');
    localStorage.setItem('valorFinal', '0');
    localStorage.setItem('contador', '0');
    divContador.innerHTML = '0';
    divValorTotal.innerHTML = 'R$0,00';
    divMensagemSacola.innerHTML = 'Sacola vazia!';
  } else {
    localStorage.setItem('valorFinal', trataRemove.valorSub);
    localStorage.setItem('valorSacola', trataRemove.valorSub);
    localStorage.setItem('carrinhoControle', JSON.stringify(trataRemove.produto));
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
      precos.splice(i, 1);
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

const trataValorCarrinho = (sacola) => {
  let valor = 0;
  sacola = JSON.parse(sacola);
  precos.push(sacola[0]);
  if (precos.length === 1) {
    return trataCifrao(sacola[0].price);
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

const montaCarrinho = (contador) => {
  const divSacola = document.getElementById('produtosSacola');
  const divContador = document.getElementById('contador');
  const divValorTotal = document.getElementById('valorTotal');
  const mensagemSacola = document.getElementById('mensagemSacola');
  const produtosSacola = formataSacola(localStorage.getItem('carrinho'));
  let valorTotal = trataValorCarrinho(localStorage.getItem('carrinho'));
  valorTotal = somaCarrinho(valorTotal, localStorage.getItem('valorSacola'));
  localStorage.setItem('valorFinal', valorTotal);
  if (JSON.parse(localStorage.getItem('contador')) === 1) {
    let val = JSON.parse(localStorage.getItem('carrinho'));
    valorTotal = trataCifrao(val[0].price);
    localStorage.setItem('valorFinal', valorTotal);
  }
  divSacola.innerHTML+= produtosSacola;
  divValorTotal.innerHTML = valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
  divContador.innerHTML = localStorage.getItem('contador');
  mensagemSacola.innerHTML = '';
};

const trataCifrao = (valor) => {
  let cifrao = '';
  let ponto = '';
  if (valor.indexOf('R$') != -1) {
    cifrao = valor.replace('R$', '');
    ponto = cifrao.replace(',', '.');
    return parseFloat(ponto);
  } else {
    return parseFloat(valor);
  }
};

const somaCarrinho = (valor, valor2) => {
  if (valor2 === null) {
    return valor
  } else {
    return valor + parseFloat(valor2);
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
