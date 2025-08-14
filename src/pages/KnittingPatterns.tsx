import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Download, Heart } from "lucide-react";

const patterns = [
  {
    id: 1,
    title: "Cozy Cable Sweater",
    difficulty: "Intermediate",
    time: "4-6 weeks",
    price: "$12.99",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    description: "A classic cable-knit sweater perfect for fall weather."
  },
  {
    id: 2,
    title: "Fair Isle Hat",
    difficulty: "Beginner",
    time: "1-2 weeks",
    price: "$8.99",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&h=300&fit=crop",
    description: "Traditional Fair Isle colorwork in a modern beanie style."
  },
  {
    id: 3,
    title: "Lace Shawl",
    difficulty: "Advanced",
    time: "3-4 weeks",
    price: "$15.99",
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&h=300&fit=crop",
    description: "Delicate lace pattern for an elegant evening shawl."
  },
  {
    id: 4,
    title: "Baby Blanket",
    difficulty: "Beginner",
    time: "2-3 weeks",
    price: "$10.99",
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
    description: "Soft and cuddly blanket perfect for little ones."
  },
  {
    id: 5,
    title: "Textured Scarf",
    difficulty: "Intermediate",
    time: "1-2 weeks",
    price: "$9.99",
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&h=300&fit=crop",
    description: "Modern textured pattern with beautiful drape."
  },
  {
    id: 6,
    title: "Aran Cardigan",
    difficulty: "Advanced",
    time: "6-8 weeks",
    price: "$18.99",
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
    description: "Traditional Aran patterns in a modern cardigan silhouette."
  }
];

const KnittingPatterns = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-sage-green text-primary-foreground";
      case "Intermediate":
        return "bg-terracotta text-primary-foreground";
      case "Advanced":
        return "bg-dusty-rose text-primary-foreground";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-warm">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6">
            Knitting Patterns
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of beautiful, carefully crafted knitting patterns for every skill level
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 border-b border-border">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="border-primary text-primary">
              All Patterns
            </Button>
            <Button variant="ghost">Beginner</Button>
            <Button variant="ghost">Intermediate</Button>
            <Button variant="ghost">Advanced</Button>
            <Button variant="ghost">Sweaters</Button>
            <Button variant="ghost">Accessories</Button>
            <Button variant="ghost">Home Decor</Button>
          </div>
        </div>
      </section>

      {/* Patterns Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patterns.map((pattern) => (
              <Card key={pattern.id} className="group overflow-hidden shadow-soft hover:shadow-warm transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={pattern.image}
                    alt={pattern.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Badge className={`absolute top-4 left-4 ${getDifficultyColor(pattern.difficulty)}`}>
                    {pattern.difficulty}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">
                    {pattern.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {pattern.description}
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(pattern.rating)
                              ? "text-terracotta fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({pattern.reviews})
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                    <span>Time: {pattern.time}</span>
                    <span className="text-lg font-bold text-primary">{pattern.price}</span>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Download className="h-4 w-4 mr-2" />
                    Download Pattern
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KnittingPatterns;