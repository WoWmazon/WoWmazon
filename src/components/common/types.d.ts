type BadgeProps = {
  text: number | string;
  height: "h-[18px]" | "h-7";
  backgroundColor: "bg-SYSTEM-main" | "bg-ELSE-FF3" | "bg-ELSE-F0";
  textColor: "text-SYSTEM-white" | "text-SYSTEM-main" | "text-ELSE-C1";
  textSize: "text-sm" | "text-lg";
  hasIcon: boolean;
  iconSrc?: string;
  iconWidth?: number;
};

type InputProps = React.ComponentPropsWithoutRef<"input">;

type InputOmitProps = Omit<InputProps, "type" | "id">;

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  activeIcon?: string;
  size: number;
  alt: string;
  isActive?: boolean;
};

type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  smallSize?: boolean;
  variant: "filled" | "disabled" | "outline" | "outlineColor" | "none";
};

type CustomInputProps = Omit<InputProps, "size"> & {
  size: "large" | "small";
  variant: "outline" | "filled";
  hasDelBtn?: boolean;
  error?: boolean;
};
