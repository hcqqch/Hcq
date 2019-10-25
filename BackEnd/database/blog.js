const mongoose = require('mongoose');

const NewBlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    }
});

let NewBlogMdel = mongoose.model('blog', NewBlogSchema);

module.exports = NewBlogMdel;