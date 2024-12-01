"use client";

import BottomSheet from "../common/bottom-sheet";
import SimpleBottomSheet from "../common/simple-bottom-sheet";
import Toast from "../common/toast";

const CommonContainer = () => {
  return (
    <>
      <Toast />
      <SimpleBottomSheet />
      <BottomSheet />
    </>
  );
};
export default CommonContainer;
