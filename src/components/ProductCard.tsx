import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Item } from "../interfaces/types";


const ProductCard = ({ item, onItemPressed }: { item: Item; onItemPressed: (id: number) => void }) => {
  const [selectedColor, setSelectedColor] = useState(item.colors[0]);

  // Only take the first two photos
  const photos = selectedColor.photos.slice(0, 2);


  return (
    <Card
      key={item.id}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("button")) {
          onItemPressed(Number(item.id));
        }
      }}
      className="group overflow-hidden flex-row  max-w-[350px] aspect-[3/4] transition-all duration-300 rounded-none"
    >
        {/* Image container (takes ~85% of card) */}
<div className="relative h-[85%] overflow-hidden group">
  {/* Heart button (always visible) */}
  <Button
    size="icon"
    variant="ghost"
    className="absolute top-4 right-4 bg-background/80 hover:bg-background z-10"
  >
    <Heart className="h-4 w-4" />
  </Button>

  {/* Color swatches (always visible) */}
  <div className="absolute bottom-2 right-2 z-10 flex flex-wrap">
    {item.colors.map((color) => (
      <button
        key={color.id}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedColor(color);
        }}
        className={`w-6 h-6 m-1 rounded-full border-2 transition ${
          selectedColor.id === color.id ? "border-primary scale-110" : "border-muted-foreground"
        }`}
        style={{ backgroundColor: color.hex || "#ccc" }}
      />
    ))}
  </div>

  {/* Quick Add button (only visible on hover) */}
  <Button
  className="absolute bottom-2 left-2 w-[25%] px-2 text-xs bg-background border border-foreground text-foreground opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-primary hover:text-primary-foreground hover:border-none z-10"
>
  Quick add
</Button>


  {/* Photos (swap on hover) */}
  {photos.length > 0 && (
    <img
      src={photos[0]}
      alt={item.title}
      className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
    />
  )}
  {photos.length > 1 && (
    <img
      src={photos[1]}
      alt={item.title}
      className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
    />
  )}
</div>

      
      <CardContent className="p-6 flex justify-between items-center bg-background">
        {/* Title */}
        <h3 className="text-lg font-sans text-foreground">
          {item.title}
        </h3>

        {/* Price */}
        <span className="text-lg font-sans text-foreground">
          {item.price} NOK
        </span>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
