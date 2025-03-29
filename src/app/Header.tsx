import { useState, useRef, useEffect } from 'react';
import useConutryCode from '@/hooks/useConutryCode';
import Link from 'next/link';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const country = useConutryCode();
  const menuRef = useRef<any>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (event:any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-black text-white p-2 md:py-4">
      <div className=" mx-auto flex items-center justify-between px-4 md:px-12">
        {/* Logo */}
        <img src="/logo2.png" alt="Logo" className="w-20 md:w-28 h-auto" />

        {/* Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-6 text-sm">
          <Link href="/" className="hover:underline">
            Hiring
          </Link>
          <Link href="/about-us" className="hover:underline">
            About
          </Link>
          <Link href="/contact-us" className="hover:underline">
            Contact us
          </Link>
        </nav>

        {/* Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Country Info and Icon */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm">
            {country.region}, {country.countryName}
          </span>
          <img
            src="/location3.png"
            alt="Location Icon"
            className="w-6 h-6 rounded-full bg-white"
          />
        </div>
      </div>

      {/* Bottom Overlay Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed bottom-0 left-0 w-full bg-black text-white z-50 p-4 shadow-lg rounded-t-xl"
        >
          <nav className="flex items-center justify-around text-lg">
            <Link href="/" className="hover:underline">
              Hiring
            </Link>
            <Link href="/about-us" className="hover:underline">
              About
            </Link>
            <Link href="/contact-us" className="hover:underline">
              Contact us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
