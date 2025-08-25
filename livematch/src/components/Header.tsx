import React from "react"
import Link from "next/link"

interface HeaderProps {
  title: string
  currentPage?: string
}

export default function Header({ title, currentPage = "points" }: HeaderProps) {
  const navItems = [
    { name: "Home", href: "/", id: "home" },
    { name: "Matches", href: "/matches", id: "matches" },
    { name: "Points", href: "/points", id: "points" },
    { name: "Teams", href: "/teams", id: "teams" },
    { name: "Stats", href: "/stats", id: "stats" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img src="/IPLLOGO.jpg" alt="IPL Logo" className="h-10 w-auto object-contain cursor-pointer" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold tracking-wide text-gray-900">{title}</h1>
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
      </div>
    </header>
  )
}
