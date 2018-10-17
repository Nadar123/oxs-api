var mongoose  = require('mongoose');

var tenantModel = new mongoose.Schema({
    name:          { type: String, required:true},
    phone:         { type: String, required:true },
    address:       { type: String, required:true },
    debt:          { type: Number, required:true }

});

module.exports = mongoose.model('Tenant', tenantModel);


