"use client";
import IconButton from "../common/custom-icon-button";
import { useState } from "react";
import { iconButtons } from "@/constants/bottom-nav-button";
import BottomNavIconButton from "./bottom-nav-iconButton";
import add from "@/assets/icons/addProduct.svg";
import { useRouter } from "next/navigation";

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
    <div className="fixed bottom-0 w-full max-w-[375px] h-16 border-t border-ELSE-EC bg-SYSTEM-white px-4">
      <div className="grid grid-cols-[53px_53px_1fr_53px_53px] gap-5  h-14 items-end">
        {/* 전체 5칸의 grid 생성 */}
        {iconButtons.map(({ icon, activeIcon, label, path, action }, index) => {
          // 가운데 버튼에는 addIcon 버튼 생성
          if (index === 2)
            return (
              <div key={index} className="relative w-full">
                <div className="absolute -top-[78px] left-1/2 transform -translate-x-1/2 z-10 w-14">
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

          //나머지 버튼 map 돌려서 생성
          return (
            <BottomNavIconButton
              key={index}
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
