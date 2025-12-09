import { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

function SsoPage({ decodedEID, decodedEmail, encodedEID, encodedEmail, hash }) {
    const router = useRouter();
  
    useEffect(() => {
        // Fetch user data from API
        const fetchUserData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/employee/getemployee?email=${decodedEmail}&eid=${decodedEID}&hash=${hash}`);
            const userData = await res.json();
            console.log('User Data:', userData);

            if (userData.message === 'User not found') {
                alert('Invalid user');
                router.push('/logout');  
            } else {
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('hrdistro', process.env.HR_DISTRO);
                localStorage.setItem('enceid', encodedEID);
                localStorage.setItem('encemail', encodedEmail);
                localStorage.setItem('apphash', hash);  
                router.push('/dashboard');
            }
        };

        fetchUserData();
    }, [decodedEmail, decodedEID, router, encodedEID, encodedEmail, hash]);

    return (
        // <div>
        //     <h1>Authenticating...</h1>
        //     <p>EID: {decodedEID}</p>
        //     <p>Email: {decodedEmail}</p>
        // </div>

        <div style={{
            display: 'flex',
            alignItems: 'center',    // Vertically centers the content
            justifyContent: 'center', // Horizontally centers the content
            height: '100vh',          // Use full viewport height
            fontFamily: 'sans-serif'
        }}>
            <p>Authenticating... Please wait.</p>
        </div>
    );
}

export async function getServerSideProps(context) {
    // Extracting from the page URL
    const { encodedEID, encodedEmail, hash } = context.query;
    const JWT_SECRET = process.env.JWT_SECRET;
    const HR_EMAIL = process.env.HR_DISTRO;

    if (!JWT_SECRET) {
        console.error("JWT Secret is undefined.");
        return { props: {} };
    }

    try {
        const decodedEID = jwt.verify(encodedEID, JWT_SECRET).eid;
        const decodedEmail = jwt.verify(encodedEmail, JWT_SECRET).email;

        return {
            props: {
                decodedEID,
                decodedEmail,
                hremail: HR_EMAIL,
                encodedEID,
                encodedEmail,
                hash,
            }
        };
    } catch (error) {
        console.error("JWT verification error:", error);
        return {
            redirect: {
                destination: '/error',  
                permanent: false,
            },
        };
    }
}

export default SsoPage;