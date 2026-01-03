export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍌</span>
            <span className="text-xl font-bold">Nano Banana</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#editor" className="hover:text-foreground transition-colors">
              Editor
            </a>
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#showcase" className="hover:text-foreground transition-colors">
              Showcase
            </a>
            <a href="#reviews" className="hover:text-foreground transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">© 2025 Nano Banana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
