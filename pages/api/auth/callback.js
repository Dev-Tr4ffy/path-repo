import { createRouter } from 'next-connect';
import passport from '../../../lib/samlStrategy'; 
import withSession from '../../../utils/session';
import pool from '../../../lib/postgres'; // Adjust path to wherever your pool is configured
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const handler = createRouter();

handler.use(passport.initialize());
handler.post(
    passport.authenticate('saml', {
        failureRedirect: '/',
        failureFlash: true
    }), 
    async (req, res) => {
        console.log('User authenticated, setting session:', req.user);
        req.session.set("user", { emailAddress: req.user.emailAddress, employeeNumber: req.user.employeeNumber });

        const randomHash = crypto.randomBytes(25).toString('hex');

        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 24);

        
        try {
            const result = await pool.query(
                'UPDATE employee SET hash=$1, expiry=$2 WHERE eid=$3 AND email=$4',
                [randomHash, expiryDate, req.user.employeeNumber, req.user.emailAddress]
            );

            if (result.rowCount === 1) {
                const encodedEID = jwt.sign({ eid: req.user.employeeNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const encodedEmail = jwt.sign({ email: req.user.emailAddress }, process.env.JWT_SECRET, { expiresIn: '1h' });

                console.log('User saved in session and DB updated--------------');
                res.redirect(`${process.env.BASE_PATH}/sso/${randomHash}/${encodedEID}/${encodedEmail}`);
            } else {
                console.error("Database update failed.");
                res.status(500).send('Failed to update user details.');
            }
        } catch (error) {
            console.error('Database error during user update:', error);
            res.status(500).send('Database error');
        }
    }
);

export default withSession(handler.handler());