import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SSO() {
  const [user, setUser] = useState(null);
  const router = useRouter();
    let hremail = "elbert.bernardo@fpsinc.com";

    // let email = "alfren.cordova@fpsinc.com";  // The email for which the details are to be fetched
    // let eid = "131494";    // Employee ID

    let email = "alfren.cordova@fpsinc.com";  // The email for which the details are to be fetched
    let eid = "131495";    // Employee ID


    // let email = "elbert.bernardo@fpsinc.com";  // The email for which the details are to be fetched
    // let eid = "131496";    // Employee ID

    // let email = "elbert.bernardo@fpsinc.com";  // The email for which the details are to be fetched
    // let eid = "131497";    // Employee ID

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`/api/employee/getemployee?email=${email}&eid=${eid}`);
        const userData = await res.json();
        console.log('user data');
        console.log(userData.message);

        if (userData.message === 'User not found') {
          router.push('/logout');
          return;
        }

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('hrdistro', hremail);
        router.push('/all-cases');
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/logout');
      }
    };

    fetchUserDetails();
  }, [email, eid, router]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <p>Authenticating... Please wait.</p>
    </div>
  );
}
