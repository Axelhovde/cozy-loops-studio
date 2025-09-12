import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import knittingImage from "@/assets/knitting-patterns.jpg";
import beadsImage from "@/assets/beads-collection.jpg";

const FeaturedSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated selection of knitting patterns and premium craft beads
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Knitting Patterns Card */}
          <Card className="group overflow-hidden shadow-soft hover:shadow-warm transition-all duration-300 border-border/50">
            <div className="relative overflow-hidden">
              <img 
                src={knittingImage}
                alt="Beautiful knitting patterns"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                Knitting Patterns
              </h3>
              <p className="text-muted-foreground mb-6">
                From cozy sweaters to intricate lacework, discover patterns for every skill level. 
                Each design comes with detailed instructions and helpful tips.
              </p>
              <Button 
                asChild 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/store">
                  Explore Patterns
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Beads Card */}
          <Card className="group overflow-hidden shadow-soft hover:shadow-warm transition-all duration-300 border-border/50">
            <div className="relative overflow-hidden">
              <img 
                src={beadsImage}
                alt="Premium craft beads collection"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                Premium Beads
              </h3>
              <p className="text-muted-foreground mb-6">
                High-quality glass, ceramic, and natural stone beads in beautiful colors. 
                Perfect for jewelry making and craft embellishments.
              </p>
              <Button 
                asChild 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/store">
                  Shop Beads
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;