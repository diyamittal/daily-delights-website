const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: Object,
    items: Array,
    totalAmount: Number,
    location: Object,
    paymentMethod: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
