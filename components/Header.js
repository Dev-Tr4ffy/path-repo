import React, { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    }
  }, []);

  const firstLetter = user?.first_name ? user.first_name[0] : 'U';
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'User';

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Sidebar toggle and search */}
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                <line x1="21" x2="3" y1="6" y2="6" />
                <line x1="15" x2="3" y1="12" y2="12" />
                <line x1="17" x2="3" y1="18" y2="18" />
              </svg>
            </button>

            <div className="hidden md:flex md:items-center md:space-x-4 ml-2">
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <svg className="h-5 w-5 text-gray-400" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg> */}
                </div>
                {/* <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search cases..."
                /> */}
              </div>
            </div>
          </div>

          {/* Right section: Notifications & user menu */}
          <div className="flex items-center space-x-4">
            {/* <button
              type="button"
              className="p-2 rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
            >
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
            </button> */}

            <div className="relative">
              <button
                type="button"
                className="flex items-center max-w-xs rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <span>{firstLetter}</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">{fullName}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
