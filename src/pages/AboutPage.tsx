import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Scissors, Palette } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-warm">
        <div className="container mx-auto text-center">
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
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-6">
                Little Loops began as a passion project in a cozy corner of our home, where the gentle click of knitting needles and the soft rustle of yarn created a symphony of creativity. What started as a personal love for crafting has blossomed into a community of makers who share our dedication to quality and beauty.
              </p>
              <p className="mb-6">
                We believe that every stitch tells a story, every bead holds a memory, and every handmade piece carries a piece of the maker's heart. Our carefully curated collection of knitting patterns and premium beads reflects our commitment to supporting both beginning crafters and seasoned artisans on their creative journeys.
              </p>
              <p>
                At Little Loops, we're not just selling supplies – we're nurturing a community where creativity flourishes, skills are shared, and beautiful things are born from simple materials and endless imagination.
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
              Our Values
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
                  Every pattern we design and every bead we select is chosen with care and attention to detail, ensuring quality that you can feel in every piece.
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
              <span className="text-4xl font-serif text-primary-foreground">SJ</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">
              Sarah Johnson
            </h3>
            <p className="text-muted-foreground mb-6">
              Founder & Pattern Designer
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              With over 15 years of knitting experience and a background in textile design, Sarah brings both technical expertise and artistic vision to every Little Loops creation. When not designing patterns, you'll find her experimenting with new color combinations and teaching local crafting workshops.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;