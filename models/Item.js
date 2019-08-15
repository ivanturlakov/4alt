const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    category: String,
    price: String,
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    comments: [
        {
            text: String,
            createdAt: { type: Date, default: Date.now },
            author: { type: mongoose.Schema.ObjectId, ref: "User" },
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);