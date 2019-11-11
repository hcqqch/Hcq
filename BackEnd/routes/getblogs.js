const express = require('express');
const router = express.Router();
require('../database/connect');
const Blog = require('../database/blog');

// send blog data to frontend 
router.route('/')
    .get((req, res) => {
        let query = req.query.page - 1;
        let pageSize = 6;
        let total = 0;
        let getBlog = new Promise((resolve, reject) => {
            Blog.find({}, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    let arr = [];
                    let obj, data;
                    for (blog of doc) {
                        obj = {
                            _id: blog._id,
                            title: blog.title,
                            tags: blog.tags,
                        }
                        arr.push(obj);
                    }
                    var result = [];
                    for (var i = 0; i < arr.length; i += pageSize) {
                        result.push(arr.slice(i, i + pageSize));
                    }
                    console.log(query != NaN)
                    if (query != NaN) {
                        data = Object.assign({ total: arr.length }, { data: result[query] })
                    } else {
                        data = Object.assign({ total: arr.length }, { data: arr })
                    }
                    res.json(data);
                }
            });
        });
    });

module.exports = router;