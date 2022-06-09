const router = require('express').Router();

const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
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
  console.log('-------------------')
  //   // find one category by its `id` value
  //   // be sure to include its associated Products
  Category.findOne({

    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })

    .then(categories => {
      if(!categories) {
        res.status(404).json({message: `Category ID not found`});
        return;
      }
      res.json(categories);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});


router.post('/', (req, res) => {
//create a new category

  Category.create({
    category_name: req.body.category_name
  })
  
  .then(categories => res.json(categories))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });

  // if(req.body.category_name)
  // Category.create(req.body)
  //   .then(categories => {

  //     res.json(categories)
  //   })
  //   else{
  //     res.status(400)
  //     .send('no body provided')
  //   }
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
      res.status(404).json({ message: 'No category found with this id' });
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
      res.status(404).json({ message: 'No category found with this id' });
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
