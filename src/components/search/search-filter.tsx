import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import CustomCheckBox from "../common/custom-checkbox";
import CustomRadio from "../common/custom-radio";
import { orderings } from "@/constants/search";

const SearchFilter = () => {
  const { register, getValues } = useFormContext();
  const ordering = getValues("ordering");

  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="flex flex-row gap-2 items-center">
        {orderings.map(({ label, value }) => (
          <div
            key={`rdo-${value}`}
            className="text-radio flex flex-row gap-2 items-center"
          >
            <CustomRadio {...register("ordering")} value={value} isRadioHidden>
              <p
                className={twMerge(
                  "text-md size-fit hover:text-ELSE-55",
                  ordering !== value && "text-ELSE-F8"
                )}
              >
                {label}
              </p>
            </CustomRadio>
          </div>
        ))}
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
