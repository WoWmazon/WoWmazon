const CategoryDropDownButton = ({
  label,
  isActive,
  onClick,
}: CategorytButtonProps) => {
  return (
    <div className="w-full bg-SYSTEM-white px-4 py-2 flex items-center justify-between cursor-pointer">
      <div
        onClick={onClick}
        className={` flex flex-col justify-center cursor-pointer items-center${
          isActive ? "text-ELSE-33" : " text-ELSE-AE"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default CategoryDropDownButton;
