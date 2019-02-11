const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
const bcrypt = require("bcrypt-nodejs");



passport.serializeUser((user,done)=>{
    done(null,{ id : user.id });
});

passport.deserializeUser((user,done)=>{

            models.User.findAll({where:{id: user.id }}).then((user)=>{
                done(null,user);
            });


});



passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
    },
    function(req, username, password, done) {
        console.log("in passport")
       
            models.User.findAll({where :{ email : username }}).then((user) =>{

                    if(user.length > 0){
                        return done(null, false,
                            req.flash('message','User Already Exists'));
                    }else{
                          bcrypt.hash(password, null, null, function(err, hash) {
                                models.User.create({
                                    first_name: req.body.first_name,
                                    last_name: req.body.last_name,
                                    email: req.body.email,
                                    password: hash,
                                    zipCode: req.body.zipCode,
                                    about: req.body.about
                                 }).then((user) =>{

                                    return done(null, user);
                                });
                           });
                    }


            });

}));