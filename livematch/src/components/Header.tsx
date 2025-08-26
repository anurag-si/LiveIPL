"use client";

import React, { useState } from "react"
import Link from "next/link"

interface HeaderProps {
  title: string
  currentPage?: string
}

export default function Header({ title, currentPage = "home" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", id: "home" },
    { name: "Matches", href: "/matches", id: "matches" },
    { name: "Points", href: "/points", id: "points" },
    { name: "Teams", href: "/teams", id: "teams" },
    { name: "Stats", href: "/stats", id: "stats" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img src="/IPLLOGO.jpg" alt="IPL Logo" className="h-8 w-auto sm:h-10 object-contain cursor-pointer" />
          </Link>
          <h1 className="text-base sm:text-lg md:text-xl font-semibold tracking-wide text-gray-900 leading-tight">{title}</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-gray-600 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`transition-colors ${
                currentPage === item.id
                  ? "text-blue-600 font-medium"
                  : "hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentPage === item.id
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
