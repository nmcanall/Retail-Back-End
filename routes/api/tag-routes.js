const router = require("express").Router();
const {Tag, Product, ProductTag} = require("../../models");

// The `/api/tags` endpoint

// GET /api/tags
router.get("/", (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    Tag.findAll({
        include: [{
            model: Product,
            through: ProductTag,
            as: "tagged_products"
        }]
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET /api/tags/id
router.get("/:id", (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    Tag.findOne({
        where: {id: req.params.id},
        include: [{
            model: Product,
            through: ProductTag,
            as: "tagged_products"
        }]
    })
    .then(dbTagData => {
        if(!dbTagData) {
            res.status(404).json({message: "No tag found with this ID"});
            return;
        }
        res.json(dbTagData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/tags/
// Allow a tag to be created and associated to a product
router.post("/", (req, res) => {
    /* req.body should look like this...
        {
            tag_name: "fluffy",
            productIds: [1, 2, 3, 4]
        }
    */
    Tag.create(req.body)
        .then((tag) => {
            // if the tag is associated to a product, we need to create pairings to bulk create in the ProductTag model
            if (req.body.productIds && req.body.productIds.length) {
                const productTagIdArr = req.body.productIds.map((product_id) => {
                    return {
                        tag_id: tag.id,
                        product_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // if no product tags, just respond
            res.status(200).json(tag);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

// PUT /api/tags/id
// Allow a tag's name and associated products to be adjusted by its ID value
router.put("/:id", (req, res) => {
    Tag.update(req.body, {
        where: {
            id: req.params.id,
        }
    })
        .then((tag) => {
            // find all associated tags from ProductTag
            return ProductTag.findAll({ where: {tag_id: req.params.id} });
        })
        .then((productTags) => {
            // get list of current tag_ids
            const productTagIds = productTags.map(({ product_id }) => product_id);
            // create filtered list of new product_ids
            const newProductTags = req.body.productIds
                .filter((product_id) => !productTagIds.includes(product_id))
                .map((product_id) => {
                    return {
                        tag_id: req.params.id,
                        product_id,
                    };
                });
            // figure out which ones to remove
            const productTagsToRemove = productTags
                .filter(({ product_id }) => !req.body.productIds.includes(product_id))
                .map(({ id }) => id);

            // run both actions
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

router.delete("/:id", (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy({
        where: {id: req.params.id}
    })
    .then(dbTagData => {
        if(!dbTagData) {
            res.status(404).json({message: "No tag found with this ID"});
            return;
        }
        res.json(dbTagData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
