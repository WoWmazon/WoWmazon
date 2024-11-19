"use client";
import { useEffect, useRef, useState } from "react";
import categoryArrowDown from "@/assets/icons/product_category_arrow_down.svg";
import Image from "next/image";
import CategoryDropDownButton from "./category-drop-down-button";

const CategoryDropDown = ({ categories, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>("All");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (category: string) => {
    setActiveCategory(category);
    onSelect(category);
    setIsOpen(false);
  };
  // 드롭다운 외부 클릭 감지
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  // 외부 클릭 감지 이벤트 추가
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 드롭다운 버튼 */}
      <div
        onClick={toggleDropdown}
        className="bg-SYSTEM-white w-[343px] h-10 px-4 py-2 flex items-center justify-between cursor-pointer border border-ELSE-EC"
      >
        <span className="text-md text-ELSE-33">{activeCategory || "All"}</span>
        <div className={`transform  ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <Image
            src={categoryArrowDown}
            width={24}
            height={24}
            alt="category-arrow"
          />
        </div>
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