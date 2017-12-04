describe('Testes das rotas', (done) => {

  after(function () {
    process.exit(0);
  });

  it('GET /', (done) => {
    request.get('/usuarios')
    .send({})
    .expect(200,done);
  });

  it('GET /carrinho', (done) => {
    request.get('/carrinho')
    .send({})
    .expect(200,done);
  });

  it('POST /venda', (done) => {
    request.post('/venda')
    .send({})
    .expect(302,done);
  });

});
