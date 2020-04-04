const mongoose = require('mongoose');

const Wallet = require('../models/wallet');

exports.wallets_get_all = (req, res, next) => {
        Wallet.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        }).catch(err => {
            res.status(500).json({error:err});
        });
    };

    exports.wallets_create_wallet = (req, res, next) => {
        const wallet = new Wallet({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            groupId: req.body.groupId,
            amount: req.body.amount,
            memo: req.body.memo
        });
        wallet.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'New Wallet has been created',
                createdUser: wallet
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
        
    };

    exports.wallets_get_wallet = (req, res, next) => {
        const id = req.params.walletId;
        Wallet.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    };

    exports.wallets_update_wallet = (req, res, next) => {    
        const id = req.params.walletId;
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }
        Wallet.update({_id:id}, {$set: updateOps})
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

    exports.wallets_delete_wallet = (req, res, next) => {    
        const id = req.params.walletId;
        Wallet.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
    };