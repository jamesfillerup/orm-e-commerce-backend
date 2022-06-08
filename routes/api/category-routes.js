const router = require('express').Router();

const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
      include: [{
        model: Product
      }]
    })

    .then(categories => res.json(categories))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
    .then(categories => {
      if (!categories) {
        res.status(404).json({message: `Category ID not found`});
        return;
      }

    })
  })
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
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(categories => {
    if (!categories[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(categories);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categories => {
    if (!categories) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(categories);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
