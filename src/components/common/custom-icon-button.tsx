"use client";
import { useState, ButtonHTMLAttributes } from "react";
import Image from "next/image";

const IconButton = ({
  icon,
  activeIcon,
  size,
  alt,
  onClick,
  defaultActive = false,
  ...buttonProps
}: IconButtonProps) => {
  const [isActive, setIsActive] = useState<boolean>(defaultActive);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive((prev) => !prev);
    if (onClick) onClick(e);
  };

  return (
    <button onClick={handleClick} {...buttonProps}>
      <Image
        src={isActive && activeIcon ? activeIcon : icon}
        width={size}
        height={size}
        alt={alt}
        className="cursor-pointer"
      />
    </button>
  );
};

export default IconButton;
