import { Facebook, Twitter, Instagram, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-primary">Company Name</h2>
            <p className="text-muted-foreground mt-2">Making the world a better place</p>
          </div>
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Services</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
            </ul>
          </nav>
          <div className="flex space-x-2">
            <Button size="icon" variant="ghost">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button size="icon" variant="ghost">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button size="icon" variant="ghost">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button size="icon" variant="ghost">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  )
}