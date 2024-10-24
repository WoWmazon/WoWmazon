import { useFormContext } from "react-hook-form";
import CustomCheckBox from "../common/custom-checkbox";
import TextButton from "./text-button";

const SearchFilter = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="flex flex-row gap-2 items-center">
        <TextButton isActive>할인율순</TextButton>
        <div className="border border-l-ELSE-D9 h-3" />
        <TextButton isActive={false}>낮은 가격순</TextButton>
      </div>
      <div className="flex flex-row justify-between text-md text-ELSE-F8">
        <p>전체(0)</p>
        <div className="flex flex-row gap-3">
          <CustomCheckBox {...register("is_lowest_price_ever")}>
            역대 최저가
          </CustomCheckBox>
          <CustomCheckBox {...register("is_out_of_stock")}>
            품절 제외
          </CustomCheckBox>
        </div>
      </div>
    </div>
  );
};
export default SearchFilter;
