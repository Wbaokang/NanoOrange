import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Editor } from "@/components/editor"
import { Showcase } from "@/components/showcase"
import { Reviews } from "@/components/reviews"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Editor />
      <Features />
      <Showcase />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  )
}
