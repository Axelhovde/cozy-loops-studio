import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      {/* Top banner */}
      <div className="bg-sage-green text-primary-foreground py-2 text-center text-sm">
        Free shipping on orders over $75
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold text-primary">
            Little Loops
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors hover:text-primary ${isActive('/') ? 'text-primary font-medium' : 'text-muted-foreground'}`}
            >
              Home
            </Link>
            <Link 
              to="/knitting" 
              className={`transition-colors hover:text-primary ${isActive('/knitting') ? 'text-primary font-medium' : 'text-muted-foreground'}`}
            >
              Knitting Patterns
            </Link>
            <Link 
              to="/beads" 
              className={`transition-colors hover:text-primary ${isActive('/beads') ? 'text-primary font-medium' : 'text-muted-foreground'}`}
            >
              Beads
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors hover:text-primary ${isActive('/about') ? 'text-primary font-medium' : 'text-muted-foreground'}`}
            >
              About
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded transition-colors ${isActive('/') ? 'bg-secondary text-primary' : 'hover:bg-secondary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/knitting" 
                className={`px-4 py-2 rounded transition-colors ${isActive('/knitting') ? 'bg-secondary text-primary' : 'hover:bg-secondary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Knitting Patterns
              </Link>
              <Link 
                to="/beads" 
                className={`px-4 py-2 rounded transition-colors ${isActive('/beads') ? 'bg-secondary text-primary' : 'hover:bg-secondary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Beads
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-2 rounded transition-colors ${isActive('/about') ? 'bg-secondary text-primary' : 'hover:bg-secondary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;