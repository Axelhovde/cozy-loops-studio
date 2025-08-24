import { Link } from "react-router-dom";
import { Heart, Instagram, Facebook, Palette } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">
              Little Loops
            </h3>
            <p className="text-muted-foreground mb-6">
              Creating beautiful handmade pieces with love, one loop at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Palette className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/shop" className="block text-muted-foreground hover:text-primary transition-colors">
                Shop
              </Link>
              {/* <Link to="/beads" className="block text-muted-foreground hover:text-primary transition-colors">
                Beads
              </Link> */}
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Customer Care</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Shipping Info
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Returns
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Size Guide
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Stay Connected</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Get the latest patterns and crafting tips delivered to your inbox.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-dusty-rose fill-current" /> by Little Loops
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;