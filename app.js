'use strict';

const app = require('./config/express_config')();
const porta = process.env.PORT || 3000;

app.listen(porta, () => {
  console.log('Servidor rodando na porta: ', porta);
});

module.exports = app;
