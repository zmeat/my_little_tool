var express = require('express');
var router = express.Router();
var connection = require('../lib/mysql_lib').connection;
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('list', { title: '列表页' });
});

//upload
router.get('/add', function(req, res, next){
    console.log(req.query);

    var body = _.pick(req.query, ["title", "des", "img", "tel", "address", "name", "page_title", "href"]);
    var title = _.get(body, 'title', '');
    var des = _.get(body, 'des', '');
    var img = _.get(body, "img", '');
    var tel = _.get(body, 'tel', '');
    var address = _.get(body, "address", '');
    var name = _.get(body, 'name', '');
    var page_title = _.get(body, 'page_title', '');
    var href = _.get(body, 'href', '');

    connection.query(
        'insert into list (title, des, img, tel, address, name, page_title, href) values (?, ? , ? ,? ,?, ?, ?, ?)',
        [title, des, img, tel, address, name, page_title, href],
        function(err, rows) {
            if(err){
                return next(err);
            }

            return res.redirect('/list');
    });

});

router.post('/get', function(req, res, next){

    console.log(req.body);

    connection.query('select * from list where name = ?', [req.body.name], function(err, row){
        if(err){
            return next(err);
        }

        res.json(_.first(row));
    });
});

module.exports = router;
