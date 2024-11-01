import { ReactNode } from "react";
import { create } from "zustand";

// Custom Modal
type ModalState = {
  isShow: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  btnText: string; // filled button text
  handleAction: () => void; // filled button action
  icon?: string; // icon svg 파일 넘기기, icon 있으면 css textAlignCenter 적용
  optionalBtnText?: string; // modal optional outline button text
  handleOptional?: () => void; // modal optional outline button action
  handleModal: (modalState: Partial<ModalState>) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isShow: false,
  handleClose: () => set({ isShow: false }),
  title: "",
  content: "",
  btnText: "",
  handleAction: () => {},
  icon: undefined,
  optionalBtnText: undefined,
  handleOptional: undefined,
  handleModal: (modalState: Partial<ModalState>) =>
    set((state) => ({
      ...state,
      isShow: false,
      ...modalState,
    })),
}));


// Custom SimpleBottomSheet
type SimpleBottomSheetState = {
  children: ReactNode;
  isShow: boolean;
  handleClose: () => void;
  className?: string; // 기본 가운데 정렬, 왼쪽 정렬 필요한 경우 사용
  handleSimpleBottomSheet: (
    simpleBottomSheetState: Partial<SimpleBottomSheetState>
  ) => void;
};

export const useSimpleBottomSheetStore = create<SimpleBottomSheetState>(
  (set) => ({
    children: null,
    isShow: false,
    handleClose: () => set({ isShow: false }),
    className: "",
    handleSimpleBottomSheet: (
      simpleBottomSheetState: Partial<SimpleBottomSheetState>
    ) =>
      set((state) => ({
        ...state,
        isShow: false,
        ...simpleBottomSheetState,
      })),
  })
);

// Custom BottomSheet
type BottomSheetState = {
  children: ReactNode;
  isShow: boolean;
  hasDelBtn?: boolean;
  handleClose: () => void;
  title: string;
  className?: string; // 기본 가운데 정렬, 왼쪽 정렬 필요한 경우 사용
  btnText: string; // filled button text
  handleAction: () => void; // filled button action
  optionalBtnText?: string; // modal optional outline button text
  handleOptional?: () => void; // modal optional outline button action
  handleBottomSheet: (bottomSheetState: Partial<BottomSheetState>) => void;
};

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  children: null,
  isShow: false,
  hasDelBtn: false,
  handleClose: () => set({ isShow: false }),
  title: "",
  className: "",
  btnText: "",
  handleAction: () => {},
  handleBottomSheet: (bottomSheetState: Partial<SimpleBottomSheetState>) =>
    set((state) => ({
      ...state,
      isShow: false,
      ...bottomSheetState,
    })),
}));
