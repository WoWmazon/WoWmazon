"use client";
import { useState } from "react";
import categoryArrowDown from "@/assets/icons/product_category_arrow_down.svg";
import categoryArrowUp from "@/assets/icons/product_category_arrow_up.svg";
import Image from "next/image";
import CategoryDropDownButton from "./category-drop-down-button";

const CategoryDropDown = ({ categories, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>("All");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (category: string) => {
    setActiveCategory(category);
    onSelect(category);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* 드롭다운 버튼 */}
      <div
        onClick={toggleDropdown}
        className="bg-SYSTEM-white w-[343px] h-10 px-4 py-2 flex items-center justify-between cursor-pointer border border-ELSE-EC"
      >
        <span className="text-md text-ELSE-33">{activeCategory || "All"}</span>
        <Image
          src={isOpen ? categoryArrowUp : categoryArrowDown}
          width={24}
          height={24}
          alt="category-arrow"
        />
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute  w-[343px] h-[352px] overflow-auto shadow-lg rounded-sm z-10">
          {categories.map((category, idx) => (
            <CategoryDropDownButton
              key={idx}
              label={category}
              isActive={activeCategory === category}
              onClick={() => handleSelect(category)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropDown;
