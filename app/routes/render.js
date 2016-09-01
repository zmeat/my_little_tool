var express = require("express");
var router = express.Router();
var _ = require('lodash');
var connection = require('../lib/mysql_lib').connection;
var fs = require('fs');


router.get('/list', function(req, res, next){
    console.log(req.query);

    if(!req.query.name){
        return  res.end();
    }

    connection.query('select * from list where name = ?',[req.query.name], function(err, row){
        if(err){
            return next(err);
        }

        res.render('list_temp', {data:row, _:_}, function(err, html){
            if(err){
                return next(err);
            }

            _render(req.query.name, html, "list");

            res.send(html);
        });
        res.render('list_temp_show', {data:row, _:_});
    });

});
router.get('/list_img', function(req, res, next){
    console.log(req.query);

    if(!req.query.name){
        return  res.end();
    }

    connection.query('select * from list where name = ?',[req.query.name], function(err, row){
        if(err){
            return next(err);
        }

        res.render('list_img_temp', {data:row, _:_}, function(err, html){
            if(err){
                return next(err);
            }

            _render(req.query.name, html, "list_img");
        });
        res.render('list_img_temp_show', {data:row, _:_})
    });

});

router.get('/detail', function(req, res, next){
    console.log(req.query);

    if(!req.query.name){
        return  res.end();
    }

    connection.query('select * from detail where name = ? order by id desc',[req.query.name], function(err, row){
        if(err){
            return next(err);
        }

        console.log(row)
        res.render('detail_temp', {data: _.first(row), _:_}, function(err, html){
            if(err){
                return next(err);
            }

            _render(req.query.name, html, "detail");
        });
        res.render('detail_temp_show', {data: _.first(row), _:_});
    });

});

function _render(name, html, type){
    fs.writeFile('public/html/'+type+'/'+ name + '.html', html, (err) => {
        if (err) throw err;

        console.log('It\'s saved!');
    });
}
module.exports = router;
