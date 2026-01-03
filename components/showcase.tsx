import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const showcaseItems = [
  {
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with Nano Banana's optimized neural engine",
    image: "/mountain-landscape.png",
  },
  {
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds using Nano Banana technology",
    image: "/beautiful-garden-with-colorful-flowers.jpg",
  },
  {
    title: "Real-time Beach Synthesis",
    description: "Nano Banana delivers photorealistic results at lightning speed",
    image: "/tropical-beach-with-palm-trees-sunset.jpg",
  },
  {
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly with Nano Banana AI",
    image: "/northern-lights-aurora-borealis-night-sky.jpg",
  },
]

export function Showcase() {
  return (
    <section id="showcase" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Showcase</h2>
          <p className="text-lg text-muted-foreground">Lightning-Fast AI Creations</p>
          <p className="text-muted-foreground mt-2">See what Nano Banana generates in milliseconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          {showcaseItems.map((item, index) => (
            <Card key={index} className="overflow-hidden border-border hover:border-primary/50 transition-colors">
              <div className="relative aspect-video">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                  <span className="mr-1">🍌</span>
                  Nano Banana Speed
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg mb-6">Experience the power of Nano Banana yourself</p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <span className="mr-2">Try Nano Banana Generator</span>
            <span>🍌</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
