const fs = require('fs');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

const JWT_SECRET = process.env.JWT_SECRET;
const certPath = process.env.SSOPEM;


passport.use(new SamlStrategy({
    entryPoint: 'https://fpsinc.onelogin.com/trust/saml2/http-post/sso/01e3d051-16c2-4918-be49-f7e01e7c74ff',
    issuer: 'https://app.onelogin.com/saml/metadata/01e3d051-16c2-4918-be49-f7e01e7c74ff',
    cert: fs.readFileSync(certPath, 'utf-8'),
    path: '/api/auth/callback',
}, (profile, done) => {
    
    const user = {
        emailAddress: profile.nameID,
        employeeNumber: profile.attributes.employeenumber
    };

    console.log('-------------------------------');
    console.log(user);
    
    done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
