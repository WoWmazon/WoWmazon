type BadgeProps = {
  text: string;
  height: "h-[18px]" | "h-7";
  backgroundColor: "bg-SYSTEM-main" | "bg-ELSE-FF3" | "bg-ELSE-F0";
  textColor: "text-SYSTEM-white" | "text-SYSTEM-main" | "text-ELSE-C1";
  textSize: "text-sm" | "text-lg";
  hasIcon: boolean;
  iconSrc?: string;
  iconWidth?: number;
}
type InputProps = React.ComponentPropsWithoutRef<"input">;
type InputOmitProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "id"
>;

type ToastProps = {
  message: string;
  open: boolean;
  onChange: (isOpen: boolean) => void;
  error?: boolean;
  autoHideDuration?: number;
};

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  activeIcon?: string;
  size: number;
  alt: string;
  isActive?: boolean;
};

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  smallSize?: boolean;
  variant: "filled" | "disabled" | "outline" | "outlineColor";
};

type ModalProps = {
  isShow: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  btnText: string; // filled button text
  handleAction: () => void; // filled button action
  icon?: string; // icon svg 파일 넘기기, icon 있으면 css textAlignCenter 적용
  optionalBtnText?: string; // modal optional outline button text
  handleOptional?: () => void; // modal optional outline button action
};