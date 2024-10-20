"use client";
import IconButton from "../common/custom-icon-button";
import { useState } from "react";
import wish from "@/assets/icons/nav_wishList_gray.svg";
import wishActive from "@/assets/icons/nav_wishList_red.svg";
import product from "@/assets/icons/nav_productList_gray.svg";
import productActive from "@/assets/icons/nav_productList_red.svg";
import search from "@/assets/icons/nav_search_gray.svg";
import searchActive from "@/assets/icons/nav_search_red.svg";
import myPage from "@/assets/icons/nav_mypage_gray.svg";
import myPageActive from "@/assets/icons/nav_mypage_red.svg";
import add from "@/assets/icons/addProduct.svg";
import BottomNavIconButton from "./bottom-nav-iconButton";
import { useRouter } from "next/navigation";

const handleOpenBottomSheet = () => console.log("모달여는 로직");
const iconButtons = [
  {
    icon: wish,
    activeIcon: wishActive,
    label: "찜한 상품",
    path: "/",
  },
  {
    icon: product,
    activeIcon: productActive,
    label: "상품",
    path: "/product-list",
  },
  {
    icon: add,
    label: "+",
    action: handleOpenBottomSheet,
  },
  {
    icon: search,
    activeIcon: searchActive,
    label: "검색",
    path: "/search",
  },
  {
    icon: myPage,
    activeIcon: myPageActive,
    label: "마이페이지",
    path: "/my-page",
  },
];

const BottomNav = () => {
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
    <div className="fixed  bottom-0 w-full max-w-[375px] h-16 border-t border-ELSE-EC  px-4">
      <div className="grid grid-cols-[53px_53px_1fr_53px_53px] gap-5  h-14 items-end">
        {iconButtons.map(({ icon, activeIcon, label, path, action }, index) => {
          if (index === 2)
            return (
              <div className="relative w-full">
                <div className="absolute -top-[68px] left-1/2 transform -translate-x-1/2 z-10 w-14">
                  <IconButton
                    icon={add}
                    size={56}
                    alt="AddButton"
                    isActive={isActiveButton === index}
                    onClick={() => handleIconClick(index, action, path)}
                  />
                </div>
              </div>
            );
          return (
            <BottomNavIconButton
              icon={icon}
              activeIcon={activeIcon}
              isActive={isActiveButton === index}
              label={label}
              onClick={() => handleIconClick(index, action, path)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
