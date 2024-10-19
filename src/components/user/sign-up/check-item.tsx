import CustomCheckBox from "@/components/common/custom-checkbox";
import Image from "next/image";

import RightArrow from "@/assets/icons/right_arrow.svg";

const CheckItem = ({
  name,
  required,
  content,
  link,
  children,
  register,
  onChange,
}: CheckProps & { onChange: React.ChangeEventHandler<HTMLInputElement> }) => {
  const { onChange: registerOnChange, ...rest } = register(name, { required });
  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    registerOnChange(e);
    onChange(e);
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-[auto_24px]">
        <CustomCheckBox {...rest} onChange={handleChangeCheck}>
          <span>
            {required ? (
              <strong className="text-SYSTEM-main">[필수]</strong>
            ) : (
              <strong className="text-ELSE-F8">[선택]</strong>
            )}
            {content}
          </span>
        </CustomCheckBox>
        {link !== undefined && (
          <Image src={RightArrow} alt="right-arrow1" width={24} height={24} />
        )}
      </div>
      {children && (
        <div className="pl-7">
          <span className="text-ELSE-F8">{children.content}</span>
        </div>
      )}
    </div>
  );
};
export default CheckItem;
