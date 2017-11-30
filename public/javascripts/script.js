const sacola = [];
const AddCarrinho = (produto) => {
  sacola.push(produto);
  const novaSacola = [];
  for (const i in sacola) {
    novaSacola.push(
      '<div class="col-xs-12 col-md-12 col-lg-12" id="'+ sacola[i].sku +'">' +
        '<div class="thumbnail thumb2">' +
          '<img src="images/corinthians.jpg" class="" alt="Corinthians" style="width:100%">' +
        '</div>'+
        '<div class="descPedido">' +
          '<p class="descProduto">' + sacola[i].title + '<span class="glyphicon glyphicon-remove" aria-hidden="true" onclick="RemoveProduto('+ sacola[i].sku +');"><strong>X</strong></span></p>' +
          '<p class="tamanhoProduto">' + sacola[i].availableSizes + ' | ' + sacola[i].style + '</p>' +
          '<p class="quantidade">Quantidade: 2 <span class="precProdutoCarrinho">' + sacola[i].price + '</span></p>' +
        '</div>' +
      '</div>'
    );
    sessionStorage.setItem('storage', novaSacola);
  }
  const divContador = document.getElementById('contador');
  const div = document.getElementById('produtosSacola');
  divContador.innerHTML = novaSacola.length;
  div.innerHTML = novaSacola;
};

const RemoveProduto = (idProduto) => {
  const elem = document.getElementById(idProduto);
  const elemCarrinho = document.getElementById('produtosSacola');
  const sacolaRemove = [];
  //elem.parentNode.removeChild(elem);
  //console.log(sessionStorage.getItem('storage'));

  //sessionStorage.removeItem(elem);
  //sessionStorage.setItem('novoStorage', elemCarrinho.children);
  /*const divContador = document.getElementById('contador');
  console.log(sacola.length);
  divContador.innerHTML = sacola.length - 1;*/
};

const SessionCarrinho = () => {
  const produtosSessao = sessionStorage.getItem('storage');
  console.log(produtosSessao);
  const div = document.getElementById('produtosSacola');
  const divContador = document.getElementById('contador');
  //divContador.innerHTML = produtosSessao.length;
  div.innerHTML = produtosSessao;
};

const FechaCompra = () => {
  alert('Obrigado pela compra no valor de R$ 100,00! A NetShoes Agradece. :)')
};

const Preco = () => {};
