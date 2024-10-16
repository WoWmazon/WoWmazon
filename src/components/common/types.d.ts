type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "id">;

type ModalProps = {
  show: boolean;
  title: string;
  content: string;
  btnText: string; // filled button text
  handleAction: () => void; // filled button action
  icon?: string; // icon svg 파일 넘기기, icon 있으면 css textAlignCenter 적용
  optionalBtnText?: string; // modal optional outline button text
  handleOptional?: () => void; // modal optional outline button action
};
