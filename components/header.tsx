"use client"

import { AuthButton } from "@/components/auth-button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍌</span>
          <span className="text-xl font-bold">Nano Banana</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#editor" className="text-sm font-medium hover:text-primary transition-colors">
            Editor
          </a>
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#showcase" className="text-sm font-medium hover:text-primary transition-colors">
            Showcase
          </a>
          <a href="#reviews" className="text-sm font-medium hover:text-primary transition-colors">
            Reviews
          </a>
          <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
            FAQ
          </a>
        </nav>

        <AuthButton />
      </div>
    </header>
  )
}
