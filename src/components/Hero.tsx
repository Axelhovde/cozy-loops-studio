import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-yarn.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/70" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">
          Little Loops
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover beautiful knitting patterns and premium craft beads for your next creative project
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <Button 
            asChild 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-warm"
          >
            <Link to="/knitting">
              Shop now
            </Link>
          </Button> */}
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="mt-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
          >
            <Link to="/shop">
              Shop now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;