import Image from "next/image";

const IconButton = ({
  icon,
  activeIcon,
  size,
  alt,
  isActive = false,
  onClick,
  ...buttonProps
}: IconButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
