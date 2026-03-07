import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-white">
              Halestorm 🔥
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Home
              </a>
              {/* <a
                href="/resources"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Resources
              </a> */}
              <a
                href="/blog"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Blog
              </a>
              <a
                href="/projects"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Projects
              </a>
              {/* <a
                href="/contact"
                className="rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Contact
              </a> */}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Home
            </a>
            {/* <a
              href="/resources"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Resources
            </a> */}
            <a
              href="/blog"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Blog
            </a>
            <a
              href="/projects"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Projects
            </a>
            {/* <a
              href="/contact"
              className="block rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-base font-medium text-white hover:opacity-90"
            >
              Contact
            </a> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export { Navbar };
