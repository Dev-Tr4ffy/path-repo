import { useEffect, useState } from 'react';

export default function SSO() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState('');
  const [user, setUser] = useState(null);

  const hremail = "elbert.bernardo@fpsinc.com";

  const employees = [
    { label: 'EMPLOYEE1 131494', email: 'alfren.cordova@fpsinc.com', eid: '131494' },
    { label: 'SUPERVISOR1 121040', email: 'alfren.cordova@fpsinc.com', eid: '121040' },
    { label: 'SUPERVISOR2 128370', email: 'alfren.cordova@fpsinc.com', eid: '128370' },
    { label: 'SUPERVISOR3 110175', email: 'alfren.cordova@fpsinc.com', eid: '110175' },
    { label: 'HR 141164', email: 'alfren.cordova@fpsinc.com', eid: '141164' },
    { label: 'HR2 141068', email: 'alfren.cordova@fpsinc.com', eid: '141068' },
  ];

  const handleLogin = async () => {
    if (!selectedUser) {
      setLoginStatus('Please select a user');
      return;
    }

    const { email, eid } = selectedUser;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/employee/getemployeebypass?email=${email}&eid=${eid}`);
      const userData = await res.json();
      console.log('User Data:', userData);

      if (userData.message === 'User not found') {
        setLoginStatus('Invalid user');
        setUser(null);
      } else {
        setLoginStatus('Login successful');
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('hrdistro', hremail);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoginStatus('Error occurred while logging in');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Select Employee</h2>

      {employees.map((emp, index) => (
        <div key={index} style={{ marginBottom: '0.5rem' }}>
          <label>
            <input
              type="radio"
              name="employee"
              value={emp.eid}
              onChange={() => setSelectedUser(emp)}
            />
            {` ${emp.label}`}
          </label>
        </div>
      ))}

      <button
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={handleLogin}
      >
        Login
      </button>

      {loginStatus && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          {loginStatus}
        </p>
      )}
    </div>
  );
}
