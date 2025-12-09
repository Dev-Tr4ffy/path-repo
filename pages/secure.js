// Full path: /pages/secure.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Secure({ user }) {
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/api/auth/dashboard');
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome to the Secure Page</h1>
      <p>Email: {user.emailAddress}</p>
      <p>Employee Number: {user.employeeNumber}</p>
    </div>
  );
}

Secure.getInitialProps = ({ req }) => {
  return { user: req?.session?.user ?? null };
};