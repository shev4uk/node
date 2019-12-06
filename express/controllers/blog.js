const sql = require('mssql');

const db = require('../util/database');

exports.getPosts = (req, res, next) => {

    res.render('blog/posts', {
      posts: [{
        id: 1,
        title: 'Name post' 
      }],
      pageTitle: 'All Posts',
      path: '/'
    });
};