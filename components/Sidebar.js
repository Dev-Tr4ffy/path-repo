import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Home,
  FileText,
  CircleUser,
  AlertTriangle,
  Settings,
} from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandAllCases, setExpandAllCases] = useState(false); // State to control the expansion of "All Cases"

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userJSON = localStorage.getItem('user');
      if (userJSON) {
        setUser(JSON.parse(userJSON));
      } else {
        console.log('NO CREDENTIALS : ');
        router.push('/logout');
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <p>Loading...</p>
    </div>;
  }

  const navItems = () => {
      let items = [];

      if (user) {
        if (user.subcount !== '0' || user.role_id === '4') {
          items.push({ href: '/dashboard', label: 'Dashboard', icon: Home });
        }

        items.push({
          href: '#',
          label: 'Cases',
          icon: FileText,
          onClick: () => setExpandAllCases(!expandAllCases), // Toggle visibility of sub-links
          subLinks: [
            //{ href: '/all-cases', label: 'All Cases' },
            { href: '/all-cases/filedcases', label: 'My Filed Cases' },
            { href: '/all-cases/againstme', label: 'Cases Against Me' },
            { href: '/all-cases/myactionablecases', label: 'My Actionable Cases' },
          ]
        });

        items.push({ href: '/ir-filing/0', label: 'File IR', icon: AlertTriangle });

        if (user.subcount !== '0' || user.role_id === '4') {
          items.push({ href: '/nte-filing', label: 'File NTE', icon: AlertTriangle });
          items.push({ href: '/nod-filing', label: 'File NOD', icon: AlertTriangle });
        }

        if (user.role_id === '4') {
          items.push({ href: '/reports', label: 'Reports', icon: FileText });
        }
      }

      items.push({ href: '/settings', label: 'Settings', icon: Settings });

      return items;
  };

  return (
    <div className="fixed inset-y-0 left-0 z-30 transform transition-all duration-300 ease-in-out lg:static lg:inset-0 -translate-x-full lg:translate-x-0 w-64">
      <div className="h-full flex flex-col bg-fps-blue">
        <div className="flex items-center justify-between h-16 px-4 bg-fps-blue border-b border-fps-lightblue">
          <div className="flex items-center space-x-2">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/fps.png`} alt="FPS Logo" className="h-8 w-8 object-contain" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">FPS - ERMS</span>
              <span className="text-xs text-fps-text">HR Case Manager</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1 text-xs font-medium">
            {navItems().map(({ href, label, icon: Icon, onClick, subLinks }) => (
              <>
                <Link
                  key={href}
                  href={href}
                  onClick={onClick}
                  className="group flex items-center px-2 py-1.5 rounded-md transition-colors text-fps-text hover:bg-fps-lightblue hover:text-white"
                >
                  <Icon className="h-4 w-4 flex-shrink-0 mr-2" strokeWidth={2} />
                  {label}
                </Link>
                {subLinks && expandAllCases && subLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="pl-10 group flex items-center py-1.5 rounded-md transition-colors text-fps-text hover:bg-fps-lightblue hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </>
            ))}
          </nav>
        </div>

        <div className="border-t border-fps-lightblue p-4">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-fps-lightblue flex items-center justify-center text-white">
              <span className="text-xs">{user ? user.first_name[0] : 'U'}</span>
            </div>
            <div className="ml-2">
              <p className="text-xs font-medium text-white">{`${user ? `${user.first_name} ${user.last_name}` : 'User'}`}</p>
              <p className="text-xs font-medium text-fps-text">{user ? user.emp_position || 'Position' : 'Position'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}