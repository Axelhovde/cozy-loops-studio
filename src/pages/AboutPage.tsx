import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Scissors, Palette } from "lucide-react";
import backgroundImage from "@/assets/hero-beads.png";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* 70% overlay (same as Hero) */}
          <div className="absolute inset-0 bg-background/70" />
        </div>

        {/* Content */}
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6">
            About Little Loops
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about crafting beautiful handmade pieces, one loop at a time
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">
              My Story
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-6">
                A couple of months ago, I picked up a new hobby that quickly grew into a passion: making beads and crafting jewelry. What started as simple curiosity soon became a way for me to slow down, create with my hands, and bring small pieces of beauty into everyday life.
              </p>
              <p className="mb-6">
               Each necklace and bracelet I make is put together with care, focusing on colors, textures, and the joy of creating something unique. For me, it’s not just about beads — it’s about the stories, memories, and little sparks of happiness that handmade pieces can carry.
              </p>
              <p className="mb-6">
               Right now, I’m excited to be sharing my work at local markets and I’m working on turning this website into a place where you can explore and order my creations online.
               </p>
              <p>
                Thank you for being here at the very beginning of this journey — I can’t wait to see where it goes, and I hope you find something that speaks to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">
              My Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">
                  Crafted with Love
                </h3>
                <p className="text-muted-foreground">
                  Every bead we select is chosen with care and attention to detail, ensuring quality that you can feel in every piece.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-dusty-rose rounded-full flex items-center justify-center mx-auto mb-6">
                  <Scissors className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">
                  Skill Building
                </h3>
                <p className="text-muted-foreground">
                  We create patterns and tutorials that help crafters grow their skills, from first stitches to intricate masterpieces.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palette className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">
                  Creative Expression
                </h3>
                <p className="text-muted-foreground">
                  We believe in the power of creativity to bring joy, build confidence, and connect people through the shared language of handmade beauty.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-12">
            Meet the Maker
          </h2>
          
          <div className="bg-card rounded-lg p-8 shadow-soft">
            <div className="w-32 h-32 bg-gradient-sage rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl font-serif text-primary-foreground">NW</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">
              Natalie Winger
            </h3>
            <p className="text-muted-foreground mb-6">
              Founder & Pattern Designer
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Natalie has always loved creating with her hands, and beads quickly captured her heart. What started as a hobby soon grew into Little Loops, a place where she shares her passion for crafting unique jewelry and decorative pieces. Natalie draws inspiration from colors, textures, and the little details that make every design special.
            </p>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
              She loves seeing how a simple bead can transform into something beautiful and enjoys sharing that joy with the crafting community. At Little Loops, every piece reflects her creativity and her belief that crafting is about connection, expression, and endless possibilities.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;