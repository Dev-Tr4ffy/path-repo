// pages/api/auth/callback.js
import { createRouter } from 'next-connect';
import passport from '../../../lib/samlStrategy'; // Adjust the path as needed

const handler = createRouter();

handler.use(passport.initialize());
handler.post(passport.authenticate('saml', {
  failureRedirect: '/',
  failureFlash: true
}), (req, res) => {
  res.redirect('/success'); // Adjust the redirect based on your app's flow
});

export default handler.handler();  // make sure you are exporting a default function