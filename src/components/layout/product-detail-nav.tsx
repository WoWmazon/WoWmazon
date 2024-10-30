"use client";
import IconButton from "../common/custom-icon-button";
import { useState } from "react";
import { iconButtons } from "@/constants/bottom-nav-button";
import BottomNavIconButton from "./bottom-nav-iconButton";
import add from "@/assets/icons/addProduct.svg";
import { useRouter } from "next/navigation";

const ProductDetailNav = () => {
  const [isActiveButton, setIsActiveButton] = useState<number | null>(null);
  const router = useRouter();

  const handleIconClick = (
    index: number,
    action?: () => void,
    path?: string
  ) => {
    setIsActiveButton((prev) => (prev === index ? null : index));

    if (action) {
      action();
    } else if (path) {
      router.push(path);
    }
  };

  return (
    <div className="fixed bottom-0 w-full max-w-[375px] h-16 border-t border-ELSE-EC bg-SYSTEM-white px-4">
      <p>ProductDetailNav</p>
    </div>
  );
};

export default ProductDetailNav;
