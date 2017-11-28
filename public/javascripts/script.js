/*var precoTotal = [];
function add(produto) {
  var contador = document.getElementById('carrinho').innerHTML;
  var valContador = parseInt(contador) + 1;
  document.getElementById('carrinho').innerText = valContador;
  var produtoCarrinho = document.getElementsByClassName(produto);
  var sacola = [];
  for(var i in produtoCarrinho) {
    var produto = {
      'idProduto': produtoCarrinho[0].textContent,
      'imagem': produtoCarrinho[1].currentSrc,
      'descricao': produtoCarrinho[2].textContent,
      'tamanho': produtoCarrinho[3].textContent,
      'preco': produtoCarrinho[4].textContent
    };
  }
  sacola.push(
    '<div class="col-xs-2 col-md-3 col-lg-3 thumbnail thumb2"  id="'+ produto.sku +'">' +
      '<img src="'+ produto.imagem +'" class="imagem" alt="Corinthians" style="width:100%">' +
      '<p class="descProduto">' + produto.descricao + '</p>' +
      '<p class="tamanhoProduto">' + produto.tamanho + '</p>' +
      '<span class="cifrao">R$ </span>' +
      '<p class="precProdutoCarrinho">'+ produto.preco + '</p>' +
      '<input type="button" class="btn btn-default btn2" id="'+ produto.sku +'" onclick="remove(this.id);" value="Remover" />' +
    '</div>'
  );

  precoTotal.push(produto.preco);
  var soma = 0;
  for (var i = 0; i < precoTotal.length; i++) {
    var tratarVirgula = parseFloat(precoTotal[i].replace(',', '.'));
    soma+= tratarVirgula;
  }
  sacola.toString();
  document.getElementById("prodCarrinho").insertAdjacentHTML('beforeend', sacola);
  document.getElementById("vazio").innerHTML = '';
  document.getElementById("cifrao3").innerText = 'TOTAL - R$';
  document.getElementById("total").innerText = soma.toFixed(2).replace('.',',');
  document.getElementById("btnFecharCompra").style.display = "block";
}

var precoCarrinho = [];
var subtrai = 0;
function remove(id) {
  var total2 = document.getElementById("total").innerText;
  var tratarVirgulaTotal = parseFloat(total2.replace(',', '.'));
  var elemen = document.getElementById(id);
  var elemen2 = document.getElementById(id).childNodes;
  var valElemen = elemen2[4].textContent;
  var tratarVirgula = parseFloat(valElemen.replace(',','.'));
  precoCarrinho.push(tratarVirgula);
  for (var i = 0; i < precoCarrinho.length; i++) {
    subtrai = tratarVirgulaTotal - precoCarrinho[i];
  }
  var contador = document.getElementById('carrinho').innerHTML;
  var valContador = parseInt(contador) - 1;
  if (valContador === 0) {
    document.getElementById('vazio').innerHTML = '<strong>Carrinho vazio.</strong><hr>';
    document.getElementById('total').innerHTML = subtrai.toFixed(2).replace('.',',');
  } else {
    document.getElementById('total').innerHTML = subtrai.toFixed(2).replace('.',',');
  }
  document.getElementById('carrinho').innerText = valContador;
  var produtoRemove = document.getElementById("prodCarrinho");
  produtoRemove.removeChild(elemen);
  precoTotal = [];
}

function fechaCompra() {
  var valCompra = document.getElementById('total').innerHTML;
  alert('Obrigado pela compra no valor de R$ ' + valCompra + '! A NetShoes Agradece. :)')
}*/
