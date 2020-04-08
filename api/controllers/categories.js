const mongoose = require('mongoose');

const baseURL = 'https://eliya-web-app.herokuapp.com/';

const Category = require('../models/category');

exports.categories_get_all = (req, res, next) => {
    Category.find()
    .select('categoryId categoryName _id')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            categories: docs.map(doc => {
                return {
                    _id: doc._id,
                    categoryId: doc.categoryId,
                    categoryName: doc.categoryName,
                    request: {
                        type: 'GET',
                        url: baseURL+'/categories/' + doc._id
                    }
                }
            })
            
        });
    }).catch(err => {
        res.status(500).json({error:err});
    });
};

exports.categories_create_category = (req, res, next) => {
    const category = new Category({
        _id: mongoose.Types.ObjectId(),
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName
    });
    category.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'New Category has been created successfully',
            createdEmployee: {
                _id: result._id,
                categoryId: req.body.categoryId,
                categoryName: req.body.categoryName
            },
            request: {
                type: 'GET',
                url: baseURL+'/categories/' + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.categories_get_category = (req, res, next) => {
    const id = req.params.categoryId;
    Category.findById(id)
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.categories_update_category = (req, res, next) => {    
    const id = req.params.categoryId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Category.update({_id:id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
};

exports.categories_delete_category = (req, res, next) => {    
    const id = req.params.categoryId;
    Category.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Category removed",
                request: {
                    type: "POST",
                    url: baseURL+'/categories/',
                    body: {
                        categoryId: 'Number',
                        categoryName: 'String'
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
};