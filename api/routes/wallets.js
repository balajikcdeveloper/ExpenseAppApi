const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const WalletController = require('../controllers/wallets');

    router.get('/', checkAuth, WalletController.wallets_get_all);

    router.post('/', checkAuth, WalletController.wallets_create_wallet);

    router.get('/:walletId', checkAuth, WalletController.wallets_get_wallet);

    router.patch('/:walletId', checkAuth, WalletController.wallets_update_wallet);

    router.delete('/:walletId', checkAuth, WalletController.wallets_delete_wallet);

module.exports = router;