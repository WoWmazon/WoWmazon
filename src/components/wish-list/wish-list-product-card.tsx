import { twMerge } from "tailwind-merge";
import CustomCheckBox from "../common/custom-checkbox";

const WishListProductCard = ({
  children,
  isEditing,
  isChecked,
  onCheck,
}: WishListProductCardPros) => {
  return (
    <div className="relative">
      {isEditing && (
        <div
          className={twMerge(
            "absolute w-full h-32 top-2 bg-SYSTEM-white bg-opacity-70",
            isChecked && "bg-SYSTEM-main bg-opacity-20"
          )}
        >
          <div className="mt-4 size-20 justify-items-center content-center">
            <CustomCheckBox checked={isChecked} onChange={onCheck} large />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
export default WishListProductCard;
