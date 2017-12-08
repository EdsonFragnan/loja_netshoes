const AddCarrinho = (produto) => {
  const item = document.getElementById('produto');
  const titulo = document.getElementById('myModalLabel');
  let especificacao = produto.style === '' ? 'Não especificado.' : produto.style;
  const produtoHtml = [
    '<div class="col-xs-12 col-md-12 col-lg-12"  class="modal-body" id="'+ produto.sku +'">' +
      '<div class="thumbnail">' +
        '<img src="images/corinthians.jpg" class="" alt="Corinthians" style="width:100%">' +
      '</div>'+
      '<div>' +
        '<div class="form-group">' +
          '<label>Estilo: </label>' +
          '<p>' + especificacao + '</p>' +
        '</div>' +
        '<div class="form-group">' +
          '<label>Tamanho: </label>' +
          '<p><select class="selectpicker">' + tamanho(produto.availableSizes) + '</select></p>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="quantidade">Quantidade:</label>' +
          '<input type="text" class="form-control" id="quantidade" value="1" />' +
        '</div>' +
        '<div class="form-group">' +
          '<label>Preço unidade: </label>' +
          '<p>' + produto.price + '</p>' +
        '</div>' +
      '</div>' +
    '</div>'
  ];
  titulo.innerHTML = produto.title;
  item.innerHTML = produtoHtml;
};

const tamanho = (tamanhoRoupa) => {
  let tamanhoProd = [];
  for (const i in tamanhoRoupa) {
    tamanhoRoupa.push(
      '<option>'+ tamanhoRoupa[i] +'</option>'
    );
  }
  return tamanhoRoupa;
};
