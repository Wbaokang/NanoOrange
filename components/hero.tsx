"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Banana decorations */}
      <div className="absolute top-10 right-10 text-6xl md:text-8xl opacity-10 rotate-12 pointer-events-none">🍌</div>
      <div className="absolute bottom-20 left-10 text-5xl md:text-7xl opacity-10 -rotate-12 pointer-events-none">
        🍌
      </div>
      <div className="absolute top-1/2 right-1/4 text-4xl opacity-5 rotate-45 pointer-events-none hidden lg:block">
        🍌
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <span className="mr-1">🍌</span>
            The AI model that outperforms competitors
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-balance">
            Nano Banana
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Transform any image with simple text prompts. Nano Banana&apos;s advanced model delivers consistent
            character editing and scene preservation. Experience the future of AI image editing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <span className="mr-2">Start Editing</span>
              <span>🍌</span>
            </Button>
            <Button size="lg" variant="outline">
              View Examples
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>One-shot editing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Multi-image support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Natural language</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
