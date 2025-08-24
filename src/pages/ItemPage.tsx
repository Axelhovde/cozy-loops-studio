import SiteNavigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../helper/supabaseClient";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

type Item = {
  id: number;
  title: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  photos: string[];
};

type CustomSwiperProps = {
  photos: string[];
  title: string;
};

const CustomSwiper = ({ photos, title }: CustomSwiperProps) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        slidesPerView={1}
        spaceBetween={10}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <img
              src={photo}
              alt={title}
              className="w-full h-[500px] object-cover transition-transform duration-500 hover:scale-105"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        ref={prevRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background rounded-full shadow-md cursor-pointer hover:bg-primary/10 transition"
      >
        <ChevronLeft size={28} />
      </div>
      <div
        ref={nextRef}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background rounded-full shadow-md cursor-pointer hover:bg-primary/10 transition"
      >
        <ChevronRight size={28} />
      </div>
    </div>
  );
};

const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      const { data: itemsData } = await supabase
        .from("items")
        .select("*")
        .eq("item_id", id)
        .single();

      const { data: photosData } = await supabase
        .from("item_photos")
        .select("*")
        .eq("item_id", id);

      if (itemsData) {
        setItem({
          id: itemsData.id,
          title: itemsData.title,
          description: itemsData.description,
          price: itemsData.price,
          rating: itemsData.rating ?? 0,
          reviews: itemsData.reviews ?? 0,
          photos: photosData?.map((p: any) => p.photo_url) || [],
        });
      }
    };

    fetchItem();
  }, [id]);

  if (!item) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background text-primary">
      <SiteNavigation />

      <div className="container mx-auto py-16 px-4 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Product Images */}
          <CustomSwiper photos={item.photos} title={item.title} />

          {/* Right: Product Info */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-bold">{item.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold">{item.price}</span>
              <span className="text-sm text-muted-foreground">
                {item.rating.toFixed(1)} ⭐ ({item.reviews} reviews)
              </span>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground">{item.description}</p>

            <button className="mt-4 bg-primary text-background font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-primary/90 transition">
              Add to Cart
            </button>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="p-2 border border-muted-foreground rounded-lg cursor-pointer hover:bg-primary/10 transition">
                Size: S
              </div>
              <div className="p-2 border border-muted-foreground rounded-lg cursor-pointer hover:bg-primary/10 transition">
                Size: M
              </div>
              <div className="p-2 border border-muted-foreground rounded-lg cursor-pointer hover:bg-primary/10 transition">
                Size: L
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItemPage;
