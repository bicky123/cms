const passport = require('passport');
const passportLocal = require('passport-local');

passport.deserializeUser(function(user,done){
    done(null,user);
});

passport.serializeUser(function(user,done){
    done(null,user);
});