const router = require("express").Router();
const {Category, Product} = require("../../models");

// The `/api/categories` endpoint

// GET /api/categories
router.get("/", (req, res) => {
    // find all categories
    Category.findAll({
        include: [{
            model: Product
        }]
    })
    .then(dbCatData => res.json(dbCatData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/categories/id
router.get("/:id", (req, res) => {
    // find one category by its `id` value
    Category.findOne({
        where: {id: req.params.id},
        include: [{
            model: Product
        }]
    })
    .then(dbCatData => {
        if(!dbCatData) {
            res.status(404).json({message: "No category found at the given ID"});
            return;
        }
        res.json(dbCatData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/categories/
router.post("/", (req, res) => {
    Category.create({
        category_name: req.body.category_name
    })
    .then(dbCatData => res.json(dbCatData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Allows to change category name
// PUT /api/categories/id
router.put("/:id", (req, res) => {
    // update a category by its `id` value
    Category.update(
        {
            category_name: req.body.category_name
        },
        {
            where: {id: req.params.id}
        }

    )
        .then(dbCatData => {
            if(!dbCatData) {
                res.status(404).json({message: "No category found at the given ID"});
                return;
            }
            res.json(dbCatData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/categories/id
router.delete("/:id", (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {id: req.params.id}
    })
    .then(dbCatData => {
        if(!dbCatData) {
            res.status(404).json({message: "No category found at the given ID"});
            return;
        }
        res.json(dbCatData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
