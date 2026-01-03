import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Sarah Chen",
    role: "Digital Creator",
    content:
      "This editor completely changed my workflow. The character consistency is incredible - miles ahead of other tools!",
    avatar: "/professional-woman-portrait.png",
  },
  {
    name: "Michael Rodriguez",
    role: "UGC Specialist",
    content:
      "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
    avatar: "/professional-man-portrait.png",
  },
  {
    name: "Emma Thompson",
    role: "Professional Editor",
    content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
    avatar: "/professional-woman-smiling.png",
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">User Reviews</h2>
          <p className="text-lg text-muted-foreground">What creators are saying</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="border-border">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">&quot;{review.content}&quot;</p>
                <div className="flex items-center gap-3">
                  <img src={review.avatar || "/placeholder.svg"} alt={review.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
