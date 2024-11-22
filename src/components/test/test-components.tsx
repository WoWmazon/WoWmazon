"use client";

import React, { useRef, useState } from "react";
import CustomCheckBox from "../common/custom-checkbox";
import CustomInput from "../common/custom-input";
import CustomRadio from "../common/custom-radio";
import CustomToggle from "../common/custom-toggle";
import Toast from "../common/toast";
import CustomButton from "../common/custom-button";
import { useToastStore } from "@/stores/common/stores";

const TestComponents = () => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const { handleToast } = useToastStore();

  const focusInput = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const setToast = () => {
    handleToast({
      open: true,
      onChange: () => handleToast({ open: false }),
      message: "Toast",
    });
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-row gap-2">
        <CustomRadio name="radio">라디오</CustomRadio>
        <CustomRadio name="radio" large>
          라디오 large
        </CustomRadio>
      </div>
      <div className="flex flex-row gap-2">
        <CustomCheckBox>체크</CustomCheckBox>
        <CustomCheckBox large>체크 large</CustomCheckBox>
      </div>
      <div>
        <CustomToggle>토글</CustomToggle>

        <CustomToggle checked disabled>
          토글 checked disabled
        </CustomToggle>
      </div>
      <div className="grid grid-cols-[auto_80px] gap-2">
        <CustomInput
          ref={ref}
          value={value}
          size="large"
          variant="outline"
          placeholder="상품명 검색"
          onChange={(e) => setValue(e.target.value)}
          hasDelBtn
        />
        <CustomButton onClick={focusInput}>포커스 인풋</CustomButton>
      </div>
      <CustomButton variant="outlineColor" onClick={setToast}>
        토스트
      </CustomButton>
      <Toast />
    </div>
  );
};

export default TestComponents;
