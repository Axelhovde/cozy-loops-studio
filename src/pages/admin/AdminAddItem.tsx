import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../helper/supabaseClient";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ImageItem {
  id: string;
  file: File;
  preview: string;
}

interface ColorImages {
  colorName: string;
  colorId?: number; // existing color id from DB
  images: ImageItem[];
}

const SortableImage = ({ image, index, onRemove }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-24 h-24 border border-gray-300 rounded-lg overflow-hidden"
    >
      <img src={image.preview} alt="preview" className="w-full h-full object-cover" />
      <button
        onClick={() => onRemove(index)}
        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
      >
        ×
      </button>
    </div>
  );
};

const AdminAddItem = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [productInfo, setProductInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState<ColorImages[]>([]);
  const [newColor, setNewColor] = useState("");
  const [existingColors, setExistingColors] = useState<{ color_id: number; color_name: string }[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  // fetch existing colors
  useEffect(() => {
    const fetchColors = async () => {
      const { data } = await supabase.from("colors").select("*");
      if (data) setExistingColors(data);
    };
    fetchColors();
  }, []);

  const handleFiles = (files: FileList, colorIndex: number) => {
    const newImages = Array.from(files).map((file) => ({
      id: URL.createObjectURL(file),
      file,
      preview: URL.createObjectURL(file),
    }));
    setColors((prev) => {
      const updated = [...prev];
      updated[colorIndex].images.push(...newImages);
      return updated;
    });
  };

  const handleRemoveImage = (colorIndex: number, imageIndex: number) => {
    setColors((prev) => {
      const updated = [...prev];
      updated[colorIndex].images = updated[colorIndex].images.filter((_, i) => i !== imageIndex);
      return updated;
    });
  };

  const handleDragEnd = (colorIndex: number, event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setColors((prev) => {
        const updated = [...prev];
        const oldIndex = updated[colorIndex].images.findIndex((img) => img.id === active.id);
        const newIndex = updated[colorIndex].images.findIndex((img) => img.id === over.id);
        updated[colorIndex].images = arrayMove(updated[colorIndex].images, oldIndex, newIndex);
        return updated;
      });
    }
  };

  const addNewColor = () => {
    if (!newColor) return;
    setColors((prev) => [...prev, { colorName: newColor, images: [] }]);
    setNewColor("");
  };

  const addExistingColor = (color: { color_id: number; color_name: string }) => {
    if (colors.some((c) => c.colorId === color.color_id)) return; // avoid duplicates
    setColors((prev) => [...prev, { colorName: color.color_name, colorId: color.color_id, images: [] }]);
  };

  const handleAddItem = async () => {
    if (!title || !description || !price || colors.length === 0) return;
    setLoading(true);

    try {
      // 1️⃣ Insert item
      const { data: newItem, error: itemError } = await supabase
        .from("items")
        .insert({
          item_name: title,
          description,
          product_info: productInfo,
          price,
          quantity: 1,
        })
        .select()
        .single();
      if (itemError) throw itemError;
      const itemId = newItem.item_id;

      // 2️⃣ Insert colors and photos
      for (const color of colors) {
        let colorId = color.colorId;

        // if it's a new color, insert into colors table
        if (!colorId) {
          const { data: newColorData, error: colorInsertError } = await supabase
            .from("colors")
            .insert({ color_name: color.colorName })
            .select()
            .single();
          if (colorInsertError) throw colorInsertError;
          colorId = newColorData.color_id;
        }

        // insert into item_colors
        const { data: itemColorData, error: itemColorError } = await supabase
          .from("item_colors")
          .insert({ item_id: itemId, color_id: colorId })
          .select()
          .single();
        if (itemColorError) throw itemColorError;
        const itemColorId = itemColorData.item_color_id;

        // upload images
        const photoUrls: string[] = [];
        for (let i = 0; i < color.images.length; i++) {
          const img = color.images[i];
          const fileExt = img.file.name.split(".").pop();
          const fileName = `${itemId}-${itemColorId}-${i + 1}.${fileExt}`;
          const filePath = `items/${itemId}/${fileName}`;
          const { error: uploadError } = await supabase.storage.from("items").upload(filePath, img.file, { upsert: true });
          if (uploadError) throw uploadError;
          const { data } = supabase.storage.from("items").getPublicUrl(filePath);
          photoUrls.push(data.publicUrl);
        }

        // insert photos
        const photoRows = photoUrls.map((url, index) => ({
          item_id: itemId,  
          item_color_id: itemColorId,
          photo_url: url,
          display_order: index + 1,
        }));
        const { error: photosError } = await supabase.from("item_photos").insert(photoRows);
        if (photosError) throw photosError;
      }

      navigate("/");
    } catch (err: any) {
      console.error("Error adding item:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>
      <div className="w-full max-w-3xl flex flex-col gap-4">
        <input type="text" placeholder="Title" className="border rounded p-3" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" className="border rounded p-3" value={description} onChange={(e) => setDescription(e.target.value)} />
        <textarea placeholder="Product Info" className="border rounded p-3" value={productInfo} onChange={(e) => setProductInfo(e.target.value)} />
        <input type="number" placeholder="Price" className="border rounded p-3" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} />

        {/* Existing Colors */}
        <div className="flex flex-wrap gap-2">
          {existingColors.map((color) => (
            <button
              key={color.color_id}
              type="button"
              className="px-3 py-1 border rounded hover:bg-gray-200"
              onClick={() => addExistingColor(color)}
            >
              {color.color_name}
            </button>
          ))}
        </div>

        {/* Add New Color */}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Add new color"
            className="border rounded p-2 flex-1"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
          <button type="button" onClick={addNewColor} className="bg-blue-500 text-white px-3 rounded">Add Color</button>
        </div>

        {/* Color Sections with Drag & Drop */}
        {colors.map((color, colorIndex) => (
          <div key={colorIndex} className="border p-4 rounded mb-4">
            <h3 className="font-medium mb-2">{color.colorName}</h3>
            <label className="border border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer">
              <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files, colorIndex)} />
              Upload images for this color
            </label>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(colorIndex, e)}>
              <SortableContext items={color.images.map((img) => img.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-wrap gap-4 mt-2">
                  {color.images.map((img, index) => (
                    <SortableImage key={img.id} image={img} index={index} onRemove={(i: number) => handleRemoveImage(colorIndex, i)} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        ))}

        <button onClick={handleAddItem} disabled={loading} className="bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition">
          {loading ? "Adding..." : "Add Item"}
        </button>
      </div>
    </div>
  );
};

export default AdminAddItem;
