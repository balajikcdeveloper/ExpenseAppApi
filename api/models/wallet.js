const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    groupId: { type: String, required: true },
    amount: { type: String, required: true },
    memo: { type: String, required: true }
});

module.exports = mongoose.model('Wallet', walletSchema);