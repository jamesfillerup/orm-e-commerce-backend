const router = require('express').Router();

const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll()
    .then(categories => {
      res.json(categories)
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  if(req.body.category_name)
  Category.create(req.body)
    .then(categories => {

      res.json(categories)
    })
    else{
      res.status(400)
      .send('no body provided')
    }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
