/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {
  schema:true, //Para obligar a que solo lo que esta en el modelo sea lo insertado
  attributes: {
  	name: {
  		type: 'string',
  		required: true
  	},
  	title: {
  		type: 'string'
  	},
  	email: {
  		type: 'string',
  		email:true,
  		unique: true,
  		required:true
  	},
  	encryptedPassword: {
  		type: 'string'
  	},
  	toJSON: function(){
  		var obj = this.toObject();
  		delete obj.password;
  		delete obj.confirmation;
  		delete obj.encryptedPassword;
  		delete obj._csrf;
  		return obj;
  	}
  },
  beforeCreate: function(values, next){
    if(!values.password || values.password != values.confirmation){
      return next({err: ['El password no coincide']});
    }
    bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
      if(err) return next(err);
      values.encryptedPassword = encryptedPassword;
      values.online = true;
      next();
    });
  }
};

