const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const WalletController = require('../controllers/wallets');


    router.get('/',  WalletController.wallets_get_all);

    router.post('/',  WalletController.wallets_create_wallet);

    router.get('/:walletId',  WalletController.wallets_get_wallet);

    router.patch('/:walletId',  WalletController.wallets_update_wallet);

    router.delete('/:walletId',  WalletController.wallets_delete_wallet);

module.exports = router;