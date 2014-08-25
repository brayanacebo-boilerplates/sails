/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res){
		Users.find(function foundUsers(err, users){
			if(err) return next(err);
			if(!users) return next();
			res.view({
				users: users
			});
		});
	},
	new: function(req, res){
		res.view();
	},
	create: function(req, res, next){

		Users.create(req.params.all(), function usersCreated(err, user){
			
			if(err){
				req.session.flash = {
					err: err
				}
				return res.redirect('/users/new');
			}

			// res.json(user);
			return res.redirect('/users/show/'+user.id);
		});

	},
	show: function(req, res, next){
		Users.findOne(req.param('id'), function foundUsers(err, user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user: user
			});
		});
	},
	edit: function(req, res, next){
		Users.findOne(req.param('id'), function foundUser(err, user){
			if(err) return err;
			if(!user) return next();
			res.view({
				user: user
			});
		});
	},
	update: function(req, res, next){
		Users.update(req.param('id'), req.params.all(), function updateUser(err){
			if(err){
				return res.redirect('/users/edit/'+req.param('id'));
			}else{
				return res.redirect('/users/show/'+req.param('id'));
			}
		});
	},
	destroy: function(req, res, next){
		Users.findOne(req.param('id'), function destroyedUser(err, user){
			if(err) return next(err);
			if(!user) return next("El usuario no existe");
			Users.destroy(req.param('id'), function (err){
				return res.redirect('/users');
			});
		});
	}
};

