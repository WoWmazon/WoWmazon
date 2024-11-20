import { twMerge } from "tailwind-merge";
import CustomCheckBox from "../common/custom-checkbox";
import CustomButton from "../common/custom-button";
import { useSearchParamsStore } from "@/stores/prooduct/stores";

const SearchFilter = ({ count }: { count: number }) => {
  const { searchParams, setSearchParams } = useSearchParamsStore();

  const handleClickOrdering = (order: OrderingType) => {
    setSearchParams("ordering", order);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { key } = e.target.dataset;

    if (!key) return;

    const isChecked = e.target.checked;
    const value = isChecked
      ? key === "is_lowest_price_ever"
        ? "true"
        : "false"
      : "";

    setSearchParams(key, value);
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="flex flex-row gap-2 items-center">
        <CustomButton
          className={twMerge(
            "text-md size-fit hover:text-ELSE-55",
            searchParams.ordering !== "-discount_rate" && "text-ELSE-F8"
          )}
          variant="none"
          smallSize
          onClick={() => handleClickOrdering("-discount_rate")}
        >
          할인율순
        </CustomButton>
        <div className="border border-l-ELSE-D9 h-3" />
        <CustomButton
          className={twMerge(
            "text-md size-fit hover:text-ELSE-55",
            searchParams.ordering !== "present_price" && "text-ELSE-F8"
          )}
          variant="none"
          smallSize
          onClick={() => handleClickOrdering("present_price")}
        >
          낮은 가격순
        </CustomButton>
      </div>
      <div className="flex flex-row justify-between text-md text-ELSE-F8">
        <p>{`전체(${count})`}</p>
        <div className="flex flex-row gap-3">
          <CustomCheckBox
            data-key="is_lowest_price_ever"
            onChange={handleFilterChange}
          >
            역대 최저가
          </CustomCheckBox>
          <CustomCheckBox
            data-key="is_out_of_stock"
            onChange={handleFilterChange}
          >
            품절 제외
          </CustomCheckBox>
        </div>
      </div>
    </div>
  );
};
export default SearchFilter;
