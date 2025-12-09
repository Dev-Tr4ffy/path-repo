import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Home,
  FileText,
  CircleUser,
  AlertTriangle,
  Settings,
} from 'lucide-react';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if component is mounted client side and if local storage is available
    if (typeof window !== 'undefined') {
      const userJSON = localStorage.getItem('user');
      if (userJSON) {
        setUser(JSON.parse(userJSON));
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  const firstLetter = user?.first_name ? user.first_name[0] : 'U';
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'User';
  const employeePosition = user?.emp_position || 'Position';
  const employeerole = user ? user.role_id : '';
  const subor = user ? user.subcount : 0;

  const navItems = [
    ...(subor !== 0 || employeerole === 4 ? [
      { href: '/dashboard', label: 'Dashboard', icon: Home },
    ] : []),
    { href: '/all-cases', label: 'All Cases', icon: FileText },
    //{ href: '/employees', label: 'Employees', icon: CircleUser },
    { href: '/ir-filing/0', label: 'File IR', icon: AlertTriangle },
    ...(subor !== 0 || employeerole === 4 ? [
      { href: '/nte-filing', label: 'File NTE', icon: AlertTriangle },
      { href: '/nod-filing', label: 'File NOD', icon: AlertTriangle },
    ] : []),
    ...(employeerole === 4 ? [
      { href: '/reports', label: 'Reports', icon: FileText },
    ] : []),
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-30 transform transition-all duration-300 ease-in-out lg:static lg:inset-0 -translate-x-full lg:translate-x-0 w-64">
      <div className="h-full flex flex-col bg-fps-blue">
        <div className="flex items-center justify-between h-16 px-4 bg-fps-blue border-b border-fps-lightblue">
          <div className="flex items-center space-x-2">
            <img src="/fps.png" alt="FPS Logo" className="h-8 w-8 object-contain" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">FPS - ERMS</span>
              <span className="text-xs text-fps-text">HR Case Manager</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1 text-xs font-medium">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center px-2 py-1.5 rounded-md transition-colors text-fps-text hover:bg-fps-lightblue hover:text-white"
              >
                <Icon className="h-4 w-4 flex-shrink-0 mr-2" strokeWidth={2} />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-fps-lightblue p-4">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-fps-lightblue flex items-center justify-center text-white">
              <span className="text-xs">{firstLetter}</span>
            </div>
            <div className="ml-2">
              <p className="text-xs font-medium text-white">{fullName}</p>
              <p className="text-xs font-medium text-fps-text">{employeePosition}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}