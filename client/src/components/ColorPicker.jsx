import React, { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  const colors = [
    { name: "Black", value: "#1F2937" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
  ];

  // Closing when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg 
                   bg-gradient-to-br from-purple-50 to-purple-100 
                   hover:ring-1 ring-purple-300 transition-all"
        style={{ color: selectedColor }}
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-20 bg-white border 
                        border-gray-200 rounded-lg shadow-md p-3 w-64
                        grid grid-cols-4 gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
              className="relative flex flex-col items-center focus:outline-none"
            >
              <div
                className="w-11 h-11 rounded-full border-2 border-transparent 
                           hover:border-black/20 transition"
                style={{ backgroundColor: color.value }}
              />

              {selectedColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="text-white size-5" />
                </div>
              )}

              <span className="text-[11px] mt-1 text-gray-600">
                {color.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
