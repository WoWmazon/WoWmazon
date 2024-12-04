import { twMerge } from "tailwind-merge";
import CustomCheckBox from "../common/custom-checkbox";

const WishListProductCard = ({
  children,
  isEditing,
  isChecked,
  onCheck,
}: WishListProductCardPros) => {
  return (
    <div className="relative w-full">
      {isEditing && (
        <div className="absolute size-full bg-SYSTEM-white bg-opacity-70">
          <div
            className={twMerge(
              "w-full h-32 mt-2",
              isChecked && "bg-SYSTEM-main bg-opacity-20 rounded-[4px]"
            )}
          >
            <div className="size-20 justify-items-center content-center">
              <CustomCheckBox checked={isChecked} onChange={onCheck} large />
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
export default WishListProductCard;
