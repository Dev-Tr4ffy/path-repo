import { createRouter } from 'next-connect';
import passport from '../../../lib/samlStrategy'; 
import withSession from '../../../utils/session'; // Ensure the path is correct

const handler = createRouter();

handler.use(passport.initialize());
handler.post(
    passport.authenticate('saml', {
        failureRedirect: '/',
        failureFlash: true
    }), 
    (req, res) => {
        console.log('User authenticated, setting session:', req.user);
        req.session.set("user", { emailAddress: req.user.emailAddress, employeeNumber: req.user.employeeNumber });
        req.session.save().then(() => {
            console.log('user saved in session--------------');
            res.redirect('/sample'); // Adjust the redirect based on your app's flow
        });
    }
);

export default withSession(handler.handler());




