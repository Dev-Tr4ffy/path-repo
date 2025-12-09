'use client';
import React from 'react';

export default function FileIrPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 w-64 transform bg-fps-blue lg:static lg:translate-x-0">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-fps-lightblue bg-fps-blue">
            <div className="flex items-center space-x-2">
              <svg className="lucide lucide-scale h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M7 21h10" />
                <path d="M12 3v18" />
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
              </svg>
              <div>
                <span className="text-lg font-bold text-white">FPS</span>
                <span className="text-xs text-fps-text block">HR Case Manager</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {[
              { name: 'Dashboard', href: '/dashboard', icon: 'home' },
              { name: 'All Cases', href: '/cases', icon: 'file-text' },
              { name: 'Employees', href: '/employees', icon: 'circle-user' },
              { name: 'File IR', href: '/file-ir', icon: 'file-warning', active: true },
              { name: 'Create NTE', href: '/create-nte', icon: 'alert-triangle' },
              { name: 'Settings', href: '/settings', icon: 'settings' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`group flex items-center px-2 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  link.active
                    ? 'bg-fps-lightblue text-white'
                    : 'text-fps-text hover:bg-fps-lightblue hover:text-white'
                }`}
              >
                <span className="mr-2 h-4 w-4 inline-block">🔗</span>
                {link.name}
              </a>
            ))}
          </nav>

          {/* User */}
          <div className="border-t border-fps-lightblue p-4 flex items-center">
            <div className="h-6 w-6 rounded-full bg-fps-lightblue flex items-center justify-center text-white text-xs">J</div>
            <div className="ml-2">
              <p className="text-xs font-medium text-white">Jane Smith</p>
              <p className="text-xs font-medium text-fps-text">hr manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">File Incident Report</h1>
        </header>

        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white p-6 shadow sm:rounded-lg">
            <form>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Employee ID *</label>
                  <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Employee Name *</label>
                  <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </div>
                <div className="sm:col-span-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Details of Incident Report</h4>
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">What</label>
                  <textarea rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">When *</label>
                  <input type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Where *</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm">
                    <option>Select location</option>
                    <option>Manila</option>
                    <option>Davao</option>
                    <option>Pune</option>
                    <option>Bogota</option>
                    <option>Kansas</option>
                  </select>
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Why</label>
                  <textarea rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">How</label>
                  <textarea rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Attachments</label>
                  <input type="file" multiple className="mt-1 block w-full text-sm text-gray-500" />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Approver EID *</label>
                  <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" className="px-4 py-2 border rounded-md text-sm bg-white text-gray-700 shadow-sm">
                  Save as Draft
                </button>
                <button type="button" className="px-4 py-2 border rounded-md text-sm bg-white text-gray-700 shadow-sm">
                  Print IR
                </button>
                <button type="submit" className="px-4 py-2 rounded-md text-sm bg-indigo-600 text-white shadow-sm hover:bg-indigo-700">
                  Submit IR
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
