const express = require('express');
const router = express.Router();
require('../database/connect');
const NewBlog = require('../database/blog');
const Tags = require('../database/tags');
const moment = require('moment');
const config = require('../config.json');
const md5 = require('crypto-js/md5');

// 把前端传来的博客数据存到数据库里．
// save the blog data from frontend to databse.
router.route('/')
    .post((req, res) => {
        let data = req.body;
        // Auth the hashed key.
        let key = data.key;
        const privateKey = config.privateKey;
        const hashedKey = md5(config.passwd + privateKey).toString();
        if (hashedKey !== key) {
            res.send({
                'status': 'failed',
            });
        };

        const time = new moment().format().match(/.{10}/)[0];
        let newBlog = new NewBlog({
            title: data.blogTitle,
            tags: data.blogTags,
            content: data.blogContent,
            created_at: time,
        });
        let saveBlog = new Promise((resolve, reject) => {
            newBlog.save((err, doc) => {
                err ? reject(err) : resolve(doc);
            });
        });

        saveBlog.then((value) => {
            res.json({
                'status': 200,
            });
        }, (err) => {
            console.error('Error: submitblog.js line:27', err);
        });
    });

module.exports = router;