// Full path: /pages/api/auth/login.js

import { createRouter } from 'next-connect';
import passport from '../../../lib/samlStrategy';

const handler = createRouter();

handler.use(passport.initialize());
handler.get(passport.authenticate('saml', {
  failureRedirect: '/',
  failureFlash: true
}));

export default handler.handler(); 