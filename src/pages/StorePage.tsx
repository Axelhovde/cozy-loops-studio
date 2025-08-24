import SiteNavigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {  Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../helper/supabaseClient";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import CustomSwiper from "../components/CustomSlider";
import { Item } from "../interfaces/types";
import ProductCard from "@/components/ProductCard";


const StorePage = () => {
  const [items, setItems] = useState<Item[]>([]); 
  const navigate = useNavigate();

  useEffect(() => {
  const fetchItems = async () => {
    // Fetch items
    const { data: itemsData, error: itemsError } = await supabase
      .from("items")
      .select("*");
    if (itemsError) {
      console.error("Error fetching items:", itemsError);
      return;
    }

    // Fetch photos
    const { data: photosData, error: photoError } = await supabase
      .from("item_photos")
      .select("*");
    if (photoError) {
      console.error("Error fetching item photos:", photoError);
      return;
    }

    console.log("Fetched photosData:", photosData);

    // Fetch colors
    const { data: colorsData, error: colorsError } = await supabase
      .from("colors")
      .select("*");
    if (colorsError) {
      console.error("Error fetching colors:", colorsError);
      return;
    }

    // Fetch item_colors
    const { data: itemColorsData, error: itemColorsError } = await supabase
      .from("item_colors")
      .select("*");
    if (itemColorsError) {
      console.error("Error fetching item colors:", itemColorsError);
      return;
    }

    const formattedItems = itemsData?.map((item: any) => {
        // find all item_color relations for this item
        const relatedItemColors = itemColorsData?.filter(
          (ic: any) => ic.item_id === item.item_id
        ) || [];

        console.log(`Item ${item.item_id} - relatedItemColors:`, relatedItemColors);

        // map each related color into {id, name, photos}
        const colors = relatedItemColors.map((ic: any) => {
          const color = colorsData?.find((c: any) => c.color_id === ic.color_id);
          const photos = photosData
            ?.filter(
              (p: any) =>
                Number(p.item_id) === item.item_id &&
                Number(p.item_color_id) === ic.item_color_id
            )
            .map((p: any) => p.photo_url) || [];
          
            console.log(
      `Item ${item.item_id}, Color ${ic.color_id} (${color?.color_name}): photos`,
      photos
    );

          return {
            id: ic.color_id,
            name: color?.color_name || "Unknown",
            hex: color?.color_hex || "#ccc",
            photos,
          };
        });


        console.log(`Item ${item.item_id} final colors array:`, colors);

        return {
          id: item.item_id,
          title: item.item_name,
          description: item.description,
          price: item.price,
          rating: item.rating ?? 0,
          reviews: item.reviews ?? 0,
          colors,
        };
      });

      setItems(formattedItems || []); 
      }; 
      fetchItems(); }, []);

  const [selectedColors, setSelectedColors] = useState<{ [id: number]: number }>({});
  const onItemPressed = (itemId: number) => {
  navigate(`/item/${itemId}`);
};


return (
    <div className="min-h-screen bg-background">
      <SiteNavigation />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-warm">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6">
            Shop Our Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our handpicked collection of high-quality products
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-2">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <ProductCard 
                key={item.id} 
                item={item} 
                onItemPressed={onItemPressed} 
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StorePage;