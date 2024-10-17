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
