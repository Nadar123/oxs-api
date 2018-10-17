var express    = require('express');
var mongoose   = require('mongoose');
var bodyparser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/tenantAPI');

var Tenant = require('./models/tenantModel');

var app = express();


var port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
var tenantRouter = express.Router();

tenantRouter.route('/tenant')
    .post(function(req, res){
        var tenant = new Tenant(req.body);
        tenant.save();
        res.send(tenant);
    })
    .get(function (req, res){
        Tenant.find(function (err, tenants){
            if(err){
                console.log(err);
            } else {
                res.json(tenants);
            }
        });
    });

    tenantRouter.route('/:tenantId')
    .delete(function(req, res){
        Tenant.findById(req.params.tenantId, function(err, tenant){
            if(err){
                res.status(500).send(err);
            } else{
                tenant.remove();
                res.json(tenant);
            }
        });
    })
    .put(function(req, res){
        Tenant.findById(req.params.tenantId, function(err, tenant){
            if(err){
                res.status(500).send(err);
            } else{
                tenant.name = req.body.name;
                tenant.phone = req.body.phone;
                tenant.address= req.body.address;
                tenant.debt = req.body.debt;
                tenant.save();
                res.json(tenant);
            }
        });
    })
    .get(function(req, res){

        Tenant.findById(req.params.tenantId, function(err, tenant){
            if(err){
                res.status(500).send(err);
            } else{
                res.json(tenant);
            }
        });
    });

    tenantRouter.route('/debt')
    .get(function(req, res){
        //find and return all tenant with debt
        Tenant.find(function (err, tenants){
            if(err){
                console.log(err);
            } else {
                res.json(tenants);
            }
        });
    });

    tenantRouter.route('/noDebt')
    .get(function(req, res){
        //find and return all tenant with debt
        Tenant.find(function (err, tenants){
            if(err){
                console.log(err);
            } else {
                res.json(tenants);
            }
        });
    });


app.use('/api', tenantRouter);

app.get('/', function(req, res){
    res.send('welcome to the api ');
});



app.listen(port, function(){
    console.log('Running on port: ' + port );

});