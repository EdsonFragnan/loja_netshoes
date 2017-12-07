const AddCarrinho = (produto) => {
  const item = document.getElementById('produto');
  const titulo = document.getElementById('myModalLabel');
  const produtoHtml = [
    '<div class="col-xs-12 col-md-12 col-lg-12"  class="modal-body" id="'+ produto.sku +'">' +
      '<div class="thumbnail">' +
        '<img src="images/corinthians.jpg" class="" alt="Corinthians" style="width:100%">' +
      '</div>'+
      '<div class="">' +
        '<label>Tamanho: </label>' +
        '<p><select class="selectpicker">' + tamanho(produto.availableSizes) + '</select></p>' +
        '<label>Quantidade: </label>' +
        '<p><input type="text" /></p>' +
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
