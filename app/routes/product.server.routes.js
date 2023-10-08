const products = require('../../app/controllers/product.server.controller');
const express = require('express');
const router = express.Router();

router.param(`id`, products.productById);
router.post('/', products.create).get('/', products.list).delete('/', products.deleteAll);

router.route(`/:id`)
      .get(products.read)
      .put(products.update)
      .delete(products.delete);

module.exports = router;