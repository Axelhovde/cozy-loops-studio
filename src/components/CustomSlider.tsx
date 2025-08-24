import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules';


type CustomSwiperProps = {
  photos: string[];
  title: string;
};

const CustomSwiper = ({ photos, title }: CustomSwiperProps) => {
  const swiperRef = useRef<any>(null);

  return (
    <div className="relative">
      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        slidesPerView={1}
        spaceBetween={10}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <img
              src={photo}
              alt={title}
              draggable={false}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev */}
      <button
        type="button"
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                   cursor-pointer flex items-center justify-center
                   w-10 h-10 bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          swiperRef.current?.slidePrev();
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <ChevronLeft size={30} className="pointer-events-none" />
      </button>

      {/* Next */}
      <button
        type="button"
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                   cursor-pointer flex items-center justify-center
                   w-10 h-10 bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          swiperRef.current?.slideNext();
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <ChevronRight size={30} className="pointer-events-none" />
      </button>
    </div>
  );
};

export default CustomSwiper;