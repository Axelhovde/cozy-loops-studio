import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";
import Stack from '@mui/material/Stack';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Stack spacing={-8}>
        <Navigation />
        <Hero />
      </Stack>
      {/* <FeaturedSection /> */}
      <Footer />

    </div>
  );
};

export default Index;

