import { MutableRefObject, useState } from "react";
import CustomInput from "../common/custom-input";

const BottomSheetAddLink = ({
  inputRef,
}: {
  inputRef: MutableRefObject<string>;
}) => {
  const [value, setValue] = useState("");

  return (
    <CustomInput
      size="large"
      variant="outline"
      value={value}
      placeholder="복사한 링크를 붙여넣으세요"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        inputRef.current = e.target.value;
      }}
      className="border border-ELSE-D9 bg-white rounded-sm font-normal"
    />
  );
};
export default BottomSheetAddLink;
