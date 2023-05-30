const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// CLIENT_ID : 
// CLIENT_SECRET: 
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email , password, done){
        // console.log(email);
        // console.log(password);
        User.findOne({email}).then(user => {
            // console.log(user);
            if(user.password){
                bcrypt.compare(password, user.password, function(err, result) {
                    // result == true
                    if (err) {return done(err)}
                    // console.log(result);
                    if (result) {return done(null, user)}
                });
            }else{
                return done('Пользователь не найден')
            }

        }).catch(e => {
            return done(e)
        })
    }
))

passport.use(new GoogleStrategy({
    clientID: '463833656017-vvg3evv9e796310vbpolvoktbe03d3l5.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/api/auth/google",
    scope: ['openid' , 'email' , 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({ googleId: profile.id })
    // console.log(profile);
    const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()
    return cb(null, newUser);
    // console.log(user);
  }
));

passport.serializeUser(function(user , done) {
    // console.log(user);
    done(null , user._id)
})

passport.deserializeUser(function(id , done){
    // console.log(id);
    User.findById(id).then((user , err) => {
        done(err , user)
    })
})