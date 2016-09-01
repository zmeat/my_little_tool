var express = require('express');
var router = express.Router();
var _ = require("lodash");
var connection = require('../lib/mysql_lib').connection;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('detail', { title: 'Express' });
});

router.post('/add', function(req, res, next){
    console.log(req.body);

    var body = _.pick(req.body, ["title", "des", "scroll", "tel", "address", "dish"]);
    var title = _.get(req.body, 'title', '');
    var des = _.get(req.body, 'des', "");
    var scroll = _.get(req.body, "scroll", "");
    var tel = _.get(req.body, 'tel', '');

    var address = _.get(req.body, 'address', '');
    var dish = _.get(req.body, "dish", "");
    var name = _.get(req.body, "name", '');

    connection.query(
        'insert into detail(title, des, scroll, tel, address, dish, name) values (?, ? , ? ,? ,?, ?, ?)',
        [title, des, scroll, tel, address, dish, name],
        function(err, rows) {
            if(err){
                return next(err);
            }

            return res.redirect('/detail');
        });
});

module.exports = router;

