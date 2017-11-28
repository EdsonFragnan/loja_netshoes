'use strict';

module.exports = app => {
  /* GET produtos */
  app.get('/', (req, res, next) => {
    res.json({title: 'Home de produtos.'});
  });
};
