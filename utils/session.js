import { withIronSession } from 'next-iron-session';

const sessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "next.js/examples/with-iron-session",
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'Lax', // or 'None' if you face issues with cross-domain requests in development
        path: '/',
    },
};

// This function wraps api functions to handle session
function withSession(handler) {
    console.log('Environment variable:', process.env.SECRET_COOKIE_PASSWORD);
    return withIronSession(handler, sessionOptions);
}

export default withSession;