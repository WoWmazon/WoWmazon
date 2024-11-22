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

// Custom Toast
type ToastState = {
  message: string;
  open: boolean;
  onChange: (isOpen: boolean) => void;
  error?: boolean;
  autoHideDuration?: number;
  handleToast: (toastState: Partial<ToastState>) => void;
}