import { create } from "zustand";

// Custom Modal
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
export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  children: null,
  isShow: false,
  hasDelBtn: false,
  handleClose: () => set({ isShow: false }),
  title: "",
  className: "",
  btnText: "",
  handleAction: () => {},
  optionalBtnText: undefined,
  handleOptional: undefined,
  handleBottomSheet: (bottomSheetState: Partial<SimpleBottomSheetState>) =>
    set((state) => ({
      ...state,
      isShow: false,
      ...bottomSheetState,
    })),
}));

// Custom Toast
export const useToastStore = create<ToastState>((set) => ({
  message: "",
  open: false,
  onChange: () => set({ open: false }),
  handleToast: (toastState: Partial<ToastState>) =>
    set((state) => ({
      ...state,
      open: false,
      ...toastState,
    })),
}));
